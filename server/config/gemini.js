import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0.3,
});

export default model;