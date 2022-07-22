// MUD Arena against Opponent
// Maybe have to make SUBCLASSES via EXTEND
// Weapon equipment that is randomly allocated or chosen from.

class Weapon {
  constructor(name, style, grip, attackType, damageType, physDam, magDam) {
      this.name = name;
      this.style = style; // Sword, Axe, Mace, Bow, Spear, Shield, Magic
      this.grip = grip; // One-Hand, Two-Hand (Two-Hand a One-Hand item for +50% Damage)
      this.attackType = attackType; // Thrust, Swing, Cast, Shoot
      this.damageType = damageType; // Pierce, Slash, Crushing--affects
      this.physDam = physDam; // Physical Damage 
      this.magDam = magDam; // Magical Damage (Faith, Sorcery)
  }
}

// Armor equipment that is randomly allocated or chosen from.

class Armor {
 constructor(name, type, physRes, magRes, dodge) {
   this.name = name; //Name of the equipment
   this.type = type; //CLoth, ClothLeather, LeatherMail, ChainMail, PlateMail
   this.physRes = physRes; // Physical Resistance, affects PHYSICAL DAMAGE TYPE
   this.magRes = magRes; // Magical Resistance, affects SPELL DAMAGE TYPE
   this.dodge = dodge; // Chance to EVADE Attack, affects ROLL (DODGE)
 }
}

// Preset list of actions, EVENT LISTENERS, SET TIMEOUT disables ACTION BUTTONS
// OF PLAYER

// One-Hand Weapon Possibilities
const gladius = new Weapon('Gladius', 'sword', 'one-hand', 'thrust', 'pierce', 'physical', '');
const dagger = new Weapon('Pugio', 'dagger', 'one-hand', 'thrust', 'pierce', 'physical', '');
const crescentScythe = new Weapon('Scythe', 'scythe', 'one-hand', 'swing', 'pierce', 'physical', '');
const spear = new Weapon('Glaive', 'spear', 'one-hand', 'thrust', 'pierce', 'physical', ''); // +Dodge to offset position limitations
const handAxe = new Weapon('Hurlbat', 'axe', 'one-hand', 'swing', 'slash', 'physical', '');
const cudgel = new Weapon('Cudgel', 'mace', 'one-hand', 'swing', 'blunt', 'physical', '');

// Two-Hand Weapon Possibilties
const katana = new Weapon('Katana', 'sword', 'one-hand', 'swing', 'slash', 'physical', '');
const daiKatana = new Weapon('Dai-Katana', 'sword', 'two-hand', 'swing', 'slash', 'physical', '');
const longBow = new Weapon('Long Bow', 'bow', 'two-hand', 'shoot', 'pierce', 'physical', '');
const hellberd = new Weapon('Hell-Berd', 'halberd', 'two-hand', 'thrust', 'pierce', 'physical', '');
const claymore = new Weapon('Claymore', 'sword', 'two-hand', 'swing', 'slash', 'physical', '');
const battleAxe = new Weapon('Battle Axe', 'axe', 'two-hand', 'swing', 'slash', 'physical', '');
const warHammer = new Weapon('War Hammer', 'mace', 'two-hand', 'swing', 'blunt', 'physical', '');

// Shield Possibilties
const smallShield = new Weapon('Parrying Shield', 'shield', 25, 25, 25); // +Dodge to offset position limitaions
const mediumShield = new Weapon('Round Shield', 'shield', 40, 40, 15);
const largeShield = new Weapon('Kite Shield', 'shield', 55, 55, 10);
const greatShield = new Weapon('Pavise', 'shield', 75, 75, 5);

// Spell Possibilities
const fireBall = new Weapon('Fireball', 'magic', 'one-hand', 'cast', 'sorcery', "", 'fire');
const lightningSpear = new Weapon('Lightning Spear', 'magic', 'one-hand', 'cast', "", 'lightning');
const magicMissile = new Weapon('Magic Missle', 'magic', 'one-hand', 'cast', '', 'sorcery');
const snowBall = new Weapon('Snow Ball', 'magic', 'one-hand', 'cast', '', 'frost');


// Opponent Equipment
const greatSpear = new Weapon('Dorien Spear', 'spear', 'three-hand', 'thrust', 'pierce', 'physical', ''); // Dorien Weapon / NOT available for player
const soulRend = new Weapon('Soul Rend', 'magic', 'one-hand', 'cast', '', 'dark'); // Dorien Spell / Also available
const godHand = new Weapon('God-Hand', 'magic', 'one-hand', 'cast', '', 'divine'); // Guts Spell / Also available
const hunkOfIron = new Weapon('Large Hunk of Iron', 'sword', 'three-hand', 'swing', 'crushing', 'physical', ''); // Guts Weapon / NOT available for player


