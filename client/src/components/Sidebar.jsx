import { useState } from "react";
import { Search, Star, Clock, Settings, TrendingUp, User } from "lucide-react";

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
        <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-[#E5E8EC] h-screen sticky top-0 overflow-y-auto px-5 py-8">

            <div className="flex items-center gap-2.5 px-2 mb-10">

                <div className="w-8 h-8 rounded-lg bg-[#3654F0] flex items-center justify-center shrink-0">
                    <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
                </div>

                <span className="font-['Newsreader',_serif] text-base font-semibold text-[#10151C] leading-tight">
                    AI Investment<br />Research
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

            <div className="mt-auto pt-4 border-t border-[#E5E8EC] flex items-center gap-3 px-3">

                <div className="w-9 h-9 rounded-full bg-[#3654F0]/10 flex items-center justify-center shrink-0">
                    <User size={16} className="text-[#3654F0]" />
                </div>

                <div className="min-w-0">
                    <p className="text-[#10151C] text-sm font-semibold truncate">
                        Guest
                    </p>
                    <p className="text-[#8A93A2] text-xs truncate">
                        Not signed in
                    </p>
                </div>

            </div>

        </aside>
    );

};

export default Sidebar;