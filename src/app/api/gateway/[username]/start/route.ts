import { getBaseUrl } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const { username } = params;

  const callback = `https://worldmc.net/api/gateway/${username}/verify`;
  const style = "simple";

  const redirectUrl = `https://api.minecraft.id/gateway/start/${username}?callback=${encodeURIComponent(callback)}&style=${style}`;
  return NextResponse.redirect(redirectUrl);
}
