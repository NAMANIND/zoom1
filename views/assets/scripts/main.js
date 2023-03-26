let usernameInput = document.getElementById("username");
let usernameInputJoin = document.getElementById("username-join");
let conferenceIdInput = document.getElementById("conference-id");

let user = null;
let username = localStorage.getItem("username");

// Set username if available in history
if (username) {
  usernameInput.value = username;
  usernameInputJoin.value = username;
}

const generateRandomNo = (min, max) => {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
};

const createRoom = () => {
  user = usernameInput.value;
  if (user.length !== 0) {
    localStorage.setItem("username", user);
    window.location.replace(
      `${window.location.origin}/${user}-${generateRandomNo(10000, 1000000)}`
    );
  } else {
    document.getElementById(
      "fullname-help-text"
    ).innerText = `Fullname can't be blank`;
  }
};

const joinRoom = () => {
  user = usernameInputJoin.value;
  if (user.length !== 0) {
    localStorage.setItem("username", user);
    let roomId = conferenceIdInput.value;
    window.location.replace(`${window.location.origin}/${roomId}`);
  } else {
    document.getElementById(
      "fullname-join-help-text"
    ).innerText = `Fullname can't be blank`;
  }
};
