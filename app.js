function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    const btn = document.createElement("button");
    btn.textContent = "Sil";
    btn.onclick = () => li.remove();

    li.appendChild(btn);
    document.getElementById("taskList").appendChild(li);
    input.value = "";
  }