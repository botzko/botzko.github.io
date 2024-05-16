// Array of tarot card objects
const tarotCards = [
    { name: 'The Fool', meaning: 'Yes', image: 'the-fool.jpg' },
    { name: 'The Magician', meaning: 'No', image: 'the-magician.jpg' },
    { name: 'The High Priestess', meaning: 'Yes', image: 'the-high-priestess.jpg' },
    { name: 'The Empress', meaning: 'Yes', image: 'the-empress.jpg' },
    { name: 'The Emperor', meaning: 'No', image: 'the-emperor.jpg' },
    { name: 'The Hierophant', meaning: 'No', image: 'the-hierophant.jpg' },
    { name: 'The Lovers', meaning: 'Yes', image: 'the-lovers.jpg' },
    { name: 'The Chariot', meaning: 'Yes', image: 'the-chariot.jpg' },
    { name: 'Strength', meaning: 'Yes', image: 'strength.jpg' },
    { name: 'The Hermit', meaning: 'No', image: 'the-hermit.jpg' },
    { name: 'Wheel of Fortune', meaning: 'Yes', image: 'wheel-of-fortune.jpg' },
    { name: 'Justice', meaning: 'No', image: 'justice.jpg' },
    { name: 'The Hanged Man', meaning: 'No', image: 'the-hanged-man.jpg' },
    { name: 'Death', meaning: 'No', image: 'death.jpg' },
    { name: 'Temperance', meaning: 'Yes', image: 'temperance.jpg' },
    { name: 'The Devil', meaning: 'No', image: 'the-devil.jpg' },
    { name: 'The Tower', meaning: 'No', image: 'the-tower.jpg' },
    { name: 'The Star', meaning: 'Yes', image: 'the-star.jpg' },
    { name: 'The Moon', meaning: 'No', image: 'the-moon.jpg' },
    { name: 'The Sun', meaning: 'Yes', image: 'the-sun.jpg' },
    { name: 'Judgement', meaning: 'Yes', image: 'judgement.jpg' },
    { name: 'The World', meaning: 'Yes', image: 'the-world.jpg' },
    { name: 'Ace of Wands', meaning: 'Yes', image: 'ace-of-wands.jpg' },
    { name: 'Two of Wands', meaning: 'Yes', image: 'two-of-wands.jpg' },
    { name: 'Three of Wands', meaning: 'Yes', image: 'three-of-wands.jpg' },
    { name: 'Four of Wands', meaning: 'Yes', image: 'four-of-wands.jpg' },
    { name: 'Five of Wands', meaning: 'No', image: 'five-of-wands.jpg' },
    { name: 'Six of Wands', meaning: 'Yes', image: 'six-of-wands.jpg' },
    { name: 'Seven of Wands', meaning: 'No', image: 'seven-of-wands.jpg' },
    { name: 'Eight of Wands', meaning: 'Yes', image: 'eight-of-wands.jpg' },
    { name: 'Nine of Wands', meaning: 'No', image: 'nine-of-wands.jpg' },
    { name: 'Ten of Wands', meaning: 'No', image: 'ten-of-wands.jpg' },
    { name: 'Page of Wands', meaning: 'Yes', image: 'page-of-wands.jpg' },
    { name: 'Knight of Wands', meaning: 'Yes', image: 'knight-of-wands.jpg' },
    { name: 'Queen of Wands', meaning: 'Yes', image: 'queen-of-wands.jpg' },
    { name: 'King of Wands', meaning: 'Yes', image: 'king-of-wands.jpg' },
    // Add the remaining cards for the suits of Cups, Swords, and Pentacles
  ];
  
  // Get DOM elements
  const pickCardButton = document.getElementById('pickCard');
  const cardImageContainer = document.getElementById('cardImage');
  const resultContainer = document.getElementById('result');
  
  // Function to pick a random card
  function pickRandomCard() {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const randomCard = tarotCards[randomIndex];
  
    // Display the card image
    const cardImage = document.createElement('img');
    cardImage.src = randomCard.image;
    cardImageContainer.innerHTML = '';
    cardImageContainer.appendChild(cardImage);
  
    // Display the result
    resultContainer.textContent = `The card you picked is "${randomCard.name}", which means "${randomCard.meaning}".`;
  }
  
  // Add click event listener to the button
  pickCardButton.addEventListener('click', pickRandomCard);