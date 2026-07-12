import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
    {
        q: "Is this financial advice?",
        a: "No. This is an AI-generated analysis for informational purposes only, not a recommendation to buy or sell.",
    },
    {
        q: "What data powers this?",
        a: "Live company financials, quotes, and news from Finnhub, analyzed by Google Gemini.",
    },
    {
        q: "How is the score calculated?",
        a: "The AI weighs business quality, financial health, market position, and risk to produce a 0–100 score.",
    },
];

const FAQPanel = () => {

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="bg-white border border-[#E5E8EC] rounded-2xl p-5 shadow-sm">

            <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-2">
                FAQ
            </p>

            <div className="divide-y divide-[#E5E8EC]">
                {FAQS.map(({ q, a }, index) => {

                    const isOpen = openIndex === index;

                    return (
                        <div key={q} className="py-3 first:pt-2 last:pb-0">

                            <button
                                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                className="w-full flex items-center justify-between gap-3 text-left"
                            >
                                <span className="text-[#10151C] text-sm font-semibold">
                                    {q}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`text-[#8A93A2] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            <div
                                className="grid transition-all duration-200 ease-in-out"
                                style={{
                                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                                }}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-[#8A93A2] text-xs leading-relaxed mt-2">
                                        {a}
                                    </p>
                                </div>
                            </div>

                        </div>
                    );

                })}
            </div>

        </div>
    );

};

export default FAQPanel;