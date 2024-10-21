import type { Quad, Triplet } from "@react-three/cannon";
import { epsilon } from "@utils/const";
import { quadsAlmostEqual, tripletsAlmostEqual } from "@utils/helper";
import { create } from "zustand";

interface State {
  position: Triplet;
  quaternion: Quad;
}

interface Actions {
  setPosition: (position: Triplet) => void;
  setQuaternion: (position: Quad) => void;
}

export const useCubeStore = create<State & Actions>((set, get) => ({
  position: [0, 0, 0],
  setPosition: (newPosition: Triplet) => {
    const currentPosition = get().position;
    if (!tripletsAlmostEqual(currentPosition, newPosition, epsilon)) {
      set({ position: newPosition });
    }
  },
  quaternion: [0, 0, 0, 0],
  setQuaternion: (newQuaternion: Quad) => {
    const currentQuaternion = get().quaternion;
    if (!quadsAlmostEqual(currentQuaternion, newQuaternion, epsilon)) {
      set({ quaternion: newQuaternion });
    }
  },
}));
