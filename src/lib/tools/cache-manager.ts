export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

export class CacheManager<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private maxSize: number;
  private defaultTTL: number;
  private cleanupInterval: NodeJS.Timeout;

  constructor(maxSize: number = 100, defaultTTL: number = 5 * 60 * 1000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;

    // Set up periodic cleanup
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000); // Cleanup every minute
  }

  set(key: string, data: T, customTTL?: number): void {
    const ttl = customTTL || this.defaultTTL;
    const now = Date.now();

    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictOldest();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      ttl,
      accessCount: 0,
      lastAccessed: now
    };

    this.cache.set(key, entry);
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();

    // Check if expired
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = now;

    return entry.data;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    const now = Date.now();

    // Check if expired
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Get cache statistics
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    memoryUsage: number;
    oldestEntry?: number;
    newestEntry?: number;
  } {
    const now = Date.now();
    let totalAccesses = 0;
    let oldestTimestamp = now;
    let newestTimestamp = 0;

    for (const entry of this.cache.values()) {
      totalAccesses += entry.accessCount;
      oldestTimestamp = Math.min(oldestTimestamp, entry.timestamp);
      newestTimestamp = Math.max(newestTimestamp, entry.timestamp);
    }

    const hitRate = totalAccesses > 0 ?
      (totalAccesses / (totalAccesses + this.misses)) : 0;

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate,
      memoryUsage: this.estimateMemoryUsage(),
      oldestEntry: oldestTimestamp < now ? oldestTimestamp : undefined,
      newestEntry: newestTimestamp > 0 ? newestTimestamp : undefined
    };
  }

  // Get most frequently accessed items
  getMostFrequent(limit: number = 10): Array<{ key: string; accessCount: number }> {
    const entries = Array.from(this.cache.entries())
      .map(([key, entry]) => ({ key, accessCount: entry.accessCount }))
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, limit);

    return entries;
  }

  // Get least recently used items
  getLRU(limit: number = 10): Array<{ key: string; lastAccessed: number }> {
    const entries = Array.from(this.cache.entries())
      .map(([key, entry]) => ({ key, lastAccessed: entry.lastAccessed }))
      .sort((a, b) => a.lastAccessed - b.lastAccessed)
      .slice(0, limit);

    return entries;
  }

  // Get all cache keys
  getAllKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  // Delete a specific cache entry
  deleteEntry(key: string): boolean {
    return this.cache.delete(key);
  }

  // Get all cache entries
  getAllEntries(): Array<[string, CacheEntry<T>]> {
    return Array.from(this.cache.entries());
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
  }

  private estimateMemoryUsage(): number {
    // Rough estimation in bytes
    let totalSize = 0;

    for (const [key, entry] of this.cache.entries()) {
      totalSize += key.length * 2; // UTF-16 characters
      totalSize += JSON.stringify(entry.data).length * 2;
      totalSize += 64; // Approximate overhead for entry metadata
    }

    return totalSize;
  }

  private misses: number = 0;

  // Manually increment miss counter for statistics
  recordMiss(): void {
    this.misses++;
  }

  // Destroy the cache manager and cleanup intervals
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}

// Specialized cache for chatbot context
export class ChatbotContextCache extends CacheManager<string> {
  constructor() {
    super(50, 5 * 60 * 1000); // 50 items, 5 minutes TTL
  }

  // Method to cache context with metadata
  setContext(contextType: string, content: string, metadata?: any): void {
    const key = `context:${contextType}`;

    // Include metadata in the cached data if provided
    const dataToCache = metadata ?
      JSON.stringify({ content, metadata }) :
      content;

    this.set(key, dataToCache);
  }

  // Method to retrieve cached context
  getContext(contextType: string): { content: string; metadata?: any } | null {
    const key = `context:${contextType}`;
    const cached = this.get(key);

    if (!cached) {
      this.recordMiss();
      return null;
    }

    try {
      // Try to parse as JSON (if it contains metadata)
      const parsed = JSON.parse(cached);
      if (parsed.content && parsed.metadata) {
        return parsed;
      }
    } catch {
      // If parsing fails, treat it as plain content
    }

    return { content: cached };
  }

  // Clear all context cache
  clearContextCache(): void {
    const keysToDelete: string[] = [];
    const allKeys = this.getAllKeys();

    for (const key of allKeys) {
      if (key.startsWith('context:')) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.deleteEntry(key);
    }
  }

  // Get context cache statistics
  getContextStats(): {
    totalCached: number;
    mostAccessed: Array<{ contextType: string; accessCount: number }>;
    cacheHitRate: number;
  } {
    const contextEntries: Array<{ contextType: string; accessCount: number }> = [];
    let totalAccesses = 0;

    for (const [key, entry] of this.getAllEntries()) {
      if (key.startsWith('context:')) {
        const contextType = key.replace('context:', '');
        contextEntries.push({ contextType, accessCount: entry.accessCount });
        totalAccesses += entry.accessCount;
      }
    }

    const stats = this.getStats();

    return {
      totalCached: contextEntries.length,
      mostAccessed: contextEntries
        .sort((a, b) => b.accessCount - a.accessCount)
        .slice(0, 5),
      cacheHitRate: stats.hitRate
    };
  }
}

// Export singleton instance
export const chatbotContextCache = new ChatbotContextCache();