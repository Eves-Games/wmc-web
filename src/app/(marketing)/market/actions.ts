"use server";

import { getShops } from "@/bridge";

export async function fetchShops(page: number, material: string) {
  return await getShops(page, material);
}
