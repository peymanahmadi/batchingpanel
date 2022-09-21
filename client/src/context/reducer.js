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
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
  // Stats
  GET_DAILY_PRODUCTION_BEGIN,
  GET_DAILY_PRODUCTION_SUCCESS,
  GET_DAILY_PRODUCTION_EMPTY,
  GET_MATERIAL_TOLERANCE_BEGIN,
  GET_MATERIAL_TOLERANCE_SUCCESS,
  GET_WAREHOUSE_INVENTORY_BEGIN,
  GET_WAREHOUSE_INVENTORY_SUCCESS,
  // Materials
  GET_MATERIALS_BEGIN,
  GET_MATERIALS_SUCCESS,
  CREATE_MATERIAL_BEGIN,
  CREATE_MATERIAL_SUCCESS,
  CREATE_MATERIAL_ERROR,
  // Formulas
  GET_FORMULAS_BEGIN,
  GET_FORMULAS_SUCCESS,
  CREATE_FORMULA_BEGIN,
  CREATE_FORMULA_SUCCESS,
  CREATE_FORMULA_ERROR,
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
      customerName: action.payload.customerName,
      customerCodeName: action.payload.customerCodeName,
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
  if (action.type === GET_MATERIAL_INVENTORY_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_MATERIAL_INVENTORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      materialInventory: action.payload.inventory,
    };
  }
  if (action.type === GET_USERS_BEGIN) {
    return { ...state, isLoadingUsers: true, showAlert: false };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoadingUsers: false,
      usersArr: action.payload.users,
      totalUsers: action.payload.totalUsers,
      numOfUserPages: action.payload.numOfPages,
    };
  }

  // Stats
  if (action.type === GET_DAILY_PRODUCTION_BEGIN) {
    return { ...state, isLoadingStatsDailyProduction: true };
  }
  if (action.type === GET_DAILY_PRODUCTION_SUCCESS) {
    return {
      ...state,
      isLoadingStatsDailyProduction: false,
      dailyBatchingArr: action.payload.dailyBatching,
      todayNumOfBatches: action.payload.todayNumOfBatches,
      todayTotalBatchingWeight: action.payload.todayTotalBatchingWeight,
    };
  }
  if (action.type === GET_DAILY_PRODUCTION_EMPTY) {
    return {
      ...state,
      isLoadingStatsDailyProduction: false,
      dailyBatchingArr: action.payload.dailyBatching,
      todayNumOfBatches: action.payload.todayNumOfBatches,
      todayTotalBatchingWeight: action.payload.todayTotalBatchingWeight,
    };
  }
  if (action.type === GET_MATERIAL_TOLERANCE_BEGIN) {
    return { ...state, isLoadingMaterialTolerance: true };
  }
  if (action.type === GET_MATERIAL_TOLERANCE_SUCCESS) {
    return {
      ...state,
      isLoadingMaterialTolerance: false,
      materialTolerance: action.payload.materialToleranceArr,
    };
  }
  if (action.type === GET_WAREHOUSE_INVENTORY_BEGIN) {
    return { ...state, isLoadingWarehouseInventory: true };
  }
  if (action.type === GET_WAREHOUSE_INVENTORY_SUCCESS) {
    return {
      ...state,
      isLoadingWarehouseInventory: false,
      getWarehouseInventory: action.payload.allInventories,
    };
  }

  // Materials
  if (action.type === GET_MATERIALS_BEGIN) {
    return { ...state, isLoadingMaterials: true, showAlert: false };
  }
  if (action.type === GET_MATERIALS_SUCCESS) {
    return {
      ...state,
      isLoadingMaterials: false,
      materialsArr: action.payload.materials,
      availableMaterialsArr: action.payload.availableMaterials,
      totalMaterials: action.payload.totalMaterials,
      numOfMaterialPages: action.payload.numOfPages,
    };
  }
  if (action.type === CREATE_MATERIAL_BEGIN) {
    return { ...state, isLoadingCreateMaterial: true };
  }
  if (action.type === CREATE_MATERIAL_SUCCESS) {
    return {
      ...state,
      isLoadingCreateMaterial: false,
      showAlert: true,
      alertType: "success",
      alertText: "Create Successful!",
    };
  }
  if (action.type === CREATE_MATERIAL_ERROR) {
    return {
      ...state,
      isLoadingCreateMaterial: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // Formulas
  if (action.type === GET_FORMULAS_BEGIN) {
    return { ...state, isLoadingFormulas: true };
  }
  if (action.type === GET_FORMULAS_SUCCESS) {
    return {
      ...state,
      isLoadingFormulas: false,
      formulasArr: action.payload.formulas,
      totalFormulas: action.payload.totalFormulas,
      numOfFormulaPages: action.payload.numOfPages,
    };
  }
  if (action.type === CREATE_FORMULA_BEGIN) {
    return { ...state, isLoadingCreateFormula: true };
  }
  if (action.type === CREATE_FORMULA_SUCCESS) {
    return {
      ...state,
      isLoadingCreateFormula: false,
      showAlert: true,
      alertType: "success",
      alertText: "Create Successful!",
    };
  }
  if (action.type === CREATE_FORMULA_ERROR) {
    return {
      ...state,
      isLoadingCreateFormula: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
