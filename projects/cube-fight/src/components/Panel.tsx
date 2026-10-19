import clsx from "clsx";
import { useEffect, useRef } from "react";

import { changeBase } from "../utils";

import type { PanelProps } from "../types";

export default function Panel(props: PanelProps) {
  const { selectedSkin, sideView, isCubesConnected, onSetSkin, onChangeView, onDisconnectCubes } = props;

  const skinDisabled = selectedSkin === null;

  const breakAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(changeBase("/sounds/whistle.mp3"));
    audio.preload = "auto";
    audio.load();
    breakAudio.current = audio;
    return () => {
      audio.pause();
      breakAudio.current = null;
    };
  }, []);

  function handleBreakButton() {
    onDisconnectCubes();
    const audio = breakAudio.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play();
  }

  return (
    <div className="nes-container with-title w-[320px] bg-red-800 border-red-950!">
      <p className="title text-black bg-red-800!">CUBE FIGHT</p>
      <p className="text-black">
        Select a fighter, choose a skin, and move it around the ring. Bring the fighters together to start boxing!
      </p>
      <div className="flex flex-col gap-2">
        <button
          className={clsx("nes-btn", skinDisabled ? "is-disabled" : "is-primary")}
          type="button"
          disabled={skinDisabled}
          onClick={() => onSetSkin("skin-blue")}
        >
          Blue Skin
        </button>
        <button
          className={clsx("nes-btn", skinDisabled ? "is-disabled" : "is-error")}
          type="button"
          disabled={skinDisabled}
          onClick={() => onSetSkin("skin-red")}
        >
          Red Skin
        </button>
        <button
          className={clsx("nes-btn", skinDisabled ? "is-disabled" : "is-warning")}
          type="button"
          disabled={skinDisabled}
          onClick={() => onSetSkin("skin-yellow")}
        >
          Yellow Skin
        </button>
        <button
          type="button"
          className={clsx("nes-btn", isCubesConnected ? "is-success" : "is-disabled")}
          onClick={handleBreakButton}
          disabled={!isCubesConnected}
        >
          Break
        </button>
        <button
          type="button"
          className="nes-btn"
          onClick={onChangeView}
        >
          {sideView ? "Top View" : "Side View"}
        </button>
      </div>
    </div>
  );
}
