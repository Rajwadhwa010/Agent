import { Search, Star, Clock, Settings } from "lucide-react";

const navItems = [
    { label: "Research", icon: Search, active: true },
    { label: "Watchlist", icon: Star, soon: true },
    { label: "History", icon: Clock, soon: true },
    { label: "Settings", icon: Settings, soon: true },
];

const Sidebar = () => {

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

                {navItems.map(({ label, icon: Icon, active, soon }) => (

                    <div
                        key={label}
                        className={`
                            flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium
                            ${active
                                ? "bg-[#3654F0]/10 text-[#3654F0]"
                                : "text-[#8A93A2] cursor-not-allowed"}
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

                ))}

            </nav>

        </aside>
    );

};

export default Sidebar;