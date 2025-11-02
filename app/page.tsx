import { SettingsModal } from "@/features/settings/SettingsModal";
import { Timer } from "@/features/timer/Timer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header>
        <SettingsModal />
      </header>
      <main className="flex items-start min-h-screen min-w-screen justify-center">
        <Timer />
      </main>
    </>
  );
}
