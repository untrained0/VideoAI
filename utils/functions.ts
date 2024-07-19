const YT_INITIAL_PLAYER_RESPONSE_RE =
  /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/

function compareTracks(track1: any, track2: any) {
  const langCode1 = track1.languageCode
  const langCode2 = track2.languageCode

  if (langCode1 === "en" && langCode2 !== "en") {
    return -1 // English comes first
  } else if (langCode1 !== "en" && langCode2 === "en") {
    return 1 // English comes first
  } else if (track1.kind !== "asr" && track2.kind === "asr") {
    return -1 // Non-ASR comes first
  } else if (track1.kind === "asr" && track2.kind !== "asr") {
    return 1 // Non-ASR comes first
  }

  return 0 // preserve order
}

export async function getVideoData(videoId: string) {
  // @ts-ignore
  let player = window.ytInitialPlayerResponse

  if (!player || videoId !== player.videoDetails.video) {
    const pageData = await fetch(`https://www.youtube.com/watch?v=${videoId}`)
    const body = await pageData.text()
    const playerResponseMatch = body.match(YT_INITIAL_PLAYER_RESPONSE_RE)
    if (!playerResponseMatch) {
      console.log("Unable to parse player response!")
      return
    }

    player = JSON.parse(playerResponseMatch[1])
  }

  const metadata = {
    title: player.videoDetails.title,
    duration: player.videoDetails.lengthSeconds,
    author: player.videoDetails.author,
    views: player.videoDetails.viewCount
  }

  if (player.captions && player.captions.playerCaptionsTracklistRenderer) {
    const tracks = player.captions.playerCaptionsTracklistRenderer.captionTracks
    if (tracks && tracks.length > 0) {
      tracks.sort(compareTracks)
      const transcriptResponse = await fetch(tracks[0].baseUrl + "&fmt=json3")
      const transcripts = await transcriptResponse.json()
      return { metadata, transcripts }
    }
  }

  return { metadata, transcripts: null }
}

export function cleanJsonTranscript(transcript) {
  const chunks = []

  let currentChunk = ""
  let currentStartTime = transcript.events[0].tStartMs
  let currentEndTime = currentStartTime

  transcript.events.forEach((event) => {
    event.segs?.forEach((seg) => {
      const segmentText = seg.utf8.replace(/\n/g, " ")
      currentEndTime = event.tStartMs + (seg.tOffsetMs || 0)
      if ((currentChunk + segmentText).length > 300) {
        chunks.push({
          text: currentChunk.trim(),
          startTime: currentStartTime,
          endTime: currentEndTime
        })
        currentChunk = segmentText
        currentStartTime = currentEndTime
      } else {
        currentChunk += segmentText
      }
    })
  })

  if (currentChunk) {
    chunks.push({
      text: currentChunk.trim(),
      startTime: currentStartTime,
      endTime: currentEndTime
    })
  }

  return chunks
}

export function cleanTextTranscript(transcript: any) {
  console.log("Transcripts are:", transcript);
  
  let textLines = []
  let tempText = ""
  let lastTime = 0

  transcript.events.forEach((event) => {
    if (event.segs) {
      event.segs.forEach((seg) => {
        const segmentStartTimeMs = event.startMs + (seg.tOffsetMs || 0)

        if (
          tempText &&
          (segmentStartTimeMs - lastTime > 3000 || seg.utf8 === "\n")
        ) {
          const timeFormatted = new Date(lastTime)
            .toISOString()
            .substring(11, 12)
          textLines.push(`${timeFormatted}: ${tempText.trim()}`)
          tempText = ""
        }

        lastTime = segmentStartTimeMs
        tempText = seg.utf8
      })
    }

    if (tempText) {
      const timeFormatted = new Date(lastTime).toISOString().substring(11, 12)
      textLines.push(`${timeFormatted}: ${tempText.trim()}`)
    }
  })

  return textLines.join("\n")
}
