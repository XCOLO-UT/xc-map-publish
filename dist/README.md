# XC-MAP 라이브러리
- openLayers에 기반하여 FTMS에 자주 사용되는 지도기능을 제공하기 위한 라이브러리입니다.

```
dist/styles - 지도에서 사용되는 map.css 정의, 필요시 같은 class 명을 !important로 덮어서 사용
dist/types/components - 지도 compoenent
```

## `XcMap.tsx`
* 지도의 루트 컴포넌트로, OpenLayers Map 객체를 관리합니다. 모든 지도 요소들은 이 컴포넌트의 하위 children으로 포함된다.
* xcMapOption: 지도 설정 옵션
* events: 지도 자체에 이벤트를 적용하고 싶을경우 사용
* apis
  * getZoomLevel : (level: number | undefined) => void
* disablePan: 패닝 제어 비활성화 여부
* disableZoom: 줌 제어 비활성화 여부

## layer
* Layer 요소들의 집합
### `Common.tsx`
- layer의 공통적으로 적용되어야 하는 항목들에 대해서 일괄 제어를 위한 component
### `Marker.tsx`
- Marker 표현을 위한 component
- 사용자 편의를 위해 만들어둔 component
- 특정 marker의 위치를 변경 시키거나 style 변경시키기 위한 api 제공
### `Minimap.tsx`
- 미니맵(overviewmap) 표현을 위한 component
- position : 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'gone'
- gone 일경우 미니맵은 표현되지 않는다.
- getLayers : 미니맵 내부에 표현하고 싶은 layer들을 전부 넣어주면 됨
### `PlaceMarker.tsx`
- Marker를 디폴트로 지도 중앙에 위치시킨뒤, 드래그앤드랍으로 이동시키는 component
- 사용자 편의를 위해 만들어둔 component
- 다른 component들과 달리 vectorLayer와 MarkerDragAndDrop interacion이 component 내부에 위치
- onMoveMarker : 마커가 움직일때 event 발생
- onPlaceMarker : 마커를 위치 시켰을 때 event 발생
### `Tile.tsx`
- openLayers의 TileLayer를 xcMap 객체에 addLayer 시키는 component
### `Vector.tsx`
- openLayers의 VectorLayer를 xcMap 객체에 addLayer 시키는 component
### `Wfs.tsx`
- WFS 데이터를 표현하기 위한 component
- 사용자 편의를 위해 만들어둔 component
- getStatusInfo : 링크의 상태값을 리턴하여 소통정보 또는 통합지표 표현
- getVectorValue : api에서 조회한 데이터를 value안에 넣어야 할 경우에 사용
- getVectorLabel: vector에 label 표현이 필요한경우 사용
- zoomUrls: zoomLevel 별로 다르게 표현되어야 할경우 정의 필요
- getFeatureTypeStyle: xcMapOption을 사용하지 않고 style 적용이 필요할 경우 정의
- filter : 사용여부에 따라 feature 표시를 해주지 않을 경우 사용
- useBbox : bbox 값 사용 여부

- apis
  - feature 별로 visible 시켜야 할경우 사용
  - getWfsFeatures로 wfs를 이용해서 가져온 feature 목록을 조회한다음
  - setVisible을 feature당 한번씩 호출
  - 조건은 직접 확인하고 해당 feature의 id와 visible만 넘겨주면됨
    - getWfsFeatures: () => Feature[]
    - setVisible: (id: string, visible: boolean) => void
    - refresh : () => void
    - setWfsStyle: (id: string, featureName: string, status: string) => void
### `Wms.tsx`
- WMS 데이터를 표현하기 위한 component
- 사용자 편의를 위해 만들어둔 component
- zoomParams : zoomLevel 별로 다르게 표현되어야 할경우 정의 필요
### `Xyz.tsx`
- 배경지도 Tile을 표현하기 위한 component
### `PlaceLineString.tsx`
- LineString을 그려서 등록하는 layer component
- active: 그리기 가능 여부
- onDrawEnd: 그리기 완료시 콜백
- onDrawing: 그리는 중에 콜백
- onCheckPoint: 점을 찍을때마다 콜백
- defaultValues : ICoordinate[] 형태의 defaultValues
## source
* Source 요소들의 집합
### `TileWms.ts`
- TileWms Source return
### `VectorFeature.ts`
- Feature[]로 구성된 VectorSource를 return
### `VectorWfs.ts`
- url로 구성된 VectorSource를 return
### `Xyz.ts`
- XYZ Source return
## interaction
* 지도 이벤트 요소들의 집합
### `FeatureTooltip.tsx`
- Feature에 tooltip을 표현하고 싶을때 사용
- getTooltip: 툴팁 내부에 표현할 정보를 html 형태로 return 시킬 props 정의 필요 
### `MarkerDragAndDrop.tsx`
- layerName에 들어있는 marker의 drag and drop 이벤트 적용
- PlaceMarker 용으로 만들어졌기 때문에, 가장 첫번째 마커뿐이 움직이지 않음
### `Measurement.tsx`
- 거리, 면적, 반경 측정 기능 제공
- 측정 타입별 스타일 커스터마이징 지원
- 선분별 길이 표시 및 측정 결과 팝업 제공
- 자동 layerName 생성으로 다중 컴포넌트 사용 가능

