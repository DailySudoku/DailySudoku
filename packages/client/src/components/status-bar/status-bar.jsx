import Timer from '../timer/timer';
import HelpButton from '../buttons/help-button';


import './status-bar.css';
import DarkModeButton from "../buttons/dark-mode-button";
import AboutButton from "../buttons/about-button";

const stopPropagation = (e) => e.stopPropagation();


function SiteLink () {
    return (
        <div className="site-link">
            <a href="/">
                <svg className="site-domain-image" version="1.1" viewBox="0 0 650 120">
                    <use href="#site-domain" />
                </svg>
            </a>
        </div>
    );
}

function StatusBar ({
    grid, showTimer, startTime, intervalStartTime, endTime, menuHandler
}) {
    const timer = showTimer
        ? (
            <Timer
                startTime={startTime}
                intervalStartTime={intervalStartTime}
                endTime={endTime}
            />
        )
        : null;
    return (
        <div className="status-bar" onMouseDown={stopPropagation}>
            {timer}
            <SiteLink />
            <div className="status-bar-buttons">
                <DarkModeButton grid={grid} />
                <HelpButton menuHandler={menuHandler} />
                <AboutButton menuHandler={menuHandler} />
            </div>

        </div>
    );
}

export default StatusBar;
