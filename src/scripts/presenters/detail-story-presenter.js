import { parseActivePathname } from "../routes/url-parser";

class DetailStoryPresenter {
  constructor({ view, model, story }) {
    this._view = view;
    this._model = model;
    this._story = story;
    this._initializeFavoriteButton();
  }

  async _initializeFavoriteButton() {
    const isFavorited = await this._isStoryFavorited();
    this._view.renderFavoriteButton(isFavorited);
    this._view.setupFavoriteButton(async () => {
      if (await this._isStoryFavorited()) {
        this._model.deleteStory(this._story.id);
      } else {
        this._model.putStory(this._story);
      }
      this._initializeFavoriteButton();
    });
  }

  async _isStoryFavorited() {
    const story = await this._model.getStory(this._story.id);
    return !!story;
  }
}

export default DetailStoryPresenter;
