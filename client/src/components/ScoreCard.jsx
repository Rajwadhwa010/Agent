const getScoreBadge = (score) => {
    if (score >= 80) return { label: "Strong Buy", color: "#0E9F6E" };
    if (score >= 60) return { label: "Buy", color: "#3654F0" };
    if (score >= 40) return { label: "Hold", color: "#DB8A1B" };
    return { label: "Pass", color: "#E53E3E" };
};

const ScoreCard = ({ title, value, color = "#3654F0", showBadge = false }) => {

    const match = String(value).match(/(\d+)\s*\/\s*(\d+)/);
    const hasScore = Boolean(match);
    const score = hasScore ? parseInt(match[1], 10) : null;
    const max = hasScore ? parseInt(match[2], 10) : 100;

    const isEmpty = hasScore && score === 0;
    const pct = hasScore ? Math.min(100, (score / max) * 100) : 0;

    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    const badge = hasScore && showBadge && !isEmpty ? getScoreBadge(score) : null;

    return (
        <div
            className="bg-white border border-[#E5E8EC] rounded-2xl p-6 flex items-center gap-6 shadow-sm h-full"
            style={{ borderTop: `3px solid ${isEmpty ? "#D0D5DD" : color}` }}
        >

            {hasScore ? (

                <svg width="104" height="104" viewBox="0 0 104 104" className="shrink-0 -rotate-90">
                    <circle
                        cx="52" cy="52" r={radius} fill="none"
                        stroke="#EDF0F4"
                        strokeWidth="9"
                        strokeDasharray={isEmpty ? "4 6" : undefined}
                    />
                    {!isEmpty && (
                        <circle
                            cx="52" cy="52" r={radius} fill="none"
                            stroke={color} strokeWidth="9" strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: "stroke-dashoffset 0.8s ease" }}
                        />
                    )}
                    <text
                        x="52" y="52" textAnchor="middle" dominantBaseline="central"
                        transform="rotate(90 52 52)"
                        className="font-['IBM_Plex_Mono',_monospace] text-2xl font-bold"
                        fill={isEmpty ? "#8A93A2" : "#10151C"}
                    >
                        {isEmpty ? "—" : score}
                    </text>
                </svg>

            ) : (

                <div
                    className="w-[104px] h-[104px] shrink-0 rounded-full flex items-center justify-center bg-[#F6F7F9] font-['IBM_Plex_Mono',_monospace] text-lg font-semibold"
                    style={{ color }}
                >
                    {value}
                </div>

            )}

            <div>
                <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold leading-tight">
                    {title}
                </p>

                {isEmpty ? (
                    <p className="text-[#8A93A2] text-sm mt-2">No data available</p>
                ) : hasScore ? (
                    <p className="text-[#8A93A2] text-sm mt-1">out of {max}</p>
                ) : null}

                {badge && (
                    <span
                        className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: badge.color, backgroundColor: `${badge.color}14` }}
                    >
                        {badge.label}
                    </span>
                )}
            </div>

        </div>
    );

};

export default ScoreCard;