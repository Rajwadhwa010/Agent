import axios from "axios";

export const getCompanySymbol = async (companyName) => {
  try {
    const url = `https://financialmodelingprep.com/stable/search-symbol?query=${companyName}&apikey=${process.env.FMP_API_KEY}`;

    const response = await axios.get(url);

    if (!response.data || response.data.length === 0) {
      throw new Error("Company not found.");
    }

    return response.data[0].symbol;
  } catch (error) {
    throw new Error("Unable to find company symbol.");
  }
};