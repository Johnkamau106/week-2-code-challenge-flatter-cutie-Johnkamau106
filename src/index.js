document.addEventListener('DOMContentLoaded', () => {
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');

  
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(characters => {
      characters.forEach(character => {
       
   