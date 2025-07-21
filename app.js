// Tarot card data from the application data
const tarotCards = {
  "CPI: The Vanishing Act": "You opened your portal hoping for a 9. You closed it like you saw a horror movie.",
  "The Cult Clown Move": "You did Galaxy for attention. All you got was back pain and a sympathy clap.",
  "Before Theory": "Skipped class for sleep. Regret now weighs more than anything",
  "The CPI Humbling": "You flexed your cpi, but the other person has better than you",
  "Lab Partner Trap": "You thought you'd bond. She thought you'd carry the assignment. She was right.",
  "The 4AM Lie": "You said it's 'productive time'. You just ended up rearranging icons on your desktop.",
  "CHM101 Facepalm": "You said 'easy course'. First quiz said 'hahaha' in bold italics.",
  "The Freshie Frenzy": "You joined every club. Now you're overcommitted, undercaffeinated, and ghosting 7 WhatsApp groups.",
  "The Midsem Mirage": "You thought you aced the midsem. Turns out you aced writing your roll number.",
  "The Sleep Schedule Scam": "'Just a quick nap' turned into 4 missed lectures and a haunting dream about attendance.",
  "The Canteen Catastrophe": "You trusted the mess menu. You believed the canteen would deliver. And you paid the price.",
  "The Infinite Loop of Regret": "You picked a course for fun. Now you're stuck in recursion — emotionally and in code.",
  "The Professor's Poker Face": "You asked a doubt. He smiled. You still don't know if it was valid or existentially stupid.",
  "The 'Tripod's' Blessing": "You made eye contact with the 'Tripod'. Since then, things have only gone downhill.",
  "The CPT: Crush Presentation Trauma": "You volunteered. She presented. You forgot how to breathe."
};

const predictionTemplates = {
  "Academic": [
    "Bacche, your academic future looks like {card_theme}. {prediction_text}",
    "Listen up bacche, the cards say your studies are about to get intense. {prediction_text}",
    "Your academic journey is written in the stars... and it's not looking great, bacche. {prediction_text}"
  ],
  "Romantic": [
    "Bacche, your love life is about as organized as a mess queue during dinner time. {prediction_text}",
    "Your romantic future? {prediction_text} Welcome to IITK, where love comes to die.",
    "The cards have spoken about your love life, bacche. {prediction_text}"
  ],
  "Career": [
    "Your career path is clearer than the CHM101 syllabus, bacche. {prediction_text}",
    "The professional world awaits you, bacche. {prediction_text}",
    "Your future job prospects are shakier than the wifi in your hostel. {prediction_text}"
  ],
  "Social": [
    "Your social life is more confusing than ESC101 tutorials, bacche. {prediction_text}",
    "The cards reveal your social standing: {prediction_text}",
    "Bacche, your friend circle is about to undergo some major changes. {prediction_text}"
  ],
  "Personal": [
    "Your personal growth journey, bacche? {prediction_text}",
    "The universe has plans for you, bacche. {prediction_text}",
    "Your inner self says: {prediction_text}"
  ]
};

const loadingMessages = [
  "The universe is aligning...",
  "Consulting the cosmic energies...",
  "Reading your destiny...",
  "Channeling the spirits of IITK...",
  "The cards are whispering secrets..."
];

// Application state
let selectedCards = [];
let currentArea = '';
let currentGender = '';

// DOM Elements - using more specific selectors
let elements = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing application');
  
  // Initialize DOM elements
  initializeElements();
  
  // Set up the welcome stage
  initializeWelcomeStage();
  
  // Generate tarot cards
  generateTarotCards();
  
  // Setup all event listeners
  setupEventListeners();
  
  console.log('Application initialized successfully');
});

function initializeElements() {
  elements = {
    areaSelect: document.getElementById('area-select'),
    genderSelect: document.getElementById('gender-select'),
    beginBtn: document.getElementById('begin-reading-btn'),
    tarotGrid: document.getElementById('tarot-grid'),
    selectedCount: document.getElementById('selected-count'),
    revealBtn: document.getElementById('reveal-future-btn'),
    loadingText: document.getElementById('loading-text'),
    selectedCardsDisplay: document.getElementById('selected-cards-display'),
    predictionContent: document.getElementById('prediction-content'),
    tryAgainBtn: document.getElementById('try-again-btn')
  };

  // Log which elements were found
  Object.keys(elements).forEach(key => {
    if (!elements[key]) {
      console.error(`Element not found: ${key}`);
    } else {
      console.log(`Element found: ${key}`);
    }
  });
}

