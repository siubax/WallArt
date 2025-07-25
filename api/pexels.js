// api/pexels.js
import axios from 'axios';
import { PEXELS_API_KEY, API_URL } from '../constants/api';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: PEXELS_API_KEY
    }
});

export const fetchCuratedPhotos = async (page = 1) => {
    try {
        const response = await client.get(`curated?page=${page}&per_page=20`);
        return response.data;
    } catch (error) {
        console.error('Error fetching curated photos:', error);
        return null;
    }
};

// --- الدالة الجديدة ---
export const searchPhotos = async (query, page = 1) => {
  if (!query) return null;
  try {
    const response = await client.get(`search?query=${query}&page=${page}&per_page=20`);
    return response.data;
  } catch (error) {
    console.error('Error searching photos:', error);
    return null;
  }
};