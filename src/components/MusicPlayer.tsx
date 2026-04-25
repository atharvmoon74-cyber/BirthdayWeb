import { createContext, useContext, useRef, useEffect, useState } from "react";

type MusicContextType = {
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
  toggleMusic: () => Promise<void>;
  isPlaying: boolean;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  

  // ✅ Initialize audio ONCE (GitHub Pages safe path)
  useEffect(() => {
    const audio = new Audio(import.meta.env.BASE_URL + "music.mp3");

    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";

    // Sync state with actual audio
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => setIsPlaying(false);

    audioRef.current = audio;
    

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // ▶️ Play (safe + handles browser autoplay restrictions)
  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("⚠️ Autoplay blocked — user interaction required");
    }
  };

  // ⏸ Pause
  const pauseMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  // 🔄 Toggle (useful for buttons later)
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      pauseMusic();
    } else {
      await playMusic();
    }
  };

  return (
    <MusicContext.Provider
      value={{ playMusic, pauseMusic, toggleMusic, isPlaying }}
    >
      {children}
    </MusicContext.Provider>
  );
}

// ✅ Hook with strict safety
export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used inside MusicProvider");
  }

  return context;
}