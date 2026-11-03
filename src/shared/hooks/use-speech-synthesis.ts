import { useCallback, useEffect, useRef, useState } from "react";

type Tlang = "en" | "ru";

type TUseSpeechSynthesis = {
  speak: ((input: string | string[], pause?: number) => void) | null;
  cancel: () => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
};

const normalizeLangTag = (tag: string): string => tag.toLowerCase().replace(/_/g, "-");

const matchesLang = (voiceLang: string, target: Tlang): boolean => {
  const normalized = normalizeLangTag(voiceLang);
  return normalized === target || normalized.startsWith(`${target}-`);
};

const DEFAULT_PAUSE = 500;
const SPEECH_RATE = 0.8;

export const useSpeechSynthesis = (lang: Tlang = "ru"): TUseSpeechSynthesis => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isReady, setIsReady] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const chainIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsReady(false);
      return;
    }

    const synth = window.speechSynthesis;

    const loadVoices = (): void => {
      const matched = synth.getVoices().filter((voice) => matchesLang(voice.lang, lang));

      if (!matched.length) {
        setVoices([]);
        setSelectedVoice(null);
        setIsReady(false);
        return;
      }

      setVoices(matched);
      setSelectedVoice((prev) => {
        if (prev && matched.some((v) => v.voiceURI === prev.voiceURI)) {
          return prev;
        }
        return matched[0];
      });
      setIsReady(true);
    };

    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => synth.removeEventListener("voiceschanged", loadVoices);
  }, [lang]);

  const cancel = useCallback((): void => {
    chainIdRef.current += 1;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (input: string | string[], pause: number = DEFAULT_PAUSE): void => {
      if (!selectedVoice) return;
      if (!("speechSynthesis" in window)) return;

      const rawParts = typeof input === "string" ? [input] : input;
      const parts = rawParts.map((p) => p.trim()).filter(Boolean);
      if (!parts.length) return;

      cancel();
      const chainId = chainIdRef.current;
      const synth = window.speechSynthesis;

      const runPart = (index: number): void => {
        if (chainIdRef.current !== chainId) return;
        if (index >= parts.length) return;

        const utterance = new SpeechSynthesisUtterance(parts[index]);
        utterance.voice = selectedVoice;
        utterance.lang = normalizeLangTag(selectedVoice.lang);
        utterance.rate = SPEECH_RATE;

        utterance.onend = () => {
          if (chainIdRef.current !== chainId) return;
          if (index + 1 < parts.length) {
            timeoutRef.current = window.setTimeout(() => runPart(index + 1), pause);
          }
        };

        utterance.onerror = () => {
          if (chainIdRef.current === chainId) chainIdRef.current += 1;
        };

        synth.speak(utterance);
      };

      runPart(0);
    },
    [selectedVoice, cancel],
  );

  return { speak: isReady ? speak : null, cancel, voices, selectedVoice, setSelectedVoice };
};
