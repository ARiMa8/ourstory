import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigations-cache",
    networkTimeoutSeconds: 3, 
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
registerRoute(navigationRoute);

registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst({
    cacheName: "html-cache",
    networkTimeoutSeconds: 3,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => 
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.href.startsWith("https://story-api.dicoding.dev/v1/"),
  new NetworkFirst({
    cacheName: "story-api-cache",
    networkTimeoutSeconds: 5,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => 
    request.destination === "font" ||
    request.url.includes("fonts.googleapis.com") ||
    request.url.includes("fonts.gstatic.com"),
  new StaleWhileRevalidate({
    cacheName: "fonts-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ url }) => 
    url.href.includes("tile.openstreetmap.org") ||
    url.href.includes("server.arcgisonline.com") ||
    url.href.includes("unpkg.com/leaflet"),
  new CacheFirst({
    cacheName: "maps-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.mode === "navigate",
  async ({ event }) => {
    try {
      return await caches.match(event.request) || 
             await caches.match("/") || 
             new Response("Offline - Halaman tidak tersedia", {
               status: 200,
               headers: { "Content-Type": "text/html" }
             });
    } catch (error) {
      return new Response("Offline - Halaman tidak tersedia", {
        status: 200,
        headers: { "Content-Type": "text/html" }
      });
    }
  }
);

self.addEventListener("push", function (event) {
  let body;
  try {
    body = event.data.json();
  } catch (error) {
    body = {
      title: 'Push Notification',
      options: {
        body: event.data.text(),
      },
    };
  }

  event.waitUntil(
    self.registration.showNotification(body.title, {
      body: body.options.body,
      icon: "favicon.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    })
  );
});

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    self.clients.claim()
  );
});