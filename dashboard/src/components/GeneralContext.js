import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openTradeWindow: (uid, type) => {}, // type = "buy" or "sell"
  closeTradeWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isTradeWindowOpen, setIsTradeWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [tradeType, setTradeType] = useState(""); // buy/sell

  const handleOpenTradeWindow = (uid, type) => {
    setIsTradeWindowOpen(true);
    setSelectedStockUID(uid);
    setTradeType(type);
  };

  const handleCloseTradeWindow = () => {
    setIsTradeWindowOpen(false);
    setSelectedStockUID("");
    setTradeType("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openTradeWindow: handleOpenTradeWindow,
        closeTradeWindow: handleCloseTradeWindow,
      }}
    >
      {props.children}
      {isTradeWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} type={tradeType} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
