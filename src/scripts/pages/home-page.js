class HomePage {
  async render() {
    return `
      <div class="home-container">
        <h1>Masuki Dunia Penuh Cerita Kami</h1>
        <p>Jelajahi berbagai pengalaman atau bagikan ceritamu sendiri.</p>
        <div class="home-buttons">
          <a href="#/stories" class="btn btn-primary"><i class="fas fa-book-open"></i> Jelajahi Cerita</a>
          <a href="#/add-story" class="btn btn-secondary"><i class="fas fa-plus-circle"></i> Buat Cerita Baru</a>
        </div>
      </div>
    `;
  }

  async afterRender() {}
}

export default HomePage;
