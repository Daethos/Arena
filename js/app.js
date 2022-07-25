// MUD Arena against Opponent (Computer)
// TOP THE TOP -- IDEAS TO WORKSHOP AND IMPLEMENT IF YOU HAVE THE TIME
// Might be able to make it so that you can EQUIP items during ACTIONS phase or ICEBOX
// Make a confirm function that starts the game and hides the hide-buttons

// -------------------- CONSTANTS ---------------------------------

// Weapon Class that pools the stats which affect combat damage

/* Do I need to make each button in HTML ONCLICK to call a function? */
class Weapons {
  constructor(name, grip, attackType, damageType, physDam, magDam) {
      this.name = name;
      this.grip = grip; // One-Hand, Two-Hand
      this.attackType = attackType; // This evaluates against
      this.damageType = damageType; // This evaluates against magical resistance
      this.physDam = physDam; // Physical Damage NUMBER
      this.magDam = magDam; // Magical Damage NUMBER
  }
}
// Shield class that pools the stats which affect combat damage mitigation
class Shields {
    constructor(name, physRes, magRes, roll) {
    this.name = name;
    this.physRes = physRes;
    this.magRes = magRes;
    this.roll = roll;
    }
}
// Might be able to make it so that you can EQUIP items during ACTIONS phase or ICEBOX
// Armor Class that pools the stats which affect combat damage mitigation
class Armors {
 constructor(name, type, physRes, magRes, dodge) {
   this.name = name; //Name of the equipment
   this.type = type; //CLoth, ClothLeather, LeatherMail, ChainMail, PlateMail
   this.physRes = physRes; // Physical Resistance, affects PHYSICAL DAMAGE TYPE
   this.magRes = magRes; // Magical Resistance, affects SPELL DAMAGE TYPE
   this.dodge = dodge; // Chance to EVADE Attack, affects ROLL (DODGE)
 }
}

// COMPUTER OPPONENTS
class Opponents {
  constructor(name, weapon, shield, armor) {
    this.name = name;
    this.weapon = weapon;
    this.shield = shield;
    this.armor = armor;
  }
}

// Health Bar to structure and dynamicially adjust health bars during combat
class HealthBars {
  constructor(x, y, w, h, maxHealth, color) {
    // Grants me working with static and length/width and variable length/widith
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.maxHealth = maxHealth;
    this.maxWidth = w;
    this.health = maxHealth;
    this.color = color;
  }
  show(playContext) {
    playContext.lineWidth = 5;
    playContext.strokeStyle = "white";
    playContext.fillStyle = this.color;
    playContext.fillRect(this.x, this.y, this.w, this.h);
    playContext.strokeRect(this.x, this.y, this.maxWidth, this.h);
  }
  show(compContext) {
    compContext.lineWidth = 5;
    compContext.strokeStyle = "white";
    compContext.fillStyle = this.color;
    compContext.fillRect(this.x, this.y, this.w, this.h);
    compContext.strokeRect(this.x, this.y, this.maxWidth, this.h);
  }
  updateHealth(val) {
    this.health = val;
    this.w = (this.health / this.maxHealth) * this.maxWidth;
  }
}
// Elements to get the Canvas tag
const computerHealth = document.querySelector('#computer-health');
const playerHealth = document.querySelector('#player-health');
// Grants me access to 'drawing' on the canvas tag
const playContext = playerHealth.getContext('2d');
const compContext = computerHealth.getContext('2d');

const compHW = computerHealth.width = 500;
const compHH = computerHealth.height = 25;
const playHW = playerHealth.width = 250;
const playHH = playerHealth.height = 20;

let playHealth = 1000;
let compHealth = 2000;
const playHBW = 250;
const playHBH = 15;
const hX = playHW / 2 - playHBW / 2;
const hY = playHH / 2 - playHBH / 2;
const compHBW = 500;
const compHBH = 25;
const cX = compHW / 2 - compHBW / 2;
const cY = compHH / 2 - compHBH / 2;

