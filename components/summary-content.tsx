import { useSummary } from "@/contexts/summary-context";
import SummarySkeleton from "./summary-skeleton";
import { Button } from "./ui/button";
import Markdown from "./markdown";

export default function SummaryContent(){
    const {summaryIsGenerating, summaryContent, generateSummary} = useSummary();    

    if(!summaryContent && summaryIsGenerating){
        return (
            <div className="flex justify-center items-center p-3 w-full bg-white dark:bg-[#0F0F0F]">
                <SummarySkeleton />
            </div>
        )
    }

    if(!summaryContent && !summaryIsGenerating){
        return (
            <div className="flex justify-center items-center p-3 w-full bg-white dark:bg-[#0F0F0F]">
                <Button variant="outline" className="w-full h-12" onClick={generateSummary}>
                    <span className="text-sm">Generate Summary</span>
                </Button>
            </div>
        )
    }

    if(summaryContent) {
        return (
          <div className="flex justify-center items-center p-3 w-full bg-white dark:bg-[#0F0F0F]">
            <div className="h-[600px] px-3 opacity-80 w-full">
            <Markdown markdown={summaryContent} className="pb-6"/>
          </div>
          </div>
        )
      }
}