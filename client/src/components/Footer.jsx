import { Sparkles } from "lucide-react";

const Footer = () => {

    return (
        <div className="mt-14 pt-8 border-t border-[#E5E8EC] max-w-5xl">

            <div className="flex flex-wrap items-center justify-between gap-6">

                <div className="inline-flex items-center gap-2 border border-dashed border-[#C5CAD3] rounded-lg px-3 py-1.5">
                    <Sparkles size={13} className="text-[#8A93A2]" />
                    <span className="font-['IBM_Plex_Mono',_monospace] text-xs uppercase tracking-widest text-[#8A93A2]">
                        AI Generated Report
                    </span>
                </div>

                <p className="font-['IBM_Plex_Mono',_monospace] text-xs text-[#8A93A2] tracking-wide">
                    Search <span className="text-[#C5CAD3] mx-1.5">→</span>
                    Research <span className="text-[#C5CAD3] mx-1.5">→</span>
                    Analyze <span className="text-[#C5CAD3] mx-1.5">→</span>
                    Verdict
                </p>

            </div>

            <p className="font-['Newsreader',_serif] italic text-[#8A93A2] text-sm mt-6 leading-relaxed">
                Generated using Gemini 2.5 and real-time data from Finnhub, orchestrated through
                a LangGraph pipeline. For informational purposes only — not financial advice.
            </p>

        </div>
    );

};

export default Footer;