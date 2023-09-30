import Table from "@/components/table/Table"
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs"

const data = [{
  titulo: "Titulo",
  _id: 12,
  autor: "ema"
}]

const pages = [
  { name: 'Colaboradores', href: '/admin/dashboard/collaborators', current: false },
]

const Collaborators = () => {
  const urlCreate = "/admin/dashboard/collaborators/create-collaborator"

  return (
    <div>
      <Breadcrumbs pages={ pages } />
      <Table data={ data } title={ "Lista de colaboradores" } rutaCreate={ urlCreate } tableProduct={ false } />
    </div>

  )
}

export default Collaborators