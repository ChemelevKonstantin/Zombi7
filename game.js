// Game State
const gameState = {
    day: 1,
    player: {
        name: "Survivor",
        stats: {
            ap: 3,
            hp: 7,
            dmg: 1,
            def: 0,
            tempDef: 0, // Temporary defense from cards
            initiative: 2
        },
        deck: [],
        hand: [],
        discard: []
    },
    enemy: {
        name: "Enemy",
        stats: {
            hp: 0,
            dmg: 0,
            def: 0,
            initiative: 0,
            attacksPerTurn: 0
        },
        reward: {
            hp: 0,
            dmg: 0,
            def: 0,
            items: 0
        },
        image: "enemy.png"
    },
    isPlayerTurn: true
};

// DOM Elements
const elements = {
    dayCount: document.getElementById('day-count'),
    playerStats: {
        ap: document.getElementById('player-ap'),
        hp: document.getElementById('player-hp'),
        dmg: document.getElementById('player-dmg'),
        def: document.getElementById('player-def'),
        initiative: document.getElementById('player-initiative')
    },
    enemyStats: {
        hp: document.getElementById('enemy-hp'),
        dmg: document.getElementById('enemy-dmg'),
        def: document.getElementById('enemy-def'),
        initiative: document.getElementById('enemy-initiative'),
        attacks: document.getElementById('enemy-attacks')
    },
    deckCount: document.getElementById('deck-count'),
    discardCount: document.getElementById('discard-count'),
    playerHand: document.getElementById('player-hand'),
    gameLog: document.querySelector('.log-content'),
    endTurnBtn: document.getElementById('end-turn-btn'),
    nextBtn: document.getElementById('next-btn')
};

// Initialize game
function initGame() {
    // Set initial player stats
    updatePlayerStats();
    
    // Create initial deck
    createInitialDeck();
    
    // Initialize day count
    gameState.day = 1;
    updateDayCount();
    
    // Start first encounter
    startEncounter();
    
    // Add event listeners
    elements.endTurnBtn.addEventListener('click', endTurn);
    elements.nextBtn.addEventListener('click', nextEncounter);
    
    // Add pile click handlers
    document.querySelector('.deck-pile').addEventListener('click', () => showPileCards('Deck', gameState.player.deck));
    document.querySelector('.discard-pile').addEventListener('click', () => showPileCards('Discard Pile', gameState.player.discard));
    
    // Add modal close handler
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Set initial button states
    updateButtonStates();
    
    // Log initial game state
    addToGameLog("Game started! Draw your initial hand.");
}

// Update button states based on game state
function updateButtonStates() {
    // End Turn button is enabled only during player's turn AND enemy is not defeated
    elements.endTurnBtn.disabled = !gameState.isPlayerTurn || gameState.enemy.stats.hp <= 0;
    
    // Next button is enabled only when enemy is defeated
    elements.nextBtn.disabled = gameState.enemy.stats.hp > 0;
}

// Shuffle deck using Fisher-Yates algorithm
function shuffleDeck() {
    for (let i = gameState.player.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.player.deck[i], gameState.player.deck[j]] = [gameState.player.deck[j], gameState.player.deck[i]];
    }
}

// Start new encounter
function startEncounter() {
    // Shuffle player's deck
    shuffleDeck();
    
    // Set up enemy based on day
    let enemy;
    if (gameState.day === 7) {
        enemy = enemySystem.getBossEnemy();
    } else {
        const enemyLevel = Math.min(Math.floor(gameState.day / 2) + 1, 3);
        enemy = enemySystem.getRandomEnemyByLevel(enemyLevel);
    }
    
    if (enemy) {
        enemySystem.setEnemy(enemy);
        addToGameLog(`Encountered ${enemy.name}!`);
    }
    
    // Reset player's AP
    gameState.player.stats.ap = 3;
    updatePlayerStats();
    
    // Determine turn order
    determineTurnOrder();
}

