import { createContext, useContext, useState } from "react"

interface ExtensionState {
    extensionContainer : any
    extensionIsOpen: boolean
    extensionTheme: string | null
    extensionLoading: boolean
    extensionPanel: string
    extensionVideoId: string
    extensionData: any
}

const initialState: ExtensionState ={
    extensionContainer : null,
    extensionIsOpen: false,
    extensionTheme: null,
    extensionLoading: false,
    extensionPanel: "Summary",
    extensionVideoId: "",
    extensionData: ""
}

interface ExtensionActions {
    setExtensionContainer : (container: any) => void
    setExtensionIsOpen: (isOpen: boolean) => void
    setExtensionTheme: (theme: string | null) => void
    setExtensionLoading: (loading: boolean) => void
    setExtensionPanel: (panel: string) => void
    setExtensionVideoId: (videoId: string) => void
    setExtensionData: (data: any) => void
    resetExtension: () => void
}

interface ExtensionContext extends ExtensionState, ExtensionActions {}

const ExtensionContext = createContext<ExtensionContext | undefined>(undefined)

export function useExtension() {
    const context = useContext(ExtensionContext);

    if(!context) throw new Error("useExtension must be used within an ExtensionProvider");

    return context;
}

interface ExtensionProviderProps {
    children: React.ReactNode
}

export function ExtensionProvider({children}: ExtensionProviderProps){
    const [extensionContainer, setExtensionContainer] = useState<any>(initialState.extensionContainer)
    const [extensionIsOpen, setExtensionIsOpen] = useState<boolean>(initialState.extensionIsOpen)
    const [extensionTheme, setExtensionTheme] = useState<string | any>(initialState.extensionTheme)
    const [extensionLoading, setExtensionLoading] = useState<boolean>(initialState.extensionLoading)
    const [extensionPanel, setExtensionPanel] = useState<string>(initialState.extensionPanel)
    const [extensionVideoId, setExtensionVideoId] = useState<string>(initialState.extensionVideoId)
    const [extensionData, setExtensionData] = useState<any>(initialState.extensionData)

    const resetExtension = () => {
        setExtensionContainer(initialState.extensionContainer);
        setExtensionIsOpen(initialState.extensionIsOpen);
        setExtensionTheme(initialState.extensionTheme);
        setExtensionLoading(initialState.extensionLoading);
        setExtensionPanel(initialState.extensionPanel);
        setExtensionVideoId(initialState.extensionVideoId);
        setExtensionData(initialState.extensionData);
    }

    const value = {
        extensionContainer,
        extensionIsOpen,
        extensionTheme,
        extensionLoading,
        extensionPanel,
        extensionVideoId,
        extensionData,
        setExtensionContainer,
        setExtensionIsOpen,
        setExtensionTheme,
        setExtensionLoading,
        setExtensionPanel,
        setExtensionVideoId,
        setExtensionData,
        resetExtension
    }

    return(
        <ExtensionContext.Provider value={value}>
            {children}
        </ExtensionContext.Provider>
    )
}