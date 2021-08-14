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
  .then(json => {
    renderToys(json), 
    console.log(json)
})}

document.addEventListener("DOMContentLoaded", fetchToys())

const renderToys = (toys) => {
  toys.forEach(toy => {
    const divCard = document.createElement('div') //create new div card
    divCard.classList.add("card") //append it's className
    let h2 = document.createElement('h2') //create new header tag
    h2.innerHTML = toy.name //attach toy.name inside header
    divCard.appendChild(h2) //attach header inside div card
    toyCollection.append(divCard) //attch div card into card container
    
    let toyImage = new Image(236.4, 188.8) //set size params for Image
    toyImage.src = toy.image
    divCard.appendChild(toyImage)

    let toyLikes = toy.likes
    let pp = document.createElement('p')
    pp.id = "toy-likes-number" // give an id to find later (line 85)
    pp.append(toyLikes)
    divCard.appendChild(pp)

    let button = document.createElement('button')
    button.classList.add("like-btn")
    button.innerHTML = "Like <3"
    button.addEventListener("click", (e) => addLikes(e, toy))
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

function addLikes(event, toy) {
  const likeElement = document.getElementById("toy-likes-number")
  ++toy.likes // increases toy.likes by 1
  // debugger
  fetch(`${BASE_URL}/${toy.id}`, {
    method: "PATCH",
    headers : {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes //submit that +1 to the db
    }) 
    // we only want to change this specific column
  })
  
  .then(resp => resp.json())
  .then((data) => {
    likeElement.innerText = data.likes //pulls that new +1 value from db and renders on DOM
  })
}