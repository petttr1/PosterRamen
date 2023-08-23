async function storeScene(scene: {
  userId: string;
  seed: number;
  cameraX: number;
  cameraY: number;
  title: string;
  subtitle: string;
  font: string;
}) {
  const supabase = useSupabaseClient();
  try {
    // @ts-ignore
    let { data, error } = await supabase.from("scenes").upsert(scene, {});
    // @ts-ignore
    return data!.id;
  } catch (e) {
    console.error(e);
    return null;
  }
}
export { storeScene };
