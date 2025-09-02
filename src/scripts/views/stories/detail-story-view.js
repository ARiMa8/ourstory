import StoryApi from "../../data/story-api";
import DetailStoryPresenter from "../../presenters/detail-story-presenter";
import {
  createStoryDetailTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
} from "../templates/template-creator";
import { showLoading, hideLoading } from "../../utils/notifications";
import FavoriteStoryIdb from "../../data/favorite-story-idb";
import { parseActivePathname } from "../../routes/url-parser";

class DetailStoryView {
  render() {
    return `
      <div class="story-detail-page">
        <div id="story-detail-container"></div>
      </div>
    `;
  }

  async afterRender() {
    const url = parseActivePathname();
    const story = await StoryApi.getStoryDetail(url.id);

    this.showStory(story);

    const presenter = new DetailStoryPresenter({
      view: this,
      model: FavoriteStoryIdb,
      story: story,
    });
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

      const esriWorldImagery = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
      );

      openStreetMap.addTo(map);

      const baseMaps = {
        Street: openStreetMap,
        Satellite: esriWorldImagery,
      };

      L.control.layers(baseMaps).addTo(map);

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
    favoriteButtonContainer.innerHTML = isFavorited
      ? createFavoritedButtonTemplate()
      : createFavoriteButtonTemplate();
  }

  setupFavoriteButton(callback) {
    const favoriteButton = document.querySelector("#favorite-button");
    favoriteButton.addEventListener("click", callback);
  }
}

export default DetailStoryView;
