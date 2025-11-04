import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img src="https://static.virtubox.io/project/file/20231117-062221-cwvb-brands.jpg" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>Largest stock broker in India</h1>
          <p className="mb-5">
            2+ million AlphaTrade clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/013/063/866/small/planning-analyze-indicator-and-strategy-buy-and-sell-stock-market-business-growth-progress-or-success-concept-businessman-or-trader-is-pointing-a-growing-virtual-hologram-stock-invest-in-trading-photo.jpg" style={{ width: "90%" }} />
        </div>
      </div>
    </div>
  );
}

export default Awards;
