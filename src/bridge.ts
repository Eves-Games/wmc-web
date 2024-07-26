"use server"

import { getEnvironment } from "./environment";

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

function getApiUrl(): string {
  const env = getEnvironment();
  if (env === 'development') {
    return 'https://towny.worldmc.net/dev';
  }
  return 'https://towny.worldmc.net';
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const baseUrl = getApiUrl();
  const fullUrl = `${baseUrl}${url}`;
  
  const headers = new Headers(options.headers);
  headers.set('apiKey', process.env.BRIDGE_KEY!);

  return fetch(fullUrl, { ...options, headers });
}

export async function getTowns(): Promise<Town[]> {
  const res = await fetchWithAuth("/towns");

  if (!res.ok) throw new Error("Cannot get towns!");

  return res.json();
}

export async function getTown(UUID: string): Promise<Town> {
  const res = await fetchWithAuth(`/towns/${UUID}`)

  if (!res.ok) throw new Error("Cannot get town!");

  const data = await res.json();

  return data;
}

export async function createTown(name: string, board: string, mayorUUID: string): Promise<Town> {
  const res = await fetchWithAuth(`/towns/create`, {
    method: "POST",
    headers: {
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
  const res = await fetchWithAuth(`/towns/${UUID}/residents`)

  if (!res.ok) throw new Error("Cannot get town residents!");

  const data = await res.json();

  return data;
}

export async function getResident(UUID: string): Promise<Resident> {
  const res = await fetchWithAuth(`/residents/${UUID}`)

  if (!res.ok) throw new Error("Cannot get resident!");

  const data = await res.json();

  return data;
}

export async function getResidentFriends(UUID: string): Promise<Resident[]> {
  const res = await fetchWithAuth(`/residents/${UUID}/friends`);

  if (!res.ok) throw new Error("Cannot get resident friends!");

  return res.json();
}