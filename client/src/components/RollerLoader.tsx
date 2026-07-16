import React from "react";

const RollerLoader: React.FC = () => {
  return (
    // Full- screen centered container
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
      <div className="flex flex-col items-center gap-6">
        {/* spining ring - pure css animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#f1f1f1] rouneded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-[#d87d4a] rounded-full animate-spin" />
        </div>
        <p className="text-black/50 text-sm font-medium tracking-[2px] uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default RollerLoader;
