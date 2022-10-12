import React from 'react';
import cl from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]
    const bgClasses = [cl.popupBg]


    if(visible){
        rootClasses.push(cl.active)
        bgClasses.push(cl.popupBgActive)
    }

    return (
        <>
        <div className={rootClasses.join(" ")}>
            <div className={cl.myModalContent}>
                {children}
            </div>
        </div>
        <div className={bgClasses.join(' ')} onClick={()=>setVisible(false)}></div>
        </>
    )
}

export default MyModal;