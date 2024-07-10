import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getBaseUrl } from "@/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const { username } = params;
  const code = searchParams.get("mcauth_code");

  if (code) {
    try {
      const response = await axios.post(
        `https://api.minecraft.id/gateway/verify/${username}`,
        {
          code,
        },
      );

      const { valid, uuid } = response.data;
      if (valid) {
        const formattedUuid = formatUuid(uuid);
        const token = jwt.sign({ username, uuid: formattedUuid }, process.env.JWT_SECRET!);
        cookies().set("accessToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60,
          sameSite: "strict",
        });
        const callbackUrl = `https://worldmc.net/callback?status=VERIFIED`;
        return NextResponse.redirect(callbackUrl);
      } else {
        const callbackUrl = `https://worldmc.net/callback?status=NOT_VERIFIED`;
        return NextResponse.redirect(callbackUrl);
      }
    } catch (error) {
      console.error("Failed to verify authentication:", error);
      const callbackUrl = `https://worldmc.net/callback?status=ERROR`;
      return NextResponse.redirect(callbackUrl);
    }
  } else {
    const callbackUrl = `https://worldmc.net/callback?status=ERROR`;
    return NextResponse.redirect(callbackUrl);
  }
}

function formatUuid(uuid: string): string {
  const regex = /^([0-9a-fA-F]{8})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{12})$/;
  return uuid.replace(regex, "$1-$2-$3-$4-$5");
}