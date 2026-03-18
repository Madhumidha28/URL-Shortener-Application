export interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdOn: string;
  clickCount: number;
}

export interface CreateUrlRequest {
  originalUrl: string;
}

export interface AnalyticsData {
  totalClicks: number;
  createdAt: string;
  originalUrl: string;
  shortCode: string;
  clicksOverTime: Array<{
    date: string;
    clicks: number;
  }>;
}