function initializeWelcomeStage() {
  console.log('Setting up welcome stage');
  
  // Function to check if form is complete
  function checkFormCompletion() {
    const areaSelected = elements.areaSelect && elements.areaSelect.value !== '';
    const genderSelected = elements.genderSelect && elements.genderSelect.value !== '';
    
    console.log('Form check:', { 
      areaSelected, 
      genderSelected, 
      areaValue: elements.areaSelect?.value,
      genderValue: elements.genderSelect?.value 
    });
    
    if (elements.beginBtn) {
      elements.beginBtn.disabled = !(areaSelected && genderSelected);
      console.log('Begin button disabled:', elements.beginBtn.disabled);
    }
  }

  // Add event listeners to dropdowns
  if (elements.areaSelect) {
    elements.areaSelect.addEventListener('change', function() {
      console.log('Area selected:', this.value);
      checkFormCompletion();
    });
    
    // Debug: log when dropdown is clicked
    elements.areaSelect.addEventListener('click', function() {
      console.log('Area dropdown clicked');
    });
  }

  if (elements.genderSelect) {
    elements.genderSelect.addEventListener('change', function() {
      console.log('Gender selected:', this.value);
      checkFormCompletion();
    });
    
    // Debug: log when dropdown is clicked
    elements.genderSelect.addEventListener('click', function() {
      console.log('Gender dropdown clicked');
    });
  }

  // Initial form check
  checkFormCompletion();
}

function generateTarotCards() {
  console.log('Generating tarot cards');
  
  if (!elements.tarotGrid) {
    console.error('Tarot grid element not found');
    return;
  }

  const cardNames = Object.keys(tarotCards);
  elements.tarotGrid.innerHTML = '';

  cardNames.forEach((cardName, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'tarot-card';
    cardElement.dataset.cardName = cardName;
    cardElement.innerHTML = `<div class="tarot-card-name">${cardName}</div>`;
    
    cardElement.addEventListener('click', () => {
      console.log('Card clicked:', cardName);
      selectCard(cardElement, cardName);
    });
    
    elements.tarotGrid.appendChild(cardElement);
  });
  
  console.log(`Generated ${cardNames.length} tarot cards`);
}

function selectCard(cardElement, cardName) {
  if (cardElement.classList.contains('selected')) {
    // Deselect card
    cardElement.classList.remove('selected');
    selectedCards = selectedCards.filter(card => card !== cardName);
    console.log('Card deselected:', cardName);
  } else if (selectedCards.length < 3) {
    // Select card
    cardElement.classList.add('selected');
    selectedCards.push(cardName);
    console.log('Card selected:', cardName);
  } else {
    // Already have 3 cards selected
    console.log('Maximum cards already selected');
    return;
  }

  updateCardCounter();
}

function updateCardCounter() {
  if (elements.selectedCount) {
    elements.selectedCount.textContent = selectedCards.length;
  }
  
  if (elements.revealBtn) {
    if (selectedCards.length === 3) {
      elements.revealBtn.classList.remove('hidden');
      console.log('Reveal button shown');
    } else {
      elements.revealBtn.classList.add('hidden');
      console.log('Reveal button hidden');
    }
  }
}

function setupEventListeners() {
  console.log('Setting up event listeners');
  
  // Begin reading button
  if (elements.beginBtn) {
    elements.beginBtn.addEventListener('click', function() {
      console.log('Begin reading clicked');
      currentArea = elements.areaSelect.value;
      currentGender = elements.genderSelect.value;
      console.log('Selected area:', currentArea, 'Selected gender:', currentGender);
      showStage('cardSelection');
    });
  }

  // Reveal future button
  if (elements.revealBtn) {
    elements.revealBtn.addEventListener('click', function() {
      console.log('Reveal future clicked');
      showLoadingStage();
    });
  }

  // Try again button
  if (elements.tryAgainBtn) {
    elements.tryAgainBtn.addEventListener('click', function() {
      console.log('Try again clicked');
      resetApplication();
    });
  }
}

function showStage(stageName) {
  console.log('Switching to stage:', stageName);
  
  // Get all stage elements
  const stages = {
    welcome: document.getElementById('welcome-stage'),
    cardSelection: document.getElementById('card-selection-stage'),
    loading: document.getElementById('loading-stage'),
    prediction: document.getElementById('prediction-stage')
  };

  // Hide all stages
  Object.values(stages).forEach(stage => {
    if (stage) {
      stage.classList.remove('active');
    }
  });

  // Show target stage
  if (stages[stageName]) {
    stages[stageName].classList.add('active');
    console.log('Stage activated:', stageName);
  } else {
    console.error('Stage not found:', stageName);
  }
}

