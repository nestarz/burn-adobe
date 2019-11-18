import { ref, watch } from "./vue.js";
import pdfjsLib from "./pdf.js";

const load = async (canvas, url) => {
  console.log("Loading...", url)
  const pdf = await pdfjsLib.getDocument(url).promise;
  console.log("PDF loaded");
  const pageNumber = 1;
  const page = await pdf.getPage(pageNumber);
  console.log("Page loaded");

  const scale = 3;
  const viewport = page.getViewport({ scale: scale });

  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  const renderTask = page.render(renderContext);
  renderTask.promise.then(function() {
    console.log("Page rendered");
  });
};

export default (urlRef, canvasRef) => {
  const loaded = ref(false);
  const error = ref(null);
  watch([canvasRef, urlRef], () => {
    if (!canvasRef) return;
    load(canvasRef.value, urlRef.value)
      .then(() => {
        loaded.value = true;
        error.value = null;
      })
      .catch(err => {
        loaded.value = false;
        error.value = err;
      });
  });

  return { loaded, error };
};
