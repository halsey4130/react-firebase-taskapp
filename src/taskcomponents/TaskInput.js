import Card from "../UI/Card";
import Button from "../components/Button";
import classes from "./TaskInput.module.css";

import { useRef } from "react";

const TaskInput = (props) => {
  const taskInput = useRef("");

  // could add form validation here

  const taskSubmitHandler = (event) => {
    // prevent event default, define task as the task ref on submit
    // send task through props, set input back to blank
    event.preventDefault();

    const task = {
      task: taskInput.current.value,
    };

    props.onAddTask(task);

    taskInput.current.value = "";
  };

  return (
    <section className={classes.formControl}>
      <Card>
        <form onSubmit={taskSubmitHandler}>
          <input
            className={classes.input}
            type="text"
            id="taskinput"
            htmlFor="taskinput"
            placeholder="Add a new task..."
            ref={taskInput}
          ></input>
          <Button>Add Task</Button>
        </form>
      </Card>
    </section>
  );
};

export default TaskInput;
