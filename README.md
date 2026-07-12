# AI Investment Research

An AI agent that takes a company name, researches it using real financial data and news,
and returns a clear **INVEST / PASS** verdict with full reasoning, a SWOT breakdown, and
supporting evidence.

---

## Overview

Search for any public company by name or ticker. The agent:

1. Looks up the company and resolves it to a stock symbol
2. Pulls real financial data — company profile, live quote, financial metrics, and recent
   news — from Finnhub
3. Passes that research to Gemini (via a LangGraph pipeline) to analyze the company like a
   professional investment analyst
4. Returns a structured verdict: recommendation (INVEST/PASS), investment score, risk score,
   AI confidence, a written analyst note, a SWOT analysis, key financial ratios, and the
   news that informed the call

The UI is designed to look and feel like an equity research report rather than a generic
AI chat dashboard.

---

## How to Run It

### Prerequisites
- Node.js 18+
- A Finnhub API key (free tier) — https://finnhub.io
- A Google Gemini API key (free tier) — https://aistudio.google.com

### Backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```
FINNHUB_API_KEY=your_finnhub_key_here
GEMINI_API_KEY=your_gemini_key_here
PORT=5000
```

Start the server:
```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
```

Start the dev server:
```bash
npm run dev
```

Open the URL Vite prints (typically http://localhost:5173).

---

## How It Works

### Architecture

```
React (Vite) frontend
        |
        |  POST /api/search   { company }
        |  POST /api/analyze  { company, symbol }
        v
Express backend
        |
        v
LangGraph state graph (investmentGraph.js)
        |
        +-- Node: gatherResearch
        |     -> Finnhub: company profile, quote, financials, news
        |
        +-- Node: analyzeCompany
              -> Builds a structured prompt with the real research data
              -> Calls Gemini (via @langchain/google-genai) for analysis
              -> Parses the JSON verdict
        |
        v
Structured result (verdict, scores, SWOT, key financials, news, logo, market cap)
        |
        v
