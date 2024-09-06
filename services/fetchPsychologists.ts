// services/fetchPsychologists.ts
import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from '@env';


interface Location {
  latitude: number;
  longitude: number;
}

interface PlaceResult {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  vicinity: string;
}

export const fetchPsychologists = async (location: Location): Promise<PlaceResult[]> => {
  const { latitude, longitude } = location;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${latitude},${longitude}`,
          radius: 2000,
          type: 'doutor',
          keyword: 'psicologos',
          key: GOOGLE_PLACES_API_KEY,
        },
      }
    );

    return response.data.results as PlaceResult[];
  } catch (error) {
    console.error('Error fetching psychologists: ', error);
    return [];
  }
};
