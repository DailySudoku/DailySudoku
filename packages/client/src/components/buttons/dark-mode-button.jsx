import {useCallback, useState} from 'react';

import ButtonIcon from '../svg-sprites/button-icon';
import {modelHelpers, SETTINGS} from "../../lib/sudoku-model";

export default function DarkModeButton ({grid}) {
    const [allSettings, setAllSettings] = useState(grid.get('settings'));
    const clickHandler = useCallback(
        e => {
            console.log(allSettings[SETTINGS.darkMode], !allSettings[SETTINGS.darkMode])
            e.preventDefault();
            setAllSettings({...allSettings, [SETTINGS.darkMode]: !allSettings[SETTINGS.darkMode]});
            modelHelpers.applyNewSettings(grid, {...allSettings, [SETTINGS.darkMode]: !allSettings[SETTINGS.darkMode]})
        },
        [grid, allSettings, setAllSettings]
    );

    return (
        <button id="hint-question" type="button" title="Toggle Dark Mode" onClick={clickHandler}>
            <ButtonIcon name="theme" />
        </button>
    )
}
