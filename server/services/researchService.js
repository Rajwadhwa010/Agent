import {
    getCompanyProfile,
    getStockQuote,
    getCompanyNews,
    getBasicFinancials,
} from "./finnhubService.js";

export const researchCompany = async (symbol) => {

    try {

        const results = await Promise.allSettled([
            getCompanyProfile(symbol),
            getStockQuote(symbol),
            getCompanyNews(symbol),
            getBasicFinancials(symbol),
        ]);

        const [profile, quote, news, financials] = results.map((r) =>
            r.status === "fulfilled" ? r.value : null
        );

        // Log which calls failed, so partial failures are visible in the terminal
        results.forEach((r, i) => {
            if (r.status === "rejected") {
                const labels = ["profile", "quote", "news", "financials"];
                console.error(`Research step failed (${labels[i]}):`, r.reason?.message || r.reason);
            }
        });

        return {
            profile,
            quote,
            news,
            financials,
        };

    } catch (error) {

        console.error("Research collection error:", error.message);
        throw new Error("Failed to collect research data.");

    }

};