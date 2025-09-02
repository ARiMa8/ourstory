class AddStoryPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  async addStory(formData) {
    if (!formData.photo) {
      this._view.showErrorAlert(
        "Mohon unggah atau ambil foto terlebih dahulu!"
      );
      return;
    }

    this._view.showLoading();
    try {
      const response = await this._model.addNewStory({
        description: formData.description,
        photo: formData.photo,
        lat: formData.lat ? parseFloat(formData.lat) : undefined,
        lon: formData.lon ? parseFloat(formData.lon) : undefined,
      });

      this._view.hideLoading();
      if (!response.error) {
        this._view.showSuccessNotification(
          "Berhasil!",
          "Cerita Anda telah dipublikasikan."
        );
        this._view.navigateToStories();
      } else {
        this._view.showErrorAlert(response.message);
      }
    } catch (error) {
      this._view.hideLoading();
      this._view.showErrorAlert("Gagal menambahkan cerita. Silakan coba lagi.");
      console.error(error);
    }
  }
}

export default AddStoryPresenter;
