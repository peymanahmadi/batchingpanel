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
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === LANGUAGE) {
    return { ...state, language: action.payload.language };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === OPEN_MODAL) {
    return {
      ...state,
      openModal: true,
    };
  }
  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      openModal: false,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      customer: action.payload.customer,
      customerID: action.payload.customerID,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Register Successful! Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      customer: null,
    };
  }
  if (action.type === GET_MATERIALS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_MATERIALS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      materials: action.payload.materials,
      totalMaterials: action.payload.totalMaterials,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_MATERIALS_CONSUMPTION_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_MATERIALS_CONSUMPTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      materialConsumption: action.payload.matConsumeArray,
      batching: action.payload.batching,
      batchingNums: action.payload.batchingNums,
      batchingWeight: action.payload.batchingWeight,
      batchedFormulaArr: action.payload.batchedFormulaArr,
    };
  }
  if (action.type === GET_USERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users,
      totalUsers: action.payload.totalUsers,
      numOfPages: action.payload.numOfPages,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
