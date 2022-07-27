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
const playHBW = 250;
const playHBH = 15;
const hX = playHW / 2 - playHBW / 2;
const hY = playHH / 2 - playHBH / 2;
const compHBW = 500;
const compHBH = 25;
const cX = compHW / 2 - compHBW / 2;
const cY = compHH / 2 - compHBH / 2;
let playHealth = 1000; // Starting PLAYER HEALTH
let compHealth = 2000; // Starting COMPUTER HEALTH

const playHealthBar = new HealthBars(hX, hY, playHBW, playHBH, playHealth, 'green');
const compHealthBar = new HealthBars(cX, cY, compHBW, compHBH, compHealth, 'green');

// Weapon Possibilities
const gladius = new Weapons('Gladius', 'oneHand', 'P', 'P', 200, 0);
const pugio = new Weapons('Pugio', 'oneHand', 'P', 'P', 150, 0); // +10% Ddodge as is
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
const insanity = new Weapons('Insanity', 'oneHand', 'M', 'D', 100, 150);
const soulRend = new Weapons('Soul Rend', 'oneHand', 'M', 'S', 150, 150); // Daethos Spell / Also available
const godHand = new Weapons('God Hand', 'oneHand', 'M', 'Fa', 150, 100); // Guts Spell / Also available
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
const startEls = document.querySelector('.start-buttons');
const createEl = document.querySelector('#create');
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
const attackBtn = document.getElementById('attack');
const dodgeBtn = document.getElementById('dodge');
const postureBtn = document.getElementById('posture');
const rollBtn = document.getElementById('roll');
const initiateEl = document.getElementById('initiate');

// Player Stat Elements
const statEls = document.getElementsByClassName('stats');
const attTypeEl = document.getElementById('att-type');
const physDefEl = document.getElementById('phys-def');
const damTypeEl = document.getElementById('dam-type');
const magDefEl = document.getElementById('mag-def');
const damEl = document.getElementById('damage');
const dodgeEl = document.getElementById('dodge');

// Computer Elements
const compEl = document.querySelector('#comp');
const compName = document.getElementById('comp-name');

const playImg = document.getElementById('play-img'); //This will be in a variable tied to playerRandom() and playerChoose()
const compImg = document.getElementById('comp-img'); // This will be in a variable tied to randomEnemy() to display the correct Computer

// The secret sauce for the console box. As of 7.22 6p this is my produest achievement
// Pulling variables from textarea in order to properly manipulate and populate it
let textBoxArea = document.querySelector('.text-box');
const textBox = document.getElementById('console');
let areaText = textBox.value;

weaponBtns.style.display = 'none';
armorBtns.style.display = 'none';
shieldBtns.style.display = 'none';
actionsEl.style.display = 'none';

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
  }
};

let enemy;
const dorien = {
  name: 'Prince Dorien',
  weapons: [greatSpear, insanity],
  armor: fox
}
const guts = {
  name: 'Guts',
  weapons: [hunkOfIron, godHand],
  armor: wolf
}
const daethos = { // Hidden Boss
  name: 'Daethos, the One Above All',
  weapons: [soulRend, soulRend],
  armor: hush
}

let playerChoice = [];
let playerActionChoice = '';
let playerWeaponChoice = '';
let playerShieldChoice = '';
let playerArmorChoice = '';
let weapons = [gladius, pugio, scythe, spear, katana, halberd, claymore, 
  battleAxe, warHammer, fireBall, lightningSpear, snowBall, magicMissile, mace, godHand, insanity];
let shields = [smallShield, mediumShield, largeShield, greatShield];
let armors = [celt, knight, legionnaire, mage, poorKnight, viking];
let ranWeapon; // For RANDOM WEAPON function
let ranShield; // For RANDOM SHIELD Function
let ranArmor; // For RANDOM ARMOR Function
let playerDodge; // For DODGE Function
let playPhysPos = player.armor.physRes; // For POSTURE Function
let playMagPos = player.armor.magRes; // For POSTURE Function
let playDamTot = 0; // For PLAYER ATTACK Function
let compDamTot = 0; // For COMP ATTACK FUnction
let actionChoice = []; // Allows me to capture ACTOIN variable for INITIATE

