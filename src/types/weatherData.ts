export interface weatherData {
  coord: {
    lon: number; // 위도
    lat: number; // 걍도
  };
  weather: {
    id: number; // 날씨 상태 ID
    main: string; // 날씨 상태 요약 설명 (맑음, 흐림, 비 등)
    description: string; // 날씨 상태 자세한 설명
    icon: string; // 날씨 상태 아이콘
  }[];
  base: string; // 데이터 수집 기준
  main: {
    temp: number; // 온도
    feels_like: number; // 체감온도
    temp_min: number; // 최저 기온
    temp_max: number; // 최고 기온
    pressure: number; // 대기압
    humidity: number; // 습도
    sea_level: number; // 해수면 기압
    grnd_level: number; // 지면 기압
  };
  visibility: number; // 가시 거리
  wind: {
    speed: number; // 바람 속도
    deg: number; // 바람 방향 (도)
  };
  clouds: {
    all: number; // 구름 양 (%)
  };
  dt: number; // 데이터 수집시간
  sys: {
    type: number; // 시스템 ID
    id: number; // 시스템 구분 ID
    country: string; // 국가 코드
    sunrise: number; // 일출 시간
    sunset: number; // 일몰 시간
  };
  timezone: number; // 시간대 (초)
  id: number; // 도시 ID
  name: string; // 도시 이름
  cod: number; // 상태 코드
}
