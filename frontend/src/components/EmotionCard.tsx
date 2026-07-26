import ConfidenceBar from "./ConfidenceBar";

type EmotionCardProps = {
  emotion: string;
  confidence: number;
  status: string;
  loading: boolean;
  lastUpdated: string;
};

function EmotionCard({
  emotion,
  confidence,
  status,
  loading,
  lastUpdated,
}: EmotionCardProps) {
  const emotionEmoji: Record<string, string> = {
    happy: "😄",
    sad: "😢",
    angry: "😠",
    fear: "😨",
    surprise: "😲",
    disgust: "🤢",
    neutral: "😐",
    Waiting: "😊",
    Error: "❌",
  };

  return (
    <div
      className="
        relative
        w-[430px]
        rounded-3xl
        border
        border-[#D4AF37]/40
        bg-gradient-to-br
        from-[#151515]
        via-[#1C1C1C]
        to-[#101010]
        p-8
        shadow-xl
        transition-all
        duration-300
        hover:border-[#D4AF37]
        hover:shadow-[0_0_35px_rgba(212,175,55,0.35)]
      "
    >
      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />

      <p className="text-center text-sm tracking-[4px] uppercase text-[#D4AF37] font-semibold">
        Live Emotion Detection
      </p>

      <div className="mt-6 text-center">
        <div className="text-7xl">
          {emotionEmoji[emotion] || "😊"}
        </div>

        <h2 className="mt-4 text-4xl font-bold text-white capitalize">
          {emotion}
        </h2>
      </div>

      <div className="mt-8">
        <ConfidenceBar confidence={confidence} />
      </div>

      <div className="mt-8 flex justify-between text-gray-400 text-sm">
        <span>Last Updated</span>
        <span className="text-white">{lastUpdated}</span>
      </div>

      <div className="mt-6 flex justify-center">
        <span
          className={`px-5 py-2 rounded-full font-semibold ${
            loading
              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
              : "bg-[#D4AF37]/20 text-[#F5D76E] border border-[#D4AF37]"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default EmotionCard;