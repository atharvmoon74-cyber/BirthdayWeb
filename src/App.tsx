import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import MusicPlayer, { MusicProvider, useMusic } from './components/MusicPlayer';
import CursorTrail from './components/CursorTrail';

const CHAPTERS = [
  { id: 'hero', component: HeroSection, phase: 'intro' as const },
  { id: 'started', component: HowItStarted, phase: 'intro' as const },
  { id: 'time', component: TimeCounter, phase: 'intro' as const },
  { id: 'story', component: ShortStory, phase: 'warm' as const },
  { id: 'timeline', component: Timeline, phase: 'warm' as const },
  { id: 'gallery', component: PhotoGallery, phase: 'warm' as const },
  { id: 'fun', component: FunMoments, phase: 'warm' as const },
  { id: 'who', component: WhoSheIs, phase: 'warm' as const },
  { id: 'letters', component: LettersFeelings, phase: 'emotional' as const },
  { id: 'stars', component: StarMap, phase: 'emotional' as const },
  { id: 'journey', component: JourneyMap, phase: 'emotional' as const },
  { id: 'mood', component: MoodSwitch, phase: 'warm' as const },
  { id: 'surprise', component: HiddenSurprise, phase: 'warm' as const },
  { id: 'error', component: FakeError, phase: 'warm' as const },
  { id: 'voice', component: VoiceMessage, phase: 'emotional' as const },
  { id: 'art', component: CreativeArt, phase: 'emotional' as const },
  { id: 'mystery', component: MysteryBox, phase: 'emotional' as const },
  { id: 'depth', component: EmotionalDepth, phase: 'emotional' as const },
  { id: 'unlock', component: FinalUnlock, phase: 'finale' as const },
  { id: 'thanks', component: ThankYou, phase: 'finale' as const },
  { id: 'finale', component: GrandFinale, phase: 'finale' as const },
];

function MusicPhaseSync() {
  const { setPhase } = useMusic();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const chapter = CHAPTERS.find(c => c.id === entry.target.id);
            if (chapter) setPhase(chapter.phase);
          }
        });
      },
      { threshold: 0.3 }
    );

    CHAPTERS.forEach(c => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setPhase]);

  return null;
}

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started && <CinematicEntry onBegin={() => setStarted(true)} />}

      {started && (
        <MusicProvider>
          <CursorTrail />
          <MusicPlayer />
          <MusicPhaseSync />

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
        </MusicProvider>
      )}
    </>
  );
}
