# Week 8 — APIs (Simple Explanation)

## 🎯 This Week's Mission
_Connect your websites to the entire internet! Learn how APIs work and build a real weather application that pulls live data from the web. Transform your websites from static pages into dynamic information hubs!_

## 🔥 Last Week Showcase
**Interactive Card Festival (5 min):**
- "Who built an amazing interactive web card last week?"
- Quick demos of interactive JavaScript features
- Highlight creative animations, form validation, and advanced interactions
- "Last week your websites learned to respond to user actions - this week they'll learn to talk to the entire internet!"

## 🚀 Today's Hook: The Power of Live Data (15 min)

**Live Demo: Magic Weather App**
Teacher shows a weather application that:
```javascript
// Static version (boring)
document.getElementById('weather').innerHTML = "Today is sunny, 75°F";

// API version (amazing!)
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=API_KEY')
    .then(response => response.json())
    .then(data => {
        let temp = Math.round(data.main.temp - 273.15);
        let description = data.weather[0].description;
        document.getElementById('weather').innerHTML =
            `Current weather: ${description}, ${temp}°C`;
    });
```

**The Wow Moment:** Teacher shows the app displaying REAL, CURRENT weather data from their city
- "See how this is showing the actual weather outside right now?"
- "This isn't fake data - it's live information pulled from the internet!"

**The Week's Promise:**
*"Today you will:*
- *Understand how APIs connect your website to external services*
- *Build a real weather application that shows live data*
- *Learn to work with JSON data from web services*
- *Master the skills that power data-driven applications worldwide"*

## 🧠 Concept Discovery: Understanding APIs (15 min)

### What is an API? (5 min)
**Simple Explanation:**
*"An API (Application Programming Interface) is like a waiter at a restaurant. You (the customer) tell the waiter what you want, the waiter goes to the kitchen (the server/API), gets your food (the data), and brings it back to you."*

**Real-Life API Examples:**
- **Weather APIs:** Get current weather, forecasts, radar data
- **News APIs:** Get latest news articles and headlines
- **Social Media APIs:** Post updates, get user information
- **Maps APIs:** Get locations, directions, maps
- **Stock APIs:** Get real-time stock prices and market data
- **YouTube APIs:** Get video information, comments, statistics

### How APIs Work (5 min)
**The Request-Response Cycle:**
```
1. Your Website: "Hey API, I want the weather for New York"
2. API: "Let me check my weather database for New York"
3. API: "Found it! It's 72°F and partly cloudy"
4. API: "Here's the data: {temp: 72, condition: 'partly_cloudy'}"
5. Your Website: "Thank you! I'll display this to the user"
```

**HTTP Methods (Simple):**
- **GET:** Request data from the API (most common)
- **POST:** Send data to the API (create new data)
- **PUT:** Update existing data in API
- **DELETE:** Remove data from API

### JSON: The Language of APIs (5 min)
**What is JSON?**
*"JSON (JavaScript Object Notation) is how APIs send data. It's like a clean, organized way to package information so computers can easily read it."*

**JSON Example:**
```json
{
    "name": "Sarah Johnson",
    "age": 15,
    "city": "San Francisco",
    "hobbies": ["coding", "gaming", "reading"],
    "profile": {
        "username": "sarah_codes",
        "level": "intermediate"
    }
}
```

**Reading JSON in JavaScript:**
```javascript
let data = {
    "name": "Sarah Johnson",
    "age": 15,
    "hobbies": ["coding", "gaming"]
};

console.log(data.name);           // "Sarah Johnson"
console.log(data.age);            // 15
console.log(data.hobbies[0]);     // "coding"
console.log(data.profile.username); // Error - profile doesn't exist in this example
```

## 🛠️ Hands-On Building: Real Weather Application (40 min)

### Activity 1: Basic Weather App Structure (15 min)

