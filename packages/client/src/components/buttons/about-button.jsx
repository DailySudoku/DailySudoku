import { useCallback } from 'react';

import ButtonIcon from '../svg-sprites/button-icon';

export default function AboutButton ({menuHandler}) {
    const clickHandler = useCallback(
        e => {
            e.preventDefault();
            const menuAction = 'show-about-modal';
            menuHandler(menuAction);
        },
        [menuHandler]
    );

    return (
        <button id="hint-question" type="button" title="About" onClick={clickHandler}>
            <ButtonIcon name="menu" />
        </button>
    )
}
