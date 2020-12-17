const database = {
  characters: [
    {
      id: 'c0',
      name: 'Chevalier',
      health: 28,
      magic: 12,
      attack: 4,
      defense: 4,
      speed: 2,
      item: {},
      skill: {}
    },
    {
      id: 'c1',
      name: 'Sorcière',
      health: 20,
      magic: 20,
      attack: 4,
      defense: 2,
      speed: 4,
      item: {},
      skill: {}
    },
    {
      id: 'c2',
      name: 'Chasseuse',
      health: 24,
      magic: 16,
      attack: 2,
      defense: 4,
      speed: 4,
      item: {},
      skill: {}
    }
  ],
  enemies: [
    {
      id: 'e0',
      name: 'Loup-Garou',
      health: 28,
      magic: 12,
      attack: 4,
      defense: 4,
      speed: 2,
      item: {},
      skill: {}
    },
    {
      id: 'e1',
      name: 'Liche',
      health: 20,
      magic: 20,
      attack: 4,
      defense: 2,
      speed: 4,
      item: {},
      skill: {}
    },
    {
      id: 'e2',
      name: 'Dragon',
      health: 24,
      magic: 16,
      attack: 2,
      defense: 4,
      speed: 4,
      item: {},
      skill: {}
    }
  ],
  items: [
    {
      id: 'i0',
      name: 'Épée Longue',
      damages: 6
    },
    {
      id: 'i1',
      name: 'Baguette Magique',
      damages: 2
    },
    {
      id: 'i2',
      name: 'Arc Composite',
      damages: 4
    },
    {
      id: 'i3',
      name: 'Griffes Affûtées',
      damages: 6
    },
    {
      id: 'i4',
      name: 'Grimoire Méléfique',
      damages: 2
    },
    {
      id: 'i5',
      name: 'Crocs Acérés',
      damages: 4
    }
  ],
  skills: [
    {
      id: 's0',
      name: 'Frappe Héroïque',
      cost: 6,
      damages: 10
    },
    {
      id: 's1',
      name: 'Éclair De Givre',
      cost: 6,
      damages: 14
    },
    {
      id: 's2',
      name: 'Tir Des Arcanes',
      cost: 6,
      damages: 12
    },
    {
      id: 's3',
      name: 'Eviscération',
      damages: 10
    },
    {
      id: 's4',
      name: 'Corruption',
      damages: 14
    },
    {
      id: 's5',
      name: 'Boule De Feu',
      damages: 12
    }
  ]
}

/* Initialise deux objets vides. */
let currentCharacter = {}
let currentEnemy = {}

/* Ces fonctions permettent de retourner des copies de tableaux d'objets appartenants à l'objet database. */
const getCharacters = () => {
  return [...database.characters]
}

const getEnemies = () => {
  return [...database.enemies]
}

/* Ces fonctions permettent de retourner des copies d'objets issus des tableaux d'objets appartenants à l'objet
database en fonction d'un nom passé en paramètre. */
const getCharacterByName = (name) => {
  return { ...database.characters.find(c => c.name === name) }
}

const getEnemyByName = (name) => {
  return { ...database.enemies.find(e => e.name === name) }
}

const getItemByName = (name) => {
  return { ...database.items.find(i => i.name === name) }
}

const getSkillByName = (name) => {
  return { ...database.skills.find(s => s.name === name) }
}

/* Ces fonctions permettent de retourner des copies des objets currentCharacter et currentEnemy. */
const getCurrentCharacter = () => {
  return { ...currentCharacter }
}

const getCurrentEnemy = () => {
  return { ...currentEnemy }
}

/* Ces fonctions permettent de modifier les attributs item et skill des objets currentCharacter et currentEnemy en
fonction du nom passé en paramètre. */
const setCurrentCharacterItem = (name) => {
  currentCharacter.item = getItemByName(name)
}

const setCurrentCharacterSkill = (name) => {
  currentCharacter.skill = getSkillByName(name)
}

const setCurrentEnemyItem = (name) => {
  currentEnemy.item = getItemByName(name)
}

const setCurrentEnemySkill = (name) => {
  currentEnemy.skill = getSkillByName(name)
}

/* Modifie l'attribut health des objets currentCharacter et currentEnnemy en fonction du paramètre passé. */
const setCurrentCharacterHealth = (health) => {
  currentCharacter.health = health
}

const setCurrentEnemyHealth = (health) => {
  currentEnemy.health = health
}

