"use client"
import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { PhotoIcon, PlusIcon } from '@heroicons/react/24/solid'
import { createProduct } from '@/services/services.products/Services.products';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FormCreateProducts() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [estado, setEstado] = useState(true);
  const [stock, setStock] = useState(1);
  const [precio, setPrecio] = useState(20);
  const [descripcion, setDescripcion] = useState("pruebaaaaa")
  const [file, setFile] = useState('')
  const [descuento, setDescuento] = useState("")


  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if (!selectedFile) {
      console.log("Selecciona un archivo.");
      return;
    }

    const tamanoArchivo = selectedFile.size;
    const tipoArchivo = selectedFile.type;

    const tamanoMinimo = 1000;
    const tamanoMaximo = 1000000;

    if (tamanoArchivo < tamanoMinimo || tamanoArchivo > tamanoMaximo) {
      console.log("El tamaño de la imagen no cumple con los requisitos.");
      return;
    }

    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!tiposPermitidos.includes(tipoArchivo)) {
      console.log("El tipo de archivo no es válido.");
      return;
    }

    setFile(e.target.files[0])

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      titulo,
      contenido,
      categoria,
      estado,
      stock,
      precio,
      descripcion,
      previewImage
    }
    createProduct(data, file)
  };


  return (
    <main className='flex justify-center items-center  bg-gray-900 h-[100%] pl-5 md:pl-10 pr-5 md:pr-10 pt-3 pb-3'>
      <form onSubmit={ handleSubmit } className='h-full  w-full flex  justify-between gap-14'>
        <div className='w-full flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-white">
              Titulo
            </label>
            <div className="mt-2">
              <div className="flex bg-white/5 ring-1 ring-inset ring-white/10 ">
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Titulo del producto"
                  onChange={ (e) => setTitulo(e.target.value) }
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="precio" className="block text-sm font-medium leading-6 text-white">
              Precio
            </label>
            <div className="mt-2">
              <div className="flex bg-white/5 ring-1 ring-inset ring-white/10 ">
                <input
                  type="number"
                  name="precio"
                  id="precio"
                  className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Precio del producto"
                  onChange={ (e) => setPrecio(e.target.value) }
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-white">
              Stock
            </label>
            <div className="mt-2">
              <div className="flex bg-white/5 ring-1 ring-inset ring-white/10 ">
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Stock del producto"
                  onChange={ (e) => setStock(e.target.value) }
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-white">
              Categoria
            </label>
            <div className="mt-2">
              <select
                value={ categoria }
                onChange={ handleCategoriaChange }
                id="categoria"
                name="categoria"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-1 text-white shadow-sm ring-1 ring-inset ring-white/10 cursor-pointer sm:text-sm sm:leading-6 [&_*]:text-black"
              >
                <option>Seleccionar valor</option>
                <option>celulares</option>
                <option>computadoras</option>
                <option>audio</option>
              </select>
            </div>
          </div>


          <div className='flex flex-col gap-2'>
            <label htmlFor="contenido" className="block text-sm font-medium leading-6 text-white">
              Descripcion
            </label>
            <div className="mt-2">
              <textarea
                onChange={ (e) => setContenido(e.target.value) }
                id="contenido"
                name="contenido"
                rows={ 4 }
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                defaultValue={ '' }
              />
            </div>
          </div>

        </div>

        <div className="w-full flex flex-col justify-between pt-2 ">
          <div>
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
              Portada
            </label>
            <div className="mt-2 flex relative justify-center rounded-lg border border-dashed border-white/25 px-6 py-5  flex-col gap-4 items-center">

              {
                previewImage && <div className='w-full flex flex-rigth'>
                  <button
                    onClick={ () => setPreviewImage("") }
                    type="button"
                    className="rounded-full absolute z-40 top-1 left-1  bg-black  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-6 h-6 flex items-center justify-center"
                  >
                    <span className='text-sm '>
                      x
                    </span>
                  </button>
                </div>
              }
              {
                previewImage ? <div className='w-full relative h-[120px]'>
                  <img src={ previewImage } className='w-full h-full object-cover' />
                </div> :
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-400">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-md font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                      >

                        <input
                          name="file"
                          type="file"
                          accept="image/*"
                          id="fileInput"
                          onChange={ handleFileChange }
                        />
                      </label>
                    </div>
                  </div>
              }
            </div>
          </div>

          <div className='flex w-full justify-between'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="precio" className="block text-sm font-medium leading-6 text-white">
                Producto publicado
              </label>
              <div className="mt-2">
                <Switch
                  checked={ estado }
                  onChange={ setEstado }
                  className={ classNames(
                    estado ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  ) }
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={ classNames(
                      estado ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    ) }
                  >
                    <span
                      className={ classNames(
                        estado ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      ) }
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={ 2 }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={ classNames(
                        estado ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      ) }
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="precio" className="block text-sm font-medium leading-6 text-white">
                En descuento
              </label>
              <div className="mt-2">
                <Switch
                  checked={ descuento }
                  onChange={ setDescuento}
                  className={ classNames(
                    descuento ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  ) }
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={ classNames(
                      descuento ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    ) }
                  >
                    <span
                      className={ classNames(
                        descuento ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      ) }
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={ 2 }
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={ classNames(
                        descuento ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                      ) }
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </div>
            </div>
          </div>

          <div className=" items-center  gap-x-6 mt-28 w-full flex">
            <button type="button" className="text-sm font-semibold leading-6 text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Crear producto
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}
