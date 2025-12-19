"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
export function SettingsModal() {
  const [mode, setMode] = useState<string>(() => {
    if (typeof window === "undefined") return "countup";
    return (
      (localStorage.getItem("timer.mode") as "countup" | "countdown") ||
      "countup"
    );
  });

  const [duration, setDuration] = useState<string>(() => {
    if (typeof window === "undefined") return "00:00:00";
    return localStorage.getItem("timer.initial") || "00:00:00";
  });

  const handleSave = () => {
    try {
      localStorage.setItem("timer.mode", mode);
      localStorage.setItem("timer.initial", duration);
    } catch (e) {
      console.error("Failed to save timer settings", e);
    }
  };

  return (
    <Dialog>
      {/*Trigger Button*/}
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Settings />
          <span>Open Settings</span>
        </Button>
      </DialogTrigger>
      {/*Dialog Content*/}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Adjust according to your preferences
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Counter
            </Label>
            <Input
              id="timer"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mode" className="text-right">
              Mode
            </Label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="col-span-3 rounded-md border px-2 py-1"
            >
              <option value="countup">Count Up</option>
              <option value="countdown">Count Down</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