**Step 1: HTML Foundation**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Weather App</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .weather-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 500px;
            width: 100%;
            text-align: center;
        }

        .search-box {
            margin-bottom: 30px;
        }

        .search-box input {
            padding: 15px;
            font-size: 18px;
            border: 2px solid #ddd;
            border-radius: 10px;
            width: 70%;
            margin-right: 10px;
        }

        .search-box button {
            padding: 15px 25px;
            font-size: 18px;
            background: #0984e3;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .search-box button:hover {
            background: #74b9ff;
        }

        .weather-display {
            display: none;
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .weather-icon {
            font-size: 80px;
            margin: 20px 0;
        }

        .temperature {
            font-size: 48px;
            font-weight: bold;
            color: #2d3436;
            margin: 20px 0;
        }

        .description {
            font-size: 24px;
            color: #636e72;
            margin: 10px 0;
            text-transform: capitalize;
        }

        .weather-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 30px;
        }

        .detail-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
        }

        .detail-label {
            font-size: 14px;
            color: #636e72;
            margin-bottom: 5px;
        }

        .detail-value {
            font-size: 20px;
            font-weight: bold;
            color: #2d3436;
        }

        .error-message {
            color: #e17055;
            background: #fab1a0;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            display: none;
        }

        .loading {
            display: none;
            margin: 20px 0;
            font-size: 18px;
            color: #0984e3;
        }
    </style>
</head>
<body>
    <div class="weather-container">
        <h1>🌤️ Live Weather App</h1>
        <p>Get real-time weather for any city!</p>

        <div class="search-box">
            <input type="text" id="cityInput" placeholder="Enter city name..." value="New York">
            <button onclick="getWeather()">Get Weather</button>
        </div>

        <div class="loading" id="loading">
            🔄 Getting weather data...
        </div>

        <div class="error-message" id="errorMessage"></div>

        <div class="weather-display" id="weatherDisplay">
            <h2 id="cityName"></h2>
            <div class="weather-icon" id="weatherIcon"></div>
            <div class="temperature" id="temperature"></div>
            <div class="description" id="description"></div>

            <div class="weather-details">
                <div class="detail-box">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value" id="feelsLike"></div>
                </div>
                <div class="detail-box">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value" id="humidity"></div>
                </div>
                <div class="detail-box">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value" id="windSpeed"></div>
                </div>
                <div class="detail-box">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value" id="pressure"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Your API integration code will go here
    </script>
</body>
</html>
```

### Activity 2: API Integration with AI Assistance (15 min)

**The API Challenge:** "Connect your weather app to a real weather API!"

**Weather API Options:**
1. **OpenWeatherMap:** Free tier available, comprehensive data
2. **WeatherAPI:** Free tier, good documentation
3. **AccuWeather:** Free tier, detailed forecasts
4. **Mock Weather API:** Perfect for learning without API keys

**AI Prompt for API Integration:**
```
"Help me integrate a weather API into my weather app HTML. I need:
1. Code to make API requests to OpenWeatherMap API
2. Function to handle API responses and extract weather data
3. Error handling for invalid cities or API failures
4. Code to update the HTML elements with weather data
5. Loading states and error messages
6. Weather emoji/icon mapping for different conditions
Use a demo API key for demonstration."
```

**API Integration JavaScript:**
```javascript
// API Configuration
const API_KEY = 'demo_key_replace_with_real'; // Students get their own free key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Weather emoji mapping
function getWeatherEmoji(weatherId, description) {
    const weatherEmojis = {
        '01d': '☀️', '01n': '🌙',  // clear sky
        '02d': '⛅', '02n': '☁️',  // few clouds
        '03d': '☁️', '03n': '☁️',  // scattered clouds
        '04d': '☁️', '04n': '☁️',  // broken clouds
        '09d': '🌧️', '09n': '🌧️',  // shower rain
        '10d': '🌦️', '10n': '🌧️',  // rain
        '11d': '⛈️', '11n': '⛈️',  // thunderstorm
        '13d': '❄️', '13n': '❄️',  // snow
        '50d': '🌫️', '50n': '🌫️'   // mist
    };

    // Check for specific descriptions first
    if (description.includes('clear')) return '☀️';
    if (description.includes('cloud')) return '☁️';
    if (description.includes('rain')) return '🌧️';
    if (description.includes('snow')) return '❄️';
    if (description.includes('thunder')) return '⛈️';

    return '🌤️'; // default weather emoji
}

