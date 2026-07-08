import { CheckCircle2, XCircle } from "lucide-react";

const VerdictStamp = ({ verdict }) => {

    const isInvest = String(verdict).toUpperCase() === "INVEST";

    return (
        <div
            className={`
                inline-flex items-center gap-2
                px-5 py-2.5
                border-2 border-dashed rounded-lg
                font-['IBM_Plex_Mono',_monospace] text-sm font-semibold tracking-widest uppercase
                -rotate-2 select-none
                ${isInvest
                    ? "border-[#0E9F6E] text-[#0E9F6E] bg-[#0E9F6E]/5"
                    : "border-[#E53E3E] text-[#E53E3E] bg-[#E53E3E]/5"}
            `}
        >
            {isInvest ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {isInvest ? "Invest" : "Pass"}
        </div>
    );

};

export default VerdictStamp;