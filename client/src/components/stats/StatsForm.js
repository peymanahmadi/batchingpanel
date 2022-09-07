const StatsForm = ({ handler, color, icon, title, children }) => {
  return (
    <article className={`stats-form ${handler} ${color}`}>
      <div className="stats-form__title">
        {icon}
        {title}
      </div>
      <div className="stats-form__content">{children}</div>
    </article>
  );
};

export default StatsForm;
