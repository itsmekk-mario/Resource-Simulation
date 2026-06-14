# Global Resource Shock Simulator

세계 자원 충격 시나리오를 실험하는 정적 웹 앱입니다. 행동 국가, 대상 국가, 행동 유형, 중점 자원, 충격 강도, 지속 기간, 동맹 동참률, 전략 비축 완충을 조정하면 원유·LNG·식량·반도체·핵심광물·해상 운임·국가별 위험 점수가 즉시 계산됩니다.

이 앱은 실제 예측 모델이나 정책 판단 도구가 아니라, 공공기관 자료의 상대적 구조를 반영한 교육용 합성 노출 점수 샌드박스입니다.

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
5. 오른쪽 결과 패널에서 충격 방향성, 지도, 국가별 위험 순위를 확인합니다.

지도에서 국가 마커 색상은 위험 점수를 나타냅니다.

- 녹색: 낮은 위험
- 주황색: 중간 위험
- 빨간색: 높은 위험

마커 크기는 선택한 자원에서 해당 국가가 갖는 합성 공급·허브 노출도를 반영합니다.

## 수학적 방식

이 앱은 공공 통계 원자료를 직접 예측식으로 학습한 계량 모델이 아니라, 공개 자료에서 확인되는 상대적 구조를 0~1 사이 계수로 정규화한 휴리스틱 시뮬레이션입니다. 화면의 수치는 실측 예측값이 아니라 시나리오 간 비교를 위한 방향성 지표입니다.

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

해상병목노출은 선택 자원과 관련된 활성 병목점만 평균해 계산합니다.

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

- `oil`, `gas`, `grain`, `chips`, `critical`, `shipping`: 해당 자원 또는 공급망에서 세계 시장 충격을 만들 수 있는 합성 공급·허브 노출도
- `importNeed`: 자원 수입 의존 취약도
- `marketWeight`: 금융·무역·동맹·시장 파급력

값은 0에서 1 사이의 정규화 점수입니다. 예를 들어 `1`은 해당 항목에서 세계적으로 매우 큰 영향력 또는 취약도를 뜻합니다. 이 값은 원자료의 절대 시장점유율이 아니라 생산, 수출, 수입의존, 정제·제조 집중, 물류 허브성을 합친 합성 지표입니다.

2026년 6월 기준 보정 방향은 다음과 같습니다.

- 미국: EIA 기준 세계 최대 원유 생산국, 대형 천연가스 생산·LNG 수출국, 곡물 공급국 성격 반영
- 중국: EIA/IEA 기준 원유 수입, 높은 에너지 수입 취약도, 핵심광물 정제·제조 공급망 영향력 반영
- 러시아: EIA/USDA 기준 원유·가스·밀 수출 충격 영향력 반영하되, UNCTAD 시장·물류 허브성은 소폭 낮춤
- 사우디아라비아, 이라크, 쿠웨이트, UAE: 걸프 원유 공급 영향력 반영하되, 에너지 수입 취약도는 낮춤
- 카타르, 호주, 미국, 노르웨이: LNG 공급 영향력 반영
- 한국, 일본, 대만: 에너지 수입 의존도와 해상 물류 취약도 반영
- 브라질, 미국, 아르헨티나, 캐나다, 호주, 러시아, 우크라이나, 카자흐스탄: USDA 기준 곡물·유지종자 공급 충격 영향력 반영
- 태국, 베트남: USDA 기준 쌀 수출 노출을 곡물 계수에 반영
- 중국, 호주, 칠레, 콩고민주공화국, 인도네시아, 아르헨티나, 베트남, 필리핀: IEA 기준 핵심광물 공급망 또는 잠재 노출 반영
- 싱가포르, 네덜란드, 중국, UAE, 이집트: UNCTAD 기준 해상 물류 허브·병목 노출 반영

## 주요 참고 자료

- Natural Earth Admin 0 Countries 1:110m v5.1.1, https://www.naturalearthdata.com/downloads/110m-cultural-vectors/
- U.S. Energy Information Administration, International Energy Statistics and Today in Energy, https://www.eia.gov/
- EIA, United States produces more crude oil than any country, ever, https://www.eia.gov/todayinenergy/detail.php?id=61545
- International Energy Agency, Global Critical Minerals Outlook 2025, https://www.iea.org/reports/global-critical-minerals-outlook-2025
- USDA World Agricultural Supply and Demand Estimates, June 2026, https://www.usda.gov/oce/commodity/wasde
- UN Trade and Development, Review of Maritime Transport 2025, https://unctad.org/publication/review-maritime-transport-2025
- UNCTADstat Country Profiles and Maritime Profiles, https://unctadstat.unctad.org/

## 주의 사항

- 이 앱은 교육용 시나리오 도구입니다.
- 실제 가격, 물가, GDP를 예측하는 모델이 아닙니다.
- 군사 작전, 투자, 정책 결정에 사용해서는 안 됩니다.
- 국가별 계수는 공공 자료를 기반으로 한 정규화 지표이며, 원자료의 절대값과 일대일로 대응하지 않습니다.
