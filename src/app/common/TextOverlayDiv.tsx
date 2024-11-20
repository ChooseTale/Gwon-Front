export default function TextOverlayDiv({ text }: { text: string }) {
  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center select-none pointer-events-none">
      <p
        className="headline text-grey-400 text-center"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
