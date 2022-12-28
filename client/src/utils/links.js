import { IoBarChartSharp } from "react-icons/io5";
// import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
// import { FaWarehouse } from "react-icons/fa";
import { FaNutritionix } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

import i18n from "i18next";

const links = [
  {
    id: 1,
    text: i18n.t("stats", "stats"),
    path: "/",
    icon: <IoBarChartSharp />,
    type: "simple",
  },
  {
    id: 2,
    text: i18n.t("reports", "reports"),
    path: "reports",
    icon: <FaWpforms />,
    type: "simple",
  },
  {
    id: 3,
    text: i18n.t("materials", "materials"),
    path: "materials",
    icon: <FaNutritionix />,
    type: "simple",
  },
  {
    id: 4,
    text: i18n.t("formulas", "formulas"),
    path: "formulas",
    icon: <FaFlask />,
    type: "simple",
  },
  // {
  //   id: 5,
  //   // text: i18n.t("warehouses", "warehouses"),
  //   text: "warehouses",
  //   path: "",
  //   icon: <FaWarehouse />,
  //   type: "dropdown",
  //   subMenus: [
  //     {
  //       id: 51,
  //       text: "warehouse Operations",
  //       path: "warehouses/operations",
  //     },
  //     {
  //       id: 52,
  //       text: "warehouse Inventory",
  //       path: "warehouses/inventory",
  //     },
  //     {
  //       id: 53,
  //       text: "warehouses",
  //       path: "warehouses",
  //       // icon: <FaWarehouse />,
  //     },
  //   ],
  // },
  {
    id: 6,
    text: i18n.t("USERS", "users"),
    path: "users",
    icon: <ImUsers />,
    type: "simple",
  },
  {
    id: 7,
    text: i18n.t("profile", "profile"),
    path: "profile",
    icon: <ImProfile />,
    type: "simple",
  },
];

export default links;
