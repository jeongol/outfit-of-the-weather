import axios from "axios";
const apiKey = process.env.WEATHER_API_KEY;

export const weatherData = async () => {
  const params = {
    id: "1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265",
    appid: apiKey,
    lang: "kr",
    units: "metric"
  };
  const res = await axios.get("https://api.openweathermap.org/data/2.5/group", {
    params
  });
  return res;
};

//API Call
// https://api.openweathermap.org/data/2.5/group?id={도시id값}&appid={API key}&lang=kr&units=metric

// axios 추가했음
