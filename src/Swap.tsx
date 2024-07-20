import SwapComponent from "./SwapComponent";
import TransactionsComponent from "./TransactionComponent";
import Balances from "./Balances";
import { useGardenSetup } from "./store";
import "./App.css";
import "./Swap.css"
function Swap() {
  useGardenSetup();
  return (
    <>
      <div id="container">
        <Balances />
        <SwapComponent></SwapComponent>
        <TransactionsComponent></TransactionsComponent>
      </div>
    </>
  );
}

export default Swap;

