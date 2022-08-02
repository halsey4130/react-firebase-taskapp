import classes from "./TaskItem.module.css";
import { useRef, useState, useEffect } from "react";

const TaskItem = (props) => {
  const taskEdit = useRef("");
  // states to set editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [enteredTask, setEnteredTask] = useState("");
  // state used to prevent form submission by disabling button
  const [formIsValid, setFormIsValid] = useState(false);

  // triggered by onchange property in input, reflects it in state
  const inputChangeHandler = (event) => {
    setEnteredTask(event.target.value.trim());
  };

  // task edit input validation
  useEffect(() => {
    if (enteredTask !== "") {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredTask]);

  // prevent default, set newTask as task edit ref value, send task through props
  // set input back to empty, set edit states back to default
  const submitEdit = (event) => {
    event.preventDefault();

    const newTask = taskEdit.current.value;
    props.onSubmitEdit(newTask);

    taskEdit.current.value = "";
    setIsEditing(false);
    setFormIsValid(false);
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onStopEdit = () => {
    setIsEditing(false);
  };

  // change task item box based on state to edit mode or task display mode. Could possibly be refactored
  return (
    <section className={classes.taskItem}>
      {isEditing && (
        <input
          className={classes.input}
          type="text"
          id="taskEdit"
          htmlFor="taskEdit"
          placeholder="Edit task..."
          ref={taskEdit}
          onChange={inputChangeHandler}
        ></input>
      )}

      {isEditing && (
        <button
          disabled={!formIsValid}
          className={formIsValid ? classes.button : classes.buttonDisabled}
          onClick={submitEdit}
        >
          Update
        </button>
      )}

      {isEditing && (
        <button className={classes["button-red"]} onClick={onStopEdit}>
          Cancel
        </button>
      )}

      <p className={classes["task-text"]}>{props.task}</p>
      {!isEditing && (
        <button className={classes["button-yellow"]} onClick={onEdit}>
          Edit
        </button>
      )}
      {!isEditing && (
        <button className={classes["button-red"]} onClick={props.onDelete}>
          Delete
        </button>
      )}
    </section>
  );
};

export default TaskItem;