#### Props
- `isClearPreviousMeasure?: boolean` - 이전 측정 결과 자동 삭제 여부 (기본값: true)
- `isShowSegmentLength?: boolean` - 선분별 길이 표시 여부 (기본값: true)
- `isShowPopupUI?: boolean` - 팝업 UI 사용 여부 (기본값: true)
- `measurementStyles?: IMeasurementStyles` - 측정 스타일 커스터마이징
- `renderPopup?: (props: IMeasurementPopupChildrenProps) => React.ReactNode` - 커스텀 팝업 렌더 함수
- `popupOrderConfig?: IPopupOrderConfig` - 팝업 순서 및 z-index 설정
- `onDrawEnd: () => void` - 측정 완료시 콜백

#### APIs
- `setMeasureType: (measureType: MeasureType) => void` - 측정 타입 설정
- `clearAllMeasurements: () => void` - 모든 측정 결과 삭제

#### MeasureType
- `'LineString'` - 거리 측정
- `'Polygon'` - 면적 측정  
- `'Circle'` - 반경 측정
- `''` - 측정 종료

#### 스타일 커스터마이징
```typescript
const customStyles: IMeasurementStyles = {
  LineString: {
    stroke: { color: '#ff0000', width: 3 },
    drawing: { stroke: { color: 'rgba(255, 0, 0, 0.7)', width: 2 } },
    completed: { stroke: { width: 4 } }
  },
  Polygon: {
    stroke: { color: '#00ff00', width: 3 },
    fill: { color: 'rgba(0, 255, 0, 0.25)' },
    drawing: { 
      stroke: { color: 'rgba(0, 255, 0, 0.8)', width: 2 },
      fill: { color: 'rgba(0, 255, 0, 0.1)' }
    }
  },
  common: {
    segmentLabel: {
      font: '12px Arial',
      textColor: '#ffffff',
      backgroundColor: 'rgba(255, 100, 0, 0.9)',
      borderRadius: 4
    }
  }
};
```

#### 커스텀 팝업 사용법
```typescript
// 커스텀 팝업 데이터 인터페이스
interface IMeasurementPopupData {
  value: string;           // "1.2 km", "0.5 km²" - 완성된 표시값
  measureType: MeasureType; // 'LineString' | 'Polygon' | 'Circle' | ''
  color: string;           // 측정 타입별 색상 "#ff0000"
  rawValue: number;        // 미터 단위 원시값 (계산 필요시)
  coordinates: ICoordinate; // 팝업 위치 (고급 기능 필요시)
}

// 커스텀 팝업 렌더 함수
const renderCustomPopup = ({ measurementData, onDelete }: IMeasurementPopupChildrenProps) => {
  const { value, measureType, color, rawValue, coordinates } = measurementData;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: `2px solid ${color}`,
      borderRadius: '12px',
      padding: '16px',
      color: 'white'
    }}>
      <h3 style={{ color }}>
        {measureType === 'LineString' ? '거리 측정' : 
         measureType === 'Polygon' ? '면적 측정' : '반지름 측정'}
      </h3>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '12px' }}>
        원시값: {rawValue.toFixed(1)}m<br/>
        위치: {coordinates.longitude.toFixed(6)}, {coordinates.latitude.toFixed(6)}
      </div>
      <button onClick={onDelete} style={{ marginTop: '10px' }}>
        삭제
      </button>
    </div>
  );
};
```