React UI renders the research report
```

**Backend stack:** Node.js, Express, LangChain.js (ChatGoogleGenerativeAI), LangGraph.js
(StateGraph), Finnhub REST API, Google Gemini (gemini-2.5-flash).

**Frontend stack:** React (Vite), Tailwind CSS, lucide-react icons, Axios.

### The LangGraph pipeline

`investmentGraph.js` defines a two-node graph:

- **gatherResearch** - calls Finnhub in parallel (Promise.allSettled, not Promise.all, so
  one failed call doesn't kill the whole request) for company profile, live quote, basic
  financials, and recent news.
- **analyzeCompany** - builds the analyst prompt from that research and invokes Gemini,
  parsing its JSON response into the final verdict, including an AI-normalized
  keyFinancials object (Revenue/Share, P/E, ROE, Debt/Equity).

State flows through the graph as a shared object ({ company, symbol, research, analysis }),
with each node reading what it needs and writing its own output back into that state.

### Why LangGraph instead of a single function call

The pipeline could technically be one sequential function (and started that way during
development). Structuring it as a graph makes the pipeline explicit and easy to extend -
adding a new analysis stage (e.g. a separate risk-review node, or a bull/bear debate step)
is a matter of adding one node and an edge, not restructuring a large function. The landing
page's "Search -> Research -> Analyze -> Verdict" footer signature directly mirrors this
real node flow.

### UI structure

- **Landing page**: hero headline, search bar (with debounce, Enter-to-search, and example
  company chips), a "How It Works" 3-step explainer, and a static "Sample AI Report" preview
  card (clearly labeled as an example, not live data) - all shown only before a real search.
- **Report view (same page)**: once a company is analyzed, the landing content is replaced
  by the full-width research report - company header, three score gauges, key financials,
  analyst note, SWOT grid, recent news, and a closing verdict summary.
- A live "agent pipeline" tracker (AgentSteps) shows the research stages progressing while
  the request is in flight.

---

## Key Decisions & Trade-offs

- **Two APIs, deliberately.** Finnhub (research data) + Gemini (reasoning) is a minimal but
  complete stack for this assignment's scope. I considered a second financial data provider
  (e.g. Financial Modeling Prep) to cover non-US exchanges, but decided against it to avoid
  extra integration risk this close to the deadline - noted under "What I'd improve" instead.

- **No authentication, no separate branding.** The brief doesn't require either. The app is
  simply called "AI Investment Research" throughout (no invented product name), and the
  sidebar has disabled "Watchlist"/"History" items with a tooltip explaining they need user
  accounts I chose not to build. A quiet "Guest / Not signed in" row anchors the sidebar
  without implying a real account system exists.

- **Single-page app, no client-side routing.** react-router-dom is installed but unused.
  Rather than add a /report/:symbol route this late (real work: direct-navigation
  re-fetching, new loading states, more surface area for bugs), the report renders in place
  on the same page, expanding to full width once a result loads. Noted as a future
  improvement for shareable report URLs.

- **Finnhub's free tier only reliably covers US-listed equities.** Companies listed on other
  exchanges (e.g. Tata Consultancy Services on NSE, Royal Bank of Canada on TSX) often
  return incomplete or empty profile/financials/news data. The UI surfaces this honestly -
  score cards show a clearly marked "No data available" state (dashed gauge, greyed text)
  instead of a misleading "0".

- **The AI doesn't always zero out every score field consistently** when it has
  insufficient data - e.g., testing Royal Bank of Canada showed it return a non-zero
  investmentScore while confidence correctly dropped to 0, producing inconsistent-looking
  score cards. Fixed by deriving a single "insufficient data" signal from confidence === 0
  and applying it uniformly across all three score cards, rather than trusting each field
  independently. This was found through manual testing, not assumed in advance.

- **Promise.allSettled over Promise.all** in the research step, so a single failed Finnhub
  call (e.g. no news for a small-cap symbol) doesn't fail the entire analysis - the AI just
  works with whatever research data actually came back.

- **Debounced search (400ms) with Enter-to-analyze.** The original implementation fired a
  search request on every keystroke, risking Finnhub's rate limit. Debouncing, plus letting
  Enter/an Analyze button act on the top match, improved both reliability and UX.

- **keyFinancials are extracted by the AI, not parsed by hand** from Finnhub's raw field
  names (e.g. peBasicExclExtraTTM, roeTTM). Since Gemini already receives the full financials
  JSON as context, it normalizes these into a clean object rather than risking a brittle
  manual mapping. It's explicitly instructed to return "N/A" rather than estimate any value
  it wasn't given.

- **Simulated (not streamed) "agent pipeline" loading UI.** The loading state shows the real
  pipeline stages (search -> gather data -> AI analysis -> finalize) as a timed sequence
  rather than reading live backend events, since true real-time streaming would require
  restructuring the backend to use LangGraph's .stream() with server-sent events. Noted as a
  future improvement.

- **Iterated toward simplicity on the landing page's secondary content.** I tried several
  ideas for the space beside the hero search (a market-news feed, a score-band legend, a
  recent-searches panel, a feature checklist, an FAQ) and ultimately removed all of them in
  favor of just a single "Sample AI Report" preview card. Less, well-designed content read
  better than more content competing for attention - a real design call, not an oversight.

- **No fake monetization UI.** An early draft included a decorative "Upgrade to Enterprise"
  sidebar card with no real feature behind it; I removed it, since a non-functional CTA in a
  graded submission is more likely to raise questions than add polish.

---

## Example Runs

### Apple Inc (AAPL) - full data available
- **Verdict:** INVEST - Investment Score 90/100 (Strong Buy), Risk Score 50/100, AI
  Confidence 90/100
- **Key Financials:** Revenue/Share 30.66, P/E 37.67, ROE 146.7%, Debt/Equity 0.80
- **Analyst Note:** cites Apple's brand strength, ecosystem, profitability margins, and
  recent news (the Broadcom chip deal, India import duty changes) as supporting factors
- **News:** real, recent headlines pulled from Finnhub, each linked to source

### Tata Consultancy Services (NSE-listed) - known data limitation
- **Verdict:** PASS - all three scores show "No data available" (dashed gauges), Confidence 0%
- **Analyst Note:** the AI correctly states no financial data was available and declines to
  fabricate an analysis, rather than guessing
- Demonstrates the Finnhub free-tier / non-US-exchange limitation, handled gracefully rather
  than silently breaking

### Royal Bank of Canada (TSX-listed) - inconsistent AI output, caught and fixed
- Initial test showed a data inconsistency: confidence: 0 (correctly flagged as no data)
  alongside a non-zero investmentScore: 10 and riskScore: 90 - two score cards displayed as
  if they had real values while the analyst note said otherwise.
- Fixed by deriving a single insufficient-data flag from confidence === 0 and applying it
  across all three score cards uniformly (see Key Decisions above).

---

## What I'd Improve With More Time

- **A secondary financial data source** for non-US exchanges, so companies like TCS and RBC
  return real data instead of "no data available"
- **A dedicated /report/:symbol route** using the already-installed react-router-dom, for
  shareable/bookmarkable report URLs
- **True real-time pipeline streaming** using LangGraph's .stream() over server-sent events,
  so the loading UI reflects actual backend progress instead of a timed simulation
- **User accounts**, to support the Watchlist and History features already scaffolded (but
  disabled) in the sidebar
- **Star-rated analysis categories** (Business Quality, Growth Potential, Financial Health,
  etc.) as a structured breakdown, rather than one analyst-note paragraph
- **A client-side relevance filter** on search results to reduce occasional loosely-related
  matches from Finnhub's search endpoint
- **A live market-data widget** on the landing page (real quotes, not just a static sample
  report) - considered during development but deferred to keep scope tight
- **A friendlier UI message for Gemini quota/rate-limit errors** (currently surfaces as a
  generic failure) during heavy testing

---

## AI Usage Note

This project was built with heavy, continuous AI assistance (Claude) for both the frontend
design/iteration and backend architecture/debugging (including the move to LangGraph and the
score-consistency fix described above). The full chat transcript is included per the
assignment's bonus criteria and reflects the actual iterative process - including real
mistakes made and caught along the way (files pasted into the wrong location causing syntax
errors, a duplicate-React version conflict from installing lucide-react, Gemini quota errors
during heavy testing, and multiple rounds of UI experimentation that were ultimately
reverted in favor of simpler designs). I can walk through and explain every part of this
codebase - the LangGraph graph structure, the Finnhub/Gemini integration, and each frontend
component - in an interview setting.