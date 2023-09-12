import { StoredScene } from "~/store/scene";
import { Vector3 } from "three";

function serializeScene(scene: StoredScene) {
  const stored = { ...scene };
  const user = useSupabaseUser();
  return {
    userId: user.value.id,
    id: stored.id,
    seed: stored.seed,
    cameraX: stored.cameraX ?? 0,
    cameraY: stored.cameraY ?? 0,
    title: stored.title ?? "",
    subtitle: stored.subtitle ?? "",
    paragraph: stored.paragraph ?? "",
    font: stored.font ?? "Goldman",
    fontColor: stored.fontColor ?? "rgb(0,0,0)",
    textAlign: stored.textAlign ?? "left",
    verticalFlow: stored.verticalFlow ?? "column",
    horizontalFlow: stored.horizontalFlow ?? "row",
    background:
      `${stored.background.x};${stored.background.y};${stored.background.z}` ??
      "0;0;0",
    color: `${stored.color.x};${stored.color.y};${stored.color.z}` ?? "1;1;1",
    showBorders: stored.showBorders ?? true,
    exportString: stored.exportString ?? null,
  };
}

function deserializeScene(scene: any) {
  const vectorFromString = (str: string) => {
    const [r, g, b] = str.split(";");
    return new Vector3(-r ?? 0, -g ?? 0, -b ?? 0);
  };
  return {
    id: scene.id,
    seed: scene.seed,
    cameraX: scene.cameraX ?? 0,
    cameraY: scene.cameraY ?? 0,
    title: scene.title ?? "",
    subtitle: scene.subtitle ?? "",
    paragraph: scene.paragraph ?? "",
    font: scene.font ?? "Goldman",
    fontColor: scene.fontColor ?? "rgb(0,0,0)",
    textAlign: scene.textAlign ?? "left",
    verticalFlow: scene.verticalFlow ?? "column",
    horizontalFlow: scene.horizontalFlow ?? "row",
    background: vectorFromString(scene.background),
    color: vectorFromString(scene.color),
    showBorders: scene.showBorders ?? true,
    exportString: scene.exportString ?? null,
  };
}

async function storeScene(scene: StoredScene) {
  const supabase = useSupabaseClient();
  const serialized = serializeScene(scene);
  try {
    // @ts-ignore
    await supabase.from("Designs").upsert(serialized, { returning: "minimal" });
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getDatabaseScenes() {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  let { data } = await supabase
    .from("designs")
    .select()
    .eq("userId", user.value.id);
  return data?.map((scene) => deserializeScene(scene)) ?? [];
}
export { storeScene, getDatabaseScenes };
