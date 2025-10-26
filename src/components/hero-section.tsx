"use client";

import React, { useEffect, useState } from "react";
import { VideoHeroWithAudioControl } from "@/components/ui/video-hero-with-audio";

export function HeroSection() {
  const [scrambled, setScrambled] = useState("");
  const finalHeading = "Empowering The Community with AI & Robotics";

  // Simulated AI chat typing effect with mistake and backspace
  useEffect(() => {
    let mounted = true;
    const preText = "Empowering Business";
    const finalText = "Empowering The Community with AI & Robotics";
    let current = "";
    let i = 0;
    let phase: "typingPre" | "backspace" | "typingFinal" | "finish" = "typingPre";

    function step() {
      if (!mounted) return;

      if (phase === "typingPre") {
        if (i < preText.length) {
          current += preText[i];
          setScrambled(current + "");
          i++;
          setTimeout(step, 70);
        } else {
          phase = "backspace";
          setTimeout(step, 800);
        }
      } else if (phase === "backspace") {
        if (current.length > "Empowering ".length) {
          current = current.slice(0, -1);
          setScrambled(current + "|");
          setTimeout(step, 50);
        } else {
          phase = "typingFinal";
          i = "Empowering ".length;
          setTimeout(step, 200);
        }
      } else if (phase === "typingFinal") {
        if (i < finalText.length) {
          current += finalText[i];
          setScrambled(current + "");
          i++;
          if (i === finalText.length) {
            phase = "finish";
            setTimeout(step, 300);
          } else {
            setTimeout(step, 70);
          }
        }
      } else if (phase === "finish") {
        setScrambled(finalText + "");
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
