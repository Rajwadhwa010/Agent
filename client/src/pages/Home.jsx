import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#FAFBFC] flex">

            <Sidebar />

            <main className="flex-1 relative overflow-hidden">

                {/* Subtle gradient glow behind the hero title */}
                <div
                    className="absolute top-0 left-0 right-0 h-[420px] pointer-events-none"
                    style={{
                        background: "radial-gradient(60% 100% at 20% 0%, rgba(54,84,240,0.08) 0%, rgba(54,84,240,0) 70%)",
                    }}
                />

                <div className="relative px-6 md:px-12 py-12">

                    <div className="max-w-5xl mx-auto">

                        <div className="max-w-2xl">

                            <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-3">
                                Company Research
                            </p>

                            <h1 className="font-['Newsreader',_serif] text-5xl md:text-6xl font-semibold text-[#10151C] leading-[1.1]">
                                AI Investment Research
                            </h1>

                            <p className="text-[#4B5563] mt-5 text-lg leading-relaxed">
                                Analyze any public company with AI-powered financial insights,
                                valuation metrics, risks, and investment recommendations.
                            </p>

                        </div>

                        <div className="mt-10">
                            <SearchBar />
                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Home;