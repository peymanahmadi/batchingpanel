import React, { useReducer, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import reducer from "./reducer";
import { toast } from "react-toastify";

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
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_CONFIRM,
  CLOSE_MODAL_CONFIRM,
  // Stats
  GET_DAILY_PRODUCTION_BEGIN,
  GET_DAILY_PRODUCTION_SUCCESS,
  GET_MATERIAL_TOLERANCE_BEGIN,
  GET_MATERIAL_TOLERANCE_SUCCESS,
  GET_FORMULA_TOLERANCE_BEGIN,
  GET_FORMULA_TOLERANCE_SUCCESS,
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
  GET_FORMULA_BY_ID_BEGIN,
  GET_FORMULA_BY_ID_SUCCESS,
  CREATE_FORMULA_BEGIN,
  CREATE_FORMULA_SUCCESS,
  CREATE_FORMULA_ERROR,
  SET_DELETE_FORMULA,
  SET_EDIT_FORMULA_BEIGN,
  SET_EDIT_FORMULA_SUCCESS,
  EDIT_FORMULA_BEGIN,
  EDIT_FORMULA_SUCCESS,
  EDIT_FORMULA_ERROR,
  DELETE_FORMULA_BEGIN,
  DELETE_FORMULA_SUCCESS,
  DELETE_FORMULA_ERROR,
  // Warehouse
  GET_WAREHOUSES_BEGIN,
  GET_WAREHOUSES_SUCCESS,
  CREATE_WAREHOUSE_BEGIN,
  CREATE_WAREHOUSE_SUCCESS,
  CREATE_WAREHOUSE_ERROR,
  SET_EDIT_WAREHOUSE,
  EDIT_WAREHOUSE_BEGIN,
  EDIT_WAREHOUSE_SUCCESS,
  EDIT_WAREHOUSE_ERROR,
  DELETE_WAREHOUSE_BEGIN,
  DELETE_WAREHOUSE_SUCCESS,
  DELETE_WAREHOUSE_ERROR,
  GET_WAREHOUSE_INVENTORY_BEGIN,
  GET_WAREHOUSE_INVENTORY_SUCCESS,
  WAREHOUSE_OPERATIONS_BEGIN,
  WAREHOUSE_OPERATIONS_SUCCESS,
  WAREHOUSE_OPERATIONS_ERROR,
  GET_WAREHOUSE_OPERATIONS_BEGIN,
  GET_WAREHOUSE_OPERATIONS_SUCCESS,
  // Users
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
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
  verificationStatus: "",
  forgotEmail: "",
  newPassword: "",
  customerName: customerName,
  customerCodeName: customerCodeName,
  customerID: customerID,
  showSidebar: false,
  openModal: false,
  openModalConfirm: false,
  numOfPages: 1,
  // Stats
  isLoadingStatsDailyProduction: false,
  dailyBatchingArr: [],
  todayNumOfBatches: 0,
  todayTotalBatchingWeight: 0,
  //
  isLoadingMaterialTolerance: false,
  materialTolerance: [],
  isLoadingFormulaTolerance: false,
  formulaTolerance: [],
  //
  batchingNums: 0,
  batchingWeight: 0,
  batching: [],
  materialConsumption: [],
  batchedFormulaArr: [],
  materialInventory: [],
  // Materials
  materialsArr: [],
  availableMaterialsArr: [],
  totalMaterials: 0,
  isLoadingCreateMaterial: false,
  isEditing: false,
  editMaterialID: "",
  commonMaterialID: "",
  materialName: "",
  materialDescription: "",
  materialAvailable: true,
  // Formulas
  isLoadingFormulas: false,
  formulasArr: [],
  formula: {},
  formulation: [],
  totalFormulas: 0,
  numOfFormulaPages: 1,
  editFormulaID: "",
  commonFormulaID: "",
  formulaVersion: "",
  formulaName: "",
  formulaDescription: "",
  formulaBatchSize: "",
  formulaAvailable: true,
  ingredients: [],
  // users
  isLoadingUsers: false,
  usersArr: [],
  totalUsers: 0,
  numOfUserPages: 1,
  page: 1,
  editUserID: "",
  commonUserID: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  jobTitle: "",
  userAvailable: true,
  // Warehouse
  warehousesArr: [],
  isLoadingWarehouseInventory: false,
  warehouseInventoryArr: [],
  isLoadingCreateWarehouse: false,
  commonWarehouseID: "",
  warehouseName: "",
  warehouseDescription: "",
  warehouseAvailable: true,
  editWarehouseID: "",
  inbound: true,
  weight: "",
  warehouseOpsDescID: "",
  warehouseOperationsArr: [],
  totalWarehouseOperations: 0,
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const query = useQuery();

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
      // console.log(error);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const errorToastUpdate = (id, render) => {
    toast.update(id, {
      render,
      type: "error",
      isLoading: false,
      autoClose: 4000,
    });
  };

  const successToastUpdate = (id, render) => {
    toast.update(id, {
      render,
      type: "success",
      isLoading: false,
      autoClose: 4000,
    });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 5000);
  };

  const handleChange = ({ type, name, value, checked }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { type, name, value, checked } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const showModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const hideModal = () => {
    dispatch({ type: CLOSE_MODAL });
    clearValues();
  };

  const showModalConfirm = () => {
    dispatch({ type: OPEN_MODAL_CONFIRM });
  };

  const hideModalConfirm = () => {
    dispatch({ type: CLOSE_MODAL_CONFIRM });
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
    let id = toast.loading("Login...");
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
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
      toast.update(id, {
        render: "Login Successful! Redirecting...",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.update(id, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
    clearAlert();
  };

  const registerUser = async () => {
    dispatch({ type: REGISTER_USER_BEGIN });
    let id = toast.loading("Adding new user. Please wait...");
    try {
      const {
        customerID,
        commonUserID,
        firstName,
        lastName,
        email,
        password,
        jobTitle,
        userAvailable,
        user,
      } = state;
      const { _id } = user;
      await authFetch.post("/auth/register", {
        customerID,
        commonUserID,
        firstName,
        lastName,
        email,
        password,
        jobTitle,
        available: userAvailable,
        accessLevel: {
          isAdmin: true,
          allowDefineWarehouse: false,
          allowdefineFormula: false,
          allowCreateReports: false,
          allowManageUsers: false,
        },
        createdBy: _id,
      });
      dispatch({ type: REGISTER_USER_SUCCESS });
      toast.update(id, {
        render: "New user created",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.update(id, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
    clearAlert();
  };

  const setEditUser = (id) => {
    dispatch({ type: SET_EDIT_USER, payload: { id } });
  };

  const verifyToken = async () => {
    dispatch({ type: VERIFY_TOKEN_BEGIN });
    try {
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
      dispatch({ type: VERIFY_TOKEN_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: VERIFY_TOKEN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const forgotPassword = async () => {
    dispatch({ type: FORGOT_PASSWORD_BEGIN });
    let id = toast.loading("Sending Forgot Password Reset Link...");
    try {
      const { forgotEmail } = state;
      await axios.post("/api/v1/auth/forgot-password", {
        email: forgotEmail,
      });
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      toast.update(id, {
        render: "Send Reset Password Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: FORGOT_PASSWORD_ERROR });
      toast.update(id, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
    clearAlert();
  };

  const resetPassword = async () => {
    dispatch({ type: RESET_PASSWORD_BEGIN });
    let id = toast.loading("Reseting password...");
    try {
      const { newPassword } = state;
      await axios.post("/api/v1/auth/reset-password", {
        password: newPassword,
        token: query.get("token"),
        email: query.get("email"),
      });
      dispatch({ type: RESET_PASSWORD_SUCCESS });
      toast.update(id, {
        render: "Reset Password Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      dispatch({ type: RESET_PASSWORD_ERROR });
      toast.update(id, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
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
      logoutUser();
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
      const { dailyBatching, todayBatching } = data;
      const numOfBatches =
        todayBatching[0]?.numOfBatches === undefined
          ? 0
          : todayBatching[0].numOfBatches;
      const totalBatchingWeight =
        todayBatching[0]?.weight === undefined ? 0 : todayBatching[0].weight;
      dispatch({
        type: GET_DAILY_PRODUCTION_SUCCESS,
        payload: {
          dailyBatching,
          todayNumOfBatches: numOfBatches,
          todayTotalBatchingWeight: totalBatchingWeight,
        },
      });
    } catch (error) {
      // console.log(error);
      logoutUser();
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
      logoutUser();
    }
  };

  const getFormulaTolerance = async (condition) => {
    dispatch({ type: GET_FORMULA_TOLERANCE_BEGIN });
    try {
      const { data } = await authFetch.post(
        "/customers/batching/formulatolerance",
        condition
      );
      const { formulaTolerance } = data;
      dispatch({
        type: GET_FORMULA_TOLERANCE_SUCCESS,
        payload: { formulaTolerance },
      });
    } catch (error) {
      logoutUser();
    }
  };

  // Materials

  const getMaterials = async () => {
    dispatch({ type: GET_MATERIALS_BEGIN });
    try {
      const { customerCodeName } = state;
      const { data } = await authFetch.post("/customers/materials/all", {
        customerCodeName,
      });
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
      logoutUser();
    }
  };

  const createMaterial = async () => {
    dispatch({ type: CREATE_MATERIAL_BEGIN });
    let id = toast.loading("Adding new material. Please wait...");
    try {
      const {
        customerCodeName,
        commonMaterialID,
        materialName,
        materialDescription,
        materialAvailable,
      } = state;
      await authFetch.post("/customers/materials", {
        customerCodeName,
        commonMaterialID,
        name: materialName,
        description: materialDescription,
        available: materialAvailable,
      });
      dispatch({ type: CREATE_MATERIAL_SUCCESS });
      getMaterials();
      successToastUpdate(id, "New material saved");
    } catch (error) {
      if (error.response.status === 401) return;
      let msg = error.response.data.msg;
      dispatch({ type: CREATE_MATERIAL_ERROR });
      errorToastUpdate(id, msg);
    }
  };

  const setEditMaterial = (id) => {
    dispatch({ type: SET_EDIT_MATERIAL, payload: { id } });
  };

  const editMaterial = async () => {
    dispatch({ type: EDIT_MATERIAL_BEGIN });
    let id = toast.loading("Updating material. Please wait...");
    try {
      const {
        customerCodeName,
        commonMaterialID,
        editMaterialID,
        materialName,
        materialDescription,
        materialAvailable,
      } = state;
      await authFetch.patch("/customers/materials", {
        customerCodeName,
        materialID: editMaterialID,
        commonMaterialID,
        name: materialName,
        description: materialDescription,
        available: materialAvailable,
      });
      dispatch({ type: EDIT_MATERIAL_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      getMaterials();
      successToastUpdate(id, "Material updated");
    } catch (error) {
      if (error.response.status === 401) return;
      let msg = error.response.data.msg;
      dispatch({
        type: EDIT_MATERIAL_ERROR,
        payload: { msg: error.response.data.msg },
      });
      errorToastUpdate(id, msg);
    }
  };

  const deleteMaterial = async () => {
    dispatch({ type: DELETE_MATERIAL_BEGIN });
    let id = toast.loading("Deleting material. Please wait...");
    try {
      const { customerCodeName, editMaterialID } = state;
      await authFetch.delete("/customers/materials", {
        data: {
          customerCodeName,
          materialID: editMaterialID,
        },
      });
      dispatch({ type: DELETE_MATERIAL_SUCCESS });
      getMaterials();
      successToastUpdate(id, "Material deleted");
    } catch (error) {
      if (error.response.status === 401) return;
      let msg = error.response.data.msg;
      dispatch({ type: DELETE_MATERIAL_ERROR });
      errorToastUpdate(id, msg);
    }
  };

  // Users

  const getUsers = async () => {
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { customerCodeName } = state;
      const { data } = await authFetch.post("/auth/users", {
        customerCodeName,
      });
      const { users, totalUsers, numOfPages } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { users, totalUsers, numOfPages },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
      // console.log(error);
    }
    clearAlert();
  };

  const editUser = async () => {
    dispatch({ type: EDIT_USER_BEGIN });
    let id = toast.loading("Updating user. Please wait...");
    try {
      const {
        editUserID,
        commonUserID,
        firstName,
        lastName,
        email,
        jobTitle,
        userAvailable,
      } = state;
      await authFetch.patch("/customers/update-user", {
        userID: editUserID,
        commonUserID,
        firstName,
        lastName,
        email,
        jobTitle,
        available: userAvailable,
      });
      dispatch({ type: EDIT_USER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      toast.update(id, {
        render: "User updated",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.update(id, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
    clearAlert();
  };

  // const deleteUser = async () => {};

  // Formulas

  const getFormulas = async () => {
    dispatch({ type: GET_FORMULAS_BEGIN });
    try {
      const { customerCodeName } = state;
      const { data } = await authFetch.post("/customers/formulas/all", {
        customerCodeName,
      });
      const { formulas, totalFormulas, numOfPages } = data;
      dispatch({
        type: GET_FORMULAS_SUCCESS,
        payload: { formulas, totalFormulas, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const getFormulaByID = async () => {
    dispatch({ type: GET_FORMULA_BY_ID_BEGIN });
    try {
      const { customerCodeName, editFormulaID } = state;
      const { data } = await authFetch.post("/customers/formulas/id", {
        customerCodeName,
        formulaID: editFormulaID,
      });
      const { formula, formulation } = data;
      dispatch({
        type: GET_FORMULA_BY_ID_SUCCESS,
        payload: { formula, formulation },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const createFormula = async () => {
    dispatch({ type: CREATE_FORMULA_BEGIN });
    let id = toast.loading("Adding new formula. Please wait...");
    try {
      const {
        customerCodeName,
        commonFormulaID,
        formulaVersion,
        formulaName,
        formulaDescription,
        formulaBatchSize,
        formulaAvailable,
        user,
        ingredients,
      } = state;
      await authFetch.post("/customers/formulas", {
        customerCodeName,
        commonFormulaID,
        version: formulaVersion,
        name: formulaName,
        description: formulaDescription,
        formulaBatchSize,
        available: formulaAvailable,
        userID: user,
        ingredients,
      });
      dispatch({ type: CREATE_FORMULA_SUCCESS });
      getFormulas();
      toast.update(id, {
        render: "New formula created",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      dispatch({
        type: CREATE_FORMULA_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.update(id, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
    clearAlert();
  };

  const setDeleteFormula = (id) => {
    dispatch({ type: SET_DELETE_FORMULA, payload: { id } });
  };

  const setEditFormula = async (id) => {
    // dispatch({ type: SET_EDIT_FORMULA_BEIGN, payload: { id } });
    try {
      const { customerCodeName } = state;
      const { data } = await authFetch.post("/customers/formulas/id", {
        customerCodeName,
        formulaID: id,
      });
      const { formula, formulation } = data;
      dispatch({
        type: SET_EDIT_FORMULA_SUCCESS,
        payload: { id, formula, formulation },
      });
    } catch (error) {
      console.log("errrror", error);
    }
  };

  const editFormula = async (ingredients) => {
    dispatch({ type: EDIT_FORMULA_BEGIN });
    let id = toast.loading("Updating formula. Please wait...");
    try {
      const {
        customerCodeName,
        editFormulaID,
        commonFormulaID,
        formulaVersion,
        formulaName,
        formulaDescription,
        formulaBatchSize,
        formulaAvailable,
      } = state;
      await authFetch.patch("/customers/formulas", {
        customerCodeName,
        formulaID: editFormulaID,
        commonFormulaID,
        version: formulaVersion,
        name: formulaName,
        description: formulaDescription,
        formulaBatchSize,
        available: formulaAvailable,
        ingredients,
      });
      dispatch({ type: EDIT_FORMULA_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      getFormulas();
      toast.update(id, {
        render: "Formula updated",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_FORMULA_ERROR,
        payload: { msg: error.response.data.msg },
      });
      toast.update(id, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
    clearAlert();
  };

  const deleteFormula = async () => {
    dispatch({ type: DELETE_FORMULA_BEGIN });
    let id = toast.loading("Deleting formula. Please wait...");
    try {
      const { customerCodeName, editFormulaID } = state;
      await authFetch.delete("/customers/formulas", {
        data: {
          customerCodeName,
          formulaID: editFormulaID,
        },
      });
      dispatch({ type: DELETE_FORMULA_SUCCESS });
      getFormulas();
      toast.update(id, {
        render: "Formula deleted",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_FORMULA_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  // Warehouses

  const getWarehouses = async () => {
    dispatch({ type: GET_WAREHOUSES_BEGIN });
    try {
      const { customerCodeName } = state;
      const { data } = await authFetch.post("/customers/warehouses/all", {
        customerCodeName,
      });
      const { warehouses, totalWarehouses, numOfPages } = data;
      let availableWarehouses = [];
      warehouses.map((warehouse) => {
        warehouse.selected = false;
        if (warehouse.available) {
          availableWarehouses = [...availableWarehouses, warehouse];
        }
      });
      dispatch({
        type: GET_WAREHOUSES_SUCCESS,
        payload: {
          warehouses,
          availableWarehouses,
          totalWarehouses,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createWarehouse = async () => {
    dispatch({ type: CREATE_WAREHOUSE_BEGIN });
    let id = toast.loading("Adding new warehouse. Please wait...");
    try {
      const {
        customerCodeName,
        commonWarehouseID,
        warehouseName,
        warehouseDescription,
        warehouseAvailable,
      } = state;
      await authFetch.post("/customers/warehouses", {
        customerCodeName,
        commonWarehouseID,
        name: warehouseName,
        description: warehouseDescription,
        available: warehouseAvailable,
      });
      dispatch({ type: CREATE_WAREHOUSE_SUCCESS });
      getWarehouses();
      successToastUpdate(id, "New warehouse saved");
    } catch (error) {
      if (error.response.status === 401) return;
      let msg = error.response.data.msg;
      dispatch({ type: CREATE_WAREHOUSE_ERROR });
      errorToastUpdate(id, msg);
    }
  };

  const setEditWarehouse = (id) => {
    dispatch({ type: SET_EDIT_WAREHOUSE, payload: { id } });
  };

  const editWarehouse = async () => {
    dispatch({ type: EDIT_WAREHOUSE_BEGIN });
    let id = toast.loading("Updating warehouse. Please wait...");
    try {
      const {
        customerCodeName,
        commonWarehouseID,
        editWarehouseID,
        warehouseName,
        warehouseDescription,
        warehouseAvailable,
      } = state;
      await authFetch.patch("/customers/warehouses", {
        customerCodeName,
        warehouseID: editWarehouseID,
        commonWarehouseID,
        name: warehouseName,
        description: warehouseDescription,
        available: warehouseAvailable,
      });
      dispatch({ type: EDIT_WAREHOUSE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      getWarehouses();
      successToastUpdate(id, "Warehouse updated");
    } catch (error) {
      if (error.response.status === 401) return;
      let msg = error.response.data.msg;
      dispatch({
        type: EDIT_WAREHOUSE_ERROR,
        payload: { msg: error.response.data.msg },
      });
      errorToastUpdate(id, msg);
    }
  };

  const deleteWarehouse = async () => {
    dispatch({ type: DELETE_WAREHOUSE_BEGIN });
    let id = toast.loading("Deleting warehouse. Please wait...");
    try {
      const { customerCodeName, editWarehouseID } = state;
      await authFetch.delete("/customers/warehouses", {
        data: {
          customerCodeName,
          warehouseID: editWarehouseID,
        },
      });
      dispatch({ type: DELETE_WAREHOUSE_SUCCESS });
      getWarehouses();
      successToastUpdate(id, "Warehouse deleted");
    } catch (error) {
      if (error.response.status === 401) return;
      let msg = error.response.data.msg;
      dispatch({ type: DELETE_WAREHOUSE_ERROR });
      errorToastUpdate(id, msg);
    }
  };

  const getWarehouseOperations = async () => {
    dispatch({ type: GET_WAREHOUSE_OPERATIONS_BEGIN });
    const { customerCodeName } = state;
    try {
      const { data } = await authFetch.post(
        "/customers/warehouses-operations/get",
        {
          customerCodeName,
        }
      );
      const { warehouseOperations, totalWarehouseOperations, numOfPages } =
        data;
      dispatch({
        type: GET_WAREHOUSE_OPERATIONS_SUCCESS,
        payload: { warehouseOperations, totalWarehouseOperations, numOfPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const warehouseOperations = async () => {
    dispatch({ type: WAREHOUSE_OPERATIONS_BEGIN });
    let id = toast.loading("Warehouse operations. Please wait...");
    try {
      const {
        customerCodeName,
        editWarehouseID,
        inbound,
        editMaterialID,
        weight,
        warehouseOpsDescID,
      } = state;
      await authFetch.post("/customer/warehouses-operations/ops", {
        customerCodeName,
        warehouseID: editWarehouseID,
        inbound,
        materialID: editMaterialID,
        weight,
        descriptionID: warehouseOpsDescID,
      });
      dispatch({ type: WAREHOUSE_OPERATIONS_SUCCESS });
      successToastUpdate(id, "New warehouse saved");
      getWarehouseOperations();
    } catch (error) {
      if (error.response.status === 401) return;
      let msg = error.response.data.msg;
      dispatch({ type: WAREHOUSE_OPERATIONS_ERROR });
      errorToastUpdate(id, msg);
    }
  };

  const getAllInventory = async () => {
    dispatch({ type: GET_WAREHOUSE_INVENTORY_BEGIN });
    try {
      const { customerCodeName, editWarehouseID } = state;
      const { data } = await authFetch.post("/customers/inventory/all", {
        customerCodeName,
        warehouseID: "6352f926805f3ce6935d9d3a",
      });
      const { allInventories, ing } = data;
      dispatch({
        type: GET_WAREHOUSE_INVENTORY_SUCCESS,
        payload: { ing },
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
        handleChange,
        clearValues,
        showModal,
        hideModal,
        showModalConfirm,
        hideModalConfirm,
        loginUser,
        registerUser,
        setEditUser,
        editUser,
        verifyToken,
        forgotPassword,
        resetPassword,
        toggleSidebar,
        logoutUser,
        changeLanguage,
        getUsers,
        getMaterialConsumption,
        getMaterialInventory,
        getDailyBatching,
        getMaterialTolerance,
        getFormulaTolerance,
        getMaterials,
        createMaterial,
        setEditMaterial,
        editMaterial,
        deleteMaterial,
        getFormulas,
        getFormulaByID,
        createFormula,
        setDeleteFormula,
        setEditFormula,
        editFormula,
        deleteFormula,
        getWarehouses,
        createWarehouse,
        setEditWarehouse,
        editWarehouse,
        deleteWarehouse,
        getWarehouseOperations,
        warehouseOperations,
        getAllInventory,
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
