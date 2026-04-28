const countries = [
  { id: "usa", name: "미국", region: "na", lat: 39.8, lon: -98.6, oil: 0.74, gas: 0.9, grain: 0.62, chips: 0.34, critical: 0.2, shipping: 0.58, importNeed: 0.2, marketWeight: 0.98, note: "EIA: 에너지 순수출국, 원유는 수입·수출 병행" },
  { id: "canada", name: "캐나다", region: "na", lat: 56.1, lon: -106.3, oil: 0.62, gas: 0.48, grain: 0.38, chips: 0.04, critical: 0.22, shipping: 0.32, importNeed: 0.18, marketWeight: 0.45, note: "EIA/IEA: 원유·가스·광물 공급국" },
  { id: "mexico", name: "멕시코", region: "na", lat: 23.6, lon: -102.5, oil: 0.28, gas: 0.08, grain: 0.08, chips: 0.06, critical: 0.08, shipping: 0.34, importNeed: 0.42, marketWeight: 0.34, note: "북미 제조·에너지 연계" },
  { id: "brazil", name: "브라질", region: "sa", lat: -10.8, lon: -52.9, oil: 0.4, gas: 0.08, grain: 0.72, chips: 0.02, critical: 0.16, shipping: 0.46, importNeed: 0.26, marketWeight: 0.48, note: "USDA: 대두·옥수수 주요 수출국" },
  { id: "argentina", name: "아르헨티나", region: "sa", lat: -38.4, lon: -63.6, oil: 0.16, gas: 0.14, grain: 0.48, chips: 0.01, critical: 0.08, shipping: 0.26, importNeed: 0.32, marketWeight: 0.25, note: "USDA: 곡물·유지종자 수출 영향" },
  { id: "chile", name: "칠레", region: "sa", lat: -35.7, lon: -71.5, oil: 0.02, gas: 0.02, grain: 0.02, chips: 0.01, critical: 0.72, shipping: 0.28, importNeed: 0.55, marketWeight: 0.24, note: "IEA: 구리·리튬 공급망 핵심" },
  { id: "uk", name: "영국", region: "eu", lat: 55.4, lon: -3.4, oil: 0.14, gas: 0.16, grain: 0.05, chips: 0.08, critical: 0.04, shipping: 0.62, importNeed: 0.58, marketWeight: 0.62, note: "UNCTAD: 해상 금융·보험 허브" },
  { id: "norway", name: "노르웨이", region: "eu", lat: 60.5, lon: 8.5, oil: 0.32, gas: 0.58, grain: 0.01, chips: 0.02, critical: 0.04, shipping: 0.34, importNeed: 0.24, marketWeight: 0.32, note: "IEA/EIA: 유럽 가스 공급국" },
  { id: "germany", name: "독일", region: "eu", lat: 51.2, lon: 10.5, oil: 0.04, gas: 0.04, grain: 0.08, chips: 0.18, critical: 0.06, shipping: 0.58, importNeed: 0.74, marketWeight: 0.72, note: "IEA/Eurostat: 에너지 수입·제조 노출" },
  { id: "france", name: "프랑스", region: "eu", lat: 46.2, lon: 2.2, oil: 0.02, gas: 0.02, grain: 0.2, chips: 0.08, critical: 0.04, shipping: 0.42, importNeed: 0.52, marketWeight: 0.56, note: "USDA: EU 곡물 공급 기여" },
  { id: "netherlands", name: "네덜란드", region: "eu", lat: 52.1, lon: 5.3, oil: 0.04, gas: 0.04, grain: 0.05, chips: 0.22, critical: 0.04, shipping: 0.86, importNeed: 0.68, marketWeight: 0.54, note: "UNCTAD: 로테르담 물류 허브" },
  { id: "italy", name: "이탈리아", region: "eu", lat: 41.9, lon: 12.6, oil: 0.03, gas: 0.04, grain: 0.04, chips: 0.08, critical: 0.03, shipping: 0.48, importNeed: 0.72, marketWeight: 0.48, note: "지중해 에너지·물류 노출" },
  { id: "poland", name: "폴란드", region: "eu", lat: 52.0, lon: 19.1, oil: 0.02, gas: 0.03, grain: 0.12, chips: 0.04, critical: 0.06, shipping: 0.24, importNeed: 0.58, marketWeight: 0.34, note: "동유럽 제조·에너지 노출" },
  { id: "russia", name: "러시아", region: "eu", lat: 61.5, lon: 105.3, oil: 0.86, gas: 0.84, grain: 0.44, chips: 0.05, critical: 0.24, shipping: 0.3, importNeed: 0.28, marketWeight: 0.68, note: "EIA/USDA: 에너지·밀 수출 충격" },
  { id: "ukraine", name: "우크라이나", region: "eu", lat: 49.0, lon: 31.3, oil: 0.01, gas: 0.03, grain: 0.62, chips: 0.01, critical: 0.08, shipping: 0.24, importNeed: 0.5, marketWeight: 0.24, note: "USDA: 흑해 곡물 수출 영향" },
  { id: "turkey", name: "튀르키예", region: "me", lat: 39.0, lon: 35.2, oil: 0.02, gas: 0.02, grain: 0.12, chips: 0.03, critical: 0.06, shipping: 0.62, importNeed: 0.66, marketWeight: 0.42, note: "흑해·지중해 해상 병목" },
  { id: "saudi", name: "사우디아라비아", region: "me", lat: 23.9, lon: 45.1, oil: 0.96, gas: 0.18, grain: 0.02, chips: 0.01, critical: 0.03, shipping: 0.46, importNeed: 0.44, marketWeight: 0.62, note: "EIA/OPEC 자료 기반 원유 공급국" },
  { id: "uae", name: "아랍에미리트", region: "me", lat: 23.4, lon: 53.8, oil: 0.5, gas: 0.16, grain: 0.01, chips: 0.02, critical: 0.03, shipping: 0.72, importNeed: 0.5, marketWeight: 0.42, note: "호르무즈·항만 허브" },
  { id: "qatar", name: "카타르", region: "me", lat: 25.3, lon: 51.2, oil: 0.16, gas: 0.86, grain: 0.01, chips: 0.01, critical: 0.02, shipping: 0.36, importNeed: 0.36, marketWeight: 0.36, note: "IEA: LNG 공급 충격 핵심" },
  { id: "iran", name: "이란", region: "me", lat: 32.4, lon: 53.7, oil: 0.54, gas: 0.48, grain: 0.06, chips: 0.01, critical: 0.06, shipping: 0.56, importNeed: 0.5, marketWeight: 0.36, note: "호르무즈 해협 인접 에너지 리스크" },
  { id: "iraq", name: "이라크", region: "me", lat: 33.2, lon: 43.7, oil: 0.62, gas: 0.04, grain: 0.01, chips: 0.01, critical: 0.02, shipping: 0.28, importNeed: 0.5, marketWeight: 0.32, note: "EIA/OPEC: 원유 공급국" },
  { id: "kuwait", name: "쿠웨이트", region: "me", lat: 29.3, lon: 47.5, oil: 0.5, gas: 0.04, grain: 0.01, chips: 0.01, critical: 0.02, shipping: 0.3, importNeed: 0.44, marketWeight: 0.28, note: "걸프 원유 공급국" },
  { id: "israel", name: "이스라엘", region: "me", lat: 31.0, lon: 35.0, oil: 0.01, gas: 0.22, grain: 0.02, chips: 0.26, critical: 0.03, shipping: 0.38, importNeed: 0.52, marketWeight: 0.34, note: "동지중해 가스·첨단산업" },
  { id: "egypt", name: "이집트", region: "af", lat: 26.8, lon: 30.8, oil: 0.12, gas: 0.2, grain: 0.02, chips: 0.01, critical: 0.03, shipping: 0.92, importNeed: 0.72, marketWeight: 0.38, note: "UNCTAD: 수에즈 운하 병목" },
  { id: "nigeria", name: "나이지리아", region: "af", lat: 9.1, lon: 8.7, oil: 0.42, gas: 0.14, grain: 0.02, chips: 0.01, critical: 0.04, shipping: 0.26, importNeed: 0.54, marketWeight: 0.28, note: "EIA: 아프리카 원유 공급국" },
  { id: "southafrica", name: "남아프리카공화국", region: "af", lat: -30.6, lon: 22.9, oil: 0.01, gas: 0.01, grain: 0.04, chips: 0.02, critical: 0.38, shipping: 0.5, importNeed: 0.58, marketWeight: 0.3, note: "IEA: 백금족 등 광물 공급" },
  { id: "drc", name: "콩고민주공화국", region: "af", lat: -2.9, lon: 23.7, oil: 0.01, gas: 0.01, grain: 0.01, chips: 0.01, critical: 0.74, shipping: 0.12, importNeed: 0.62, marketWeight: 0.16, note: "IEA: 코발트 공급 집중" },
  { id: "china", name: "중국", region: "as", lat: 35.9, lon: 104.2, oil: 0.22, gas: 0.18, grain: 0.18, chips: 0.46, critical: 0.92, shipping: 0.9, importNeed: 0.78, marketWeight: 0.96, note: "IEA/EIA: 원유 수입·광물 정제·제조 허브" },
  { id: "india", name: "인도", region: "as", lat: 20.6, lon: 78.9, oil: 0.14, gas: 0.08, grain: 0.32, chips: 0.08, critical: 0.12, shipping: 0.58, importNeed: 0.62, marketWeight: 0.68, note: "EIA/USDA: 에너지 수입·곡물 시장" },
  { id: "japan", name: "일본", region: "as", lat: 36.2, lon: 138.3, oil: 0.01, gas: 0.01, grain: 0.04, chips: 0.34, critical: 0.14, shipping: 0.76, importNeed: 0.93, marketWeight: 0.56, note: "IEA: 에너지 수입 의존" },
  { id: "korea", name: "대한민국", region: "as", lat: 36.4, lon: 127.8, oil: 0.02, gas: 0.01, grain: 0.03, chips: 0.8, critical: 0.1, shipping: 0.82, importNeed: 0.94, marketWeight: 0.5, note: "IEA/산업자료: 에너지 수입·반도체 공급망" },
  { id: "taiwan", name: "대만", region: "as", lat: 23.7, lon: 121.0, oil: 0.01, gas: 0.01, grain: 0.02, chips: 0.98, critical: 0.08, shipping: 0.74, importNeed: 0.9, marketWeight: 0.46, note: "반도체 제조 집중" },
  { id: "singapore", name: "싱가포르", region: "as", lat: 1.35, lon: 103.8, oil: 0.08, gas: 0.04, grain: 0.01, chips: 0.08, critical: 0.02, shipping: 0.96, importNeed: 0.96, marketWeight: 0.44, note: "UNCTAD: 말라카 항로·벙커링 허브" },
  { id: "indonesia", name: "인도네시아", region: "as", lat: -2.5, lon: 118.0, oil: 0.08, gas: 0.24, grain: 0.04, chips: 0.02, critical: 0.58, shipping: 0.48, importNeed: 0.42, marketWeight: 0.38, note: "IEA: 니켈 공급망" },
  { id: "malaysia", name: "말레이시아", region: "as", lat: 4.2, lon: 102.0, oil: 0.12, gas: 0.22, grain: 0.01, chips: 0.18, critical: 0.04, shipping: 0.68, importNeed: 0.52, marketWeight: 0.34, note: "LNG·전자 공급망·말라카 인접" },
  { id: "vietnam", name: "베트남", region: "as", lat: 14.1, lon: 108.3, oil: 0.04, gas: 0.04, grain: 0.08, chips: 0.1, critical: 0.08, shipping: 0.52, importNeed: 0.58, marketWeight: 0.32, note: "제조 공급망 분산 거점" },
  { id: "thailand", name: "태국", region: "as", lat: 15.9, lon: 101.0, oil: 0.02, gas: 0.04, grain: 0.12, chips: 0.08, critical: 0.04, shipping: 0.42, importNeed: 0.62, marketWeight: 0.3, note: "식량·제조·해상물류 노출" },
  { id: "philippines", name: "필리핀", region: "as", lat: 12.9, lon: 121.8, oil: 0.01, gas: 0.02, grain: 0.02, chips: 0.06, critical: 0.06, shipping: 0.46, importNeed: 0.72, marketWeight: 0.26, note: "섬 경제의 에너지·물류 노출" },
  { id: "kazakhstan", name: "카자흐스탄", region: "as", lat: 48.0, lon: 66.9, oil: 0.38, gas: 0.08, grain: 0.22, chips: 0.01, critical: 0.28, shipping: 0.08, importNeed: 0.32, marketWeight: 0.26, note: "에너지·우라늄·곡물 공급" },
  { id: "australia", name: "호주", region: "oc", lat: -25.3, lon: 133.8, oil: 0.06, gas: 0.72, grain: 0.44, chips: 0.02, critical: 0.66, shipping: 0.54, importNeed: 0.22, marketWeight: 0.42, note: "IEA/USDA: LNG·철광석·리튬·곡물" }
];