const playHealthBar = new HealthBars(hX, hY, playHBW, playHBH, playHealth, 'green');
const compHealthBar = new HealthBars(cX, cY, compHBW, compHBH, compHealth, 'green');

const playFrame = function() {
  playContext.clearRect(0, 0, playHW, playHH);
  playHealthBar.show(playContext);
  requestAnimationFrame(playFrame);
}
const compFrame = function() {
  compContext.clearRect(0, 0, compHW, compHH);
  compHealthBar.show(compContext);
  requestAnimationFrame(compFrame);
}
playFrame();
compFrame();

playerHealth.addEventListener('click', function() {
  playHealth -= 100;
  playHealthBar.updateHealth(playHealth);
});

// Opponents
// Opponent ALWAYS ATTACKS ONCE W/ WEAPON1.
// FUNCTION to choose between ATTACK w/ SPELL or DODGE
const dorien = new Opponents('Dorien', 'greatSpear', 'insanity', 'fox');
const guts = new Opponents('Guts', 'hunkOfIron', 'godHand', 'wolf');
const daethos = new Opponents('Daethos', 'soulRend', 'soulRend', 'hush'); // Hidden Boss

// Weapon Possibilities
const gladius = new Weapons('Gladius', 'oneHand', 'P', 'P', 200, 0);
const dagger = new Weapons('Pugio', 'oneHand', 'P', 'P', 150, 0); // +10% Ddodge as is
const scythe = new Weapons('Scythe', 'oneHand', 'P', 'P', 200, 0);
const spear = new Weapons('Spear', 'oneHand', 'P', 'P', 200, 0); // +Dodge to offset position limitations
const katana = new Weapons('Katana', 'oneHand', 'P', 'S', 200, 0);
const halberd = new Weapons('Halberd', 'twoHand', 'P', 'P', 300, 0);
const claymore = new Weapons('Claymore', 'twoHand', 'P', 'S', 300, 0);
const battleAxe = new Weapons('Battle Axe', 'twoHand', 'P', 'S', 300, 0);
const warHammer = new Weapons('War Hammer', 'twoHand', 'P', 'B', 300, 0);
const mace = new Weapons('Mace', 'oneHand', 'P', 'B' , 200, 0);

// Spell Possibilities
const fireBall = new Weapons('Fireball', 'oneHand', 'M', 'Fi', 0, 250);
const lightningSpear = new Weapons('Lightning Spear', 'oneHand', 'M', 'L', 0, 250);
const magicMissile = new Weapons('Magic Missle', 'oneHand', 'M', 'S', 0, 250);
const snowBall = new Weapons('Snow Ball', 'oneHand', 'M', 'Fr', 0, 250);

// Shield Possibilties
const smallShield = new Shields('Parrying Buckler', 5, 5, 3); // +Dodge to offset position limitaions
const mediumShield = new Shields('Heater Shield', 10, 10, 4);
const largeShield = new Shields('Scutum', 15, 15, 5);
const greatShield = new Shields('Pavise', 25, 25, 6);

// Opponent Equipment
const greatSpear = new Weapons('Blood Moon', 'twoHand', 'P', 'P', 250, 0); // Dorien Weapon / NOT available for player
const insanity = new Weapons('Insanity', 'oneHand', 'M-P', 'D', 100, 150);
const soulRend = new Weapons('Soul Rend', 'oneHand', 'M-P', 'S', 150, 150); // Daethos Spell / Also available
const godHand = new Weapons('God Hand', 'oneHand', 'M-P', 'Fa', 150, 100); // Guts Spell / Also available
const hunkOfIron = new Weapons('Large Hunk of Iron', 'twoHand', 'P', 'S', 250, 0); // Guts Weapon / NOT available for player

