const Loading = () => {

    return (
        <div className="mt-10 bg-white border border-[#E5E8EC] rounded-3xl p-8 md:p-10 shadow-sm animate-pulse">

            <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                    <div className="h-8 w-64 bg-[#EDF0F4] rounded-lg" />
                    <div className="h-4 w-40 bg-[#EDF0F4] rounded-md" />
                </div>
                <div className="h-10 w-28 bg-[#EDF0F4] rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-[#EDF0F4] rounded-2xl" />
                ))}
            </div>

            <div className="h-20 bg-[#EDF0F4] rounded-xl mt-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-[#EDF0F4] rounded-2xl" />
                ))}
            </div>

        </div>
    );

};

export default Loading;