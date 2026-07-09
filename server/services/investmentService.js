import { investmentGraph } from "../graph/investmentGraph.js";

export const analyzeInvestment = async (company, symbol) => {

    try {

        const result = await investmentGraph.invoke({
            company,
            symbol,
        });

        return {
            ...result.analysis,

            // Real data pulled straight from Finnhub, more reliable than
            // asking the AI to report exact figures in its JSON output.
            news: result.research?.news || [],
            logo: result.research?.profile?.logo || null,
            marketCap: result.research?.profile?.marketCapitalization || null,
            currentPrice: result.research?.quote?.c || null,
        };

    } catch (error) {

        throw new Error(error.message);

    }

};