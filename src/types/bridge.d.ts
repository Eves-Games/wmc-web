// Generic
interface TownyObject {
  name: string;
  UUID: string;
}

// Resident
interface PartialResident extends TownyObject {
  type: "resident";
  title: string;
  town?: PartialTown;
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
  nation?: PartialNation;
  jailStatus: {
    isJailed: boolean;
    jailHours: number;
    jailBailCost: number;
  };
}

// Town
interface PartialTown extends TownyObject {
  type: "town";
  numResidents: number;
  bannerMeta?: BannerMeta;
}

interface Town extends PartialTown {
  level: number;
  bankAccount: number;
  board: string;
  registered: number;
  founder: string;
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
  trustedResidents: number;
  spawn: {
    x: number;
    y: number;
    z: number;
  };
  townBlocks: {
    name: string;
    type: string;
    isHomeBlock: boolean;
    plotTax: number;
    resident?: PartialResident;
    coordinates: { x: number; z: number };
  }[];
  plotGroups: string[];
  residents: PartialResident[];
  discordLink?: string;
}

// Nation
interface PartialNation extends TownyObject {
  type: "nation";
  bannerMeta?: BannerMeta;
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
  towns: PartialTown[];
  allies: PartialNation[];
  enemies: PartialNation[];
  discordLink?: string;
}

// Banner
interface BannerMeta {
  type: string;
  patterns: {
    pattern: string;
    color: string;
  }[];
}

// Shops
interface Shop {
  name: string;
  id: number;
  town?: PartialTown;
  owner: {
    name: string;
    UUID: string;
  };
  item: string;
  amount: number;
  price: number;
  stock: number;
}

// Paginated
interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
}

export type { PartialResident, Resident, PartialTown, Town, PartialNation, Nation, PaginatedResult, Shop, TownyObject };
