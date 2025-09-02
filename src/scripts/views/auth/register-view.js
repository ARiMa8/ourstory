import StoryApi from "../../data/story-api";
import RegisterPresenter from "../../presenters/register-presenter";

class RegisterView {
  render() {
    return `
      <div class="form-container">
        <h2>Register for OurStory</h2>
        <form id="register-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" minlength="8" required>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    `;
  }

  async afterRender() {
    const presenter = new RegisterPresenter({ view: this, model: StoryApi });

    document
      .getElementById("register-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        presenter.register({ name, email, password });
      });
  }

  showSuccessAlert(message) {
    alert(message);
  }

  showErrorAlert(message) {
    alert(message);
  }

  navigateToLogin() {
    window.location.hash = "#/login";
  }
}

export default RegisterView;
