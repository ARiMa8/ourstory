import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.mode === "navigate",
  new StaleWhileRevalidate({
    cacheName: "pages-cache",
  })
);

registerRoute(
  ({ url }) => url.href.startsWith("https://story-api.dicoding.dev/v1/"),
  new StaleWhileRevalidate({
    cacheName: "story-api-cache",
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
    cacheName: "image-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
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