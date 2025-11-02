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
