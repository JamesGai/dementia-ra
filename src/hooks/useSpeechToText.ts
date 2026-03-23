import { useEffect, useRef, useState } from "react";

type UseSpeechToTextOptions = {
  lang?: string;
  onResult: (transcript: string) => void;
};

const getRecognitionConstructor = () => {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
};

const formatTranscript = (baseText: string, transcript: string) => {
  const trimmedBase = baseText.trim();
  const trimmedTranscript = transcript.trim();
  if (!trimmedBase) return trimmedTranscript;
  if (!trimmedTranscript) return trimmedBase;
  return `${trimmedBase} ${trimmedTranscript}`;
};

export function useSpeechToText({
  lang = "en-US",
  onResult,
}: UseSpeechToTextOptions) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const baseTextRef = useRef("");
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const RecognitionConstructor = getRecognitionConstructor();
    setIsSupported(Boolean(RecognitionConstructor));
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const startListening = (baseText: string) => {
    const RecognitionConstructor = getRecognitionConstructor();
    if (!RecognitionConstructor) {
      setError("Voice input is not supported on this device.");
      return;
    }

    recognitionRef.current?.stop();
    baseTextRef.current = baseText;
    setError(null);

    const recognition = new RecognitionConstructor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ");
      onResult(formatTranscript(baseTextRef.current, transcript));
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setError("Microphone access was denied.");
      } else if (event.error !== "aborted") {
        setError("Voice input failed. Please try again.");
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const toggleListening = (baseText: string) => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening(baseText);
  };

  return {
    error,
    isListening,
    isSupported,
    startListening,
    stopListening,
    toggleListening,
  };
}
