import { createSlice } from "@reduxjs/toolkit";

import update from "immutability-helper";

export const appSlice = createSlice({
  // slice name
  name: "app",

  // initial state in the form of an array
  initialState: {
    taskArray: [],
  },

  reducers: {
    // update reducer, used when database sends an update
    update(state, action) {
      const taskSet = new Set(state.taskArray.map((task) => task.id));
      if (taskSet.has(action.payload.id)) {
        // Already exists in state, don't add
        return state;
      }
      // doesn't exist in state, add it
      return {
        ...state,
        taskArray: state.taskArray.concat(action.payload),
      };
    },

    // delete reducer
    remove(state, action) {
      const id = action.payload.task;

      return {
        ...state,
        taskArray: state.taskArray.filter((taskArray) => taskArray.id !== id),
      };
    },

    // edit reducer
    edit(state, action) {
      const taskIndex = state.taskArray.findIndex(
        (task) => task.id === action.payload.id
      );
      state.taskArray[taskIndex].task = action.payload.task;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
