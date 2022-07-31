// ----------------------------------- CONSTANTS ------------------------------------ \\
class Weapons {
  constructor(name, grip, attackType, damageType, physDam, magDam, crit) {
      this.name = name;
      this.grip = grip; // One-Hand, Two-Hand
      this.attackType = attackType; // This evaluates against
      this.damageType = damageType; // This evaluates against magical resistance
      this.physDam = physDam; // Physical Damage NUMBER
      this.magDam = magDam; // Magical Damage NUMBER
      this.crit = crit; // crit chance
  }
}
class Shields {
    constructor(name, physRes, magRes, roll) {
    this.name = name;
    this.physRes = physRes;
    this.magRes = magRes;
    this.roll = roll;
    }
}
class Armors {
 constructor(name, type, physRes, magRes, dodge) {
   this.name = name; //Name of the equipment
   this.type = type; //CLoth, ClothLeather, LeatherMail, ChainMail, PlateMail
   this.physRes = physRes; // Physical Resistance, affects PHYSICAL DAMAGE TYPE
   this.magRes = magRes; // Magical Resistance, affects SPELL DAMAGE TYPE
   this.dodge = dodge; // Chance to EVADE Attack, affects ROLL (DODGE)
 }
}
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
const computerHealth = document.querySelector('#computer-health');
const playerHealth = document.querySelector('#player-health');
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
let playHealth = 3000; 
let compHealth = 5000; 
const playHealthBar = new HealthBars(hX, hY, playHBW, playHBH, playHealth, 'green');
const compHealthBar = new HealthBars(cX, cY, compHBW, compHBH, compHealth, 'green');
// Weapon Possibilities
const gladius = new Weapons('Gladius', 'oneHand', 'Physical', 'Pierce', 250, 0, 10);
const pugio = new Weapons('Pugio', 'oneHand', 'Physical', 'Pierce', 200, 0, 15);
const scythe = new Weapons('Scythe', 'oneHand', 'Physical', 'Pierce', 200, 0, 15);
const spear = new Weapons('Spear', 'oneHand', 'Physical', 'Pierce', 200, 0, 15); 
const katana = new Weapons('Katana', 'oneHand', 'Physical', 'Slash', 250, 0, 10);
const halberd = new Weapons('Halberd', 'twoHand', 'Physical', 'Pierce', 325, 0, 0);
const claymore = new Weapons('Claymore', 'twoHand', 'Physical', 'Slash', 325, 0, 0);
const battleAxe = new Weapons('Battle Axe', 'twoHand', 'Physical', 'Slash', 350, 0, 0);
const warHammer = new Weapons('War Hammer', 'twoHand', 'Physical', 'Blunt', 350, 0, 0);
const mace = new Weapons('Mace', 'oneHand', 'Physical', 'Blunt' , 250, 0, 10);
const daiKatana = new Weapons('Dai-Katana', 'twoHand', 'Physical', 'Slash', 200, 100, 5); 
const godHand = new Weapons('God Hand', 'oneHand', 'Physical', 'Blunt', 200, 0, 15);
const whirlWind = new Weapons('Whirlwind', 'twoHand', 'Physical', 'Slash', 125, 125, 15);
// Spell Possibilities
const lavaSpit = new Weapons('Lava Spit', 'oneHand', 'Magic', 'Fire', 0, 250, 10);
const lightningSpear = new Weapons('Lightning Spear', 'oneHand', 'Magic', 'Lightning', 0, 250, 10);
const magicMissile = new Weapons('Magic Missle', 'oneHand', 'Magic', 'Sorcery', 0, 200, 15);
const arcticBolt = new Weapons('Arctic Bolt', 'oneHand', 'Magic', 'Frost', 0, 250, 10);
const oakCrush = new Weapons('Oak Crush', 'oneHand', 'Magic', 'Earth', 0, 275, 10); 
const handOfGod = new Weapons('Hand of God', 'oneHand', 'Magic', 'Faith', 150, 175, 5); 
const insanity = new Weapons('Insanity', 'oneHand', 'Magic', 'Spooky', 175, 150, 5);
const windFury = new Weapons('Wind Fury', 'oneHand', 'Magic', 'Wind', 0, 200, 15);
// Shield Possibilties
const smallShield = new Shields('Parrying Buckler', 5, 5, 1.5); 
const mediumShield = new Shields('Heater Shield', 10, 10, 2.5); 
const largeShield = new Shields('Scutum', 20, 20, 3.5);
const greatShield = new Shields('Pavise', 25, 25, 4.5);
// Opponent Equipment
const bloodMoon = new Weapons('Blood Moon', 'twoHand', 'Physical', 'Pierce', 250, 150, 15); 
const soulRend = new Weapons('Soul Rend', 'oneHand', 'Magic', 'Spooky', 150, 250, 5);
const mindBlast = new Weapons('Mind Blast', 'oneHand', 'Magic', 'Shadow', 0, 500, 25);
const swDeath = new Weapons('Shadow Word: Death', 'oneHand', 'Magic', 'Shadow', 0, 500, 25); 
const hunkOfIron = new Weapons('Large Hunk of Iron', 'twoHand', 'Physical', 'Slash', 350, 0, 5); 
const handCannon = new Weapons('Hand Cannon', 'oneHand', 'Physical', 'Blunt', 300, 50, 10);
const wolf = new Armors('Wolf Armor', 'plate-mail', 45, 55, 25);
const fox = new Armors('Fatal Fox', 'plate-mail', 55, 45, 25);
const hush = new Armors('Of Hush and Tendril', 'leather-cloth', 65, 65, 50);
// Armor Possibilities
const legionnaire = new Armors("Legionnaire's Regalia", 'leather-mail', 35, 35, 35); 
const knight = new Armors("Knight's Full Plate", 'plate-mail', 55, 45, 5); 
const mage = new Armors("Mage's Robes", 'leather-cloth', 15, 55, 35); 
const celt = new Armors("Celtic Menagerie", 'leather-mail', 30, 45, 30); 
const poorKnight = new Armors("Poor Knight's Chainmail", "chain-mail", 55, 35, 15); 
const viking = new Armors("Viking's Lamellar", 'leather-mail', 45, 30, 30); 
// ---------------------------- Opponents --------------------------------- \\
const dorien = {
  name: 'Prince Dorien Caderyn',
  weapons: [bloodMoon, soulRend],
  armor: fox
}
const guts = {
  name: 'Guts, the Black Swordsman',
  weapons: [hunkOfIron, handCannon],
  armor: wolf
}
const daethos = { // Hidden Boss
  name: 'Daethos, the One Above All',
  weapons: [mindBlast, swDeath],
  armor: hush
}
// ---------------------------- CACHED ELEMENT REFERENCES --------------------------------- \\
// Starting Game Buttons
const startEls = document.querySelector('.start-buttons');
const createEl = document.querySelector('#create');
const randomEl = document.querySelector('#random');
const confirmEl = document.querySelector('#confirm');
// Starting-Ending Game Elements
const duelEl = document.querySelector('#duel');
const diedEl = document.querySelector('#died');
const backgroundEl = document.querySelector('#background');
const victoryEl = document.querySelector('#victory');
const onceMoreEl = document.querySelector('#play-again');
// Equpment Button Elements
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
// Player Elements
const statEls = document.getElementsByClassName('stats');
const attTypeEl = document.getElementById('att-type');
const physDefEl = document.getElementById('phys-def');
const damTypeEl = document.getElementById('dam-type');
const magDefEl = document.getElementById('mag-def');
const damEl = document.getElementById('damage');
const dodgeEl = document.getElementById('dodge-el');
const weapTT = document.querySelector('#weap-tt');
const shieldTT = document.querySelector('#shield-tt');
const armorTT = document.querySelector('#armor-tt');
const weapImg = document.querySelector('#weap-img');
const shieldImg = document.querySelector('#shield-img');
const armorImg = document.querySelector('#armor-img');
const playEl = document.querySelector('#play');
const playImg = document.getElementById('play-img');
// Computer Elements
const compEl = document.querySelector('#comp');
const compName = document.getElementById('comp-name');
const compImg = document.getElementById('comp-img'); 
// Delicious Textbox Elements
let textBoxArea = document.querySelector('.text-box');
const textBox = document.getElementById('console');
// ---------------- STATE VARIABLES ----------------------------
let player = {
  weapon: {
    name: '',
    grip: '',
    attackType: '',
    damageType: '',
    physDam: 0,
    magDam: 0,
    crit: 0,
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
let areaText = textBox.value;
// Beginning Game Variables
let enemy;
let playerChoice = [];
let playerActionChoice = '';
let playerWeaponChoice = '';
let playerShieldChoice = '';
let playerArmorChoice = '';
let weapons = [gladius, pugio, scythe, spear, katana, halberd, claymore, battleAxe, warHammer, lavaSpit, lightningSpear, arcticBolt, magicMissile, mace, godHand, insanity, 
  daiKatana, windFury, oakCrush, handOfGod, whirlWind];
let shields = [smallShield, mediumShield, largeShield, greatShield];
let armors = [celt, knight, legionnaire, mage, poorKnight, viking];
let ranWeapon; 
let ranShield; 
let ranArmor; 
let startChoice = [];
let confirmChoice = '';
// Combat Game Variables
let playerDodge; 
let playPhysPos = player.armor.physRes; 
let playMagPos = player.armor.magRes; 
let playDamTot = 0; 
let compDamTot = 0; 
let actionChoice = []; 
let playerInput = '';
let physAttDam;
let magAttDam;
let rollTimer;
let compAttackTimer;
let playAttackTimer;
// Starting Display Variables
// weaponBtns.style.display = 'none';
// armorBtns.style.display = 'none';
// shieldBtns.style.display = 'none';
// actionsEl.style.display = 'none';
// <------------------------------- EVENT LISTENERS ---------------------------------------- \\
attackBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'You have chosen to ATTACK ' + enemy.name + '! Are you sure?' + '\n';
  initiateEl.style.display = 'inline-block';
  initiateEl.addEventListener('click', initiate);
});
dodgeBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'You have chosen to DODGE! Are you sure?' + '\n';
  initiateEl.style.display = 'inline-block';
  initiateEl.addEventListener('click', initiate);
});
postureBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'You have chosen to POSTURE with your ' + player.shield.name + '! Are you sure?' + '\n';
  initiateEl.style.display = 'inline-block';
  initiateEl.addEventListener('click', initiate);
}); 
rollBtn.addEventListener('click', function(e) {
  playerInput = e.target.innerText;
  textBox.value += 'Could I offer you this ROLL in these trying times?' + '\n';
  initiateEl.style.display = 'inline-block';
  initiateEl.addEventListener('click', initiate);
});
onceMoreEl.addEventListener('click', startOver);
function startOver() {
  init();
}
// <------------------------------------- FUNCTIONS --------------------------------------- \\
init();
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
let startScroll;
let stopScroll;
function textBoxScroll() {
  if (!startScroll) {
  startScroll = setInterval(textScroll, 500);
  return
  }
}
function textScroll() {
  areaText += Math.random() + '\n';
  textBox.scrollTop = textBox.scrollHeight;
  return
}
function stopTextScroll() {
  clearInterval(startScroll);
  startScroll = null;
  return
}
function compTimer() { 
  if (!compAttackTimer) {
    compAttackTimer = setInterval(computerAttack, 30000);
    playAttackTimer = setInterval(playerAttack, 30000);
    return
  }
}
function stopCompTimer() { 
  clearInterval(compAttackTimer);
  compAttackTimer = null;
  clearInterval(playAttackTimer);
  playAttackTimer = null;
  return
}
function roll() {
  textBox.value += "Phew! Risky. Better not try that again." + '\n';
  hideRoll();
  playerAttack();
  return
}
function hideRoll() {
  clearTimeout(rollTimer);
  rollTimer = null;
  if (rollTimer == null) {
    rollBtn.style.display = 'none';
    rollTimer = setTimeout(noRoll, (10000 * player.shield.roll));
  }
  return
}
function noRoll() {
  rollBtn.style.display = 'inline-block';
  return
}
function showRoll() {
  clearTimeout(rollTimer);
  rollTimer = null;
}
function attack() {
  textBox.value += 'You have chosen to ATTACK ' + enemy.name + ', good luck!' + '\n';
  playerAttack();
  playerAttack();
  computerAttack();
  return
};
function posture() {
  textBox.value += "You have POSTURED like an ABSOLUTE UNIT!" + '\n';
  playPhysPos = player.armor.physRes + player.shield.physRes;
  playMagPos = player.armor.magRes + player.shield.magRes;
  playerAttack();
  computerAttack();
  playPhysPos = player.armor.physRes;
  playMagPos = player.armor.magRes;
  return
}
function dodge() {
  playerDodge = player.armor.dodge;
  let dodgeAttempt = Math.floor(Math.random() * 101);
  if (player.weapon.grip == 'oneHand') {
      playerDodge += 5;
  } 
  if (player.weapon == pugio || player.weapon == spear || player.weapon == scythe || player.weapon == katana || player.weapon == godHand || player.weapon == windFury) {
    playerDodge += 5;
  } 
  if (player.shield == smallShield) {
    playerDodge += 5;
  }
  if (player.shield == mediumShield) {
    playerDodge += 3;
  }
  if (Math.floor(Math.random() * 101 < playerDodge))  {
    textBox.value += 'You dodged ' + enemy.name + "'s attack!" + '\n';
    playerAttack();
    return
  } else {
    if (Math.floor(Math.random() * 101) > playerDodge) {
    textBox.value += 'You did not dodge ' + enemy.name + "'s attack!" + '\n';
    computerAttack();
    playerAttack();
    return
    } else {
      let weapon;
    if (Math.floor(Math.random() * 101) > 50) {
      weapon = enemy.weapons[0];
      } else { 
        weapon = enemy.weapons[1];
      }
        let physAttDam = weapon.physDam;
        let magAttDam = weapon.magDam;
        pad = physAttDam * (1 - (playPhysPos / 100));
        mad = magAttDam * (1 - (playMagPos / 100));
        compDamTot = pad + mad;
        if (weapon.damageType == 'Pierce') {
           if (player.armor.type == 'plate-mail') {
            compDamTot *= 0.9;
          } else if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
            compDamTot *= 1.1;
          } else {
            compDamTot;
          }
        }
        if (weapon.damageType == 'Slash') {
          if (player.armor.type == 'chain-mail' || player.armor.type == 'plate-mail') {
            compDamTot *= 0.9;
          } else if (player.armor.type == 'leather-cloth' || player.armor.type == 'leather-mail') {
            compDamTot *= 1.1;
          } else {
            compDamTot;
          }
        }
        if (weapon.damageType == 'Blunt') {
          if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
            compDamTot *=  0.9;
          } else if (player.armor.type == 'plate-mail' || player.armor.type == 'leather-mail') {
            compDamTot *= 1.1;
          }
        }
        if (weapon.attackType == 'Magic') {
           if (player.armor.type == 'leather-cloth') {
            compDamTot *= 0.9;
          } else if (player.armor.type == 'plate-mail') {
            compDamTot *= 1.1;
          } else {
            compDamTot;
          }
        }
      if (player.weapon.damageType == 'Fire' || player.weapon.damageType == 'Sorcery' || player.weapon.damageType == 'Lightning') {
        compDamTot *= 1.1;
      }
      if (player.weapon.damageType == 'Frost' || player.weapon.damageType == 'Earth') {
        compDamTot *= 0.85;
      }
      if (player.weapon.damageType == 'Spooky' || player.weapon.damageType == 'Faith') {
        compDamTot *= 0.9
      }
      compDamTot *= (1 - ((playerDodge + player.shield.physRes) / 100));
      Math.floor(compDamTot);
      playHealth -= compDamTot;
      textBox.value += 'You nearly dodge yet ' + enemy.name + ' strikes you with ' + weapon.name + ' for ' + compDamTot + ' ' + weapon.damageType + ' damage! (Glancing Blow)' + '\n';
      playHealthBar.updateHealth(playHealth);
      playerAttack();
    }
  }
}
function initiate() {
  textBox.value += 'You have chosen to initiate the COMBAT round. Good luck!' + '\n';
  console.log(playerInput);
  if (playerInput == 'Attack') { 
    attack();
    return
  } else if (playerInput == 'Dodge') {
    dodge();
    return
  } else if (playerInput == 'Posture') {
    posture();
    return
  } else if (playerInput == 'Roll') {
    roll();
    return
  } else {
    return
  }
}