// Main weather function
async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();

    if (!city) {
        showError('Please enter a city name!');
        return;
    }

    showLoading(true);
    hideError();

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your API configuration.');
            } else {
                throw new Error(`Weather service unavailable (Error: ${response.status})`);
            }
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Display weather data
function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const pressure = document.getElementById('pressure');

    // Update city information
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    // Set weather icon
    weatherIcon.textContent = getWeatherEmoji(data.weather[0].icon, data.weather[0].description);

    // Update temperature and description
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    // Update details
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    pressure.textContent = `${data.main.pressure} hPa`;

    // Show weather display
    document.getElementById('weatherDisplay').style.display = 'block';
}

// Loading states
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
    if (show) {
        document.getElementById('weatherDisplay').style.display = 'none';
    }
}

// Error handling
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = `❌ ${message}`;
    errorElement.style.display = 'block';
    document.getElementById('weatherDisplay').style.display = 'none';
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

// Keyboard support
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Get weather on page load
window.onload = function() {
    getWeather(); // Load default city weather
};
```

### Activity 3: Advanced API Features (10 min)

**Choose Your Enhancement:**

**Option A: Multiple Cities Comparison**
```javascript
// Add to HTML:
/*
<div id="comparisonContainer" style="display:none; margin-top:20px;">
    <h3>🏙️ City Comparison</h3>
    <div id="comparisonResults"></div>
</div>
<button class="btn" onclick="compareCities()" style="margin-top:10px;">Compare Cities</button>
*/

let savedCities = [];

