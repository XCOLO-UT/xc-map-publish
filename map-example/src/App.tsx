import './App.css'
import 'xc-map/dist/styles/map.css'
import 'ol/ol.css'
import Routes from './routes';
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    )
}

export default App
