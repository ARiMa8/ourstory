class NotFoundView {
  render() {
    return `
      <div class="not-found-container" style="text-align: center; padding: 4rem 1rem;">
        <h2>404 - Halaman Tidak Ditemukan</h2>
        <p>Maaf, halaman yang Anda cari tidak ada. Kembali ke <a href="#/">halaman utama</a>.</p>
      </div>
    `;
  }

  async afterRender() {}
}

export default NotFoundView;