async function compareCities() {
    const cities = ['New York', 'London', 'Tokyo', 'Paris'];
    const resultsContainer = document.getElementById('comparisonResults');

    resultsContainer.innerHTML = '<div class="loading">🔄 Comparing cities...</div>';
    document.getElementById('comparisonContainer').style.display = 'block';

    try {
        const weatherPromises = cities.map(city =>
            fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
                .then(response => response.json())
        );

        const weatherData = await Promise.all(weatherPromises);

        let comparisonHTML = '<div class="city-comparison-grid">';

        weatherData.forEach((data, index) => {
            const temp = Math.round(data.main.temp);
            const icon = getWeatherEmoji(data.weather[0].icon, data.weather[0].description);

            comparisonHTML += `
                <div class="city-card">
                    <h4>${data.name}</h4>
                    <div style="font-size: 40px;">${icon}</div>
                    <div style="font-size: 24px; font-weight: bold;">${temp}°C</div>
                    <div style="color: #636e72;">${data.weather[0].description}</div>
                </div>
            `;
        });

        comparisonHTML += '</div>';
        resultsContainer.innerHTML = comparisonHTML;

    } catch (error) {
        resultsContainer.innerHTML = `<div class="error-message">❌ Error comparing cities: ${error.message}</div>`;
    }
}
```

**Option B: Weather Forecast**
```javascript
// Function to get 5-day forecast
async function getForecast() {
    const city = document.getElementById('cityInput').value.trim();
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(forecastURL);
        const data = await response.json();

        // Process forecast data (group by day)
        const dailyForecasts = {};
        data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }
            dailyForecasts[date].push(item);
        });

        displayForecast(dailyForecasts);

    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function displayForecast(dailyForecasts) {
    const forecastContainer = document.createElement('div');
    forecastContainer.className = 'forecast-container';

    Object.entries(dailyForecasts).slice(0, 5).forEach(([date, forecasts]) => {
        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        const avgTemp = Math.round(forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length);
        const icon = getWeatherEmoji(forecasts[0].weather[0].icon, forecasts[0].weather[0].description);

        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <div class="forecast-date">${dayName}</div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temp">${avgTemp}°C</div>
            </div>
        `;
    });

    document.querySelector('.weather-container').appendChild(forecastContainer);
}
```

## ✨ Creative Challenge: Weather App Enhancement (20 min)

### Advanced API Features (12 min)
**Students Choose 2-3 Enhancements:**

**Additional APIs:**
- **Geolocation API:** Get weather for user's current location
- **Time Zone API:** Show local time for searched cities
- **Air Quality API:** Display air pollution data
- **UV Index API:** Show UV radiation levels

**Interactive Features:**
- **City Favorites:** Save favorite cities for quick access
- **Weather Alerts:** Display weather warnings and advisories
- **Historical Data:** Show weather trends and comparisons
- **Weather Maps:** Integrate weather radar or satellite images

**AI Enhancement Prompts:**
```
"Help me add geolocation to my weather app. I want:
1. Get user's current location automatically
2. Display weather for their location on page load
3. Add a 'Use My Location' button
4. Handle location permission errors gracefully
5. Show distance from current location to searched cities"
```

### User Experience Improvements (8 min)
**Final Touches:**
- Add smooth transitions and animations
- Implement dark/light mode toggle
- Add weather-based background changes
- Create mobile-responsive design improvements

## 🎉 Show & Tell: Weather App Showcase (15 min)

### Live Weather Demonstrations (10 min)
- Students show their working weather apps
- Demonstrate different cities and real-time data
- Show advanced features like forecasts or comparisons
- "What's the coolest weather data you've discovered?"

### API Discussion (5 min)
- "How did working with real APIs change your understanding of the web?"
- "What types of data would you like to pull from other APIs?"
- Discuss real-world applications of APIs

## 🔮 Next Week Preview: Databases and Data Storage

**The Teaser:**
*"Next week, we're going to learn how to store and organize data like real databases! You'll create systems that can save user information, manage complex data structures, and build the foundation for full applications. Imagine creating a system that can store hundreds of users, track their progress, and manage complex relationships - that's what we're building next!"*

**Demo Preview:** Quick demo of a simple user management system with database-like functionality

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Working weather application with real API integration
✅ Successful API requests and response handling
✅ JSON data parsing and display
✅ Error handling for API failures
✅ User-friendly interface with loading states

### Success Criteria:
🎯 **Complete Weather App with Live API Data**
🎯 **Successful API Integration and Data Handling**
🎯 **Proper JSON Parsing and Display**
🎯 **Error Handling and User Feedback**
🎯 **Advanced Features or Multiple Cities Support**

## 🏆 Weekly Achievement Badge: **API Integration Expert**
*"You've mastered API integration and live data handling! Your weather app proves you can connect websites to real-world data and create dynamic, information-rich applications."*

**Real-World Connection:** "The API skills you learned today power virtually every modern web application! Social media feeds, online shopping, booking systems, news websites, and virtually every service that shows live data - all built using APIs just like you used today. You're learning the technology that connects the entire internet!"

## 📚 Extension Activities (Optional Homework)

### For Future API Developers:
- **Multiple API Integration:** Combine weather with news or stock APIs
- **Real-Time Dashboard:** Create a dashboard showing multiple live data sources
- **Mobile Weather App:** Convert your weather app to a mobile-first design
- **Weather Notifications:** Build a system that alerts users to weather changes

### Online Resources:
- **REST API Tutorial:** Comprehensive guide to building and using APIs
- **JSON Validator:** Tool to test and format JSON data
- **API Documentation:** Learn to read and understand API docs
- **Postman:** Tool for testing APIs without code

### Challenge Problem:
*"Can you create a weather app that remembers the last 5 cities you searched for? Or an app that compares current weather with historical weather data for the same day last year?"*

---

**Teacher Notes:**
- Use browser developer tools to show students network requests and API responses
- Emphasize the importance of error handling when working with external data
- Have backup mock data ready in case API keys fail or internet is down
- Discuss the importance of API security and key management
- Celebrate successful integrations and creative uses of weather data