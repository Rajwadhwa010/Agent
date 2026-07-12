import { useState, useRef } from "react";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import api from "../services/api";

const EXAMPLE_COMPANIES = [
    { description: "Apple Inc", symbol: "AAPL" },
    { description: "Tesla Inc", symbol: "TSLA" },
    { description: "Microsoft Corp", symbol: "MSFT" },
    { description: "NVIDIA Corp", symbol: "NVDA" },
];

const SearchBar = ({ onSelectCompany }) => {

    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState([]);

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

        }, 400);

    };

    const handleSelect = (item) => {
        setCompany(item.description);
        setCompanies([]);
        onSelectCompany(item);
    };

    const handleAnalyzeClick = () => {
        if (companies.length > 0) {
            handleSelect(companies[0]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAnalyzeClick();
        }
    };

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
                            onClick={() => handleSelect(item)}
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

            {companies.length === 0 && (

                <div className="mt-8 max-w-3xl">

                    <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-3">
                        Try These
                    </p>

                    <div className="flex flex-wrap items-center gap-2">

                        {EXAMPLE_COMPANIES.map((item) => (
                            <button
                                key={item.symbol}
                                onClick={() => handleSelect(item)}
                                className="
                                    text-sm
                                    font-medium
                                    text-[#10151C]
                                    bg-white
                                    border
                                    border-[#E5E8EC]
                                    rounded-full
                                    px-4
                                    py-2
                                    shadow-sm
                                    hover:border-[#3654F0]/40
                                    transition
                                "
                            >
                                {item.description}{" "}
                                <span className="text-[#8A93A2] font-['IBM_Plex_Mono',_monospace] text-xs">
                                    ({item.symbol})
                                </span>
                            </button>
                        ))}

                    </div>

                </div>

            )}

        </div>

    );

};

export default SearchBar;