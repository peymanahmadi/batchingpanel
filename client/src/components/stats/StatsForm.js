import { ButtonGroup } from "../shared";

const StatsForm = ({
  handler,
  color,
  icon,
  title,
  btnGroup,
  children,
  buttons,
  select,
  onPeriodClick,
}) => {
  return (
    <article className={`stats-form ${handler}`}>
      <div className="dashboard-card__header">
        <div className="dashboard-card__title">
          {icon}
          <h6>{title}</h6>
        </div>
        {buttons && (
          <div className="dashboard-card__condition">
            <ButtonGroup btns={buttons} onPeriodClick={onPeriodClick} />
          </div>
        )}
      </div>
      <div className="stats-form__content">{children}</div>
    </article>
  );
};

export default StatsForm;
