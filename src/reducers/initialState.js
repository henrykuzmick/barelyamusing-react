export default {
  user: {
    isAdmin: undefined
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  comics: {
    latest: [],
    random: [],
    current: null,
    next: null,
    prev: null,
    uploading: false,
    list: {}
  }
};
