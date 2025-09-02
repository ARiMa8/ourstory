import { getActiveRoute } from "../routes/url-parser";
import routes from "../routes/routes";
import SessionManager from "../utils/session-manager";
import NotFoundView from "../views/not-found-view";

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = getActiveRoute();
    if (
      !SessionManager.isUserLoggedIn() &&
      !["/login", "/register"].includes(url)
    ) {
      window.location.hash = "#/login";
      return;
    }

    const Page = routes[url] || NotFoundView;
    const page = new Page();

    const renderLogic = async () => {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    };

    if (document.startViewTransition) {
      document.startViewTransition(renderLogic);
    } else {
      await renderLogic();
    }
  }
}

export default App;
