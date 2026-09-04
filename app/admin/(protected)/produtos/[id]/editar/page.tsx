import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById } from "@/lib/repository";

export default async function EditProductPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const product=await getProductById(id);if(!product)notFound();return <ProductForm product={product}/>}
