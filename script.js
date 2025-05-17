// AI History Timeline Events
const timelineEvents = [
    {
        year: "1950",
        event: "Alan Turing creates the 'Turing Test' to see if computers can think like humans",
        image: "🤔"
        // For future image support:
        // image: { src: "path/to/image.png", alt: "Turing Test" }
    },
    {
        year: "1964",
        event: "ELIZA, the first chatbot, is created to talk to people like a therapist",
        image: "💭"
    },
    {
        year: "1997",
        event: "A computer called Deep Blue beats the world chess champion",
        image: "♟️"
    },
    {
        year: "2011",
        event: "Siri, the smart phone assistant, helps people with questions and tasks",
        image: "📱"
    },
    {
        year: "2014",
        event: "Computers learn to tell cats from dogs in pictures",
        image: "🐱"
    },
    {
        year: "2022",
        event: "AI creates amazing artwork and helps write stories",
        image: "🎨"
    }
];

// Game state
let isDragging = false;
let draggedCard = null;

// Initialize the game
function initializeGame() {
    const cardsContainer = document.getElementById('cards-container');
    const timelineSlotsContainer = document.querySelector('.timeline-slots');
    
    // Shuffle the events
    const shuffledEvents = [...timelineEvents].sort(() => Math.random() - 0.5);
    
    // Create cards
    shuffledEvents.forEach((event, index) => {
        const card = createCard(event);
        cardsContainer.appendChild(card);
    });
    
    // Create timeline slots
    timelineEvents.forEach((_, index) => {
        const slot = createTimelineSlot(index);
        timelineSlotsContainer.appendChild(slot);
    });
}

// Create a card element
function createCard(event) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    
    // Create the image content based on whether it's an emoji or image
    const imageContent = typeof event.image === 'string' 
        ? event.image 
        : `<img src="${event.image.src}" alt="${event.image.alt}">`;
    
    card.innerHTML = `
        <div class="image-container">
            <span class="image">${imageContent}</span>
        </div>
        <div class="year">
            <span class="year-icon">📅</span>${event.year}
        </div>
        <div class="event">${event.event}</div>
    `;
    
    // Store the correct order
    card.dataset.year = event.year;
    
    // Add drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

// Create a timeline slot
function createTimelineSlot(index) {
    const slot = document.createElement('div');
    slot.className = 'timeline-slot';
    slot.dataset.index = index;
    
    // Add drop events
    slot.addEventListener('dragover', handleDragOver);
    slot.addEventListener('dragleave', handleDragLeave);
    slot.addEventListener('drop', handleDrop);
    
    return slot;
}

// Drag and Drop handlers
function handleDragStart(e) {
    isDragging = true;
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', ''); // Required for Firefox
}

function handleDragEnd(e) {
    isDragging = false;
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('hover');
}

function handleDragLeave(e) {
    this.classList.remove('hover');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('hover');
    
    if (draggedCard) {
        const oldSlot = draggedCard.parentElement;
        
        // If dropping onto a slot that already has a card, swap them
        if (this.children.length > 0) {
            const existingCard = this.children[0];
            oldSlot.appendChild(existingCard);
        }
        
        this.appendChild(draggedCard);
    }
}

// Check if the order is correct
function checkOrder() {
    const slots = document.querySelectorAll('.timeline-slot');
    const feedback = document.getElementById('feedback');
    let isCorrect = true;
    
    // Get the years in current order
    const currentOrder = Array.from(slots).map(slot => {
        const card = slot.children[0];
        return card ? card.dataset.year : null;
    });
    
    // Check if any slots are empty
    if (currentOrder.includes(null)) {
        feedback.textContent = "Please fill all the slots in the timeline!";
        feedback.className = 'feedback error';
        return;
    }
    
    // Check if the order matches the correct order
    const correctOrder = timelineEvents.map(event => event.year);
    isCorrect = currentOrder.every((year, index) => year === correctOrder[index]);
    
    // Show feedback
    if (isCorrect) {
        feedback.textContent = "🎉 Great job! You put the AI history events in the correct order!";
        feedback.className = 'feedback success';
    } else {
        feedback.textContent = "Not quite right. Try again! Hint: Look at the years carefully.";
        feedback.className = 'feedback error';
    }
}

// Reset the game
function resetGame() {
    const cardsContainer = document.getElementById('cards-container');
    const slots = document.querySelectorAll('.timeline-slot');
    const feedback = document.getElementById('feedback');
    
    // Clear feedback
    feedback.className = 'feedback';
    feedback.textContent = '';
    
    // Move all cards back to the cards container
    slots.forEach(slot => {
        const card = slot.children[0];
        if (card) {
            cardsContainer.appendChild(card);
        }
    });
    
    // Reshuffle the cards
    const cards = Array.from(cardsContainer.children);
    cards.forEach(card => {
        cardsContainer.appendChild(card);
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

// Add check button event listener
document.getElementById('checkButton').addEventListener('click', checkOrder);

// Add reset button event listener
document.getElementById('resetButton').addEventListener('click', resetGame);

// Initialize the game when the page loads
window.addEventListener('load', initializeGame); 