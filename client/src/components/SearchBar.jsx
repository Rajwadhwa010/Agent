import { useState, useRef } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import api from "../services/api";
import AnalysisCard from "./AnalysisCard";

const SearchBar = () => {

    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef(null);

    const handleSearch = (value) => {

        setCompany(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (value.trim() === "") {
            setCompanies([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {

            try {

                const response = await api.post("/search", {
                    company: value,
                });

                setCompanies(response.data.data || []);

            } catch (error) {

                console.error("Search Error:", error);

            }

        }, 400); // waits 400ms after typing stops before calling the API

    };

    const handleAnalyze = async (selectedCompany) => {

        setLoading(true);

        try {

            const response = await api.post("/analyze", {
                company: selectedCompany.description,
                symbol: selectedCompany.symbol,
            });

            setAnalysis(response.data.data);

            setCompany(selectedCompany.description);
            setCompanies([]);

        } catch (error) {

            console.error("Analyze Error:", error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="w-full max-w-3xl mx-auto">

            <div className="relative">

                <SearchIcon
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8A93A2]"
                />

                <input
                    type="text"
                    placeholder="Search a company, e.g. Apple, Tesla, Microsoft..."
                    value={company}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-[#E5E8EC]
                        bg-white
                        pl-14
                        pr-5
                        py-4
                        text-[#10151C]
                        text-base
                        shadow-sm
                        outline-none
                        transition
                        focus:border-[#3654F0]
                        focus:ring-4
                        focus:ring-[#3654F0]/10
                        placeholder:text-[#8A93A2]
                    "
                />

            </div>

            {companies.length > 0 && (

                <div
                    className="
                        mt-2
                        bg-white
                        border
                        border-[#E5E8EC]
                        rounded-2xl
                        overflow-hidden
                        shadow-lg
                    "
                >

                    {companies.map((item, index) => (

                        <div
                            key={`${item.symbol}-${index}`}
                            onClick={() => handleAnalyze(item)}
                            className="
                                px-5
                                py-4
                                border-b
                                border-[#E5E8EC]
                                last:border-b-0
                                hover:bg-[#F6F7F9]
                                cursor-pointer
                                transition
                                flex
                                items-center
                                justify-between
                                gap-4
                            "
                        >

                            <p className="text-[#10151C] font-medium">
                                {item.description}
                            </p>

                            <p className="text-[#8A93A2] text-xs font-['IBM_Plex_Mono',_monospace] bg-[#F6F7F9] px-2 py-1 rounded-md shrink-0">
                                {item.symbol}
                            </p>

                        </div>

                    ))}

                </div>

            )}

            {loading && (

                <div className="mt-8 flex items-center justify-center gap-3 text-[#3654F0] text-base font-medium">
                    <Loader2 size={20} className="animate-spin" />
                    AI is analyzing the company...
                </div>

            )}

            <AnalysisCard analysis={analysis} />

        </div>

    );

};

export default SearchBar;