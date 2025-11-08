// Phone Number Tracker Application
// Local storage key
const STORAGE_KEY = 'phoneTrackerHistory';

// Country codes database (subset for validation)
const countryCodes = {
    '1': { name: 'United States/Canada', code: 'US/CA', flag: '🇺🇸' },
    '44': { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
    '91': { name: 'India', code: 'IN', flag: '🇮🇳' },
    '86': { name: 'China', code: 'CN', flag: '🇨🇳' },
    '81': { name: 'Japan', code: 'JP', flag: '🇯🇵' },
    '49': { name: 'Germany', code: 'DE', flag: '🇩🇪' },
    '33': { name: 'France', code: 'FR', flag: '🇫🇷' },
    '39': { name: 'Italy', code: 'IT', flag: '🇮🇹' },
    '34': { name: 'Spain', code: 'ES', flag: '🇪🇸' },
    '7': { name: 'Russia', code: 'RU', flag: '🇷🇺' },
    '61': { name: 'Australia', code: 'AU', flag: '🇦🇺' },
    '55': { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
    '52': { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
    '82': { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
    '31': { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
    '46': { name: 'Sweden', code: 'SE', flag: '🇸🇪' },
    '47': { name: 'Norway', code: 'NO', flag: '🇳🇴' },
    '45': { name: 'Denmark', code: 'DK', flag: '🇩🇰' },
    '41': { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
    '43': { name: 'Austria', code: 'AT', flag: '🇦🇹' },
    '32': { name: 'Belgium', code: 'BE', flag: '🇧🇪' },
    '351': { name: 'Portugal', code: 'PT', flag: '🇵🇹' },
    '30': { name: 'Greece', code: 'GR', flag: '🇬🇷' },
    '48': { name: 'Poland', code: 'PL', flag: '🇵🇱' },
    '90': { name: 'Turkey', code: 'TR', flag: '🇹🇷' },
    '20': { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
    '27': { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
    '234': { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
    '254': { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
    '971': { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
    '966': { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' },
    '65': { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
    '60': { name: 'Malaysia', code: 'MY', flag: '🇲🇾' },
    '62': { name: 'Indonesia', code: 'ID', flag: '🇮🇩' },
    '63': { name: 'Philippines', code: 'PH', flag: '🇵🇭' },
    '66': { name: 'Thailand', code: 'TH', flag: '🇹🇭' },
    '84': { name: 'Vietnam', code: 'VN', flag: '🇻🇳' },
    '92': { name: 'Pakistan', code: 'PK', flag: '🇵🇰' },
    '880': { name: 'Bangladesh', code: 'BD', flag: '🇧🇩' },
    '94': { name: 'Sri Lanka', code: 'LK', flag: '🇱🇰' },
    '64': { name: 'New Zealand', code: 'NZ', flag: '🇳🇿' },
    '54': { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
    '56': { name: 'Chile', code: 'CL', flag: '🇨🇱' },
    '57': { name: 'Colombia', code: 'CO', flag: '🇨🇴' },
};

// DOM Elements
const phoneInput = document.getElementById('phoneInput');
const trackBtn = document.getElementById('trackBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultCard = document.getElementById('resultCard');
const closeResult = document.getElementById('closeResult');
const clearHistory = document.getElementById('clearHistory');
const historyList = document.getElementById('historyList');

// Result elements
const resultNumber = document.getElementById('resultNumber');
const resultValid = document.getElementById('resultValid');
const resultCountry = document.getElementById('resultCountry');
const resultLocation = document.getElementById('resultLocation');
const resultCarrier = document.getElementById('resultCarrier');
const resultLineType = document.getElementById('resultLineType');

// Event Listeners
trackBtn.addEventListener('click', trackPhoneNumber);
phoneInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        trackPhoneNumber();
    }
});
closeResult.addEventListener('click', () => {
    resultCard.style.display = 'none';
});
clearHistory.addEventListener('click', clearAllHistory);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
});

// Phone number validation and parsing
function parsePhoneNumber(phoneNumber) {
    // Remove all non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Remove leading + if present
    if (cleaned.startsWith('+')) {
        cleaned = cleaned.substring(1);
    }
    
    // Try to extract country code
    let countryCode = null;
    let nationalNumber = cleaned;
    
    // Check for 3-digit country codes first
    for (let i = 3; i >= 1; i--) {
        const code = cleaned.substring(0, i);
        if (countryCodes[code]) {
            countryCode = code;
            nationalNumber = cleaned.substring(i);
            break;
        }
    }
    
    return {
        original: phoneNumber,
        cleaned: cleaned,
        countryCode: countryCode,
        nationalNumber: nationalNumber,
        formatted: countryCode ? `+${countryCode} ${nationalNumber}` : cleaned
    };
}

function validatePhoneNumber(parsed) {
    // Basic validation rules
    const minLength = 7;
    const maxLength = 15;
    
    if (!parsed.cleaned || parsed.cleaned.length < minLength) {
        return {
            valid: false,
            reason: 'Phone number too short'
        };
    }
    
    if (parsed.cleaned.length > maxLength) {
        return {
            valid: false,
            reason: 'Phone number too long'
        };
    }
    
    if (!parsed.countryCode) {
        return {
            valid: false,
            reason: 'Invalid or missing country code'
        };
    }
    
    return {
        valid: true,
        reason: 'Valid phone number format'
    };
}

// Simulate phone number lookup (in real app, this would call an API)
function lookupPhoneNumber(parsed) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const validation = validatePhoneNumber(parsed);
            const countryInfo = countryCodes[parsed.countryCode] || { name: 'Unknown', code: 'XX', flag: '🌍' };
            
            // Simulate carrier and line type detection
            const carriers = ['AT&T', 'Verizon', 'T-Mobile', 'Sprint', 'Vodafone', 'Orange', 'O2', 'EE', 'Three'];
            const lineTypes = ['Mobile', 'Landline', 'VoIP', 'Toll-Free'];
            const locations = ['New York', 'London', 'Mumbai', 'Tokyo', 'Berlin', 'Paris', 'Sydney', 'Toronto'];
            
            const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
            const randomLineType = lineTypes[Math.floor(Math.random() * lineTypes.length)];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            
            resolve({
                number: parsed.formatted,
                valid: validation.valid,
                validationReason: validation.reason,
                country: `${countryInfo.flag} ${countryInfo.name}`,
                countryCode: countryInfo.code,
                location: validation.valid ? randomLocation : 'N/A',
                carrier: validation.valid ? randomCarrier : 'N/A',
                lineType: validation.valid ? randomLineType : 'N/A',
                timestamp: new Date().toISOString()
            });
        }, 1500);
    });
}

// Track phone number
async function trackPhoneNumber() {
    const phoneNumber = phoneInput.value.trim();
    
    if (!phoneNumber) {
        alert('Please enter a phone number');
        return;
    }
    
    // Show loading
    loadingSpinner.style.display = 'block';
    resultCard.style.display = 'none';
    
    try {
        // Parse phone number
        const parsed = parsePhoneNumber(phoneNumber);
        
        // Lookup phone number
        const result = await lookupPhoneNumber(parsed);
        
        // Display results
        displayResults(result);
        
        // Save to history
        saveToHistory(result);
        
        // Hide loading
        loadingSpinner.style.display = 'none';
        
        // Clear input
        phoneInput.value = '';
        
    } catch (error) {
        console.error('Error tracking phone number:', error);
        alert('An error occurred while tracking the phone number');
        loadingSpinner.style.display = 'none';
    }
}

// Display results
function displayResults(result) {
    resultNumber.textContent = result.number;
    
    resultValid.textContent = result.valid ? '✓ Yes' : '✗ No';
    resultValid.className = result.valid ? 'result-value valid' : 'result-value invalid';
    
    resultCountry.textContent = result.country;
    resultLocation.textContent = result.location;
    resultCarrier.textContent = result.carrier;
    resultLineType.textContent = result.lineType;
    
    resultCard.style.display = 'block';
    
    // Scroll to results
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Local storage functions
function saveToHistory(result) {
    let history = getHistory();
    
    // Add new result to beginning of array
    history.unshift(result);
    
    // Keep only last 20 results
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    
    // Reload history display
    loadHistory();
}

function getHistory() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function loadHistory() {
    const history = getHistory();
    
    if (history.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No tracking history yet</p>
                <span>Start tracking phone numbers to see them here</span>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item" onclick="showHistoryDetails(${index})">
            <div class="history-item-info">
                <div class="history-item-number">${item.number}</div>
                <div class="history-item-details">
                    ${item.country} • ${item.carrier} • ${item.lineType}
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="history-item-time">${formatTimestamp(item.timestamp)}</div>
                <button class="delete-history-btn" onclick="deleteHistoryItem(event, ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function showHistoryDetails(index) {
    const history = getHistory();
    const item = history[index];
    
    if (item) {
        displayResults(item);
    }
}

function deleteHistoryItem(event, index) {
    event.stopPropagation();
    
    if (confirm('Delete this history item?')) {
        let history = getHistory();
        history.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        loadHistory();
    }
}

function clearAllHistory() {
    if (confirm('Are you sure you want to clear all tracking history?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadHistory();
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
        return 'Just now';
    } else if (diffMins < 60) {
        return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Input formatting helper
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value;
    
    // Allow only digits, +, spaces, hyphens, and parentheses
    value = value.replace(/[^\d+\s\-()]/g, '');
    
    e.target.value = value;
});