#### 팝업 순서 설정
```typescript
// 팝업 순서 설정 인터페이스
interface IPopupOrderConfig {
  type: 'newest-top' | 'oldest-top';  // 새로운 것이 위 / 오래된 것이 위
  startZIndex?: number;        // 시작 z-index (기본: 500)
  tempPopupZIndex?: number;    // 임시 팝업 z-index (기본: 9999)
}

// 기본 설정 (새로운 측정이 위로)
const defaultOrderConfig: IPopupOrderConfig = {
  type: 'newest-top',    // 기본값
  startZIndex: 500,      // 기본값
  tempPopupZIndex: 9999  // 기본값
};

// 오래된 측정이 위로 (새로운 것은 아래로)
const oldestTopConfig: IPopupOrderConfig = {
  type: 'oldest-top',
  startZIndex: 1000,
  tempPopupZIndex: 9999
};

// 높은 z-index로 시작 (다른 UI 요소와 충돌 방지)
const highZIndexConfig: IPopupOrderConfig = {
  type: 'newest-top',
  startZIndex: 5000,
  tempPopupZIndex: 9999
};
```

#### 사용 예시
```jsx
import { useRef } from 'react';
import { interaction, IMeasurementApis, IMeasurementStyles, IMeasurementPopupChildrenProps } from 'xc-map';

function App() {
  const measurementRef = useRef<IMeasurementApis>(null);
  
  const customStyles: IMeasurementStyles = {
    LineString: { stroke: { color: '#ff0000', width: 3 } },
    Polygon: { 
      stroke: { color: '#00ff00', width: 3 },
      fill: { color: 'rgba(0, 255, 0, 0.25)' }
    },
    Circle: { 
      stroke: { color: '#0066ff', width: 3 },
      fill: { color: 'rgba(0, 102, 255, 0.25)' }
    }
  };

  // 기본 팝업 사용 (새로운 측정이 위로)
  return (
    <XcMap xcMap={xcMap}>
      <XcInteractions>
        <interaction.Measurement
          ref={measurementRef}
          xcMap={xcMap}
          measurementStyles={customStyles}
          isShowSegmentLength={true}
          isShowPopupUI={true}
          onDrawEnd={() => console.log('측정 완료!')}
        />
      </XcInteractions>
    </XcMap>
  );

  // 커스텀 팝업 + 팝업 순서 설정
  return (
    <XcMap xcMap={xcMap}>
      <XcInteractions>
        <interaction.Measurement
          ref={measurementRef}
          xcMap={xcMap}
          measurementStyles={customStyles}
          renderPopup={renderCustomPopup} // 커스텀 팝업 적용
          popupOrderConfig={{           // 팝업 순서 설정
            type: 'oldest-top',        // 오래된 것이 위로
            startZIndex: 1000,
            tempPopupZIndex: 9999
          }}
          isShowSegmentLength={true}
          isShowPopupUI={true}
          onDrawEnd={() => console.log('측정 완료!')}
        />
      </XcInteractions>
    </XcMap>
  );

  // 높은 z-index로 설정 (다른 UI와 충돌 방지)
  return (
    <XcMap xcMap={xcMap}>
      <XcInteractions>
        <interaction.Measurement
          ref={measurementRef}
          xcMap={xcMap}
          measurementStyles={customStyles}
          popupOrderConfig={{
            type: 'newest-top',
            startZIndex: 5000,         // 높은 시작값
            tempPopupZIndex: 9999
          }}
          onDrawEnd={() => console.log('측정 완료!')}
        />
      </XcInteractions>
    </XcMap>
  );
}
```

#### 다중 컴포넌트 사용
```jsx
// 여러 개의 Measurement 컴포넌트를 동시에 사용 가능
// 각 컴포넌트는 자동으로 고유한 layerName을 생성하여 충돌 방지
function MultiMeasurementApp() {
  const measurementRef1 = useRef<IMeasurementApis>(null);
  const measurementRef2 = useRef<IMeasurementApis>(null);

  return (
    <XcMap xcMap={xcMap}>
      <XcInteractions>
        {/* 첫 번째 측정 도구 */}
        <interaction.Measurement
          ref={measurementRef1}
          xcMap={xcMap}
          measurementStyles={customStyles1}
          onDrawEnd={() => console.log('측정1 완료!')}
        />
        
        {/* 두 번째 측정 도구 */}
        <interaction.Measurement
          ref={measurementRef2}
          xcMap={xcMap}
          measurementStyles={customStyles2}
          popupOrderConfig={{ type: 'oldest-top', startZIndex: 2000 }}
          onDrawEnd={() => console.log('측정2 완료!')}
        />
      </XcInteractions>
    </XcMap>
  );
}
```

