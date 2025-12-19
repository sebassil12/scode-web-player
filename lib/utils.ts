import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Function created for shdcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format the seconds in a string HH:MM:SS
 * @param seconds Number of seconds
 * @returns Formatted string
 */
export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secods = Math.floor(seconds % 60);

  // HH:MM:SS eguals 00:00:00
  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(secods)}`;
}

/**
 * Parse a time string in HH:MM:SS or MM:SS or SS into total seconds.
 * Returns 0 for invalid input.
 */
export function parseTimeString(timeStr: string) {
  if (!timeStr) return 0;
  const parts = timeStr.split(":").map((p) => p.trim());
  if (parts.some((p) => p === "")) return 0;

  // support SS, MM:SS, HH:MM:SS
  let seconds = 0;
  if (parts.length === 1) {
    const s = Number(parts[0]);
    seconds = Number.isFinite(s) ? Math.max(0, Math.floor(s)) : 0;
  } else if (parts.length === 2) {
    const m = Number(parts[0]);
    const s = Number(parts[1]);
    seconds =
      (Number.isFinite(m) ? Math.max(0, Math.floor(m)) : 0) * 60 +
      (Number.isFinite(s) ? Math.max(0, Math.floor(s)) : 0);
  } else if (parts.length === 3) {
    const h = Number(parts[0]);
    const m = Number(parts[1]);
    const s = Number(parts[2]);
    seconds =
      (Number.isFinite(h) ? Math.max(0, Math.floor(h)) : 0) * 3600 +
      (Number.isFinite(m) ? Math.max(0, Math.floor(m)) : 0) * 60 +
      (Number.isFinite(s) ? Math.max(0, Math.floor(s)) : 0);
  }

  return seconds;
}

interface WindowWithWebkit extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export function playAlarm() {
  try {
    const AudioCtx =
      window.AudioContext || (window as WindowWithWebkit).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    o.stop(ctx.currentTime + 1.25);
    // close context after sound finishes
    setTimeout(() => {
      try {
        ctx.close();
      } catch (e) {
        console.error("Failed to close audio context", e);
      }
    }, 1400);
  } catch (e) {
    console.error("Failed to play alarm sound", e);
  }
}
