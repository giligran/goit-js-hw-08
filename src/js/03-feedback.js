import throttle from 'lodash.throttle';

const formFeedback = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  messsage: ''
};
const formDataStr = localStorage.getItem(STORAGE_KEY);

if (formDataStr) {
  formData = JSON.parse(formDataStr);
  formFeedback.email.value = formData.email;
  formFeedback.message.value = formData.message;
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (formFeedback.email.value === '' || formFeedback.message.value === '') {
    return;
  }

  formData.email = formFeedback.email.value;
  formData.message = formFeedback.message.value;

  console.log(formData);

  formFeedback.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {
    email: '',
    messsage: ''
  };
}

formFeedback.addEventListener('input', throttle(onFormInput, 500));
formFeedback.addEventListener('submit', onFormSubmit);