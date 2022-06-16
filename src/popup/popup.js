let inputAddUserElem;
let btnAddUserElem;
let usersListElem;

document.addEventListener("DOMContentLoaded", start);

function start() {
  inputAddUserElem = document.querySelector("#js-input-add-user");
  btnAddUserElem = document.querySelector("#js-btn-add-user");
  usersListElem = document.querySelector("#js-users");

  btnAddUserElem.addEventListener("click", addUserHandler);
}

function addUserHandler() {
  const userName = inputAddUserElem.value;

  const userLiElem = createUserLiElem(userName);

  usersListElem.appendChild(userLiElem);

  let localUsers;
  chrome.storage.local.get("localUsers", data => {
    if (data.localUsers) {
      localUsers = data.localUsers;
    }
  });
  chrome.storage.local.set({ localUsers: "userName" });
  console.log(localUsers);
}

function createUserLiElem(userName) {
  const id = Date.now();

  const userLiElem = document.createElement("li");
  userLiElem.innerText = userName;
  userLiElem.dataset.id = id;

  const deleteBtnElem = createUserDeleteBtnElem(id);
  userLiElem.appendChild(deleteBtnElem);

  return userLiElem;
}

function createUserDeleteBtnElem(id) {
  const deleteBtnElem = document.createElement("button");
  deleteBtnElem.innerText = "x";
  deleteBtnElem.dataset.id = id;
  deleteBtnElem.addEventListener("click", () => deleteUserHandler(id));

  return deleteBtnElem;
}

function deleteUserHandler(id) {
  const liElem = document.querySelector(`[data-id="${id}"]`);
  liElem.remove();
}
