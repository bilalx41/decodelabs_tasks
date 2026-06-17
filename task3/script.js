// =========================
// LOADER
// =========================

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        document.getElementById("loader").style.visibility = "hidden";
    }, 2000);
});

// =========================
// LIVE DATE & CLOCK
// =========================

const dateTime = document.getElementById("dateTime");
const liveClock = document.getElementById("liveClock");

function updateClock() {
    const now = new Date();

    dateTime.innerHTML =
        now.toDateString();

    liveClock.innerHTML =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// =========================
// TYPING EFFECT
// =========================

const welcomeText =
    document.getElementById("welcomeText");

const message =
    "Welcome Back Student 🚀";

let charIndex = 0;

welcomeText.innerHTML = "";

function typingEffect() {

    if (charIndex < message.length) {

        welcomeText.innerHTML +=
            message.charAt(charIndex);

        charIndex++;

        setTimeout(typingEffect, 80);
    }
}

typingEffect();

// =========================
// DARK MODE
// =========================

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

// =========================
// THEME COLORS
// =========================

const colors =
    document.querySelectorAll(".color");

colors.forEach(color => {

    color.addEventListener("click", () => {

        let selectedColor =
            window.getComputedStyle(color)
            .backgroundColor;

        document.documentElement
            .style
            .setProperty(
                "--primary",
                selectedColor
            );

        localStorage.setItem(
            "themeColor",
            selectedColor
        );
    });

});

const savedColor =
    localStorage.getItem("themeColor");

if (savedColor) {

    document.documentElement
        .style
        .setProperty(
            "--primary",
            savedColor
        );
}

// =========================
// TASK MANAGER
// =========================

const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTask");

const taskList =
    document.getElementById("taskList");

const priority =
    document.getElementById("priority");

const searchTask =
    document.getElementById("searchTask");

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function renderTasks(filter = "") {

    taskList.innerHTML = "";

    let filteredTasks =
        tasks.filter(task =>
            task.text
                .toLowerCase()
                .includes(filter.toLowerCase())
        );

    filteredTasks.forEach((task, index) => {

        const li =
            document.createElement("li");

        li.classList.add(task.priority);

        li.innerHTML = `
        <span class="${task.done ? "completed" : ""}">
        ${task.text}
        </span>

        <div>
            <button onclick="toggleTask(${index})">
            ✔
            </button>

            <button onclick="deleteTask(${index})">
            ❌
            </button>
        </div>
        `;

        taskList.appendChild(li);
    });

    updateAnalytics();
    updateProgress();
    saveTasks();
}

function addTask() {

    const text =
        taskInput.value.trim();

    if (!text) return;

    tasks.push({
        text,
        done: false,
        priority: priority.value
    });

    taskInput.value = "";

    renderTasks();
}

addTaskBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    e => {

        if (e.key === "Enter") {
            addTask();
        }
    }
);

searchTask.addEventListener(
    "input",
    e => {
        renderTasks(e.target.value);
    }
);

function deleteTask(index) {

    tasks.splice(index, 1);

    renderTasks();
}

function toggleTask(index) {

    tasks[index].done =
        !tasks[index].done;

    renderTasks();

    checkAchievements();
}

window.deleteTask = deleteTask;
window.toggleTask = toggleTask;

renderTasks();

// =========================
// NOTES
// =========================

const notes =
    document.getElementById("notes");

notes.value =
    localStorage.getItem("notes") || "";

notes.addEventListener("input", () => {

    localStorage.setItem(
        "notes",
        notes.value
    );
});

// =========================
// ANALYTICS
// =========================

function updateAnalytics() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.done
        ).length;

    const pending =
        total - completed;

    const rate =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    document.getElementById(
        "totalTasks"
    ).innerHTML = total;

    document.getElementById(
        "completedTasks"
    ).innerHTML = completed;

    document.getElementById(
        "pendingTasks"
    ).innerHTML = pending;

    document.getElementById(
        "completionRate"
    ).innerHTML = rate + "%";
}

// =========================
// PROGRESS RING
// =========================

function updateProgress() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.done
        ).length;

    const percent =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    document.getElementById(
        "progressText"
    ).innerHTML = percent + "%";

    const circle =
        document.getElementById(
            "progressCircle"
        );

    const circumference = 440;

    const offset =
        circumference -
        (percent / 100) *
        circumference;

    circle.style.strokeDashoffset =
        offset;
}

// =========================
// ACHIEVEMENTS
// =========================

function showAchievement(text) {

    const popup =
        document.getElementById(
            "achievementPopup"
        );

    document.getElementById(
        "achievementText"
    ).innerHTML = text;

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove(
            "show"
        );

    }, 3000);
}

function checkAchievements() {

    const completed =
        tasks.filter(
            task => task.done
        ).length;

    const badge =
        document.getElementById(
            "badge"
        );

    if (completed >= 10) {

        badge.innerHTML =
            "🏆 Productivity Master";

        showAchievement(
            "Productivity Master"
        );

    } else if (completed >= 5) {

        badge.innerHTML =
            "🔥 Consistency Champion";

        showAchievement(
            "Consistency Champion"
        );

    } else if (completed >= 1) {

        badge.innerHTML =
            "⭐ First Task Completed";

        showAchievement(
            "First Task Completed"
        );
    }
}

// =========================
// STREAK SYSTEM
// =========================

let streak =
    localStorage.getItem("streak") || 1;

document.getElementById(
    "streak"
).innerHTML =
    streak + " Days";

// =========================
// POMODORO TIMER
// =========================

let timer;
let totalSeconds = 1500;

const timerDisplay =
    document.getElementById(
        "timer"
    );

function updateTimer() {

    const mins =
        Math.floor(totalSeconds / 60);

    const secs =
        totalSeconds % 60;

    timerDisplay.innerHTML =
        `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

updateTimer();

document
.getElementById("studyMode")
.addEventListener("click", () => {

    totalSeconds = 1500;
    updateTimer();
});

document
.getElementById("shortBreak")
.addEventListener("click", () => {

    totalSeconds = 300;
    updateTimer();
});

document
.getElementById("longBreak")
.addEventListener("click", () => {

    totalSeconds = 900;
    updateTimer();
});

document
.getElementById("startTimer")
.addEventListener("click", () => {

    clearInterval(timer);

    timer = setInterval(() => {

        if (totalSeconds > 0) {

            totalSeconds--;

            updateTimer();

        } else {

            clearInterval(timer);

            alert(
                "🎉 Session Complete!"
            );
        }

    }, 1000);
});

document
.getElementById("pauseTimer")
.addEventListener("click", () => {

    clearInterval(timer);
});

document
.getElementById("resetTimer")
.addEventListener("click", () => {

    clearInterval(timer);

    totalSeconds = 1500;

    updateTimer();
});

// =========================
// CALENDAR
// =========================

const calendar =
    document.getElementById(
        "calendar"
    );

function generateCalendar() {

    const today =
        new Date().getDate();

    for (let i = 1; i <= 31; i++) {

        const day =
            document.createElement(
                "div"
            );

        day.classList.add("day");

        if (i === today) {
            day.classList.add("today");
        }

        day.innerHTML = i;

        calendar.appendChild(day);
    }
}

generateCalendar();