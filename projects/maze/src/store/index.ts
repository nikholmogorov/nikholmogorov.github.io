import { create } from "zustand";
import bsod from "./bsod";
import usualAscii from "./usualAsciiArt";
import unusualAscii from "./unusualAsciiArt";

interface StoreState {
    unusualMode: boolean;
    setMode: (value: boolean) => void;
      asciiArt: {
        bsod: string,
        usualAscii: string,
        unusualAscii: string,
    },
}

const useStore = create<StoreState>((set) => ({
    unusualMode: false,
    setMode: (value) => set({ unusualMode: value }),

    asciiArt: {
        bsod,
        usualAscii,
        unusualAscii,
    },
}));

export default useStore;
