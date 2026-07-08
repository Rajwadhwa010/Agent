import { analyzeInvestment } from "../services/investmentService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const analyzeCompany = async (req, res) => {
    try {

        const { company, symbol } = req.body;
        const result = await analyzeInvestment(company, symbol);

        return successResponse(res, result);

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            500
        );

    }
};