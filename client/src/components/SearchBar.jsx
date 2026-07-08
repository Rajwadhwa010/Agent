import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import api from "../services/api";
import AnalysisCard from "./AnalysisCard";
import AgentSteps from "./AgentSteps";

const EXAMPLE_COMPANIES = [
    { description: "Apple Inc", symbol: "AAPL" },
    { description: "Tesla Inc", symbol: "TSLA" },
    { description: "Microsoft Corp", symbol: "MSFT" },
    { description: "NVIDIA Corp", symbol: "NVDA" },
];

const RECENT_KEY = "alpha_research_recent_searches";
const MAX_RECENT = 5;

const getRecentSearches = () => {
    try {
        const raw = localStorage.getItem(RECENT_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveRecentSearch = (item) => {
    try {
        const existing = getRecentSearches().filter(
            (r) => r.symbol !== item.symbol
        );
        const updated = [item, ...existing].slice(0, MAX_RECENT);
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
        return updated;
    } catch {
        return getRecentSearches();
    }
};

const SearchBar = () => {

    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    const debounceRef = useRef(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        setRecentSearches(getRecentSearches());
    }, []);

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
            setRecentSearches(saveRecentSearch(selectedCompany));

        } catch (error) {

            console.error("Analyze Error:", error);

        } finally {

            setLoading(false);

        }

    };

    // Enter key or the Analyze button both act on the top matching result
    const handleAnalyzeClick = () => {
        if (companies.length > 0) {
            handleAnalyze(companies[0]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAnalyzeClick();
        }
    };

    const showEmptyState = !loading && !analysis && companies.length === 0;

    return (

        <div className="w-full">

            <div className="flex items-stretch gap-3 max-w-3xl">

                <div className="relative flex-1">

                    <SearchIcon
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8A93A2]"
                    />

                    <input
                        type="text"
                        placeholder="Search by company name or ticker..."
                        value={company}
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
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

                <button
                    onClick={handleAnalyzeClick}
                    disabled={companies.length === 0}
                    className="
                        flex
                        items-center
                        gap-2
                        px-6
                        rounded-2xl
                        font-semibold
                        text-sm
                        shrink-0
                        transition
                        disabled:bg-[#F6F7F9]
                        disabled:text-[#C5CAD3]
                        disabled:cursor-not-allowed
                        bg-[#3654F0]
                        text-white
                        hover:bg-[#2A44D6]
                        shadow-sm
                    "
                >
                    Analyze
                    <ArrowRight size={16} />
                </button>

            </div>

            {companies.length > 0 && (

                <div className="mt-2 max-w-3xl bg-white border border-[#E5E8EC] rounded-2xl overflow-hidden shadow-lg">

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

                <div className="mt-6 max-w-3xl flex flex-wrap items-center gap-2">

                    <span className="text-xs text-[#8A93A2] mr-1">
                        {recentSearches.length > 0 ? "Recent:" : "Try:"}
                    </span>

                    {(recentSearches.length > 0 ? recentSearches : EXAMPLE_COMPANIES).map((item) => (
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

            <div ref={resultsRef} className="scroll-mt-8">
                <AgentSteps active={loading} />
                <AnalysisCard analysis={analysis} />
            </div>

        </div>

    );

};

export default SearchBar;