import { useState } from "react";
import { Building2 } from "lucide-react";
import VerdictStamp from "./VerdictStamp";

// Finnhub's marketCapitalization is reported in millions USD
const formatMarketCap = (millions) => {
    if (!millions || millions <= 0) return null;

    if (millions >= 1_000_000) return `$${(millions / 1_000_000).toFixed(1)}T`;
    if (millions >= 1_000) return `$${(millions / 1_000).toFixed(1)}B`;
    return `$${millions.toFixed(0)}M`;
};

const CompanyHeader = ({ analysis }) => {

    const [logoFailed, setLogoFailed] = useState(false);

    const marketCap = formatMarketCap(analysis.marketCap);

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="flex items-center gap-4">

                {/* Logo, with a graceful fallback icon if it fails to load or is missing */}
                <div className="w-14 h-14 rounded-2xl bg-[#F6F7F9] border border-[#E5E8EC] flex items-center justify-center overflow-hidden shrink-0">
                    {analysis.logo && !logoFailed ? (
                        <img
                            src={analysis.logo}
                            alt={`${analysis.company} logo`}
                            className="w-full h-full object-contain p-2"
                            onError={() => setLogoFailed(true)}
                        />
                    ) : (
                        <Building2 size={24} className="text-[#8A93A2]" />
                    )}
                </div>

                <div>
                    <h2 className="font-['Newsreader',_serif] text-4xl font-semibold text-[#10151C]">
                        {analysis.company}
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">

                        <span className="text-[#8A93A2] text-sm uppercase tracking-wider font-semibold">
                            {analysis.industry}
                        </span>

                        {analysis.symbol && (
                            <span className="text-xs font-['IBM_Plex_Mono',_monospace] bg-[#F6F7F9] text-[#4B5563] px-2 py-1 rounded-md">
                                {analysis.symbol}
                            </span>
                        )}

                        {marketCap && (
                            <span className="text-xs font-['IBM_Plex_Mono',_monospace] bg-[#F6F7F9] text-[#4B5563] px-2 py-1 rounded-md">
                                Market Cap: {marketCap}
                            </span>
                        )}

                    </div>
                </div>

            </div>

            <VerdictStamp verdict={analysis.recommendation} />

        </div>
    );

};

export default CompanyHeader;