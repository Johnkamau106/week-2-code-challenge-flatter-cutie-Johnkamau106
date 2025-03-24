document.addEventListener('DOMContentLoaded', () => {
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');

  
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(characters => {
      characters.forEach(character => {
       
        const characterSpan = document.createElement('span');
        characterSpan.textContent = character.name;

        
        characterSpan.addEventListener('click', () => {
          displayCharacterDetails(character);
        });

        
        characterBar.appendChild(characterSpan);
      });
    })
    .catch(error => console.error('Error fetching characters:', error));

  
  function displayCharacterDetails(character) {
    detailedInfo.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <p>Votes: <span id="vote-count">${character.votes}</span></p>
    `;
  }
});