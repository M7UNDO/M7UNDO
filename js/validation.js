const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {

    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    
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
  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/M7UNDO" : "";
  let users = JSON.parse(localStorage.getItem("users")) || [];


  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    error_message.innerText = "An account with this email already exists";
    email_input.parentElement.classList.add("incorrect");
    return;
  }

  // Create new user
  const newUser = { firstname, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));


  localStorage.setItem("activeUser", JSON.stringify(newUser));
  localStorage.setItem("showGreeting", "true");

 
  window.location.href = `${repoName}/index.html`; // Redirect to the home page
  form.reset();
}

function verifyUser(email, password) {
  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/M7UNDO" : "";


  const emailValue = (email || "").trim();
  const passwordValue = (password || "").trim();

  // reset previous error UI
  error_message.innerText = "";
  email_input.parentElement.classList.remove("incorrect");
  password_input.parentElement.classList.remove("incorrect");

  const users = JSON.parse(localStorage.getItem("users")) || [];


  const user = users.find(u => u.email === emailValue);
  if (!user) {
    error_message.innerText = "No account found with this email";
    if (email_input) email_input.parentElement.classList.add("incorrect");
    return false;
  }

  if (user.password !== passwordValue) {
    error_message.innerText = "Incorrect password";
    if (password_input) password_input.parentElement.classList.add("incorrect");
    return false;
  }

  localStorage.setItem("activeUser", JSON.stringify(user));
  localStorage.setItem("showGreeting", "true");
  window.location.href = `${repoName}/index.html`;

  return true;
}




