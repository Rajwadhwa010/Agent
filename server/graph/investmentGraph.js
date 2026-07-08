import { StateGraph, Annotation, END, START } from "@langchain/langgraph";
import model from "../config/gemini.js";
import { researchCompany } from "../services/researchService.js";
import { investmentPrompt } from "../prompts/investmentPrompt.js";

// Define the shape of state that flows through the graph
const InvestmentState = Annotation.Root({
    company: Annotation(),
    symbol: Annotation(),
    research: Annotation(),
    analysis: Annotation(),
});

// Node 1: gather research data from Finnhub
const gatherResearch = async (state) => {
    const research = await researchCompany(state.symbol);
    return { research };
};

// Node 2: ask Gemini (via LangChain) to analyze the research and return a verdict
const analyzeCompany = async (state) => {

    const prompt = investmentPrompt({
        company: state.company,
        symbol: state.symbol,
        research: state.research,
    });

    const response = await model.invoke(prompt);

    const cleaned = response.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const analysis = JSON.parse(cleaned);

    return { analysis };
};

// Build the graph: START -> gatherResearch -> analyzeCompany -> END
const graph = new StateGraph(InvestmentState)
    .addNode("gatherResearch", gatherResearch)
    .addNode("analyzeCompany", analyzeCompany)
    .addEdge(START, "gatherResearch")
    .addEdge("gatherResearch", "analyzeCompany")
    .addEdge("analyzeCompany", END);

export const investmentGraph = graph.compile();