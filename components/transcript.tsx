import { useRef } from "react"

import TranscriptActions from "./transcript-actions"
import TranscriptContent from "./transcript-content"

export default function Transcript() {
  const player = document.querySelector("video")
  const transcriptListRef = useRef(null)

  console.log("Transcript ref in transcript.tsx:", transcriptListRef);
  

  function jumpToCurrentTime(): void {
    if (!player || !transcriptListRef.current) return
    const time = Math.round(player.currentTime * 1000)

    const itemsContainer = transcriptListRef.current
      .firstElementChild as HTMLElement

    if (itemsContainer) {
      const children = Array.from(itemsContainer.children) as HTMLElement[]
      const targetElement = children.find((child: HTMLElement) => {
        const startTime = parseInt(
          child.getAttribute("data-start-time") || "0",
          10
        )
        const endTime = parseInt(child.getAttribute("data-end-time") || "0", 10)
        return startTime <= time && endTime >= time
      })

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })

        targetElement.classList.add("bg-zinc-100")
        targetElement.classList.add("dark:bg-[#141414]")
        targetElement.classList.add("transition-all")

        setTimeout(() => {
          targetElement.classList.add("bg-zinc-100")
          targetElement.classList.add("dark:bg-[#141414]")
          targetElement.classList.add("transition-all")
        }, 3000)
      }
    }
  }

  return (
    <>
      <TranscriptActions jumpToCurrentTime={jumpToCurrentTime} />
      <TranscriptContent ref={transcriptListRef} />
    </>
  )
}