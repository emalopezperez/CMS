import TableProducts from "@/components/table/TableProducts";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

export const getProducts = async () => {
  const url_Local = "http://localhost:3000/api/"
  const enpoint = "list_products";
  const apiUrl = "http://localhost:3000/api/list_products";

  try {
    const res = await fetch(apiUrl, { cache: "no-store", });
    const response = await res.json();

    return response.items

  } catch (error) {
    console.log(error);
  }
}

const pages = [
  { name: 'Productos', href: '/admin/dashboard/products', current: false },
]

const Products = async () => {
  const data = await getProducts();
  const urlCreate = "/admin/dashboard/products/create-products"
  
  return (
    <div>
      <Breadcrumbs pages={ pages } />
      <TableProducts data={ data } title={ "Lista de productos" } rutaCreate={ urlCreate } tableProduct={ true } />
    </div>
  )
}

export default Products