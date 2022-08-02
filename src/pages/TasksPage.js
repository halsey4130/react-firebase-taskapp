import TaskInput from "../taskcomponents/TaskInput";
import TaskList from "../taskcomponents/TaskList";
import Wrapper from "../UI/Wrapper";
import { useDispatch } from "react-redux";
import { appActions } from "../store/appslice";
import Navbar from "../components/Navbar";

// error handling does not reflect in the user interface, but with console logs
// best practice would be to reflect an error prompt in the UI when (!response.ok) fires

const TasksPage = (props) => {
  // define redux dispatch hook
  const dispatch = useDispatch();

  // task prop is the task key for all API requests

  // delete task

  // be sure to use the "copy reference URL button" in your realtime database for your individual URL
  // then paste in place of URL_HERE.
  async function deleteTaskHandler(task) {
    // be sure to leave "/tasks/${task}.json" as is and replace URL_HERE with your individual URL
    const response = await fetch(`URL_HERE/tasks/${task}.json`, {
      method: "DELETE",
      body: task,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error");
    } else {
      dispatch(
        appActions.remove({
          task,
        })
      );
    }
    const data = await response.json();
    console.log(data);
  }

  // submit task, task payload does not carry a key here as it has not been assigned by firebase yet
  async function taskSubmitHandler(task) {
    // firebase will automatically add the "/tasks.json" to your realtime database if it isn't already present
    const response = await fetch(`URL_HERE/tasks.json`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error");
    }
    const data = await response.json();
    console.log(data);
  }

  // edit task, task ID is in the "task" prop, new task is in the newTask prop
  async function submitEditedTask(task, newTask) {
    const response = await fetch(`URL_HERE/tasks/${task}.json`, {
      method: "PUT",
      body: JSON.stringify({ task: newTask }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error");
    } else {
      dispatch(
        appActions.edit({
          id: task,
          task: newTask,
        })
      );
    }
    const data = await response.json();
    console.log(data);
  }

  return (
    <Wrapper>
      <Navbar />
      <TaskInput onAddTask={taskSubmitHandler} task={props.task} />
      <TaskList
        deleteTaskHandler={deleteTaskHandler}
        submitEdit={submitEditedTask}
        // carries payload for edited task
        editedTask={props.editedTask}
      />
    </Wrapper>
  );
};

export default TasksPage;
