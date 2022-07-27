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
    this.innerText = val + ' / ' + this.maxHealth;
  }
}
// Elements to get the Canvas tag
const computerHealth = document.querySelector('#computer-health');
const playerHealth = document.querySelector('#player-health');
// Grants me access to 'drawing' on the canvas tag
const playContext = playerHealth.getContext('2d');
const compContext = computerHealth.getContext('2d');
const compHW = computerHealth.width = 650;
const compHH = computerHealth.height = 30;
const playHW = playerHealth.width = 325;
const playHH = playerHealth.height = 20;
const playHBW = 325;
const playHBH = 20;
const hX = playHW / 2 - playHBW / 2;
const hY = playHH / 2 - playHBH / 2;
const compHBW = 650;
const compHBH = 30;
const cX = compHW / 2 - compHBW / 2;
const cY = compHH / 2 - compHBH / 2;
let playHealth = 1000; // Starting PLAYER HEALTH
let compHealth = 2000; // Starting COMPUTER HEALTH
const playHealthBar = new HealthBars(hX, hY, playHBW, playHBH, playHealth, 'green');
const compHealthBar = new HealthBars(cX, cY, compHBW, compHBH, compHealth, 'green');
// Weapon Possibilities
const gladius = new Weapons('Gladius', 'oneHand', 'P', 'P', 200, 0);
const pugio = new Weapons('Pugio', 'oneHand', 'P', 'P', 150, 0); // +10% Ddodge as is
const scythe = new Weapons('Scythe', 'twoHand', 'P', 'P', 250, 0);
const spear = new Weapons('Spear', 'oneHand', 'P', 'P', 150, 0); // +Dodge to offset position limitations
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
const greatSpear = new Weapons('Blood Moon', 'twoHand', 'P', 'P', 300, 0); // Dorien Weapon / NOT available for player
const insanity = new Weapons('Insanity', 'oneHand', 'M', 'D', 150, 150);
const soulRend = new Weapons('Soul Rend', 'oneHand', 'M', 'S', 200, 200); // Daethos Spell / Also available
const godHand = new Weapons('God Hand', 'oneHand', 'M', 'Fa', 150, 150); // Guts Spell / Also available
const hunkOfIron = new Weapons('Large Hunk of Iron', 'twoHand', 'P', 'S', 300, 0); // Guts Weapon / NOT available for player
// Armor Possibilities
const legionnaire = new Armors("Legionnaire's Regalia", 'leather-mail', 20, 20, 25); //
const knight = new Armors("Knight's Full Plate", 'plate-mail', 50, 50, 5); //
const mage = new Armors("Mage's Robes", 'leather-cloth', 5, 50, 50); //
const celt = new Armors("Celtic Menagerie", 'leather-mail', 30, 30, 35); //
const poorKnight = new Armors("Poor Knight's Chainmail", "chain-mail", 40, 40, 10); // 
const viking = new Armors("Viking's Lamellar", 'leather-mail', 25, 25, 30); // -10% Frost
const wolf = new Armors('Wolf Armor', 'plate-mail', 50, 50, 25);
const fox = new Armors('Fatal Fox', 'plate-mail', 50, 50, 25);
const hush = new Armors('Of Hush and Tendril', 'leather-cloth', 75, 75, 50);
// Opponents Thusfar
const dorien = {
  name: 'Prince Dorien Caderyn',
  weapons: [greatSpear, insanity],
  armor: fox
}
const guts = {
  name: 'Guts, the Black Swordsman',
  weapons: [hunkOfIron, godHand],
  armor: wolf
}
const daethos = { // Hidden Boss
  name: 'Daethos, the One Above All',
  weapons: [soulRend, soulRend],
  armor: hush
}
// ----------------- CACHED ELEMENT REFERENCES ---------------------------
// Starting Game Elements
const startEls = document.querySelector('.start-buttons');
const createEl = document.querySelector('#create');
const randomEl = document.querySelector('#random');
const confirmEl = document.querySelector('#confirm');
const duelEl = document.querySelector('#duel');
const diedEl = document.querySelector('#died');
const backgroundEl = document.querySelector('#background');
const victoryEl = document.querySelector('#victory');
const onceMoreEl = document.querySelector('#play-again');

