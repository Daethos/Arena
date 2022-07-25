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
    constructor(name, physRes, magRes, dodge) {
    this.name = name;
    this.physRes = physRes;
    this.magRes = magRes;
    this.dodge = dodge;
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

// FUNCTION TO UPDATE HEALTH
// INITIATE-BUTTON.addEventListener('click', function(e){
// playHealthBar.updateHealth(playHealth);
// compHealthBar.updateHealth(compHealth);
// });

// Opponents
// Opponent ALWAYS ATTACKS ONCE W/ WEAPON1.
// FUNCTION to choose between ATTACK w/ SPELL or DODGE
const dorien = new Opponents('Dorien', 'greatSpear', 'insanity', 'fox');
const guts = new Opponents('Guts', 'hunkOfIron', 'godHand', 'wolf');
const daethos = new Opponents('Daethos', 'soulRend', 'soulRend', 'hush'); // Hidden Boss

// Weapon Possibilities
const Gladius = new Weapons('Gladius', 'oneHand', 'P', 'pierce', 200, 0);
const Dagger = new Weapons('Pugio', 'oneHand', 'P', 'pierce', 150, 0); // +10% Ddodge as is
const Scythe = new Weapons('Scythe', 'oneHand', 'P', 'pierce', 200, 0);
const Spear = new Weapons('Spear', 'oneHand', 'P', 'pierce', 200, 0); // +Dodge to offset position limitations
const Katana = new Weapons('Katana', 'oneHand', 'P', 'slash', 200, 0);
const Halberd = new Weapons('Halberd', 'twoHand', 'P', 'pierce', 300, 0);
const Claymore = new Weapons('Claymore', 'twoHand', 'P', 'slash', 300, 0);
const BattleAxe = new Weapons('Battle Axe', 'twoHand', 'P', 'slash', 300, 0);
const warHammer = new Weapons('War Hammer', 'twoHand', 'P', 'blunt', 300, 0);
const mace = new Weapons('Mace', 'oneHand', 'P', 'blunt' , 200, 0);

// Spell Possibilities
const fireBall = new Weapons('Fireball', 'oneHand', 'M', 'fire', 0, 250);
const lightningSpear = new Weapons('Lightning Spear', 'oneHand', 'M', 'lightning', 0, 250);
const magicMissile = new Weapons('Magic Missle', 'oneHand', 'M', 'sorcery', 0, 250);
const snowBall = new Weapons('Snow Ball', 'oneHand', 'M', 'frost', 0, 250);

// Shield Possibilties
const smallShield = new Shields('Parrying Buckler', 5, 5, 3); // +Dodge to offset position limitaions
const mediumShield = new Shields('Heater Shield', 10, 10, 4);
const largeShield = new Shields('Scutum', 15, 15, 5);
const greatShield = new Shields('Pavise', 25, 25, 6);

// Opponent Equipment
const greatSpear = new Weapons('Blood Moon', 'thrust', 'twoHand', 'P', 'pierce', 250, 0); // Dorien Weapon / NOT available for player
const insanity = new Weapons('Insanity', 'magic', 'oneHand', 'M', 'dark', 100, 150);
const soulRend = new Weapons('Soul Rend', 'magic', 'oneHand', 'M', 'dark', 150, 150); // Daethos Spell / Also available
const godHand = new Weapons('God Hand', 'magic', 'oneHand', 'M', 'faith', 150, 100); // Guts Spell / Also available
const hunkOfIron = new Weapons('Large Hunk of Iron', 'swing', 'twoHand', 'P', 'slash', 250, 0); // Guts Weapon / NOT available for player

// Armor Possibilities
const legionnaire = new Armors("Legionnaire's Regalia", 'leather-mail', 20, 20, 25); //
const knight = new Armors("Knight's Regalia", 'plate-mail', 50, 50, 5); //
const mage = new Armors("Mage's Regalia", 'leather-cloth', 5, 50, 50); //
const celt = new Armors("Celtic Regalia", 'leather-mail', 30, 30, 35); //
const poorKnight = new Armors("Poor Knight's Regalia", "chain-mail", 40, 40, 10); // 
const viking = new Armors("Viking's Regalia", 'leather-mail', 25, 25, 30); // -10% Frost
const wolf = new Armors('Wolf Armor', 'plate-mail', 50, 50, 25);
const fox = new Armors('Fatal Fox', 'plate-mail', 50, 50, 25);
const hush = new Armors('Of Hush and Tendril', 'leather-cloth', 75, 75, 75);

// ----------------- CACHED ELEMENT REFERENCES ---------------------------

// Starting Game Elements
const chooseEl = document.querySelector('#choose');
const randomEl = document.querySelector('#random');
const startEl = document.querySelector('#start');
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

const wb1 = document.getElementById('wb1');
wb1.value = Weapons.gladius;
const wb2 = document.getElementById('wb2');
const wb3 = document.getElementById('wb3');
const wb4 = document.getElementById('wb4');
const wb5 = document.getElementById('wb5');
const wb6 = document.getElementById('wb6');
const wb7 = document.getElementById('wb7');
const wb8 = document.getElementById('wb8');
const wb9 = document.getElementById('wb9');
const wb10 = document.getElementById('wb10');
const wb11 = document.getElementById('wb11');
const wb12 = document.getElementById('wb12');
const wb13 = document.getElementById('wb13');

const sb1 = document.getElementById('sb1');
const sb2 = document.getElementById('sb2');
const sb3 = document.getElementById('sb3');
const sb4 = document.getElementById('sb4');

const ab1 = document.getElementById('ab1');
const ab2 = document.getElementById('ab2');
const ab3 = document.getElementById('ab3');
const ab4 = document.getElementById('ab4');
const ab5 = document.getElementById('ab5');
const ab6 = document.getElementById('ab6');

initiateEl.addEventListener('click', () => {
// This lets me hide everything once I click the initiate button (REWIRE TO CONFIRM BUTTON)
  chooseEl.style.display = 'none';
  startEl.style.display = 'none';
  randomEl.style.display = 'none';
  weaponBtns.style.display = 'none';
  armorBtns.style.display = 'none';
  shieldBtns.style.display = 'none';
  duelEl.style.display = 'none';
  computerHealth.style.display = 'block';
});

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

// attTypeEl.value = playerChoice[0].attackType;
// physDefEl.value = playerChoice[2].physRes;
// damTypeEl.value = playerChoice[0].damageType;
// magDefEl.value = playerChoice[2].magRes;
// damEl.value = playerChoice[0].damage;
// dodgeEl.value = playerChoice[2].dodge;

function playerChoose() {
    //This prompts the selection of Weapons
    chooseWeapon();
    // This prompts the selection of Shields    
    chooseShield();
    // This prompts the selection of Armor
    chooseArmor();
  }
  
function chooseWeapon() {
  weaponBtns.addEventListener('click', function(e) {
    textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
    console.log(e.target.innerText);
    playerWeaponChoice = e.target.value;
    newPlayer = e.target;
    attTypeEl.innerHTML = Gladius.attackType;
  });
    // Chooses the weapons from the WEAPON BUTTONS (2)
  }
function chooseShield() {
    // Chooses the shield from the SHIELD BUTTONS
    shieldBtns.addEventListener('click', function(e) {
      textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
      console.log(e.target.innerText);
      playerShieldChoice = e.target;
    });
  }
function chooseArmor() {
    // Chooses the armor from the ARMOR BUTTONS
    armorBtns.addEventListener('click', function(e) {
      textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
      console.log(e.target.innerText);
      playerArmorChoice = e.target;
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
  playerWeaponChoice = e.target.innerText;
  playerChoice.pop();
  playerChoice.push(playerWeaponChoice);
  if (playerWeaponChoice == )
  player.weapon = `${playerWeaponChoice}`;
  playerWeaponChoice = player.weapon;
  console.log(playerChoice);
  console.log(player);
  console.log(playerWeaponChoice);
  // FIGURE OUT HOW TO GET A STRING TO ASSOCIATE WITH SOMETHING
  // So i have it in a string, I need it to mean the class object
  // once weapon has run as a constructor, figure out how to send it as an object
  // Lock in choice button that removes all event listeners to choose other weapons
  // and solidies that into its own class that slots into the player.weapon
  // damEl.innerText = Player.playerWeaponChoice[physDam];
  // attTypeEl.value = newPlayer[0].attackType;
  // console.log(attTypeEl.value);
});
armorBtns.addEventListener('click', function(e) {
  textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
  console.log(e.target.innerText);
  playerArmorChoice = e.target.innerText;
  newPlayer.pop();
  newPlayer.push(playerArmorChoice);
  console.log(newPlayer);

});
shieldBtns.addEventListener('click', function(e) {
  textBox.value += 'You have selected the ' + e.target.innerText + '!' + '\n';
  console.log(e.target.innerText);
  playerShieldChoice = e.target.innerText;
  newPlayer.pop();
  newPlayer.push(playerShieldChoice);
  console.log(newPlayer);
});

// ---------------- STATE VARIABLES ----------------------------

// Starting health totals before modified by damage
// let health = {
//   player: 1000,
//   computer: 2000
// }
// FIND A WAY TO STORE THE DATA AND ASSIGN IT TO THE PLAYER
// RE-ASSIGN VALUES FROM WEAPON 
// Player Class that pools stats of chosen equipment
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
    dodge: 0,
  },
  armor: {
    name: '',
    type: '',
    physRes: 0,
    magRes: 0,
    dodge: 0,
  }
};

