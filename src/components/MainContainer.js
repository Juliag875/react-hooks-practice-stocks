import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filterBy, setFilterBy] = useState("Tech");
  const [sortBy, setSortBy] = useState("Alphabetically");

  useEffect(()=> {
    fetch("http://localhost:3001/stocks")
    .then(r=>r.json())
    .then(setStocks)
  }, [])

  function handleAddStocks(newStock){
    setPortfolio([...portfolio, newStock])
  }

  function handleDeleteStock(deletedStock){
    const updatedStocks = portfolio.filter(stock => stock.id !== deletedStock.id);
    setPortfolio(updatedStocks);
  }

    const sortedStocks = stocks.sort((stock1, stock2) => {
      if (sortBy==="Alphabetically"){
        return stock1.name.localeCompare(stock2.name);
      } else {
        return stock1.price - stock2.price
      }
    })

    const stocksToDisplay = sortedStocks.filter(stock=>{
      if (filterBy === "Tech") {
        return true;
      }else {
        return stock.type === filterBy;
      }
    })

  return (
    <div>
      <SearchBar 
      sortBy={sortBy}
      setSortBy={setSortBy}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
          onAddStock={handleAddStocks}
          stocks={stocksToDisplay} 
      />
        </div>
        <div className="col-4">
          <PortfolioContainer
           stocks={portfolio}
           onDeleteStock={handleDeleteStock}
            />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
