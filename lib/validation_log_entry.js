
export default class ValidationLogEntry {

  constructor(entry) {
    this.entry = entry.split(" ")
  }

  get hash() {
    return this.entry[5]
  }

  get public_key() {
    return this.entry[7]
  }

  get trusted() {
    return this.entry[9]
  }

  get datetime() {
    return `${this.entry[0]} ${this.entry[1]}`
  }

  toJSON() {
    return {
      hash: this.hash,
      public_key: this.public_key,
      trusted: this.trusted,
      datetime: this.datetime
    }
  }
}


