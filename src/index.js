let addToy = false;
BASE_URL = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const newToyFormData = document.querySelector(".add-toy-form")
const likeButton = document.querySelector(".like-btn")

document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})
//get data from API
const fetchToys = () => {
  return fetch(BASE_URL)
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

document.addEventListener("DOMContentLoaded", fetchToys())

const renderToys = (toys) => {
  toys.forEach(toy => {
    const divCard = document.createElement('div')
    divCard.classList.add("card")
    let h2 = document.createElement('h2')
    toyCollection.append(divCard)
    divCard.appendChild(h2)
    h2.innerHTML = toy.name
    
    let toyImage = new Image(236.4, 188.8)
    toyImage.src = toy.image
    divCard.appendChild(toyImage)

    let toyLikes = toy.likes
    let pp = document.createElement('p')
    pp.append(toyLikes)
    divCard.appendChild(pp)

    let button = document.createElement('button')
    button.classList.add("like-btn")
    button.innerHTML = "Like <3"
    button.addEventListener("click", () => addLikes(toy))
    divCard.appendChild(button)
  })
} 

newToyFormData.addEventListener("submit", (e) => submitToy(e))

function submitToy(event) {
  event.preventDefault()
    let newToy = {
    name: event.target.name.value, // product name
    image: event.target.image.value,
    likes: 0 // image URL
    }
  console.log(newToy)

  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newToy)
  })
  
  .then(resp => resp.json())
  .then(data => fetchToys())
  .catch(error => {
    alert("Warning! Danger, Will Robinson!");
    document.body.innerHTML = error.message;
  })
}

function addLikes(toy) {
  toy.likes ++
  // debugger
  fetch(`${BASE_URL}/${toy.id}`, {
    method: "PATCH",
    headers : {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(() => fetchToys())
}