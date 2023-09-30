"use client"
import { Fragment, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import SlideOvers from "./SlideOvers"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TbodyCollaborator = ({ article }) => {
  const { titulo, _id, autor } = article

  const [edit, setEdit] = useState(true)
  const [open, setOpen] = useState(false)

  const handleOnClickEdit = () => {
    setOpen(!open)
    setEdit(true)
  }

  const handleOnClickDelete = () => {
    setOpen(!open)
    setEdit(false)
  }


  return (
    <tr key={ _id } className='h-full ' >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
        img
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
        { titulo }
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{ titulo }</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{ autor }</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">role</td>

      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-300 relative">
        <div className='flex justify-between w-[30%]'>
          <button onClick={ handleOnClickEdit }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-4 h-4 text-green-600 hover:text-green-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>

          <button onClick={ handleOnClickDelete }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-4 h-4 text-red-600 hover:text-red-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </td>

      <Transition.Root show={ open } as={ Fragment }>
        <Dialog as="div" className="relative z-50" onClose={ setOpen }>
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={ Fragment }
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">

                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={ () => setOpen(false) }
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <SlideOvers data={ article } edit={ edit } />
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </tr>
  )
}

export default TbodyCollaborator