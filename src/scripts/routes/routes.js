import ListStoriesView from "../views/stories/list-stories-view";
import DetailStoryView from "../views/stories/detail-story-view";
import AddStoryView from "../views/stories/add-story-view";
import LoginView from "../views/auth/login-view";
import RegisterView from "../views/auth/register-view";
import HomePage from "../pages/home-page";
import AboutPage from "../pages/about-page";
import FavoriteStoriesView from "../views/stories/favorite-stories-view";

const routes = {
  "/": HomePage,
  "/stories": ListStoriesView,
  "/story/:id": DetailStoryView,
  "/add-story": AddStoryView,
  "/about": AboutPage,
  "/login": LoginView,
  "/register": RegisterView,
  "/favorites": FavoriteStoriesView,
};

export default routes;
