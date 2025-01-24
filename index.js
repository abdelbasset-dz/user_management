const apiUrl = "https://6792b94fcf994cc6804ae9d4.mockapi.io/api/v1/users";

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();

  document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault();
    createUser();
  });
});

async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    users.forEach((user) => {
      const userItem = document.createElement("li");
      userItem.innerHTML = `
        <span>${user.name}</span>
        <img src="${user.avatar}" alt="Avatar of ${user.name}" width="50">
        <button class="edit" onclick="editUser('${user.id}')">Edit</button>
        <button class="delete" onclick="deleteUser('${user.id}')">Delete</button>
      `;
      userList.appendChild(userItem);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    // Display an error message to the user
  }
}

async function createUser() {
  const name = document.getElementById("name").value;
  const avatar = document.getElementById("avatar").value;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    fetchUsers();
    document.getElementById("userForm").reset();
  } catch (error) {
    console.error("Error creating user:", error);
    // Display an error message to the user
  }
}

async function editUser(userId) {
  const name = prompt("Enter new name:");
  const avatar = prompt("Enter new avatar URL:");

  if (name && avatar) {
    try {
      const response = await fetch(`${apiUrl}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchUsers();
    } catch (error) {
      console.error("Error editing user:", error);
      // Display an error message to the user
    }
  }
}

async function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this current user ?')) {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "DELETE",
    }); 
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    // Display an error message to the user
  } }
}