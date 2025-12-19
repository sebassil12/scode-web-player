"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { formatTime, parseTimeString, playAlarm } from "@/lib/utils";
import { PlayPauseIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { showNotification } from "@/lib/notifications";

export function Timer() {
  const [mode, setMode] = useState<"countup" | "countdown">(() => {
    if (typeof window === "undefined") return "countup";
    return (
      (localStorage.getItem("timer.mode") as "countup" | "countdown") ||
      "countup"
    );
  });

  const [initialSeconds, setInitialSeconds] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem("timer.initial");
    return saved ? parseTimeString(saved) : 0;
  });

  const [seconds, setSeconds] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const savedInitial = localStorage.getItem("timer.initial");
    const savedMode = localStorage.getItem("timer.mode");
    if (savedMode === "countdown" && savedInitial) {
      return parseTimeString(savedInitial);
    }
    return 0;
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (mode === "countdown") {
            if (prev <= 1) {
              setIsActive(false);
              try {
                playAlarm();
                showNotification();
              } catch (e) {
                console.error("Error on timer end actions", e);
              }
              return 0;
            }
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode]); // Añadimos mode a las dependencias para mayor seguridad

  const togglePlayPause = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(mode === "countdown" ? initialSeconds : 0);
  };

  return (
    <Card className="w-350px shadow-lg">
      <CardHeader>
        <CardTitle>Web Timer</CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-6xl font-mono text-center">
        {formatTime(seconds)}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={togglePlayPause}
          variant="outline"
          className="flex gap-2"
        >
          {isActive ? "Pause" : "Start"}
          <PlayPauseIcon className="w-4 h-4" />
        </Button>
        <Button onClick={resetTimer} className="flex gap-2">
          Restart
          <ArrowPathIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
