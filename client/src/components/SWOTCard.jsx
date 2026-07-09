const SWOTCard = ({ title, items = [], icon: Icon, accent = "#3654F0" }) => {

    return (
        <div
            className="bg-white border border-[#E5E8EC] rounded-2xl p-6 shadow-sm hover-lift"
            style={{ borderTop: `3px solid ${accent}` }}
        >

            <div className="flex items-center gap-2 mb-4">
                {Icon && <Icon size={18} style={{ color: accent }} />}
                <h3 className="text-base font-semibold text-[#10151C]">
                    {title}
                </h3>
            </div>

            {items.length > 0 ? (
                <ul className="space-y-2.5">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="text-[#4B5563] text-sm leading-6 pl-3 border-l-2 border-[#E5E8EC]"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-[#8A93A2] text-sm">
                    No data available.
                </p>
            )}

        </div>
    );

};

export default SWOTCard;