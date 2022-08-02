import TaskItem from "./TaskItem";

import { useSelector } from "react-redux";

const TaskList = (props) => {
  // retrieve tasks from redux state
  const tasks = useSelector((state) => state.app.taskArray);

  console.log(tasks);
  let TaskDisplay;

  // no tasks to display
  if (tasks.length <= 0) {
    TaskDisplay = <ul>No tasks yet!</ul>;
  } else {
    // map tasks from redux state
    TaskDisplay = (
      <ul className="task-list">
        {/* bind will bind the task id to the payload going to the fetch request */}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task.task}
            onDelete={props.deleteTaskHandler.bind(null, task.id)}
            onEdit={props.editTaskHandler}
            onSubmitEdit={props.submitEdit.bind(null, task.id)}
          ></TaskItem>
        ))}
      </ul>
    );
  }
  return TaskDisplay;
};

export default TaskList;
