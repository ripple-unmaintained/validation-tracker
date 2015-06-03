
export default class ValidationLogEntry {

  constructor(entry) {
    this.entry = entry.split(" ")
    if (this.entry.length!==10) {
      throw new Error("Invalid log entry")
    } else if (this.entry[7][0]!=='n' || this.entry[7].length!==52) {
      throw new Error("Invalid validation public_key")
    }
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