// <------------------------ EVENT LISTENERS ----------------------------------------

initiateEl.addEventListener('click', function(e) {
  textBox.value += 'You have chosen to initiate the COMBAT round. Good luck!' + '\n';
  console.log(e.target.innerText);
});

// <------------------------- FUNCTIONS -----------------------------------

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

// This allows me to have an auto-scroll feature once it's filled every 100ms after filling
setInterval (function() {
  // Adding the \n let's me break to a new line as I'll be using moving forward
    areaText += Math.random() + '\n';
    textBox.scrollTop = textBox.scrollHeight;
}, 100);

// SHIELD TIMEOUT: GOOD IDEA
function playerAttack() {
  let attackDamage = player.weapon.physDam + player.weapon.magDam;
  let physDamRes = enemy.armor.physRes;
  let magDamRes = enemy.armor.magRes;
  if (player.weapon.attackType == 'p') {
    //This will be the computer health update
    playDamTot = attackDamage * (1 - (physDamRes / 100));
  } else {
    playDamTot = attackDamage * (1 - (magDamRes / 100));
  }
  console.log(playDamTot);
  compHealth -= playDamTot;
  textBox.value += 'You attack ' + enemy.name + ' for ' + playDamTot + ' damage!' + '\n';
  compHealthBar.updateHealth(compHealth);
  if (compHealth <= 0) {
    playWin(); // Define what happens
  }
}
function computerAttack() {
  let weapon;
  if (Math.random() > .5) {
    weapon = enemy.weapons[0];
  } else { 
    weapon = enemy.weapons[1];
  }
  let attackDamage = weapon.physDam + weapon.magDam;
  // let physDamRes = player.armor.physRes;
  // let magDamRes = player.armor.magRes;
  if (actionChoice == 'posture') {
    if (weapon.attackType == 'p') {
    compDamTot = attackDamage * (1 - (playPhysPos / 100));
  } else {
    compDamTot = attackDamage * (1 - (playMagPos / 100));
  }
}
  if (weapon.attackType == 'p') {
    compDamTot = attackDamage * (1 - (playPhysPos / 100));
  } else {
    compDamTot = attackDamage * (1 - (playMagPos / 100));
  }
  console.log(compDamTot);
  playHealth -= compDamTot;
  textBox.value += enemy.name + ' attacks you for ' + compDamTot + ' damage!' + '\n';
  playHealthBar.updateHealth(playHealth);
  if (playHealth <= 0) {
    compWin(); // Define what loses
  }
} 

