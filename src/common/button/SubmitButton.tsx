import ThemedButton from "@themed/ThemedButton";

export default function SubmitButton({ text }: { text: string }) {
  return (
    <ThemedButton className="w-full" type="submit">
      {text}
    </ThemedButton>
  );
}
