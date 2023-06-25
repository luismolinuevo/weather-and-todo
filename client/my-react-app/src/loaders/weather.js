import axios from 'axios';

export async function weather() {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=New%20York,US&appid=${import.meta.env.VITE_API_KEY}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}
