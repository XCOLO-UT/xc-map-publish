import {Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";
import {IAnimationProperty, IAnyObject} from "xc-map/src/components/types/xc-map.ts";

// 마커 애니메이션 적용 Hook sample
const useXcMapAnimation = () => {

    const getCircleAnimationProperty = (data?: IAnyObject): IAnimationProperty => {
        const param = data === undefined || Object.keys(data).length === 0 ?
        {
            radius: 5,
            opacity: 0.9,
            speed: 0.21,
        } : data

        const circleStyle = new Style({
            image: new CircleStyle({
                radius: param.radius,
                stroke: new Stroke({
                    color: `rgba(255, 0, 0, ${param.opacity})`,
                    width: 2
                })
            })
        });

        if (param.radius < 35) {
            param.radius += param.speed;
            param.opacity -= param.speed / 35;
        } else {
            param.radius = 5;
            param.opacity = 0.9;
        }
        return {
            style: circleStyle,
            param: param
        }
    }

    return {
        getCircleAnimationProperty,
    }
}

export default useXcMapAnimation