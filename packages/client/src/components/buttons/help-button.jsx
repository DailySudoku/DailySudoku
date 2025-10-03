import { useCallback } from 'react';

import ButtonIcon from '../svg-sprites/button-icon';

export default function HelpButton ({menuHandler}) {
    const clickHandler = useCallback(
        e => {
            e.preventDefault();
            const menuAction = 'show-help-page';
            menuHandler(menuAction);
        },
        [menuHandler]
    );

    return (
        <button id="hint-question" type="button" title="Help" onClick={clickHandler}>
            <ButtonIcon name="menu" />
        </button>
    )
}
