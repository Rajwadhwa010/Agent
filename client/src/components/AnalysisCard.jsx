import { TrendingUp, TrendingDown, Rocket, ShieldAlert } from "lucide-react";
import ScoreCard from "./ScoreCard";
import SWOTCard from "./SWOTCard";
import VerdictStamp from "./VerdictStamp";
import NewsCard from "./NewsCard";

const AnalysisCard = ({ analysis }) => {

    if (!analysis) return null;

    return (
        <div className="mt-10 bg-white border border-[#E5E8EC] rounded-3xl p-8 md:p-10 shadow-sm fade-in-up">

            {/* Company Information + Verdict */}
            <div className="flex flex-wrap items-start justify-between gap-4">

                <div>
                    <h2 className="font-['Newsreader',_serif] text-4xl font-semibold text-[#10151C]">
                        {analysis.company}
                    </h2>

                    <p className="text-[#8A93A2] mt-2 text-sm uppercase tracking-wider font-semibold">
                        {analysis.industry}
                    </p>
                </div>

                <VerdictStamp verdict={analysis.recommendation} />

            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

                <ScoreCard
                    title="Investment Score"
                    value={`${analysis.investmentScore}/100`}
                    color="#3654F0"
                />

                <ScoreCard
                    title="Risk Score"
                    value={`${analysis.riskScore}/100`}
                    color="#DB8A1B"
                />

                <ScoreCard
                    title="AI Confidence"
                    value={`${analysis.confidence}/100`}
                    color="#0E9F6E"
                />

            </div>

            {/* Recommendation Reason */}
            <div className="mt-10 pl-6 border-l-4 border-[#3654F0]">

                <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-2">
                    Analyst Note
                </p>

                <p className="font-['Newsreader',_serif] italic text-[#10151C] text-lg leading-8">
                    {analysis.recommendationReason}
                </p>

            </div>

            {/* SWOT Heading */}
            <h3 className="font-['Newsreader',_serif] text-2xl font-semibold text-[#10151C] mt-12 mb-6">
                SWOT Analysis
            </h3>

            {/* SWOT Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <SWOTCard
                    title="Strengths"
                    items={analysis.strengths}
                    icon={TrendingUp}
                    accent="#0E9F6E"
                />

                <SWOTCard
                    title="Weaknesses"
                    items={analysis.weaknesses}
                    icon={TrendingDown}
                    accent="#E53E3E"
                />

                <SWOTCard
                    title="Opportunities"
                    items={analysis.opportunities}
                    icon={Rocket}
                    accent="#3654F0"
                />

                <SWOTCard
                    title="Threats"
                    items={analysis.threats}
                    icon={ShieldAlert}
                    accent="#DB8A1B"
                />

            </div>

            {/* News */}
            <NewsCard news={analysis.news} />

        </div>
    );

};

export default AnalysisCard;