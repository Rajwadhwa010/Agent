import { CheckCircle2, Building2 } from "lucide-react";

// A static, illustrative preview of what a real result looks like —
// not live data, just a visual teaser to fill the hero's empty space
// and show visitors the payoff before they search.
const HeroPreview = () => {

    return (
        <div className="hidden lg:block relative">

            <div className="bg-white border border-[#E5E8EC] rounded-3xl p-7 shadow-lg rotate-2 hover:rotate-0 transition duration-300">

                <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F6F7F9] border border-[#E5E8EC] flex items-center justify-center">
                            <Building2 size={18} className="text-[#8A93A2]" />
                        </div>
                        <div>
                            <p className="font-['Newsreader',_serif] text-lg font-semibold text-[#10151C]">
                                Apple Inc
                            </p>
                            <p className="text-[#8A93A2] text-xs font-['IBM_Plex_Mono',_monospace]">
                                AAPL
                            </p>
                        </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#0E9F6E] bg-[#0E9F6E]/10 border border-dashed border-[#0E9F6E] rounded-lg px-3 py-1.5 -rotate-2">
                        <CheckCircle2 size={14} />
                        Invest
                    </span>

                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#E5E8EC]">

                    <svg width="64" height="64" viewBox="0 0 96 96" className="-rotate-90 shrink-0">
                        <circle cx="48" cy="48" r="42" fill="none" stroke="#EDF0F4" strokeWidth="8" />
                        <circle
                            cx="48" cy="48" r="42" fill="none"
                            stroke="#3654F0" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 42}
                            strokeDashoffset={2 * Math.PI * 42 * 0.1}
                        />
                        <text
                            x="48" y="48" textAnchor="middle" dominantBaseline="central"
                            transform="rotate(90 48 48)"
                            className="font-['IBM_Plex_Mono',_monospace] text-lg font-bold"
                            fill="#10151C"
                        >
                            90
                        </text>
                    </svg>

                    <div>
                        <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold">
                            Investment Score
                        </p>
                        <span className="inline-block mt-1.5 text-xs font-semibold px-2.5 py-1 rounded-full text-[#0E9F6E] bg-[#0E9F6E]/10">
                            Strong Buy
                        </span>
                    </div>

                </div>

            </div>

            <p className="text-center text-[#C5CAD3] text-xs mt-4 tracking-wide">
                Example output — search a company to generate a real report
            </p>

        </div>
    );

};

export default HeroPreview;