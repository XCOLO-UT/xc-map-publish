# XC-MAP 라이브러리
- openLayers에 기반하여 FTMS에 자주 사용되는 지도기능을 제공하기 위한 라이브러리입니다.

```
dist/styles - 지도에서 사용되는 map.css 정의, 필요시 같은 class 명을 !important로 덮어서 사용
dist/types/components - 지도 compoenent
```

## XcMap.tsx
* Map 객체를 소유하고 있는 component
* 지도 요소들은 하위 children 으로 포함시킨다.
* xcMapOption: xcMap에서 사용될 항목들에 대해서 정의 필 
* events: 지도 자체에 이벤트를 적용하고 싶을경우 사용
* apis
  * setZoomLevel : (level : number) => void 
  * setZoomLevelType : (type: ZoomLevelType) => void
    * ZoomLevelType = "plus"|"minus"|"reset"
    * zoom level 조정 api
  * animateMove : (coordinate: ICoordinate, duration?: number) => void
    * coordinate : 좌표
    * duration: 움직이는 속도, default: 200
## layer
* Layer 요소들의 집합
### Common.tsx
- layer의 공통적으로 적용되어야 하는 항목들에 대해서 일괄 제어를 위한 component
### Marker.tsx
- Marker 표현을 위한 component
- 사용자 편의를 위해 만들어둔 component
- 특정 marker의 위치를 변경 시키거나 style 변경시키기 위한 api 제공
### Minimap.tsx
- 미니맵(overviewmap) 표현을 위한 component
- position : 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'gone'
- gone 일경우 미니맵은 표현되지 않는다.
- getLayers : 미니맵 내부에 표현하고 싶은 layer들을 전부 넣어주면 됨
### PlaceMarker.tsx
- Marker를 디폴트로 지도 중앙에 위치시킨뒤, 드래그앤드랍으로 이동시키는 component
- 사용자 편의를 위해 만들어둔 component
- 다른 component들과 달리 vectorLayer와 MarkerDragAndDrop interacion이 component 내부에 위치
- onMoveMarker : 마커가 움직일때 event 발생
- onPlaceMarker : 마커를 위치 시켰을 때 event 발생
### Tile.tsx
- openLayers의 TileLayer를 xcMap 객체에 addLayer 시키는 component
### Vector.tsx
- openLayers의 VectorLayer를 xcMap 객체에 addLayer 시키는 component
### Wfs.tsx
- WFS 데이터를 표현하기 위한 component
- 사용자 편의를 위해 만들어둔 component
- getTrafficInfo : 링크의 상태값을 리턴하여 소통정보 표현
- getVectorLabel: vector에 label 표현이 필요한경우 사용
- zoomUrls: zoomLevel 별로 다르게 표현되어야 할경우 정의 필요
- getCustomStyle: xcMapOption을 사용하지 않고 style 적용이 필요할 경우 정의
- filter : 사용여부에 따라 feature 표시를 해주지 않을 경우 사용
- useBbox : bbox 값 사용 여부

- apis
  - feature 별로 visible 시켜야 할경우 사용
  - getWfsFeatures로 wfs를 이용해서 가져온 feature 목록을 조회한다음
  - setVisible을 feature당 한번씩 호출
  - 조건은 직접 확인하고 해당 feature의 id와 visible만 넘겨주면됨
    - getWfsFeatures: () => Feature[]
    - setVisible: (id: string, visible: boolean) => void
