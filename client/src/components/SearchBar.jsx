import { useState, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import api from "../services/api";
import AnalysisCard from "./AnalysisCard";
import AgentSteps from "./AgentSteps";

const EXAMPLE_COMPANIES = [
    { description: "Apple Inc", symbol: "AAPL" },
    { description: "Tesla Inc", symbol: "TSLA" },
    { description: "Microsoft Corp", symbol: "MSFT" },
    { description: "NVIDIA Corp", symbol: "NVDA" },
];

const SearchBar = () => {

    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef(null);
    const resultsRef = useRef(null);

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

        }, 400);

    };

    const scrollToResults = () => {
        // Wait a tick so the loading/result section has rendered before scrolling
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    const handleAnalyze = async (selectedCompany) => {

        setLoading(true);
        setAnalysis(null);
        scrollToResults();

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

    const showEmptyState = !loading && !analysis && companies.length === 0;

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

                <div className="mt-2 bg-white border border-[#E5E8EC] rounded-2xl overflow-hidden shadow-lg">

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

            {showEmptyState && (

                <div className="mt-6 flex flex-wrap items-center gap-2">

                    <span className="text-xs text-[#8A93A2] mr-1">
                        Try:
                    </span>

                    {EXAMPLE_COMPANIES.map((item) => (
                        <button
                            key={item.symbol}
                            onClick={() => handleAnalyze(item)}
                            className="
                                text-sm
                                font-medium
                                text-[#3654F0]
                                bg-[#3654F0]/5
                                border
                                border-[#3654F0]/15
                                rounded-full
                                px-4
                                py-1.5
                                hover:bg-[#3654F0]/10
                                transition
                            "
                        >
                            {item.description}
                        </button>
                    ))}

                </div>

            )}

            {/* Anchor point: scrolled into view as soon as a company is clicked */}
            <div ref={resultsRef} className="scroll-mt-8">
                <AgentSteps active={loading} />
                <AnalysisCard analysis={analysis} />
            </div>

        </div>

    );

};

export default SearchBar;