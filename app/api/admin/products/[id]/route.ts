import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteProduct, getProductById, updateProduct } from "@/lib/repository";
import { requireApiAuth } from "@/lib/auth";
import { productSchema } from "@/lib/validation";
import { deleteFromStorage } from "@/lib/supabase";

type Context={params:Promise<{id:string}>};

export async function PATCH(request:Request,{params}:Context){
  const unauthorized=await requireApiAuth();if(unauthorized)return unauthorized;
  const {id}=await params;const current=await getProductById(id);
  if(!current)return NextResponse.json({error:"Produto não encontrado."},{status:404});
  const body=await request.json().catch(()=>null);
  const parsed=productSchema.partial().safeParse(body);
  if(!parsed.success)return NextResponse.json({error:"Revise os dados informados."},{status:400});
  const next={...parsed.data} as Partial<typeof current>;
  if(next.stock===0)next.hidden=true;
  try{const product=await updateProduct(id,next);const removed=current.images.filter(url=>!product.images.includes(url));await Promise.allSettled(removed.map(deleteFromStorage));revalidatePath("/");revalidatePath("/celulares");revalidatePath(`/celulares/${current.slug}`);return NextResponse.json(product)}
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Não foi possível atualizar."},{status:500})}
}

export async function DELETE(_:Request,{params}:Context){
  const unauthorized=await requireApiAuth();if(unauthorized)return unauthorized;
  const {id}=await params;
  try{const current=await getProductById(id);await deleteProduct(id);if(current)await Promise.allSettled(current.images.map(deleteFromStorage));revalidatePath("/");revalidatePath("/celulares");return NextResponse.json({ok:true})}
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Não foi possível excluir."},{status:500})}
}
