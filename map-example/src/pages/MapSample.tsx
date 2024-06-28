import {Link} from "react-router-dom";

const MapSample = () => {

    return (
        <div>
            <ul>
                <li><Link to="/sample/link">링크 sample</Link></li>
                <li><Link to="/sample/marker">마커 sample</Link></li>
                <li><Link to="/sample/drag-and-drop">드래그앤드랍 sample</Link></li>
                <li><Link to="/sample/measurement">거리&면적재기 sample</Link></li>
            </ul>
        </div>
    )
}

export default MapSample