function dodge() {
  playerDodge = player.armor.dodge;
  let dodgeAttempt = Math.floor(Math.random() * 101);
  console.log(dodgeAttempt);
  console.log(playerDodge);
  if (player.weapon.grip == 'oneHand') {
      playerDodge += 10;
      console.log(playerDodge); 
  }
  if (player.weapon == pugio) {
    playerDodge += 10;
    console.log(playerDodge);
  }
  if ((playerDodge > dodgeAttempt) === true) {
    textBox.value += 'You dodged ' + enemy.name + "'s attack!" + '\n';
    // COMPUTERATTACK FUNCTION SKIPPED
  } else {
    textBox.value += 'You did not dodge ' + enemy.name + "'s attack!" + '\n';
    // return;
  }
  // PHYSICAL / MAGICAL DEFENSE * .25.
  // FUNCTION to COMPARE MATH.RANDOM() to (DODGE / 100)
  // if PLAYER DODGE > MATH.RANDOM(), COMPUTER ATTACK DAMAGE = 0;
  // ELSE (MAY NOT HAVE TO EXPRESS AN ELSE, NOT SURE)
}
function posture() {
  playPhysPos = player.armor.physRes + player.shield.physRes;
  playMagPos = player.armor.magRes + player.shield.magRes;
  // Add SHIELD attribute to PLAYER STATS that COMBAT ROUND. Because of this, SHIELD has NO DODGE
  // So SHIELD adds PHYSICAL DAMAGE, PHYSICAL DEFENSE, and MAGICAL DEFENSE
}
initiateEl.addEventListener('click', function() {
  textBox.value += 'You have chosen to ATTACK ' + enemy.name + ', good luck!' + '\n';
  playerAttack(),
  computerAttack(),
  playerAttack(),
  computerAttack(),
  unoMas();
});
// Figure out way to say that they're SURE THEY WANT TO ATTACK ETC... for INITIATE
// function initiateCombat() {
  playerActionChoice = '';
  attackBtn.addEventListener('click', function(e) {
    textBox.value += 'You have chosen to ATTACK ' + enemy.name + '! Are you sure?' + '\n';
    playerActionChoice = e.target.innerText;
    actionChoice.pop();
    actionChoice.push(playerActionChoice);
    console.log(actionChoice);
    initiateEl.addEventListener('click', function() {
      textBox.value += 'You have chosen to ATTACK ' + enemy.name + ', good luck!' + '\n';
      playerAttack(),
      computerAttack(),
      playerAttack(),
      computerAttack(),
      unoMas();
    });
  }); 
  postureBtn.addEventListener('click', function(e) {
    textBox.value += 'You have chosen to POSTURE with your ' + player.shield.name + '! Are you sure?' + '\n';
    playerActionChoice = e.target.innerText;
    actionChoice.pop();
    actionChoice.push(playerActionChoice);
    initiateEl.addEventListener('click', function() {
      textBox.value += "You have chosen to POSTURE! You're an ABSOLUTE UNIT!" + '\n';
      playerAttack(),
      posture(),
      computerAttack(),
      computerAttack(),
      playPhysPos = player.armor.physRes;
      playMagPos = player.armor.magRes;
      unoMas();
    }); 
  }); 
  dodgeBtn.addEventListener('click', function(e) {
    textBox.value += 'You have chosen to DODGE! Are you sure?' + '\n';
    playerActionChoice = e.target.innerText;
    actionChoice.pop();
    actionChoice.push(playerActionChoice);
    initiateEl.addEventListener('click', function() {
      textBox.value += "You have chosen to DODGE! When ducking, dipping, and diving isn't enough!" + '\n';
      dodge(),
      computerAttack(),
      playerAttack(),
      computerAttack(),
      unoMas();
    });
  });
  rollBtn.addEventListener('click', function(e) {
    textBox.value += 'Could I offer you this ROLL in these trying times?' + '\n';
    playerActionChoice = e.target.innerText;
    actionChoice.pop();
    actionChoice.push(playerActionChoice);
    initiateEl.addEventListener('click', function() {
      textBox.value += "Phew! Risky. Better not use that again." + '\n';
      playerAttack(),
      unoMas();
    });
  });
// }
function unoMas() {
  initiateCombat();
}

init(); 
createEl.style.display = 'inline-block';
confirmEl.style.display = 'inline-block';
randomEl.style.display = 'inline-block';
duelEl.style.display = 'inline-block';
let startChoice;
let confirmChoice;
function init() {
  compEl.style.display = 'none';
  weaponBtns.style.display = 'none';
  shieldBtns.style.display = 'none';
  armorBtns.style.display = 'none';
  actionsEl.style.display = 'none'
  startEls.style.display = 'block';
  createEl.addEventListener('click', function(e) {
    startChoice = e.target.innerText;
    confirmChoice = startChoice;
    console.log(startChoice);
    textBox.value += 'You have chosen to CREATE your champion. Are you sure?' + '\n';
    confirmEl.addEventListener('click', function() {
        textBox.value += 'You have chosen to CREATE your champion. Good luck!' + '\n';
        playerChoose();
    });
  });
    randomEl.addEventListener('click', function(e) {
      startChoice = e.target.innerText;
      confirmChoice = startChoice;
      console.log(startChoice);
      confirmEl.addEventListener('click', function() {
        textBox.value += 'You have chosen to RANDOMIZE your champion. Good luck!' + '\n';
        playerRandom();
      });
  });
} 

function playWin() {
  textBox.value += 'Congratulations, you have won the Ascea! Would you like to play again?' + '\n';
  createEl.style.display = 'inline-block';
  confirmEl.style.display = 'inline-block';
  randomEl.style.display = 'inline-block';
  // Have a new button that asks if you wish to play again
  init();
}


