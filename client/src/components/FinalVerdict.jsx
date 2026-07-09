import { CheckCircle2, XCircle } from "lucide-react";

const getRiskLabel = (riskScore) => {
    if (riskScore >= 70) return "High";
    if (riskScore >= 40) return "Medium";
    return "Low";
};

const FinalVerdict = ({ analysis }) => {

    if (!analysis) return null;

    const isInvest = String(analysis.recommendation).toUpperCase() === "INVEST";
    const riskLabel = getRiskLabel(analysis.riskScore);

    return (
        <div className="mt-12 pt-10 border-t border-[#E5E8EC]">

            <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-6 text-center">
                Final AI Verdict
            </p>

            <div className="flex flex-col items-center text-center">

                <div
                    className={`
                        inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                        font-['IBM_Plex_Mono',_monospace] text-lg font-bold tracking-wide uppercase
                        ${isInvest
                            ? "bg-[#0E9F6E]/10 text-[#0E9F6E]"
                            : "bg-[#E53E3E]/10 text-[#E53E3E]"}
                    `}
                >
                    {isInvest ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                    {isInvest ? "Invest" : "Pass"}
                </div>

                <div className="flex flex-wrap justify-center gap-8 mt-8">

                    <div>
                        <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold">
                            Confidence
                        </p>
                        <p className="font-['IBM_Plex_Mono',_monospace] text-2xl font-bold text-[#10151C] mt-1">
                            {analysis.confidence}%
                        </p>
                    </div>

                    <div>
                        <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold">
                            Risk Level
                        </p>
                        <p className="font-['IBM_Plex_Mono',_monospace] text-2xl font-bold text-[#10151C] mt-1">
                            {riskLabel}
                        </p>
                    </div>

                    <div>
                        <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold">
                            Investment Score
                        </p>
                        <p className="font-['IBM_Plex_Mono',_monospace] text-2xl font-bold text-[#10151C] mt-1">
                            {analysis.investmentScore}/100
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );

};

export default FinalVerdict;