export default class Ticker {
  pairName: string;
  price: number;

  constructor(pairName: string, price: number) {
    this.pairName = pairName;
    this.price = price;
  }
}
