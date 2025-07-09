// Load existing goals or initialize empty object
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

// DOM Selections
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const goalWrapper = document.querySelector(".goleWrapper");
const addGoalBtn = document.querySelector(".add-goal-btn");
const progressLabel = document.querySelector(".progress-Label");



// Function to update progress bar
function updateProgress() {
  const total = document.querySelectorAll(".goleContainer").length;
  const completed = document.querySelectorAll(
    ".goleContainer.completed"
  ).length;
  const percent = (completed / total) * 100;

  progressValue.style.width = `${percent}%`;
  progressValue.style.visibility = completed > 0 ? "visible" : "hidden";
  progressValue.querySelector(
    "span"
  ).textContent = `${completed}/${total} completed`;
}

// Function to save allGoals to localStorage
function saveToLocalStorage() {
  localStorage.setItem("allGoals", JSON.stringify(allGoals));
}

// Function to create a new goal element
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
  const input = goal.querySelector(".goleInput");
  const deleteBtn = goal.querySelector(".delete-btn");

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

  input.addEventListener("focus", () => {
    progressBar.classList.remove("showError");
  });

  input.addEventListener("input", () => {
    allGoals[id] = {
      name: input.value,
      completed: false,
    };
    saveToLocalStorage();
  });

  deleteBtn.addEventListener("click", () => {
    // Add fade-out class
    goal.classList.add("fade-out");

    // Wait for animation to finish before removing
    setTimeout(() => {
      goal.remove();
      delete allGoals[id];
      saveToLocalStorage();
      updateProgress();
    }, 300); // Match the CSS transition time
  });
  

  return goal;
}


// Initial Rendering

Object.entries(allGoals).forEach(([id, data]) => {
  const goal = createGoalElement(id, data.name, data.completed);
  goalWrapper.insertBefore(goal, addGoalBtn);
});

updateProgress();

// Add new goal
addGoalBtn.addEventListener("click", () => {
  const newId = `goal_${Date.now()}`; // Unique ID based on timestamp
  allGoals[newId] = { name: "", completed: false };
  const newGoal = createGoalElement(newId);
  goalWrapper.insertBefore(newGoal, addGoalBtn);
  saveToLocalStorage();
});
