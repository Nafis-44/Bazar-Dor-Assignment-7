import React from 'react';

const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
            <div className="flex flex-col items-center gap-4 bg-white border border-gray-100 shadow-lg rounded-2xl p-8 max-w-xs w-full">
                
                {/* DaisyUI Loading Spinner with Red Theme */}
                <span className="loading loading-spinner loading-lg text-red-700"></span>
                
                {/* Loading Text */}
                <h2 className="text-gray-800 font-bold text-lg tracking-wider animate-pulse">
                    লোড হচ্ছে...
                </h2>

                <p className="text-xs text-gray-500 text-center">
                    দয়া করে একটু অপেক্ষা করুন, খবর লোড হচ্ছে।
                </p>

            </div>
        </div>
    );
};

export default LoadingPage;