/* Modifie l'attribut magic des objets currentCharacter et currentEnnemy en fonction du paramètre passé. */
const setCurrentCharacterMagic = (magic) => {
  currentCharacter.magic = magic
}

const setCurrentEnemyMagic = (magic) => {
  currentEnemy.magic = magic
}

const currentCharacterAttackCurrentEnemy = () => {
  let choice
  let damages = 0

  /* Propose au joueur de choisir un objet character de l'attribut characters de l'objet database en fonction du nom
  passé dans le prompt. Si le nom passé n'appartient à aucun des éléments du tableau d'objets characters de l'objet
  database, alors le prompt se relance. */
  do {
    do {
      choice = prompt(`
        Vous avez ${ getCurrentCharacter().health } points de vie et ${ getCurrentCharacter().magic } points de
        magie.
        \n
        Que souhaitez-vous faire ?
        \n
        Entrez '1' pour attaquer avec votre arme ${ getCurrentCharacter().item.name },
        \r
        ou '2' pour attaquer avec votre compétence ${ getCurrentCharacter().skill.name }.
      `)
      if (choice === '2' && getCurrentCharacter().magic < getCurrentCharacter().skill.cost) {
        alert(`
          Vous n'avez pas assez de points de magie!
        `)
      }
    } while (choice === '2' && getCurrentCharacter().magic < getCurrentCharacter().skill.cost)
  } while (choice !== '1' && choice !== '2')

  /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut attack de l'objet
  currentCharacter. */
  const attackScore = Math.floor(Math.random() * getCurrentCharacter().attack + 1)
  /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut defense de l'objet
  currentEnemy. */
  const defenseScore = Math.floor(Math.random() * getCurrentEnemy().defense + 1)

  switch (choice) {
    case '1':
      /* Initialise une variable qui va accueillir une nombre aléatoire entre la moitié de l'attribut damages de
      l'objet item et l'attribut damages de l'objet item de l'objet currentCharacter. */
      const minItemScore = Math.ceil(getCurrentCharacter().item.damages / 2)
      const maxItemScore = getCurrentCharacter().item.damages

      /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut damages de l'objet
      item de l'objet currentCharacter. */
      const itemScore = Math.floor(Math.random() * (maxItemScore - minItemScore) + minItemScore)
      damages = attackScore + itemScore - defenseScore

      /* Modifie dynamiquement l'attribut health de l'objet currentEnemy en fonction des différents nombres
      aléatoires précédemment tirés. */
      damages > 0
        ? setCurrentEnemyHealth(getCurrentEnemy().health - damages)
        : damages = 0

      /* Assigne 0 à l'attribut health de l'objet currentEnemy si l'attribut health de l'objet currentEnnemy était
      supposé inférer 0. */
      if (getCurrentEnemy().health < 0) {
        setCurrentEnemyHealth(0)
      }

      alert(`
        Vous attaquez avec ${ getCurrentCharacter().item.name } !
        \n
        Vous infligez ${ damages } dégâts à ${ getCurrentEnemy().name } !
        \n
        ${ getCurrentEnemy().name } n'a plus que ${ getCurrentEnemy().health } points de vie !
      `)
      break
    case '2':
      /* Initialise une variable qui va accueillir une nombre aléatoire entre la moitié de l'attribut damages de
      l'objet skill et l'attribut damages de l'objet skill de l'objet currentCharacter. */
      const minSkillScore = Math.ceil(getCurrentCharacter().skill.damages / 2)
      const maxSkillScore = getCurrentCharacter().skill.damages

      /* Modifie dynamiquement l'attribut magic de l'objet currentCharacter en fonction de l'attribut cost de l'objet
      skill de l'objet currentCharacter. */
      setCurrentCharacterMagic(getCurrentCharacter().magic - getCurrentCharacter().skill.cost)

      /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut damages de l'objet
      skill de l'objet currentCharacter. */
      const skillScore = Math.floor(Math.random() * (maxSkillScore - minSkillScore) + minSkillScore)
      damages = attackScore + skillScore - defenseScore

      /* Modifie dynamiquement l'attribut health de l'objet currentCharacter en fonction des différents nombres
      aléatoires précédemment tirés. */
      damages > 0
        ? setCurrentEnemyHealth(getCurrentEnemy().health - damages)
        : damages = 0

      /* Assigne 0 à l'attribut health de l'objet currentEnemy si l'attribut health de l'objet currentEnnemy était
      supposé inférer 0. */
      if (getCurrentEnemy().health < 0) {
        setCurrentEnemyHealth(0)
      }

      alert(`
        Vous attaquez avec ${ getCurrentCharacter().skill.name } !
        \n
        Vous infligez ${ damages } dégâts à ${ getCurrentEnemy().name } !
        \n
        ${ getCurrentEnemy().name } n'a plus que ${ getCurrentEnemy().health } points de vie !
      `)
      break
  }
}

