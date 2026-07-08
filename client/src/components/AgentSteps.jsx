import { useEffect, useState } from "react";
import { Search, BarChart3, Sparkles, CheckCircle2 } from "lucide-react";

// Mirrors the real LangGraph pipeline order:
// search -> gatherResearch (financials/news/quote) -> analyzeCompany (Gemini) -> done
const STEPS = [
    { label: "Searching Finnhub for company data", icon: Search, duration: 900 },
    { label: "Gathering financials, quote & news", icon: BarChart3, duration: 1600 },
    { label: "AI analyzing with Gemini", icon: Sparkles, duration: 2200 },
    { label: "Finalizing verdict", icon: CheckCircle2, duration: 800 },
];

const AgentSteps = ({ active }) => {

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {

        if (!active) {
            setCurrentStep(0);
            return;
        }

        let stepIndex = 0;
        const timers = [];

        const advance = () => {
            if (stepIndex >= STEPS.length - 1) return;
            const timer = setTimeout(() => {
                stepIndex += 1;
                setCurrentStep(stepIndex);
                advance();
            }, STEPS[stepIndex].duration);
            timers.push(timer);
        };

        advance();

        return () => timers.forEach(clearTimeout);

    }, [active]);

    if (!active) return null;

    return (
        <div className="mt-10 bg-white border border-[#E5E8EC] rounded-2xl p-6 shadow-sm fade-in-up">

            <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-5">
                Agent Pipeline
            </p>

            <div className="space-y-4">

                {STEPS.map((step, index) => {

                    const Icon = step.icon;
                    const isDone = index < currentStep;
                    const isActive = index === currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div key={step.label} className="flex items-center gap-3">

                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition
                                    ${isDone ? "bg-[#0E9F6E]/10 text-[#0E9F6E]" : ""}
                                    ${isActive ? "bg-[#3654F0]/10 text-[#3654F0]" : ""}
                                    ${isPending ? "bg-[#F6F7F9] text-[#C5CAD3]" : ""}
                                `}
                            >
                                <Icon
                                    size={16}
                                    className={isActive ? "animate-pulse" : ""}
                                />
                            </div>

                            <span
                                className={`
                                    text-sm font-medium transition
                                    ${isDone ? "text-[#8A93A2] line-through decoration-[#8A93A2]/40" : ""}
                                    ${isActive ? "text-[#10151C]" : ""}
                                    ${isPending ? "text-[#C5CAD3]" : ""}
                                `}
                            >
                                {step.label}
                            </span>

                        </div>
                    );

                })}

            </div>

        </div>
    );

};

export default AgentSteps;