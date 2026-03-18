import axios from "axios";
import { Url, AnalyticsData } from "../types/UrlTypes";

const API_BASE_URL = "http://localhost:8081/api/urls";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRecentUrls = async (): Promise<Url[]> => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return [];
  }
};

export const createShortUrl = async (
  originalUrl: string,
): Promise<Url | null> => {
  try {
    const response = await api.post("", { originalUrl });
    return response.data;
  } catch (error) {
    console.error("Error creating short URL:", error);
    return null;
  }
};

export const getAnalytics = async (
  id: number,
): Promise<AnalyticsData | null> => {
  try {
    const response = await api.get(`/${id}/analytics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
};
