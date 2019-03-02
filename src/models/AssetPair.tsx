export default class AssetPair {
  name: string;
  base: string;
  quote: string;

  constructor(name: string, base: string, quote: string) {
    this.name = name;
    this.base = base;
    this.quote = quote;
  }

  getDisplayName() {
    return `${this.base}/${this.quote}`;
  }
}
