import { Newspaper, ExternalLink } from "lucide-react";

const formatDate = (unixSeconds) => {
    if (!unixSeconds) return "";
    const date = new Date(unixSeconds * 1000);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};

const NewsCard = ({ news = [] }) => {

    if (!news || news.length === 0) return null;

    return (
        <div className="mt-10">

            <div className="flex items-center gap-2 mb-6">
                <Newspaper size={18} className="text-[#3654F0]" />
                <h3 className="font-['Newsreader',_serif] text-2xl font-semibold text-[#10151C]">
                    Recent News
                </h3>
            </div>

            <div className="space-y-3">

                {news.map((item, index) => (

                    <a
                        key={item.id || index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            block
                            bg-white
                            border
                            border-[#E5E8EC]
                            rounded-2xl
                            p-5
                            shadow-sm
                            hover:border-[#3654F0]/40
                            transition
                        "
                    >

                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <p className="text-[#10151C] font-medium leading-6 group-hover:text-[#3654F0] transition">
                                    {item.headline}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs font-['IBM_Plex_Mono',_monospace] uppercase tracking-wider text-[#8A93A2]">
                                        {item.source}
                                    </span>
                                    <span className="text-[#E5E8EC]">•</span>
                                    <span className="text-xs text-[#8A93A2]">
                                        {formatDate(item.datetime)}
                                    </span>
                                </div>
                            </div>

                            <ExternalLink
                                size={16}
                                className="text-[#8A93A2] group-hover:text-[#3654F0] transition shrink-0 mt-1"
                            />

                        </div>

                    </a>

                ))}

            </div>

        </div>
    );

};

export default NewsCard;