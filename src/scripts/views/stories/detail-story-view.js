import StoryApi from "../../data/story-api";
import DetailStoryPresenter from "../../presenters/detail-story-presenter";
import {
  createStoryDetailTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
} from "../templates/template-creator";
import { showLoading, hideLoading } from "../../utils/notifications";
import FavoriteStoryIdb from "../../data/favorite-story-idb";

class DetailStoryView {
  render() {
    return `
      <div class="story-detail-page">
        <div id="story-detail-container"></div>
      </div>
    `;
  }

  async afterRender() {
    const presenter = new DetailStoryPresenter({
      view: this,
      storyApi: StoryApi,
      favoriteDb: FavoriteStoryIdb,
    });
    presenter.init();
  }

  showLoading() {
    showLoading();
  }

  hideLoading() {
    hideLoading();
  }

  showStory(story) {
    const storyContainer = document.querySelector("#story-detail-container");
    storyContainer.innerHTML = createStoryDetailTemplate(story);

    if (story.lat && story.lon) {
      const map = L.map("map-detail").setView([story.lat, story.lon], 13);
      const openStreetMap = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );
      openStreetMap.addTo(map);
      L.marker([story.lat, story.lon])
        .addTo(map)
        .bindPopup(story.name)
        .openPopup();
    }
  }

  showError(message) {
    const storyContainer = document.querySelector("#story-detail-container");
    storyContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }

  renderFavoriteButton(isFavorited) {
    const favoriteButtonContainer = document.querySelector(
      "#favorite-button-container"
    );
    if (favoriteButtonContainer) {
      favoriteButtonContainer.innerHTML = isFavorited
        ? createFavoritedButtonTemplate()
        : createFavoriteButtonTemplate();
    }
  }

  setupFavoriteButton(callback) {
    const favoriteButton = document.querySelector("#favorite-button");
    if (favoriteButton) {
      favoriteButton.addEventListener("click", callback);
    }
  }
}

export default DetailStoryView;
