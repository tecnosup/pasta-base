import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("base_admin_session")?.value;
  if (!session) return NextResponse.json({ error: "Sem sessão" }, { status: 401 });

  try {
    await adminAuth.verifySessionCookie(session, true);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
  }
}
