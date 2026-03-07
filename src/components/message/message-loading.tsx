import { Skeleton } from "../ui/skeleton";

export default function MessageLoading() {
  return (
    <div className="w-full flex flex-col gap-4 flex-1">
      {/* user  */}
      <Skeleton className="w-full h-9 max-w-xs self-end bg-secondary py-2 px-4 rounded-xl" />
      {/* assistant  */}
      <Skeleton className="w-full h-14 p-2 prose dark:prose-invert max-w-none rounded-xl" />
      {/* user  */}
      <Skeleton className="w-full mt-6 h-9 max-w-sm self-end bg-secondary py-2 px-4 rounded-xl" />
      {/* assistant  */}
      <Skeleton className="w-full h-40 p-2 prose dark:prose-invert max-w-none rounded-xl" />
    </div>
  );
}
