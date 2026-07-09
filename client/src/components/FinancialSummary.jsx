import { LineChart, Percent, Scale, Landmark } from "lucide-react";

const STAT_CONFIG = [
    { key: "revenuePerShare", label: "Revenue / Share", icon: LineChart },
    { key: "peRatio", label: "P/E Ratio", icon: Scale },
    { key: "roe", label: "ROE", icon: Percent },
    { key: "debtToEquity", label: "Debt / Equity", icon: Landmark },
];

const FinancialSummary = ({ keyFinancials }) => {

    if (!keyFinancials) return null;

    const hasAnyData = STAT_CONFIG.some(
        (stat) => keyFinancials[stat.key] && keyFinancials[stat.key] !== "N/A"
    );

    if (!hasAnyData) return null;

    return (
        <div className="mt-10">

            <h3 className="font-['Newsreader',_serif] text-2xl font-semibold text-[#10151C] mb-6">
                Key Financials
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {STAT_CONFIG.map(({ key, label, icon: Icon }) => {

                    const value = keyFinancials[key];
                    const isAvailable = value && value !== "N/A";

                    return (
                        <div
                            key={key}
                            className="bg-white border border-[#E5E8EC] rounded-2xl p-5 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Icon size={15} className="text-[#8A93A2]" />
                                <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold">
                                    {label}
                                </p>
                            </div>

                            <p
                                className={`font-['IBM_Plex_Mono',_monospace] text-xl font-semibold ${
                                    isAvailable ? "text-[#10151C]" : "text-[#C5CAD3]"
                                }`}
                            >
                                {isAvailable ? value : "N/A"}
                            </p>
                        </div>
                    );

                })}

            </div>

        </div>
    );

};

export default FinancialSummary;