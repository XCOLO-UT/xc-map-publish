import Cctv from "../assets/icons/map/cctv.png";
import SpatN from "../assets/icons/map/sig_spat_n.svg";
import SpatY from "../assets/icons/map/sig_spat_y.svg";
import Probe from "../assets/icons/map/av_car.svg";
import useXcMapAnimation from "./useXcMapAnimation";
import {IXcMapOption} from "xc-map";

const useXcMapOption = () => {
    const {getCircleAnimationProperty} = useXcMapAnimation()

    const xcMapOption: IXcMapOption = {
        featureStyle : {
            'cctv' : {
                type: 'marker',
                event: [
                    {
                        status : 'default',
                        style : {
                            image: {
                                height: 30,
                                width: 30,
                                src: Cctv
                            },
                        }
                    },
                    {
                        status : 'selected',
                        style : {
                            image: {
                                height: 35,
                                width: 35,
                                src: Cctv
                            },
                        }
                    },
                ]
            },
            'sig' : {
                type: 'marker',
                event : [
                    {
                        status : 'default',
                        style : {
                            image: {
                                height: 30,
                                width: 30,
                                src: SpatN
                            },
                        }
                    },
                    {
                        status : 'spatY',
                        style : {
                            image: {
                                height: 30,
                                width: 30,
                                src: SpatY
                            },
                        }
                    },
                    {
                        status : 'spatN',
                        style : {
                            image: {
                                height: 30,
                                width: 30,
                                src: SpatN
                            },
                        }
                    },
                ]
            },
            'probe' : {
                type: 'marker',
                event : [
                    {
                        status : 'default',
                        style : {
                            image: {
                                height: 50,
                                width: 45,
                                src: Probe
                            },
                        }
                    },
                    {
                        status : 'selected',
                        style : {
                            image: {
                                height: 60,
                                width: 55,
                                src: Probe
                            },
                        }
                    },
                ]
            },
            'link' : {
                type: 'vector',
                event : [
                    {
                        status : 'default',
                        style : {
                            fill: {
                                color: '#999',
                            },
                            stroke: {
                                color: '#000',
                                width: 1,
                            },
                        }
                    },
                    {
                        status : 'selected',
                        style : {
                            fill: {
                                color: '#EEE',
                            },
                            stroke: {
                                color: '#f5c772',
                                width: 2,
                            },
                        }
                    },
                    {
                        status : 'highlight',
                        style : {
                            fill: {
                                color: '#f5c772',
                            },
                            stroke: {
                                color: '#f5c772',
                                width: 2,
                            },
                        }
                    },
                ]
            }
        },
        animationStyle: {
            'redCircleWave': getCircleAnimationProperty
        },
        viewOption : {
            projection: 'EPSG:3857',
            center: [14106805.111061508, 4490235.647345444],
            zoom: 15,
            maxZoom: 19,
            minZoom: 11,
            multiWorld: true,
            constrainResolution: false,
        },
        infoStyle : {
        },
    }

    return {
        xcMapOption
    }
}

export default useXcMapOption