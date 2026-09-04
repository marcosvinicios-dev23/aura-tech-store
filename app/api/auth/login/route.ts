import { NextResponse } from "next/server";
import { z } from "zod";
import { createSession, verifyCredentials } from "@/lib/auth";

const schema = z.object({ email: z.string().trim().min(3).max(200), password: z.string().min(1).max(200) });
const attempts = new Map<string,{count:number;until:number}>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const current = attempts.get(ip);
  if (current && current.count >= 5 && current.until > Date.now()) return NextResponse.json({error:"Muitas tentativas. Aguarde alguns minutos."},{status:429});
  const parsed = schema.safeParse(await request.json().catch(()=>null));
  if (!parsed.success || !verifyCredentials(parsed.data.email, parsed.data.password)) {
    attempts.set(ip,{count:(current?.count||0)+1,until:Date.now()+10*60*1000});
    await new Promise(resolve=>setTimeout(resolve,350));
    return NextResponse.json({error:"E-mail ou senha inválidos."},{status:401});
  }
  attempts.delete(ip); await createSession(parsed.data.email);
  return NextResponse.json({ok:true});
}
