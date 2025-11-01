const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    //If we have a first name input then we are in the sign up
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    //If we don't have firstname input we are in the login page
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  /*if(errors.length > 0){
        //If there are any errors
        e.preventDefault();
        error_message.innerText = errors.join(". ")
    }*/

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  } else {
    // If there are no errors, proceed with saving or verifying user
    if (firstname_input) {
      // SIGN UP
      e.preventDefault();
      saveUser(firstname_input.value, email_input.value, password_input.value);
    } else {
      // LOGIN
      //verifyUser(email_input.value, password_input.value, e);
      e.preventDefault(); // <-- prevent form from submitting/reloading
      verifyUser(email_input.value, password_input.value);
    }
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];
  if (firstname === "" || firstname === null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }

  if (email === "" || email === null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }

  if (password === "" || password === null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  if (password.length < 8) {
    errors.push("Password must have atleast 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }

  if (password !== repeatPassword) {
    errors.push("Password does not match repeated Password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(
  (input) => input !== null
);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});
function getLoginFormErrors(email, password) {
  errors = [];
  if (email === "" || email === null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }

  if (password === "" || password === null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function saveUser(firstname, email, password) {
  // get existing users or create empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user already exists
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    error_message.innerText = "An account with this email already exists";
    email_input.parentElement.classList.add("incorrect");
    return;
  }

  // save new user
  users.push({firstname, email, password});
  localStorage.setItem("users", JSON.stringify(users));
  
  localStorage.setItem('showGreeting', 'true');
  window.location.href = 'index.html';
  form.reset();
}

function verifyUser(email, password, e) {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // store active user session
    localStorage.setItem('activeUser', JSON.stringify(user));
    localStorage.setItem('showGreeting', 'true');
    // /alert(`Welcome back, ${user.firstname}!`);
    window.location.href = 'index.html';
  } else {
    e.preventDefault();
    error_message.innerText = 'Invalid email or password';
    email_input.parentElement.classList.add('incorrect');
    password_input.parentElement.classList.add('incorrect');
  }
}

