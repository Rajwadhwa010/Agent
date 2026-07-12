import express from "express";
import { analyzeCompany } from "../controllers/investmentController.js";
import { searchCompany } from "../controllers/companyController.js";
import { fetchPopularQuotes } from "../controllers/popularQuotesController.js";
import { validateInvestment } from "../middleware/validateInvestment.js";

const router = express.Router();

router.post("/search", searchCompany);

router.post(
    "/analyze",
    validateInvestment,
    analyzeCompany
);

router.get("/popular-quotes", fetchPopularQuotes);

export default router;