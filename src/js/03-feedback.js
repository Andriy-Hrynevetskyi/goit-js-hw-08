import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  feedbackFormInput: document.querySelector('input'),
  feedbackFormTextArea: document.querySelector('textarea'),
};

const formData = {};
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const ERROR_MESSAGE = 'Empty fields are forbidden!!!';

setFormDataFromStorage();

refs.feedbackForm.addEventListener('input', throttle(onInputChange, 500));
refs.feedbackForm.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function setFormDataFromStorage() {
  try {
    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (savedData.email) {
      refs.feedbackFormInput.value = savedData.email;
    }
    if (savedData.message) {
      refs.feedbackFormTextArea.value = savedData.message;
    }
  } catch {
    console.log('error');
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (refs.feedbackFormInput.value !== '' && refs.feedbackFormTextArea.value !== '') {
    event.currentTarget.reset();
    console.log(formData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } else {
    alert(ERROR_MESSAGE);
  }
}
