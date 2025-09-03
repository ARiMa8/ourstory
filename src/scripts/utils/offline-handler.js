class OfflineHandler {
  static init() {
    window.addEventListener('online', this._handleOnline.bind(this));
    window.addEventListener('offline', this._handleOffline.bind(this));
    
    if (!navigator.onLine) {
      this._handleOffline();
    }
  }

  static _handleOnline() {
    console.log('App is online');
    this._showConnectionStatus('Online', 'success');
    this._removeOfflineBanner();
  }

  static _handleOffline() {
    console.log('App is offline');
    this._showConnectionStatus('Offline', 'warning');
    this._showOfflineBanner();
  }

  static _showConnectionStatus(status, type) {
    let statusIndicator = document.getElementById('connection-status');
    
    if (!statusIndicator) {
      statusIndicator = document.createElement('div');
      statusIndicator.id = 'connection-status';
      statusIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 16px;
        border-radius: 0 0 8px 8px;
        font-size: 12px;
        font-weight: bold;
        z-index: 10000;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(statusIndicator);
    }

    statusIndicator.textContent = status;
    
    if (type === 'success') {
      statusIndicator.style.backgroundColor = '#28a745';
      statusIndicator.style.color = 'white';
      setTimeout(() => {
        if (statusIndicator) {
          statusIndicator.style.opacity = '0';
          setTimeout(() => statusIndicator.remove(), 300);
        }
      }, 3000);
    } else {
      statusIndicator.style.backgroundColor = '#ffc107';
      statusIndicator.style.color = '#212529';
      statusIndicator.style.opacity = '1';
    }
  }

  static _showOfflineBanner() {
    this._removeOfflineBanner();
    
    const banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 9999;
      text-align: center;
      animation: slideUp 0.3s ease;
    `;
    
    banner.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
        <i class="fas fa-wifi" style="opacity: 0.5;"></i>
        <span>Anda sedang offline. Beberapa fitur mungkin terbatas.</span>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: none; border: none; font-size: 18px; cursor: pointer; color: #721c24;">×</button>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(banner);
  }

  static _removeOfflineBanner() {
    const banner = document.getElementById('offline-banner');
    if (banner) {
      banner.remove();
    }
  }

  static isOnline() {
    return navigator.onLine;
  }

  static showOfflineMessage(action = 'melakukan aksi ini') {
    alert(`Tidak dapat ${action} saat offline. Silakan periksa koneksi internet Anda.`);
  }
}

export default OfflineHandler;