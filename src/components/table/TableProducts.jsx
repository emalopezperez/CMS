import TbodyProducts from "./components/TbodyProducts";
import Link from "next/link";
import Paginations from "../paginations/Paginations";

const TableProducts = ({ data, title, rutaCreate }) => {
  return (
    <main className="bg-gray-900 h-[100vh]">
      <div className="mx-auto max-w-[85%]">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex mb-[100px]  items-center w-full justify-between">
              <h1 className="text-white text-2xl font-bold">{ title }</h1>
              <div className="sm:ml-16 sm:flex-none">
                <Link href={ rutaCreate }
                  className="rounded-sm bg-white  px-1 md:px-2 py-2 md:py-3 text-center text-sm font-semibold text-black hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 "
                >
                  Agregar producto
                </Link>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="">
                      <tr>
                        <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                          <input
                            type="checkbox"
                            className="absolute left-0 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"

                          />
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          Imagen
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                          Titulo
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                          Categoria
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                          Sku
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                          Precio
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                          Stock
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      { data.map((article) => (
                        <TbodyProducts key={ article._id } article={ article } />
                      )) }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Paginations />
      </div>
    </main>
  )
}

export default TableProducts