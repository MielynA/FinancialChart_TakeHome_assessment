import React, { useState } from "react";
import "./App.css";
import FinancialChart from "./components/FinancialChart";

function App() {
  const [symbol, setSymbol] = useState("IBM");
  return (
    <div className="App">
      <h2>Financial Dashboard</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter Stock Symbol"
      />
      <FinancialChart symbol={symbol} />
    </div>
  );
}

export default App;
