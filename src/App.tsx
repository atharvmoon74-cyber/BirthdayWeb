import { useState } from 'react';
import { motion } from 'framer-motion';

import { MusicProvider } from './components/MusicPlayer'; // ✅ IMPORTANT

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
import CursorTrail from './components/CursorTrail';

// ✅ CLEAN chapters
const CHAPTERS = [
  { id: 'hero', component: HeroSection },
  { id: 'started', component: HowItStarted },
  { id: 'time', component: TimeCounter },
  { id: 'story', component: ShortStory },
  { id: 'timeline', component: Timeline },
  { id: 'gallery', component: PhotoGallery },
  { id: 'fun', component: FunMoments },
  { id: 'who', component: WhoSheIs },
  { id: 'letters', component: LettersFeelings },
  { id: 'stars', component: StarMap },
  { id: 'journey', component: JourneyMap },
  { id: 'mood', component: MoodSwitch },
  { id: 'surprise', component: HiddenSurprise },
  { id: 'error', component: FakeError },
  { id: 'voice', component: VoiceMessage },
  { id: 'art', component: CreativeArt },
  { id: 'mystery', component: MysteryBox },
  { id: 'depth', component: EmotionalDepth },
  { id: 'unlock', component: FinalUnlock },
  { id: 'thanks', component: ThankYou },
  { id: 'finale', component: GrandFinale },
];

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <MusicProvider> {/* 🔥 FIX: wrap EVERYTHING */}

      {/* Entry screen */}
      {!started && <CinematicEntry onBegin={() => setStarted(true)} />}

      {/* Main website */}
      {started && (
        <>
          <CursorTrail />

          <main>
            {CHAPTERS.map((chapter) => {
              const Comp = chapter.component;
              return (
                <motion.div
                  key={chapter.id}
                  id={chapter.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8 }}
                >
                  <Comp />
                </motion.div>
              );
            })}
          </main>
        </>
      )}

    </MusicProvider>
  );
}