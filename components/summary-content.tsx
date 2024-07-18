import { useSummary } from "@/contexts/summary-context";
import SummarySkeleton from "./summary-skeleton";
import { Button } from "./ui/button";

export default function SummaryContent(){
    const {summaryIsGenerating, summaryContent, generateSummary} = useSummary();

    console.log("summary content: ",summaryContent);
    

    if(!summaryContent && summaryIsGenerating){
        return (
            <div>
                <SummarySkeleton />
            </div>
        )
    }

    if(!summaryContent && !summaryIsGenerating){
        return (
            <div>
                <Button onClick={generateSummary}>
                    <span>Generate Summary</span>
                </Button>
            </div>
        )
    }

    if(summaryContent) {
        return (
          <div>
            <div>{summaryContent}</div>
          </div>
        )
      }
}