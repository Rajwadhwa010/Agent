import axios from "axios";

const BASE_URL = "https://finnhub.io/api/v1";

// Function 1
export const getCompanyProfile = async (symbol) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/stock/profile2`,
            {
                params: {
                    symbol,
                    token: process.env.FINNHUB_API_KEY,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Finnhub profile error:", error.response?.data || error.message);
        throw new Error("Unable to fetch company profile.");
    }
};

// Function 2
export const getStockQuote = async (symbol) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/quote`,
            {
                params: {
                    symbol,
                    token: process.env.FINNHUB_API_KEY,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Finnhub quote error:", error.response?.data || error.message);
        throw new Error("Unable to fetch stock quote.");
    }
};

// Function 3
export const getCompanyNews = async (symbol) => {
    try {
        const today = new Date();
        const lastMonth = new Date();

        lastMonth.setDate(today.getDate() - 30);

        const response = await axios.get(
            `${BASE_URL}/company-news`,
            {
                params: {
                    symbol,
                    from: lastMonth.toISOString().split("T")[0],
                    to: today.toISOString().split("T")[0],
                    token: process.env.FINNHUB_API_KEY,
                },
            }
        );

        return response.data.slice(0, 5);

    } catch (error) {
        console.error("Finnhub news error:", error.response?.data || error.message);
        throw new Error("Unable to fetch company news.");
    }
};

// Function 4
export const getBasicFinancials = async (symbol) => {
    try {

        const response = await axios.get(
            `${BASE_URL}/stock/metric`,
            {
                params: {
                    symbol,
                    metric: "all",
                    token: process.env.FINNHUB_API_KEY,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Finnhub financials error:", error.response?.data || error.message);
        throw new Error("Unable to fetch financial metrics.");
    }
};

// Function 5 — general market news, not tied to a specific company
