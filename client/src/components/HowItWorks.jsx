import { Search, Cpu, FileCheck2 } from "lucide-react";

const STEPS = [
    {
        icon: Search,
        title: "Search",
        description: "Find any public company by name or ticker",
    },
    {
        icon: Cpu,
        title: "AI Research",
        description: "Real financials, quotes & news analyzed by Gemini",
    },
    {
        icon: FileCheck2,
        title: "Get Verdict",
        description: "A clear Invest/Pass call with full reasoning",
    },
];

const HowItWorks = () => {

    return (
        <div className="mt-16 max-w-3xl">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                {STEPS.map(({ icon: Icon, title, description }, index) => (

                    <div key={title} className="flex items-start gap-3">

                        <div className="w-9 h-9 rounded-lg bg-[#3654F0]/10 flex items-center justify-center shrink-0">
                            <Icon size={16} className="text-[#3654F0]" />
                        </div>

                        <div>
                            <p className="text-[#10151C] text-sm font-semibold">
                                {index + 1}. {title}
                            </p>
                            <p className="text-[#8A93A2] text-xs mt-1 leading-relaxed">
                                {description}
                            </p>
                        </div>

                    </div>

                ))}

            </div>

            <p className="text-[#C5CAD3] text-xs mt-10 tracking-wide">
                Powered by Finnhub · Gemini · LangGraph
            </p>

        </div>
    );

};

export default HowItWorks;