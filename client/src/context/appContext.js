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
  GET_MATERIALS_CONSUMPTION_BEGIN,
  GET_MATERIALS_CONSUMPTION_SUCCESS,
  GET_MATERIAL_INVENTORY_BEGIN,
  GET_MATERIAL_INVENTORY_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
  // Stats
  GET_DAILY_PRODUCTION_BEGIN,
  GET_DAILY_PRODUCTION_SUCCESS,
  GET_DAILY_PRODUCTION_EMPTY,
  GET_MATERIAL_TOLERANCE_BEGIN,
  GET_MATERIAL_TOLERANCE_SUCCESS,
  // Materials
  GET_MATERIALS_BEGIN,
  GET_MATERIALS_SUCCESS,
  CREATE_MATERIAL_BEGIN,
  CREATE_MATERIAL_SUCCESS,
  CREATE_MATERIAL_ERROR,
  // Formulas
  GET_FORMULAS_BEGIN,
  GET_FORMULAS_SUCCESS,
  // Warehouse
  GET_WAREHOUSE_INVENTORY_BEGIN,
  GET_WAREHOUSE_INVENTORY_SUCCESS,
  // Users
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const customerName = localStorage.getItem("customerName");
const customerCodeName = localStorage.getItem("customerCodeName");
const customerID = localStorage.getItem("customerID");

const initialState = {
  language: "en",
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  customerName: customerName,
  customerCodeName: customerCodeName,
  customerID: customerID,
  showSidebar: false,
  openModal: false,
  // Stats
  isLoadingStatsDailyProduction: false,
  dailyBatchingArr: [],
  todayNumOfBatches: 0,
  todayTotalBatchingWeight: 0,
  //
  isLoadingMaterialTolerance: false,
  materialTolerance: [],
  //
  batchingNums: 0,
  batchingWeight: 0,
  batching: [],
  materialConsumption: [],
  batchedFormulaArr: [],
  materialInventory: [],
  // Materials
  isLoadingMaterials: false,
  materialsArr: [],
  availableMaterialsArr: [],
  totalMaterials: 0,
  numOfMaterialPages: 1,
  isLoadingCreateMaterial: false,
  // Formulas
  isLoadingFormulas: false,
  formulasArr: [],
  totalFormulas: 0,
  numOfFormulaPages: 1,
  // users
  isLoadingUsers: false,
  usersArr: [],
  totalUsers: 0,
  numOfUserPages: 1,
  page: 1,
  // Warehouse
  isLoadingWarehouseInventory: false,
  getWarehouseInventory: [],
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

  const addUserToLocalStorage = ({
    user,
    token,
    customerName,
    customerCodeName,
    customerID,
  }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("customerCodeName", customerCodeName);
    localStorage.setItem("customerID", customerID);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerCodeName");
    localStorage.removeItem("customerID");
  };

  const loginUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, customerName, customerCodeName, customerID } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          customerName,
          customerCodeName,
          customerID,
          alertText,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        customerName,
        customerCodeName,
        customerID,
      });
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

  // Stats

  const getDailyBatching = async (condition) => {
    dispatch({ type: GET_DAILY_PRODUCTION_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/batching/daily",
        condition
      );
      const { dailyBatching } = data;
      if (dailyBatching.length === 0) {
        dispatch({
          type: GET_DAILY_PRODUCTION_EMPTY,
          payload: {
            dailyBatching,
            todayNumOfBatches: 0,
            todayTotalBatchingWeight: 0,
          },
        });
      } else {
        dispatch({
          type: GET_DAILY_PRODUCTION_SUCCESS,
          payload: {
            dailyBatching,
            todayNumOfBatches:
              dailyBatching[dailyBatching.length - 1].numOfBatches,
            todayTotalBatchingWeight:
              dailyBatching[dailyBatching.length - 1].weight,
          },
        });
      }
    } catch (error) {
      // logoutUser();
      console.log(error);
    }
  };

  const getMaterialTolerance = async (condition) => {
    dispatch({ type: GET_MATERIAL_TOLERANCE_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/batching/tolerance",
        condition
      );
      const { materialToleranceArr } = data;
      dispatch({
        type: GET_MATERIAL_TOLERANCE_SUCCESS,
        payload: { materialToleranceArr },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInventory = async (condition) => {
    dispatch({ type: GET_WAREHOUSE_INVENTORY_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/inventory/all",
        condition
      );
      const { allInventories } = data;
      dispatch({
        type: GET_WAREHOUSE_INVENTORY_SUCCESS,
        payload: { allInventories },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Materials

  const getMaterials = async (condition) => {
    dispatch({ type: GET_MATERIALS_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/materials/all",
        condition
      );
      const { materials, totalMaterials, numOfPages } = data;
      let availableMaterials = [];
      materials.map((material) => {
        material.selected = false;
        if (material.available) {
          availableMaterials = [...availableMaterials, material];
        }
      });
      dispatch({
        type: GET_MATERIALS_SUCCESS,
        payload: { materials, availableMaterials, totalMaterials, numOfPages },
      });
    } catch (error) {
      // logoutUser();
      console.log(error);
    }
    clearAlert();
  };

  const createMaterial = async (condition) => {
    dispatch({ type: CREATE_MATERIAL_BEGIN });
    try {
      await authFetch.post("/customers/materials", condition);
      dispatch({ type: CREATE_MATERIAL_SUCCESS });
    } catch (error) {
      dispatch({
        type: CREATE_MATERIAL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // Users

  const getUsers = async (condition) => {
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await authFetch.post("/auth/users", condition);
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

  // Formulas

  const getFormulas = async (condition) => {
    dispatch({ type: GET_FORMULAS_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/formulas/all",
        condition
      );
      const { formulas, totalFormulas, numOfPages } = data;
      dispatch({
        type: GET_FORMULAS_SUCCESS,
        payload: { formulas, totalFormulas, numOfPages },
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
        getMaterialConsumption,
        getMaterialInventory,
        getDailyBatching,
        getMaterialTolerance,
        getAllInventory,
        getMaterials,
        createMaterial,
        getFormulas,
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
