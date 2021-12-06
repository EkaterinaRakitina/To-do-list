let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let valueInput = "";
let input = null;
let editTasks = null;
let inputResult = "";
const allTasksStorage = JSON.parse(sessionStorage.getItem("tasks"));
// console.log(allTasksStorage);

window.onload = function init() {
  input = document.getElementById("add-task");
  input.addEventListener("change", updateValue);
  localStorage.removeItem("tasks");
  sessionStorage.removeItem("tasks");
  // console.log(typeof allTasks);
  render();
};

const onClickButton = () => {
  allTasks.push({
    text: valueInput,
    isCheck: false,
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  sessionStorage.setItem("tasks", JSON.stringify(allTasks));
  valueInput = "";
  input.value = "";
  console.log(allTasks);
  render();
};

const onClickButtonRemove = () => {
  allTasks.splice(0, allTasks.length);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  sessionStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
  console.log(allTasks);
};

const updateValue = (event) => {
  valueInput = event.target.value;
};

const render = () => {
  const content = document.getElementById("content-page");
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allTasks.sort((a, b) => a.isCheck - b.isCheck);

  allTasks.map((item, index) => {
    const container = document.createElement("div");
    container.id = `task-${index}`;
    container.className = "task-container";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isCheck;
    checkbox.className = "task-checkbox";
    checkbox.onchange = () => onChangeCheckbox(index);
    container.appendChild(checkbox);

    if (editTasks === index) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = item.text;
      input.className = "input-text-task";
      input.onchange = (e) => {
        inputResult = e.target.value;
      };
      container.appendChild(input);

      const imageDone = document.createElement("img");
      imageDone.src = "img/done.svg";
      imageDone.onclick = () => saveEditFunction(index);
      container.appendChild(imageDone);

      const imageCancel = document.createElement("img");
      imageCancel.src = "img/cancel.svg";
      imageCancel.onclick = () => cancelEditFunction();
      container.appendChild(imageCancel);
    } else {
      const text = document.createElement("p");
      text.innerText = item.text;
      text.className = item.isCheck ? "text-task done-task" : "text-task";
      container.appendChild(text);

      const imageEdit = document.createElement("img");
      imageEdit.src = "img/edit.svg";
      imageEdit.onclick = () => editTasksFunction(index);
      container.appendChild(imageEdit);
      if (allTasks[index].isCheck) {
        imageEdit.className = "image-edit-none";
      }

      const imageDelete = document.createElement("img");
      imageDelete.src = "img/delete.svg";
      imageDelete.onclick = () => removeTasks(index);
      container.appendChild(imageDelete);
    }

    content.appendChild(container);
  });
};

const onChangeCheckbox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  sessionStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const removeTasks = (index) => {
  allTasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  sessionStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};
const editTasksFunction = (index) => {
  editTasks = index;
  inputResult = allTasks[index].text;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  sessionStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const saveEditFunction = (index) => {
  allTasks[index].text = inputResult;
  editTasks = null;
  inputResult = "";
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  sessionStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const cancelEditFunction = () => {
  editTasks = null;
  inputResult = "";
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  sessionStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};
