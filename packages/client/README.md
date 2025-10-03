This project implements the Sudoku web app used on [SudokuExchange.com](https://sudokuexchange.com).

Features include:

* Enter a puzzle into a blank grid (e.g: transcribe a printed puzzle)
* Check that the puzzle has a unique solution (in case you made a typo)
* Share a puzzle as a link [like this](https://sudokuexchange.com/play/?s=000001230123008040804007650765000000000000000000000123012300804080400765076500000)
* Two types of pencilmarks (for Snyder notation and doubles/triples or simple candidate lists)
* Cell colouring
* An optional dark mode theme
* Keyboard shortcuts for desktop browsers (including Ctrl-Z/Y Undo/Redo)
* Touchscreen support for mobile or tablet browsers
* Help option on the menu to access user guide
* Multi-cell selections for entering pencil marks
* Flexible display: scales up to huge screens or down to small screens, adapts
  automatically to portrait vs landscape orientation, and supports full screen mode
  to remove distractions
* Configurable options so you can turn on the features you find helpful and turn
  off the features you find annoying
* Free to use and no ads
* Full source code available

## [Fork] Progress Tracking for External Apps

This Sudoku app now includes a progress tracking feature that allows external applications to monitor user progress in real-time while solving puzzles.

### How to Use Progress Tracking

Add these URL parameters to enable progress tracking:

**Required:**
- `session=<unique-id>` - A unique session identifier for this game instance
- `s=<puzzle-digits>` - The standard puzzle parameter (81-digit string)

**Optional:**
- `notify=<callback-url>` - HTTP endpoint to receive progress updates (URL encoded)
- `method=message` - Use postMessage instead of HTTP callbacks (for iframe integration)
- `interval=<milliseconds>` - Update interval in milliseconds (default: 5000)

### Example Usage

**For iframe integration:**
```html
<iframe src="https://your-domain.com/play/?s=530070000...&session=abc123&method=message&interval=3000"></iframe>
```

**For HTTP callbacks:**
```javascript
const url = `https://your-domain.com/play/?s=${puzzle}&session=${sessionId}&notify=${callbackUrl}&interval=5000`;
```

### Progress Data

The system tracks and reports:
- Current puzzle state (digits entered)
- Pencil marks (both inner and outer)
- Elapsed time and pause/resume status
- Hints used
- Completion status and final results
- Real-time updates on significant events

See `PROGRESS_TRACKING.md` for complete documentation and `example-external-app.html` for a working demonstration.

## Copyright and License

This software is copyright (c) 2019 Grant McLean <grant@mclean.net.nz> and is
released as free software under the terms of the GNU Affero General Public
License (AGPL) version 3 or later.  You may use, copy, modify and share the
software under the terms of that license.
