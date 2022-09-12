const StatsForm = ({ handler, color, icon, title, btnGroup, children }) => {
  return (
    <article className={`stats-form ${handler} ${color}`}>
      <div className="stats-form__header">
        <div className="stats-form__header__title">
          {icon}
          {title}
        </div>
      </div>
      <div className="stats-form__content">{children}</div>
    </article>
  );
};

export default StatsForm;
