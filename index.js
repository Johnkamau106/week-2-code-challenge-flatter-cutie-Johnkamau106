document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.getElementById('character-bar');
    const detailedInfo = document.getElementById('detailed-info');
    const nameElement = document.getElementById('name');
    const imageElement = document.getElementById('image');
    const voteCountElement = document.getElementById('vote-count');
  
    // Fetch character data from the server
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(characters => {
        characters.forEach(character => {
          // Create a span element for each character
          const characterSpan = document.createElement('span');
          characterSpan.textContent = character.name;
  
          // Add click event listener to display character details
          characterSpan.addEventListener('click', () => {
            displayCharacterDetails(character);
          });
  
          // Append the span element to the character bar
          characterBar.appendChild(characterSpan);
        });
      })
      .catch(error => console.error('Error fetching characters:', error));
  
    // Function to display character details
    function displayCharacterDetails(character) {
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      voteCountElement.textContent = character.votes;
    }
  });