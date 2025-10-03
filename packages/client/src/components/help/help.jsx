import './help.css';

export default function HelpPage({modalHandler}) {
    const closeHandler = () => modalHandler('cancel');
    const difficultyRatingsURL = "https://github.com/SudokuMonster/SukakuExplainer/wiki/Difficulty-Ratings-in-Sukaku-Explainer-v1.17.8";
    return <div className="help-page">
        <div className="content">
            <button className="close-button" onClick={closeHandler}>×</button>

            <h1>Entering digits</h1>
            <p>To enter a digit, first select a cell in the grid by either:</p>
            <ul>
                <li>clicking with the mouse or tapping the cell on your mobile device screen</li>
                <li>using the arrow keys on your computer keyboard</li>
            </ul>
            <p>Then enter a digit by either:</p>
            <ul>
                <li>tapping/clicking the digit on the onscreen keyboard</li>
                <li>typing the digit on your computer keyboard</li>
            </ul>

            <h1>Entering “pencil marks”</h1>
            <p>Once again, the first step is to select one or more cells:</p>
            <ul>
                <li>click or tap and drag to select multiple cells</li>
                <li>use Shift-click or Ctrl-click to select additional cells</li>
                <li>use Shift or Ctrl with the arrow keys to extend the selection</li>
                <li>use Shift-space or Ctrl-space to select or unselect the current cell</li>
            </ul>
            <p>Don’t worry if your selection includes cells which already contain completed
            digits - these cells will not be affected by entering pencil marks.</p>
            <p>Two different types of pencil marks can be added:</p>
            <ul>
                <li>outer pencil marks are intended for so-called “Snyder notation” and are
                entered using Shift+Digit</li>
                <li>inner pencil marks are intended for pairs/triples/candidates and are entered
                using Ctrl+Digit</li>
            </ul>
            <p>Alternatively, the on-screen keyboard includes mode buttons for the different
            types of pencil marks.  Simply select a mode then use the digit buttons to toggle
            the pencil marks on and off.</p>
            <p>In addition to the pencil marks you can apply one a colour highlight to the
            selected cells. If you have coloured a number of cells and wish to return them
            to an uncoloured state, you can double-click the colour mode button.</p>
            <p>You can also switch modes from your keyboard with the following hot keys:</p>
            <ul>
                <li><b>Z</b> - Normal digits</li>
                <li><b>X</b> - Outer pencil marks</li>
                <li><b>C</b> - Inner pencil marks</li>
                <li><b>V</b> - Cell colours</li>
            </ul>
            <p>If you have switched to a pencil marking mode (inner or outer), you can still
            enter a digit by double-tapping/clicking that digit on the on-screen keyboard.
            The double-click action overrides the current mode and does a normal digit entry,
            but afterwards you remain in the original pencil marking mode.</p>
            <p>Sometimes you might enter some ‘outer’ pencil marks and then realise that the
            selected cells form a pair or a triple.  If you want to switch all the pencil marks
            in the selected cells to ‘inner’ pencil marks, use the ‘.’ (dot or period) key or
            double-tap/click the inner pencil marks mode button.</p>
            <p>If you only wish to use one type of pencil mark instead of the separate ‘inner’
            and ‘outer’ pencil marks, you can select the <b>“Simple” pencil making mode</b>
            using the “Settings” menu option.</p>
            <p>There are also two pencil-mark-related menu options:</p>
            <ul>
                <li><b>Hide/Show Pencilmarks</b> — can be used to temporarily hide pencil
                marks and cell colouring to reduce on-screen clutter (hot key: <b>P</b>).</li>
                <li><b>Clear all pencil marks</b> — will permanently discard all pencil
                marks and cell colouring you have added to the grid.</li>
            </ul>

            <h2>Alternate cursor movement keys</h2>

            <p>In addition to the arrow keys, the 'WASD' keys may be used as follows:</p>

            <ul>
                <li><b>W</b> - Up</li>
                <li><b>A</b> - Left</li>
                <li><b>S</b> - Down</li>
                <li><b>D</b> - Right</li>
            </ul>

            <p>These keys can be combined with Ctrl or Shift to extend the selection,
            however be warned that Ctrl-W is commonly used as a hot key to close the current
            browser tab and that function cannot be intercepted on all browsers.</p>

            <h1>Undo / redo</h1>
            <p>If you make a mistake, you can undo one or more steps using Ctrl-Z, or ‘[’,
            or the undo button on the on-screen keypad.</p>
            <p>After using undo, you can use Ctrl-Y or, or ‘]’, or the on-screen redo button
            to replay one or more actions.</p>
            <p>You can use Delete or Backspace to remove a digit or pencil marks from
            selected cells.</p>
            <p>The Esc key will cancel the current selection.</p>
        </div>
    </div>;
}
