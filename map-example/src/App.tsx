import { Routes, Route } from 'react-router-dom'
import SampleLayout from './layouts/SampleLayout'
import HomePage from './pages/HomePage'
import MapInitSample from './pages/getting-started/MapInitSample'
import MapOptionsSample from './pages/getting-started/MapOptionsSample'
import TileTypeSample from './pages/getting-started/TileTypeSample'
import XyzSample from './pages/layers/XyzSample'
import WfsSample from './pages/layers/WfsSample'
import MarkerSample from './pages/layers/MarkerSample'
import GeoJsonSample from './pages/layers/GeoJsonSample'
import MinimapSample from './pages/layers/MinimapSample'
import LayerCommonSample from './pages/layers/LayerCommonSample'
import FeatureStyleSample from './pages/styling/FeatureStyleSample'
import StatusStyleSample from './pages/styling/StatusStyleSample'
import StripeSample from './pages/styling/StripeSample'
import ArrowSample from './pages/styling/ArrowSample'
import AnimationSample from './pages/styling/AnimationSample'
import RenderLabelSample from './pages/styling/RenderLabelSample'
import FeatureSelectSample from './pages/interactions/FeatureSelectSample'
import FeatureSelectAdvSample from './pages/interactions/FeatureSelectAdvSample'
import TooltipSample from './pages/interactions/TooltipSample'
import PlaceMarkerSample from './pages/interactions/PlaceMarkerSample'
import PlaceLineStringSample from './pages/interactions/PlaceLineStringSample'
import BasicMeasureSample from './pages/measurement/BasicMeasureSample'
import AreaMeasureSample from './pages/measurement/AreaMeasureSample'
import MeasureStyleSample from './pages/measurement/MeasureStyleSample'
import MeasurePopupSample from './pages/measurement/MeasurePopupSample'
import BasicOverlaySample from './pages/overlays/BasicOverlaySample'
import ReactOverlaySample from './pages/overlays/ReactOverlaySample'
import FeatureCollectionSample from './pages/utilities/FeatureCollectionSample'
import ColorUtilSample from './pages/utilities/ColorUtilSample'
import MapFunctionsSample from './pages/utilities/MapFunctionsSample'
import TrafficSignalSample from './pages/integrated/TrafficSignalSample'
import TrafficLinkSample from './pages/integrated/TrafficLinkSample'

function App() {
  return (
    <Routes>
      <Route element={<SampleLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* 기본 설정 */}
        <Route path="/getting-started/init" element={<MapInitSample />} />
        <Route path="/getting-started/options" element={<MapOptionsSample />} />
        <Route path="/getting-started/tile" element={<TileTypeSample />} />
        {/* 레이어 */}
        <Route path="/layers/xyz" element={<XyzSample />} />
        <Route path="/layers/wfs" element={<WfsSample />} />
        <Route path="/layers/marker" element={<MarkerSample />} />
        <Route path="/layers/geojson" element={<GeoJsonSample />} />
        <Route path="/layers/minimap" element={<MinimapSample />} />
        <Route path="/layers/common" element={<LayerCommonSample />} />
        {/* 스타일 */}
        <Route path="/styling/feature" element={<FeatureStyleSample />} />
        <Route path="/styling/status" element={<StatusStyleSample />} />
        <Route path="/styling/stripe" element={<StripeSample />} />
        <Route path="/styling/arrow" element={<ArrowSample />} />
        <Route path="/styling/animation" element={<AnimationSample />} />
        <Route path="/styling/render-label" element={<RenderLabelSample />} />
        {/* 인터랙션 */}
        <Route path="/interactions/select" element={<FeatureSelectSample />} />
        <Route path="/interactions/select-advanced" element={<FeatureSelectAdvSample />} />
        <Route path="/interactions/tooltip" element={<TooltipSample />} />
        <Route path="/interactions/place-marker" element={<PlaceMarkerSample />} />
        <Route path="/interactions/draw-line" element={<PlaceLineStringSample />} />
        {/* 측정 */}
        <Route path="/measurement/distance" element={<BasicMeasureSample />} />
        <Route path="/measurement/area" element={<AreaMeasureSample />} />
        <Route path="/measurement/style" element={<MeasureStyleSample />} />
        <Route path="/measurement/popup" element={<MeasurePopupSample />} />
        {/* 오버레이 */}
        <Route path="/overlays/basic" element={<BasicOverlaySample />} />
        <Route path="/overlays/react" element={<ReactOverlaySample />} />
        {/* 유틸리티 */}
        <Route path="/utilities/feature-collection" element={<FeatureCollectionSample />} />
        <Route path="/utilities/color" element={<ColorUtilSample />} />
        <Route path="/utilities/map-functions" element={<MapFunctionsSample />} />
        {/* 통합 */}
        <Route path="/integrated/signal" element={<TrafficSignalSample />} />
        <Route path="/integrated/traffic" element={<TrafficLinkSample />} />
      </Route>
    </Routes>
  )
}

export default App
