import FavoriteStoryIdb from "../../data/favorite-story-idb";
import { createStoryCardTemplate } from "../templates/template-creator";

class FavoriteStoriesView {
  render() {
    return `
      <div class="content">
        <h2 class="content__heading">Cerita Favorit Anda</h2>
        <div id="stories-list" class="stories-list"></div>
      </div>
    `;
  }

  async afterRender() {
    const stories = await FavoriteStoryIdb.getAllStories();
    const storiesContainer = document.querySelector("#stories-list");

    if (stories.length === 0) {
      storiesContainer.innerHTML = `
        <p class="empty-message">Anda belum memiliki cerita favorit.</p>
      `;
    } else {
      stories.forEach((story) => {
        storiesContainer.innerHTML += createStoryCardTemplate(story);
      });
    }
  }
}

export default FavoriteStoriesView;
