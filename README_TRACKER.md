# Phone Number Tracker

A modern, responsive web application for tracking and validating phone numbers worldwide.

## Features

### 🔍 Phone Number Tracking
- **International Support**: Track phone numbers from 40+ countries
- **Real-time Validation**: Instant validation of phone number formats
- **Detailed Information**: Get carrier, location, line type, and country details
- **Smart Parsing**: Automatically detects country codes

### 📊 Tracking Results Display
- Phone number with country code formatting
- Validation status (Valid/Invalid)
- Country identification with flags
- Location information
- Carrier/Network provider
- Line type (Mobile, Landline, VoIP, Toll-Free)

### 📝 History Management
- **Persistent Storage**: All tracked numbers saved in browser localStorage
- **Quick Access**: Click any history item to view full details
- **Individual Delete**: Remove specific history entries
- **Clear All**: Bulk delete all tracking history
- **Timestamps**: Relative time display (Just now, X mins ago, etc.)
- **Limit**: Stores up to 20 most recent searches

### 🎨 Modern UI/UX
- Beautiful gradient design with purple/pink theme
- Smooth animations and transitions
- Responsive layout (mobile, tablet, desktop)
- Card-based interface
- Icon-rich visual elements
- Hover effects and interactive feedback

## Supported Countries

The application supports phone numbers from 40+ countries including:
- 🇺🇸 United States/Canada (+1)
- 🇬🇧 United Kingdom (+44)
- 🇮🇳 India (+91)
- 🇨🇳 China (+86)
- 🇯🇵 Japan (+81)
- 🇩🇪 Germany (+49)
- 🇫🇷 France (+33)
- 🇮🇹 Italy (+39)
- 🇪🇸 Spain (+34)
- 🇦🇺 Australia (+61)
- And many more...

## How to Use

1. **Open the Application**
   - Open `tracker.html` in any modern web browser
   - Or serve it using a local HTTP server

2. **Enter a Phone Number**
   - Type a phone number with country code (e.g., +14155552671)
   - Country code is required for accurate tracking
   - Formats accepted: +1234567890, +1 234 567 890, +1-234-567-890

3. **Track the Number**
   - Click the "Track Number" button or press Enter
   - Wait for the loading animation (1.5 seconds)
   - View detailed results in the results card

4. **View History**
   - Scroll down to see all previously tracked numbers
   - Click any history item to view its full details
   - Delete individual items or clear all history

## Files

- **tracker.html** - Main HTML structure
- **tracker.css** - Styling and responsive design
- **tracker.js** - JavaScript logic and functionality

## Technical Details

### Phone Number Validation
- Minimum length: 7 digits
- Maximum length: 15 digits
- Country code detection: 1-3 digit codes
- Format cleaning: Removes spaces, hyphens, parentheses

### Data Storage
- Uses browser localStorage
- Key: `phoneTrackerHistory`
- Format: JSON array of tracking results
- Automatic cleanup: Keeps only 20 most recent entries

### Simulated Tracking
**Note**: This is a demonstration application. In production, you would integrate with real phone number lookup APIs such as:
- Numverify API
- Twilio Lookup API
- Abstract API Phone Validation
- ipqualityscore Phone Validation

The current implementation simulates tracking with randomized but realistic data for:
- Carrier names
- Line types
- Location information

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## Privacy & Security

- All data stored locally in browser
- No data sent to external servers (in demo mode)
- No cookies or tracking
- Educational purposes only
- Respects privacy and data protection regulations

## Future Enhancements

- [ ] Real API integration
- [ ] Export history to CSV/JSON
- [ ] Dark mode toggle
- [ ] Multiple number batch tracking
- [ ] Advanced filtering and search
- [ ] Number formatting options
- [ ] Geolocation mapping
- [ ] SMS verification integration

## License

Educational purposes only. For production use, ensure compliance with phone number lookup regulations and privacy laws.

## Getting Started

### Option 1: Direct File Open
```bash
# Simply open the HTML file in your browser
open tracker.html
```

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 9000

# Then visit: http://localhost:9000/tracker.html
```

### Option 3: Node.js Server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 9000

# Visit: http://localhost:9000/tracker.html
```

## Example Phone Numbers to Test

- **US**: +14155552671
- **UK**: +447911123456
- **India**: +919876543210
- **Germany**: +4915123456789
- **Australia**: +61412345678
- **Japan**: +819012345678

---

**Created with ❤️ for educational purposes**
