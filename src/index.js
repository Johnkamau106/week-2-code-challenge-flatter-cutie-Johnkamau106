document.addEventListener('DOMContentLoaded', () => {
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  let currentCharacter = null;

  
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
      currentCharacter = character;  
      detailedInfo.innerHTML = `
        <p id="name">${character.name}</p>
        <img id="image" src="${character.image}" alt="${character.name}" onerror="this.src='assets/placeholder.png';" />
        <h4>Total Votes: <span id="vote-count">${character.votes}</span></h4>
        <form id="votes-form">
          <input type="text" placeholder="Enter Votes" id="vote-input" name="votes" />
          <input type="submit" value="Add Votes" />
        </form>
        <button id="reset-btn">Reset Votes</button>
      `;
  
      
      const voteForm = document.getElementById('votes-form');
      voteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const voteInput = document.getElementById('vote-input');
        const votesToAdd = parseInt(voteInput.value, 10);

        if (!isNaN(votesToAdd) && votesToAdd > 0) {
          currentCharacter.votes += votesToAdd;
          updateVotes(currentCharacter.id, currentCharacter.votes);
          document.getElementById('vote-count').textContent = currentCharacter.votes;
          voteInput.value = '';
        }
      });
  
      
      const resetButton = document.getElementById('reset-btn');
      resetButton.addEventListener('click', () => {
        currentCharacter.votes = 0;
        updateVotes(currentCharacter.id, currentCharacter.votes);
        document.getElementById('vote-count').textContent = currentCharacter.votes;
      });
    }
    function updateVotes(characterId, votes) {
      fetch(`http://localhost:3000/characters/${characterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ votes: votes })
      })
      .then(response => response.json())
      .catch(error => console.error('Error updating votes:', error));
    }
  });