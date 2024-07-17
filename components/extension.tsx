import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { useEffect } from "react";
import { getVideoData } from "@/utils/functions";
import ExtensionActions from "./extension-actions";
import ExtensionPanels from "./extension-panels";
import { useExtension } from "@/contexts/extension-context";

export default function Extension() {

    const {
        setExtensionContainer,
        setExtensionIsOpen,
        setExtensionData,
        setExtensionLoading,
        setExtensionPanel,
        setExtensionTheme,
        setExtensionVideoId,
        extensionTheme,
        extensionIsOpen,
        extensionVideoId
    } = useExtension()

    useEffect(() => {
        const getVideoId = () => {
            return new URLSearchParams(window.location.search).get("v")
        }

        const fetchVideoData = async () => {
            const videoId = getVideoId();

            if (videoId && videoId !== extensionVideoId) {
                setExtensionVideoId(videoId);
                setExtensionLoading(true);
                const data = await getVideoData(videoId);
                setExtensionData(data);
                setExtensionLoading(false);
            }
        }

        fetchVideoData();

        const intervalId = setInterval(fetchVideoData, 2000)

        return () => clearInterval(intervalId);
    }, [extensionVideoId])

    useEffect(() => {
        const getCssVariable = (name: string) => {
            const rootStyle = getComputedStyle(document.documentElement);
            return rootStyle.getPropertyValue(name).trim()
        }

        const backgroundColor = getCssVariable("--yt-spec-base-background");

        if (backgroundColor === "#fff") {
            setExtensionTheme("light");
        }
        else {
            setExtensionTheme("dark");
        }

    }, [])

    if (!extensionTheme) return null;

    return (
        <main
            ref={setExtensionContainer}
            className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
            <div className="w-full">
                <Collapsible
                    open={extensionIsOpen}
                    onOpenChange={setExtensionIsOpen}
                    className="space-y-3">
                    <ExtensionActions />
                    <CollapsibleContent className={`w-full h-fit max-h-[500px] border border-zinc-200 rounded-md overflow-auto`}>
                        <ExtensionPanels />
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </main>
    );
}