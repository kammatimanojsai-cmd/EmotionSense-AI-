type HistoryItem = {
  emotion: string;
  confidence: number;
  time: string;
};

type EmotionHistoryProps = {
  history: HistoryItem[];
};

function getEmoji(emotion: string) {
  switch (emotion.toLowerCase()) {
    case "happy":
      return "😊";
    case "sad":
      return "😢";
    case "angry":
      return "😠";
    case "fear":
      return "😨";
    case "surprise":
      return "😲";
    case "disgust":
      return "🤢";
    case "neutral":
      return "😐";
    default:
      return "🙂";
  }
}

function EmotionHistory({ history }: EmotionHistoryProps) {
  return (
    <div
      className="
        flex-1
        min-w-[370px]
        rounded-3xl
        border
        border-[#D4AF37]/40
        bg-gradient-to-br
        from-[#151515]
        via-[#1C1C1C]
        to-[#101010]
        p-7
        shadow-xl
      "
    >
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-7">
        📜 Recent Detections
      </h2>

      {history.length === 0 ? (
        <div className="py-12 text-center text-gray-400">
          No detections yet.
        </div>
      ) : (
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {history.map((item, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-[#D4AF37]/20
                bg-[#202020]
                p-4
                transition-all
                duration-300
                hover:border-[#D4AF37]
                hover:bg-[#262626]
                hover:shadow-[0_0_18px_rgba(212,175,55,0.2)]
              "
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15 text-3xl border border-[#D4AF37]/40">
                  {getEmoji(item.emotion)}
                </div>

                <div>
                  <p className="text-lg font-semibold text-white capitalize">
                    {item.emotion}
                  </p>

                  <p className="text-sm text-gray-400">
                    {item.time}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-[#D4AF37]">
                  {item.confidence.toFixed(1)}%
                </p>

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Confidence
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmotionHistory;