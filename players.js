// Player data storage (in a real app, this would be a database)
let players = [];

// Initialize with 50 sample players
function initializePlayers() {
    const sampleNames = [
        'SteveMaster', 'AlexGamer', 'CreeperHunter', 'DiamondMiner', 'RedstoneWizard',
        'EnderDragonSlayer', 'NetherExplorer', 'VillageBuilder', 'FarmKing', 'PotionBrewer',
        'EnchantmentExpert', 'MinecartRider', 'BeaconBuilder', 'WitherFighter', 'GuardianKiller',
        'ElytraFlyer', 'TotemHolder', 'ShulkerBoxUser', 'ConduitPower', 'LodestoneFinder',
        'AncientDebrisMiner', 'NetheriteCrafter', 'RespawnAnchor', 'TargetBlock', 'HoneyFarmer',
        'BeeKeeper', 'PiglinTrader', 'StriderRider', 'ZombifiedPiglin', 'HoglinHunter',
        'PiglinBrute', 'SoulSandWalker', 'BasaltMiner', 'BlackstoneCrafter', 'CrimsonStem',
        'WarpedWart', 'NetherSprouts', 'TwistingVines', 'WeepingVines', 'SoulFire',
        'SoulLantern', 'ChainArmor', 'LodestoneCompass', 'SpyglassUser', 'GoatRider',
        'SculkSensor', 'AllayFriend', 'CopperOxidizer', 'LightningRod', 'SculkCatalyst'
    ];

    for (let i = 0; i < 50; i++) {
        players.push({
            name: sampleNames[i] || `Player${i + 1}`,
            skinUrl: `https://crafatar.com/renders/body/${Math.random().toString(36).substring(2, 15)}?overlay`
        });
    }
}

// Render players grid
function renderPlayers() {
    const playersGrid = document.getElementById('players-grid');
    playersGrid.innerHTML = '';

    players.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="skin-container">
                <img src="${player.skinUrl}" alt="${player.name}'s skin" class="skin-3d">
            </div>
            <h3>${player.name}</h3>
        `;
        playersGrid.appendChild(playerCard);
    });
}

// Add new player
function addPlayer(name, skinUrl) {
    players.push({ name, skinUrl });
    renderPlayers();
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    initializePlayers();
    renderPlayers();

    const addPlayerForm = document.getElementById('add-player-form');
    if (addPlayerForm) {
        addPlayerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('player-name').value.trim();
            const skinUrl = document.getElementById('skin-url').value.trim();

            if (name && skinUrl) {
                addPlayer(name, skinUrl);
                addPlayerForm.reset();
                alert(`Player ${name} added successfully!`);
            } else {
                alert('Please fill in both name and skin URL.');
            }
        });
    }
});
