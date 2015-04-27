
export default class LedgerLogEntry {

  constructor(entry) {
    this.entry = entry.split(" ")
  }

  get sequence() {
    return this.entry[7]
  }

  get datetime() {
    return `${this.entry[0]} ${this.entry[1]}`
  }

  toJSON() {
    return {
      sequence: this.sequence,
      datetime: this.datetime
    }
  }
}


