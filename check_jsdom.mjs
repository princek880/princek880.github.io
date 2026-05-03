import { JSDOM, VirtualConsole } from 'jsdom';

const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {
  console.log("CONSOLE ERROR:", ...arguments);
});
virtualConsole.on("jsdomError", (err) => {
  console.log("JSDOM ERROR:", err.message, err.detail);
});

(async () => {
  const dom = await JSDOM.fromURL("http://localhost:5173", {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    virtualConsole
  });
  
  setTimeout(() => {
    process.exit(0);
  }, 2000);
})();
