import { investmentGraph } from "../graph/investmentGraph.js";

export const analyzeInvestment = async (company, symbol) => {

    try {

        const result = await investmentGraph.invoke({
            company,
            symbol,
        });

        // The graph's final state holds everything each node produced;
        // we only need the "analysis" node's output here.
        return result.analysis;

    } catch (error) {

        throw new Error(error.message);

    }

};