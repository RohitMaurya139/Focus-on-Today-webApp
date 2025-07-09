
# 📘 Focus on Today – Project Documentation

Welcome to **Focus on Today**, a minimal daily goal tracking web app built using **HTML**, **CSS**, and **JavaScript**. Below is a complete explanation of the code and logic, line by line.

---

## 📄 Part 1: HTML Code Explanation

```html
<!DOCTYPE html>
```
- Declares the document type as HTML5.

```html
<html lang="en">
```
- Root element of the webpage, with language set to English.

### `<head>` Section

```html
<meta charset="UTF-8" />
```
- Ensures correct character encoding (e.g. emojis, symbols, Hindi, etc.)

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```
- Tells Internet Explorer to use the latest rendering engine.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
- Makes the website responsive to different device sizes.

```html
<title>Focus on Today</title>
```
- Page title displayed in the browser tab.

#### External Resources

```html
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

<!-- Google Fonts (Poppins) -->
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

<!-- Custom CSS -->
<link rel="stylesheet" href="style.css" />

<!-- JavaScript -->
<script defer src="script.js"></script>
```

### `<body>` Section

```html
<h1 class="title">Focus on <span>Today</span></h1>
```
- Main heading with a span element for custom styling.

```html
<div class="appContainer">...</div>
```
- Contains the entire interactive section.

```html
<h2 class="subTitle">...</h2>
```
- Subheading, often includes an icon (e.g., 🌞).

```html
<p class="progress-Label">...</p>
```
- Motivational text related to task completion.

```html
<div class="progress-bar"><div class="progress-value"><span>0/0</span></div></div>
```
- Visual progress bar with completion stats.

```html
<div class="goleWrapper">...</div>
```
- Task container, holds dynamic task items.

```html
<button class="add-goal-btn">Add Task</button>
```
- Button to add new tasks dynamically.

```html
<footer>...</footer>
```
- Includes developer credits or motivational quotes.

---

## 🧠 Part 2: JavaScript Code Explanation

### Load Saved Goals from localStorage

```js
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
```
- Retrieves saved tasks or initializes an empty object.

### DOM Element Selection

```js
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const goalWrapper = document.querySelector(".goleWrapper");
const addGoalBtn = document.querySelector(".add-goal-btn");
```
- Selects essential DOM elements for interaction.

### Update Progress Bar Function

```js
function updateProgress() {
  const total = document.querySelectorAll(".goleContainer").length;
  const completed = document.querySelectorAll(".goleContainer.completed").length;
  const percent = (completed / total) * 100;

  progressValue.style.width = `${percent}%`;
  progressValue.style.visibility = completed > 0 ? "visible" : "hidden";
  progressValue.querySelector("span").textContent = `${completed}/${total} completed`;
}
```

- Calculates and displays completion stats.

---

### Save to localStorage

```js
function saveToLocalStorage() {
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
}
```
- Saves all goals to browser memory.

---

### Create Goal Element

```js
function createGoalElement(id, name = "", completed = false) {
  const goal = document.createElement("div");
  goal.className = "goleContainer";
  if (completed) goal.classList.add("completed");

  goal.innerHTML = `
    <div class="checkBox">
      <img src="images/check-icon.svg" alt="check-icon" class="check-icon">
    </div>
    <input type="text" class="goleInput" id="${id}" value="${name}" placeholder="Add new task..." />
    <button class="delete-btn" title="Delete Task">❌</button>
  `;

  const checkbox = goal.querySelector(".checkBox");
  const input = goal.querySelector("input");
  const deleteBtn = goal.querySelector(".delete-btn");
```

#### Checkbox Click Handler

```js
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
```

#### Input Handler

```js
  input.addEventListener("input", () => {
    allGoals[id] = {
      name: input.value,
      completed: false,
    };
    saveToLocalStorage();
  });
```

#### Delete Handler

```js
  deleteBtn.addEventListener("click", () => {
    goal.classList.add("fade-out");
    setTimeout(() => {
      goal.remove();
      delete allGoals[id];
      saveToLocalStorage();
      updateProgress();
    }, 300);
  });

  return goal;
}
```

---

### Render Saved Goals

```js
Object.entries(allGoals).forEach(([id, data]) => {
  const goal = createGoalElement(id, data.name, data.completed);
  goalWrapper.insertBefore(goal, addGoalBtn);
});
```

### Show Progress on Load

```js
updateProgress();
```

### Add New Goal on Button Click

```js
addGoalBtn.addEventListener("click", () => {
  const newId = `goal_${Date.now()}`;
  allGoals[newId] = { name: "", completed: false };
  const newGoal = createGoalElement(newId);
  goalWrapper.insertBefore(newGoal, addGoalBtn);
  saveToLocalStorage();
});
```

---

## ✅ Summary: JavaScript Concepts Used

| Concept           | Description                               |
|------------------|-------------------------------------------|
| `localStorage`   | Persistent browser storage                |
| `querySelector()`| Select a single HTML element              |
| `querySelectorAll()`| Select multiple elements               |
| `addEventListener()`| Attach click, input events             |
| `classList`      | Add/remove CSS classes                    |
| `JSON.stringify()`| Object → String conversion               |
| `JSON.parse()`   | String → Object conversion                |
| `setTimeout()`   | Delay execution                           |
| `forEach()`      | Loop through array or object             |
| Template Literals| \`Hello \${name}\` string formatting     |

---

## 🧑‍💻 Author

Created by **Rohit Maurya**  
GitHub: [RohitMaurya139](https://github.com/RohitMaurya139)
