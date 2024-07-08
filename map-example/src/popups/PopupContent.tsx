import React, {useEffect} from 'react';
import {IOverlayContent} from "xc-map";

export interface IPopupContent<TData> extends IOverlayContent<TData> {
    callback: () => void
}
const PopupContent = <TData,>(
    {
        datas,
        hidePopup,
        callback
    }: IPopupContent<TData>) => {

    useEffect(() => {
        console.log('DK_Treace -- PopupContent.datas: ', datas)
    }, [datas])

    return (
        <div>
            <h2 style={{color:'#000'}}>Popup</h2>
            {datas?.length > 0 && datas.map((data) => (
                <h3 style={{color:'#000'}}>{data.id}</h3>
            ))}
            <button onClick={()=> {
                console.log('close');
                hidePopup && hidePopup()
                callback && callback()
            }}>Close</button>
        </div>
    );
};

export default PopupContent