const currentEnemyAttackCurrentCharacter = () => {
  let choice
  let damages = 0

  /* Propose au joueur de choisir un objet character de l'attribut characters de l'objet database en fonction du nom
  passé dans le prompt. Si le nom passé n'appartient à aucun des éléments du tableau d'objets characters de l'objet
  database, alors le prompt se relance. */
  if (getCurrentEnemy().magic < getCurrentEnemy().skill.cost) {
    choice = 1
  } else {
    choice = Math.floor(Math.random() * 2 + 1).toString()
  }

  /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut attack de l'objet
  currentEnemy. */
  const attackScore = Math.floor(Math.random() * getCurrentEnemy().attack + 1)
  /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut defense de l'objet
  currentEnemy. */
  const defenseScore = Math.floor(Math.random() * getCurrentCharacter().defense + 1)

  switch (choice) {
    case '1':
      /* Initialise une variable qui va accueillir une nombre aléatoire entre la moitié de l'attribut damages de
      l'objet item et l'attribut damages de l'objet item de l'objet currentEnemy. */
      const minItemScore = Math.ceil(getCurrentEnemy().item.damages / 2)
      const maxItemScore = getCurrentEnemy().item.damages

      /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut damages de l'objet
      item de l'objet currentEnemy. */
      const itemScore = Math.floor(Math.random() * (maxItemScore - minItemScore) + minItemScore)
      damages = attackScore + itemScore - defenseScore

      /* Modifie dynamiquement l'attribut health de l'objet currentCharacter en fonction des différents nombres
      aléatoires précédemment tirés. */
      damages > 0
        ? setCurrentCharacterHealth(getCurrentCharacter().health - damages)
        : damages = 0

      /* Assigne 0 à l'attribut health de l'objet currentCharacter si l'attribut health de l'objet currentCharacter
      était supposé inférer 0. */
      if (getCurrentEnemy().health < 0) {
        setCurrentEnemyHealth(0)
      }
      alert(`
        ${ getCurrentEnemy().name } vous attaque avec ${ getCurrentEnemy().item.name } !
        \n
        ${ getCurrentEnemy().name } vous inflige ${ damages } dégâts !
        \n
        Vous n'avez plus que ${ getCurrentCharacter().health } points de vie !
      `)
      break
    case '2':
      /* Initialise une variable qui va accueillir une nombre aléatoire entre la moitié de l'attribut damages de
      l'objet skill et l'attribut damages de l'objet skill de l'objet currentEnemy. */
      const minSkillScore = Math.ceil(getCurrentEnemy().skill.damages / 2)
      const maxSkillScore = getCurrentEnemy().skill.damages

      /* Modifie dynamiquement l'attribut magic de l'objet currentEnemy en fonction de l'attribut cost de l'objet
      skill de l'objet currentEnemy. */
      setCurrentEnemyMagic(getCurrentEnemy().magic - getCurrentEnemy().skill.cost)

      /* Initialise une variable qui va accueillir une nombre aléatoire entre 1 et l'attribut damages de l'objet
      skill de l'objet currentEnemy. */
      const skillScore = Math.floor(Math.random() * (maxSkillScore - minSkillScore) + minSkillScore)
      damages = attackScore + skillScore - defenseScore

      /* Modifie dynamiquement l'attribut health de l'objet currentCharacter en fonction des différents nombres
      aléatoires précédemment tirés. */
      damages > 0
        ? setCurrentCharacterHealth(getCurrentCharacter().health - damages)
        : damages = 0

      /* Assigne 0 à l'attribut health de l'objet currentCharacter si l'attribut health de l'objet currentCharacter
      était supposé inférer 0. */
      if (getCurrentCharacter().health < 0) {
        setCurrentCharacterHealth(0)
      }
      alert(`
        ${ getCurrentEnemy().name } vous attaque avec ${ getCurrentEnemy().skill.name } !
        \n
        ${ getCurrentEnemy().name } vous inflige ${ damages } dégâts !
        \n
        Vous n'avez plus que ${ getCurrentCharacter().health } points de vie !
      `)
  }
}

