import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type HistoryItem = {
  emotion: string;
  confidence: number;
  time: string;
};

type EmotionBarChartProps = {
  history: HistoryItem[];
};

function EmotionBarChart({ history }: EmotionBarChartProps) {
  const counts: Record<string, number> = {};

  history.forEach((item) => {
    counts[item.emotion] = (counts[item.emotion] || 0) + 1;
  });

  const data = Object.entries(counts).map(([emotion, count]) => ({
    emotion:
      emotion.charAt(0).toUpperCase() +
      emotion.slice(1),
    count,
  }));

  return (
    <div
      className="
        w-full
        max-w-6xl
        h-[430px]
        rounded-3xl
        border
        border-[#D4AF37]/40
        bg-gradient-to-br
        from-[#151515]
        via-[#1C1C1C]
        to-[#101010]
        p-7
        shadow-xl
        transition-all
        duration-300
        hover:border-[#D4AF37]
        hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
      "
    >
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">
        📈 Emotion Frequency
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid
            stroke="#333333"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="emotion"
            stroke="#E5E5E5"
            tick={{ fill: "#FFFFFF", fontSize: 13 }}
          />

          <YAxis
            stroke="#E5E5E5"
            tick={{ fill: "#FFFFFF", fontSize: 13 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #D4AF37",
              borderRadius: "12px",
              color: "#FFFFFF",
            }}
          />

          <Bar
            dataKey="count"
            fill="#D4AF37"
            radius={[12, 12, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmotionBarChart;