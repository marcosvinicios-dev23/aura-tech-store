import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCompany, updateCompany } from "@/lib/repository";
import { requireApiAuth } from "@/lib/auth";
import { companySchema } from "@/lib/validation";
import { deleteFromStorage } from "@/lib/supabase";

export async function GET(){const unauthorized=await requireApiAuth();if(unauthorized)return unauthorized;return NextResponse.json(await getCompany())}
export async function PATCH(request:Request){
  const unauthorized=await requireApiAuth();if(unauthorized)return unauthorized;
  const parsed=companySchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success)return NextResponse.json({error:"Revise as informações da empresa."},{status:400});
  try{
    const previous=await getCompany();
    const company=await updateCompany(parsed.data);
    const replaced=[previous.logo_url,previous.banner_url].filter((url):url is string=>Boolean(url)&&url!==company.logo_url&&url!==company.banner_url);
    await Promise.allSettled(replaced.map(deleteFromStorage));
    revalidatePath("/", "layout");
    return NextResponse.json(company);
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Não foi possível salvar."},{status:500})}
}
