import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TourScript, TourStep } from '../../types/knowledge-graph';

interface GuidedTourProps {
  tourScript: TourScript;
  onHighlight?: (target: string | string[]) => void;
  onStepChange?: (stepIndex: number) => void;
  onClose?: () => void;
}

const EASING = [0.22, 1, 0.36, 1] as const;

export function GuidedTour({ tourScript, onHighlight, onStepChange, onClose }: GuidedTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const streamRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charIndexRef = useRef(0);

  const steps = tourScript.steps;
  const step = steps[currentStep];

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      clearInterval(streamRef.current);
      streamRef.current = null;
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [stopSpeech]);

  const streamText = useCallback((text: string, onComplete?: () => void) => {
    charIndexRef.current = 0;
    setDisplayedText('');
    if (streamRef.current) clearInterval(streamRef.current);

    const charDelay = 25;
    streamRef.current = setInterval(() => {
      charIndexRef.current++;
      if (charIndexRef.current >= text.length) {
        setDisplayedText(text);
        if (streamRef.current) clearInterval(streamRef.current);
        streamRef.current = null;
        onComplete?.();
      } else {
        setDisplayedText(text.slice(0, charIndexRef.current));
      }
    }, charDelay);
  }, []);

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= steps.length) return;
    clearTimers();
    stopSpeech();
    setCurrentStep(index);
    onStepChange?.(index);
    const s = steps[index];
    onHighlight?.(s.target);
    speakText(s.narration);

    streamText(s.narration, () => {
      if (isPlaying && index < steps.length - 1) {
        timerRef.current = setTimeout(() => {
          goToStep(index + 1);
        }, Math.max(s.duration - s.narration.length * 25, 1000));
      }
    });
  }, [steps, clearTimers, stopSpeech, onStepChange, onHighlight, speakText, streamText, isPlaying]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsPlaying(true);
    setCurrentStep(0);
    goToStep(0);
  }, [goToStep]);

  const handleClose = useCallback(() => {
    clearTimers();
    stopSpeech();
    setIsOpen(false);
    setIsPlaying(false);
    setDisplayedText('');
    onClose?.();
  }, [clearTimers, stopSpeech, onClose]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) goToStep(currentStep + 1);
  }, [currentStep, steps.length, goToStep]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => {
      if (!prev) {
        // Resume: if text is fully displayed, auto-advance
        if (displayedText === step?.narration && currentStep < steps.length - 1) {
          timerRef.current = setTimeout(() => {
            goToStep(currentStep + 1);
          }, 2000);
        }
      } else {
        clearTimers();
        stopSpeech();
      }
      return !prev;
    });
  }, [displayedText, step, currentStep, steps.length, goToStep, clearTimers, stopSpeech]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
      stopSpeech();
    };
  }, [clearTimers, stopSpeech]);

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-crimson-500 text-white font-medium text-sm hover:bg-crimson-600 transition-colors shadow-md"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
        Take a Tour
      </button>
    );
  }

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASING as unknown as number[] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6"
        >
          <div className="max-w-2xl mx-auto rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-muted">
              <motion.div
                className="h-full bg-crimson-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: EASING as unknown as number[] }}
              />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-serif font-bold text-sm text-foreground">
                  {tourScript.title}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed min-h-[3rem] mb-4">
                {displayedText}
                {displayedText.length < (step?.narration.length ?? 0) && (
                  <span className="inline-block w-0.5 h-4 bg-crimson-500 ml-0.5 animate-pulse" />
                )}
              </p>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous step"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next step"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {isSpeaking && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      Speaking
                    </span>
                  )}
                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Close tour"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
