/**
 * 📐 측정 도구 스타일 커스터마이징 예시
 *
 * 이 파일은 Measurement 컴포넌트의 스타일을 커스터마이징하는 방법을 보여줍니다.
 *
 * 주요 커스터마이징 항목:
 * 1. 측정 도형 스타일 (선 색상, 두께, 배경색)
 * 2. 그리기 중/완료 후 상태별 스타일
 * 3. 선분별 길이 라벨 스타일
 * 4. 메인 측정 결과 라벨 스타일
 *
 * 사용법:
 * <Measurement measurementStyles={customMeasurementStyles} ... />
 *
 * 다중 컴포넌트 사용:
 * - layerName은 자동으로 고유하게 생성되므로 여러 개 사용 가능
 * - 각 컴포넌트는 독립적으로 동작하며 서로 충돌하지 않음
 */
import './App.css';
declare function App(): JSX.Element;
export default App;
