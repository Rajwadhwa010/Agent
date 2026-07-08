import { searchCompanies } from "../services/companySearchService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const searchCompany = async (req, res) => {
    try {

        const { company } = req.body;

        if (!company) {
            return errorResponse(
                res,
                "Company name is required.",
                400
            );
        }

        const companies = await searchCompanies(company);

        return successResponse(res, companies);

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            500
        );

    }
};