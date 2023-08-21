import { defineStore } from "pinia";
import { Group, OrthographicCamera, Scene } from "three";

export interface StoredScene {
  id: string;
  seed: number;
  cameraX: number;
  cameraY: number;
  title: string;
  subtitle: string;
  font: string;
  exportString?: string;
  appearance?: string;
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
