"use client";

import React, { useEffect, useState } from "react";
import { VideoHeroWithAudioControl } from "@/components/ui/video-hero-with-audio";

export function HeroSection() {
  const [scrambled, setScrambled] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const finalHeading = "Inspire Their Tomorrow By Building with AI.";

  // Enhanced typing effect with three phases and backspace
  useEffect(() => {
    let mounted = true;
    const firstPart = "Inspire Their Tomorrow";
    const middlePart = " With Another Device";
    const finalPart = " By Building with AI.";
    let current = "";
    let i = 0;
    let phase: "typingFirst" | "pause1" | "typingMiddle" | "pause2" | "backspace" | "typingFinal" | "finish" = "typingFirst";

    function step() {
      if (!mounted) return;

      if (phase === "typingFirst") {
        if (i < firstPart.length) {
          current += firstPart[i];
          setScrambled(current);
          i++;
          setTimeout(step, 70);
        } else {
          phase = "pause1";
          setTimeout(step, 800);
        }
      } else if (phase === "pause1") {
        phase = "typingMiddle";
        i = 0;
        setTimeout(step, 200);
      } else if (phase === "typingMiddle") {
        if (i < middlePart.length) {
          current += middlePart[i];
          setScrambled(current);
          i++;
          if (i === middlePart.length) {
            phase = "pause2";
            setTimeout(step, 1200);
          } else {
            setTimeout(step, 70);
          }
        }
      } else if (phase === "pause2") {
        phase = "backspace";
        setTimeout(step, 300);
      } else if (phase === "backspace") {
        if (current.length > firstPart.length) {
          current = current.slice(0, -1);
          setScrambled(current);
          setTimeout(step, 50);
        } else {
          phase = "typingFinal";
          i = 0;
          setTimeout(step, 200);
        }
      } else if (phase === "typingFinal") {
        if (i < finalPart.length) {
          current += finalPart[i];
          setScrambled(current);
          i++;
          if (i === finalPart.length) {
            phase = "finish";
            setTimeout(step, 300);
          } else {
            setTimeout(step, 70);
          }
        }
      } else if (phase === "finish") {
        setScrambled(firstPart + finalPart);
        // Hide cursor after animation completes
        setTimeout(() => {
          if (mounted) {
            setShowCursor(false);
          }
        }, 500);
      }
    }

    step();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <VideoHeroWithAudioControl
      scrambledText={scrambled}
      finalHeading={finalHeading}
    />
  );
}