function playerAttack() {

  let physAttDam = player.weapon.physDam;
  let magAttDam = player.weapon.magDam;
  let physDamRes = enemy.armor.physRes;
  let magDamRes = enemy.armor.magRes;

  if (player.weapon == windFury || player.weapon == magicMissile) {
    if (Math.floor(Math.random() * 101) > 85) {
      textBox.value += 'A DEVASTATING Windfury has procced!' + '\n';
      playerAttack();
      playerAttack();
    }
  }

  if (player.weapon == godHand || player.weapon == whirlWind) {
    if (Math.floor(Math.random() * 101) > 90) {
      textBox.value += 'They that Sow the Wind, Shall Reap the Whirlwind' + '\n';
      playerAttack();
      playerAttack();
      playerAttack();
    }
  }

  if ((Math.floor(Math.random() * 101) - player.weapon.crit) > 10) {
    physAttDam = physAttDam * (1 - (physDamRes / 100));
    magAttDam = magAttDam * (1 - (magDamRes / 100));
    playDamTot = physAttDam + magAttDam;

    if (player.weapon.damageType == 'Pierce') {
      if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'chain-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Slash') {
      if (enemy.armor.type == 'chain-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Blunt') {
      if (enemy.armor.type == 'leather-mail') {
        playDamTot *=  0.9;
      } else if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.attackType == 'Magic') {
      if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type = 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fire' || player.weapon.damageType == 'Sorcery' || player.weapon.damageType == 'Lightning') {
      playDamTot *= 1.15;
    }
    if (player.weapon.damageType == 'Faith' || player.weapon.damageType == 'Spooky') {
      playDamTot *= 1.1;
    }
    console.log(playDamTot);
    compHealth -= Math.floor(playDamTot);
    textBox.value += 'You attack ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);

  } else if ((Math.floor(Math.random() * 101) - player.weapon.crit) > 5) {

    physAttDam = physAttDam * (1 - (physDamRes / 100));
    magAttDam = magAttDam * (1 - (magDamRes / 100));
    if (player.armor == mage) {
      magAttDam *= 1.1;
    }
    playDamTot = physAttDam + magAttDam;

    if (player.weapon.grip == 'oneHand') {
      playDamTot = 2 * (physAttDam + magAttDam);
    }
    if (player.weapon.grip == 'twoHand') {
      playDamTot = 2.5 * (physAttDam + magAttDam);
    }
    if (player.weapon == pugio || player.weapon == spear || player.weapon == scythe || player.weapon == godHand || player.weapon == windFury) {
      playDamTot = 3.5 * (physAttDam + magAttDam);
    }
    if (player.weapon.damageType == 'Pierce') {
        if (enemy.armor.type == 'plate-mail') {
          playDamTot *= 0.9;
        } else if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'leather-cloth') {
          playDamTot *= 1.1;
        }
    }
    if (player.weapon.damageType == 'Slash') {
        if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'plate-mail') {
          playDamTot *= 0.9;
        } else if (enemy.armor.type == 'leather-cloth' || enemy.armor.type == 'leather-mail') {
          playDamTot *= 1.1;
        }
    }
    if (player.weapon.damageType == 'Blunt') {
      if (enemy.armor.type == 'leather-mail' || enemy.armor.type == 'leather-cloth') {
        playDamTot *=  0.9;
      } else if (enemy.armor.type == 'plate-mail' || enemy.armor.type == 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.attackType == 'Magic') {
      if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type = 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fire' || player.weapon.damageType == 'Sorcery' || player.weapon.damageType == 'Lightning') {
      playDamTot *= 1.15;
    }
    if (player.weapon.damageType == 'Faith' || player.weapon.damageType == 'Spooky') {
      playDamTot *= 1.1;
    }

    Math.floor(playDamTot);
    console.log(playDamTot);
    compHealth -= playDamTot;
    textBox.value += 'You CRITICALLY STRIKE ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' ' + player.weapon.damageType + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);

  } else {

    physAttDam = physAttDam * (1 - (physDamRes / 100));
    magAttDam = magAttDam * (1 - (magDamRes / 100));
    playDamTot = physAttDam + magAttDam;

    if (player.weapon.damageType == 'Pierce') {
      if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'leather-cloth') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Slash') {
      if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'plate-mail') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'leather-cloth' || enemy.armor.type == 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Blunt') {
      if (enemy.armor.type == 'chain-mail' || enemy.armor.type == 'leather-cloth') {
        playDamTot *=  0.9;
      } else if (enemy.armor.type == 'plate-mail' || enemy.armor.type == 'leather-mail') {
        playDamTot *= 1.1;
      }
    }
    if (player.weapon.attackType == 'Magic') {
      if (enemy.armor.type == 'leather-cloth') {
        playDamTot *= 0.9;
      } else if (enemy.armor.type == 'plate-mail') {
        playDamTot *= 1.1;
      }
    }

    if (player.weapon.damageType == 'Fire' || player.weapon.damageType == 'Lightning' || player.weapon.damageType == 'Sorcery') {
      playDamTot *= 1.15;
    }
    if (player.weapon.damageType == 'Spooky' || player.weapon.damageType == 'Faith') {
      playDamTot *= 1.1;
    }
    if (player.weapon.grip == 'oneHand') {
      playDamTot *= 1.1;
    }
    if (player.weapon.grip == 'twoHand') {
      playDamTot *= 1.25;
    }
    console.log(playDamTot);
    Math.floor(playDamTot);
    compHealth -= playDamTot;
    textBox.value += 'You frenzy into a rage and MULTI-STRIKE ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' ' + player.weapon.damageType + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);
    compHealth -= playDamTot;
    textBox.value += 'You frenzy into a rage and MULTI-STRIKE ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' ' + player.weapon.damageType + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);
    compHealth -= playDamTot;
    textBox.value += 'You frenzy into a rage and MULTI-STRIKE ' + enemy.name + ' with your ' + player.weapon.name + ' for ' + playDamTot + ' ' + player.weapon.damageType + ' damage!' + '\n';
    compHealthBar.updateHealth(compHealth);
    textBox.value += 'You attempt to flurry into further strikes!' + '\n';
    playerAttack();
  }
  if (compHealth <= 0) {
    playWin();
    return
  }
  initiateEl.style.display = 'none';
  return
}

