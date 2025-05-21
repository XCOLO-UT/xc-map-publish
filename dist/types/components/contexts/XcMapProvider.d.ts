import React, { ReactNode } from "react";
import { IXcMapOption } from "../types/xc-map";
declare const XcMapContext: React.Context<IXcMapOption>;
export interface IXcMapProviderProps {
    xcMapOption: IXcMapOption;
    children?: ReactNode;
}
declare const XcMapProvider: ({ xcMapOption, children }: IXcMapProviderProps) => JSX.Element;
export { XcMapProvider, XcMapContext };
