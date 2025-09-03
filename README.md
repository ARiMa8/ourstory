# 📝 OurStory: A Progressive Web App for Sharing Stories

## This application is a final project developed for the "Belajar Pengembangan Web Intermediate" course at Dicoding Academy. It's a modern, installable, and offline-first Progressive Web App (PWA) for sharing and exploring stories with location data.

## ✨ Key Features
- Full RESTful API Integration: The app interacts with the Dicoding Story API to perform CRUD (Create, Read) operations on stories. All stories are persisted on a remote server.
- User Authentication: Includes a complete user flow with registration and login pages to manage stories securely.
- Model-View-Presenter (MVP) Architecture: The application is built using a strict MVP pattern with vanilla JavaScript, ensuring a clean separation of concerns between data (Model), display (View), and logic (Presenter).
- Progressive Web App (PWA):
   - Installable: Can be installed on desktop or mobile devices for a native-app-like experience.
   - Offline First: Utilizes a Service Worker (powered by Workbox) to cache the application shell, API responses, and images, allowing the app to be fully functional without an internet connection.
- IndexedDB for Offline Favorites: Users can save their favorite stories, which are stored locally using IndexedDB, making them accessible even when offline.
- Interactive Maps: Integrates Leaflet.js to display story locations on an interactive map with multiple layer controls (e.g., Street, Satellite).
- Device Feature Integration: Users can add new stories by uploading a file or directly capturing a photo using their device's camera.
- Modern Web Features: Implements smooth page transitions using the View Transitions API and allows users to subscribe to Push Notifications.
- Accessibility: Built with accessibility in mind, including features like a skip-to-content link and proper semantic HTML.

## ⚠️ Disclaimer
This repository is the result of a final project submission for the **"Belajar Pengembangan Web Intermediate"** course at Dicoding Academy. Please use this code as a reference for learning purposes only.

**Do not copy and paste this project for your own submission.** Plagiarism is strictly prohibited by Dicoding and will be detected.

## 🚀 Quick Start
### Clone the Repository:
Clone this repository and install all required dependencies:<br>
Bash<br>
```git clone https://github.com/arima8/ourstory.git```<br>
```cd ourstory```<br>
```npm install```

### Running the Development Server
Use the Webpack Dev Server to run the application in development mode with hot-reloading. The app will be available at http://localhost:9000.<br>
Bash<br>
```npm run start-dev```<br>

### Building for Production
Build the project for the production environment. All optimized files will be placed in the dist/ folder.<br>
Bash<br>
```npm run build```

## 🛠️ Technologies
- Front-End: Vanilla JavaScript (ESM), HTML5, CSS3
- Libraries:
   - leaflet: For interactive maps.
   - idb: A lightweight wrapper for IndexedDB.
- Build Tools:
   - webpack: As the module bundler and build tool.
   - babel: For transpiling modern JavaScript.
   - workbox: For generating the service worker and managing offline capabilities.
- API: https://story-api.dicoding.dev/v1

## 🖼️ Screenshots
### Login Page
<img width="1912" height="1000" alt="image" src="https://github.com/user-attachments/assets/a186ea02-64b1-4d2a-9056-120550d086af" />

### Register Page
<img width="1912" height="1000" alt="image" src="https://github.com/user-attachments/assets/9344f594-0c78-429d-85d0-9ba523f5b1bf" />

### Home Page
<img width="1912" height="1000" alt="image" src="https://github.com/user-attachments/assets/2ed77819-33df-48a3-8a2e-8f38a1e19392" />

### Stories Page
<img width="1912" height="2259" alt="image" src="https://github.com/user-attachments/assets/e6d37e29-99bb-4776-8dee-cb2519410ef8" />

### Favorite Page
<img width="1912" height="1000" alt="image" src="https://github.com/user-attachments/assets/8c14c1ee-f58c-42c9-8986-66ec7b27ddb5" />

### Detail Page
<img width="1912" height="2258" alt="image" src="https://github.com/user-attachments/assets/b7eb58e9-ef9a-4603-bad0-b45dfc6e1c54" />

### About Page
<img width="1912" height="1000" alt="image" src="https://github.com/user-attachments/assets/d595e4b8-236b-45fe-adb4-eda06c9ef921" />

### Add Story Page
<img width="1912" height="1207" alt="image" src="https://github.com/user-attachments/assets/6e96241b-b853-416e-9d17-e97e1700292a" />


## ⭐ Special Thanks
A big thank you to Dicoding for providing the Story API and an excellent, challenging learning platform. This project was an invaluable experience, pushing me through multiple revisions to master complex concepts like PWA, Service Workers, and a strict MVP architecture.
