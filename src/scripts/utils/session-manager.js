const SessionManager = {
  setUser({ userId, name, token }) {
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userName", name);
    sessionStorage.setItem("userToken", token);
  },

  getUser() {
    return {
      userId: sessionStorage.getItem("userId"),
      userName: sessionStorage.getItem("userName"),
      token: sessionStorage.getItem("userToken"),
    };
  },

  getToken() {
    return sessionStorage.getItem("userToken");
  },

  isUserLoggedIn() {
    return !!this.getToken();
  },

  logout() {
    sessionStorage.clear();
    window.location.hash = "#/login";
    location.reload();
  },
};

export default SessionManager;
