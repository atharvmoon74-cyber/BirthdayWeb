import { useState } from 'react';
import CinematicEntry from './components/CinematicEntry';
import HeroSection from './components/HeroSection';
import TimeCounter from './components/TimeCounter';
import ShortStory from './components/ShortStory';
import Timeline from './components/Timeline';
import PhotoGallery from './components/PhotoGallery';
import MemoryGuessGame from './components/MemoryGuessGame';
import FunQuiz from './components/FunQuiz';
import ProsAndCons from './components/ProsAndCons';
import WhySpecial from './components/WhySpecial';
import OpenWhenLetters from './components/OpenWhenLetters';
import StarMap from './components/StarMap';
import JourneyMap from './components/JourneyMap';
import MoodSwitch from './components/MoodSwitch';
import SecretPassword from './components/SecretPassword';
import HiddenSurprise from './components/HiddenSurprise';
import FakeError from './components/FakeError';
import VoiceMessage from './components/VoiceMessage';
import CreativeArt from './components/CreativeArt';
import ThingsINeverSaid from './components/ThingsINeverSaid';
import PuzzleUnlock from './components/PuzzleUnlock';
import FinalEnding from './components/FinalEnding';
import MusicPlayer from './components/MusicPlayer';
import CursorTrail from './components/CursorTrail';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started && <CinematicEntry onBegin={() => setStarted(true)} />}

      {started && (
        <>
          <CursorTrail />
          <MusicPlayer />

          <main>
            <HeroSection />
            <TimeCounter />
            <ShortStory />
            <Timeline />
            <PhotoGallery />
            <MemoryGuessGame />
            <FunQuiz />
            <ProsAndCons />
            <WhySpecial />
            <OpenWhenLetters />
            <StarMap />
            <JourneyMap />
            <MoodSwitch />
            <SecretPassword />
            <HiddenSurprise />
            <FakeError />
            <VoiceMessage />
            <CreativeArt />
            <ThingsINeverSaid />
            <PuzzleUnlock />
            <FinalEnding />
          </main>
        </>
      )}
    </>
  );
}