const resources = {
  oil: { label: "원유", oil: 1, gas: 0.32, inflation: 0.55, gdp: 0.34, shipping: 0.18 },
  gas: { label: "천연가스", oil: 0.22, gas: 1, inflation: 0.42, gdp: 0.28, shipping: 0.16 },
  grain: { label: "곡물", oil: 0.08, gas: 0.04, food: 1, inflation: 0.36, gdp: 0.16, shipping: 0.14 },
  chips: { label: "반도체", oil: 0.04, gas: 0.05, chips: 1, inflation: 0.22, gdp: 0.5, shipping: 0.2 },
  critical: { label: "핵심광물", oil: 0.06, gas: 0.04, critical: 1, inflation: 0.2, gdp: 0.42, shipping: 0.18 },
  shipping: { label: "해상 물류", oil: 0.28, gas: 0.24, inflation: 0.38, gdp: 0.46, shipping: 1 }
};

const actionProfiles = {
  sanction: { label: "경제 제재", direct: 0.55, spill: 0.32, market: 0.5 },
  embargo: { label: "자원 금수", direct: 0.72, spill: 0.38, market: 0.62 },
  blockade: { label: "해상 물류 차단", direct: 0.68, spill: 0.6, market: 0.7 },
  conflict: { label: "군사 충돌", direct: 0.84, spill: 0.78, market: 0.86 },
  cyber: { label: "항만·에너지망 사이버 장애", direct: 0.48, spill: 0.44, market: 0.46 }
};

