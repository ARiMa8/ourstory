import SessionManager from "../utils/session-manager";
import { getActivePathname } from "../routes/url-parser";
import NotificationHelper from "../utils/notification-helper";

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this._setupEventListeners();
    this._highlightActiveLink();
    window.addEventListener("hashchange", () => this._highlightActiveLink());
  }

  render() {
    const isLoggedIn = SessionManager.isUserLoggedIn();
    this.innerHTML = `
      <header class="app-bar">
        <div class="app-bar__brand"> <a href="#/"><h1>OurStory</h1></a> </div>
        <button class="app-bar__menu-button" id="menu-button" aria-label="Open Navigation Menu">☰</button>
        <nav class="app-bar__navigation" id="navigation-drawer">
          <ul>
            <li><a href="#/stories">Story</a></li>
            <li><a href="#/favorites">Favorit</a></li> <li><a href="#/about">About</a></li>
            ${
              isLoggedIn
                ? `
              <li><a href="#/add-story">Add Story</a></li>
              <li><button id="subscribe-button" class="btn-subscribe" title="Subscribe to Notifications"><i class="fas fa-bell"></i></button></li>
              <li><button id="logout-button" class="btn-logout"><i class="fas fa-sign-out-alt"></i> Keluar</button></li>
            `
                : `
              <li><a href="#/login">Login</a></li>
              <li><a href="#/register">Register</a></li>
            `
            }
          </ul>
        </nav>
      </header>
    `;
    if (isLoggedIn) {
      this.querySelector("#logout-button").addEventListener(
        "click",
        SessionManager.logout
      );
      this.querySelector("#subscribe-button").addEventListener("click", () => {
        NotificationHelper.subscribe();
      });
    }
  }

  _setupEventListeners() {
    const menuButton = this.querySelector("#menu-button");
    const drawer = this.querySelector("#navigation-drawer");
    const mainContent = document.querySelector("#main-content");

    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      drawer.classList.toggle("open");
    });

    mainContent.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  }

  _highlightActiveLink() {
    const currentPath = getActivePathname();
    const navLinks = this.querySelectorAll(".app-bar__navigation a");

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href").substring(1);

      link.classList.remove("active");
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
  }
}

customElements.define("app-bar", AppBar);
