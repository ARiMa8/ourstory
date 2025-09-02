import StoryApi from "../data/story-api";
import CONFIG from "../config";

const NotificationHelper = {
  async init() {
    if (!("Notification" in window)) {
      console.log("Browser does not support notifications.");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.log("Browser does not support service workers.");
      return;
    }

    if (!("PushManager" in window)) {
      console.log("Browser does not support Push API.");
      return;
    }
  },

  async requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted.");
      throw new Error("Notification permission not granted.");
    }
  },

  async subscribe() {
    try {
      await this.requestNotificationPermission();
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription =
        await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this._urlBase64ToUint8Array(
            CONFIG.VAPID_PUBLIC_KEY
          ),
        });

      await StoryApi.subscribeNotification(subscription);
      console.log("Successfully subscribed to notifications.");
      alert("Anda berhasil subscribe notifikasi!");
    } catch (error) {
      console.error("Failed to subscribe to notifications:", error);
      alert("Gagal melakukan subscribe. Pastikan Anda mengizinkan notifikasi.");
    }
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default NotificationHelper;
