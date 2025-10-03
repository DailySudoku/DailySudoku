import { useCallback } from 'react';

import { secondsAsHMS } from '../../lib/string-utils';

import "./solved-puzzle-options.css";


export default function SolvedPuzzleOptions({elapsedTime, menuHandler}) {
    const clickHandler = useCallback(
        e => {
            const menuAction = e.target.dataset.menuAction;
            if (menuAction) {
                e.preventDefault();
                menuHandler(menuAction);
            }
        },
        [menuHandler]
    );
    return (
        <div className="solved-puzzle-options" onClick={clickHandler}>
            <p>Puzzle solved in {secondsAsHMS(elapsedTime)}</p>
        </div>
    )
}
