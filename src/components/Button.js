import classes from "./Button.module.css";

const Button = (props) => {
  // reusable button component
  return <button className={classes.button}>{props.children}</button>;
};

export default Button;