// Armor Possibilities
const legionnaire = new Armors("Legionnaire's Regalia", 'leather-mail', 20, 20, 25); //
const knight = new Armors("Knight's Full Plate", 'plate-mail', 50, 50, 5); //
const mage = new Armors("Mage's Robes", 'leather-cloth', 5, 50, 50); //
const celt = new Armors("Celtic Menagerie", 'leather-mail', 30, 30, 35); //
const poorKnight = new Armors("Poor Knight's Chainmail", "chain-mail", 40, 40, 10); // 
const viking = new Armors("Viking's Lamellar", 'leather-mail', 25, 25, 30); // -10% Frost
const wolf = new Armors('Wolf Armor', 'plate-mail', 50, 50, 25);
const fox = new Armors('Fatal Fox', 'plate-mail', 50, 50, 25);
const hush = new Armors('Of Hush and Tendril', 'leather-cloth', 75, 75, 75);

// ----------------- CACHED ELEMENT REFERENCES ---------------------------

// Starting Game Elements
const chooseEl = document.querySelector('#choose');
const randomEl = document.querySelector('#random');
const confirmEl = document.querySelector('#confirm');
const duelEl = document.querySelector('#duel');

// Equipment Button Elements
const weaponBtns = document.querySelector('.weapons');
const armorBtns = document.querySelector('.armors');
const shieldBtns = document.querySelector('.shields');
const hideBtns = document.querySelector('.hide-button');

// Action Button Elements
const actionsEl = document.querySelector('#actions');
const actionEls = document.getElementsByClassName('action');
const initiateEl = document.getElementById('initiate');

// Player Stat Elements
const statEls = document.getElementsByClassName('stats');
const attTypeEl = document.getElementById('att-type');
const physDefEl = document.getElementById('phys-def');
const damTypeEl = document.getElementById('dam-type');
const magDefEl = document.getElementById('mag-def');
const damEl = document.getElementById('damage');
const dodgeEl = document.getElementById('dodge');

// The secret sauce for the console box. As of 7.22 6p this is my produest achievement
// Pulling variables from textarea in order to properly manipulate and populate it
let textBoxArea = document.querySelector('.text-box');
const textBox = document.getElementById('console');
let areaText = textBox.value;

let playerChoice = [];
let playerWeaponChoice = '';
let playerShieldChoice = '';
let playerArmorChoice = '';

weaponBtns.style.display = 'none';
armorBtns.style.display = 'none';
shieldBtns.style.display = 'none';

// ---------------- STATE VARIABLES ----------------------------

let player = {
  weapon: {
    name: '',
    grip: '',
    attackType: '',
    damageType: '',
    physDam: 0,
    magDam: 0,
  },
  shield: {
    name: '',
    physRes: 0,
    magRes: 0,
    roll: 0,
  },
  armor: {
    name: '',
    type: '',
    physRes: 0,
    magRes: 0,
    dodge: 0,
  },
  stats: {
    attackType: '', // player.weapon.attackType,
    damageType: '', // player.weapon.damageType,
    damage: 0, // player.weapon.physDam + player.weapon.magDam,
    physRes: 0, // player.armor.phyRes,
    magRes: 0, // player.armor.magRes,
    dodge: 0, // player.armor.dodge
  }
};

initiateEl.addEventListener('click', () => {
  // This lets me hide everything once I click the initiate button (REWIRE TO CONFIRM BUTTON)
    chooseEl.style.display = 'none';
    confirmEl.style.display = 'none';
    randomEl.style.display = 'none';
    duelEl.style.display = 'none';
    computerHealth.style.display = 'block';
  });

// <------------------------- FUNCTIONS -----------------------------------

//   FUNCTION TO UPDATE HEALTH
// INITIATE-BUTTON.addEventListener('click', function(e){
// playHealthBar.updateHealth(playHealth);
// compHealthBar.updateHealth(compHealth);
// });

// This allows me to have an auto-scroll feature once it's filled every 100ms after filling
setInterval (function() {
  // Adding the \n let's me break to a new line as I'll be using moving forward
    areaText += Math.random() + '\n';
    textBox.scrollTop = textBox.scrollHeight;
}, 100);


