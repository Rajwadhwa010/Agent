import { getStockQuote } from "../services/finnhubService.js";
import { successResponse, errorResponse } from "../utils/response.js";

// A small, fixed set of well-known companies — not a "trending" algorithm,
// since Finnhub's free tier has no such signal. Labeled honestly as
// "Popular Companies" in the UI for exactly that reason.
const POPULAR_COMPANIES = [
    { description: "Apple Inc", symbol: "AAPL" },
    { description: "Tesla Inc", symbol: "TSLA" },
    { description: "Microsoft Corp", symbol: "MSFT" },
    { description: "NVIDIA Corp", symbol: "NVDA" },
];

export const fetchPopularQuotes = async (req, res) => {
    try {

        const results = await Promise.allSettled(
            POPULAR_COMPANIES.map((company) => getStockQuote(company.symbol))
        );

        const quotes = POPULAR_COMPANIES.map((company, index) => {
            const result = results[index];

            if (result.status !== "fulfilled" || !result.value?.c) {
                return { ...company, price: null, changePercent: null };
            }

            return {
                ...company,
                price: result.value.c,
                changePercent: result.value.dp,
            };
        });

        return successResponse(res, quotes);

    } catch (error) {

        return errorResponse(res, error.message, 500);

    }
};