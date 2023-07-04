import throttle from 'lodash.throttle';

const throttle = require('lodash.throttle');

const form = document.querySelector(".feedback-form");

const LOCAL_KEY = 'feedback-form-state';

populateFeedbackForm();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(LOCAL_KEY);
  event.currentTarget.reset();
}

function onInputData(event) {
  let data = localStorage.getItem(LOCAL_KEY);
  data = data ? JSON.parse(data) : {};
  let { email, message } = form.elements;
  data = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

function populateFeedbackForm() {
  let data = localStorage.getItem(LOCAL_KEY);
  if (data) {
    data = JSON.parse(data);
    Object.entries(data).forEach(([name, value]) => {
      form.elements[name].value = value ?? '';
    });
  }
}