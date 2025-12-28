function DialogPopup({ header, content, onCloseClick }) {
    return(
        <>
            <div className="popup-black" onClick={() => onCloseClick()}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <a 
                        className="popup-close" 
                        href="#"
                        onClick={() => {onCloseClick()}}
                    ></a>
                    <h3>{ header }</h3>
                    <div className='popup-content'>{ content }</div>
                </div>
            </div>
        </>
    )
}

export default DialogPopup;