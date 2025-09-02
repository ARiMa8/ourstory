class AboutPage {
  async render() {
    return `
      <div class="about-container">
        <div class="about-header">
          <h2>Tentang OurStory</h2>
          <p>Bagikan dan jelajahi cerita dari seluruh penjuru dunia.</p>
        </div>
        <div class="about-features">
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-camera-retro"></i></div>
            <h3>Bagikan Momen Anda</h3>
            <p>Unggah cerita Anda dengan mudah, baik melalui unggahan file langsung maupun menggunakan kamera perangkat Anda.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-map-marked-alt"></i></div>
            <h3>Tandai Lokasi</h3>
            <p>Sematkan lokasi pada setiap cerita Anda dengan memilih titik di peta interaktif kami untuk memberikan konteks geografis.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-globe-asia"></i></div>
            <h3>Jelajahi Dunia</h3>
            <p>Lihat semua cerita dari pengguna lain yang tersebar di seluruh dunia melalui tampilan peta yang komprehensif.</p>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {}
}

export default AboutPage;
