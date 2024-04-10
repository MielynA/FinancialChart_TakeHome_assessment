import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const FinancialChart = ({ symbol }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFinancialData = async () => {
      const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY; //place it in .env, this should not expose the API KEY

      const incomeStatementResponse = await axios.get(
        `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`
      );
      console.log("response", incomeStatementResponse);
      const balanceResponse = await axios.get(
        `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`
      );
      const quarterlyReports = incomeStatementResponse?.data?.quarterlyReports;
      const balanceSheet = balanceResponse?.data?.quarterlyReports;
      console.log("response", quarterlyReports, balanceSheet);

      const labels = quarterlyReports?.map((report) => report.fiscalDateEnding);
      const netIncome = quarterlyReports?.map((report) =>
        Number(report.netIncome)
      );
      const totalRevenue = quarterlyReports?.map(
        (report) => report.totalRevenue
      );
      const shareHolderEquityData = balanceSheet?.map(
        (sheet) => sheet.totalShareholderEquity
      );
      try {
        setChartData({
          labels: labels,
          datasets: [
            {
              label: `Income Statement ${symbol}`,
              data: netIncome,
              backgroundColor: "aqua",
              borderColor: "black",
              pointBorderColor: "aqua",
              fill: true,
              tension: 0.4,
            },
            {
              label: `Total revenue ${symbol}`,
              data: totalRevenue,
              backgroundColor: "green",
              borderColor: "black",
              pointBorderColor: "green",
              fill: true,
              tension: 0.4,
            },
            {
              label: `Total Shareholder ${symbol}`,
              data: shareHolderEquityData,
              backgroundColor: "red",
              borderColor: "black",
              pointBorderColor: "red",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching financial data:", error);
        setError("Failed to load financial data.");
      }
    };

    fetchFinancialData();
  }, [symbol]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      )}
    </div>
  );
};

export default FinancialChart;
