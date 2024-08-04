window.addEventListener("DOMContentLoaded", main);

const addTask = () => {
    const inputBox = document.querySelector("#input-box");
    const inputBoxErrorMsg = document.querySelector(".error-msg");
    const listContainer = document.querySelector("#list-container");
    if (inputBox.value === "") {
        inputBoxErrorMsg.innerHTML = "Vous devez saisir une tâche !";
        inputBoxErrorMsg.classList.remove("hidden");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputBoxErrorMsg.classList.add("hidden");
    }
    inputBox.value = "";
    saveTask();
};

const saveTask = () => {
    const listContainer = document.querySelector("#list-container");
    localStorage.setItem("data", listContainer.innerHTML);
};

const displayTasks = () => {
    const listContainer = document.querySelector("#list-container");
    listContainer.innerHTML = localStorage.getItem("data");
};

function main() {
    const btnAddTask = document.querySelector(".row button");
    const inputBox = document.querySelector("#input-box");
    const listContainer = document.querySelector("#list-container");
    btnAddTask.addEventListener("click", addTask);
    inputBox.addEventListener("keypress", (evt) => {
        if (evt.key === "Enter") {
            evt.preventDefault();
            addTask();
        }
    });

    listContainer.addEventListener(
        "click",
        (evt) => {
            if (evt.target.tagName === "LI") {
                evt.target.classList.toggle("checked");
                saveTask();
            } else if (evt.target.tagName === "SPAN") {
                evt.target.parentElement.remove();
                saveTask();
            }
        },
        false
    );

    displayTasks();
}