// const playImg = document.querySelector('#stats.img'); //This will be in a variable tied to playerRandom() and playerChoose()
// const compImg = document.querySelector('#play.img'); // This will be in a variable tied to randomEnemy() to display the correct Computer
// const weapImg = document.querySelector('#weap.img'); // QS to tie it to whichever chosen WEAPON the PLAYER has equipped
// const armorImg = document.querySelector('#armor.img'); // QS to tie it to whichever chosen ARMOR the PLAYER has equipped


// the ACTIONS to choose from, should probably be BUTTONS that 'CLICK' and run functions to CHOOSE that and store what they want to QUEUE for the next ROUND 
// const action = { // Maybe 2 action points a round? Attack/Attack, Attack/Dodge, Attack/Posture
//   player: { 
//       attack: 0, //player.attackDamage
//       dodge: 0, // player.dodge
//       posture: 0, //player.physDef 
//       roll: function roll(){} //This runs a 100% evasion function in place of dodge. If you choose to roll you ONLY roll? Or maybe something else // Freebie safe measure
//   },
//   computer:  {
//       attack: 0, // Attacks with their weapon(s)
//       dodge: 0, // Foregos Defense and banks on Dodging
//       posture: 0, // Braces to add dodge as a % use Defense to mitigate damage
//   }
//   // So what happens is that when you choose Attack, it invokes the attack() function
//   // I need to make a function for each action button that entails
//   // Pulling the player-stat.value of whichever attribute is called to evaluate vs the opponent computer
// }

// Maybe they only get 1 option and that is the action, and the only action.
// So they always ATTACK ONCE, So in the initiate button function, there is already 1 attack function
// and their button is a variable that choooses the second function to ADD
// and their other ACTIONS are
// ATTACK (double), DODGE (if they're higher in dodge), POSTURE (if they're higher armor), and ROLL (timeout based on shield)
// SHIELD TIMEOUT: GOOD IDEA

function attack() {
  // For Attack Damage, it would pull the player-stat.attack-damage and MULTIPLY 
  // By the % of (1 - PHYSICAL or MAGICAL DEFENSE % AS A NUMBER)
  // Ex: p-s.a-d = 100. Opponent defense mitigation is 30%. 1 - .3 = .7. 100 * .7 = 70. Opponent loses 70 health as 'damage'
  // playerAttackDamage * (1 - (computerPhysicalDefense / 100)) This would be the formula eseentially.
  // And this would be the expression to use to updateHealth, and vice versa.
}
function dodge() {
  // if 'one-hand', +10 Dodge. Like if player.grip = 'one-hand' + 10%
  // PHYSICAL / MAGICAL DEFENSE * .25.
  // FUNCTION to COMPARE MATH.RANDOM() to (DODGE / 100)
  // if PLAYER DODGE > MATH.RANDOM(), COMPUTER ATTACK DAMAGE = 0;
  // ELSE (MAY NOT HAVE TO EXPRESS AN ELSE, NOT SURE)
}
function posture() {
  // Add SHIELD attribute to PLAYER STATS that COMBAT ROUND. Because of this, SHIELD has NO DODGE
  // So SHIELD adds PHYSICAL DAMAGE, PHYSICAL DEFENSE, and MAGICAL DEFENSE
}
function roll() { 
  //This runs a 100% evasion function in place of dodge. 
  // If you choose to roll you ONLY roll? Or maybe something else 
  // Freebie safe measure
  }

// Figuring out combat, things like [IF (PLAYER.ATTACKTYPE === THRUST && OPPONENT.ARMOR.TYPE < 5) {PLAYER.DAMAGE * 1.2} ELSE {PLAYER.DAMAGE * .8}] Does this
// Player Damage would be something like Weapon Damage * Modifiers, so if it's 100 and you have 2 10% modifiers, it would be Weapon Damage * 1.21 

// Leather-Cloth - 10% magic damage received
// Leather-Mail - 
// Chain-Mail - -10% Slash Damage received, +10% Pierce Damage Received
// Plate-Mail = -10% Thrust Damage received, +10% crush damage received


