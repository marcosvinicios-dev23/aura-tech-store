import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";
import { uploadToStorage } from "@/lib/supabase";

const allowed=new Set(["image/jpeg","image/png","image/webp"]);
export async function POST(request:Request){
  const unauthorized=await requireApiAuth();if(unauthorized)return unauthorized;
  const form=await request.formData();const files=form.getAll("files").filter((item):item is File=>item instanceof File);
  if(!files.length||files.length>12)return NextResponse.json({error:"Selecione de 1 a 12 imagens."},{status:400});
  if(files.some(file=>!allowed.has(file.type)||file.size>8*1024*1024))return NextResponse.json({error:"Use JPG, PNG ou WebP com até 8 MB por foto."},{status:400});
  try{const urls=[];for(const file of files){const ext=file.type.split("/")[1].replace("jpeg","jpg");urls.push(await uploadToStorage(file,`techcell/${crypto.randomUUID()}.${ext}`))}return NextResponse.json({urls})}
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Falha no envio."},{status:500})}
}
