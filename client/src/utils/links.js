import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaWarehouse } from "react-icons/fa";
import { FaNutritionix } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "reports",
    path: "reports",
    icon: <FaWpforms />,
  },
  {
    id: 3,
    text: "materials",
    path: "materials",
    icon: <FaNutritionix />,
  },
  {
    id: 4,
    text: "formulas",
    path: "formulas",
    icon: <FaFlask />,
  },
  {
    id: 5,
    text: "warehouses",
    path: "warehouses",
    icon: <FaWarehouse />,
  },
  {
    id: 6,
    text: "users",
    path: "users",
    icon: <ImUsers />,
  },
  {
    id: 7,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
