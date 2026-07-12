import { useEffect, useState } from "react";
import { TrendingUp as TrendingIcon, ArrowUp, ArrowDown } from "lucide-react";
import api from "../services/api";

const PopularCompaniesPanel = ({ onSelect }) => {

    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const fetchQuotes = async () => {
            try {
                const response = await api.get("/popular-quotes");
                setQuotes(response.data.data || []);
                setError(false);
            } catch (err) {
                console.error("Popular quotes error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();

        const intervalId = setInterval(fetchQuotes, 60000);

        return () => clearInterval(intervalId);

    }, []);

    return (
        <div className="bg-white border border-[#E5E8EC] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-2 mb-4">
                <TrendingIcon size={15} className="text-[#8A93A2]" />
                <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold">
                    Popular Companies
                </p>
            </div>

            {loading && (
                <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 bg-[#F6F7F9] rounded-lg animate-pulse" />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className="text-[#C5CAD3] text-sm">
                    Live quotes are unavailable right now.
                </p>
            )}

            {!loading && !error && (
                <div className="space-y-0.5">
                    {quotes.map((item) => {

                        const hasData = item.price !== null && item.changePercent !== null;
                        const isUp = hasData && item.changePercent >= 0;

                        return (
                            <button
                                key={item.symbol}
                                onClick={() => onSelect(item)}
                                className="w-full flex items-center justify-between px-3 py-2.5 -mx-3 rounded-xl hover:bg-[#F6F7F9] transition"
                            >
                                <div className="text-left">
                                    <p className="text-[#10151C] text-sm font-medium">
                                        {item.description}
                                    </p>
                                    <p className="text-[#8A93A2] text-xs font-['IBM_Plex_Mono',_monospace]">
                                        {item.symbol}
                                    </p>
                                </div>

                                {hasData ? (
                                    <div className={`flex items-center gap-1 text-sm font-semibold ${isUp ? "text-[#0E9F6E]" : "text-[#E53E3E]"}`}>
                                        {isUp ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
                                        {Math.abs(item.changePercent).toFixed(2)}%
                                    </div>
                                ) : (
                                    <span className="text-[#C5CAD3] text-xs">—</span>
                                )}
                            </button>
                        );

                    })}
                </div>
            )}

        </div>
    );

};

export default PopularCompaniesPanel;