// Perhaps NO two-hand weapons? Not sure how to write a function to negate using 'three' hands, hmmm. Might be too much for me, maybe just 1h variants. Which means no bows as well. Just 1h and spells

// Armor Possibilities
const legionnaire = new Armor("Legionnaire's Regalia", 'leather-mail', 45, 45, 25); //
const knight = new Armor("Knight's Regalia", 'plate-mail', 75, 75, 5); //
const mage = new Armor("Mage's Regalia", 'leather-cloth', 5, 75, 50); //
const celt = new Armor("Celtic Regalia", 'leather-mail', 35, 35, 35); //
const poorKnight = new Armor("Poor Knight's Regalia", "chain-mail", 60, 60, 10); // 
const viking = new Armor("Viking's Regalia", 'leather-mail', 40, 40, 30); // -10% Frost
const wolf = new Armor('Wolf Armor', 'plate-mail', 75, 75, 25);
const fox = new Armor('Fatal Fox', 'plate-mail', 75, 75, 25);

// opponents is the catchall
const opponents = {
  dorien = { 
    weapon1: greatSpear,
    weapon2: soulRend,
    armor: fox
  },
  guts = { 
    weapon1: hunkOfIron,
    weapon2: godHand,
    armor: wolf
  }
}

// the ACTIONS to choose from, should probably be BUTTONS that 'CLICK' and run functions to CHOOSE that and store what they want to QUEUE for the next ROUND 
const action = { // Maybe 2 action points a round? Attack/Attack, Attack/Dodge, Attack/Posture
  player: { 
      attack: 0, //player.attackDamage
      dodge: 0, // player.dodge
      posture: 0, //player.physDef 
      roll: function roll(){} //This runs a 100% evasion function in place of dodge. If you choose to roll you ONLY roll? Or maybe something else // Freebie safe measure
  },
  computer:  {
      attack: 0, // Attacks with their weapon(s)
      dodge: 0, // Foregos Defense and banks on Dodging
      posture: 0, // Braces to add dodge as a % use Defense to mitigate damage
  }
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

createCharacterRandom() {
  // Selects Weapon(s)
  // Selects Armor
}

// What are our state variables?

let health = {
   player: 1000;
   computer: 1000;
}
init(); 

init() {
  choose
//Needs to prompt an armor set choice, then weapons choice
//then chooses 1 of 2 computer opponents
//What updates? Turn count, Health Values
//Either will have one option at a time for 'ACTION' round, roll, dodge
//Maybe an action object

playerChoose();

randomEnemy();

render();

}

render();





roll() {
  // This is a function that boosts EVASION to 100% for the next ROUND
}


randomEnemy() { 
  Math.random() < 0.5 ? opponents.dorien: opponents.guts;
}

// The 5 sections to identify are
// What are you Constants?
    - Constants would include setting up an ARMOR class, a WEAPON class, a HEALTH object, a MANA object (This may be iceboxed as Im focusing on other modifiers for magic use rather than limiting it to a pool), OPPONENT (w/ pre-selected equipment)
    - ACTIONS as a constant to showcase what is available to  
// What are your state variables?
    - PLAYER/COMPUTER health, ROLL use and its countdown (TIMEOUT), the EQUIPMENT selection itself, the ACTIONS QUEUED each ROUND
// What queryselectors do you need?
    - QUERY SELECTORS for COMPUTER IMG, PLAYER IMG, WEAPON IMG, ARMOR IMG
// what are your event listeners ?
    - EVENT LISTENERS at the beginning of the game when RENDERING (If someone unfamiliar wishes to assemble a new duel it can randomly allocate equipment, otherwise they'll be prompted to select their WEAPONS and ARMOR), one for START GAME
    - EVENT LISTENERS to store ACTIONS QUEUED and display choices selected to 'confirm' before INITIATE
    - EVENT LISTENERS to INITIATE combat round, running functions to compare ACTIONS between PLAYER and COMPUTER
// what functions do you need ?
    - FUNCTIONS to: augment PLAYER stats with EQUIPMENT Selection, 
    - to MODIFY DAMAGE, DEFENSE, and DODGE when interacting with its own equipment (If (user.Weapon.attackTYpe === 'lightning') {+10% magDam, -10% magRes}))
    - modify results multiple interactions between PLAYER and COMPUTER (Attack vs Dodge Rating) (Attack Damage vs Physical Defense)
    - adjusts PLAYER and COMPUTER HEALTH to new totals at end of combat round before 