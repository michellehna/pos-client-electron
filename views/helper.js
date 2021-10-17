// helper functions
const { getAllUsers } = require('./requests/userRequests.js');


// DOM Nodes
const container = document.getElementById('register-user');
const mainPage = document.getElementById('main-container');
const contents = document.getElementById('contents');
const contentTitle = document.getElementById('content-title');

let newNode

// fetch users from main process and render in the renderer process
function fetchUsers() {
  getAllUsers() // fetch users from main process
    .then(users => {
      users.forEach( user => {
        populateUserTable(user);
      });
    })
    .catch(error => console.log(error));
}

function populateUserTable({id, username}) {
  const userTable = document.getElementById('user-table');
  const row = userTable.insertRow(id);
  const firstColumn = row.insertCell(0);
  const secondColumn = row.insertCell(1);
  const thirdColumn = row.insertCell(2);
  firstColumn.innerHTML = id;
  secondColumn.innerHTML = username;
  thirdColumn.innerHTML = '<div class="mx-1"><button>Edit</button>' +
    '<button class="mx-1">Delete</button></div>'
}

// if admin user login is successful, redirect into admin pannel
exports.redirectToAdminPannel = async function redirectToAdminPannel(pannelName) {
  try {
    mainPage.style.display = 'none';
    contents.style.display = 'block';
    contentTitle.innerText = 'Pharmacy';
    // console.log('state'. document.readyState);
    if (pannelName === 'register') {
      fetch('user/user.html')
        .then(res => res.text())
        .then(newContent => {
          console.log('content', newContent);
          // console.log('state'. document.readyState);
          newNode = document.createElement('div');
          // registerNode.setAttribute('class', 'container-fluid');
          newNode.innerHTML = newContent;

          contents.appendChild(newNode);
          fetchUsers();
          // populateUserTable({id: 4, username: 'admininstrator'});
        })
        .catch(error => {
          console.log(error);
        })
    }
    else if(pannelName === 'inventory'){
      const response = await fetch('inventory/inventory.html');
      const newcontent = await response.text()
      console.log(newcontent);
      contentTitle.innerText = 'My Inventory';
      newNode = document.createElement('div');
      newNode.innerHTML = newcontent;
      contents.appendChild(newNode);
    }
  }
  catch (error) {
    console.log(error);
  }
}


exports.logoutToMainMenu = async function logoutToMainMenu() {
  try {
    contents.style.display = 'none';
    contents.removeChild(newNode);
    mainPage.style.display = 'flex';
  }
  catch (error) {
    console.log(error);
  }
}
