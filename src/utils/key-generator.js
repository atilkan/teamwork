export default class KeyGenerator {
  static generate(chars = 5, segments = 4) {
    const tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let keyString = ""

    for (let i = 0; i < segments; i++) {
      let segment = ""
      for (let j = 0; j < chars; j++) {
        const k = this.getRandomInt(0, 35)
        segment += tokens[k]
      }
      keyString += segment
      if (i < segments - 1) {
        keyString += "-"
      }
    }

    return keyString
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