#### 주요 특징
- **자동 레이어 관리**: 각 컴포넌트 인스턴스마다 고유한 layerName 자동 생성
- **실시간 측정**: 그리기 중 실시간으로 측정값 표시
- **커스텀 스타일**: 측정 타입별 색상, 선 두께, 투명도 등 세밀한 커스터마이징
- **선분 길이 표시**: LineString과 Polygon의 각 선분별 길이 표시
- **팝업 순서 제어**: 새로운/오래된 측정 결과의 z-index 순서 설정
- **React 컴포넌트 팝업**: 완전한 커스텀 팝업 컴포넌트 지원
- **메모리 관리**: React Root 자동 정리로 메모리 누수 방지

#### 인터페이스 정의
```typescript
// 측정 데이터 인터페이스
interface IMeasurementPopupData {
  value: string;           // "1.2 km", "0.5 km²" - 완성된 표시값
  measureType: MeasureType; // 'LineString' | 'Polygon' | 'Circle' | ''
  color: string;           // 측정 타입별 색상 "#ff0000"
  rawValue: number;        // 미터 단위 원시값 (계산 필요시)
  coordinates: ICoordinate; // 팝업 위치 (고급 기능 필요시)
}

// 커스텀 팝업 Props
interface IMeasurementPopupChildrenProps {
  measurementData: IMeasurementPopupData;
  onDelete: () => void;    // 필수 삭제 액션
}

// 팝업 순서 설정
interface IPopupOrderConfig {
  type: 'newest-top' | 'oldest-top';  // 새로운 것이 위 / 오래된 것이 위
  startZIndex?: number;        // 시작 z-index (기본: 500)
  tempPopupZIndex?: number;    // 임시 팝업 z-index (기본: 9999)
}

// 컴포넌트 API
interface IMeasurementApis {
  setMeasureType: (measureType: MeasureType) => void;
  clearAllMeasurements: () => void;
}
```

#### 제한사항
- **수정 기능**: 현재 비활성화 상태 (팝업 겹침 문제로 인해 임시 비활성화)
- **브라우저 호환성**: 최신 브라우저 권장 (React 18+ createRoot 사용)

## Overlay
### `OverlayComponent`
- mapId: 지도 ID
- layerName: overlay가 표현되어야 하는 layer의 layerName
- PopupContent: Overlay 내부에 표현할 내용 React Component
- additionalProps: 팝업에 정의되어 있는 추가 props
- onHideCallback: 팝업이 닫힐때 발생시킬 callback
- ...rest : overlay Option 추가 내용 적용
- api
  - 팝업 오픈 
  - showPopup : (coordinate:ICoordinate, datas: TData[], featureName: string) => void
  - 팝업 닫기
  - hidePopup : () => void
  - 팝업 위치 변경
  - setOverlayPosition : (coordinate:ICoordinate) => void

## 유틸리티 훅

### useXcMapOption.ts
지도 옵션을 관리하는 훅입니다.

### useXcMapFunctions.ts
지도 기능(줌, 이동 등)을 제공하는 훅입니다.

### useFeature.ts
지도 피처 관련 기능을 제공하는 훅입니다.

### useXcMapPopup.ts
팝업 기능을 제공하는 훅입니다.

### useXcMapStyle.ts
스타일 관련 기능을 제공하는 훅입니다.

### useXcMapAnimation.ts
애니메이션 관련 기능을 제공하는 훅입니다.


```
xcMap이하 모든 component는 useXcMap에서 생성된 Map객체인 xcMap props로 갖는다.
layer와 interaction의 상호작용은 layrName 또는 layrTag로 연동된다.
```


## 사용 예시

```jsx
import { useXcMap, useVworldUrl, XcMap, Xyz} from 'xc-map';

function App() {
  const {xcMapOption} = useXcMapOption()
  
  // 지도 객체 생성
  const xcMap = useXcMap(xcMapOption);

    const {vworldUrl, setTileType, minimapVworldUrl} = useVworldUrl(
        'Api_Key',
        'midnight',
        'Satellite'
    )

  return (
    <XcMap 
      xcMap={xcMap}
      xcMapOption={xcMapOption}
      getZoomLevel={level => console.log('Current zoom level:', level)}
    >
      <XcLayers>
        <layer.Xyz
            url={vworldUrl}
            xcMap={xcMap} // 각 컴포넌트에도 xcMap 전달
            layerName={'vworldLayer'}
            onLoadStart={() => {
                console.log("Xyz load start")
            }}
            onLoadEnd={() => {
                console.log("Xyz load end")
            }}
        >
        </layer.Xyz>
      </XcLayers>
      ...
    </XcMap>
  );
}
``` 