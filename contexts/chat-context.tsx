import { models, type Message, type Model } from "@/lib/constants";

interface ChatState {
    chatModel: Model
    chatIsGenerating: boolean
    chatIsError: boolean
    chatMessages: Message[] | undefined
    chatPrompt: string
    chatSuggestions: string[]
    chatIsGeneratingSuggestions: boolean
    chatIsErrorSuggestions: boolean
}

const initialState: ChatState = {
    chatModel: models[0],
    chatIsGenerating: false,
    chatIsError: false,
    chatMessages: [],
    chatPrompt: "",
    chatSuggestions: [],
    chatIsGeneratingSuggestions: false,
    chatIsErrorSuggestions: false
}

interface ChatActions {
    setChatModel: (model: string) => void
    setChatIsGenerating: (isGenerating: boolean) => void
    setChatIsError: (isError: boolean) => void
    setChatMessages: (messages: Message[] | undefined) => void
    setChatPrompt: (prompt: string) => void
    setChatSuggestions: (suggestions: string[]) => void
    setChatIsGeneratingSuggestions: (isGeneratingSuggestions: boolean) => void
    setChatIsErrorSuggestions: (isErrorSuggestions: boolean) => void
}

