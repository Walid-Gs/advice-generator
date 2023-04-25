"use strict";

//selecting Dom elements that we need:
const adviceField = document.querySelector(".advice-content");
const adviceId = document.querySelector(".advice-id");
const generateBtn = document.querySelector(".button-container");
const spinner = document.querySelector(".spinner");
const adviceContainer = document.querySelector(".advice-container");

// helpre functions to manipulate the spinner:
function showLoader() {
  spinner.hidden = false;
  adviceContainer.style.display = "none";
}

function removeLoader() {
  spinner.hidden = true;
  adviceContainer.style.display = "flex";
}

// the asyncrounous function tha get a random advice :
async function getAdvice() {
  try {
    // show the spinner :
    showLoader();

    // fetching data from the advice api:
    const apiUrl = "https://api.adviceslip.com/advice";
    const response = await fetch(apiUrl);

    //   handling eroors:
    if (!response.ok) throw new Error("something is wrong !!!");

    // getting the data :
    const { slip: adviceData } = await response.json();
    // rendering the advice:
    renderAdvice(adviceData);

    // hiding the spinner
    removeLoader();
  } catch (err) {
    console.error(err);
  }
}

getAdvice();

// the function for rendring the advice :

function renderAdvice(data) {
  // emptying the feilds:
  adviceField.textContent = "";
  adviceId.textContent = "";

  // filling the data :
  adviceField.textContent = data.advice;
  adviceId.textContent = data.id;
}

// adding an event handler to bottun to generate advice:
generateBtn.addEventListener("click", getAdvice);
