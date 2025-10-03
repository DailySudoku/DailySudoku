# Sudoku Progress Tracking Feature

This feature allows external applications to monitor user progress while solving Sudoku puzzles in real-time.

## URL Parameters

Add these parameters to enable progress tracking:

### Required Parameters
- `session=<unique-id>` - A unique session identifier for this game instance
- `s=<puzzle-digits>` - The standard puzzle parameter (81-digit string)

### Optional Parameters
- `notify=<callback-url>` - HTTP endpoint to receive progress updates (URL encoded)
- `method=message` - Use postMessage instead of HTTP callbacks (for iframe integration)
- `interval=<milliseconds>` - Update interval in milliseconds (default: 5000)
- `d=<difficulty>` - Difficulty level (1-4, same as existing feature)

## Integration Methods

### Method 1: PostMessage (Recommended for iframes)

```html
<!-- Embed the Sudoku app in an iframe -->
<iframe id="sudoku-frame" src="https://your-domain.com/play/?s=530070000...&session=abc123&method=message&interval=3000"></iframe>

<script>
// Listen for progress updates
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'sudoku-progress') {
        const progressData = event.data.data;
        const isImmediate = event.data.immediate;
        
        console.log('Progress update:', progressData);
        handleProgressUpdate(progressData);
    }
});
</script>
```

### Method 2: HTTP Callbacks

```javascript
const puzzle = '530070000600195000098000060800060003400803001700020006060000280000419005000080079';
const sessionId = 'session_' + Date.now();
const callbackUrl = encodeURIComponent('https://your-app.com/api/sudoku-progress');

const sudokuUrl = `https://your-domain.com/play/?s=${puzzle}&session=${sessionId}&notify=${callbackUrl}&interval=5000`;

// Direct user to this URL or open in new window
window.open(sudokuUrl);
```

## Progress Data Structure

The progress tracking system sends the following data structure:

```javascript
{
  "sessionId": "unique-session-identifier",
  "timestamp": 1634567890123,
  "gameState": {
    "currentDigits": "530070000600195000...", // Current state (81 chars)
    "initialDigits": "530070000600195000...", // Original puzzle (81 chars)
    "elapsedTime": 45000,                     // Time in milliseconds
    "isPaused": false,                        // Is game currently paused
    "isComplete": false,                      // Has puzzle been solved
    "hintsUsed": 2,                          // Number of hints used
    "pencilMarks": {
      "inner": {                             // Inner pencil marks by cell index
        "0": [1, 2, 3],
        "5": [4, 7]
      },
      "outer": {                             // Outer pencil marks by cell index
        "12": [8, 9]
      }
    },
    "completedDigits": {                     // Which digits are fully placed
      "1": true,
      "2": false,
      "3": true,
      // ... etc for digits 4-9
    },
    "hasErrors": false,                      // Are there any validation errors
    "mode": "solve",                         // Game mode ("solve" or "enter")
    "difficultyLevel": "2"                   // Difficulty level if provided
  }
}
```

## Update Frequency

- **Periodic Updates**: Sent at the specified interval (default 5 seconds)
- **Immediate Updates**: Sent when significant events occur:
  - User makes a move (digit entry, pencil mark change)
  - Game is paused/resumed
  - Game is completed
  - Hint is used

## Privacy Considerations

The progress tracking feature uses privacy-friendly URL parameter names:
- `session` instead of `track` (to avoid ad blocker interference)
- `notify` instead of `callback`
- `method` instead of `mode`

No personal data is collected or transmitted - only game state information.

## Example Implementation

See `example-external-app.html` for a complete working example that demonstrates:
- Setting up an iframe with progress tracking
- Receiving and displaying progress updates
- Handling game completion events
- Real-time status updates

## Error Handling

The progress tracking system is designed to fail gracefully:
- If callback URLs are unreachable, updates are silently dropped
- If postMessage fails, errors are logged to console but don't affect gameplay
- Invalid session IDs or malformed parameters are ignored
- The Sudoku game functions normally even if tracking fails

## Security Notes

- Callback URLs should use HTTPS in production
- Implement proper CORS headers on your callback endpoints
- Validate session IDs on your server to prevent abuse
- Consider implementing rate limiting on callback endpoints

## Browser Compatibility

The progress tracking feature works in all modern browsers that support:
- PostMessage API (for iframe integration)
- Fetch API (for HTTP callbacks)
- URLSearchParams (for parameter parsing)

This includes all browsers supported by the main Sudoku application.
