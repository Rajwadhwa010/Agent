import { investmentGraph } from "../graph/investmentGraph.js";

export const analyzeInvestment = async (company, symbol) => {

    try {

        const result = await investmentGraph.invoke({
            company,
            symbol,
        });

        // Merge the AI verdict with the raw news list from research,
        // so the frontend gets everything in one object (same as before).
        return {
            ...result.analysis,
            news: result.research?.news || [],
        };

    } catch (error) {

        throw new Error(error.message);

    }

};