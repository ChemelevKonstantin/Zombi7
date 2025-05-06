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
            dmg: 0
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
    
    // Start first encounter
    startEncounter();
    
    // Add event listeners
    elements.endTurnBtn.addEventListener('click', endTurn);
    elements.nextBtn.addEventListener('click', nextEncounter);
    
    // Log initial game state
    addToGameLog("Game started! Draw your initial hand.");
}

// Start new encounter
function startEncounter() {
    // Draw cards for the encounter
    drawCards(4);
    
    // Set up enemy based on day
    let enemy;
    if (gameState.day === 5) {
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
    
    gameState.isPlayerTurn = playerInitiative <= enemyInitiative;
    
    if (gameState.isPlayerTurn) {
        addToGameLog("You have the ⚡INI! Your turn first.");
    } else {
        addToGameLog("Enemy has the ⚡INI! Enemy's turn first.");
        enemyTurn();
    }
}

// Enemy turn logic
function enemyTurn() {
    const enemy = gameState.enemy;
    const attacks = enemy.stats.attacksPerTurn;
    
    for (let i = 0; i < attacks; i++) {
        const totalDef = gameState.player.stats.def + gameState.player.stats.tempDef;
        const damage = Math.max(0, enemy.stats.dmg - totalDef);
        gameState.player.stats.hp -= damage;
        addToGameLog(`${enemy.name} attacks for ${damage} damage!`);
        
        if (gameState.player.stats.hp <= 0) {
            gameOver();
            return;
        }
    }
    
    // Reset temporary defense after enemy turn
    gameState.player.stats.tempDef = 0;
    
    updatePlayerStats();
    gameState.isPlayerTurn = true;
}

// End player's turn
function endTurn() {
    if (!gameState.isPlayerTurn) return;
    
    gameState.isPlayerTurn = false;
    addToGameLog("Player ended their turn.");
    
    // Restore action points
    gameState.player.stats.ap = 3;
    updatePlayerStats();
    
    enemyTurn();
}

// Move to next encounter
function nextEncounter() {
    if (gameState.isPlayerTurn) return;
    
    // Apply rewards from defeated enemy
    const reward = gameState.enemy.reward;
    gameState.player.stats.hp += reward.hp;
    gameState.player.stats.dmg += reward.dmg;
    
    addToGameLog(`Received rewards: +${reward.hp} HP, +${reward.dmg} DMG`);
    
    gameState.day++;
    elements.dayCount.textContent = gameState.day;
    
    if (gameState.day > 5) {
        addToGameLog("Game Over! You've completed all encounters!");
        return;
    }
    
    startEncounter();
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
}

// Update enemy stats display
function updateEnemyStats() {
    elements.enemyStats.hp.textContent = gameState.enemy.stats.hp;
    elements.enemyStats.dmg.textContent = gameState.enemy.stats.dmg;
    elements.enemyStats.def.textContent = gameState.enemy.stats.def;
    elements.enemyStats.initiative.textContent = gameState.enemy.stats.initiative;
    elements.enemyStats.attacks.textContent = gameState.enemy.stats.attacksPerTurn;
}

// Create initial deck with 5 Level 1 Item cards
function createInitialDeck() {
    gameState.player.deck = itemSystem.getRandomItemsByLevel(1, 5);
    elements.deckCount.textContent = gameState.player.deck.length;
}

// Draw cards from deck to hand
function drawCards(count) {
    for (let i = 0; i < count; i++) {
        if (gameState.player.deck.length > 0) {
            const card = gameState.player.deck.pop();
            gameState.player.hand.push(card);
        }
    }
    elements.deckCount.textContent = gameState.player.deck.length;
    updateHandDisplay();
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
            setTimeout(() => enemyCard.classList.remove('shake'), 500);
        } else if (message.includes('attacks')) {
            // Enemy dealt damage to player
            const playerCard = document.querySelector('.player-card');
            playerCard.classList.add('shake');
            setTimeout(() => playerCard.classList.remove('shake'), 500);
        }
    } else if (message.includes('healed') || message.includes('Healed')) {
        logEntry.innerHTML = `💚 ${message}`;
        logEntry.style.color = '#44ff44';
    } else if (message.includes('defense') || message.includes('Defense')) {
        logEntry.innerHTML = `🛡️ ${message}`;
        logEntry.style.color = '#4444ff';
    } else if (message.includes('AP')) {
        logEntry.innerHTML = `✳️ ${message}`;
        logEntry.style.color = '#ffaa44';
    } else {
        logEntry.textContent = message;
    }
    
    elements.gameLog.appendChild(logEntry);
    elements.gameLog.scrollTop = elements.gameLog.scrollHeight;
}

// Initialize the game when the page loads
window.addEventListener('load', initGame); 