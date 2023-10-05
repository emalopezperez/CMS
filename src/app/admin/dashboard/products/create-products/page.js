import FormCreateArticle from "../components/FormCreateProducts"
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs"


const pages = [
  { name: 'Productos', href: '/admin/dashboard/products', current: false },
  { name: 'Agregar producto', href: '/admin/dashboard/products/create-products', current: false },
]


const CreateProducts = () => {
  return (
    <main className="w-full">
      <Breadcrumbs pages={ pages } />
      <FormCreateArticle/>
    </main>

  )
}

export default CreateProducts