// Equipment Button Elements
const weaponBtns = document.querySelector('.weapons');
const armorBtns = document.querySelector('.armors');
const shieldBtns = document.querySelector('.shields');
const hideBtns = document.querySelector('.hide-button');

// Action Button Elements
const actionsEl = document.querySelector('#actions');
const actionEls = document.getElementsByClassName('action');
const attackBtn = document.getElementById('attack');
const dodgeBtn = document.getElementById('dodge'); // Dodge Button
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
const dodgeEl = document.getElementById('dodge-el'); // Dodge Stat

// Computer Elements
const compEl = document.querySelector('#comp');
const compName = document.getElementById('comp-name');

const playEl = document.querySelector('#play');
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
let playerChoice = [];
let playerActionChoice = '';
let playerWeaponChoice = '';
let playerShieldChoice = '';
let playerArmorChoice = '';
let weapons = [gladius, pugio, scythe, spear, katana, halberd, claymore, battleAxe, warHammer, fireBall, lightningSpear, snowBall, magicMissile, mace, godHand, insanity];
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
let playerInput = ''; // To capture action click input
let physAttDam; // Use these for PLAYER and ENEMY ATTACK Functions
let magAttDam; // Same as above
let startChoice = [];
let confirmChoice = '';

// <------------------------ EVENT LISTENERS ----------------------------------------

// initiateEl.addEventListener('click', function(e) {
//   textBox.value += 'You have chosen to initiate the COMBAT round. Good luck!' + '\n';
//   console.log(e.target.innerText);
// });
attackBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'You have chosen to ATTACK ' + enemy.name + '! Are you sure?' + '\n';
  // playerActionChoice = e.target.innerText;
  // actionChoice.pop();
  // actionChoice.push(playerActionChoice);
  // console.log(actionChoice);
  initiateEl.style.display = 'inline';
  initiateEl.addEventListener('click', initiate);
});
dodgeBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'You have chosen to DODGE! Are you sure?' + '\n';
  initiateEl.style.display = 'inline';
  initiateEl.addEventListener('click', initiate);
});
postureBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'You have chosen to POSTURE with your ' + player.shield.name + '! Are you sure?' + '\n';
  initiateEl.style.display = 'inline';
  initiateEl.addEventListener('click', initiate);
}); 
rollBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'Could I offer you this ROLL in these trying times?' + '\n';
  initiateEl.style.display = 'inline';
  initiateEl.addEventListener('click', initiate);
});

// <------------------------- FUNCTIONS ----------------------------------- \\
init();
// ----- HEALTH BAR ANIMATION FUNCTIONS ----- \\
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

