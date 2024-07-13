"use server"

interface PartialResident {
  name: string;
  UUID: string;
  title: string;
}

interface Resident extends PartialResident {
  plotsCount: number;
  about: string;
  registered: number;
  lastOnline: number;
  town?: PartialResidentTown;
}

interface PartialTown {
  name: string;
  UUID: string;
}

interface PartialResidentTown extends PartialTown {
  isMayor: boolean;
}

interface Town extends PartialTown {
  level: number;
  board: string;
  registered: number;
  founder: string;
  townBlocks: number;
  isPublic: boolean;
  isRuined: boolean;
  settings: {
    hasPVP: boolean;
    hasFire: boolean;
    hasMobs: boolean;
    hasExplosions: boolean;
  }
  mayor: PartialResident;
  nation?: {
    name: string;
    UUID: string;
  };
}

export async function getTowns(): Promise<Town[]> {
  const res = await fetch("https://node.worldmc.net:7700/towns", {
    headers: { apiKey: process.env.BRIDGE_KEY! },
  });

  if (!res.ok) throw new Error("Cannot get towns!");

  const data = await res.json();

  return data;
}

export async function getTown(UUID: string): Promise<Town> {
  const res = await fetch(`https://node.worldmc.net:7700/towns/${UUID}`, {
    headers: { apiKey: process.env.BRIDGE_KEY! },
  });

  if (!res.ok) throw new Error("Cannot get town!");

  const data = await res.json();

  return data;
}

export async function createTown(name: string, board: string, mayorUUID: string): Promise<Town> {
  const res = await fetch(`https://node.worldmc.net:7700/towns/create`, {
    method: "POST",
    headers: {
      apiKey: process.env.BRIDGE_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, board, mayorUUID}),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data.error || "Cannot create town!";
    throw new Error(errorMessage);
  }

  return data;
}

export async function getTownResidents(UUID: string): Promise<Resident[]> {
  const res = await fetch(`https://node.worldmc.net:7700/towns/${UUID}/residents`, {
    headers: { apiKey: process.env.BRIDGE_KEY! },
  });

  if (!res.ok) throw new Error("Cannot get town residents!");

  const data = await res.json();

  return data;
}

export async function getResident(UUID: string): Promise<Resident> {
  const res = await fetch(`https://node.worldmc.net:7700/residents/${UUID}`, {
    headers: { apiKey: process.env.BRIDGE_KEY! },
  });

  if (!res.ok) throw new Error("Cannot get resident!");

  const data = await res.json();

  return data;
}

export async function getResidentFriends(UUID: string): Promise<Resident[]> {
  const res = await fetch(`https://node.worldmc.net:7700/residents/${UUID}/friends`, {
    headers: { apiKey: process.env.BRIDGE_KEY! },
  });

  if (!res.ok) throw new Error("Cannot get resident friends!");

  const data = await res.json();

  return data;
}
