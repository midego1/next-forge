import { getFlags } from "@repo/feature-flags/access";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{}> }
) {
  return getFlags(request);
}
