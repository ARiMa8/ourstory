import StoryApi from "../../data/story-api";
import ListStoriesPresenter from "../../presenters/list-stories-presenter";
import { createStoryCardTemplate } from "../templates/template-creator";
import { showLoading, hideLoading } from "../../utils/notifications";

class ListStoriesView {
  render() {
    return `
      <h2>Peta Cerita</h2>
      <div id="stories-map" class="stories-map"></div>
      <h2 style="margin-top: 2rem;">Jelajahi Cerita</h2>
      <div class="stories-list" id="stories-list"></div>
      <div class="pagination-controls" id="pagination-controls">
        <button id="prev-page" class="btn btn-secondary" disabled>Sebelumnya</button>
        <span id="page-indicator">Halaman 1</span>
        <button id="next-page" class="btn btn-primary">Selanjutnya</button>
      </div>
    `;
  }

  async afterRender() {
    const presenter = new ListStoriesPresenter({ view: this, model: StoryApi });
    presenter.getStories();
  }

  showLoading() {
    showLoading();
  }

  hideLoading() {
    hideLoading();
  }

  showStories(stories) {
    const storiesContainer = document.querySelector("#stories-list");
    storiesContainer.innerHTML = "";
    if (stories.length === 0) {
      storiesContainer.innerHTML =
        '<p class="empty-message">Belum ada cerita untuk ditampilkan.</p>';
      return;
    }
    stories.forEach((story) => {
      storiesContainer.innerHTML += createStoryCardTemplate(story);
    });
  }

  renderMap(stories) {
    const mapContainer = document.querySelector("#stories-map");
    if (mapContainer && mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
    }

    const storiesWithLocation = stories.filter(
      (story) => story.lat && story.lon
    );

    if (storiesWithLocation.length > 0) {
      const map = L.map("stories-map").setView(
        [storiesWithLocation[0].lat, storiesWithLocation[0].lon],
        5
      );

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

      storiesWithLocation.forEach((story) => {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(
            `<div class="map-popup">
              <img src="${story.photoUrl}" alt="${story.name}">
              <h5>${story.name}</h5>
              <p>${story.description.substring(0, 50)}...</p>
              <a href="#/story/${story.id}">Lihat Detail</a>
            </div>`
          );
      });
    } else {
      mapContainer.innerHTML =
        '<p class="empty-message">Tidak ada cerita dengan data lokasi untuk ditampilkan di peta.</p>';
    }
  }

  updatePagination(currentPage, hasMoreStories) {
    document.querySelector(
      "#page-indicator"
    ).textContent = `Halaman ${currentPage}`;
    document.querySelector("#prev-page").disabled = currentPage === 1;
    document.querySelector("#next-page").disabled = !hasMoreStories;
  }

  setupPaginationEvents(prevHandler, nextHandler) {
    document.querySelector("#prev-page").addEventListener("click", prevHandler);
    document.querySelector("#next-page").addEventListener("click", nextHandler);
  }

  showError(message) {
    const storiesContainer = document.querySelector("#stories-list");
    storiesContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }
}

export default ListStoriesView;
