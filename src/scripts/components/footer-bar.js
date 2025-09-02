class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <p>ARiMa OurStory App &copy; 2025</p>
      </footer>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
