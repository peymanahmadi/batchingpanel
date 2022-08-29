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
  // GET_USER_BEGIN,
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
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // create axios request config - to prevent sending token to external resources
  const authFetch = axios.create({
    baseURL: "/api/v1",
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
      const { data } = await axios.post(`api/v1/auth/${endPoint}`, currentUser);
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
      const data = await authFetch.post("/auth/register", newUser);
      console.log(data);
      //const { user } = data;
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
    // dispatch({ type: GET_USER_BEGIN });
    const data = await authFetch.post("/auth/users");
    console.log(data);
    // const { data } = data;
    console.log("-------");
    console.log(data.data[0].firstName);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        registerUser,
        toggleSidebar,
        logoutUser,
        changeLanguage,
        getUsers,
        customerID,
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
