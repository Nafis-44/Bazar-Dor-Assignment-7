const Footer = () => {
  return (
    <footer className="w-full bg-[#F7F7F3] border-t border-gray-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:py-6 sm:text-left lg:px-8">
        
        {/* Left Text */}
        <p className="text-xs text-gray-400 sm:text-sm">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Text */}
        <p className="text-xs text-gray-400 sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>

      </div>
    </footer>
  );
};

export default Footer;