import StoryApi from "../../data/story-api";
import AddStoryPresenter from "../../presenters/add-story-presenter";
import {
  showLoading,
  hideLoading,
  showSuccessNotification,
  hideNotification,
} from "../../utils/notifications";

class AddStoryView {
  constructor() {
    this._stream = null;
    this._capturedPhotoBlob = null;
  }

  render() {
    return `
      <div class="form-container">
        <h2>Ceritakan Pengalaman Anda</h2>
        <form id="add-story-form">
          <div class="form-group">
            <label for="description">Deskripsi</label>
            <textarea id="description" name="description" rows="4" required placeholder="Tuliskan momen spesial Anda..."></textarea>
          </div>
          <div class="form-group">
            <label>Unggah Foto</label>
            <div class="camera-container" id="camera-container" style="display:none;">
              <video id="video-preview" autoplay></video>
              <canvas id="canvas" style="display:none;"></canvas>
              <button type="button" id="capture-button" class="btn btn-primary" style="margin-top: 10px;"><i class="fas fa-camera"></i> Ambil Foto</button>
            </div>
            <button type="button" id="activate-camera-button" class="btn btn-secondary"><i class="fas fa-camera"></i> Aktifkan Kamera</button>
            <p class="separator" style="margin: 15px 0;">atau</p>
            <input type="file" id="photo-upload" name="photo" accept="image/*" class="form-input-file">
            <img id="image-preview" src="#" alt="Image preview" style="display:none; max-width: 100%; margin-top: 10px; border-radius: 8px;"/>
            <p id="photo-status" style="margin-top: 5px; font-size: 0.9em; color: #555;">Belum ada foto terpilih.</p>
          </div>
          <div class="form-group map-container">
            <label>Pilih Lokasi</label>
            <div id="map-picker"></div>
            <input type="hidden" id="latitude" name="latitude">
            <input type="hidden" id="longitude" name="longitude">
            <p id="location-info" style="margin-top: 8px;">Klik peta untuk menentukan lokasi Anda.</p>
          </div>
          <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Kirim Cerita Anda</button>
        </form>
      </div>
    `;
  }

  async afterRender() {
    const presenter = new AddStoryPresenter({ view: this, model: StoryApi });

    window.addEventListener("hashchange", this.cleanup.bind(this), {
      once: true,
    });

    this._setupCamera();
    this._setupFileUpload();
    this._setupMapPicker();

    document
      .getElementById("add-story-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        presenter.addStory(this._getFormData());
      });
  }

  showLoading() {
    showLoading();
  }
  hideLoading() {
    hideLoading();
  }
  showSuccessNotification(title, message) {
    showSuccessNotification(title, message);
  }
  showErrorAlert(message) {
    alert(message);
  }

  navigateToStories() {
    setTimeout(() => {
      hideNotification();
      window.location.hash = "#/stories";
    }, 2000);
  }

  cleanup() {
    if (this._stream) {
      this._stream.getTracks().forEach((track) => track.stop());
    }
  }

  _getFormData() {
    const description = document.getElementById("description").value;
    const lat = document.getElementById("latitude").value;
    const lon = document.getElementById("longitude").value;
    const photoUpload = document.getElementById("photo-upload");

    let photo = null;
    if (this._capturedPhotoBlob) {
      photo = this._capturedPhotoBlob;
    } else if (photoUpload.files && photoUpload.files[0]) {
      photo = photoUpload.files[0];
    }
    return { description, photo, lat, lon };
  }

  _setupCamera() {
    const activateCameraButton = document.querySelector(
      "#activate-camera-button"
    );
    const captureButton = document.querySelector("#capture-button");
    const video = document.querySelector("#video-preview");
    const canvas = document.querySelector("#canvas");
    const cameraContainer = document.querySelector("#camera-container");
    const photoUpload = document.querySelector("#photo-upload");
    const imagePreview = document.querySelector("#image-preview");
    const photoStatus = document.querySelector("#photo-status");

    activateCameraButton.addEventListener("click", async () => {
      if (this._stream) {
        this._stream.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
        cameraContainer.style.display = "none";
        activateCameraButton.innerHTML =
          '<i class="fas fa-camera"></i> Aktifkan Kamera';
        this._capturedPhotoBlob = null;
        return;
      }

      try {
        this.showLoading();
        this._stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        video.srcObject = this._stream;
        cameraContainer.style.display = "block";
        activateCameraButton.innerHTML =
          '<i class="fas fa-stop-circle"></i> Matikan Kamera';
        photoUpload.style.display = "none";
        imagePreview.style.display = "none";
        photoStatus.textContent = "Menggunakan kamera...";
      } catch (err) {
        this.showErrorAlert(
          "Tidak bisa mengakses kamera. Mohon izinkan akses kamera."
        );
      } finally {
        this.hideLoading();
      }
    });

    captureButton.addEventListener("click", () => {
      if (this._stream) {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        imagePreview.src = canvas.toDataURL("image/jpeg");
        imagePreview.style.display = "block";
        photoStatus.textContent = "Foto dari kamera berhasil diambil.";

        canvas.toBlob((blob) => {
          this._capturedPhotoBlob = blob;
        }, "image/jpeg");

        this._stream.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
        this._stream = null;
        cameraContainer.style.display = "none";
        activateCameraButton.innerHTML =
          '<i class="fas fa-camera"></i> Aktifkan Kamera';
        photoUpload.style.display = "block";
      }
    });
  }

  _setupFileUpload() {
    const photoUpload = document.querySelector("#photo-upload");
    const imagePreview = document.querySelector("#image-preview");
    const photoStatus = document.querySelector("#photo-status");

    photoUpload.addEventListener(
      "change",
      function () {
        if (this.files && this.files[0]) {
          imagePreview.style.display = "block";
          imagePreview.src = URL.createObjectURL(this.files[0]);
          photoStatus.textContent = `File terpilih: ${this.files[0].name}`;
          this._capturedPhotoBlob = null;
        }
      }.bind(this)
    );
  }

  _setupMapPicker() {
    const map = L.map("map-picker").setView([-6.2, 106.816666], 5);

    const openStreetMap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    const esriWorldImagery = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      }
    );

    openStreetMap.addTo(map);

    const baseMaps = {
      Street: openStreetMap,
      Satellite: esriWorldImagery,
    };

    L.control.layers(baseMaps).addTo(map);

    let marker = null;
    const latitudeInput = document.querySelector("#latitude");
    const longitudeInput = document.querySelector("#longitude");
    const locationInfo = document.querySelector("#location-info");

    map.on("click", (e) => {
      if (marker) {
        map.removeLayer(marker);
      }
      marker = L.marker(e.latlng).addTo(map);
      latitudeInput.value = e.latlng.lat;
      longitudeInput.value = e.latlng.lng;
      locationInfo.innerHTML = `📍 Lokasi terpilih: Lat ${e.latlng.lat.toFixed(
        6
      )}, Lon ${e.latlng.lng.toFixed(6)}`;
      locationInfo.style.color = "green";
    });
  }
}

export default AddStoryView;
