import React, { useState } from "react";
import ReactDom from "react-dom";
import { useAppContext } from "../../context/appContext";

const toastPortal = document.getElementById("toast");

const ToastContainer = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <div className={`toast-container alert-${alertType}`}>{alertText}</div>
  );
};

const Toast = () => {
  return ReactDom.createPortal(<ToastContainer />, toastPortal);
};

export default Toast;
