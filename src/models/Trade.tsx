export default class Trade {
  price: number;
  volume: number;
  date: Date;

  constructor(price: number, volume: number, date: Date) {
    this.price = price;
    this.volume = volume;
    this.date = date;
  }
}
