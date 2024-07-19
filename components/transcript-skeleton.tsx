import { Skeleton } from "./ui/skeleton"

export default function TranscriptSkeleton() {
    return (
        <div className="w-full space-y-4">
            {Array.from({ length: 16 }).map((_, index) => (
                <div className="flex flex-col w-full justify-between items-center p-3 border-[0.5px] rounded-md border-zinc-200 space-y-4">
                    <div className="w-full flex flex-row items-center justify-between">
                        <Skeleton key={index} className="h-4 w-32 dark:bg-gray-700" />
                    </div>
                    <Skeleton key={index} className="h-4 w-36 dark:bg-gray-700" />
                </div>
            ))}
        </div>
    )
}
