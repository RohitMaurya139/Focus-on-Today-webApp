✅ Part 1: HTML Code Explanation
You already have your HTML nicely structured. Here's a full breakdown:

<!DOCTYPE html>
This tells the browser to render the document using HTML5.

<html lang="en">
The root element of the webpage, with the lang="en" attribute to indicate the language is English.

<head> Section
Everything here doesn't display on the page but helps set up your page correctly.

<meta charset="UTF-8" />
Ensures characters are correctly displayed (like emojis, symbols, Hindi, etc.)

<meta http-equiv="X-UA-Compatible" content="IE=edge" />
Tells Internet Explorer to use the latest rendering engine.

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
Makes your website responsive by setting the width to match device screen.

<title>Focus on Today</title>
Appears as the tab title in your browser.

External styles and fonts:

Font Awesome: for icons like checkmarks.

Google Fonts: using “Poppins” for a modern look.

style.css: your custom stylesheet.

script.js: your main JavaScript file, loaded with defer so it runs after HTML is ready.

<body> Section
Everything visible on the page is here.

Page title:
html
Copy
Edit
<h1 class="title">Focus on <span>Today</span></h1>
Main heading. The <span> can be styled differently using CSS.

App content:
html
Copy
Edit
<div class="appContainer">...</div>
Holds the entire interactive part of the app.

<h2 class="subTitle"> – Smaller title with a sun icon.

<p class="progress-Label"> – Motivation label.

.progress-bar – Progress tracking UI.

.goleWrapper – Dynamic task list container.

"Add Task" button – Adds a new task.

Quotes and Developer section.

✅ Part 2: JavaScript Code Explanation
Let’s go line-by-line now with comments and full explanations:

🔸 Line 1:
js
Copy
Edit
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
✅ What it does:
localStorage.getItem("allGoals"): gets saved task data (in string format).

JSON.parse(...): converts that string into a JS object.

|| {}: if nothing was saved before (null), use an empty object.

🔑 Keywords & methods:
const: creates a constant variable.

JSON.parse(): parses JSON string into a JavaScript object.

localStorage: browser storage for saving data permanently (until cleared).

🔸 Selecting elements:
js
Copy
Edit
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const goalWrapper = document.querySelector(".goleWrapper");
const addGoalBtn = document.querySelector(".add-goal-btn");
✅ What it does:
Finds HTML elements using their CSS class names so you can control them with JS.

🔑 Methods:
document.querySelector(): selects the first matching element in the document.

🔸 Progress Update Function:
js
Copy
Edit
function updateProgress() {
  const total = document.querySelectorAll(".goleContainer").length;
  const completed = document.querySelectorAll(".goleContainer.completed").length;
  const percent = (completed / total) * 100;

  progressValue.style.width = `${percent}%`;
  progressValue.style.visibility = completed > 0 ? "visible" : "hidden";
  progressValue.querySelector("span").textContent = `${completed}/${total} completed`;
}
✅ What it does:
Counts total and completed goals.

Calculates percentage and updates the progress bar width and text.

🔑 Concepts:
function: declares a reusable block of code.

querySelectorAll(): gets all matching elements.

.length: counts how many items.

style.width: changes CSS style using JS.

? : is a ternary operator (short if-else).

textContent: updates text inside an element.

🔸 Save to localStorage:
js
Copy
Edit
function saveToLocalStorage() {
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
}
✅ What it does:
Saves the current task object to browser storage after converting it to a string.

🔑 Methods:
localStorage.setItem(key, value): stores data.

JSON.stringify(): converts JS object to string for saving.

🔸 Create a Goal Element:
js
Copy
Edit
function createGoalElement(id, name = "", completed = false) {
✅ This function:
Creates a new goal/task HTML element.

Adds event listeners to handle complete, delete, edit.

js
Copy
Edit
const goal = document.createElement("div");
goal.className = "goleContainer";
if (completed) goal.classList.add("completed");
Creates a <div> and optionally marks it as completed.

js
Copy
Edit
goal.innerHTML = `
  <div class="checkBox">
    <img src="images/check-icon.svg" alt="check-icon" class="check-icon">
  </div>
  <input type="text" class="goleInput" id="${id}" value="${name}" placeholder="Add new task..." />
  <button class="delete-btn" title="Delete Task">❌</button>
`;
Adds structure: checkbox, input, delete button.

Event Listener: Complete Checkbox
js
Copy
Edit
checkbox.addEventListener("click", () => {
  const inputs = document.querySelectorAll(".goleInput");
  const allFilled = [...inputs].every((inp) => inp.value.trim() !== "");

  if (!allFilled) {
    progressBar.classList.add("showError");
    return;
  }

  goal.classList.toggle("completed");
  allGoals[id].completed = !allGoals[id].completed;
  saveToLocalStorage();
  progressBar.classList.remove("showError");
  updateProgress();
});
✅ Steps:

Only allows marking complete if all inputs are filled.

Toggles the .completed class visually.

Updates storage and progress bar.

🔑 Keywords:
.addEventListener(): sets up click or input events.

.every(): checks if all inputs are filled.

.classList.toggle(): adds or removes a class.

.trim(): removes whitespace from a string.

Event Listener: Input
js
Copy
Edit
input.addEventListener("input", () => {
  allGoals[id] = {
    name: input.value,
    completed: false,
  };
  saveToLocalStorage();
});
✅ Keeps saving the task text as user types.

Event Listener: Delete
js
Copy
Edit
deleteBtn.addEventListener("click", () => {
  goal.classList.add("fade-out");

  setTimeout(() => {
    goal.remove();
    delete allGoals[id];
    saveToLocalStorage();
    updateProgress();
  }, 300);
});
✅ Adds a fade-out class (assumed animated in CSS), then:

Deletes element after 300ms,

Removes from memory (delete allGoals[id]),

Saves the updated list and refreshes progress bar.

🔸 Rendering Saved Goals:
js
Copy
Edit
Object.entries(allGoals).forEach(([id, data]) => {
  const goal = createGoalElement(id, data.name, data.completed);
  goalWrapper.insertBefore(goal, addGoalBtn);
});
✅ Reads all previously saved goals from localStorage and displays them.

🔸 Initial Call to Show Progress:
js
Copy
Edit
updateProgress();
✅ Runs once on load to set the progress bar.

🔸 Add New Goal on Click:
js
Copy
Edit
addGoalBtn.addEventListener("click", () => {
  const newId = `goal_${Date.now()}`;
  allGoals[newId] = { name: "", completed: false };
  const newGoal = createGoalElement(newId);
  goalWrapper.insertBefore(newGoal, addGoalBtn);
  saveToLocalStorage();
});
✅ When user clicks Add Task:

Generates a unique ID using current time (Date.now()),

Adds it to storage,

Creates and displays a new input field.

✅ Summary of Important JavaScript Concepts Used
Concept	Description
localStorage	Browser memory to save data
querySelector()	Finds a single DOM element
querySelectorAll()	Finds all matching elements
addEventListener()	Runs code on user actions (click, input, etc.)
classList	Add/remove/toggle CSS classes
JSON.stringify()	Converts JS object → string
JSON.parse()	Converts string → JS object
setTimeout()	Delays code execution
forEach() / entries()	Loops through object items
Template Literals	`Hello ${name}` – used to inject variables into strings

