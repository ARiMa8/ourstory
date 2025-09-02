import { parseActivePathname } from "../routes/url-parser";

class DetailStoryPresenter {
  constructor({ view, storyApi, favoriteDb }) {
    this._view = view;
    this._storyApi = storyApi;
    this._favoriteDb = favoriteDb;
    this._story = null;
  }

  async init() {
    this._view.showLoading();
    try {
      const url = parseActivePathname();
      const story = await this._storyApi.getStoryDetail(url.id);
      this._story = story;

      this._view.showStory(story);

      await this._initializeFavoriteButton();
    } catch (error) {
      console.error(error);
      this._view.showError("Gagal memuat detail cerita.");
    } finally {
      this._view.hideLoading();
    }
  }

  async _initializeFavoriteButton() {
    const isFavorited = await this._isStoryFavorited();
    this._view.renderFavoriteButton(isFavorited);
    this._view.setupFavoriteButton(async () => {
      if (await this._isStoryFavorited()) {
        await this._favoriteDb.deleteStory(this._story.id);
      } else {
        await this._favoriteDb.putStory(this._story);
      }
      await this._initializeFavoriteButton();
    });
  }

  async _isStoryFavorited() {
    if (!this._story) return false;
    const story = await this._favoriteDb.getStory(this._story.id);
    return !!story;
  }
}

export default DetailStoryPresenter;
