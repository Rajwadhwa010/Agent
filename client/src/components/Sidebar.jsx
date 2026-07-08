import { useState } from "react";
import { Search, Star, Clock, Settings } from "lucide-react";

const navItems = [
    { label: "Research", icon: Search, active: true },
    {
        label: "Watchlist",
        icon: Star,
        soon: true,
        tooltip: "Coming soon — requires user accounts",
    },
    {
        label: "History",
        icon: Clock,
        soon: true,
        tooltip: "Coming soon — requires user accounts",
    },
    {
        label: "Settings",
        icon: Settings,
        soon: true,
        tooltip: "Coming soon",
    },
];

const Sidebar = () => {

    const [hovered, setHovered] = useState(null);

    return (
        <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-[#E5E8EC] min-h-screen px-5 py-8">

            <div className="flex items-center gap-2 px-2 mb-10">

                <div className="w-8 h-8 rounded-lg bg-[#3654F0] flex items-center justify-center">
                    <span className="text-white font-['IBM_Plex_Mono',_monospace] text-sm font-bold">
                        A
                    </span>
                </div>

                <span className="font-['Newsreader',_serif] text-lg font-semibold text-[#10151C]">
                    Alpha Research
                </span>

            </div>

            <nav className="flex flex-col gap-1">

                {navItems.map(({ label, icon: Icon, active, soon, tooltip }) => (

                    <div
                        key={label}
                        className="relative"
                        onMouseEnter={() => soon && setHovered(label)}
                        onMouseLeave={() => setHovered(null)}
                    >

                        <div
                            className={`
                                flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition
                                ${active
                                    ? "bg-[#3654F0]/10 text-[#3654F0]"
                                    : "text-[#C5CAD3] cursor-not-allowed"}
                            `}
                        >

                            <span className="flex items-center gap-3">
                                <Icon size={18} />
                                {label}
                            </span>

                            {soon && (
                                <span className="text-[10px] uppercase tracking-wider bg-[#F6F7F9] text-[#8A93A2] px-2 py-0.5 rounded-full">
                                    Soon
                                </span>
                            )}

                        </div>

                        {hovered === label && (
                            <div
                                className="
                                    absolute left-full ml-2 top-1/2 -translate-y-1/2
                                    bg-[#10151C] text-white text-xs rounded-lg
                                    px-3 py-2 whitespace-nowrap
                                    shadow-lg z-10
                                    fade-in-up
                                "
                            >
                                {tooltip}
                            </div>
                        )}

                    </div>

                ))}

            </nav>

        </aside>
    );

};

export default Sidebar;