function showLoadingStage() {
  showStage('loading');
  
  let messageIndex = 0;
  const messageInterval = setInterval(() => {
    if (elements.loadingText) {
      elements.loadingText.textContent = loadingMessages[messageIndex];
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }
  }, 800);

  // Show prediction after 3.5 seconds
  setTimeout(() => {
    clearInterval(messageInterval);
    showPrediction();
  }, 3500);
}

function showPrediction() {
  showStage('prediction');
  displaySelectedCards();
  generateAndDisplayPrediction();
}

function displaySelectedCards() {
  if (!elements.selectedCardsDisplay) return;
  
  elements.selectedCardsDisplay.innerHTML = '';
  
  selectedCards.forEach(cardName => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'selected-card-mini card-reveal';
    cardDiv.textContent = cardName;
    elements.selectedCardsDisplay.appendChild(cardDiv);
  });
}

function generateAndDisplayPrediction() {
  if (!elements.predictionContent) return;
  
  const prediction = generatePrediction();
  elements.predictionContent.innerHTML = '';
  
  // Typewriter effect for prediction
  let index = 0;
  const typeInterval = setInterval(() => {
    if (index < prediction.length) {
      elements.predictionContent.textContent += prediction[index];
      index++;
    } else {
      clearInterval(typeInterval);
    }
  }, 30);
}

function generatePrediction() {
  const templates = predictionTemplates[currentArea] || predictionTemplates["Personal"];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Get meanings of selected cards
  const cardMeanings = selectedCards.map(cardName => tarotCards[cardName]);
  
  // Create a prediction by combining card meanings with IITK references
  const combinedMeaning = createCombinedPrediction(cardMeanings);
  
  return template.replace('{prediction_text}', combinedMeaning)
                 .replace('{card_theme}', getCardTheme());
}

function createCombinedPrediction(meanings) {
  const iitKReferences = [
    "the mess food quality", "MTH111 assignments", "ESC101 practicals",
    "Antaragni preparations", "Techkriti deadlines", "Hall Day competitions",
    "your CPI", "the library's AC", "hostel wifi connectivity",
    "OAT construction", "placement season", "your sleep schedule"
  ];
  
  const predictions = [
    `Based on your cards, expect ${meanings[0].toLowerCase()} Your ${currentArea.toLowerCase()} life will mirror this perfectly. The second card suggests ${meanings[1].toLowerCase()} And the third? ${meanings[2].toLowerCase()} In true IITK fashion, you'll handle this about as well as ${getRandomElement(iitKReferences)}.`,
    
    `The cosmic forces reveal: ${meanings[0]} This will define your ${currentArea.toLowerCase()} journey. Meanwhile, ${meanings[1]} And don't forget ${meanings[2]} You'll navigate this maze better than finding your way around ${getRandomElement(['New SAC', 'the academic area', 'Hall 12'])}.`,
    
    `Your destiny unfolds thus: First, ${meanings[0].toLowerCase()} In your ${currentArea.toLowerCase()} sphere, this means chaos. Second, ${meanings[1].toLowerCase()} Finally, ${meanings[2].toLowerCase()} You'll adapt to this faster than adjusting to ${getRandomElement(iitKReferences)}.`,
    
    `The universe laughs as it reveals: ${meanings[0]} Your ${currentArea.toLowerCase()} future is sealed with ${meanings[1]} And the cherry on top? ${meanings[2]} At least you'll handle this better than ${getRandomElement(['registering for courses', 'finding a decent room', 'getting mess rebate'])}.`
  ];
  
  return getRandomElement(predictions);
}

function getCardTheme() {
  const themes = [
    "a midsem disaster", "your first semester", "placement prep",
    "a failed group project", "mess food poisoning", "wifi connectivity issues"
  ];
  return getRandomElement(themes);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function resetApplication() {
  console.log('Resetting application');
  
  // Reset state
  selectedCards = [];
  currentArea = '';
  currentGender = '';
  
  // Reset UI
  if (elements.areaSelect) elements.areaSelect.value = '';
  if (elements.genderSelect) elements.genderSelect.value = '';
  if (elements.beginBtn) elements.beginBtn.disabled = true;
  if (elements.selectedCount) elements.selectedCount.textContent = '0';
  if (elements.revealBtn) elements.revealBtn.classList.add('hidden');
  
  // Clear selected cards visually
  document.querySelectorAll('.tarot-card.selected').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Show welcome stage
  showStage('welcome');
}