import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import HeroPreview from "../components/HeroPreview";
import FAQPanel from "../components/FAQPanel";
import AgentSteps from "../components/AgentSteps";
import AnalysisCard from "../components/AnalysisCard";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const RECENT_KEY = "ai_investment_research_recent_searches";
const MAX_RECENT = 5;

const getRecentSearches = () => {
    try {
        const raw = localStorage.getItem(RECENT_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveRecentSearch = (item) => {
    try {
        const existing = getRecentSearches().filter((r) => r.symbol !== item.symbol);
        const updated = [item, ...existing].slice(0, MAX_RECENT);
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
        return updated;
    } catch {
        return getRecentSearches();
    }
};

const Home = () => {

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    const resultsRef = useRef(null);

    useEffect(() => {
        setRecentSearches(getRecentSearches());
    }, []);

    const scrollToResults = () => {
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    const handleAnalyzeCompany = async (selectedCompany) => {

        setLoading(true);
        setAnalysis(null);
        scrollToResults();

        try {

            const response = await api.post("/analyze", {
                company: selectedCompany.description,
                symbol: selectedCompany.symbol,
            });

            setAnalysis(response.data.data);
            setRecentSearches(saveRecentSearch(selectedCompany));

        } catch (error) {

            console.error("Analyze Error:", error);

        } finally {

            setLoading(false);

        }

    };

    const showEmptyState = !loading && !analysis;

    return (
        <div className="min-h-screen bg-[#FAFBFC] flex">

            <Sidebar />

            <main className="flex-1 relative overflow-hidden">

                <div
                    className="absolute top-0 left-0 right-0 h-[420px] pointer-events-none"
                    style={{
                        background: "radial-gradient(60% 100% at 20% 0%, rgba(54,84,240,0.08) 0%, rgba(54,84,240,0) 70%)",
                    }}
                />

                <div className="relative px-6 md:px-12 py-12">

                    <div className="max-w-6xl mx-auto">

                        <div className={`grid gap-12 items-start ${showEmptyState ? "lg:grid-cols-[1fr_320px]" : "grid-cols-1"}`}>

                            {/* Left column: everything but the side panel */}
                            <div>

                                <div className="max-w-2xl">

                                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-[#3654F0]/10 text-[#3654F0] px-3 py-1.5 rounded-full mb-5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#3654F0]" />
                                        AI-Powered Research
                                    </span>

                                    <h1 className="font-sans text-5xl md:text-6xl font-extrabold tracking-tight text-[#10151C] leading-[1.1]">
                                        AI Investment{" "}
                                        <span className="bg-gradient-to-r from-[#3654F0] to-[#7C3AED] bg-clip-text text-transparent">
                                            Research
                                        </span>
                                    </h1>

                                    <p className="text-[#4B5563] mt-5 text-lg leading-relaxed">
                                        Analyze any public company with AI-powered financial insights,
                                        valuation metrics, risks, and investment recommendations.
                                    </p>

                                </div>

                                <div className="mt-10">
                                    <SearchBar onSelectCompany={handleAnalyzeCompany} />
                                </div>

                                {showEmptyState && <HowItWorks />}

                                <div ref={resultsRef} className="scroll-mt-8">
                                    <AgentSteps active={loading} />
                                    <AnalysisCard analysis={analysis} />
                                </div>

                            </div>

                            {/* Right column: one connected panel (sample report + features)
                                fills the space next to the narrower content column */}
                            {showEmptyState && (
                                <div className="hidden lg:flex flex-col gap-6 sticky top-12">
                                    <HeroPreview />
                                    <FAQPanel />
                                </div>
                            )}

                        </div>

                        <Footer />

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Home;