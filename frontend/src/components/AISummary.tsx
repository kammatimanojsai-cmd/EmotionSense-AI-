type HistoryItem = {
  emotion: string;
  confidence: number;
  time: string;
};

type AISummaryProps = {
  history: HistoryItem[];
};

function AISummary({ history }: AISummaryProps) {
  if (history.length === 0) {
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
        "
      >
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          🤖 AI Session Summary
        </h2>

        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#202020] p-6 text-center">
          <p className="text-lg text-gray-300">
            Start the camera to generate AI-powered insights.
          </p>
        </div>
      </div>
    );
  }

  const counts: Record<string, number> = {};

  history.forEach((item) => {
    counts[item.emotion] = (counts[item.emotion] || 0) + 1;
  });

  const dominant = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  const avg =
    history.reduce((sum, item) => sum + item.confidence, 0) /
    history.length;

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
        🤖 AI Session Summary
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="rounded-2xl bg-[#202020] border border-[#D4AF37]/20 p-6">
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Total Detections
          </p>

          <h3 className="text-4xl font-bold text-white mt-3">
            {history.length}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#202020] border border-[#D4AF37]/20 p-6">
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Dominant Emotion
          </p>

          <h3 className="text-4xl font-bold text-[#D4AF37] capitalize mt-3">
            {dominant}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#202020] border border-[#D4AF37]/20 p-6">
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Avg. Confidence
          </p>

          <h3 className="text-4xl font-bold text-white mt-3">
            {avg.toFixed(1)}%
          </h3>
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-[#202020] border border-[#D4AF37]/20 p-6">

        <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">
          📊 Emotion Breakdown
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(counts).map(([emotion, count]) => (
            <div
              key={emotion}
              className="rounded-xl bg-[#2A2A2A] p-4 text-center"
            >
              <p className="capitalize text-white font-semibold">
                {emotion}
              </p>

              <p className="text-2xl font-bold text-[#D4AF37] mt-2">
                {count}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#202020] p-6">

        <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">
          🧠 AI Insight
        </h3>

        <p className="text-gray-300 leading-8">
          During this session, the AI analysed{" "}
          <span className="text-white font-bold">
            {history.length}
          </span>{" "}
          facial expressions. The most frequently detected emotion was{" "}
          <span className="text-[#D4AF37] font-bold capitalize">
            {dominant}
          </span>{" "}
          with an average recognition confidence of{" "}
          <span className="text-white font-bold">
            {avg.toFixed(1)}%
          </span>
          . This summary reflects the overall emotional trend observed throughout the session and can help identify consistent emotional patterns over time.
        </p>

      </div>

    </div>
  );
}

export default AISummary;   