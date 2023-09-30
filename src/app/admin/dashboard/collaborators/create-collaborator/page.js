import FormCreateCollaborator from "../components/FormCreateCollaborator"
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs"


const pages = [
  { name: 'Colaboradores', href: '/admin/dashboard/collaborators', current: false },
  { name: 'Agregar Colaborador', href: '/admin/dashboard/collaborators/create-collaborator', current: false },
]

const CreateCollaborator = () => {
  return (
    <main className="w-full">
      <Breadcrumbs pages={ pages } />
      <FormCreateCollaborator />
    </main>

  )
}

export default CreateCollaborator