import {
    MODAL_TYPE_CHECK_RESULT,
    MODAL_TYPE_CONFIRM_RESTART,
    MODAL_TYPE_HELP,
    MODAL_TYPE_ABOUT,
    MODAL_TYPE_CONFIRM_CLEAR_COLOR_HIGHLIGHTS,
} from '../../lib/modal-types';

import ModalAbout from './modal-about';
import ModalConfirmRestart from './modal-confirm-restart';
import ModalConfirmClearColorHighlights from './modal-confirm-clear-color-highlights'
import ModalCheckResult from './modal-check-result';
import HelpPage from '../help/help';

import "./modal.css";

const stopPropagation = (e) => e.stopPropagation();

function ModalBackdrop() {
    return (
        <div className="modal-backdrop" />
    );
}

export default function ModalContainer({modalState, modalHandler, menuHandler}) {
    let content = null;
    if (!modalState) {
        return null;
    }
    const containerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            if (modalState.escapeAction) {
                modalHandler(modalState.escapeAction);
            }
        }
    }
    if (modalState.modalType === MODAL_TYPE_ABOUT) {
        content = <ModalAbout modalHandler={modalHandler} />;
    }
    else if (modalState.modalType === MODAL_TYPE_CONFIRM_RESTART) {
        content = <ModalConfirmRestart modalHandler={modalHandler} solved={modalState.solved} />;
    }
    else if (modalState.modalType === MODAL_TYPE_CONFIRM_CLEAR_COLOR_HIGHLIGHTS) {
        content = <ModalConfirmClearColorHighlights modalHandler={modalHandler} />;
    }
    else if (modalState.modalType === MODAL_TYPE_CHECK_RESULT) {
        content = <ModalCheckResult modalState={modalState} modalHandler={modalHandler} />;
    }
    else if (modalState.modalType === MODAL_TYPE_HELP) {
        content = <HelpPage modalHandler={modalHandler} />;
    }
    else {
        console.log('<Modal />: Unhandled modalState:', modalState);
    }
    if (content) {
        return <>
            <ModalBackdrop />
            <div className="modal-container" onClick={containerClickHandler} onMouseDown={stopPropagation}>
                {content}
            </div>
        </>;
    };
    return null;
}
