const loadingIndicator = document.getElementById("loading-indicator");
const notificationContainer = document.getElementById("notification-container");

const showLoading = () => {
  loadingIndicator.style.display = "flex";
};

const hideLoading = () => {
  loadingIndicator.style.display = "none";
};

const showSuccessNotification = (title, message) => {
  notificationContainer.innerHTML = `
    <div class="notification-modal">
      <div class="icon"><i class="fas fa-check-circle"></i></div>
      <h2>${title}</h2>
      <p>${message}</p>
    </div>
  `;
  notificationContainer.style.display = "flex";
  setTimeout(() => notificationContainer.classList.add("show"), 10);
};

const hideNotification = () => {
  notificationContainer.classList.remove("show");
  setTimeout(() => {
    notificationContainer.style.display = "none";
    notificationContainer.innerHTML = "";
  }, 300);
};

export { showLoading, hideLoading, showSuccessNotification, hideNotification };
