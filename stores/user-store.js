import { action, observable } from "mobx";
import { syntheticModelOptions } from "../lib/options";

export default class UserStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  user = observable(false);
  wagerType = observable("stake");
  wagerAmount = observable(10.0);
  tradeType = observable(syntheticModelOptions[0].trade_type);
  lastDigitPrediction = observable(0);
  ticks = observable(5);
  currentWalletBalance = observable(10000.0);
  syntheticModel = observable(syntheticModelOptions[0]);

  setUser = (user) => {
    this.user = user;
  };

  setWagerType = (wagerType) => {
    this.wagerType = wagerType;
  };

  setWagerAmount = (wagerAmount) => {
    this.wagerAmount = wagerAmount.toFixed(2);
  };

  setTradeType = (tradeType) => {
    this.tradeType = tradeType;
  };

  setLastDigitPrediction = (lastDigitPrediction) => {
    this.lastDigitPrediction = lastDigitPrediction;
  };

  setTicks = (ticks) => {
    this.ticks = ticks;
  };

  setCurrentWalletBalance = (currentWalletBalance) => {
    this.currentWalletBalance = currentWalletBalance.toFixed(2);
  };

  setSyntheticModel = (syntheticModel) => {
    this.syntheticModel = syntheticModel;
  };
}
