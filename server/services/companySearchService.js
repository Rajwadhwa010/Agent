import axios from "axios";

const BASE_URL = "https://finnhub.io/api/v1";

export const searchCompanies = async (companyName) => {
    try {

        const response = await axios.get(
            `${BASE_URL}/search`,
            {
                params: {
                    q: companyName,
                    token: process.env.FINNHUB_API_KEY,
                },
            }
        );

        if (
            !response.data.result ||
            response.data.result.length === 0
        ) {
            throw new Error("Company not found.");
        }

        return response.data.result;

    } catch (error) {

        throw new Error("Unable to search companies.");

    }
};