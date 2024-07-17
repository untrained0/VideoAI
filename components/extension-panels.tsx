import { useExtension } from "@/contexts/extension-context";

export default function ExtensionPanels(){
    const {extensionPanel} = useExtension();

    return (
        <div>
            {extensionPanel === "Summary" && <h1>Summary</h1>}
            {extensionPanel === "Transcripts" && <h1>Transcripts</h1>}
            {extensionPanel === "Chat" && <h1>Chat</h1>}
        </div>
    )
}