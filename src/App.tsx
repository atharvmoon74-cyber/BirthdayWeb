import { useState } from 'react';
import CinematicEntry from './components/CinematicEntry';
import HeroSection from './components/HeroSection';
import HowItStarted from './components/HowItStarted';
import TimeCounter from './components/TimeCounter';
import ShortStory from './components/ShortStory';
import Timeline from './components/Timeline';
import PhotoGallery from './components/PhotoGallery';
import FunMoments from './components/FunMoments';
import WhoSheIs from './components/WhoSheIs';
import LettersFeelings from './components/LettersFeelings';
import StarMap from './components/StarMap';
import JourneyMap from './components/JourneyMap';
import MoodSwitch from './components/MoodSwitch';
import HiddenSurprise from './components/HiddenSurprise';
import FakeError from './components/FakeError';
import VoiceMessage from './components/VoiceMessage';
import CreativeArt from './components/CreativeArt';
import MysteryBox from './components/MysteryBox';
import EmotionalDepth from './components/EmotionalDepth';
import FinalUnlock from './components/FinalUnlock';
import ThankYou from './components/ThankYou';
import GrandFinale from './components/GrandFinale';
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
            {/* Chapter 2 - Hero */}
            <HeroSection />

            {/* Chapter 2 - How It Started */}
            <HowItStarted />

            {/* Time Counter */}
            <TimeCounter />

            {/* Short Story */}
            <ShortStory />

            {/* Chapter 3 - The Journey */}
            <Timeline />

            {/* Chapter 4 - Memories */}
            <PhotoGallery />

            {/* Chapter 5 - Fun Moments */}
            <FunMoments />

            {/* Chapter 6 - Who She Is */}
            <WhoSheIs />

            {/* Chapter 7 - Letters & Feelings */}
            <LettersFeelings />

            {/* Star Map */}
            <StarMap />

            {/* Chapter 8 - Journey Map */}
            <JourneyMap />

            {/* Mood Switch */}
            <MoodSwitch />

            {/* Hidden Surprise */}
            <HiddenSurprise />

            {/* Fake Error */}
            <FakeError />

            {/* Voice Message */}
            <VoiceMessage />

            {/* Creative Art */}
            <CreativeArt />

            {/* Chapter 9 - The Mystery Box */}
            <MysteryBox />

            {/* Chapter 10 - Emotional Depth */}
            <EmotionalDepth />

            {/* Chapter 11 - Final Unlock */}
            <FinalUnlock />

            {/* Thank You */}
            <ThankYou />

            {/* Chapter 12 - Grand Finale */}
            <GrandFinale />
          </main>
        </>
      )}
    </>
  );
}
