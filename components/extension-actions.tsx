import { ActivityLogIcon, CardStackPlusIcon, CaretSortIcon, ChatBubbleIcon, CheckIcon, Link2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useExtension } from "@/contexts/extension-context";
import { TooltipWrapper } from "./ui/tooltip-wrapper";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { CollapsibleTrigger } from "./ui/collapsible";

export default function ExtensionActions() {

    const { setExtensionIsOpen, extensionIsOpen, setExtensionPanel } = useExtension();

    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

    const copyVideoUrl = () => {
        if (isCopied) return
        copyToClipboard(window.location.href);
    }

    return (
        <div className="border border-zinc-200 rounded-md flex items-center justify-between p-2.5 px-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800">
            <CardStackPlusIcon className="h-6 w-6 opacity-50 ml-2" />
            <div className="flex items-center justify-center space-x-2">
                <div className="-space-x-px flex">
                    <Button
                        variant="outline"
                        className="rounded-r-none focus:z-20 bg-transparent space-x-2 items-center"
                        onClick={() => {
                            setExtensionPanel("Summary");
                            if (!extensionIsOpen) setExtensionIsOpen(true);
                        }}
                    >
                        <Pencil2Icon className="h-4 w-4 opacity-60" />
                        <span className="opacity-90">Summary</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-r-none focus:z-20 bg-transparent space-x-2 items-center"
                        onClick={() => {
                            setExtensionPanel("Transcripts");
                            if (!extensionIsOpen) setExtensionIsOpen(true);
                        }}
                    >
                        <ActivityLogIcon className="h-4 w-4 opacity-60" />
                        <span>Transcripts</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-r-none focus:z-20 bg-transparent space-x-2 items-center"
                        onClick={() => {
                            setExtensionPanel("Chat");
                            if (!extensionIsOpen) setExtensionIsOpen(true);
                        }}
                    >
                        <ChatBubbleIcon className="h-4 w-4 opacity-60" />
                        <span>Chat</span>
                    </Button>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <TooltipWrapper text={"Copy Video Url"}>
                    <Button variant="outline" size="icon" onClick={() => copyVideoUrl()}>
                        {isCopied ? (
                            <CheckIcon className="w-4.5 h-4.5 opacity-60" />
                        ) : (
                            <Link2Icon className="w-4.5 h-4.5 opacity-60" />
                        )}
                    </Button>
                </TooltipWrapper>

                <CollapsibleTrigger asChild>
                    <Button variant="outline" size="icon">
                        <CaretSortIcon className="w-4.5 h-4.5 opacity-60" />
                    </Button>
                </CollapsibleTrigger>
            </div>
        </div>
    )
}