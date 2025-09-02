import CONFIG from "../config";
import SessionManager from "../utils/session-manager";

const StoryApi = {
  async register({ name, email, password }) {
    const response = await fetch(CONFIG.BASE_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  async login({ email, password }) {
    const response = await fetch(CONFIG.BASE_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();

    if (!responseJson.error) {
      SessionManager.setUser(responseJson.loginResult);
    }
    return responseJson;
  },

  async getAllStories(page = 1, size = 10) {
    const response = await fetch(
      `${CONFIG.BASE_URL}/stories?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${SessionManager.getToken()}`,
        },
      }
    );
    const responseJson = await response.json();
    return responseJson.listStory;
  },

  async getStoryDetail(id) {
    const response = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${SessionManager.getToken()}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.story;
  },

  async addNewStory({ description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat) formData.append("lat", lat);
    if (lon) formData.append("lon", lon);

    const response = await fetch(CONFIG.BASE_URL + "/stories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SessionManager.getToken()}`,
      },
      body: formData,
    });
    return response.json();
  },

  async subscribeNotification(subscription) {
    const rawSubscription = subscription.toJSON();
    const response = await fetch(CONFIG.BASE_URL + "/notifications/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SessionManager.getToken()}`,
      },
      body: JSON.stringify({
        endpoint: rawSubscription.endpoint,
        keys: {
          p256dh: rawSubscription.keys.p256dh,
          auth: rawSubscription.keys.auth,
        },
      }),
    });
    return response.json();
  },
};

export default StoryApi;
