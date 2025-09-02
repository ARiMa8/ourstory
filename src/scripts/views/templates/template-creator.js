const createStoryCardTemplate = (story) => `
  <div class="story-card">
    <div class="story-card__image">
      <img src="${story.photoUrl}" alt="Story by ${story.name}">
    </div>
    <div class="story-card__content">
      <h3><a href="#/story/${story.id}">${story.name}</a></h3>
      <p>${story.description.substring(0, 100)}...</p>
      <small class="story-date">Created: ${new Date(
        story.createdAt
      ).toLocaleDateString("id-ID")}</small>
    </div>
  </div>
`;

const createStoryDetailTemplate = (story) => `
  <div class="story-detail">
      <img src="${story.photoUrl}" alt="Story by ${
  story.name
}" class="story-detail__image">
      <div class="story-detail__content">
          <h2>${story.name}</h2>
          <p>${story.description}</p>
          <small>Created at: ${new Date(
            story.createdAt
          ).toLocaleString()}</small>
          <div id="favorite-button-container"></div> </div>
      ${
        story.lat && story.lon
          ? `<div id="map-detail" class="map-container"></div>`
          : ""
      }
  </div>
`;

const createFavoriteButtonTemplate = () => `
  <button aria-label="tambahkan ke favorit" id="favorite-button" class="favorite">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createFavoritedButtonTemplate = () => `
  <button aria-label="hapus dari favorit" id="favorite-button" class="favorite">
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createStoryCardTemplate,
  createStoryDetailTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate,
};
