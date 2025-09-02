class LoginPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  async login({ email, password }) {
    this._view.showLoading();
    try {
      const response = await this._model.login({ email, password });
      this._view.hideLoading();

      if (!response.error) {
        this._view.showSuccessNotification(
          "Berhasil Masuk",
          "Mengalihkan ke halaman utama..."
        );
        this._view.navigateToHome();
      } else {
        this._view.showErrorAlert(response.message);
      }
    } catch (error) {
      this._view.hideLoading();
      this._view.showErrorAlert("Login gagal. Silakan coba lagi.");
    }
  }
}

export default LoginPresenter;
