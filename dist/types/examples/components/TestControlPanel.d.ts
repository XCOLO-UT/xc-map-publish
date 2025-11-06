/**
 * 🧪 테스트 컨트롤 패널
 *
 * 실시간 마커 이동 테스트 및 지도 타일 변경 기능을 제공합니다.
 */
import React from 'react';
import { IMarker } from '../../components';
import { IMarkerApis } from '../../components/layer/Marker';
import { ISigData } from '../data/dummyData';
interface TestControlPanelProps {
    sigMarkers: IMarker<ISigData>[] | null;
    sigMarkerRef: React.RefObject<IMarkerApis<ISigData>>;
    getSigDummyMarkers: () => void;
    currentTileType: 'Base' | 'Satellite' | 'Hybrid' | 'midnight';
    setTileType: (type: 'Base' | 'Satellite' | 'Hybrid' | 'midnight') => void;
    onTileTypeChange: (type: 'Base' | 'Satellite' | 'Hybrid' | 'midnight') => void;
}
export declare const TestControlPanel: React.FC<TestControlPanelProps>;
export {};
