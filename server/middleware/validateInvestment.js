import { errorResponse } from "../utils/response.js";

export const validateInvestment = (req, res, next) => {

    const { company, symbol } = req.body;

    if (!company || !symbol) {
        return errorResponse(
            res,
            "Company name and symbol are required.",
            400
        );
    }

    next();
};