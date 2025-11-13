/* types */
import type { IPlayerClasses } from "../types";

import { ClassImages } from './imageImports';

export const warriorClasses: IPlayerClasses = {
  name: "Warrior",
  spec: [
    {
      name: "Arms",
      image: ClassImages.Warrior.Arms,
    },
    {
      name: "Prot",
      image: ClassImages.Warrior.Prot,
    },
    {
      name: "fury",
      image: ClassImages.Warrior.Fury,
    },
  ],
};
export const mageClasses: IPlayerClasses = {
  name: "Mage",
  spec: [
    {
      name: "Arcane",
      image: ClassImages.Mage.Arcane,
    },
    {
      name: "Fire",
      image: ClassImages.Mage.Fire,
    },
    {
      name: "Frost",
      image: ClassImages.Mage.Frost,
    },
  ],
};
export const rogueClasses: IPlayerClasses = {
  name: "Rogue",
  spec: [
    {
      name: "Assassination",
      image: ClassImages.Rogue.Assassination,
    },
    {
      name: "Outlaw",
      image: ClassImages.Rogue.Combat,
    },
    {
      name: "Subtlety",
      image: ClassImages.Rogue.Subtlety,
    },
  ],
};
export const priestClasses: IPlayerClasses = {
  name: "Priest",
  spec: [
    {
      name: "Discipline",
      image: ClassImages.Priest.Discipline,
    },
    {
      name: "Holy",
      image: ClassImages.Priest.Holy,
    },
    {
      name: "Shadow",
      image: ClassImages.Priest.Shadow,
    },
  ],
};
export const hunterClasses: IPlayerClasses = {
  name: "Hunter",
  spec: [
    {
      name: "Beast Mastery",
      image: ClassImages.Hunter.BeastMastery,
    },
    {
      name: "Marksmanship",
      image: ClassImages.Hunter.Marksmanship,
    },
    {
      name: "Survival",
      image: ClassImages.Hunter.Survival,
    },
  ],
};
export const shamanClasses: IPlayerClasses = {
  name: "Shaman",
  spec: [
    {
      name: "Elemental",
      image: ClassImages.Shaman.Elemental,
    },
    {
      name: "Enhancement",
      image: ClassImages.Shaman.Enhancement,
    },
    {
      name: "Restoration",
      image: ClassImages.Shaman.Restoration,
    },
  ],
};
export const paladinClasses: IPlayerClasses = {
  name: "Paladin",
  spec: [
    {
      name: "Holy",
      image: ClassImages.Paladin.Holy,
    },
    {
      name: "Protection",
      image: ClassImages.Paladin.Protection,
    },
    {
      name: "Retribution",
      image: ClassImages.Paladin.Retribution,
    },
  ],
};
export const warlockClasses: IPlayerClasses = {
  name: "Warlock",
  spec: [
    {
      name: "Affliction",
      image: ClassImages.Warlock.Affliction,
    },
    {
      name: "Demonology",
      image: ClassImages.Warlock.Demonology,
    },
    {
      name: "Destruction",
      image: ClassImages.Warlock.Destruction,
    },
  ],
};
export const druidClasses: IPlayerClasses = {
  name: "Druid",
  spec: [
    {
      name: "Balance",
      image: ClassImages.Druid.Balance,
    },
    {
      name: "Feral",
      image: ClassImages.Druid.Feral,
    },
    {
      name: "Restoration",
      image: ClassImages.Druid.Restoration,
    },
  ],
};
