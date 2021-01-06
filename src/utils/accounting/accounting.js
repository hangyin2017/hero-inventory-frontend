class accounting {
  static gstRate = 0.1;

  static toFixedNumber = (digits) => {
    const decimal = Math.pow(10, digits);
    
    return (amount) => {
      return Math.round(amount * decimal) / decimal;
    }
  }

  static toFixedNumber2 = this.toFixedNumber(2);

  static format = (amount) => {
    return this.toFixedNumber2(amount);
  }

  static calcGst = (amount, applyGst = true) => {
    return applyGst ? this.format(amount * this.gstRate) : 0;
  }
};

export default accounting;
