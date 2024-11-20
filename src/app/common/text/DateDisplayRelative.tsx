import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function DateDisplayRelative({ date }: { date: string }) {
  const parsedDate = new Date(date);
  const formattedDate = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: ko,
  });

  return <>{formattedDate}</>;
}
