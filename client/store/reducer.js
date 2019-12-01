// reducer, mengubah state
const defaultState = {
  launches: [],
  launch: {},
  ships: [],
  user: {},
  isLoading: false,
  errorMessage: "",
  favorites: []
};

export default function reducers(state = defaultState, action) {
  switch (action.type) {
    case "GET_LAUNCHES_SUCCESS":
      return {
        ...state,
        launches: action.payload
      };
    case "GET_LAUNCHES_FAILED":
      return {
        ...state,
        errorMessage: "Try again or check your internet connection"
      };
    case "GET_LAUNCHES_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case "GET_LAUNCH_SUCCESS":
      return {
        ...state,
        launch: action.payload
      };
    case "GET_LAUNCH_FAILED":
      return {
        ...state,
        errorMessage: "Try again or check your internet connection"
      };
    case "GET_LAUNCH_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case "GET_SHIPS_SUCCESS":
      return {
        ...state,
        ships: action.payload
      };
    case "GET_SHIPS_FAILED":
      return {
        ...state,
        errorMessage: "Try again or check your internet connection"
      };
    case "GET_SHIPS_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case "CHANGE_PAGE":
      let startPage = action.data - 1;
      let endPage = action.data + 11;
      return {
        ...state,
        launchesShow: state.launches.slice(startPage, endPage)
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.concat(action)
      };
    case "LOGIN_OAUTH_SUCCESS":
      return {
        ...state,
        user: action
      };
    case "LOGIN_OAUTH_FAILED":
      return {
        ...state,
        errorMessage: "Try again or check your internet connection"
      };
    case "LOGIN_OAUTH_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case "LOGOUT":
      return {
        ...state,
        user: {}
      };
    case "CHANGE_IS_LOADING":
      return {
        ...state,
        isLoading: action
      };
    default:
      return state;
  }
}
