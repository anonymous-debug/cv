
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("date");
const descInput = document.getElementById("description");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const dateError = document.getElementById("dateError");
const descError = document.getElementById("descError");

const saveBtn = document.getElementById("saveBtn");

// === Live Validasiya === //
function liveValidate() {
  const name = fullNameInput.value.trim();
  nameError.textContent = name.length < 3 ? "Ad ən azı 3 simvol olmalıdır." : "";

  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.textContent = !emailPattern.test(email) ? "Düzgün e-poçt daxil edin." : "";

  dateError.textContent = !dateInput.value ? "Tarix qeyd edilməlidir." : "";

  const desc = descInput.value.trim();
  descError.textContent = desc.length < 10 ? "Təsvir ən azı 10 simvol olmalıdır." : "";
}

// === Form Validasiya === //
function validateForm() {
  liveValidate();
  return (
    nameError.textContent === "" &&
    emailError.textContent === "" &&
    dateError.textContent === "" &&
    descError.textContent === ""
  );
}

// === Məlumatı Yadda Saxla === //
function saveData() {
  if (!validateForm()) {
    alert("Zəhmət olmasa, səhvləri düzəldin!");
    return;
  }

  const formData = {
    fullName: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    date: dateInput.value,
    description: descInput.value.trim()
  };

  localStorage.setItem("cvFormData", JSON.stringify(formData));
  alert("Məlumatlar yadda saxlanıldı!");
}

function loadData() {
  const savedData = localStorage.getItem("cvFormData");
  if (!savedData) return;

  const data = JSON.parse(savedData);
  fullNameInput.value = data.fullName || "";
  emailInput.value = data.email || "";
  dateInput.value = data.date || "";
  descInput.value = data.description || "";

  liveValidate();
}


function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();
  if (value) {
    const ul = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = value;
    ul.appendChild(li);
    input.value = "";
    saveTasks();
  }
}

// === Dil Əlavə Et === //
function addLanguage() {
  const input = document.getElementById("lang");
  const value = input.value.trim();
  if (value) {
    const ul = document.getElementById("langList");
    const li = document.createElement("li");
    li.textContent = value;
    ul.appendChild(li);
    input.value = "";
    saveLanguages();
  }
}

// === Bacarıqları Yadda Saxla === //
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => tasks.push(li.textContent));
  localStorage.setItem("skills", JSON.stringify(tasks));
}

// === Dilləri Yadda Saxla === //
function saveLanguages() {
  const langs = [];
  document.querySelectorAll("#langList li").forEach(li => langs.push(li.textContent));
  localStorage.setItem("languages", JSON.stringify(langs));
}

// === Bacarıqları Yüklə === //
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("skills")) || [];
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    ul.appendChild(li);
  });
}





function loadLanguages() {
  const langs = JSON.parse(localStorage.getItem("languages")) || [];
  const ul = document.getElementById("langList");
  ul.innerHTML = "";
  langs.forEach(lang => {
    const li = document.createElement("li");
    li.textContent = lang;
    ul.appendChild(li);
  });
}

// === Sıfırla (Əlavə olunsa) === //
function resetData() {
  localStorage.removeItem("cvFormData");
  localStorage.removeItem("skills");
  localStorage.removeItem("languages");

  fullNameInput.value = "";
  emailInput.value = "";
  dateInput.value = "";
  descInput.value = "";

  document.getElementById("taskList").innerHTML = "";
  document.getElementById("langList").innerHTML = "";

  alert("Bütün məlumatlar sıfırlandı.");
}

// === Event Listeners === //
fullNameInput.addEventListener("input", liveValidate);
emailInput.addEventListener("input", liveValidate);
dateInput.addEventListener("change", liveValidate);
descInput.addEventListener("input", liveValidate);
saveBtn.addEventListener("click", saveData);

// === Sayt Yüklənəndə === //
window.addEventListener("load", () => {
  loadData();
  loadTasks();
  loadLanguages();
});
