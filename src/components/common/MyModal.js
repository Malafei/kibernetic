import './css/modal.css'
import { useEffect } from 'react'
import { HOST } from '../../constants/ActionConst'

const Modal = ({visible = false, title = "", content = "", image = "", footer = "", onClose }) => {


    const onKeydown = ({ key }) => {
        switch (key) {
          case 'Escape':
            onClose()
            break
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })
    
    // если компонент невидим, то не отображаем его
    if (!visible) return null
    
    // или возвращаем верстку модального окна
    return (
        <div className='modal' onClick={onClose}>
          <div className='modal-dialog' onClick={e => e.stopPropagation()}>
            <div className='modal-header'>
                <img className='displayed' src={HOST+"/images/" + image} alt={image} height='225'/>
                {/* <span className='modal-close' onClick={onClose}>&times; </span> */}
            </div>
            <div className='modal-body'>
                <h3 className='modal-title'>{title}</h3>
                <div className='modal-content'>{content}</div>
            </div>
            {footer && <div className='modal-footer'>{footer}</div>}
          </div>
        </div>
    )

}
export default Modal;

/* import React, {useEffect} from "react";


const Modal = ({ visible = false, title = "", content = "", footer = "", onClose }) => {
    // создаем обработчик нажатия клавиши Esc
    const onKeydown = ({ key }) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
        }
    };

    // c помощью useEffect цепляем обработчик к нажатию клавиш
    // https://ru.reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        document.addEventListener("keydown", onKeydown);
        return () => document.removeEventListener("keydown", onKeydown);
    });

    // если компонент невидим, то не отображаем его
    if (!visible)
        return null;

    // или возвращаем верстку модального окна
    return (createElement("div", { className: "modal", onClick: onClose },
        createElement("div", { className: "modal-dialog", onClick: (e) => e.stopPropagation() },
            createElement("div", { className: "modal-header" },
                createElement("h3", { className: "modal-title" }, title),
                createElement("span", { className: "modal-close", onClick: onClose }, "\u00D7")),
            createElement("div", { className: "modal-body" },
                createElement("div", { className: "modal-content" }, content)),
            footer && createElement("div", { className: "modal-footer" }, footer))));


};



const App = () => {
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);
    return (createElement(Fragment, null,
        createElement("button", { onClick: () => setModal(true) }, "\u041A\u043B\u0438\u043A-\u043A\u043B\u0438\u043A-\u043A\u043B\u0438\u043A"),
        createElement(Modal, { visible: isModal, title: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", 
        content: createElement("p", null, "\u0427\u0442\u043E-\u0442\u043E \u0432\u0430\u0436\u043D\u043E\u0435"), 
        footer: createElement("button", { onClick: onClose }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"), onClose: onClose })));
};

ReactDOM.render(createElement(StrictMode, null,
    createElement(App, null)), document.getElementById("root")); */
