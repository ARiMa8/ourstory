class RegisterPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  async register({ name, email, password }) {
    try {
      const response = await this._model.register({ name, email, password });
      if (!response.error) {
        this._view.showSuccessAlert("Registrasi berhasil! Silakan login.");
        this._view.navigateToLogin();
      } else {
        this._view.showErrorAlert(response.message);
      }
    } catch (error) {
      this._view.showErrorAlert("Registrasi gagal. Silakan coba lagi.");
    }
  }
}

export default RegisterPresenter;
