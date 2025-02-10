export default function PlayGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-[calc(100%-40px)] min-w-[280px] max-w-[560px] flex-col ml-[20px] mr-[20px] ">
      {children}
    </div>
  );
}
