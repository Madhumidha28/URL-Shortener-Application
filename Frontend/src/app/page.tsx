"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UrlTable from "@/components/UrlTable";
import StatisticsChart from "@/components/StatisticsChart";
import Pagination from "@/components/Pagination";
import { getRecentUrls, createShortUrl, getAnalytics } from "@/services/api";
import { Url } from "@/types/UrlTypes";

export default function Home() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [urlsPerPage] = useState<number>(5);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    setLoading(true);
    const data = await getRecentUrls();
    setUrls(data);
    setLoading(false);
  };

  const handleShortenUrl = async (originalUrl: string) => {
    const newUrl = await createShortUrl(originalUrl);
    if (newUrl) {
      fetchUrls();
      setCurrentPage(1);
    } else {
      alert("Error creating short URL. Please try again.");
    }
  };

  const handleAnalytics = async (id: number) => {
    const analytics = await getAnalytics(id);
    if (analytics) {
      alert(
        `📊 ANALYTICS FOR URL\n\n` +
          `Total Clicks: ${analytics.totalClicks}\n` +
          `Created: ${new Date(analytics.createdAt).toLocaleString()}\n` +
          `Original URL: ${analytics.originalUrl}\n` +
          `Short URL: http://localhost:8080/${analytics.shortCode}`,
      );
    } else {
      alert("Error fetching analytics");
    }
  };

  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <HeroSection onShorten={handleShortenUrl} />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ marginBottom: "20px", fontWeight: "normal" }}>
          Recent URLs
        </h2>

        <UrlTable
          urls={currentUrls}
          loading={loading}
          onAnalytics={handleAnalytics}
        />

        {urls.length > 5 && (
          <Pagination
            urlsPerPage={urlsPerPage}
            totalUrls={urls.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}

        <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>Statistics</h3>

        <StatisticsChart urls={urls} />
      </main>
    </div>
  );
}
