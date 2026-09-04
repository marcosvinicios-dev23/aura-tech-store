import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createProduct, getProducts } from "@/lib/repository";
import { requireApiAuth } from "@/lib/auth";
import { productSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export async function GET() {
  const unauthorized = await requireApiAuth(); if (unauthorized) return unauthorized;
  return NextResponse.json(await getProducts({admin:true}));
}

export async function POST(request: Request) {
  const unauthorized = await requireApiAuth(); if (unauthorized) return unauthorized;
  const body = await request.json().catch(()=>null);
  const parsed = productSchema.safeParse({...body,slug:body?.slug||slugify(`${body?.model||""}-${body?.storage||""}`)});
  if (!parsed.success) return NextResponse.json({error:"Revise os campos obrigatórios.",details:parsed.error.flatten()},{status:400});
  const input = {...parsed.data,hidden:parsed.data.stock===0?true:parsed.data.hidden,battery_health:parsed.data.condition==="Novo"?100:(parsed.data.battery_health??null)};
  try { const product=await createProduct(input); revalidatePath("/");revalidatePath("/celulares");return NextResponse.json(product,{status:201}); }
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Não foi possível publicar."},{status:500})}
}