// Determine turn order based on initiative
function determineTurnOrder() {
    const playerInitiative = gameState.player.stats.initiative;
    const enemyInitiative = gameState.enemy.stats.initiative;
    
    // Higher initiative goes first, enemy wins ties
    gameState.isPlayerTurn = playerInitiative > enemyInitiative;
    
    if (gameState.isPlayerTurn) {
        addToGameLog("You have the ⏩ INI! Your turn first.");
        // Draw initial cards only if player goes first
        drawCards(3);
    } else {
        addToGameLog("Enemy has the ⏩ INI! Enemy's turn first.");
        enemyTurn();
    }
}

// Draw cards from deck to hand
function drawCards(count) {
    for (let i = 0; i < count; i++) {
        if (gameState.player.deck.length > 0) {
            const card = gameState.player.deck.pop();
            gameState.player.hand.push(card);
        } else {
            // If deck is empty, shuffle discard pile into deck
            while (gameState.player.discard.length > 0) {
                gameState.player.deck.push(gameState.player.discard.pop());
            }
            elements.discardCount.textContent = gameState.player.discard.length;
            
            // Shuffle the deck
            shuffleDeck();
            
            // Try to draw again
            if (gameState.player.deck.length > 0) {
                const card = gameState.player.deck.pop();
                gameState.player.hand.push(card);
            } else {
                // If still no cards, break the loop
                break;
            }
        }
    }
    elements.deckCount.textContent = gameState.player.deck.length;
    updateHandDisplay();
}

// Handle start of player's turn
function startPlayerTurn() {
    gameState.isPlayerTurn = true;
    addToGameLog("Your turn! Drawing 3 cards...");
    drawCards(3);
}

// Enemy turn logic
function enemyTurn() {
    const enemy = gameState.enemy;
    const attacks = enemy.stats.attacksPerTurn;
    
    for (let i = 0; i < attacks; i++) {
        const totalDef = gameState.player.stats.def + gameState.player.stats.tempDef;
        const damage = Math.max(0, enemy.stats.dmg - totalDef);
        gameState.player.stats.hp -= damage;
        
        // Get player card element
        const playerCard = document.querySelector('.player-card');
        
        if (damage > 0) {
            addToGameLog(`${enemy.name} attacks for ${damage} damage!`);
            playerCard.classList.add('shake');
            setTimeout(() => playerCard.classList.remove('shake'), 5000);
        } else {
            addToGameLog(`${enemy.name}'s attack was blocked by your defense!`);
            playerCard.classList.add('block');
            setTimeout(() => playerCard.classList.remove('block'), 5000);
        }
        
        // Update player stats after each attack
        updatePlayerStats();
        
        if (gameState.player.stats.hp <= 0) {
            gameState.player.stats.hp = 0; // Ensure HP is exactly 0
            updatePlayerStats(); // Update display one final time
            // Add defeated effect to player card
            playerCard.classList.add('defeated');
            gameOver();
            return;
        }
    }
    
    // Reset temporary defense after enemy turn
    gameState.player.stats.tempDef = 0;
    
    updatePlayerStats();
    
    // Start player's turn and draw cards
    startPlayerTurn();
    
    // Update button states
    updateButtonStates();
}

// End player's turn
function endTurn() {
    if (!gameState.isPlayerTurn) return;
    
    gameState.isPlayerTurn = false;
    addToGameLog("Player ended their turn.");
    
    // Move all cards from hand to deck
    while (gameState.player.hand.length > 0) {
        gameState.player.deck.push(gameState.player.hand.pop());
    }
    elements.deckCount.textContent = gameState.player.deck.length;
    updateHandDisplay();
    
    // Restore action points
    gameState.player.stats.ap = 3;
    updatePlayerStats();
    
    // Update button states
    updateButtonStates();
    
    enemyTurn();
}

