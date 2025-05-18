
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("date");
const descInput = document.getElementById("description");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const dateError = document.getElementById("dateError");
const descError = document.getElementById("descError");

const saveBtn = document.getElementById("saveBtn");


function liveValidate() {
  // Ad yoxlaması
  const name = fullNameInput.value.trim();
  if (name.length < 3) {
    nameError.textContent = "Ad ən azı 3 simvol olmalıdır.";
  } else {
    nameError.textContent = "";
  }

  
  const emailVal = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailVal)) {
    emailError.textContent = "Düzgün e-poçt daxil edin.";
  } else {
    emailError.textContent = "";
  }

  
  if (!dateInput.value) {
    dateError.textContent = "Tarix qeyd edilməlidir.";
  } else {
    dateError.textContent = "";
  }

  
  if (descInput.value.trim().length < 10) {
    descError.textContent = "Təsvir ən azı 10 simvol olmalıdır.";
  } else {
    descError.textContent = "";
  }
}


function validateForm() {
  liveValidate();

  return (
    nameError.textContent === "" &&
    emailError.textContent === "" &&
    dateError.textContent === "" &&
    descError.textContent === ""
  );
}


function saveData() {
  if (!validateForm()) {
    alert("Zəhmət olmasa, səhvləri düzəldin!");
    return;
  }

  
  const formData = {
    fullName: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    date: dateInput.value,
    description: descInput.value.trim(),

    

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


fullNameInput.addEventListener("input", liveValidate);
emailInput.addEventListener("input", liveValidate);
dateInput.addEventListener("change", liveValidate);
descInput.addEventListener("input", liveValidate);

saveBtn.addEventListener("click", saveData);


window.addEventListener("load", loadData);
