import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";

import {
  LANGUAGE,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  GET_MATERIALS_BEGIN,
  GET_MATERIALS_SUCCESS,
  GET_MATERIALS_CONSUMPTION_BEGIN,
  GET_MATERIALS_CONSUMPTION_SUCCESS,
  GET_MATERIAL_INVENTORY_BEGIN,
  GET_MATERIAL_INVENTORY_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
  // Stats
  GET_DAILY_PRODUCTION_BEGIN,
  GET_DAILY_PRODUCTION_SUCCESS,
  GET_PRODUCTION_TOLERANCE_BEGIN,
  GET_PRODUCTION_TOLERANCE_SUCCESS,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const customer = localStorage.getItem("customer");
const customerID = localStorage.getItem("customerID");

const initialState = {
  language: "en",
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  customer: customer,
  customerID: customerID,
  showSidebar: false,
  openModal: false,
  // stats
  isLoadingStatsDailyProduction: false,
  isLoadingProductionTolerance: false,
  productionTolerance: [],
  dailyBatching: [],
  batching: [],
  materialConsumption: [],
  batchingNums: 0,
  batchingWeight: 0,
  batchedFormulaArr: [],
  materialInventory: [],
  // materials
  materials: [],
  totalMaterials: 0,
  // users
  users: [],
  totalUsers: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // create axios request config - to prevent sending token to external resources
  const authFetch = axios.create({
    baseURL: "http://localhost:5000/api/v1",
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const showModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const hideModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const addUserToLocalStorage = ({ user, token, customer, customerID }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("customer", customer);
    localStorage.setItem("customerID", customerID);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    localStorage.removeItem("customerID");
  };

  const loginUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, customer, customerID } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, customer, customerID, alertText },
      });
      addUserToLocalStorage({ user, token, customer, customerID });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const registerUser = async (newUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      await authFetch.post("/auth/register", newUser);
      dispatch({ type: REGISTER_USER_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const changeLanguage = (language) => {
    dispatch({ type: LANGUAGE, payload: { language } });
  };

  const getUsers = async () => {
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await authFetch.post("/auth/users");
      const { users, totalUsers, numOfPages } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { users, totalUsers, numOfPages },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser();
      console.log(error);
    }
    clearAlert();
  };

  const getMaterials = async () => {
    dispatch({ type: GET_MATERIALS_BEGIN });
    try {
      const { data } = await authFetch.post("/customers/materials/all");
      const { materials, totalMaterials, numOfPages } = data;
      dispatch({
        type: GET_MATERIALS_SUCCESS,
        payload: { materials, totalMaterials, numOfPages },
      });
    } catch (error) {
      // logoutUser();
      console.log(error);
    }
    clearAlert();
  };

  const getMaterialConsumption = async (condition) => {
    dispatch({ type: GET_MATERIALS_CONSUMPTION_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/batching/materialconsumption",
        condition
      );
      const {
        matConsumeArray,
        batchingNums,
        batching,
        batchingWeight,
        batchedFormulaArr,
      } = data;
      dispatch({
        type: GET_MATERIALS_CONSUMPTION_SUCCESS,
        payload: {
          matConsumeArray,
          batchingNums,
          batchingWeight,
          batching,
          batchedFormulaArr,
        },
      });
    } catch (error) {
      console.log(error);
      // logoutUser();
    }
  };

  const getMaterialInventory = async (condition) => {
    dispatch({ type: GET_MATERIAL_INVENTORY_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/inventory/all",
        condition
      );
      const { inventory } = data;
      dispatch({
        type: GET_MATERIAL_INVENTORY_SUCCESS,
        payload: { inventory },
      });
    } catch (error) {
      // logoutUser();
      console.log(error);
    }
  };

  const getDailyBatching = async (condition) => {
    dispatch({ type: GET_DAILY_PRODUCTION_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/batching/daily",
        condition
      );
      const { dailyBatching } = data;
      dispatch({
        type: GET_DAILY_PRODUCTION_SUCCESS,
        payload: { dailyBatching },
      });
    } catch (error) {
      // logoutUser();
      console.log(error);
    }
  };

  const getProductionTolerance = async (condition) => {
    dispatch({ type: GET_PRODUCTION_TOLERANCE_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/batching/tolerance",
        condition
      );
      const { productionToleranceArr } = data;
      dispatch({
        type: GET_PRODUCTION_TOLERANCE_SUCCESS,
        payload: { productionToleranceArr },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        showModal,
        hideModal,
        loginUser,
        registerUser,
        toggleSidebar,
        logoutUser,
        changeLanguage,
        getUsers,
        getMaterials,
        getMaterialConsumption,
        getMaterialInventory,
        getDailyBatching,
        getProductionTolerance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