// Move to next encounter
function nextEncounter() {
    if (gameState.isPlayerTurn) return;
    
    // Apply rewards from defeated enemy
    const reward = gameState.enemy.reward;
    const oldStats = {
        hp: gameState.player.stats.hp,
        dmg: gameState.player.stats.dmg,
        def: gameState.player.stats.def
    };
    
    gameState.player.stats.hp += reward.hp;
    gameState.player.stats.dmg += reward.dmg;
    gameState.player.stats.def += reward.def;
    
    // Add visual feedback for rewards
    const playerCard = document.querySelector('.player-card');
    playerCard.classList.add('reward');
    setTimeout(() => playerCard.classList.remove('reward'), 5000);
    
    // Add visual feedback for stat increases
    if (reward.hp > 0) {
        const hpStat = elements.playerStats.hp.parentElement;
        hpStat.classList.add('increased');
        setTimeout(() => hpStat.classList.remove('increased'), 5000);
    }
    if (reward.dmg > 0) {
        const dmgStat = elements.playerStats.dmg.parentElement;
        dmgStat.classList.add('increased');
        setTimeout(() => dmgStat.classList.remove('increased'), 5000);
    }
    if (reward.def > 0) {
        const defStat = elements.playerStats.def.parentElement;
        defStat.classList.add('increased');
        setTimeout(() => defStat.classList.remove('increased'), 5000);
    }
    
    // Add unique item rewards to deck
    if (reward.items > 0) {
        const itemLevel = Math.min(Math.floor(gameState.day / 2) + 1, 3);
        const newItems = itemSystem.getUniqueRandomItemsByLevel(itemLevel, reward.items, gameState.player.deck);
        
        if (newItems.length > 0) {
            gameState.player.deck.push(...newItems);
            addToGameLog(`Received rewards: +${reward.hp} HP, +${reward.dmg} DMG, +${reward.def} DEF, +${newItems.length} new unique items`);
        } else {
            addToGameLog(`Received rewards: +${reward.hp} HP, +${reward.dmg} DMG, +${reward.def} DEF (No new unique items available)`);
        }
    } else {
        addToGameLog(`Received rewards: +${reward.hp} HP, +${reward.dmg} DMG, +${reward.def} DEF`);
    }
    
    // Move all cards from hand to deck
    while (gameState.player.hand.length > 0) {
        gameState.player.deck.push(gameState.player.hand.pop());
    }
    updateHandDisplay();
    
    // Move all cards from discard pile back to deck
    while (gameState.player.discard.length > 0) {
        gameState.player.deck.push(gameState.player.discard.pop());
    }
    elements.discardCount.textContent = gameState.player.discard.length;
    elements.deckCount.textContent = gameState.player.deck.length;
    
    gameState.day++;
    updateDayCount();
    
    if (gameState.day > 7) {
        addToGameLog("Game Over! You've completed all encounters!");
        return;
    }
    
    startEncounter();
    
    // Update button states
    updateButtonStates();
}

// Game over
function gameOver() {
    addToGameLog("Game Over! You have been defeated!");
    elements.endTurnBtn.disabled = true;
    elements.nextBtn.disabled = true;
}

// Update player stats display
function updatePlayerStats() {
    elements.playerStats.ap.textContent = gameState.player.stats.ap;
    elements.playerStats.hp.textContent = gameState.player.stats.hp;
    elements.playerStats.dmg.textContent = gameState.player.stats.dmg;
    elements.playerStats.def.textContent = gameState.player.stats.def + gameState.player.stats.tempDef;
    elements.playerStats.initiative.textContent = gameState.player.stats.initiative;

    // Update player image based on HP
    const playerImage = document.getElementById('player-image');
    if (gameState.player.stats.hp <= 2) {
        playerImage.src = 'assets/player_wounded.png';
    } else {
        playerImage.src = 'assets/player.png';
    }
}

// Update enemy stats display
function updateEnemyStats() {
    elements.enemyStats.hp.textContent = gameState.enemy.stats.hp;
    elements.enemyStats.dmg.textContent = gameState.enemy.stats.dmg;
    elements.enemyStats.def.textContent = gameState.enemy.stats.def;
    elements.enemyStats.initiative.textContent = gameState.enemy.stats.initiative;
    elements.enemyStats.attacks.textContent = gameState.enemy.stats.attacksPerTurn;

    // Add defeated effect if enemy HP is 0 or less
    const enemyCard = document.querySelector('.enemy-card');
    if (gameState.enemy.stats.hp <= 0) {
        enemyCard.classList.add('defeated');
    } else {
        enemyCard.classList.remove('defeated');
    }
}

