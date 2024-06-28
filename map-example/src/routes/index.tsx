import {useRoutes} from 'react-router-dom';
import SampleRoutes from "./SampleRoutes.tsx";

// project import

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([SampleRoutes]);
}
