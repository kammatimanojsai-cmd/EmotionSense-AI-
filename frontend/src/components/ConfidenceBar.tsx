type ConfidenceBarProps = {
  confidence: number;
};

function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[#D4AF37] font-semibold tracking-wide">
          Confidence
        </span>

        <span className="text-white font-bold text-lg">
          {confidence.toFixed(1)}%
        </span>
      </div>

      <div className="relative w-full h-4 rounded-full bg-[#2A2A2A] overflow-hidden border border-[#3A3A3A]">
        <div
          className="
            h-full
            rounded-full
            transition-all
            duration-700
            ease-out
            bg-gradient-to-r
            from-[#8C6A00]
            via-[#D4AF37]
            to-[#FFD700]
            shadow-[0_0_15px_rgba(212,175,55,0.6)]
          "
          style={{ width: `${confidence}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export default ConfidenceBar;