// Create initial deck with 5 Level 1 Item cards
function createInitialDeck() {
    gameState.player.deck = itemSystem.getRandomItemsByLevel(1, 5);
    elements.deckCount.textContent = gameState.player.deck.length;
}

// Update hand display
function updateHandDisplay() {
    elements.playerHand.innerHTML = '';
    gameState.player.hand.forEach((card, index) => {
        const cardElement = itemSystem.createCardElement(card);
        cardElement.addEventListener('click', () => {
            if (gameState.isPlayerTurn) {
                const success = itemSystem.playCard(card);
                if (success) {
                    // Move card to discard pile
                    gameState.player.hand.splice(index, 1);
                    gameState.player.discard.push(card);
                    elements.discardCount.textContent = gameState.player.discard.length;
                    updateHandDisplay();
                }
            }
        });
        elements.playerHand.appendChild(cardElement);
    });
}

// Add message to game log with visual effects
function addToGameLog(message) {
    const logEntry = document.createElement('div');
    
    // Add emojis and styling for different types of messages
    if (message.includes('damage')) {
        logEntry.innerHTML = `💥 ${message}`;
        logEntry.style.color = '#ff4444';
        logEntry.style.fontWeight = 'bold';
        
        // Add shake animation to the target
        if (message.includes('Dealt')) {
            // Player dealt damage to enemy
            const enemyCard = document.querySelector('.enemy-card');
            enemyCard.classList.add('shake');
            setTimeout(() => enemyCard.classList.remove('shake'), 5000);
        } else if (message.includes('attacks')) {
            // Enemy dealt damage to player
            const playerCard = document.querySelector('.player-card');
            playerCard.classList.add('shake');
            setTimeout(() => playerCard.classList.remove('shake'), 5000);
        }
    } else if (message.includes('healed') || message.includes('Healed')) {
        logEntry.innerHTML = `💚 ${message}`;
        logEntry.style.color = '#44ff44';
    } else if (message.includes('defense') || message.includes('Defense')) {
        logEntry.innerHTML = `🛡️ ${message}`;
        logEntry.style.color = '#4444ff';
    } else if (message.includes('AP')) {
        logEntry.innerHTML = `⚡ ${message}`;
        logEntry.style.color = '#ffaa44';
    } else {
        logEntry.textContent = message;
    }
    
    // Add new log entry at the top
    elements.gameLog.insertBefore(logEntry, elements.gameLog.firstChild);
}

// Handle enemy defeat
function handleEnemyDefeat() {
    // Check for death effects before setting HP to 0
    const enemy = enemyCards.find(e => e.name === gameState.enemy.name);
    
    if (enemy && enemy.onDeath) {
        if (enemy.onDeath.effect === 'explode') {
            // Add explosion effects
            const enemyCard = document.querySelector('.enemy-card');
            enemyCard.classList.add('exploding');
            
            // Create explosion particles
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'explosion-particles';
            enemyCard.appendChild(particlesContainer);
            
            // Add particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'explosion-particle';
                // Random direction for each particle
                const angle = Math.random() * Math.PI * 2;
                const distance = 100 + Math.random() * 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                particle.style.setProperty('--x', `${x}px`);
                particle.style.setProperty('--y', `${y}px`);
                particlesContainer.appendChild(particle);
            }
            
            // Apply explosion damage to player after a short delay
            setTimeout(() => {
                gameState.player.stats.hp -= enemy.onDeath.damage;
                addToGameLog(`💥 ${gameState.enemy.name} exploded, dealing ${enemy.onDeath.damage} damage!`);
                
                // Add explosion animation to player card
                const playerCard = document.querySelector('.player-card');
                playerCard.classList.add('shake');
                setTimeout(() => playerCard.classList.remove('shake'), 5000);
                
                // Update player stats
                updatePlayerStats();
                
                // Check if player is defeated
                if (gameState.player.stats.hp <= 0) {
                    gameState.player.stats.hp = 0;
                    updatePlayerStats();
                    playerCard.classList.add('defeated');
                    gameOver();
                    return;
                }
                
                // Remove explosion effects
                enemyCard.classList.remove('exploding');
                particlesContainer.remove();
                
                // Complete the enemy defeat process
                completeEnemyDefeat();
            }, 4000); // Increased delay to 1.5 seconds to allow explosion to be more visible
            
            return; // Wait for explosion animation before continuing
        }
    }
    
    completeEnemyDefeat();
}

