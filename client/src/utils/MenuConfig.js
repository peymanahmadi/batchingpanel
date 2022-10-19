import { IoBarChartSharp } from "react-icons/io5";
import i18n from "i18next";

const Menu = [
  {
    id: 1,
    title: i18n.t("stats", "stats"),
    path: "/",
    icon: <IoBarChartSharp />,
    type: "simple",
  },
  {
    id: 2,
    title: i18n.t("reports", "reports"),
    path: "reports",
    icon: <IoBarChartSharp />,
    type: "simple",
  },
  {
    id: 3,
    title: i18n.t("materials", "materials"),
    path: "materials",
    icon: <IoBarChartSharp />,
    type: "dropdown",
    subMenus: [
      {
        title: "Materials",
        badge: {
          text: "Pro ",
          class: "badge-success",
        },
      },
      {
        title: "Add Material",
      },
      {
        title: "Dashboard 3",
      },
    ],
  },
];

export default Menu;
