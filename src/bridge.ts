"use server";

import { getEnvironment } from "./environment";
import type { PartialResident, PartialTown, Resident, Town, PartialNation, Nation, PaginatedResult } from "@/types/bridge";

const API_BASE_URL = getEnvironment() === "development" ? "https://towny.worldmc.net/dev" : "https://towny.worldmc.net";

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, { ...options });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Bridge request failed: ${response.statusText}`);
  }

  return response.json();
}

// Nations
export async function getNations(page: number = 1, search?: string): Promise<PaginatedResult<PartialNation>> {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  return apiRequest<PaginatedResult<PartialNation>>(`/nations?page=${page}${searchParam}`);
}

export async function getNation(UUID: string): Promise<Nation> {
  return apiRequest<Nation>(`/nations/${UUID}`);
}

// Towns
export async function getTowns(page: number = 1): Promise<PaginatedResult<PartialTown>> {
  return apiRequest<PaginatedResult<PartialTown>>(`/towns?page=${page}`);
}

export async function getTown(UUID: string): Promise<Town> {
  return apiRequest<Town>(`/towns/${UUID}`);
}

// Residents
export async function getResidents(page: number = 1): Promise<PaginatedResult<PartialResident>> {
  return apiRequest<PaginatedResult<PartialResident>>(`/residents?page=${page}`);
}

export async function getResident(UUID: string): Promise<Resident> {
  return apiRequest<Resident>(`/residents/${UUID}`);
}
