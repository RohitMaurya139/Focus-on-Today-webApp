// Load goals from localStorage or initialize with an empty object
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

// Select DOM elements
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const goalWrapper = document.querySelector(".goleWrapper");
const addGoalBtn = document.querySelector(".add-goal-btn");

// Function to update the progress bar display
function updateProgress() {
  const total = document.querySelectorAll(".goleContainer").length;
  const completed = document.querySelectorAll(
    ".goleContainer.completed"
  ).length;
  const percent = (completed / total) * 100;

  // Update the width and visibility of the progress bar
  progressValue.style.width = `${percent}%`;
  progressValue.style.visibility = completed > 0 ? "visible" : "hidden";
  progressValue.querySelector(
    "span"
  ).textContent = `${completed}/${total} completed`;
}

// Save current goals to localStorage
function saveToLocalStorage() {
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
}

// Create a new task/goal element
function createGoalElement(id, name = "", completed = false) {
  const goal = document.createElement("div");
  goal.className = "goleContainer";

  // Add completed class if goal is marked completed
  if (completed) goal.classList.add("completed");

  // Task template
  goal.innerHTML = `
    <div class="checkBox">
      <img src="images/check-icon.svg" alt="check-icon" class="check-icon">
    </div>
    <input type="text" class="goleInput" id="${id}" value="${name}" placeholder="Add new task..." />
    <button class="delete-btn" title="Delete Task">❌</button>
  `;

  // Get inner elements
  const checkbox = goal.querySelector(".checkBox");
  const input = goal.querySelector(".goleInput");
  const deleteBtn = goal.querySelector(".delete-btn");

  // Handle checkbox click (complete/uncomplete)
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

  // Remove error when user starts typing again
  input.addEventListener("focus", () => {
    progressBar.classList.remove("showError");
  });

  // Save input changes to localStorage
  input.addEventListener("input", () => {
    allGoals[id] = {
      name: input.value,
      completed: false,
    };
    saveToLocalStorage();
  });

  // Delete task with fade-out animation
  deleteBtn.addEventListener("click", () => {
    goal.classList.add("fade-out");

    setTimeout(() => {
      goal.remove();
      delete allGoals[id];
      saveToLocalStorage();
      updateProgress();
    }, 300); // 300ms should match CSS transition time
  });

  return goal;
}

// Render saved goals from localStorage
Object.entries(allGoals).forEach(([id, data]) => {
  const goal = createGoalElement(id, data.name, data.completed);
  goalWrapper.insertBefore(goal, addGoalBtn);
});

// Initial progress update
updateProgress();

// Handle "Add Task" button click
addGoalBtn.addEventListener("click", () => {
  const newId = `goal_${Date.now()}`; // Unique ID using timestamp
  allGoals[newId] = { name: "", completed: false };
  const newGoal = createGoalElement(newId);
  goalWrapper.insertBefore(newGoal, addGoalBtn);
  saveToLocalStorage();
});
