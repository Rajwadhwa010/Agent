import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#F6F7F9] flex">

            <Sidebar />

            <main className="flex-1 px-6 md:px-12 py-12">

                <div className="max-w-3xl mx-auto">

                    <p className="text-[#8A93A2] text-xs uppercase tracking-wider font-semibold mb-2">
                        Company Research
                    </p>

                    <h1 className="font-['Newsreader',_serif] text-4xl md:text-5xl font-semibold text-[#10151C]">
                        AI Investment Research Agent
                    </h1>

                    <p className="text-[#4B5563] mt-4 text-lg">
                        Analyze any public company using AI-powered investment research.
                    </p>

                    <div className="mt-10">
                        <SearchBar />
                    </div>

                </div>

            </main>

        </div>
    );
};

export default Home;