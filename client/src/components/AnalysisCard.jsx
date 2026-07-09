import { TrendingUp, TrendingDown, Rocket, ShieldAlert } from "lucide-react";
import ScoreCard from "./ScoreCard";
import SWOTCard from "./SWOTCard";
import CompanyHeader from "./CompanyHeader";
import FinancialSummary from "./FinancialSummary";
import NewsCard from "./NewsCard";
import FinalVerdict from "./FinalVerdict";

const AnalysisCard = ({ analysis }) => {

    if (!analysis) return null;

    // The AI doesn't always zero out every score field the same way when
    // it had no real data to work with (e.g. investmentScore might come
    // back as a stray non-zero number while confidence correctly drops to
    // 0). Confidence === 0 is the most reliable signal we've seen for
    // "insufficient data", so we use it to keep all three score cards
    // consistent instead of trusting each field independently.
    const hasInsufficientData = analysis.confidence === 0;

    return (
        <div className="mt-10 bg-white border border-[#E5E8EC] rounded-3xl p-8 md:p-10 shadow-sm fade-in-up">

            <CompanyHeader analysis={analysis} />

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 items-stretch">

                <ScoreCard
                    title="Investment Score"
                    value={`${analysis.investmentScore}/100`}
                    color="#3654F0"
                    showBadge
                    noData={hasInsufficientData}
                />

                <ScoreCard
                    title="Risk Score"
                    value={`${analysis.riskScore}/100`}
                    color="#DB8A1B"
                    noData={hasInsufficientData}
                />

                <ScoreCard
                    title="AI Confidence"
                    value={`${analysis.confidence}/100`}
                    color="#0E9F6E"
                    tooltip="Based on the completeness and quality of available financial statements, market data, and recent news for this company."
                    noData={hasInsufficientData}
                />

            </div>

            {/* Key Financials */}
            <FinancialSummary keyFinancials={analysis.keyFinancials} />

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

            {/* Final Verdict Summary */}
            <FinalVerdict analysis={analysis} />

        </div>
    );

};

export default AnalysisCard;