import { create } from "zustand";
import bsod from "./bsod";
import usualAscii from "./usualAsciiArt";
import unusualAscii from "./unusualAsciiArt";

const useStore = create((set) => ({
    unusualMode: false,
    setMode: (value) => set({ unusualMode: value }),

    asciiArt: {
        bsod,
        usualAscii,
        unusualAscii,
    },
}));

export default useStore;
