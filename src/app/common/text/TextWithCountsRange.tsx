export default function TextWithNumberRange({
  text,
  value,
  max,
  color,
}: {
  text: string;
  value: number;
  max: number;
  color?: string;
}) {
  return (
    <div className="flex gap-1 items-center">
      <span className="text-xs">{text}</span>
      <div
        className="min-w-4 h-4 px-[5px] flex justify-center items-center rounded-full bg-green-400 text-white text-[10px] font-bold"
        style={{ color }}
      >
        {value} / {max}
      </div>
    </div>
  );
}