// ----- ATTACK FUNCTIONS ----- \\
function attack() {
  textBox.value += 'You have chosen to ATTACK ' + enemy.name + ', good luck!' + '\n';
  playerAttack(),
  playerAttack(),
  computerAttack();
};
function posture() {
  textBox.value += "You have POSTURED like an ABSOLUTE UNIT!" + '\n';
  playPhysPos = player.armor.physRes + player.shield.physRes;
  playMagPos = player.armor.magRes + player.shield.magRes;
  playerAttack(),
  computerAttack(),
  playPhysPos = player.armor.physRes;
  playMagPos = player.armor.magRes;
};
function dodge() {
  playerDodge = player.armor.dodge;
  let dodgeAttempt = Math.floor(Math.random() * 101);
  if (player.weapon.grip == 'oneHand') {
      playerDodge += 20;
  } else {
    playerDodge = playerDodge;
  }
  if (player.weapon == pugio || player.weapon == spear || player.weapon == scythe) {
    playerDodge += 10;
  } else {
    playerDodge = playerDodge;
  }
  if ((playerDodge >= dodgeAttempt) === true) {
    textBox.value += 'You dodged ' + enemy.name + "'s attack!" + '\n';
    playerAttack(); // COMPUTERATTACK FUNCTION SKIPPED MANUALLY 
  } else {
    textBox.value += 'You did not dodge ' + enemy.name + "'s attack!" + '\n';
    computerAttack(),
    playerAttack();
  }
}
function roll() {
  textBox.value += "Phew! Risky. Better not try that again." + '\n';
  playerAttack();
  // Create a set timeout interval attached to the value of the shield.roll value
  // ICE out the roll button or some such, perhaps style.display = 'none' until the interval is up?
};
function initiate() {
  textBox.value += 'You have chosen to initiate the COMBAT round. Good luck!' + '\n';
  console.log(playerInput);
  if (playerInput == 'Attack') { 
    attack();
  } else if (playerInput == 'Dodge') {
    dodge();
  } else if (playerInput == 'Posture') {
    posture();
  } else if (playerInput == 'Roll') {
    roll();
  } else {
    return;
  }
}
function playerAttack() {
  let physAttDam = player.weapon.physDam;
  let magAttDam = player.weapon.magDam;
  let physDamRes = enemy.armor.physRes;
  let magDamRes = enemy.armor.magRes;
  if (Math.floor(Math.random() * 101) > 15) {
    physAttDam = physAttDam * (1 - (physDamRes / 100));
    magAttDam = magAttDam * (1 - (magDamRes / 100));
    playDamTot = physAttDam + magAttDam;
    if (player.weapon.damageType == 'P') {
      if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'chain-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'S') {
      if (enemy.armor.type == 'chain-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'B') {
      if (enemy.armor.type == 'leather-mail') {
        playDamTot *=  0.9;
      } else if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.attackType == 'M') {
      if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type = 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fi' || player.weapon.damageType == 'D' || player.weapon.damageType == 'L') {
      playDamTot *= 1.1;
    }
    console.log(playDamTot);
    compHealth -= playDamTot;
    textBox.value += 'You attack ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);
  } else if (Math.floor(Math.random() * 101) > 5) {
    physAttDam = physAttDam * (1 - (physDamRes / 100));
    magAttDam = magAttDam * (1 - (magDamRes / 100));
    if (player.weapon.grip == 'oneHand') {
      playDamTot = 2 * (physAttDam + magAttDam);
    }
    if (player.weapon.grip == 'twoHand') {
      playDamTot = 2.5 * (physAttDam + magAttDam);
    }
    if (player.weapon == pugio || player.weapon == spear || player.weapon == scythe) {
      playDamTot = 3 * (physAttDam + magAttDam);
    }
    if (player.weapon.damageType == 'P') {
        if (enemy.armor.type == 'plate-mail') {
          playDamTot *= 0.9;
        } else if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'leather-cloth') {
          playDamTot *= 1.1;
        }
    }
    if (player.weapon.damageType == 'S') {
        if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'plate-mail') {
          playDamTot *= 0.9;
        } else if (enemy.armor.type == 'leather-cloth' || enemy.armor.type == 'leather-mail') {
          playDamTot *= 1.1;
        }
    }
    if (player.weapon.damageType == 'B') {
      if (enemy.armor.type == 'leather-mail' || enemy.armor.type == 'leather-cloth') {
        playDamTot *=  0.9;
      } else if (enemy.armor.type == 'plate-mail' || enemy.armor.type == 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.attackType == 'M') {
      if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type = 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fi' || player.weapon.damageType == 'D' || player.weapon.damageType == 'L') {
      playDamTot *= 1.1;
    }
    console.log(playDamTot);
    compHealth -= playDamTot;
    textBox.value += 'You CRITICALLY STRIKE ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);
  } else {
    physAttDam = physAttDam * (1 - (physDamRes / 100));
    magAttDam = magAttDam * (1 - (magDamRes / 100));
    playDamTot = 3 * (physAttDam + magAttDam);
    if (player.weapon == pugio || player.weapon == spear || player.weapon == scythe) {
      playDamTot = 4 * (physAttDam + magAttDam);
    }
    if (player.weapon.damageType == 'P') {
      if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'leather-cloth') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'S') {
      if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'plate-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'leather-cloth' || enemy.armor.type == 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'B') {
      if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'leather-cloth') {
        playDamTot *=  0.9;
      } else if (enemy.armor.type == 'plate-mail' || enemy.armor.type == 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.attackType == 'M') {
      if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fi' || player.weapon.damageType == 'D' || player.weapon.damageType == 'L') {
      playDamTot *= 1.1;
    }
    console.log(playDamTot);
    compHealth -= playDamTot;
    textBox.value += 'You MULTI-STRIKE ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);
  }
  if (compHealth <= 0) {
    playWin(); // Define what happens
  }
  initiateEl.style.display = 'none';
}
function computerAttack() {
  if (Math.random() > .15) {
    let weapon;
    if (Math.random() > .5) {
      weapon = enemy.weapons[0];
      } else { 
        weapon = enemy.weapons[1];
      }
    let physAttDam = weapon.physDam;
    let magAttDam = weapon.magDam;
    pad = physAttDam * (1 - (playPhysPos / 100));
    mad = magAttDam * (1 - (playMagPos / 100));
    compDamTot = pad + mad;
    console.log(compDamTot);
    if (weapon.damageType == 'P') {
      if (player.armor.type == 'plate-mail') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
        compDamTot *= 1.1;
      }
    }
    if (weapon.damageType == 'S') {
      if (player.armor.type == 'chain-mail' || player.armor.type == 'plate-mail') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'leather-cloth' || player.armor.type == 'leather-mail') {
        compDamTot *= 1.1;
      }
    }
    if (weapon.damageType == 'B') {
      if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
        compDamTot *=  0.9;
      } else if (player.armor.type == 'plate-mail' || player.armor.type == 'leather-mail') {
        compDamTot *= 1.1;
      }
    }
    if (weapon.attackType == 'M') {
      if (player.armor.type == 'leather-cloth') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'plate-mail') {
        compDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fi' || player.weapon.damageType == 'Sor' || player.weapon.damageType == 'L') {
      compDamTot *= 1.1;
    }
    if (player.weapon.damageType == 'Fr' || player.weapon.damageType == 'D' || player.weapon.damageType == 'Fa') {
      compDamTot *= 0.9;
    }
    playHealth -= compDamTot;
    textBox.value += enemy.name + ' attacks you with ' + weapon.name + ' for ' + compDamTot + ' damage!' + '\n';
    playHealthBar.updateHealth(playHealth);
  } else {
    let weapon1;
    let weapon2;
    weapon1 = enemy.weapons[0];
    weapon2 = enemy.weapons[1];
    let magAttDam = weapon1.magDam + weapon2.magDam;
    let physAttDam = weapon1.physDam + weapon2.physDam;
    pad = physAttDam * (1 - (playPhysPos / 100));
    mad = magAttDam * (1 - (playMagPos / 100));
    compDamTot = pad + mad;
    console.log(compDamTot);
    if (weapon1.damageType == 'P') {
      if (player.armor.type == 'plate-mail') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
        compDamTot *= 1.1;
      }
    }
    if (weapon1.damageType == 'S') {
      if (player.armor.type == 'chain-mail' || player.armor.type == 'plate-mail') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'leather-cloth' || player.armor.type == 'leather-mail') {
        compDamTot *= 1.1;
      }
    }
    if (weapon1.damageType == 'B') {
      if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
        compDamTot *=  0.9;
      } else if (player.armor.type == 'plate-mail' || player.armor.type == 'leather-mail') {
        compDamTot *= 1.1;
      }
    }
    if (weapon2.attackType == 'M') {
      if (player.armor.type == 'leather-cloth') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'plate-mail') {
        compDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fi' || player.weapon.damageType == 'Sor' || player.weapon.damageType == 'L') {
      compDamTot *= 1.1;
    }
    if (player.weapon.damageType == 'Fr' || player.weapon.damageType == 'D' || player.weapon.damageType == 'Fa') {
      compDamTot *= 0.9;
    }
    playHealth -= compDamTot;
    textBox.value += enemy.name + ' CRUSHES you with their ' + weapon1.name + ' and ' + weapon2.name + ' for ' + compDamTot + ' damage!' + '\n';
    playHealthBar.updateHealth(playHealth);
  }
  if (playHealth <= 0) {
    compWin(); // Define what loses
  }
}
setInterval (function() {
  // This allows me to have an auto-scroll feature once it's filled every 100ms after filling
  // Adding the \n let's me break to a new line as I'll be using moving forward
    areaText += Math.random() + '\n';
    textBox.scrollTop = textBox.scrollHeight;
}, 250);
function chooseWeapon() {
  confirmEl.style.displaay = 'inline';
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
function init() {
  compEl.style.display = 'none';
  weaponBtns.style.display = 'none';
  shieldBtns.style.display = 'none';
  armorBtns.style.display = 'none';
  actionsEl.style.display = 'none'
  createEl.style.display = 'inline-block';
  randomEl.style.display = 'inline-block';
  confirmEl.style.display = 'none';
  duelEl.style.display = 'inline-block';
  backgroundEl.style.display = 'block';
  diedEl.style.display = 'none';
  onceMoreEl.style.display = 'none';
  victoryEl.style.display = 'none';
  createEl.addEventListener('click', function(e) {
    confirmChoice = e.target.innerText;
    textBox.value += 'You have chosen to CREATE your champion. Are you sure?' + '\n';
    confirmEl.style.display = 'inline-block';  
    confirmEl.addEventListener('click', start);  
  });
  randomEl.addEventListener('click', function(e) {
    confirmChoice = e.target.innerText;
    textBox.value += 'You have chosen to RANDOMIZE your champion. Are you sure?' + '\n';
    confirmEl.style.display = 'inline-block';
    confirmEl.addEventListener('click', start); 
  });
};
function start() { //This is called by the confirm button
  textBox.value += 'You have chosen to start the duel. Good luck!' + '\n';
  createEl.style.display = 'none';
  randomEl.style.display = 'none';
  if (confirmChoice == 'Create') {
    textBox.value += 'You have chosen to CREATE your champion.' + '\n';
    playerChoose();
  } else if (confirmChoice == 'Random') {
    textBox.value += 'You have chosen to RANDOMIZE your champion.' + '\n';
    playerRandom();
  } else {
    return;
  }
}
function playerRandom() {
  playEl.style.display = 'block';
  randomWeapon();
  randomShield();
  randomArmor();
  render();
}
function playerChoose() { //This prompts the selection of Weapons
  playEl.style.display = 'block';
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
  if (Math.floor(Math.random() * 101) > 52) {
    enemy = guts;
    compImg.src = './Img/Guts-Wolf.png';
  } else if (Math.floor(Math.random() * 101) > 4) {
    enemy = dorien;
    compImg.src = './Img/Dorien.png';
    compImg.height = 650;
    compImg.width = 400;
    compImg.top = 100;
  } else {
    enemy = daethos;
    compImg.src = './Img/Daethos.png';
    compImg.width = 450;
    compImg.height = 700;
  }
  compName.innerText = enemy.name;
  textBox.value += 'Your last opponent is ' + enemy.name + '!' + '\n';
  console.log(enemy);
}
function playWin() {
  textBox.value += 'Congratulations, you have won the Ascea! Would you like to play again?' + '\n';
  createEl.style.display = 'inline-block';
  actionsEl.style.display = 'none';
  onceMoreEl.style.display = 'inline-block';
  compEl.style.display = 'none';
  victoryEl.style.display = 'block';
  // Have a new button that asks if you wish to play again
}
function compWin() {
  textBox.value += 'YOU DIED' + '\n'
  onceMoreEl.style.display = 'inline-block';
  actionsEl.style.display = 'none';
  playEl.style.display = 'none';
  backgroundEl.style.display = 'none';
  compEl.style.display = 'none';
  diedEl.style.display = 'block';
}
onceMoreEl.addEventListener('click', startOver);
function startOver() {
  init();
}

function render() {
  createEl.style.display = 'none';
  confirmEl.style.display = 'none';
  randomEl.style.display = 'none';
  duelEl.style.display = 'none';
  armorBtns.style.display = 'none';
  actionsEl.style.display = 'inline';
  initiateEl.style.display = 'none';
  randomEnemy();
  compEl.style.display = 'block';
  playPhysPos = player.armor.physRes;
  playMagPos = player.armor.magRes;
  playHealth = 1000;
  compHealth = 2000;
  playHealthBar.updateHealth(playHealth);
  compHealthBar.updateHealth(compHealth);
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