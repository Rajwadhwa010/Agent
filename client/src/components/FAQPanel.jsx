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

    return (
        <div className="bg-white border border-[#E5E8EC] rounded-2xl p-5 shadow-sm">

            <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-4">
                FAQ
            </p>

            <div className="space-y-4">
                {FAQS.map(({ q, a }) => (
                    <div key={q}>
                        <p className="text-[#10151C] text-sm font-semibold">
                            {q}
                        </p>
                        <p className="text-[#8A93A2] text-xs mt-1 leading-relaxed">
                            {a}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );

};

export default FAQPanel;