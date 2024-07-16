import { useExtension } from "@/contexts/extension-context";
import { Collapsible } from "./ui/collapsible";
import { useEffect } from "react";
import { getVideoData } from "@/utils/functions";

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

            if(videoId && videoId !== extensionVideoId){
                setExtensionVideoId(videoId);
                setExtensionLoading(true);
                const data = await getVideoData(videoId);
                console.log("Data: ", data);
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
        console.log("Fetched Theme: ", backgroundColor);

        if(backgroundColor === "#fff"){
            setExtensionTheme("light");
        }
        else{
            setExtensionTheme("dark");
        }

    }, [])

    if(!extensionTheme) return null;

    return (
        <main className={"antialiased w-full mb-3 z-10"}>
            <div className="w-full">
                <Collapsible className="space-y-3">
                    <h1 className="text-red-600">Extension Actions</h1>
                </Collapsible>
            </div>
        </main>
    );
}