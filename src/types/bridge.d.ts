// Resident definitions
interface PartialResident {
  name: string;
  UUID: string;
  title: string;
}

interface Resident extends PartialResident {
  surname: string;
  formattedName: string;
  formattedTitleName: string;
  plotsCount: number;
  bankAccount: number;
  about: string;
  registered: number;
  lastOnline: number;
  isNPC: boolean;
  isOnline: boolean;
  isMayor: boolean;
  isKing: boolean;
  isAdmin: boolean;
  joinedTownAt: number;
  permissions: {
    pvp: boolean;
    fire: boolean;
    explosion: boolean;
    mobs: boolean;
  };
  modes: string[];
  townRanks: string[];
  nationRanks: string[];
  friends: PartialResident[];
  town?: PartialTown;
  nation?: PartialNation;
  jailStatus: {
    isJailed: boolean;
    jailHours: number;
    jailBailCost: number;
  };
}

// Town definitions
interface PartialTown {
  name: string;
  UUID: string;
}

interface Town extends PartialTown {
  level: number;
  bankAccount: number;
  board: string;
  registered: number;
  founder: string;
  townBlocks: number;
  isPublic: boolean;
  isNeutral: boolean;
  isOpen: boolean;
  settings: {
    pvp: boolean;
    fire: boolean;
    mobs: boolean;
    explosions: boolean;
    taxpercent: boolean;
  };
  mayor: PartialResident;
  nation?: PartialNation;
  residents: number;
  trustedResidents: number;
  spawn: {
    x: number;
    y: number;
    z: number;
  };
  plotGroups: string[];
}

// Nation definitions
interface PartialNation {
  name: string;
  UUID: string;
}

interface Nation extends PartialNation {
  level: number;
  bankAccount: number;
  board: string;
  registered: number;
  numResidents: number;
  numTowns: number;
  numTownblocks: number;
  nationZoneSize: number;
  isPublic: boolean;
  isOpen: boolean;
  settings: {
    isTaxPercentage: boolean;
    taxes: number;
    maxPercentTaxAmount: number;
    conqueredTax: number;
  };
  king: PartialResident;
  capital: PartialTown;
  spawn: {
    x: number;
    y: number;
    z: number;
  };
}

// Invite definitions
interface NationAllyNationInvite {
  sender: PartialNation;
  receiver: PartialNation;
}

interface PlayerJoinTownInvite {
  sender: PartialTown;
  receiver: PartialResident;
}

interface TownJoinNationInvite {
  sender: PartialNation;
  receiver: PartialTown;
}

// Paginated
interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
}

export type {
  PartialResident,
  Resident,
  PartialTown,
  Town,
  PartialNation,
  Nation,
  NationAllyNationInvite,
  PlayerJoinTownInvite,
  TownJoinNationInvite,
  PaginatedResult,
};
