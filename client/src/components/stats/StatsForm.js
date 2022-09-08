const StatsForm = ({ handler, color, icon, title, btnGroup, children }) => {
  return (
    <article className={`stats-form ${handler} ${color}`}>
      <div className="stats-form__header">
        <div className="stats-form__header__title">
          {icon}
          {title}
        </div>
        {btnGroup && (
          <>
            <div className={`stats-form__header__btngroup ${color}-btngroup`}>
              <button className="btn">Today</button>
              <button className="btn">Weekly</button>
              <button className="btn">Monthly</button>
            </div>
          </>
        )}
      </div>
      <div className="stats-form__content">{children}</div>
    </article>
  );
};

export default StatsForm;
