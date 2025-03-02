export default function PlayGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  w-full max-w-[600px] flex-col  ">{children}</div>
  );
}
