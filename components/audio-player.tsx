"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
  src?: string
  title?: string
}

export function AudioPlayer({ src = "/audio/background-music.mp3", title = "Background Music" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.loop = true

    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      console.log("Audio file not found, using placeholder")
      setIsPlaying(false)
    }

    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [volume])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log("Audio playback failed:", error)
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-gradient-glass backdrop-blur-md border border-white/20 rounded-lg p-3 flex items-center space-x-3 shadow-lg">
        <audio ref={audioRef} preload="metadata">
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:text-accent-500">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:text-accent-500">
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>

        <div className="hidden sm:block">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <span className="hidden md:block text-white/70 text-xs">{title}</span>
      </div>
    </div>
  )
}
