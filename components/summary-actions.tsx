import { useSummary } from "@/contexts/summary-context"
import { models, prompts, type Model, type Prompt } from "@/lib/constants"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { CheckIcon, ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "./ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select"
import { TooltipWrapper } from "./ui/tooltip-wrapper"

export default function SummaryActions() {
    const {
        summaryPrompt,
        summaryIsGenerating,
        summaryModel,
        summaryContent,
        setSummaryPrompt,
        setSummaryModel,
        generateSummary
    } = useSummary()

    const { isCopied, copyToClipboard } = useCopyToClipboard({
        timeout: 2000
    })

    function copySummary() {
        if (isCopied || !summaryContent || summaryIsGenerating) return
        copyToClipboard(summaryContent)
    }

    return (
        <div className="flex flex-row w-full justify-between items-center sticky top-0 z-20 bg-white pt-3.5 pb-2 px-3">
            <Select
                value={summaryModel.value}
                onValueChange={(value: string) =>
                    setSummaryModel(models.find((model) => model.value === value))
                }>
                <SelectTrigger className="w-fit space-x-3">
                    <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                    {models.map((model: Model) => (
                        <SelectItem key={model.value} value={model.value}>
                            <div className="flex flex-row items-center">
                                <div className="mr-2">{model.icon}</div>
                                {model.label}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex flex-row space-x-2">
                <TooltipWrapper text={"Regenerate Summary"}>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={generateSummary}
                        disabled={summaryIsGenerating}>
                        <ReloadIcon className="h-4 w-4 opacity-60" />
                    </Button>
                </TooltipWrapper>

                <TooltipWrapper text={"Copy Summary"}>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={copySummary}
                        disabled={summaryIsGenerating}>
                        {isCopied ? (
                            <CheckIcon className="h-4.5 w-4.5 opacity-60" />
                        ) : (
                            <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-60" />
                        )}
                    </Button>
                </TooltipWrapper>

                <Select
                    value={summaryPrompt.value}
                    onValueChange={(value: string) =>
                        setSummaryPrompt(prompts.find((prompt) => prompt.value === value))
                    }>
                    <SelectTrigger className="w-fit space-x-3">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {prompts.map((prompt: Prompt) => (
                            <SelectItem key={prompt.value} value={prompt.value}>
                                {prompt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}