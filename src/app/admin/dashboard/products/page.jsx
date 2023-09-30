import Table from "@/components/table/Table";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";


export const getPosts = async () => {
  const apiUrl = "https://backend-blog-tau.vercel.app/api/articles";
  const res = await fetch(apiUrl, { cache: "no-store", });

  const respuesta = await res.json();
  return respuesta.items;
};


const pages = [
  { name: 'Productos', href: '/admin/dashboard/products', current: false },
]


const Products = async () => {
  const data = await getPosts();
  const urlCreate = "/admin/dashboard/products/create-products"

  return (
    <div>
      <Breadcrumbs pages={ pages } />
      <Table data={ data } title={ "Lista de productos" } rutaCreate={ urlCreate } tableProduct={ true } />
    </div>

  )
}

export default Products