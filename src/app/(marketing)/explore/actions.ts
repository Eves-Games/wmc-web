"use server";

import { getNations, getResidents, getTowns } from "@/bridge";

export async function fetchTownyObjects(page: number, query: string, type: string) {
  let data;

  switch (type) {
    case "residents":
      data = await getResidents(page, query);
      break;
    case "towns":
      data = await getTowns(page, query);
      break;
    case "nations":
      data = await getNations(page, query);
      break;
  }

  return data;
}
