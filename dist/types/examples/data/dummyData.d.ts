/**
 * 🎭 테스트용 더미 데이터
 *
 * 라이브러리 예시를 위한 더미 데이터입니다.
 * 실제 프로젝트에서는 API를 통해 데이터를 가져와야 합니다.
 */
export interface ISigData {
    sigId: string;
    intersectionId: string;
    intersectionNm: string;
    commIp: string;
    commPort: number;
    modelNm: string;
    instlYy: string;
    longitude: number;
    latitude: number;
    heading: number;
    spatYn: string;
    regDt: string;
    regUserId: string;
}
export interface ICctvData {
    cctvId: string;
    maker: string;
    makerNm?: string;
    model: string;
    instlLc: string;
    instlDt: string;
    longitude: number;
    latitude: number;
    ctrlIpAdres: string;
    ctrlPort: number;
    ctrlId: string;
    ctrlPswd: string;
    rtspUrl: string;
    hlsUrl: string;
    ptzSpd: number;
    presetYn: string;
    regUserId?: string;
    areaId: number;
    areaNm: string;
    commSttus?: string;
    colctDt?: number;
}
export interface IServiceData {
    intersectionId: string;
    anlsDt: string;
    serviceGrd: string;
    intersectionNm: string;
    longitude: number;
    latitude: number;
}
export declare const getSigDummyData: () => ISigData[];
export declare const getCctvDummyData: () => ICctvData[];
export declare const getServiceDummyData: () => IServiceData[];
