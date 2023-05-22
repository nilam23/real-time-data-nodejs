// eslint-disable-next-line no-undef
const socket = io();

// displaying the newly created post
function displayPost(post) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.style.width = '400px';
  div.innerHTML = `
    <img class="card-img-top" src="data:image/jpg;base64,${post.image}" alt="Card image" style="width:100%">
    <div class="card-body">
      <h4 class="card-title">By <i>${post.owner.name}</i></h4>
      <h6>on ${post.createdAt}</h6>
      <p class="card-text">${post.caption}</p>
    </div>`;

  const br = document.createElement('br');

  document.querySelector('.post').appendChild(div);
  document.querySelector('.post').appendChild(br);
}

// listening for the post creation event
socket.on('post', (data) => {
  displayPost(data);
});
