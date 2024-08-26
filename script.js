let posts = document.querySelector("main");
let left = document.getElementById("names");
function remove(array) {
  array.forEach((e) => {
    e.classList.remove("active");
  });
}

//getting users
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    new Promise((resolve) => {
      for (user of json) {
        left.innerHTML += `
      <div class="user">
      <h2>
      ${user.name}
      </h2>
      <p>
      ${user.email}
      </p>
      </div>`;
      }
      resolve();
    }).then(() => {
      let users = Array.from(document.getElementsByClassName("user"));
      users.forEach((user,index) => {
        user.addEventListener("click", () => {
          remove(users);
          user.classList.add("active");
          posts.innerHTML = "";          
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${index+1}`)
        .then((response) => response.json())
        .then((json) => {
          new Promise((resolve) => {
            for (post of json) {
              posts.innerHTML += `<div class="post"><h2>${post.title}</h2>
          <p>${post.body}</p><hr></div>`;
            }
          });
        });
    })})});
  })
