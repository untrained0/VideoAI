import { ExtensionProvider } from "@/contexts/extension-context";

export default function Provider({children}){
    return <ExtensionProvider>{children}</ExtensionProvider>
}