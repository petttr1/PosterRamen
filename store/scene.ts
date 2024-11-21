import { defineStore } from "pinia";
import { Vector4 } from "three";

export interface StoredScene {
  id: string;
  seed: number;
  cameraX: number;
  cameraY: number;
  background: Vector4;
  color: Vector4;
  fullExportString?: string;
  exportLayers?: string[];
}

export const useSceneStore = defineStore({
  id: "scene-store",
  state: (): {
    scenes: Record<string, StoredScene>;
    activeSceneId: string | null;
  } => {
    return {
      scenes: {},
      activeSceneId: null,
    };
  },
  actions: {
    storeScene(data: Partial<StoredScene>) {
      const scene = this.scenes[data.id!] ?? {};
      this.scenes[data.id!] = { ...scene, ...data };
    },
    setActiveScene(id: string | null) {
      this.activeSceneId = id;
    },
  },
  getters: {
    scene: (state) => (id: string) => state.scenes[id] ?? {},
    activeScene: (state) => state.activeSceneId,
  },
});
