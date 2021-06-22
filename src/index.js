let addToy = false;
BASE_URL = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")


const fetchToys = () => {
  return fetch(BASE_URL)
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

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
    divCard.appendChild(button)
  })
} 


// const createButton = document.querySelector("body > div.container > form > input.submit");
// createButton.addEventListener("submit", submitToy())

function submitToy(t) {
  debugger
  let newToy = {
    name: t.name,
    image: image,
    likes: likes 
    } 
    
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newToy)
  })
  
  .then(resp => resp.json())
  .then(data => fetchToys(data))
  .catch(error => {
    alert("Warning! Danger, Will Robinson!");
    document.body.innerHTML = error.message;
  })
  
}



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault()
        
        submitToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetchToys()

// When the page loads, make a 'GET' request to fetch all the toy objects. 
// With the response data, make a <div class="card"> for each toy and 
// add it to the toy-collection div.

