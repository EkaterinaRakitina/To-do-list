let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let valueInput = "";
let input = null;
let editTasks = null;
let inputResult = "";

window.onload = init = async () => {
  input = document.getElementById("add-task");
  input.addEventListener("change", updateValue);
  const resp = await fetch("http://localhost:8000/allTasks", {
    metod: "GET",
  });
  let result = await resp.json();
  allTasks = result.data;
  render();
};

const onClickButton = async () => {
  allTasks.push({
    text: valueInput,
    isCheck: false,
  });
  const resp = await fetch("http://localhost:8000/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      text: valueInput,
      isCheck: false,
    }),
  });
  const result = await resp.json();
  allTasks = result.data;
  console.log(allTasks);
  console.log("result", result);

  localStorage.setItem("tasks", JSON.stringify(allTasks));
  valueInput = "";
  input.value = "";
  render();
};

const onClickButtonRemove = () => {
  allTasks = [];
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
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
  render();
};

const removeTasks = (index) => {
  allTasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const editTasksFunction = (index) => {
  editTasks = index;
  inputResult = allTasks[index].text;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const saveEditFunction = (index) => {
  allTasks[index].text = inputResult;
  editTasks = null;
  inputResult = "";
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const cancelEditFunction = () => {
  editTasks = null;
  inputResult = "";
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};