const regionNames = {
  na: "북미",
  eu: "유럽",
  me: "중동",
  as: "아시아",
  sa: "남미",
  af: "아프리카",
  oc: "오세아니아"
};

const chokePoints = [
  { name: "호르무즈", lat: 26.6, lon: 56.3, resources: ["oil", "gas"], weight: 0.95 },
  { name: "수에즈", lat: 30.6, lon: 32.3, resources: ["oil", "gas", "grain", "shipping"], weight: 0.8 },
  { name: "말라카", lat: 2.8, lon: 101.0, resources: ["oil", "gas", "chips", "shipping"], weight: 0.9 },
  { name: "파나마", lat: 9.1, lon: -79.7, resources: ["grain", "shipping"], weight: 0.55 },
  { name: "흑해", lat: 44.8, lon: 34.9, resources: ["grain", "oil"], weight: 0.65 }
];

const els = {
  actor: document.querySelector("#actor"),
  target: document.querySelector("#target"),
  action: document.querySelector("#action"),
  resource: document.querySelector("#resource"),
  severity: document.querySelector("#severity"),
  duration: document.querySelector("#duration"),
  coalition: document.querySelector("#coalition"),
  reserves: document.querySelector("#reserves"),
  severityValue: document.querySelector("#severityValue"),
  durationValue: document.querySelector("#durationValue"),
  coalitionValue: document.querySelector("#coalitionValue"),
  reservesValue: document.querySelector("#reservesValue"),
  scenarioLabel: document.querySelector("#scenarioLabel"),
  oilMetric: document.querySelector("#oilMetric"),
  gasMetric: document.querySelector("#gasMetric"),
  inflationMetric: document.querySelector("#inflationMetric"),
  gdpMetric: document.querySelector("#gdpMetric"),
  impactList: document.querySelector("#impactList"),
  narrative: document.querySelector("#narrative"),
  vulnerableList: document.querySelector("#vulnerableList"),
  mapLandLayer: document.querySelector("#mapLandLayer"),
  countryLayer: document.querySelector("#countryLayer"),
  routeLayer: document.querySelector("#routeLayer"),
  chokeLayer: document.querySelector("#chokeLayer")
};

