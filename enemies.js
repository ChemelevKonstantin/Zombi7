// Enemy Card Data
const enemyCards = [
    {
        type: 'Enemy',
        group: 'Animal',
        subGroup: 'Regular',
        name: 'Dead Boar',
        level: 1,
        hp: 4,
        dmg: 1,
        def: 0,
        attacksPerTurn: 1,
        initiative: 1,
        reward: {
            hp: 1,
            dmg: 0,
            def: 0,
            items: 1
        },
        image: 'Dead Boar.png'
    },
    {
        type: 'Enemy',
        group: 'Animal',
        subGroup: 'Regular',
        name: 'Dead Dog',
        level: 1,
        hp: 3,
        dmg: 1,
        def: 0,
        attacksPerTurn: 1,
        initiative: 1,
        reward: {
            hp: 1,
            dmg: 0,
            def: 0,
            items: 1
        },
        image: 'Dead Dog.png'
    },
    {
        type: 'Enemy',
        group: 'Zombie',
        subGroup: 'Regular',
        name: 'Runner',
        level: 1,
        hp: 3,
        dmg: 1,
        def: 0,
        attacksPerTurn: 2,
        initiative: 3,
        reward: {
            hp: 1,
            dmg: 0,
            def: 0,
            items: 1
        },
        image: 'Runner.png'
    },
    {
        type: 'Enemy',
        group: 'Zombie',
        subGroup: 'Regular',
        name: 'Walker',
        level: 1,
        hp: 3,
        dmg: 1,
        def: 0,
        attacksPerTurn: 1,
        initiative: 1,
        reward: {
            hp: 1,
            dmg: 0,
            def: 0,
            items: 1
        },
        image: 'Walker.png'
    },
    {
        type: 'Enemy',
        group: 'Animal',
        subGroup: 'Regular',
        name: 'Dead Bear',
        level: 2,
        hp: 6,
        dmg: 2,
        def: 1,
        attacksPerTurn: 1,
        initiative: 1,
        reward: {
            hp: 1,
            dmg: 1,
            def: 0,
            items: 2
        },
        image: 'Dead Bear.png'
    },
    {
        type: 'Enemy',
        group: 'Zombie',
        subGroup: 'Regular',
        name: 'Bloated',
        level: 2,
        hp: 4,
        dmg: 2,
        def: 0,
        attacksPerTurn: 1,
        initiative: 1,
        onDeath: {
            effect: 'explode',
            damage: 2
        },
        reward: {
            hp: 1,
            dmg: 0,
            def: 1,
            items: 2
        },
        image: 'Bloated.png'
    },
    {
        type: 'Enemy',
        group: 'Zombie',
        subGroup: 'Regular',
        name: 'Lurker',
        level: 2,
        hp: 4,
        dmg: 2,
        def: 0,
        attacksPerTurn: 1,
        initiative: 1,
        reward: {
            hp: 1,
            dmg: 0,
            def: 0,
            items: 2
        },
        image: 'Lurker.png'
    },
    {
        type: 'Enemy',
        group: 'Zombie',
        subGroup: 'Regular',
        name: 'Tank',
        level: 3,
        hp: 6,
        dmg: 3,
        def: 1,
        attacksPerTurn: 1,
        initiative: 1,
        reward: {
            hp: 2,
            dmg: 1,
            def: 1,
            items: 3
        },
        image: 'Tank.png'
    },
    {
        type: 'Enemy',
        group: 'Zombie',
        subGroup: 'Boss',
        name: 'Juggernaut',
        level: 5,
        hp: 9,
        dmg: 4,
        def: 2,
        attacksPerTurn: 1,
        initiative: 1,
        reward: {
            hp: 5,
            dmg: 0,
            def: 0,
            items: 5
        },
        image: 'Juggernaut.png'
    }
];

// Function to get enemies by level
function getEnemiesByLevel(level) {
    return enemyCards.filter(enemy => enemy.level === level);
}

// Function to get random enemy by level
function getRandomEnemyByLevel(level) {
    const levelEnemies = getEnemiesByLevel(level);
    if (levelEnemies.length === 0) return null;
    return levelEnemies[Math.floor(Math.random() * levelEnemies.length)];
}

// Function to get boss enemy
function getBossEnemy() {
    return enemyCards.find(enemy => enemy.subGroup === 'Boss');
}

// Function to set enemy in game state
function setEnemy(enemy) {
    gameState.enemy = {
        name: enemy.name,
        stats: {
            hp: enemy.hp,
            dmg: enemy.dmg,
            def: enemy.def,
            initiative: enemy.initiative,
            attacksPerTurn: enemy.attacksPerTurn
        },
        reward: enemy.reward,
        image: enemy.image
    };
    updateEnemyStats();
    updateEnemyDisplay();
}

// Function to update enemy display
function updateEnemyDisplay() {
    const enemyImage = document.getElementById('enemy-image');
    const enemyName = document.getElementById('enemy-name');
    
    enemyImage.src = `assets/${gameState.enemy.image}`;
    enemyName.textContent = gameState.enemy.name;
}

// Export functions and data
window.enemySystem = {
    getEnemiesByLevel,
    getRandomEnemyByLevel,
    getBossEnemy,
    setEnemy
}; 