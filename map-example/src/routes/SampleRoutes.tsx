import LinkSample from "../pages/LinkSample.tsx";
import MarkerSample from "../pages/MarkerSample.tsx";
import DragAndDropSample from "../pages/DragAndDropSample.tsx";
import {Outlet} from "react-router-dom";
import MapSample from "../pages/MapSample.tsx";
import MeasurementSample from "../pages/MeasurementSample.tsx";

const SampleRoutes = {
    path: '/',
    element: <div><Outlet /></div>,
    children: [
        {
            path: 'sample',
            children: [
                {
                    path: '',
                    element: <MapSample/>
                },
                {
                    path: 'link',
                    element: <LinkSample/>
                },
                {
                    path: 'marker',
                    element: <MarkerSample/>
                },
                {
                    path: 'measurement',
                    element: <MeasurementSample/>
                },
                {
                    path: 'drag-and-drop',
                    element: <DragAndDropSample/>
                },
            ]
        }
    ]
}

export default SampleRoutes