// Stuff like: If (user.attackType === 'fire', +10% physDam, -10% physRes)
// If (player.weapon.attackType === 'fr'){ 
//   player., +10% magRes
// }
// If (user.Weapon.attackTYpe === 'lightning', +10% magDam, -10% magRes)
// If ("" === 'sorcery', +10% magDam, -10% phyRes)
// If ("" === 'divine', +10% magDam, -10% phyDam, +10% magRes, -10% phyRes)
// If ("" === 'dark', +10% magDam, -10% physDam, +10% physRes, -10% magRes)

// init(); 

// init() {
//   addEventListener('click', (e) => {
//     if ('click' === chooseEl) { // randomButton = the Random button to auto assign equipment
//       playerChoose(); // The option to random choose 2 Weapons and 1 Armor Class
//     } else {
//       playerRandom(); // The option to select 2 Weapons and 1 Armor Class
//     }
//   })
//   randomEnemy(); // The function to run to choose between Dorien and Guts
//   //What updates? Turn count, Health Values
//   //Either will have one option at a time for 'ACTION' round, roll, dodge
//   //Maybe an action object
//   render(); // Renders the game after choosing everything
// }

// FINISHED - Player Object, Functions to CHOOOSE each EQUIPMENT or RANDOMIZE Selection
// Tying button values to their class objects and use them to populate the player object
// WORKING ON - Queueing an ACTION BUTTON and executing ACTION FUNCTION on INITIATE
// BLOCKERS - FUNCTIONS to MODIFY STATS based on EQUIPMENT

function chooseWeapon() {
weaponBtns.style.display = 'block';
weaponBtns.addEventListener('click', function(e) {
  textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
  console.log(e.target.innerText);
  playerWeaponChoice = e.target.innerText;
  playerChoice.pop();
  playerChoice.push(playerWeaponChoice);
  if (playerWeaponChoice == 'Gladius') {
    playerWeaponChoice = gladius;
  } else if (playerWeaponChoice == 'Dagger') {
    playerWeaponChoice = dagger;
  } else if (playerWeaponChoice == 'Scythe') {
    playerWeaponChoice = scythe;
  } else if (playerWeaponChoice == 'Spear') {
    playerWeaponChoice = spear;
  } else if (playerWeaponChoice == 'Katana') {
    playerWeaponChoice = katana;
  } else if (playerWeaponChoice == 'Halberd') {
    playerWeaponChoice = halberd;
  } else if (playerWeaponChoice == 'Claymore') {
    playerWeaponChoice = claymore;
  } else if (playerWeaponChoice == 'Battle Axe') {
    playerWeaponChoice = battleAxe;
  } else if (playerWeaponChoice == 'War Hammer') {
    playerWeaponChoice = warHammer;
  } else if (playerWeaponChoice == 'Fireball') {
    playerWeaponChoice = fireBall;
  } else if (playerWeaponChoice == 'Lightning Spear') {
    playerWeaponChoice = lightningSpear;
  } else if (playerWeaponChoice == 'Snow Ball') {
    playerWeaponChoice = snowBall;
  } else if (playerWeaponChoice == 'Magic Missile') {
    playerWeaponChoice = magicMissile;
  } else if (playerWeaponChoice == 'Mace') {
    playerWeaponChoice = mace;
  } else if (playerWeaponChoice == 'God Hand') {
    playerWeaponChoice = godHand;
  } else if (playerWeaponChoice == 'Insanity') {
    playerWeaponChoice = insanity;
  }
  player.weapon = playerWeaponChoice;
  damEl.innerText = playerWeaponChoice.physDam + playerWeaponChoice.magDam;
  attTypeEl.innerText = playerWeaponChoice.attackType;
  damTypeEl.innerText = playerWeaponChoice.damageType;
  console.log(playerChoice);
  console.log(player);
  console.log(playerWeaponChoice);
  if (confirm('Do you wish to select the ' + player.weapon.name + '?') === true) {
    weaponBtns.style.display = 'none';
    chooseShield();
  }
});
  // Chooses the weapons from the WEAPON BUTTONS (2)
}
function chooseShield() {
  shieldBtns.style.display = 'block';
  // Chooses the shield from the SHIELD BUTTONS
  shieldBtns.addEventListener('click', function(e) {
    textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
    console.log(e.target.innerText);
    playerShieldChoice = e.target.innerText;
    playerChoice.pop();
    playerChoice.push(playerShieldChoice);
    if (playerShieldChoice == 'Parrying Buckler'){
      playerShieldChoice = smallShield;
    } else if (playerShieldChoice == "Heater Shield") {
      playerShieldChoice = mediumShield;
    } else if (playerShieldChoice == "Scutum") {
      playerShieldChoice = largeShield;
    } else if (playerShieldChoice == "Pavise") {
      playerShieldChoice = greatShield;
    }
    player.shield = playerShieldChoice;
    if (confirm('Do you wish to select the ' + player.shield.name + '?') === true) {
      shieldBtns.style.display = 'none';
      chooseArmor();
    };
  });
}
function chooseArmor() {
  armorBtns.style.display = 'block';
  // Chooses the armor from the ARMOR BUTTONS
  armorBtns.addEventListener('click', function(e) {
    textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
    console.log(e.target.innerText);
    playerArmorChoice = e.target.innerText;
    playerChoice.pop();
    playerChoice.push(playerArmorChoice);
    if (playerArmorChoice == 'Celtic Menagerie'){
      playerArmorChoice = celt;
    } else if (playerArmorChoice == "Knight's Full Plate") {
      playerArmorChoice = knight;
    } else if (playerArmorChoice == "Legionnaire's Regalia") {
      playerArmorChoice = legionnaire;
    } else if (playerArmorChoice == "Mage's Robes") {
      playerArmorChoice = mage;
    } else if (playerArmorChoice == "Poor Knight's Chainmail") {
      playerArmorChoice = poorKnight;
    } else if (playerArmorChoice == "Viking Lamellar") {
      playerArmorChoice = viking;
    }
    player.armor = playerArmorChoice;
    physDefEl.innerText = playerArmorChoice.physRes;
    magDefEl.innerText = playerArmorChoice.magRes;
    dodgeEl.innerText = playerArmorChoice.dodge;
    console.log(player);
    if (confirm('Do you wish to select the ' + player.armor.name + '?') === true) {
      armorBtns.style.display = 'none';
      render();
    }
  });
}

