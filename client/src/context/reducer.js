import {
  LANGUAGE,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_EDIT_USER,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  VERIFY_TOKEN_BEGIN,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_ERROR,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
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
  OPEN_MODAL_CONFIRM,
  CLOSE_MODAL_CONFIRM,
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
  SET_EDIT_MATERIAL,
  EDIT_MATERIAL_BEGIN,
  EDIT_MATERIAL_SUCCESS,
  EDIT_MATERIAL_ERROR,
  DELETE_MATERIAL_BEGIN,
  DELETE_MATERIAL_SUCCESS,
  DELETE_MATERIAL_ERROR,
  // Formulas
  GET_FORMULAS_BEGIN,
  GET_FORMULAS_SUCCESS,
  CREATE_FORMULA_BEGIN,
  CREATE_FORMULA_SUCCESS,
  CREATE_FORMULA_ERROR,
  SET_EDIT_FORMULA,
  EDIT_FORMULA_BEGIN,
  EDIT_FORMULA_SUCCESS,
  EDIT_FORMULA_ERROR,
  DELETE_FORMULA_BEGIN,
  DELETE_FORMULA_SUCCESS,
  DELETE_FORMULA_ERROR,
  // Warehouse
  GET_WAREHOUSES_BEGIN,
  GET_WAREHOUSES_SUCCESS,
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
  if (action.type === HANDLE_CHANGE) {
    if (action.payload.type === "checkbox") {
      return { ...state, [action.payload.name]: action.payload.checked };
    }
    return { ...state, [action.payload.name]: action.payload.value };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isLoading: false,
      isEditing: false,
      editMaterialID: "",
      materialName: "",
      commonMaterialID: "",
      materialDescription: "",
      materialAvailable: true,
      editFormulaID: "",
      commonFormulaID: "",
      formulaVersion: "",
      formulaName: "",
      formulaDescription: "",
      formulaBatchSize: "",
      formulaAvailable: true,
      availableMaterialsArr: [],
      commonUserID: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      jobTitle: "",
      userAvailable: true,
    };
    return { ...state, ...initialState };
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
  if (action.type === OPEN_MODAL_CONFIRM) {
    return {
      ...state,
      openModalConfirm: true,
    };
  }
  if (action.type === CLOSE_MODAL_CONFIRM) {
    return {
      ...state,
      openModalConfirm: false,
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
      openModal: false,
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
  if (action.type === SET_EDIT_USER) {
    const user = state.usersArr.find((user) => user._id === action.payload.id);
    const {
      _id,
      commonUserID,
      firstName,
      lastName,
      email,
      jobTitle,
      available,
    } = user;
    return {
      ...state,
      isEditing: true,
      editUserID: _id,
      commonUserID,
      firstName,
      lastName,
      email,
      jobTitle,
      userAvailable: available,
    };
  }
  if (action.type === EDIT_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Updated!",
      openModal: false,
    };
  }
  if (action.type === EDIT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === VERIFY_TOKEN_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === VERIFY_TOKEN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      verificationStatus: "verified",
    };
  }
  if (action.type === VERIFY_TOKEN_ERROR) {
    return {
      ...state,
      isLoading: false,
      verificationStatus: "not verified",
    };
  }
  if (action.type === FORGOT_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === FORGOT_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === FORGOT_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === RESET_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === RESET_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === RESET_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
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

  if (action.type === GET_WAREHOUSES_BEGIN) {
    return { ...state, isLoadingWarehouses: true };
  }

  if (action.type === GET_WAREHOUSES_SUCCESS) {
    return {
      ...state,
      isLoadingWarehouses: true,
      warehouses: action.payload.warehouses,
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
      warehouseInventory: action.payload.allInventories,
    };
  }

  // Materials
  if (action.type === GET_MATERIALS_BEGIN) {
    return {
      ...state,
      isLoadingMaterials: true,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_MATERIALS_SUCCESS) {
    return {
      ...state,
      isLoadingMaterials: false,
      isLoading: false,
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
      openModal: false,
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
  if (action.type === SET_EDIT_MATERIAL) {
    const material = state.materialsArr.find(
      (material) => material._id === action.payload.id
    );
    const { _id, commonMaterialID, name, description, available } = material;
    return {
      ...state,
      isEditing: true,
      editMaterialID: _id,
      commonMaterialID,
      materialName: name,
      materialDescription: description,
      materialAvailable: available,
    };
  }
  if (action.type === EDIT_MATERIAL_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_MATERIAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Material Updated!",
      openModal: false,
    };
  }
  if (action.type === EDIT_MATERIAL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_MATERIAL_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_MATERIAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Material Deleted!",
      openModalConfirm: false,
    };
  }
  if (action.type === DELETE_MATERIAL_ERROR) {
    return {
      ...state,
      isLoading: false,
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
      openModal: false,
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
  if (action.type === SET_EDIT_FORMULA) {
    const formula = state.formulasArr.find(
      (formula) => formula._id === action.payload.id
    );
    const {
      _id,
      commonFormulaID,
      version,
      name,
      description,
      formulaBatchSize,
      available,
      // ingredients,
    } = formula;
    return {
      ...state,
      isEditing: true,
      editFormulaID: _id,
      commonFormulaID,
      formulaVersion: version,
      formulaName: name,
      formulaDescription: description,
      formulaBatchSize,
      formulaAvailable: available,
      // ingredients,
    };
  }
  if (action.type === EDIT_FORMULA_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_FORMULA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Formula Updated!",
      openModal: false,
    };
  }
  if (action.type === EDIT_FORMULA_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_FORMULA_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_FORMULA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Formula Deleted!",
      openModalConfirm: false,
    };
  }
  if (action.type === DELETE_FORMULA_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
