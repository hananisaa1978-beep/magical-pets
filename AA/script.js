const API_URL = "https://69c9634a68edf52c954e7bbc.mockapi.io/name";

const petContainer = document.getElementById("petContainer");
const formContainer = document.getElementById("formContainer");
const openFormBtn = document.getElementById("openFormBtn");
const petForm = document.getElementById("petForm");

       
async function fetchPets() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    displayPets(data);
  } catch (err) {
    console.log("Error fetching pets:", err);
  }
}


function displayPets(pets) {
  petContainer.innerHTML = "";

  pets.forEach(pet => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${pet.name}</h3>
      <p>${pet.type}</p>
      <p>${pet.color}</p>
      <p>${pet.description}</p>
      <button onclick="releasePet('${pet.id}')">Release 🗑️</button>
    `;

    petContainer.appendChild(card);
  });
}



petForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPet = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    color: document.getElementById("color").value,
    description: document.getElementById("description").value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    });

    const data = await res.json();

    petContainer.innerHTML += `
      <div class="card">
        <h3>${data.name}</h3>
        <p>${data.type}</p>
        <p>${data.color}</p>
        <p>${data.description}</p>
      </div>
    `;

    petForm.reset();
    formContainer.classList.add("hidden");
  } catch (err) {
    console.log("Error adding pet:", err);
  }
});

 
async function releasePet(id) {
  if (!confirm("Are you sure you want to release this pet?")) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchPets(); // refresh list
  } catch (err) {
    console.log("Error deleting pet:", err);
  }
}

 
openFormBtn.addEventListener("click", () => {
  formContainer.classList.toggle("hidden");
});


fetchPets();