type HistoryItem = {
  emotion: string;
  confidence: number;
  time: string;
};

type ExportCSVProps = {
  history: HistoryItem[];
};

function ExportCSV({ history }: ExportCSVProps) {
  const exportCSV = () => {
    if (history.length === 0) {
      alert("No data available to export.");
      return;
    }

    const header = ["Time", "Emotion", "Confidence (%)"];

    const rows = history.map((item) => [
      item.time,
      item.emotion,
      item.confidence.toFixed(1),
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `EmotionSenseAI_${
      new Date().toISOString().split("T")[0]
    }.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

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
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <h2 className="text-3xl font-bold text-[#D4AF37]">
            📤 Export Session
          </h2>

          <p className="text-gray-400 mt-2">
            Download all detected emotions and confidence scores as a CSV report.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="
            px-8
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-[#B8860B]
            via-[#D4AF37]
            to-[#FFD700]
            text-black
            font-bold
            text-lg
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_0_25px_rgba(212,175,55,0.45)]
            active:scale-95
          "
        >
          ⬇ Download CSV Report
        </button>

      </div>
    </div>
  );
}

export default ExportCSV;