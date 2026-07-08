const ScoreCard = ({ title, value, color = "#3654F0" }) => {

    // Detect "78/100" style values and render a circular gauge.
    // Falls back to a plain badge for any other value shape.
    const match = String(value).match(/(\d+)\s*\/\s*(\d+)/);
    const hasScore = Boolean(match);
    const score = hasScore ? parseInt(match[1], 10) : null;
    const max = hasScore ? parseInt(match[2], 10) : 100;
    const pct = hasScore ? Math.min(100, (score / max) * 100) : 0;

    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    return (
        <div className="bg-white border border-[#E5E8EC] rounded-2xl p-6 flex items-center gap-5 shadow-sm">

            {hasScore ? (

                <svg width="96" height="96" viewBox="0 0 96 96" className="shrink-0 -rotate-90">
                    <circle cx="48" cy="48" r={radius} fill="none" stroke="#EDF0F4" strokeWidth="8" />
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: "stroke-dashoffset 0.8s ease" }}
                    />
                    <text
                        x="48"
                        y="48"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform="rotate(90 48 48)"
                        className="font-['IBM_Plex_Mono',_monospace] text-lg font-semibold"
                        fill="#10151C"
                    >
                        {score}
                    </text>
                </svg>

            ) : (

                <div
                    className="w-24 h-24 shrink-0 rounded-full flex items-center justify-center bg-[#F6F7F9] font-['IBM_Plex_Mono',_monospace] text-base font-semibold"
                    style={{ color }}
                >
                    {value}
                </div>

            )}

            <div>
                <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold">
                    {title}
                </p>
                {hasScore && (
                    <p className="text-[#10151C] text-sm mt-1">
                        out of {max}
                    </p>
                )}
            </div>

        </div>
    );

};

export default ScoreCard;