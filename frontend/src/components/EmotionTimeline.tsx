type HistoryItem = {
  emotion: string;
  confidence: number;
  time: string;
};

type EmotionTimelineProps = {
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

function EmotionTimeline({ history }: EmotionTimelineProps) {
  const ordered = [...history].reverse();

  return (
    <div
      className="
        w-full
        max-w-6xl
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
        hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
      "
    >
      <h2 className="text-3xl font-bold text-[#D4AF37] mb-8">
        🕒 Emotion Timeline
      </h2>

      {ordered.length === 0 ? (
        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#202020] p-10 text-center">
          <p className="text-gray-400 text-lg">
            No timeline available yet.
          </p>
        </div>
      ) : (
        <div className="relative">

          {/* Vertical Timeline Line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-[#D4AF37]/40"></div>

          <div className="space-y-6">
            {ordered.map((item, index) => (
              <div
                key={index}
                className="
                  relative
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-[#D4AF37]/20
                  bg-[#202020]
                  p-5
                  pl-16
                  transition-all
                  duration-300
                  hover:border-[#D4AF37]
                  hover:bg-[#252525]
                  hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]
                "
              >
                {/* Timeline Node */}
                <div className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#111111]">
                  <div className="h-3 w-3 rounded-full bg-[#D4AF37]"></div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {getEmoji(item.emotion)}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white capitalize">
                      {item.emotion}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {item.time}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#D4AF37]">
                    {item.confidence.toFixed(1)}%
                  </p>

                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Confidence
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}

export default EmotionTimeline;