let mapReady = false;

function init() {
  const options = countries
    .map((country) => `<option value="${country.id}">${country.name}</option>`)
    .join("");

  els.actor.innerHTML = options;
  els.target.innerHTML = options;
  els.actor.value = "usa";
  els.target.value = "iran";

  Object.values(els).forEach((el) => {
    if (el instanceof HTMLSelectElement || el instanceof HTMLInputElement) {
      el.addEventListener("input", render);
    }
  });

  render();
  loadRealMap();
}

function getCountry(id) {
  return countries.find((country) => country.id === id);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function signedPercent(value) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function riskColor(score) {
  if (score >= 72) return "#b73a2f";
  if (score >= 45) return "#b66b16";
  return "#24724b";
}

function project(lon, lat) {
  return {
    x: ((lon + 180) / 360) * 100,
    y: ((84 - lat) / 168) * 100
  };
}

function coordinateToPathPoint(coord) {
  const point = project(coord[0], coord[1]);
  return `${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
}

function ringToPath(ring) {
  if (!ring.length) return "";
  const [first, ...rest] = ring;
  return `M ${coordinateToPathPoint(first)} ${rest.map((coord) => `L ${coordinateToPathPoint(coord)}`).join(" ")} Z`;
}

function geometryToPath(geometry) {
  if (!geometry) return "";
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map(ringToPath).join(" ");
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .flatMap((polygon) => polygon.map(ringToPath))
      .join(" ");
  }
  return "";
}

async function loadRealMap() {
  try {
    const response = await fetch("world-countries.geojson");
    if (!response.ok) throw new Error(`map fetch failed: ${response.status}`);
    const geojson = await response.json();
    els.mapLandLayer.innerHTML = geojson.features
      .map((feature) => `<path d="${geometryToPath(feature.geometry)}"></path>`)
      .join("");
    mapReady = true;
  } catch (error) {
    els.mapLandLayer.innerHTML = `<text x="50" y="28" text-anchor="middle">지도 데이터를 불러오지 못했습니다</text>`;
    console.error(error);
  }
}

function distanceScore(a, b) {
  const dLat = a.lat - b.lat;
  const dLon = (a.lon - b.lon) * Math.cos(((a.lat + b.lat) / 2) * Math.PI / 180);
  const distance = Math.sqrt(dLat * dLat + dLon * dLon);
  return clamp(1 - distance / 92, 0.05, 1);
}

function simulate() {
  const actor = getCountry(els.actor.value);
  const target = getCountry(els.target.value);
  const action = actionProfiles[els.action.value];
  const resource = resources[els.resource.value];
  const resourceKey = els.resource.value;
  const severity = Number(els.severity.value) / 100;
  const duration = Number(els.duration.value);
  const coalition = Number(els.coalition.value) / 100;
  const reserves = Number(els.reserves.value) / 100;
  const durationFactor = clamp(Math.sqrt(duration / 90), 0.3, 2.1);
  const buffer = 1 - reserves * 0.42;
  const actorPower = actor.marketWeight * (0.7 + coalition * 0.55);
  const targetSupply = target[resourceKey] ?? target.shipping;
  const transitStress = (target.shipping + actor.shipping) / 2;
  const chokepointStress = chokePoints
    .filter((point) => point.resources.includes(resourceKey) || resourceKey === "shipping")
    .reduce((sum, point) => sum + point.weight * distanceScore(target, point), 0) / 3;
  const marketShock = severity * durationFactor * buffer * action.market;
  const directShock = marketShock * (0.4 + targetSupply * 0.75 + actorPower * 0.3);
  const shippingShock = marketShock * (resource.shipping ?? 0.15) * (0.8 + transitStress + chokepointStress);

  const oil = clamp((directShock * (resource.oil ?? 0.1) + shippingShock * 0.22) * 62, -10, 140);
  const gas = clamp((directShock * (resource.gas ?? 0.08) + shippingShock * 0.18) * 78, -10, 180);
  const food = clamp((directShock * (resource.food ?? 0.05) + shippingShock * 0.14) * 56, 0, 120);
  const chips = clamp((directShock * (resource.chips ?? 0.05) + shippingShock * 0.16) * 65, 0, 150);
  const critical = clamp((directShock * (resource.critical ?? 0.05) + shippingShock * 0.18) * 70, 0, 160);
  const inflation = clamp((oil * 0.018 + gas * 0.014 + food * 0.015 + shippingShock * 2.8) * resource.inflation, 0, 6.5);
  const gdp = clamp((oil * 0.009 + gas * 0.006 + chips * 0.008 + critical * 0.006 + shippingShock * 1.8) * resource.gdp, 0, 5.8);

  const countryRisks = countries.map((country) => {
    const resourceExposure = country.importNeed * 0.34 + country[resourceKey] * 0.34 + country.shipping * 0.18 + country.marketWeight * 0.14;
    const proximity = Math.max(distanceScore(country, target), distanceScore(country, actor) * 0.45);
    const energyLoad = (oil + gas) * 0.34 * country.importNeed;
    const industryLoad = (chips + critical) * 0.36 * Math.max(country.chips, country.critical, country.importNeed * 0.5);
    const foodLoad = food * 0.46 * Math.max(country.grain, country.importNeed * 0.42);
    const routeLoad = shippingShock * 42 * country.shipping;
    const directLoad = (country.id === target.id ? action.direct * severity * 38 : 0) + (country.id === actor.id ? action.spill * severity * 18 : 0);
    return {
      ...country,
      score: clamp(country.importNeed * 18 + resourceExposure * marketShock * 92 + proximity * severity * 13 + energyLoad + industryLoad + foodLoad + routeLoad + directLoad, 0, 100)
    };
  }).sort((a, b) => b.score - a.score);

  const regionScores = Object.fromEntries(Object.keys(regionNames).map((region) => [region, 0]));
  countryRisks.forEach((country) => {
    regionScores[country.region] = Math.max(regionScores[country.region], country.score);
  });

  return { actor, target, action, resource, oil, gas, food, chips, critical, inflation, gdp, regionScores, countryRisks, shippingShock };
}

function renderBars(data) {
  const items = [
    ["식량 가격", data.food],
    ["반도체 공급", data.chips],
    ["핵심광물", data.critical],
    ["해상 운임", data.shippingShock * 90],
    ["지정학 위험", data.countryRisks[0].score]
  ];

  els.impactList.innerHTML = items
    .map(([label, value]) => {
      const score = clamp(value, 0, 100);
      return `
        <div class="bar-row">
          <div class="bar-head"><span>${label}</span><span>${score.toFixed(1)}</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${score}%; background:${riskColor(score)}"></div></div>
        </div>
      `;
    })
    .join("");
}

function markerSize(country, selectedResource) {
  const supply = selectedResource === "shipping" ? country.shipping : country[selectedResource];
  return `${clamp(8 + supply * 15 + country.marketWeight * 4, 8, 26)}px`;
}

function renderMap(data) {
  const resourceKey = els.resource.value;
  const riskById = Object.fromEntries(data.countryRisks.map((country) => [country.id, country.score]));
  const actorPoint = project(data.actor.lon, data.actor.lat);
  const targetPoint = project(data.target.lon, data.target.lat);

  els.routeLayer.setAttribute("d", `M ${actorPoint.x} ${actorPoint.y} Q ${(actorPoint.x + targetPoint.x) / 2} ${Math.min(actorPoint.y, targetPoint.y) - 14} ${targetPoint.x} ${targetPoint.y}`);
  els.countryLayer.innerHTML = countries.map((country) => {
    const point = project(country.lon, country.lat);
    const score = riskById[country.id] ?? 0;
    const classes = [
      "country-marker",
      country.id === data.actor.id ? "is-actor" : "",
      country.id === data.target.id ? "is-target" : ""
    ].join(" ");
    return `
      <button class="${classes}" style="--x:${point.x}%; --y:${point.y}%; --size:${markerSize(country, resourceKey)}; --risk:${riskColor(score)}" title="${country.name}: 위험 ${score.toFixed(1)} | ${country.note}">
        <span class="marker-dot"></span>
        <span class="country-label">${country.name}</span>
      </button>
    `;
  }).join("");

  els.chokeLayer.innerHTML = chokePoints.map((point) => {
    const xy = project(point.lon, point.lat);
    const active = point.resources.includes(resourceKey) || resourceKey === "shipping";
    return `
      <div class="chokepoint ${active ? "is-active" : ""}" style="--x:${xy.x}%; --y:${xy.y}%;" title="${point.name} 해상 병목">
        <span></span>${point.name}
      </div>
    `;
  }).join("");
}

function renderNarrative(data) {
  const resourceLabel = data.resource.label;
  const strongest = Object.entries(data.regionScores).sort((a, b) => b[1] - a[1])[0];
  const topCountries = data.countryRisks.slice(0, 3).map((country) => country.name).join(", ");
  const channel = els.action.value === "conflict"
    ? "보험료, 항만 처리 지연, 우회 항로 비용이 동시에 커지는 경로"
    : els.action.value === "sanction"
      ? "금융 결제, 보험, 장기 계약 재협상 비용이 커지는 경로"
      : "물류 병목과 대체 조달 비용이 가격에 전가되는 경로";

  els.narrative.textContent = `${data.actor.name}이 ${data.target.name}에 ${data.action.label}를 가하는 가정에서 ${resourceLabel} 충격이 먼저 발생합니다. ${channel}로 확산되며, 현재 설정에서는 ${regionNames[strongest[0]]} 권역과 ${topCountries}의 노출도가 가장 큽니다. 국가별 점수는 EIA·IEA·USDA·UNCTAD·Natural Earth 기준으로 정규화한 공급·수입의존·항로 노출 지표를 사용합니다.`;
}

function renderVulnerableList(data) {
  els.vulnerableList.innerHTML = data.countryRisks
    .slice(0, 8)
    .map((country) => `<li><span>${country.name}</span><strong>${country.score.toFixed(1)}</strong><small>${country.note}</small></li>`)
    .join("");
}

function render() {
  if (els.actor.value === els.target.value) {
    const fallback = countries.find((country) => country.id !== els.actor.value);
    els.target.value = fallback.id;
  }

  els.severityValue.textContent = `${els.severity.value}%`;
  els.durationValue.textContent = `${els.duration.value}일`;
  els.coalitionValue.textContent = `${els.coalition.value}%`;
  els.reservesValue.textContent = `${els.reserves.value}%`;

  const data = simulate();
  els.scenarioLabel.textContent = `${data.actor.name} → ${data.target.name} · ${data.action.label}`;
  els.oilMetric.textContent = signedPercent(data.oil);
  els.gasMetric.textContent = signedPercent(data.gas);
  els.inflationMetric.textContent = `+${data.inflation.toFixed(1)}%p`;
  els.gdpMetric.textContent = `-${data.gdp.toFixed(1)}%`;

  renderBars(data);
  renderMap(data);
  renderNarrative(data);
  renderVulnerableList(data);
}

init();
