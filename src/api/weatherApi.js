import Axios from "axios";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

const convertDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
};

const getWeather = async ({ latitude, longitude }) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate); // clone date
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6); // 7-day forecast

  const { data: weatherInfo } = await Axios.get(WEATHER_API_URL, {
    params: {
      latitude,
      longitude,
      current_weather: true,
      timezone: "Asia/Kolkata", // ✅ FIX
      daily: "temperature_2m_max,temperature_2m_min,weathercode", // ✅ FIX
      start_date: convertDate(startDate),
      end_date: convertDate(endDate),
    },
  });

  return weatherInfo;
};

export default getWeather;
