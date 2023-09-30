import {
  Cog6ToothIcon,
  FolderIcon,
  ServerIcon,
  SignalIcon,
  HomeIcon
} from '@heroicons/react/24/outline'


const navigation = [
  { name: 'Inicio', href: '/admin/dashboard', icon: HomeIcon, current: false },
  { name: 'Colaboradores', href: '/admin/dashboard/collaborators', icon: SignalIcon, current: false },
  { name: 'Productos', href: '/admin/dashboard/products', icon: FolderIcon, current: false },
  { name: 'Ventas', href: '#', icon: ServerIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Sidebar = () => {
  return (
    <div className="hidden xl:fixed xl:inset-y-0 xl:z-10 xl:flex xl:w-72 xl:flex-col bg-gray-900">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className='text-white text-xl font-bold'>
            Administrador
          </h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                { navigation.map((item) => (
                  <li key={ item.name }>
                    <a
                      href={ item.href }
                      className={ classNames(
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      ) }
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      { item.name }
                    </a>
                  </li>
                )) }
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar