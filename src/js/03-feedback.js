import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  feedbackFormInput: document.querySelector('input'),
  feedbackFormTextArea: document.querySelector('textarea'),
};
const formData = {};
const LOCAL_STORAGE_KEY = 'feedback-form-state';

refs.feedbackForm.addEventListener('input', throttle(onInputChange, 500));
refs.feedbackForm.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function setFormDataFromStorage() {
  const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (savedData) {
    refs.feedbackFormInput.value = savedData.email;
    refs.feedbackFormTextArea.value = savedData.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

setFormDataFromStorage();
