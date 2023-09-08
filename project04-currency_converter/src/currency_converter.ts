import axios from "axios";

export default class CurrencyConverter {
  async convertCurrency(
    amount: number,
    from: string,
    to: string
  ): Promise<number> {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      const rates = response.data.rates;
      if (rates.hasOwnProperty(to)) {
        const conversionRate = rates[to];
        const convertedAmount = amount * conversionRate;
        return convertedAmount;
      } else {
        throw new Error("Currency not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