### Wms.tsx
- WMS 데이터를 표현하기 위한 component
- 사용자 편의를 위해 만들어둔 component
- zoomParams : zoomLevel 별로 다르게 표현되어야 할경우 정의 필요
### Xyz.tsx
- 배경지도 Tile을 표현하기 위한 component
### PlaceLineString.tsx
- LineString을 그려서 등록하는 layer component
- active: 그리기 가능 여부
- onDrawEnd: 그리기 완료시 콜백
- onDrawing: 그리는 중에 콜백
- onCheckPoint: 점을 찍을때마다 콜백
- defaultValues : ICoordinate[] 형태의 defaultValues
## source
* Source 요소들의 집합
### TileWms.ts
- TileWms Source return
### VectorFeature.ts
- Feature[]로 구성된 VectorSource를 return
### VectorWfs.ts
- url로 구성된 VectorSource를 return
### Xyz.ts
- XYZ Source return
## interaction
* 지도 이벤트 요소들의 집합
### FeatureTooltip.tsx
- Feature에 tooltip을 표현하고 싶을때 사용
- getTooltip: 툴팁 내부에 표현할 정보를 html 형태로 return 시킬 props 정의 필요 
### MarkerDragAndDrop.tsx
- layerName에 들어있는 marker의 drag and drop 이벤트 적용
- PlaceMarker 용으로 만들어졌기 때문에, 가장 첫번째 마커뿐이 움직이지 않음
### Measurement.tsx
- 거리, 면적 재기 기능 제공
- onDrawEnd: 파라미터에 대한 정의는 되어있지 않으나 측정 완료시 callback은 호출됨
- setMeasurtType: measureType에 대해서 세팅하는 api제공
- MeasureType = 'LineString' | 'Polygon' | ''
- '' 일때는 측정 종료
### MarkerSelect.tsx
- Marker의 클릭 및 선택 이벤트
- TData 정의 필요
- TData의 값은 marker feature의 property안에 value에 들어갈 예정
- isMoveCenterOnClick : marker를 선택했을때 지도를 중앙으로 이동시킬건지에 대한 여부
- useSelectStyle: marker가 선택됐을때, 선택된 style을 표현할건지에 대한 여부
- isDeselectClosePopup : 팝업을 닫았을때 마커 선택을 취소하게 할건지에 대한 여부
- getPopup : 클릭했을때 popup을 사용하고 싶다면 html을 return 해줄 props 정의 필요
- getListPopup: 여러개가 중첩되어있는 marker를 선택했을때, 선택할 수 있는 목록을 제공하려면 해당 props를 정의
- getCustomStyle: xcMapOption을 사용하지 않고 style 적용이 필요할 경우 정의
- onSelectionChange: 현재 선택된 마커에 대한 정보 return
- onClick : marker click 이벤트 정의
- onDoubleClick : marker double click 이벤트 정의
### VectorSelect.tsx
- Vector의 클릭 및 선택 이벤트
-
- isMoveCenterOnClick : vector를 선택했을때 지도를 중앙으로 이동시킬건지에 대한 여부
- useSelectStyle: vector가 선택됐을때, 선택된 style을 표현할건지에 대한 여부
- isDeselectClosePopup : 팝업을 닫았을때 마커 선택을 취소하게 할건지에 대한 여부
- isLastSelectHighlight : 마지막 선택 항목에 대해서 highlight 효과를 줄것인지 여부
- multiple: multi 선택 필요 여부
- getPopup : 클릭했을때 popup을 사용하고 싶다면 html을 return 해줄 props 정의 필요
- getListPopup: 여러개가 중첩되어있는 vector를 선택했을때, 선택할 수 있는 목록을 제공하려면 해당 props를 정의
- getCustomStyle: xcMapOption을 사용하지 않고 style 적용이 필요할 경우 정의
- onSelectionChange: 현재 선택된 vector에 대한 정보 return
- onClick : vector click 이벤트 정의
- onDoubleClick : vector double click 이벤트 정의

## Overlay
### OverlayComponent
- mapId: 지도 ID
- layerName: overlay가 표현되어야 하는 layer의 layerName
- PopupContent: Overlay 내부에 표현할 내용 React Component
- additionalProps: 팝업에 정의되어 있는 추가 props
- onHideCallback: 팝업이 닫힐때 발생시킬 callback
- ...rest : overlay Option 추가 내용 적용


```
xcMap이하 모든 component는 xcMap에서 사용된 id를 props로 갖는다.
layer와 interaction의 상호작용은 layrName 또는 layrTag로 연동된다.
```
