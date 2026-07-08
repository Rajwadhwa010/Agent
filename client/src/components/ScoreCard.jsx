const ScoreCard = ({ title, value, color = "#3654F0" }) => {

    // Detect "78/100" style values and render a circular gauge.
    const match = String(value).match(/(\d+)\s*\/\s*(\d+)/);
    const hasScore = Boolean(match);
    const score = hasScore ? parseInt(match[1], 10) : null;
    const max = hasScore ? parseInt(match[2], 10) : 100;

    // Treat a score of exactly 0 as "no data" rather than a real zero score,
    // since our AI only returns 0 when it had nothing to analyze.
    const isEmpty = hasScore && score === 0;
    const pct = hasScore ? Math.min(100, (score / max) * 100) : 0;

    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    return (
        <div
            className="bg-white border border-[#E5E8EC] rounded-2xl p-6 flex items-center gap-5 shadow-sm h-full"
            style={{ borderTop: `3px solid ${isEmpty ? "#D0D5DD" : color}` }}
        >

            {hasScore ? (

                <svg width="88" height="88" viewBox="0 0 96 96" className="shrink-0 -rotate-90">
                    <circle
                        cx="48" cy="48" r={radius} fill="none"
                        stroke="#EDF0F4"
                        strokeWidth="8"
                        strokeDasharray={isEmpty ? "4 6" : undefined}
                    />
                    {!isEmpty && (
                        <circle
                            cx="48" cy="48" r={radius} fill="none"
                            stroke={color} strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: "stroke-dashoffset 0.8s ease" }}
                        />
                    )}
                    <text
                        x="48" y="48" textAnchor="middle" dominantBaseline="central"
                        transform="rotate(90 48 48)"
                        className="font-['IBM_Plex_Mono',_monospace] text-lg font-semibold"
                        fill={isEmpty ? "#8A93A2" : "#10151C"}
                    >
                        {isEmpty ? "—" : score}
                    </text>
                </svg>

            ) : (

                <div
                    className="w-[88px] h-[88px] shrink-0 rounded-full flex items-center justify-center bg-[#F6F7F9] font-['IBM_Plex_Mono',_monospace] text-base font-semibold"
                    style={{ color }}
                >
                    {value}
                </div>

            )}

            <div>
                <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold leading-tight">
                    {title}
                </p>
                <p className="text-[#10151C] text-sm mt-2">
                    {isEmpty ? "No data available" : hasScore ? `out of ${max}` : ""}
                </p>
            </div>

        </div>
    );

};

export default ScoreCard;