function updatePlayer() {
  player.weapon = document.getElementById('')
}


actionsEl.addEventListener('click', function(e) {
textBox.value += 'You have selected to ' + e.target.innerText + '!' + '\n';
console.log(e.target.innerText);

});

weaponBtns.addEventListener('click', function(e) {
textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
console.log(e.target.innerText);
});
armorBtns.addEventListener('click', function(e) {
textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
console.log(e.target.innerText);
});
shieldBtns.addEventListener('click', function(e) {
textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
console.log(e.target.innerText);
});
chooseEl.addEventListener('click', function(e) {
chooseWeapon();
});

  randomEl.addEventListener('click', function(e) {
  playerRandom();
});


function playerRandom() {
  randomWeapon();
}
let weapons = [gladius, dagger, scythe, spear, katana, halberd, claymore, 
  battleAxe, warHammer, fireBall, lightningSpear, snowBall, magicMissile, mace, godHand, insanity];
let shields = [smallShield, mediumShield, largeShield, greatShield];
let armors = [celt, knight, legionnaire, mage, poorKnight, viking];
let ranWeapon;
let ranShield;
let ranArmor;

function randomWeapon() {
  // FUNCTION to RETURN RANDOM WEAPON for PLAYER.WEAPON
  ranWeapon = Math.floor(Math.random() * weapons.length);
  player.weapon = weapons[ranWeapon];
  console.log(player.weapon);
  damEl.innerText = player.weapon.physDam + player.weapon.magDam;
  attTypeEl.innerText = player.weapon.attackType;
  damTypeEl.innerText = player.weapon.damageType;
  randomShield();
}