// New function to handle the completion of enemy defeat
function completeEnemyDefeat() {
    gameState.enemy.stats.hp = 0;
    gameState.isPlayerTurn = false;
    addToGameLog(`${gameState.enemy.name} defeated!`);
    
    // Add defeated effect to enemy card
    const enemyCard = document.querySelector('.enemy-card');
    enemyCard.classList.add('defeated');
    
    // Force disable end turn button and enable next button
    elements.endTurnBtn.disabled = true;
    elements.nextBtn.disabled = false;
    
    // Update displays
    updatePlayerStats();
    updateEnemyStats();
}

// Function to play card
function playCard(card) {
    if (!gameState.isPlayerTurn) {
        addToGameLog("It's not your turn!");
        return false;
    }

    // Check if player has enough AP
    if (gameState.player.stats.ap < card.cost.ap) {
        addToGameLog("Not enough AP!");
        return false;
    }

    // Check if player has enough HP for HP cost
    if (gameState.player.stats.hp <= card.cost.hp) {
        addToGameLog("Not enough HP!");
        return false;
    }

    // Apply costs
    gameState.player.stats.ap -= card.cost.ap;
    gameState.player.stats.hp -= card.cost.hp;

    // Apply effects
    if (card.effect.dmg > 0) {
        const totalDamage = card.effect.dmg + gameState.player.stats.dmg;
        const damage = Math.max(0, totalDamage - gameState.enemy.stats.def);
        gameState.enemy.stats.hp -= damage;
        addToGameLog(`Dealt ${damage} damage to ${gameState.enemy.name}!`);
    }

    if (card.effect.hp > 0) {
        gameState.player.stats.hp += card.effect.hp;
        addToGameLog(`Healed for ${card.effect.hp} HP!`);
    }

    if (card.effect.def > 0) {
        gameState.player.stats.tempDef += card.effect.def;
        addToGameLog(`Gained ${card.effect.def} temporary defense!`);
    }

    if (card.effect.ap > 0) {
        gameState.player.stats.ap += card.effect.ap;
        addToGameLog(`Gained ${card.effect.ap} AP!`);
    }

    if (card.effect.aoeDmg > 0) {
        const totalDamage = card.effect.aoeDmg + gameState.player.stats.dmg;
        const aoeDamage = Math.max(0, totalDamage - gameState.enemy.stats.def);
        gameState.enemy.stats.hp -= aoeDamage;
        addToGameLog(`Dealt ${aoeDamage} AOE damage to ${gameState.enemy.name}!`);
    }

    // Update displays
    updatePlayerStats();
    updateEnemyStats();

    // Check if enemy is defeated
    if (gameState.enemy.stats.hp <= 0) {
        handleEnemyDefeat();
    }

    return true;
}

// Show cards in a pile
function showPileCards(pileName, cards) {
    const modal = document.getElementById('pile-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCards = document.getElementById('modal-cards');
    
    // Set modal title
    modalTitle.textContent = `${pileName === 'Deck' ? 'Backpack' : pileName} (${cards.length} cards)`;
    
    // Clear previous cards
    modalCards.innerHTML = '';
    
    // Add cards to modal
    cards.forEach(card => {
        const cardElement = itemSystem.createCardElement(card);
        modalCards.appendChild(cardElement);
    });
    
    // Show modal
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('pile-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('pile-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize the game when the page loads
window.addEventListener('load', initGame);

function updateDayCount() {
    elements.dayCount.textContent = gameState.day;
    // Ensure the day count starts from 1 for the progress bar
    document.documentElement.style.setProperty('--current-day', Math.max(1, gameState.day));
} 