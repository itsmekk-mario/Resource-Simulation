# Global Resource Shock Simulator

세계 자원 충격 시나리오를 실험하는 정적 웹 앱입니다. 행동 국가, 대상 국가, 행동 유형, 중점 자원, 충격 강도, 지속 기간, 동맹 동참률, 전략 비축 완충을 조정하면 원유·LNG·식량·반도체·핵심광물·해상 운임·국가별 위험 점수가 즉시 계산됩니다.

이 앱은 실제 예측 모델이나 정책 판단 도구가 아니라, 공공기관 자료를 바탕으로 만든 교육용 시나리오 샌드박스입니다.

## 주요 기능

- 40개 국가 단위의 행동 국가·대상 국가 선택
- 원유, 천연가스, 곡물, 반도체, 핵심광물, 해상 물류 충격 시뮬레이션
- Natural Earth 국가 경계 GeoJSON 기반 세계 지도 표시
- 국가별 위험 점수, 주요 파급 경로, 영향 국가 순위 제공
- 호르무즈, 수에즈, 말라카, 파나마, 흑해 등 해상 병목 표시
- 외부 프레임워크 없이 HTML, CSS, JavaScript만으로 실행

## 실행 방법

터미널에서 아래 명령을 실행합니다.

```bash
cd /Users/guest-dangn/resource_shock_sim
python3 -m http.server 8000
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8000
```

포트 8000이 이미 사용 중이면 다른 포트를 지정합니다.

```bash
python3 -m http.server 8765
```

그 경우 브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8765
```

## 파일 구조

```text
resource_shock_sim/
├── index.html
├── styles.css
├── app.js
├── world-countries.geojson
└── README.md
```

## 사용 방법

1. `행동 국가`와 `대상 국가`를 고릅니다.
2. `행동 유형`을 선택합니다.
3. `중점 자원`을 선택합니다.
4. 강도, 지속 기간, 동맹 동참률, 전략 비축 완충을 조정합니다.
5. 오른쪽 결과 패널에서 가격·물가·GDP 영향, 지도, 국가별 위험 순위를 확인합니다.

지도에서 국가 마커 색상은 위험 점수를 나타냅니다.

- 녹색: 낮은 위험
- 주황색: 중간 위험
- 빨간색: 높은 위험

마커 크기는 선택한 자원에서 해당 국가가 갖는 공급·허브 비중을 반영합니다.

## 수학적 방식

이 앱은 공공 통계 원자료를 직접 예측식으로 학습한 계량 모델이 아니라, 공개 자료에서 확인되는 상대적 구조를 0~1 사이 계수로 정규화한 휴리스틱 시뮬레이션입니다.

### 1. 기간 효과

```text
durationFactor = sqrt(지속기간 / 90)
```

짧은 충격보다 장기 충격의 누적 효과가 커지지만, 선형으로 무한히 커지지 않도록 제곱근을 사용합니다.

### 2. 비축 완충

```text
buffer = 1 - 전략비축 * 0.42
```

전략 비축이 높을수록 초기 가격 충격을 낮춥니다.

### 3. 시장 충격

```text
marketShock = 강도 * 기간효과 * 비축완충 * 행동유형 시장계수
```

### 4. 직접 충격

```text
directShock = marketShock * (0.4 + 대상국 공급비중 * 0.75 + 행동국 시장파급력 * 0.3)
```

### 5. 물류 충격

```text
shippingShock = marketShock * 자원별 물류민감도 * (0.8 + 행위국/대상국 항로노출 + 해상병목노출)
```

### 6. 가격·거시 지표

원유, LNG, 식량, 반도체, 핵심광물 충격은 각각 자원별 민감도와 물류 충격의 가중합으로 계산합니다. 물가와 GDP 영향은 이 결과들을 다시 가중합해 환산합니다.

### 7. 국가 위험 점수

국가 위험 점수는 아래 요소를 합산한 뒤 0~100 범위로 제한합니다.

- 수입 의존도
- 선택 자원 노출
- 해상 물류 노출
- 시장 파급력
- 행위국·대상국과의 지리적 근접성
- 직접 제재·충돌 효과

모든 주요 결과에는 `clamp()`를 적용해 극단값이 화면과 순위를 깨뜨리지 않도록 제한합니다.

## 데이터와 보정 기준

각 국가는 아래 계수를 갖습니다.

- `oil`, `gas`, `grain`, `chips`, `critical`, `shipping`: 해당 자원 또는 공급망에서 세계 시장 충격을 만들 수 있는 공급·허브 비중
- `importNeed`: 자원 수입 의존 취약도
- `marketWeight`: 금융·무역·동맹·시장 파급력

값은 0에서 1 사이의 정규화 점수입니다. 예를 들어 `1`은 해당 항목에서 세계적으로 매우 큰 영향력 또는 취약도를 뜻합니다.

보정 방향은 다음과 같습니다.

- 미국: 에너지 순수출국 성격과 원유 수입·수출을 병행하는 대형 시장 허브 반영
- 중국: 원유 수입, 높은 에너지 수입 취약도, 핵심광물 정제·공급망 영향력 반영
- 러시아: 원유·가스·밀 수출 충격 영향력 반영
- 사우디아라비아, 이라크, 쿠웨이트, UAE: 걸프 원유 공급 영향력 반영
- 카타르, 호주, 미국: LNG 공급 영향력 반영
- 한국, 일본, 대만: 에너지 수입 의존도와 해상 물류 취약도 반영
- 브라질, 우크라이나, 미국, 호주, 아르헨티나: 곡물 공급 충격 영향력 반영
- 중국, 호주, 칠레, 콩고민주공화국, 인도네시아: 핵심광물 공급망 영향력 반영

## 주요 참고 자료

- Natural Earth: public domain vector map data, https://www.naturalearthdata.com/
- Natural Earth Admin 0 Countries GeoJSON mirror, https://github.com/nvkelso/natural-earth-vector
- U.S. Energy Information Administration, https://www.eia.gov/
- International Energy Agency, Gas Market Report and Global Critical Minerals Outlook, https://www.iea.org/
- USDA World Agricultural Supply and Demand Estimates, https://esmis.nal.usda.gov/publication/world-agricultural-supply-and-demand-estimates
- UN Trade and Development, Review of Maritime Transport, https://unctad.org/publication/review-maritime-transport-2024

## 주의 사항

- 이 앱은 교육용 시나리오 도구입니다.
- 실제 가격, 물가, GDP를 예측하는 모델이 아닙니다.
- 군사 작전, 투자, 정책 결정에 사용해서는 안 됩니다.
- 국가별 계수는 공공 자료를 기반으로 한 정규화 지표이며, 원자료의 절대값과 일대일로 대응하지 않습니다.
