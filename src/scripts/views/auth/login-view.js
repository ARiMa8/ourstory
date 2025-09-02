import StoryApi from "../../data/story-api";
import LoginPresenter from "../../presenters/login-presenter";
import {
  showLoading,
  hideLoading,
  showSuccessNotification,
  hideNotification,
} from "../../utils/notifications";

class LoginView {
  render() {
    return `
      <div class="form-container">
        <h2>Login to OurStory</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    `;
  }

  async afterRender() {
    const presenter = new LoginPresenter({ view: this, model: StoryApi });

    document
      .getElementById("login-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        presenter.login({ email, password });
      });
  }

  showLoading() {
    showLoading();
  }

  hideLoading() {
    hideLoading();
  }

  showSuccessNotification(title, message) {
    showSuccessNotification(title, message);
  }

  navigateToHome() {
    setTimeout(() => {
      hideNotification();
      window.location.hash = "#/";
      location.reload();
    }, 2000);
  }

  showErrorAlert(message) {
    alert(message);
  }
}

export default LoginView;
