import React, {useEffect} from 'react';
import {IOverlayChildrenProps} from "xc-map";

export interface IPopupContent<TData> extends IOverlayChildrenProps<TData> {
    testTitle: string
}
const PopupContent = <TData,>(
    {
        datas,
        hidePopup,
        testTitle
    }: IPopupContent<TData>) => {

    useEffect(() => {
        console.log('DK_Treace -- PopupContent.datas: ', datas)
    }, [datas])

    return (
        <div className={'xc-popup'}>
            <h2 style={{color:'#000'}}>Popup + {testTitle}</h2>
            {datas && datas?.length > 0 && datas.map((data) => (
                <h3 style={{color:'#000'}}>{data.id}</h3>
            ))}
            <button onClick={()=> {
                console.log('close');
                hidePopup && hidePopup()
            }}>Close</button>
        </div>
    );
};

export default PopupContent as <TData, >(props:IPopupContent<TData>) => JSX.Element