//function iniateButtonWizard() {
// hideButtonEl IS WHAT GETS HIDDEN
//}

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


// If commit to roll, forego mitigation to gamble and outright dodge attack
// Attack Points: 4? Attack: 1, Roll: 1 (Dodge) or Posture: 1 (+% of Dodge to Mitigate), Defend: 1
// Stuff like: If (user.attackType === 'fire', +10% physDam, -10% physRes)
// If (user.Weapon.attackType === 'frost', +10% physRes, +10% magRes)
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
// playerRandom() {
//   randomWeapon();
//   randomShield();
//   randomArmor();
// }
// function randomWeapon() {
//   // FUNCTION to RETURN RANDOM WEAPON for PLAYER.WEAPON
// }
// function randomShield() {
//   // FUNCTION to RETURN RANDOM SHIELD for PLAYER.SHIELD
// }
// function randomArmor() {
//   // FUNCTION to RETURN RANDOM ARMOR for PLAYER.ARMOR
// }

// function randomEnemy() { 
//   let enemyArr = [dorien, guts];
//   return Math.random() < 0.5 ? enemyArr[0]: enemyArr[1];
// }
// console.log(randomEnemy());

// render() {

//   // Sets up the PLAYER stats with FUNCTIONS based on MODIFIERS of WEAPON and ARMOR chosen
//   // Sets up the PLAYER IMG, WEAPON IMGs, ARMOR IMG, COMPUTER IMG
//   // Sets up the PLAYER HEALTH, COMPUTER HEALTH
//   // Sets up the UI
//     //What updates? Turn count, Health Values
//   //Either will have one option at a time for 'ACTION' round, roll, dodge
//   //Maybe an action object

// }

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


// weaponBtn.forEach(weap => {
//   weap.addEventListener('click', (event) {

//     weap.setAttribute('style', 'background-color: yellow;');
//   });
// });

// endGame() {
  // if (computer.health <= 0) { alert('You win!') } else { alert('You lose!')}
  // with two buttons that either reset the game or select other opponent somehow
// }

// // Preset list of actions, EVENT LISTENERS, SET TIMEOUT disables ACTION BUTTONS
// // OF PLAYER