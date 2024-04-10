import React, { useState } from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FinancialChart from "./components/FinancialChart";

function App() {
  const [symbol, setSymbol] = useState("IBM");
  return (
    <div className="App container mt-5">
      <div className="d-flex flex-column align-items-center">
        <h2 className="mb-4">Financial Dashboard</h2>

        <input
          className="mb-5"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter Stock Symbol"
          aria-label="Stock Symbol"
          aria-describedby="button-addon2"
        />
      </div>
      <FinancialChart symbol={symbol} />
    </div>
  );
}

export default App;