function compWin() {
  textBox.value += 'YOU DIED' + '\n'
  createEl.style.display = 'inline-block';
  confirmEl.style.display = 'inline-block';
  randomEl.style.display = 'inline-block';
  // Have a new button that asks if you wish to play again
  init();
  
}

// FINISHED - my INIT FUNCTION that lets me CREATE or RANDOMIZE a CHAMPION
// WORKING ON - Queueing an ACTION BUTTON and executing ACTION FUNCTION on INITIATE based on
// What has been SELECTED to INITIATE - CURRENT BLOCKER but insight from fixing the INIT FUNCTION
// and hope the implement that into the ACTION QUEUE function
// BLOCKERS - FUNCTIONS to MODIFY STATS based on EQUIPMENT

function chooseWeapon() {
  confirmEl.style.displaay = 'inline';
  // duelEl.style.display = 'none';
  weaponBtns.style.display = 'block';
  weaponBtns.addEventListener('click', function(e) {
  textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
  console.log(e.target.innerText);
  playerWeaponChoice = e.target.innerText;
  playerChoice.pop();
  playerChoice.push(playerWeaponChoice);
  if (playerWeaponChoice == 'Gladius') {
    playerWeaponChoice = gladius;
  } else if (playerWeaponChoice == 'Pugio') {
    playerWeaponChoice = pugio;
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
  confirmEl.addEventListener('click', function(e) {
    chooseShield();
  });
});
  // Chooses the weapons from the WEAPON BUTTONS (2)
}
function chooseShield() {
  weaponBtns.style.display = 'none';
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
    confirmEl.addEventListener('click', function(e) {
      chooseArmor();
    });
  });
}
function chooseArmor() {
  shieldBtns.style.display = 'none';
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
    confirmEl.addEventListener('click', function(e) {
      textBox.value += 'You have confirmed your selection. Good luck!' + '\n';
      render();
      });
  })
  };
function playerRandom() {
  randomWeapon();
  randomShield();
  randomArmor();
  render();
}
function playerChoose() { //This prompts the selection of Weapons
  weaponBtns.style.display = 'none';
  shieldBtns.style.display = 'none';
  armorBtns.style.display = 'none';
  chooseWeapon();
}
function randomWeapon() {
  // FUNCTION to RETURN RANDOM WEAPON for PLAYER.WEAPON
  ranWeapon = Math.floor(Math.random() * weapons.length);
  player.weapon = weapons[ranWeapon];
  console.log(player.weapon);
  damEl.innerText = player.weapon.physDam + player.weapon.magDam;
  attTypeEl.innerText = player.weapon.attackType;
  damTypeEl.innerText = player.weapon.damageType;
  textBox.value += 'You have randomized and received the ' + player.weapon.name + '!' + '\n';
}
function randomShield() {
  ranShield = Math.floor(Math.random() * shields.length);
  player.shield = shields[ranShield];
  console.log(player.shield);
  textBox.value += 'You have randomized and received the ' + player.shield.name + '!' + '\n';
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
  textBox.value += 'You have randomized and received the ' + player.armor.name + '!' + '\n';
}
function randomEnemy() { // This will go in the RENDER() function I believe
  if (Math.random() < 0.49) {
    enemy = guts;
  } else if (Math.random() < .98) {
    enemy = dorien;
  } else {
    enemy = daethos;
  }
  compName.innerText = enemy.name;
  textBox.value += 'Your last opponent is ' + enemy.name + '!' + '\n';
  console.log(enemy);
}
function render() {
  createEl.style.display = 'none';
  confirmEl.style.display = 'none';
  randomEl.style.display = 'none';
  duelEl.style.display = 'none';
  armorBtns.style.display = 'none';
  actionsEl.style.display = 'inline';
  // Sets up the PLAYER stats with FUNCTIONS based on MODIFIERS of WEAPON and ARMOR chosen
  // Sets up the PLAYER IMG, WEAPON IMGs, ARMOR IMG, COMPUTER IMG
  // Sets up the PLAYER HEALTH, COMPUTER HEALTH
  randomEnemy();
  compEl.style.display = 'block';
  playPhysPos = player.armor.physRes;
  playMagPos = player.armor.magRes;
  initiateCombat();
}

// The 5 sections to identify are
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