import { launchesAxios, shipsAxios } from "../axios/myaxios";
import store from "./index";

export const getLaunches = () => {
  store.dispatch({
    type: "GET_LAUNCHES_LOADING"
  });

  launchesAxios
    .get("/")
    .then(({ data }) => {
      data = data.filter(launch => launch.links.mission_patch_small);
      store.dispatch({
        type: "GET_LAUNCHES_LOADING"
      });
      store.dispatch({
        type: "GET_LAUNCHES_SUCCESS",
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
      store.dispatch({
        type: "GET_LAUNCHES_LOADING"
      });
      store.dispatch({
        type: "GET_LAUNCHES_FAILED"
      });
    });
};

export const findOneLaunch = flightNumber => {
  store.dispatch({
    type: "GET_LAUNCH_LOADING"
  });
  launchesAxios
    .get(`/${flightNumber}`)
    .then(({ data }) => {
      store.dispatch({
        type: "GET_LAUNCH_LOADING"
      });
      store.dispatch({
        type: "GET_LAUNCH_SUCCESS",
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
      store.dispatch({
        type: "GET_LAUNCH_LOADING"
      });
      store.dispatch({
        type: "GET_LAUNCH_FAILED"
      });
    });
};

export const getShips = () => {
  store.dispatch({
    type: "GET_SHIPS_LOADING"
  });
  shipsAxios
    .get("/")
    .then(({ data }) => {
      store.dispatch({
        type: "GET_SHIPS_LOADING"
      });
      store.dispatch({
        type: "GET_SHIPS_SUCCESS",
        payload: data
      });
    })
    .catch(err => {
      store.dispatch({
        type: "GET_SHIPS_LOADING"
      });
      store.dispatch({
        type: "GET_SHIPS_FAILED"
      });
    });
};
