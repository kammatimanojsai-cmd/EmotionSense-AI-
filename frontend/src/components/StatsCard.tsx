type StatsCardProps = {
  title: string;
  value: string | number;
  color: string;
};

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div
      className="
        w-56
        rounded-2xl
        p-6
        text-center
        bg-[#1A1A1A]
        border
        border-[#D4AF37]
        shadow-xl
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]
      "
    >
      <h3 className="text-lg font-semibold text-[#D4AF37]">
        {title}
      </h3>

      <p className="mt-4 text-4xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;