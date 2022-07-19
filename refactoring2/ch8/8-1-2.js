export class Account {
  #daysOverdrawn;
  constructor(daysOverdrawn) {
    this.#daysOverdrawn = daysOverdrawn;
  }

  get bankCharge() {
    let result = 4.5;
    return this.#daysOverdrawn > 0 ? result + this.overdraftCharge : result; // 수정
  }

  get daysOverdrawn() {
    return this.#daysOverdrawn;
  }
}

export class AccountType {
  #type;
  constructor(type) {
    this.#type = type;
  }

  get isPremium() {
    return this.#type === 'Premium';
  }

  overdraftCharge(daysOverdrawn) {
    if (!this.isPremium) {
      return daysOverdrawn * 1.75;
    }
    const baseCharge = 10;

    return daysOverdrawn <= 7
      ? baseCharge
      : baseCharge + (daysOverdrawn - 7) * 0.85;
  }
}
