// Item Card Data
const itemCards = [
    // Defense Items
    {
        type: 'Item',
        group: 'Defense',
        subGroup: '',
        name: 'Military plate',
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
        image: 'Military plate.png'
    },
    {
        type: 'Item',
        group: 'Defense',
        subGroup: '',
        name: 'Pants',
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
            def: 1
        },
        image: 'Pants.png'
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
            ap: 2,
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
            def: 2
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
                ${card.cost.ap > 0 ? `<span>✳️${card.cost.ap}</span>` : ''}
                ${card.cost.hp > 0 ? `<span>❤️${card.cost.hp}</span>` : ''}
            </div>
            <div class="card-effect">
                ${card.effect.ap > 0 ? `<span>✳️+${card.effect.ap}</span>` : ''}
                ${card.effect.hp > 0 ? `<span>❤️+${card.effect.hp}</span>` : ''}
                ${card.effect.dmg > 0 ? `<span>⚔️+${card.effect.dmg}</span>` : ''}
                ${card.effect.aoeDmg > 0 ? `<span>💥+${card.effect.aoeDmg}</span>` : ''}
                ${card.effect.def > 0 ? `<span>🛡️+${card.effect.def}</span>` : ''}
            </div>
        </div>
    `;
    
    cardElement.innerHTML = cardContent;
    return cardElement;
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
        const damage = Math.max(0, card.effect.dmg - gameState.enemy.stats.def);
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
        const aoeDamage = Math.max(0, card.effect.aoeDmg - gameState.enemy.stats.def);
        gameState.enemy.stats.hp -= aoeDamage;
        addToGameLog(`Dealt ${aoeDamage} AOE damage to ${gameState.enemy.name}!`);
    }

    // Update displays
    updatePlayerStats();
    updateEnemyStats();

    // Check if enemy is defeated
    if (gameState.enemy.stats.hp <= 0) {
        addToGameLog(`${gameState.enemy.name} defeated!`);
        gameState.isPlayerTurn = false;
    }

    return true;
}

// Export functions and data
window.itemSystem = {
    getItemsByLevel,
    getRandomItemsByLevel,
    createCardElement,
    playCard
}; 