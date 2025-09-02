const swRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }
  try {
    await navigator.serviceWorker.register("/ourstory/sw.js", {
      scope: "/ourstory/",
    });
    console.log("Service worker registered successfully");
  } catch (error) {
    console.log("Failed to register service worker", error);
  }
};

export default swRegister;
