// Example usage of BespokeTopNav component
// This file demonstrates how to use the navigation component

import React from "react";
import { BespokeTopNav } from "./bespokeTopNav";

export default function BespokeTopNavExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      {/* Default navigation with all features */}
      <BespokeTopNav />

      {/* Example content sections */}
      <section className="pt-32 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bespoke Academy Navigation Demo
        </h1>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Default Navigation</h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              The navigation bar above uses the default configuration with:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-neutral-600 dark:text-neutral-300">
              <li>Glass-morphism design with backdrop blur</li>
              <li>Scroll-based show/hide animation</li>
              <li>Active route highlighting</li>
              <li>Responsive mobile menu</li>
              <li>Bespoke Academy branding</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Design System</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Integrates with Bespoke Academy's design tokens and color palette
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Accessibility</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Performance</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Optimized animations with 60fps target and minimal bundle impact
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Responsive</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Mobile-first design with hamburger menu and touch-friendly interactions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Usage</h2>
            <pre className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 overflow-x-auto text-sm">
{`import { BespokeTopNav } from "@/components/ui/bespoke/bespokeTopNav";

// Default usage
<BespokeTopNav />

// Custom configuration
<BespokeTopNav
  showLogo={true}
  logoVariant="icon"
  ctaButtons={true}
  items={customNavItems}
  className="additional-classes"
/>`}
            </pre>
          </div>

          {/* Add more content to enable scrolling */}
          <div className="h-96 bg-gradient-to-r from-primary-emerald-100 to-primary-emerald-200 dark:from-primary-emerald-900 dark:to-primary-emerald-800 rounded-xl flex items-center justify-center">
            <p className="text-lg font-medium text-neutral-800 dark:text-white">
              Scroll to see the navigation hide/show behavior
            </p>
          </div>

          <div className="h-96 bg-gradient-to-r from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-800 rounded-xl flex items-center justify-center">
            <p className="text-lg font-medium text-neutral-800 dark:text-white">
              Keep scrolling to test the animation
            </p>
          </div>

          <div className="h-96 bg-gradient-to-r from-pink-100 to-orange-200 dark:from-pink-900 dark:to-orange-800 rounded-xl flex items-center justify-center">
            <p className="text-lg font-medium text-neutral-800 dark:text-white">
              Scroll up to see the navigation reappear
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}