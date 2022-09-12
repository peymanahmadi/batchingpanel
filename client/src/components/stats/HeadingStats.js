import ButtonGroup from "../ButtonGroup";

const HeadingStats = () => {
  const buttons = ["Day", "Week", "Month"];
  return (
    <article className="heading-stats">
      <ButtonGroup btns={buttons} />
    </article>
  );
};

export default HeadingStats;