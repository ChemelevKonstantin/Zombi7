// Item Card Data
const itemCards = [
    // Defense Items
    {
        type: 'Item',
        group: 'Defense',
        subGroup: '',
        name: 'Shield',
        level: 1,
        cost: {
            ap: 2,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 0,
            aoeDmg: 0,
            def: 2
        },
        image: 'Shield.png'
    },
    {
        type: 'Item',
        group: 'Defense',
        subGroup: '',
        name: 'Vest',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 0,
            aoeDmg: 0,
            def: 1
        },
        image: 'Vest.png'
    },
    // Support Items
    {
        type: 'Item',
        group: 'Support',
        subGroup: '',
        name: 'Drugs',
        level: 1,
        cost: {
            ap: 0,
            hp: 0
        },
        effect: {
            ap: 2,
            hp: 0,
            dmg: 0,
            aoeDmg: 0,
            def: 0
        },
        image: 'Drugs.png'
    },
    {
        type: 'Item',
        group: 'Support',
        subGroup: '',
        name: 'Bandages',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 1,
            dmg: 0,
            aoeDmg: 0,
            def: 0
        },
        image: 'Bandages.png'
    },
    {
        type: 'Item',
        group: 'Support',
        subGroup: '',
        name: 'Vodka',
        level: 1,
        cost: {
            ap: 2,
            hp: 1
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 0,
            aoeDmg: 0,
            def: 3
        },
        image: 'Vodka.png'
    },
    // Weapon Attachments
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Attachment',
        name: 'grip',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 1,
            aoeDmg: 0,
            def: 0
        },
        image: 'grip.png'
    },
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Attachment',
        name: 'magazine',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 1,
            aoeDmg: 0,
            def: 0
        },
        image: 'magazine.png'
    },
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Attachment',
        name: 'muzzle',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 1,
            aoeDmg: 0,
            def: 0
        },
        image: 'muzzle.png'
    },
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Attachment',
        name: 'Scope',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 1,
            aoeDmg: 0,
            def: 0
        },
        image: 'Scope.png'
    },
    // Melee Weapons
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Melee',
        name: 'Baseball Bat',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 1,
            aoeDmg: 0,
            def: 0
        },
        image: 'Baseball Bat.png'
    },
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Melee',
        name: 'Machete',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 1,
            aoeDmg: 0,
            def: 0
        },
        image: 'Machete.png'
    },
    // Range Weapons
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Range',
        name: 'Pistol',
        level: 1,
        cost: {
            ap: 1,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 1,
            aoeDmg: 0,
            def: 0
        },
        image: 'Pistol.png'
    },
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Range',
        name: 'ak74',
        level: 2,
        cost: {
            ap: 2,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 2,
            aoeDmg: 0,
            def: 0
        },
        image: 'ak74.png'
    },
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Range',
        name: 'Shotgun',
        level: 3,
        cost: {
            ap: 3,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 0,
            aoeDmg: 2,
            def: 0
        },
        image: 'Shotgun.png'
    },
    {
        type: 'Item',
        group: 'Weapon',
        subGroup: 'Range',
        name: 'Hunting Rifle',
        level: 4,
        cost: {
            ap: 3,
            hp: 0
        },
        effect: {
            ap: 0,
            hp: 0,
            dmg: 3,
            aoeDmg: 0,
            def: 0
        },
        image: 'Hunting Rifle.png'
    }
];

// Function to get items by level
function getItemsByLevel(level) {
    return itemCards.filter(item => item.level === level);
}

// Function to get random items by level
function getRandomItemsByLevel(level, count) {
    const levelItems = getItemsByLevel(level);
    const shuffled = levelItems.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to get unique random items by level
function getUniqueRandomItemsByLevel(level, count, playerDeck) {
    // Get all items of the specified level
    const levelItems = getItemsByLevel(level);
    
    // Get names of items player already has in all locations (deck, hand, discard)
    const existingItemNames = new Set([
        ...playerDeck.map(item => item.name),
        ...gameState.player.hand.map(item => item.name),
        ...gameState.player.discard.map(item => item.name)
    ]);
    
    // Filter out items player already has
    const availableItems = levelItems.filter(item => !existingItemNames.has(item.name));
    
    // If we don't have enough unique items, return all available ones
    if (availableItems.length <= count) {
        return availableItems;
    }
    
    // Shuffle and return requested number of unique items
    const shuffled = availableItems.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to create card element
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.cardId = card.name;
    
    const cardContent = `
        <div class="card-image">
            <img src="assets/${card.image}" alt="${card.name}">
        </div>
        <div class="card-content">
            <h3>${card.name}</h3>
            <div class="card-cost">
                ${card.cost.ap > 0 ? `<span>cost ⚡${card.cost.ap}</span>` : ''}
                ${card.cost.hp > 0 ? `<span>cost ❤️${card.cost.hp}</span>` : ''}
            </div>
            <div class="card-effect">
                ${card.effect.ap > 0 ? `<span>gain ⚡+${card.effect.ap}</span>` : ''}
                ${card.effect.hp > 0 ? `<span>gain ❤️+${card.effect.hp}</span>` : ''}
                ${card.effect.dmg > 0 ? `<span>gain ⚔️+${card.effect.dmg}</span>` : ''}
                ${card.effect.aoeDmg > 0 ? `<span>gain 💥+${card.effect.aoeDmg}</span>` : ''}
                ${card.effect.def > 0 ? `<span>gain 🛡️+${card.effect.def}</span>` : ''}
            </div>
            <button class="remove-card" title="Remove card from deck">❌</button>
        </div>
    `;
    
    cardElement.innerHTML = cardContent;
    
    // Add remove button functionality
    const removeButton = cardElement.querySelector('.remove-card');
    removeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        removeCardFromDeck(card);
    });
    
    return cardElement;
}

// Function to remove card from deck
function removeCardFromDeck(card) {
    // Remove from deck
    const deckIndex = gameState.player.deck.findIndex(c => c.name === card.name);
    if (deckIndex !== -1) {
        gameState.player.deck.splice(deckIndex, 1);
        elements.deckCount.textContent = gameState.player.deck.length;
        addToGameLog(`Removed ${card.name} from deck`);
    }
    
    // Remove from hand
    const handIndex = gameState.player.hand.findIndex(c => c.name === card.name);
    if (handIndex !== -1) {
        gameState.player.hand.splice(handIndex, 1);
        updateHandDisplay();
    }
    
    // Remove from discard
    const discardIndex = gameState.player.discard.findIndex(c => c.name === card.name);
    if (discardIndex !== -1) {
        gameState.player.discard.splice(discardIndex, 1);
        elements.discardCount.textContent = gameState.player.discard.length;
    }
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

// Export functions and data
window.itemSystem = {
    getItemsByLevel,
    getRandomItemsByLevel,
    getUniqueRandomItemsByLevel,
    createCardElement,
    playCard
}; 