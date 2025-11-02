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
import { formatTime } from "@/lib/utils";
import { clear } from "console";

export function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const togglePlayPause = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle>Web Timer</CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-6xl font-mono text-center">
        {formatTime(seconds)}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={togglePlayPause}>
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer}>Restart</Button>
      </CardFooter>
    </Card>
  );
}
