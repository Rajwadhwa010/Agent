import { Search, Cpu, FileCheck2 } from "lucide-react";

const STEPS = [
    {
        icon: Search,
        number: "01",
        title: "Search",
        description: "Find any public company by name or ticker",
    },
    {
        icon: Cpu,
        number: "02",
        title: "AI Research",
        description: "Real financials, quotes & news analyzed by Gemini",
    },
    {
        icon: FileCheck2,
        number: "03",
        title: "Get Verdict",
        description: "A clear Invest/Pass call with full reasoning",
    },
];

const HowItWorks = () => {

    return (
        <div className="mt-12 max-w-3xl">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                {STEPS.map(({ icon: Icon, number, title, description }) => (

                    <div
                        key={title}
                        className="bg-white border border-[#E5E8EC] rounded-2xl p-6 shadow-sm hover-lift"
                    >

                        <div className="flex items-start justify-between mb-5">

                            <div className="w-10 h-10 rounded-xl bg-[#3654F0]/10 flex items-center justify-center">
                                <Icon size={18} className="text-[#3654F0]" />
                            </div>

                            <span className="font-['IBM_Plex_Mono',_monospace] text-2xl font-bold text-[#EDF0F4]">
                                {number}
                            </span>

                        </div>

                        <p className="text-[#10151C] text-base font-semibold">
                            {title}
                        </p>

                        <p className="text-[#8A93A2] text-sm mt-1.5 leading-relaxed">
                            {description}
                        </p>

                    </div>

                ))}

            </div>

            

        </div>
    );

};

export default HowItWorks;