const newRound = () => {
  const currentCharacterSpeedScore = Math.floor(Math.random() * getCurrentCharacter().speed + 1)
  const currentEnemySpeedScore = Math.floor(Math.random() * getCurrentEnemy().speed + 1)
  do {
    if (currentCharacterSpeedScore > currentEnemySpeedScore) {
      currentCharacterAttackCurrentEnemy()
      if (getCurrentEnemy().health > 0) {
        currentEnemyAttackCurrentCharacter()
      } else {
        alert(`
          Vous avez vaincu ${ getCurrentEnemy().name } !
        `)
        runNewGame()
      }
    } else {
      currentEnemyAttackCurrentCharacter()
      if (getCurrentCharacter().health > 0) {
        currentCharacterAttackCurrentEnemy()
      } else {
        alert(`
          ${ getCurrentEnemy().name } vous a vaincu !
        `)
        runNewGame()
      }
    }
  } while (getCurrentCharacter().health > 0 && getCurrentEnemy().health > 0)
}

const runNewGame = () => {
  let choice = ''
  let charactersNames = []
  let enemiesNames = []

  /* Pour chaque élément présent dans le tableau d'objet character, le nom de chacun de ces objets est poussé dans le
  tableau characterNames. */
  getCharacters().forEach(c => {
    charactersNames.push(c.name)
  })

  /* Pour chaque élément présent dans le tableau d'objet enemy, le nom de chacun de ces objets est poussé dans le
  tableau enemiesNames. */
  getEnemies().forEach(e => {
    enemiesNames.push(e.name)
  })

  /* Propose au joueur de choisir un objet character de l'attribut characters de l'objet database en fonction du nom
  passé dans le prompt. Si le nom passé n'appartient à aucun des éléments du tableau d'objets characters de l'objet
  database, alors le prompt se relance. */
  do {
    choice = prompt(`
      Salutations ! Quel personnage souhaitez-vous jouer ?
      \n
      Entrez 'Chevalier' pour jouer un Chevalier,
      \r
      'Sorcière' pour jouer une Sorcière,
      \r
      ou 'Chasseuse' pour jouer une Chasseuse.
      \n
      (Attention à bien mettre la majuscule !)
    `)
    currentCharacter = getCharacterByName(choice)
  } while (!charactersNames.includes(choice))

  /* En fonction du nom de l'objet currentCharacter, ses attributs item et skill sont réassignés. */
  switch (getCurrentCharacter().name) {
    case 'Chevalier':
      setCurrentCharacterItem('Épée Longue')
      setCurrentCharacterSkill('Frappe Héroïque')
      break
    case 'Sorcière':
      setCurrentCharacterItem('Baguette Magique')
      setCurrentCharacterSkill('Éclair De Givre')
      break
    case 'Chasseuse':
      setCurrentCharacterItem('Arc Composite')
      setCurrentCharacterSkill('Tir Des Arcanes')
      break
  }

  /* Propose au joueur de choisir un objet enemy de l'attribut enemies de l'objet database en fonction du nom
  passé dans le prompt. Si le nom passé n'appartient à aucun des éléments du tableau d'objets characters de l'objet
  database, alors le prompt se relance. */
  do {
    choice = prompt(`
      Quel adversaire souhaitez-vous affronter ?
      \n
      Entrez 'Loup-Garou' pour affronter un Loup-Garou,
      \r
      'Liche' pour affronter une Liche,
      \r
      ou 'Dragon' pour affronter une Dragon.
      \n
      (Attention à bien mettre la majuscule !)
    `)
    currentEnemy = getEnemyByName(choice)
  } while (!enemiesNames.includes(choice))

  /* En fonction du nom de l'objet currentEnemy, ses attributs item et skill sont réassignés. */
  switch (getCurrentEnemy().name) {
    case 'Loup-Garou':
      setCurrentEnemyItem('Griffes Affûtées')
      setCurrentEnemySkill('Eviscération')
      break
    case 'Liche':
      setCurrentEnemyItem('Grimoire Méléfique')
      setCurrentEnemySkill('Corruption')
      break
    case 'Dragon':
      setCurrentEnemyItem('Crocs Acérés')
      setCurrentEnemySkill('Boule De Feu')
      break
  }

  newRound()
}

runNewGame()
