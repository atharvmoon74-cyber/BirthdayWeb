import { createContext, useContext, useRef } from "react";

const MusicContext = createContext<any>(null);

export const MusicProvider = ({ children }: any) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = () => {
    audioRef.current?.play();
  };

  return (
    <MusicContext.Provider value={{ playMusic }}>
      {children}

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);