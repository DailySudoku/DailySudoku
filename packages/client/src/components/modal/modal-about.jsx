import projectPackageJson from '../../../package.json';

const appVersion = projectPackageJson.version || "unknown";


export default function ModalAbout({modalHandler}) {
    const closeHandler = () => modalHandler('cancel');
    const thisYear = (new Date()).getFullYear();
    return (
        <div className="modal about">
            <h1>About this app</h1>
            <p>Application version: {appVersion}</p>
            <p>This Sudoku web application was created for <a href="https://sudokuexchange.com/"
            >SudokuExchange.com</a> by <a href="https://grantm.github.io/">Grant McLean</a>.</p>
            <p>It is <a href="https://www.fsf.org/about/what-is-free-software">free software</a>{' '}
            which you can use, copy, modify and share under the terms of the
            GNU Affero General Public License version 3 (<a href="https://opensource.org/licenses/AGPL-3.0"
            >AGPLV3</a>). The source code is available at:<br />
            <a href="https://github.com/grantm/sudoku-web-app">https://github.com/grantm/sudoku-web-app</a>.</p>
            <p>This fork was created for the Discord bot <a href="https://servant.tancred.de">Servant</a> by 
            <a href="https://github.com/Tancred423">Tancred</a>. If you launch a game from the bot, this forked version 
            will provide progress updates back to the bot. The source code of this fork can also be used for other 
            external applications and is available at:<br />
            <a href="https://github.com/Tancred423/sudoku-web-app?">https://github.com/Tancred423/sudoku-web-app</a>.</p>
            <p>Copyright © 2020{`-${thisYear}`} Grant McLean</p>
            <div className="buttons">
                <button className="primary" onClick={closeHandler} autoFocus>OK</button>
            </div>
        </div>
    )
}