function randomShield() {
  ranShield = Math.floor(Math.random() * shields.length);
  player.shield = shields[ranShield];
  console.log(player.shield);
  randomArmor();
  // FUNCTION to RETURN RANDOM SHIELD for PLAYER.SHIELD
}
function randomArmor() {
  // FUNCTION to RETURN RANDOM ARMOR for PLAYER.ARMOR
  ranArmor = Math.floor(Math.random() * armors.length);
  player.armor = armors[ranArmor];
  console.log(player.armor);
  physDefEl.innerText = player.armor.physRes;
  magDefEl.innerText = player.armor.magRes;
  dodgeEl.innerText = player.armor.dodge;
}

function randomEnemy() { 
  let enemyArr = [dorien, guts];
  return Math.random() < 0.5 ? enemyArr[0]: enemyArr[1];
}
console.log(randomEnemy());

function playerChoose() {
  //This prompts the selection of Weapons
  chooseWeapon(); // Once CONFIRMED via CONFIRM (START)
  // This prompts the selection of Shields    
  chooseShield();
  // This prompts the selection of Armor
  chooseArmor();
}


function render() {
  chooseEl.style.display = 'none';
  confirmEl.style.display = 'none';
  randomEl.style.display = 'none';
  duelEl.style.display = 'none';
  // Sets up the PLAYER stats with FUNCTIONS based on MODIFIERS of WEAPON and ARMOR chosen
  // Sets up the PLAYER IMG, WEAPON IMGs, ARMOR IMG, COMPUTER IMG
  // Sets up the PLAYER HEALTH, COMPUTER HEALTH
  // Sets up the UI
    //What updates? Turn count, Health Values
  //Either will have one option at a time for 'ACTION' round, roll, dodge
  //Maybe an action object
}

// The 5 sections to identify are
// // What are you Constants?
//     - Constants would include setting up an ARMOR class DONE, a WEAPON class DONE, a HEALTH object DONE, a MANA object (This may be iceboxed as Im focusing on other modifiers for magic use rather than limiting it to a pool), OPPONENT (w/ pre-selected equipment)
//     - Make the WEAPON/SHIELD/ARMOR populate the STATS of the PLAYER
// - ACTIONS as a constant to showcase what is available to  
// // What are your state variables?
//     - PLAYER/COMPUTER health, ROLL use and its countdown (TIMEOUT), the EQUIPMENT selection itself, the ACTIONS QUEUED each ROUND
// // What queryselectors do you need?
//     - QUERY SELECTORS for COMPUTER IMG, PLAYER IMG, WEAPON IMG, ARMOR IMG
// // what are your event listeners ?
//     - EVENT LISTENERS at the beginning of the game when RENDERING (If someone unfamiliar wishes to assemble a new duel it can randomly allocate equipment, otherwise they'll be prompted to select their WEAPONS and ARMOR), one for START GAME
//     - EVENT LISTENERS to store ACTIONS QUEUED and display choices selected to 'confirm' before INITIATE
//     - EVENT LISTENERS to INITIATE combat round, running functions to compare ACTIONS between PLAYER and COMPUTER
// // what functions do you need ?
//     - FUNCTIONS to: augment PLAYER stats with EQUIPMENT Selection, 
//     - to MODIFY DAMAGE, DEFENSE, and DODGE when interacting with its own equipment (If (user.Weapon.attackTYpe === 'lightning') {+10% magDam, -10% magRes}))
//     - modify results multiple interactions between PLAYER and COMPUTER (Attack vs Dodge Rating) (Attack Damage vs Physical Defense)
//     - adjusts PLAYER and COMPUTER HEALTH to new totals at end of combat round before 

// endGame() {
  // if (computer.health <= 0) { alert('You win!') } else { alert('You lose!')}
  // with two buttons that either reset the game or select other opponent somehow
// }

// // Preset list of actions, EVENT LISTENERS, SET TIMEOUT disables ACTION BUTTONS
// // OF PLAYER