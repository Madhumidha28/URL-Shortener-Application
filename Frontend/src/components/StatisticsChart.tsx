import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { Url } from "../types/UrlTypes";

interface StatisticsChartProps {
  urls: Url[];
}

const formatXAxis = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return `${day}${suffix} ${weekday}`;
};

const StatisticsChart: React.FC<StatisticsChartProps> = ({ urls }) => {
  const prepareChartData = () => {
    const last12Days = [];
    const today = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const urlsCreated = urls.filter((url) => {
        const urlDate = new Date(url.createdOn).toDateString();
        return urlDate === date.toDateString();
      }).length;

      const clicksOnDate = urls
        .filter(
          (url) =>
            new Date(url.createdOn).toDateString() === date.toDateString(),
        )
        .reduce((sum, url) => sum + url.clickCount, 0);

      last12Days.push({
        fullDate: date,
        date: formatXAxis(date.toISOString()),
        urlsCreated,
        clicks: clicksOnDate,
      });
    }

    return last12Days;
  };

  const data = prepareChartData();

  return (
    <div
      style={{
        marginTop: "40px",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ height: "400px", width: "100%" }}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis domain={[0, 12]} ticks={[0, 2, 4, 6, 8, 10, 12]} />
            <Tooltip />
            <Legend verticalAlign="top" />

            <Bar
              dataKey="urlsClicks"
              fill="#3498db"
              name="URL Clicks"
              barSize={20}
            />

            <Bar
              dataKey="urlsCreated"
              fill="#9b59b6"
              name="URL Creations"
              barSize={20}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              strokeWidth={3}
              dot={{ r: 6 }}
              legendType="none"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsChart;
