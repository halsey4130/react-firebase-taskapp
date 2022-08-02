import "./App.css";
import { useDispatch } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { appActions } from "./store/appslice";
import TasksPage from "./pages/TasksPage";

const { initializeApp } = require("firebase/app");
const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");

function App() {
  // paste your firebase configuration here - you can find this under project settings > general
  const app = initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  });

  // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
  // key is the counterpart to the secret key you set in the Firebase console.

  // Firebase documentation will dive into how to find this key
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(""),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  });

  // define dispatch to dispatch state updates to Redux
  const dispatch = useDispatch();

  // snippet to receive updates from database
  // https://firebase.google.com/docs/database/web/read-and-write
  const db = getDatabase();
  const task = ref(db, "tasks/");
  // receive database snapshot then dispatch to Redux
  onValue(task, (snapshot) => {
    const data = snapshot.val();
    updateTasks(data);
  });

  // dispatch to Redux with item key assigned by firebase
  const updateTasks = (data) => {
    for (const key in data) {
      dispatch(
        appActions.update({
          id: key,
          task: data[key].task,
        })
      );
    }
  };

  // could create an authentication screen here and make TasksPage a protected resource
  return (
    <div className="background">
      <TasksPage />
    </div>
  );
}

export default App;
