import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
// import mockApiResponse from "../tests/__mocks__/financialData";
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

  //   const fetchFinancialData = () => {
  // try {
  //   const cacheKey = `${symbol}-financial`;
  //   const cachedData = localStorage.getItem(cacheKey);

  //   if (cachedData) {
  //     setChartData(JSON.parse(cachedData));
  //     return;
  //   }

  //  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  //   const incomeStatementResponse = await axios.get(
  //     `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`
  //   );
  //   console.log("incomestatement", incomeStatementResponse);
  //   const balanceResponse = await axios.get(
  //     `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`
  //   );
  //   console.log("balance response", balanceResponse);
  //   const quarterlyReports = incomeStatementResponse?.data?.quarterlyReports;
  //   const balanceSheet = balanceResponse?.data?.quarterlyReports;
  //   console.log("response", quarterlyReports, balanceSheet);

  //   const labels = quarterlyReports?.map((report) => report.fiscalDateEnding);
  //   console.log("labels", labels);
  //   const netIncome = quarterlyReports?.map((report) =>
  //     Number(report.netIncome)
  //   );
  //   const totalRevenue = quarterlyReports?.map(
  //     (report) => report.totalRevenue
  //   );
  //   const shareHolderEquityData = balanceSheet?.map(
  //     (sheet) => sheet.totalShareHolderEquity
  //   );

  // if (!data || !data.quarterlyReports) {
  //   console.error("Quarterly reports data is unavailable");
  //   setError(
  //     "Failed to load financial data due to data structure issues."
  //   );
  //   return;
  // }

  // setChartData({
  //   // labels: labels,
  //   labels: ["mon", "tue"],
  //   datasets: [
  //     {
  //       label: `Income Statement ${symbol}`,
  //       // data: netIncome,
  //       data: [10, 20, 30],
  //       backgroundColor: "aqua",
  //       borderColor: "black",
  //       pointBorderColor: "aqua",
  //       fill: true,
  //       tension: 0.4,
  //     },
  //     {
  //       label: `Total revenue ${symbol}`,
  //       // data: totalRevenue,
  //       data: [1, 3, 4],
  //       backgroundColor: "green",
  //       borderColor: "black",
  //       pointBorderColor: "green",
  //       fill: true,
  //       tension: 0.4,
  //     },
  //     {
  //       label: `Total Shareholder ${symbol}`,
  //       // data: shareHolderEquityData,
  //       data: [3, 5, 6],
  //       backgroundColor: "red",
  //       borderColor: "black",
  //       pointBorderColor: "red",
  //       fill: true,
  //       tension: 0.4,
  //     },
  //   ],
  // });
  //   localStorage.setItem(cacheKey, JSON.stringify(chartData));
  // } catch (error) {
  //   console.error("Error fetching financial data:", error);
  //   setError("Failed to load financial data.");
  // }
  //   };

  //   const finData = mockApiResponse;
  //   const quarterlyReports = finData?.quarterlyReports;
  //   const labels = quarterlyReports.map((report) => report.fiscalDateEnding);
  //   const netIncome = quarterlyReports.map((report) => Number(report.netIncome));
  //   const totaRevenue = quarterlyReports.map((report) => report.totalRevenue);
  //   const shareHoderEquityData = quarterlyReports.map(
  //     (report) => report.interestIncome
  //   );

  //   const data = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: `Income Statement ${symbol}`,
  //         data: netIncome,
  //         backgroundColor: "aqua",
  //         borderColor: "black",
  //         pointBorderColor: "aqua",
  //         fill: true,
  //         tension: 0.4,
  //       },
  //       {
  //         label: `Total revenue ${symbol}`,
  //         data: totaRevenue,
  //         backgroundColor: "green",
  //         borderColor: "black",
  //         pointBorderColor: "green",
  //         fill: true,
  //         tension: 0.4,
  //       },
  //       {
  //         label: `Total Shareholder ${symbol}`,
  //         data: shareHoderEquityData,
  //         backgroundColor: "red",
  //         borderColor: "black",
  //         pointBorderColor: "red",
  //         fill: true,
  //         tension: 0.4,
  //       },
  //     ],
  //   };

  //   const options = {
  //     plugins: {
  //       legend: true,
  //     },
  //     scales: {
  //       //   y: {
  //       //     min: 3,
  //       //     max: 6,
  //       //   },
  //     },
  //     responsive: true,
  //     maintainAspectRatio: false,
  //   };

  //   useEffect(() => {
  //     fetchFinancialData();
  //   }, [symbol]);

  useEffect(() => {
    const fetchFinancialData = async () => {
      const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY; //place it in .env, this should not expose the API KEY

      const incomeStatementResponse = await axios.get(
        `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`
      );
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
        (sheet) => sheet.totalShareHolderEquity
      );
      try {
        const cacheKey = `${symbol}-financial`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          setChartData(JSON.parse(cachedData));
          return;
        }
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
        localStorage.setItem(cacheKey, JSON.stringify(chartData));
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
