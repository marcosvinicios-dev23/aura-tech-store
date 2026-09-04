import { ProductsManager } from "@/components/admin/products-manager";
import { getProducts } from "@/lib/repository";

export default async function ProductsPage(){return <ProductsManager initialProducts={await getProducts({admin:true})}/>}
