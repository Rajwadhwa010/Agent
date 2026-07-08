import axios from "axios";

export const getCompanyProfile = async (symbol) => {
  try {
    const url = `https://financialmodelingprep.com/stable/profile?symbol=${symbol}&apikey=${process.env.FMP_API_KEY}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch company profile");
  }
};