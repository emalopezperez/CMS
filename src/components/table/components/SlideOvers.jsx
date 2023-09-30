import { HeartIcon } from '@heroicons/react/24/outline'
import { PencilIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function SlideOvers({ data, edit }) {

  if (edit) {
    return (
      <tbody className="h-full overflow-y-auto bg-white p-8">
        <div className="text-base font-semibold leading-6 text-gray-900 pb-4 w-full flex justify-center">
          <h2>
            Editar
          </h2>
        </div>
        <div className="space-y-6 pb-16">
          <div>
            <div className="aspect-h-7 aspect-w-2 block w-full overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                alt=""
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  <span className="sr-only">Details for </span>IMG_4985.HEIC
                </h2>
                <p className="text-sm font-medium text-gray-500">3.9 MB</p>
              </div>
              <button
                type="button"
                className="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="absolute -inset-1.5" />
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Favorite</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Detalles del producto</h3>
            <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">titulo</dt>
                <dd className="text-gray-900">{ data.titulo }</dd>
              </div>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-900">June 8, 2020</dd>
              </div>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">Last modified</dt>
                <dd className="text-gray-900">June 8, 2020</dd>
              </div>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">Dimensions</dt>
                <dd className="text-gray-900">4032 x 3024</dd>
              </div>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">Resolution</dt>
                <dd className="text-gray-900">72 x 72</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Description</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm italic text-gray-500">Add a description to this image.</p>
              <button
                type="button"
                className="relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="absolute -inset-1.5" />
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Add description</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Shared with</h3>
            <ul role="list" className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                  <p className="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
                </div>
                <button
                  type="button"
                  className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Remove<span className="sr-only"> Aimee Douglas</span>
                </button>
              </li>
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                  <p className="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
                </div>
                <button
                  type="button"
                  className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Remove<span className="sr-only"> Andrea McMillan</span>
                </button>
              </li>
              <li className="flex items-center justify-between py-2">
                <button
                  type="button"
                  className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                    Share
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-shrink-0 justify-end px-4 py-4">
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"

          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </tbody>
    )
  } else {
    return (
      <tbody className="h-full overflow-y-auto bg-white p-8">
        <div className="pt-22 relative transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Eliminar
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of your data will be permanently
                    removed. This action cannot be undone. Desactivando {data.titulo} 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"

            >
              Deactivate
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"

            >
              Cancel
            </button>
          </div>
        </div>
      </tbody>
    )
  }
}
