import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 text-center">
            <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10 flex flex-col items-center">
                
                {/* 404 Heading with Red Theme */}
                <h1 className="text-6xl sm:text-8xl font-black text-red-700 tracking-wider mb-2">
                    404
                </h1>
                
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    পেজটি পাওয়া যায়নি!
                </h2>
                
                <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
                    দুঃখিত, আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল রয়েছে।
                </p>

                {/* Back to Home Button */}
                <Link 
                    href="/" 
                    className="btn bg-red-700 hover:bg-red-800 text-white w-full rounded-xl font-medium shadow-md transition-all duration-300"
                >
                    হোম পেজে ফিরে যান
                </Link>

            </div>
        </div>
    );
};

export default NotFound;