/* types */
import type { IPlayerClass } from "../types";

export const warriorClass: IPlayerClass = {
  name: "Warrior",
  spec: [
    {
      name: "Arms",
      image: "./src/assets/Warrior_Arms.PNG",
    },
    {
      name: "Prot",
      image: "./src/assets/Warrior_Prot.PNG",
    },
    {
      name: "fury",
      image: "./src/assets/Warrior_Fury.PNG",
    },
  ],
};
export const mageClass: IPlayerClass = {
  name: "Mage",
  spec: [
    {
      name: "Arcane",
      image: "./src/assets/Mage_Arcane.PNG",
    },
    {
      name: "Fire",
      image: "./src/assets/Mage_Fire.PNG",
    },
    {
      name: "Frost",
      image: "./src/assets/Mage_Frost.PNG",
    },
  ],
};
export const rogueClass: IPlayerClass = {
  name: "Rogue",
  spec: [
    {
      name: "Assassination",
      image: "./src/assets/Rogue_Assassination.PNG",
    },
    {
      name: "Outlaw",
      image: "./src/assets/Rogue_Combat.PNG",
    },
    {
      name: "Subtlety",
      image: "./src/assets/Rogue_Subtlety.PNG",
    },
  ],
};
export const priestClass: IPlayerClass = {
  name: "Priest",
  spec: [
    {
      name: "Discipline",
      image: "./src/assets/Priest_Discipline.PNG",
    },
    {
      name: "Holy",
      image: "./src/assets/Priest_Holy.PNG",
    },
    {
      name: "Shadow",
      image: "./src/assets/Priest_Shadow.PNG",
    },
  ],
};
export const hunterClass: IPlayerClass = {
  name: "Hunter",
  spec: [
    {
      name: "Beast Mastery",
      image: "./src/assets/Hunter_BM.PNG",
    },
    {
      name: "Marksmanship",
      image: "./src/assets/Hunter_MM.PNG",
    },
    {
      name: "Survival",
      image: "./src/assets/Hunter_Survival.PNG",
    },
  ],
};
export const shamanClass: IPlayerClass = {
  name: "Shaman",
  spec: [
    {
      name: "Elemental",
      image: "./src/assets/Shaman_Elemental.PNG",
    },
    {
      name: "Enhancement",
      image: "./src/assets/Shaman_Enha.PNG",
    },
    {
      name: "Restoration",
      image: "./src/assets/Shaman_Resto.PNG",
    },
  ],
};
export const paladinClass: IPlayerClass = {
  name: "Paladin",
  spec: [
    {
      name: "Holy",
      image: "./src/assets/Paladin_Holy.PNG",
    },
    {
      name: "Protection",
      image: "./src/assets/Paladin_Prot.PNG",
    },
    {
      name: "Retribution",
      image: "./src/assets/Paladin_Retri.PNG",
    },
  ],
};
export const warlockClass: IPlayerClass = {
  name: "Warlock",
  spec: [
    {
      name: "Affliction",
      image: "./src/assets/Warlock_Affliction.PNG",
    },
    {
      name: "Demonology",
      image: "./src/assets/Warlock_Demonology.PNG",
    },
    {
      name: "Destruction",
      image: "./src/assets/Warlock_Destruction.PNG",
    },
  ],
};
export const druidClass: IPlayerClass = {
  name: "Druid",
  spec: [
    {
      name: "Balance",
      image: "./src/assets/Druid_Balance.PNG",
    },
    {
      name: "Feral",
      image: "./src/assets/Druid_Feral.PNG",
    },
    {
      name: "Restoration",
      image: "./src/assets/Druid_Resto.PNG",
    },
  ],
};
