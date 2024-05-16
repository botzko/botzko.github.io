// Array of tarot card objects
const tarotCards = [
    // Major Arcana
    { name: 'The Fool', meaning: 'Yes', image: 'the-fool.jpg', explanation: 'The Fool represents new beginnings, spontaneity, and a free spirit. This card suggests taking a leap of faith and embracing opportunities.' },
    { name: 'The Magician', meaning: 'Yes', image: 'the-magician.jpg', explanation: 'The Magician symbolizes the power of manifestation, creativity, and resourcefulness. This card indicates that you have the skills and ability to achieve your goals.' },
    { name: 'The High Priestess', meaning: 'Yes', image: 'the-high-priestess.jpg', explanation: 'The High Priestess represents intuition, wisdom, and spiritual enlightenment. This card suggests trusting your inner voice and seeking knowledge.' },
    { name: 'The Empress', meaning: 'Yes', image: 'the-empress.jpg', explanation: 'The Empress signifies fertility, nurturing, and abundance. This card indicates a time of growth, sensuality, and enjoying life\'s pleasures.' },
    { name: 'The Emperor', meaning: 'No', image: 'the-emperor.jpg', explanation: 'The Emperor represents authority, structure, and discipline. This card suggests that you may be facing obstacles or a need for more control.' },
    { name: 'The Hierophant', meaning: 'No', image: 'the-hierophant.jpg', explanation: 'The Hierophant symbolizes tradition, conformity, and established systems. This card indicates a need to question beliefs or break from conventions.' },
    { name: 'The Lovers', meaning: 'Yes', image: 'the-lovers.jpg', explanation: 'The Lovers represent love, harmony, and meaningful connections. This card suggests a time of important choices and following your heart.' },
    { name: 'The Chariot', meaning: 'Yes', image: 'the-chariot.jpg', explanation: 'The Chariot signifies willpower, determination, and overcoming obstacles. This card indicates that you have the drive and focus to achieve your goals.' },
    { name: 'Strength', meaning: 'Yes', image: 'strength.jpg', explanation: 'Strength represents inner courage, compassion, and the ability to tame the wild aspects of life. This card suggests that you have the fortitude to overcome challenges.' },
    { name: 'The Hermit', meaning: 'No', image: 'the-hermit.jpg', explanation: 'The Hermit symbolizes introspection, solitude, and seeking inner guidance. This card indicates a need for contemplation and soul-searching.' },
    { name: 'Wheel of Fortune', meaning: 'Yes', image: 'wheel-of-fortune.jpg', explanation: 'The Wheel of Fortune represents cycles, destiny, and the ever-changing nature of life. This card suggests that you should embrace the changes coming your way.' },
    { name: 'Justice', meaning: 'No', image: 'justice.jpg', explanation: 'Justice symbolizes fairness, truth, and cause and effect. This card indicates a need to seek balance and make impartial decisions.' },
    { name: 'The Hanged Man', meaning: 'No', image: 'the-hanged-man.jpg', explanation: 'The Hanged Man represents sacrifice, letting go, and a new perspective. This card suggests that you may need to suspend your beliefs or surrender to a situation.' },
    { name: 'Death', meaning: 'No', image: 'death.jpg', explanation: 'Death symbolizes endings, transitions, and transformations. This card indicates that you may be facing a significant change or the need to let go of something.' },
    { name: 'Temperance', meaning: 'Yes', image: 'temperance.jpg', explanation: 'Temperance represents balance, moderation, and patience. This card suggests that you should strive for harmony and find the middle ground.' },
    { name: 'The Devil', meaning: 'No', image: 'the-devil.jpg', explanation: 'The Devil symbolizes temptation, addiction, and the darker aspects of life. This card indicates a need to break free from unhealthy attachments or behaviors.' },
    { name: 'The Tower', meaning: 'No', image: 'the-tower.jpg', explanation: 'The Tower represents upheaval, sudden change, and the breaking down of old structures. This card suggests that you may be facing a crisis or a major life event.' },
    { name: 'The Star', meaning: 'Yes', image: 'the-star.jpg', explanation: 'The Star signifies hope, inspiration, and renewal. This card indicates that you should have faith and pursue your dreams and aspirations.' },
    { name: 'The Moon', meaning: 'No', image: 'the-moon.jpg', explanation: 'The Moon represents illusion, fear, and the unconscious mind. This card suggests that you may be facing confusion or deception, and should trust your intuition.' },
    { name: 'The Sun', meaning: 'Yes', image: 'the-sun.jpg', explanation: 'The Sun symbolizes joy, success, and positivity. This card indicates that you are on the right path and can expect good fortune and happiness.' },
    { name: 'Judgement', meaning: 'Yes', image: 'judgement.jpg', explanation: 'Judgement represents resurrection, awakening, and a call to action. This card suggests that you should follow your true calling and embrace a fresh start.' },
    { name: 'The World', meaning: 'Yes', image: 'the-world.jpg', explanation: 'The World signifies completion, integration, and accomplishment. This card indicates that you have achieved a major goal or are ready to move on to the next stage of your journey.' },

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
    resultContainer.innerHTML = `
      <h2>"${randomCard.name}"</h2>
      <p><strong> ${randomCard.meaning}</strong></p>
      <p>${randomCard.explanation}</p>
    `;
  }
  
  // Add click event listener to the button
  pickCardButton.addEventListener('click', pickRandomCard);