import { CheckIcon, ClipboardCopyIcon, Crosshair1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Input } from "./ui/input"
import { useTranscript } from "@/contexts/transcript-context"
import { useExtension } from "@/contexts/extension-context";
import { TooltipWrapper } from "./ui/tooltip-wrapper";
import { Button } from "./ui/button";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cleanTextTranscript } from "@/utils/functions";

interface TranscriptActionProps {
    jumpToCurrentTime: () => void
}

export default function TranscriptActions({jumpToCurrentTime}: TranscriptActionProps){

    const {transcriptSearch, setTranscriptSearch, transcriptJson} = useTranscript();
    const {extensionLoading, extensionData} = useExtension();

    const { isCopied, copyToClipboard } = useCopyToClipboard({
        timeout: 2000
      })

      console.log("Is copied value: ",isCopied);
      console.log("transcript JSON:", transcriptJson);
      console.log("extenion loading: ", extensionLoading);
      
      
      

      function copyTranscript(){
        if(isCopied && extensionData.transcripts) return;
        const processed = cleanTextTranscript(extensionData.transcripts);
        copyToClipboard(processed);
      }

    return(
        <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-3.5 pb-3 px-3 space-x-4 dark:bg-[#0F0F0F] dark:text-white">
            <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
            <Input type="text" 
            placeholder="Search Transcript"
            className="pl-8"
            onChange={(e) => {
                e.preventDefault();
                setTranscriptSearch(e.currentTarget.value);
            }}
            disabled={extensionLoading || transcriptJson.length === 0} />
            </div>

            <div className="flex flex-row space-x-2">
        <TooltipWrapper text={"Jump to current time"}>
          <Button
            variant="outline"
            size="icon"
            onClick={jumpToCurrentTime}
            disabled={extensionLoading || transcriptJson.length === 0} >
            <Crosshair1Icon className="h-4 w-4 opacity-60" />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper text={"Copy Transcript"}>
          <Button
            variant="outline"
            size="icon"
            onClick={copyTranscript}
            disabled={extensionLoading || transcriptJson.length === 0}
             >
            {isCopied ? (
              <CheckIcon className="h-4.5 w-4.5 opacity-60" />
            ) : (
              <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-60" />
            )}
          </Button>
        </TooltipWrapper>

      </div>
        </div>
    )
}