function computerAttack() {
  if ((Math.floor(Math.random() * 101) - (enemy.weapons[0].crit + enemy.weapons[1].crit) > 10)) {
    let weapon;
    if (Math.floor(Math.random() * 101) > 50) {
      weapon = enemy.weapons[0];
      } else { 
        weapon = enemy.weapons[1];
      }
        let physAttDam = weapon.physDam;
        let magAttDam = weapon.magDam;
        pad = physAttDam * (1 - (playPhysPos / 100));
        mad = magAttDam * (1 - (playMagPos / 100));
        compDamTot = pad + mad;
        if (weapon.damageType == 'Pierce') {
           if (player.armor.type == 'plate-mail') {
            compDamTot *= 0.9;
          } else if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
            compDamTot *= 1.1;
          } else {
            compDamTot;
          }
        }
        if (weapon.damageType == 'Slash') {
          if (player.armor.type == 'chain-mail' || player.armor.type == 'plate-mail') {
            compDamTot *= 0.9;
          } else if (player.armor.type == 'leather-cloth' || player.armor.type == 'leather-mail') {
            compDamTot *= 1.1;
          } else {
            compDamTot;
          }
        }
        if (weapon.damageType == 'Blunt') {
          if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
            compDamTot *=  0.9;
          } else if (player.armor.type == 'plate-mail' || player.armor.type == 'leather-mail') {
            compDamTot *= 1.1;
          }
        }
        if (weapon.attackType == 'Magic') {
           if (player.armor.type == 'leather-cloth') {
            compDamTot *= 0.9;
          } else if (player.armor.type == 'plate-mail') {
            compDamTot *= 1.1;
          } else {
            compDamTot;
          }
        }
      if (player.weapon.damageType == 'Fire' || player.weapon.damageType == 'Sorcery' || player.weapon.damageType == 'Lightning') {
        compDamTot *= 1.1;
      }
      if (player.weapon.damageType == 'Frost' || player.weapon.damageType == 'Earth') {
        compDamTot *= 0.85;
      }
      if (player.weapon.damageType == 'Spooky' || player.weapon.damageType == 'Faith') {
        compDamTot *= 0.9
      }
      playHealth -= Math.floor(compDamTot);
      textBox.value += enemy.name + ' attacks you with ' + weapon.name + ' for ' + compDamTot + ' ' + weapon.damageType + ' damage!' + '\n';
      playHealthBar.updateHealth(playHealth);
  
 } else if ((Math.floor(Math.random() * 101) - (enemy.weapons[0].crit + enemy.weapons[1].crit) > 5)) {

    let weapon;
    if (Math.floor(Math.random() * 101) > 50) {
      weapon = enemy.weapons[0];
      } else { 
        weapon = enemy.weapons[1];
      }
        let physAttDam = weapon.physDam;
        let magAttDam = weapon.magDam;
        pad = physAttDam * (1 - (playPhysPos / 100));
        mad = magAttDam * (1 - (playMagPos / 100));
        compDamTot = 2 * (pad + mad);

      if (weapon.damageType == 'Pierce') {
        if (player.armor.type == 'plate-mail') {
          compDamTot *= 0.9;
        } else if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
          compDamTot *= 1.1;
        } else {
          compDamTot;
        }
      }
      if (weapon.damageType == 'Slash') {
        if (player.armor.type == 'chain-mail' || player.armor.type == 'plate-mail') {
          compDamTot *= 0.9;
        } else if (player.armor.type == 'leather-cloth' || player.armor.type == 'leather-mail') {
          compDamTot *= 1.1;
        } else {
          compDamTot;
        }
      }
      if (weapon.damageType == 'Blunt') {
        if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
          compDamTot *=  0.9;
        } else if (player.armor.type == 'plate-mail' || player.armor.type == 'leather-mail') {
          compDamTot *= 1.1;
        }
      }

      if (weapon.attackType == 'Magic') {
          if (player.armor.type == 'leather-cloth') {
          compDamTot *= 0.9;
        } else if (player.armor.type == 'plate-mail') {
          compDamTot *= 1.1;
        } else {
          compDamTot;
        }
      }
    if (player.weapon.damageType == 'Fire' || player.weapon.damageType == 'Sorcery' || player.weapon.damageType == 'Lightning') {
      compDamTot *= 1.1;
    }
    if (player.weapon.damageType == 'Frost' || player.weapon.damageType == 'Earth') {
      compDamTot *= 0.85;
    }
    if (player.weapon.damageType == 'Spooky' || player.weapon.damageType == 'Faith') {
      compDamTot *= 0.9
    }
    playHealth -= Math.floor(compDamTot);
    textBox.value += enemy.name + ' CRITICALLY STRIKES you with ' + weapon.name + ' for ' + compDamTot + ' ' + weapon.damageType + ' damage!' + '\n';
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

    if (weapon1.damageType == 'Pierce') {
      if (player.armor.type == 'plate-mail') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
        compDamTot *= 1.1;
      }
    }
    if (weapon1.damageType == 'Slash') {
      if (player.armor.type == 'chain-mail' || player.armor.type == 'plate-mail') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'leather-cloth' || player.armor.type == 'leather-mail') {
        compDamTot *= 1.1;
      }
    }
    if (weapon1.damageType == 'Blunt') {
      if (player.armor.type == 'chain-mail' || player.armor.type == 'leather-cloth') {
        compDamTot *=  0.9;
      } else if (player.armor.type == 'plate-mail' || player.armor.type == 'leather-mail') {
        compDamTot *= 1.1;
      }
    }
    if (weapon2.attackType == 'Magic') {
      if (player.armor.type == 'leather-cloth') {
        compDamTot *= 0.9;
      } else if (player.armor.type == 'plate-mail') {
        compDamTot *= 1.1;
      }
    }
    if (player.weapon.damageType == 'Fire' || player.weapon.damageType == 'Sorcery' || player.weapon.damageType == 'Lightning') {
      compDamTot *= 1.1;
    }
    if (player.weapon.damageType == 'Frost' || player.weapon.damageType == 'Spooky' || player.weapon.damageType == 'Faith' || player.weapon.damageType == 'Earth') {
      compDamTot *= 0.9;
    }
    compDamTot *= 1.5;
    Math.floor(compDamTot);
    playHealth -= compDamTot;
    textBox.value += enemy.name + ' CRUSHES you with their ' + weapon1.name + ' and ' + weapon2.name + ' for ' + compDamTot + ' ' + weapon1.damageType + ' and ' + weapon2.damageType + ' damage!' + '\n';
    playHealthBar.updateHealth(playHealth);
  }
  if (playHealth <= 0) {
    compWin();
  }
}
// ---------------------------- STARTING GAME FUNCTIONS --------------------------------- \\
function playerChoose() {
  playEl.style.display = 'inline-block';
  chooseWeapon();
}
function chooseWeapon() {
  confirmEl.style.displaay = 'inline-block';
  weaponBtns.style.display = 'inline-block';
  weaponBtns.addEventListener('click', function(e) {
  textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
  playerWeaponChoice = e.target.innerText;
  if (playerWeaponChoice == 'Gladius') {
    playerWeaponChoice = gladius;
    weapImg.src = './Img/gladius.png';
  } else if (playerWeaponChoice == 'Pugio') {
    playerWeaponChoice = pugio;
    weapImg.src = './Img/pugio.png';
  } else if (playerWeaponChoice == 'Scythe') {
    playerWeaponChoice = scythe;
    weapImg.src = './Img/scythe.png';
  } else if (playerWeaponChoice == 'Spear') {
    playerWeaponChoice = spear;
    weapImg.src = './Img/spear.png';
  } else if (playerWeaponChoice == 'Katana') {
    playerWeaponChoice = katana;
    weapImg.src = './Img/katana.png';
  } else if (playerWeaponChoice == 'Halberd') {
    playerWeaponChoice = halberd;
    weapImg.src = './Img/halberd.png';
  } else if (playerWeaponChoice == 'Claymore') {
    playerWeaponChoice = claymore;
    weapImg.src = './Img/claymore.png';
  } else if (playerWeaponChoice == 'Battle Axe') {
    playerWeaponChoice = battleAxe;
    weapImg.src = './Img/battleaxe.png';
  } else if (playerWeaponChoice == 'War Hammer') {
    playerWeaponChoice = warHammer;
    weapImg.src = './Img/warhammer.png';
  } else if (playerWeaponChoice == 'Lava Spit') {
    playerWeaponChoice = lavaSpit;
    weapImg.src = './Img/fire.png';
  } else if (playerWeaponChoice == 'Lightning Spear') {
    playerWeaponChoice = lightningSpear;
    weapImg.src = './Img/lightning-spear.png';
  } else if (playerWeaponChoice == 'Arctic Bolt') {
    playerWeaponChoice = arcticBolt;
    weapImg.src = './Img/frost.png';
  } else if (playerWeaponChoice == 'Magic Missile') {
    playerWeaponChoice = magicMissile;
    weapImg.src = './Img/sorcery.png';
  } else if (playerWeaponChoice == 'Mace') {
    playerWeaponChoice = mace;
    weapImg.src = './Img/mace.png';
  } else if (playerWeaponChoice == 'Hand of God') {
    playerWeaponChoice = handOfGod;
    weapImg.src = './Img/faith.png';
  } else if (playerWeaponChoice == 'Insanity') {
    playerWeaponChoice = insanity;
    weapImg.src = './Img/dark.png';
  } else if (playerWeaponChoice == 'Dai-Katana') {
    playerWeaponChoice = daiKatana;
    weapImg.src = './Img/dai-katana.png';
  } else if (playerWeaponChoice == 'Oak Crush') {
    playerWeaponChoice = oakCrush;
    weapImg.src = './Img/earth.png';
  } else if (playerWeaponChoice == 'Wind Fury') {
    playerWeaponChoice = windFury;
    weapImg.src = './Img/windfury.png';
  } else if (playerWeaponChoice == 'God Hand') {
    playerWeaponChoice = godHand;
    weapImg.src = './Img/godHand.png';
  } else if (playerWeaponChoice == 'Whirlwind') {
    playerWeaponChoice = whirlWind;
    weapImg.src = './Img/whirlwind.png';
  }
  player.weapon = playerWeaponChoice;
  damEl.innerText = playerWeaponChoice.physDam + playerWeaponChoice.magDam;
  attTypeEl.innerText = playerWeaponChoice.attackType;
  damTypeEl.innerText = playerWeaponChoice.damageType;
  confirmEl.addEventListener('click', function(e) {
    chooseShield();
  });
});
}
function chooseShield() {
  weaponBtns.style.display = 'none';
  shieldBtns.style.display = 'inline-block';
  shieldBtns.addEventListener('click', function(e) {
    textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
    playerShieldChoice = e.target.innerText;
    if (playerShieldChoice == 'Parrying Buckler'){
      playerShieldChoice = smallShield;
      shieldImg.src = './Img/buckler.png';
    } else if (playerShieldChoice == "Heater Shield") {
      playerShieldChoice = mediumShield;
      shieldImg.src = './Img/heater-shield.png';
    } else if (playerShieldChoice == "Scutum") {
      playerShieldChoice = largeShield;
      shieldImg.src = './Img/scutum.png';
    } else if (playerShieldChoice == "Pavise") {
      playerShieldChoice = greatShield;
      shieldImg.src = './Img/pavise.png';
    }
    player.shield = playerShieldChoice;
    confirmEl.addEventListener('click', function(e) {
      chooseArmor();
    });
  });
}
function chooseArmor() {
  shieldBtns.style.display = 'none';
  armorBtns.style.display = 'inline-block';
  armorBtns.addEventListener('click', function(e) {
    textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
    playerArmorChoice = e.target.innerText;
    if (playerArmorChoice == 'Celtic Menagerie'){
      playerArmorChoice = celt;
      armorImg.src = './Img/celt-armor.png';
    } else if (playerArmorChoice == "Knight's Full Plate") {
      playerArmorChoice = knight;
      armorImg.src = './Img/knight-armor.png';
    } else if (playerArmorChoice == "Legionnaire's Regalia") {
      playerArmorChoice = legionnaire;
      armorImg.src = './Img/legion-armor.png';
    } else if (playerArmorChoice == "Mage's Robes") {
      playerArmorChoice = mage;
      armorImg.src = './Img/robes.png';
    } else if (playerArmorChoice == "Poor Knight's Chainmail") {
      playerArmorChoice = poorKnight;
      armorImg.src = './Img/chain-armor.png';
    } else if (playerArmorChoice == "Viking Lamellar") {
      playerArmorChoice = viking;
      armorImg.src = './Img/viking-armor.png';
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
  playEl.style.display = 'inline-block';
  randomWeapon();
  randomShield();
  randomArmor();
  render();
}
function randomWeapon() {
  ranWeapon = Math.floor(Math.random() * weapons.length);
  player.weapon = weapons[ranWeapon];
  damEl.innerText = player.weapon.physDam + player.weapon.magDam;
  attTypeEl.innerText = player.weapon.attackType;
  damTypeEl.innerText = player.weapon.damageType;
  textBox.value += 'You have randomized and received the ' + player.weapon.name + '!' + '\n';
  if (player.weapon == gladius) {
    weapImg.src = './Img/gladius.png';
  } else if (player.weapon == pugio) {
    weapImg.src = './Img/pugio.png';
  } else if (player.weapon == scythe) {
    weapImg.src = './Img/scythe.png';
  } else if (player.weapon == spear) {
    weapImg.src = './Img/spear.png';
  } else if (player.weapon == katana) {
    weapImg.src = './Img/katana.png';
  } else if (player.weapon == halberd) {
    weapImg.src = './Img/halberd.png';
  } else if (player.weapon == claymore) {
    weapImg.src = './Img/claymore.png';
  } else if (player.weapon == battleAxe) {
    weapImg.src = './Img/battleaxe.png';
  } else if (player.weapon == warHammer) {
    weapImg.src = './Img/warhammer.png';
  } else if (player.weapon == lavaSpit) {
    weapImg.src = './Img/fire.png';
  } else if (player.weapon == lightningSpear) {
    weapImg.src = './Img/lightning-spear.png';
  } else if (player.weapon == arcticBolt) {
    weapImg.src = './Img/frost.png';
  } else if (player.weapon == magicMissile) {
    weapImg.src = './Img/sorcery.png';
  } else if (player.weapon == mace) {
    weapImg.src = './Img/mace.png';
  } else if (player.weapon == handOfGod) {
    weapImg.src = './Img/faith.png';
  } else if (player.weapon == insanity) {
    weapImg.src = './Img/dark.png';
  } else if (player.weapon == daiKatana) {
    weapImg.src = './Img/dai-katana.png';
  } else if (player.weapon == oakCrush) {
    weapImg.src = './Img/earth.png';
  } else if (player.weapon == windFury) {
    weapImg.src = './Img/windfury.png';
  } else if (player.weapon == godHand) {
    weapImg.src = './Img/godHand.png';
  } else if (player.weapon == whirlWind) {
    weapImg.src = './Img/whirlwind.png';
  }
}
function randomShield() {
  ranShield = Math.floor(Math.random() * shields.length);
  player.shield = shields[ranShield];
  textBox.value += 'You have randomized and received the ' + player.shield.name + '!' + '\n';
  if (player.shield == smallShield){
    shieldImg.src = './Img/buckler.png';
  } else if (player.shield == mediumShield) {
    shieldImg.src = './Img/heater-shield.png';
  } else if (player.shield == largeShield) {
    shieldImg.src = './Img/scutum.png';
  } else if (player.shield == greatShield) {
    shieldImg.src = './Img/pavise.png';
  }
}
function randomArmor() {
  ranArmor = Math.floor(Math.random() * armors.length);
  player.armor = armors[ranArmor];
  physDefEl.innerText = player.armor.physRes;
  magDefEl.innerText = player.armor.magRes;
  dodgeEl.innerText = player.armor.dodge;
  textBox.value += 'You have randomized and received the ' + player.armor.name + '!' + '\n';
  if (player.armor == celt){
    armorImg.src = './Img/celt-armor.png';
  } else if (player.armor == knight) {
    armorImg.src = './Img/knight-armor.png';
  } else if (player.armor == legionnaire) {
    armorImg.src = './Img/legion-armor.png';
  } else if (player.armor == mage) {
    armorImg.src = './Img/robes.png';
  } else if (player.armor == poorKnight) {
    armorImg.src = './Img/chain-armor.png';
  } else if (player.armor == viking) {
    armorImg.src = './Img/viking-armor.png';
  }
}
function randomEnemy() { 
  if (Math.floor(Math.random() * 101) > 52) {
    enemy = guts;
    compImg.src = './Img/Guts-Wolf.png';
    compImg.height = 500;
    compImg.width = 500;
  } else if (Math.floor(Math.random() * 101) > 4) {
    enemy = dorien;
    compImg.src = './Img/Dorien.png';
    // compImg.height = 650;
    // compImg.width = 200;
    compImg.top = 100;
  } else {
    enemy = daethos;
    compImg.src = './Img/Daethos.png';
    compImg.width = 425;
    compImg.height = 650;
    compImg.opacity = 0.75;
  }
  compName.innerText = enemy.name;
  textBox.value += 'Your last opponent is ' + enemy.name + '!' + '\n';
  console.log(enemy);
}
function init() {

enemy;
playerChoice = [];
playerActionChoice = '';
playerWeaponChoice = '';
playerShieldChoice = '';
playerArmorChoice = '';
weapons = [gladius, pugio, scythe, spear, katana, halberd, claymore, battleAxe, warHammer, lavaSpit, lightningSpear, arcticBolt, magicMissile, mace, godHand, insanity, 
  daiKatana, windFury, oakCrush, handOfGod, whirlWind];
shields = [smallShield, mediumShield, largeShield, greatShield];
armors = [celt, knight, legionnaire, mage, poorKnight, viking];
ranWeapon; 
ranShield; 
ranArmor; 
startChoice = [];
confirmChoice = '';
// Combat Game Variables
playerDodge; 
playPhysPos = player.armor.physRes; 
playMagPos = player.armor.magRes; 
playDamTot = 0; 
compDamTot = 0; 
actionChoice = []; 
playerInput = '';
physAttDam;
magAttDam;
rollTimer = null;
compAttackTimer;
playAttackTimer;

  playHealth = 3000;
  initiateEl.style.display = 'none';
  confirmEl.style.display = 'none';
  compEl.style.display = 'none';
  weaponBtns.style.display = 'none';
  shieldBtns.style.display = 'none';
  armorBtns.style.display = 'none';
  actionsEl.style.display = 'none';
  createEl.style.display = 'inline-block';
  randomEl.style.display = 'inline-block';
  duelEl.style.display = 'inline-block';
  backgroundEl.style.display = 'inline-block';
  diedEl.style.display = 'none';
  initiateEl.style.display = 'none';
  victoryEl.style.display = 'none';
  onceMoreEl.style.display = 'none';
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
function start() {
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
function playWin() {
  textBox.value += 'Congratulations, you have won the Ascea! Would you like to play again?' + '\n';
  actionsEl.style.display = 'none';
  onceMoreEl.style.display = 'inline-block';
  compEl.style.display = 'none';
  victoryEl.style.display = 'inline-block';
  stopCompTimer();
  stopTextScroll();
  showRoll();
}
function compWin() {
  textBox.value += 'YOU DIED' + '\n'
  onceMoreEl.style.display = 'inline-block';
  actionsEl.style.display = 'none';
  playEl.style.display = 'none';
  backgroundEl.style.display = 'none';
  compEl.style.display = 'none';
  diedEl.style.display = 'inline-block';
  stopCompTimer();
  stopTextScroll();
  showRoll();
}
function render() {
  createEl.style.display = 'none';
  confirmEl.style.display = 'none';
  randomEl.style.display = 'none';
  duelEl.style.display = 'none';
  armorBtns.style.display = 'none';
  actionsEl.style.display = 'inline-block';
  initiateEl.style.display = 'none';
  randomEnemy();
  textBoxScroll();
  compEl.style.display = 'inline-block';
  weapTT.innerText = player.weapon.name + '\n' + 'Attack Type: ' + player.weapon.attackType + '\n' +  'Damage Type: ' + player.weapon.damageType +
  '\n' + 'Damage: ' + (player.weapon.magDam + player.weapon.physDam) + '\n' + 'Crit Chance: ' + player.weapon.crit + '%';
  shieldTT.innerText = player.shield.name + '\n' + 'Physical Defense: ' + player.shield.physRes + '\n' + 'Magical Defense: ' + player.shield.magRes +
  '\n' + 'Roll Timer: ' + (player.shield.roll * 10) +'s';
  armorTT.innerText = player.armor.name + '\n' + 'Physical Defense: ' + player.armor.physRes + '\n' + 'Magical Defense: ' + player.armor.magRes +
  '\n' + 'Dodge: ' + player.armor.dodge + '%';
  playPhysPos = player.armor.physRes;
  playMagPos = player.armor.magRes;
  compHealth = 5000;
  playHealthBar.updateHealth(playHealth);
  compHealthBar.updateHealth(compHealth);
  compTimer();
}