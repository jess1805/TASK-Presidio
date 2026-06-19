let tasks = [];

//central function
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.task];

    case "delete":
      return state.filter(task => task !== action.task);

    default:
      return state;
  }
}

//like updating states in components
console.log("Initial:", tasks);

tasks = reducer(tasks, {
  type: "add",
  task: "Learn React"
});

console.log("After add:", tasks);

tasks = reducer(tasks, {
  type: "add",
  task: "Build Project"
});

console.log("After second add:", tasks);

tasks = reducer(tasks, {
  type: "delete",
  task: "Learn React"
});

console.log("After delete:", tasks);