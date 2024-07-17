import { ExtensionProvider } from "@/contexts/extension-context";
import { SummaryProvider } from "@/contexts/summary-context";

export default function Provider({ children }) {
    return (
        <ExtensionProvider>
            <SummaryProvider>{children}</SummaryProvider>
        </ExtensionProvider>
    )
}