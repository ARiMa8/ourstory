class ListStoriesPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    this._currentPage = 1;
    this._hasMoreStories = true;
  }

  async getStories() {
    this._view.setupPaginationEvents(
      this._onPrevPage.bind(this),
      this._onNextPage.bind(this)
    );
    this._renderPage();
  }

  async _renderPage() {
    this._view.showLoading();
    try {
      const stories = await this._model.getAllStories(this._currentPage);
      this._hasMoreStories = stories.length >= 10;
      this._view.showStories(stories);
      this._view.renderMap(stories);
      this._view.updatePagination(this._currentPage, this._hasMoreStories);
    } catch (error) {
      console.error(error);
      this._view.showError("Gagal memuat cerita. Silakan coba lagi nanti.");
    } finally {
      this._view.hideLoading();
    }
  }

  _onPrevPage() {
    if (this._currentPage > 1) {
      this._currentPage -= 1;
      this._renderPage();
    }
  }

  _onNextPage() {
    if (this._hasMoreStories) {
      this._currentPage += 1;
      this._renderPage();
    }
  }
}

export default ListStoriesPresenter;
