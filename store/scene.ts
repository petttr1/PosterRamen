import { defineStore } from "pinia";
import { Vector4 } from "three";

export interface StoredScene {
  id: string;
  seed: number;
  cameraX: number;
  cameraY: number;
  title: string;
  subtitle: string;
  font: string;
  fontColor: string;
  textAlign: "left" | "center" | "right";
  verticalFlow: "column" | "column-reverse";
  horizontalFlow: "row" | "row-reverse";
  background: Vector4;
  color: Vector4;
  showBorders: boolean;
  showText: boolean;
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
