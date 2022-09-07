import { useTranslation } from "react-i18next";
import { TbFileSpreadsheet } from "react-icons/tb";
import StatsForm from "./StatsForm";

const MaterialInventory = () => {
  const { t } = useTranslation();
  return (
    <StatsForm
      handler="inventory"
      color="red"
      icon={<TbFileSpreadsheet />}
      title={t("STATS.INVENTORY")}
    ></StatsForm>
  );
};

export default MaterialInventory;
