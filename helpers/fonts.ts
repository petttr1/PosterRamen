const fonts = [
  "Goldman",
  "Inter",
  "Press Start 2P",
  "Righteous",
  "Space Grotesk",
];

function sampleFont() {
  const { $random } = useNuxtApp();
  const index = Math.floor($random.$getRandom() * fonts.length);
  return fonts[index];
}
export { sampleFont };
