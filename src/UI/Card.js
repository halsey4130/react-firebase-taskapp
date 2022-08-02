import classes from "./Card.module.css";

// card style element
const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
