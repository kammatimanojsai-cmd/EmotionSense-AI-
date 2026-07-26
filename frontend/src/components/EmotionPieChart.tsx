import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type HistoryItem = {
  emotion: string;
  confidence: number;
  time: string;
};

type EmotionPieChartProps = {
  history: HistoryItem[];
};

const COLORS = [
  "#D4AF37",
  "#F4C430",
  "#FFD700",
  "#B8860B",
  "#C19A2B",
  "#E6C35C",
  "#A67C00",
];

function EmotionPieChart({ history }: EmotionPieChartProps) {
  const emotionCounts: Record<string, number> = {};

  history.forEach((item) => {
    emotionCounts[item.emotion] =
      (emotionCounts[item.emotion] || 0) + 1;
  });

  const data = Object.entries(emotionCounts).map(([emotion, value]) => ({
    name: emotion,
    value,
  }));

  return (
    <div
      className="
        w-full
        max-w-xl
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
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-5">
        📊 Emotion Distribution
      </h2>

      <ResponsiveContainer width="100%" height="88%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={4}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #D4AF37",
              borderRadius: "12px",
              color: "#FFFFFF",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#FFFFFF",
              paddingTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmotionPieChart;