"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { Switch } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { createProduct } from '@/services/services.products/Services.products';
import Successfully from "@/components/notifications/Successfully"
import { createSku } from '@/utilities/createSku'
import Fail from '@/components/notifications/fail';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FormCreateProducts() {
  const router = useRouter()

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("");
  const [sub_categoria, setSubCategoria] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [estado, setEstado] = useState(true);
  const [stock, setStock] = useState(1);
  const [precio, setPrecio] = useState(20);
  const [descripcion, setDescripcion] = useState("pruebaaaaa")
  const [file, setFile] = useState('')
  const [descuento, setDescuento] = useState("")

  const [data, setData] = useState([]);
  const [proveedor, setProveedor] = useState('');
  const [variedad, setVariedad] = useState('');
  const [tipoVariedad, setTipoVariedad] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [notificationsSuccess, setNotificationsSuccess] = useState(false);
  const [notificationFailure, setNotificationFailure] = useState(false);

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleSubCategoriaChange = (event) => {
    setSubCategoria(event.target.value);
  };

  const handleTypeVariedad = (event) => {
    setTipoVariedad(event.target.value);
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
      sub_categoria,
      estado,
      stock,
      precio,
      descripcion,
      previewImage,
    }

    try {
      const response = await createProduct(data, file);
      if (response) {
        console.log('La petición fue exitosa.');
        setNotificationsSuccess(true)

        setTimeout(() => {
          setNotificationsSuccess(false)
          router.push("/admin/dashboard/products")
        }, 800)

      } else {
        console.log('Hubo un error en la petición.');

        setNotificationFailure(true)

        setTimeout(() => {
          setNotificationFailure(false)
        }, 1000)

      }
    } catch (error) {
      console.log(error);

      setNotificationFailure(true)

      setTimeout(() => {
        setNotificationFailure(false)
      }, 1000)
    }
  };


  const handleAddVariedad = (e) => {
    e.preventDefault();

    const sku = createSku(proveedor, variedad, titulo);

    const nuevaVariedad = {
      proveedor,
      variedad,
      tipo_variedad: tipoVariedad,
      cantidad,
      sku
    };

    setData([...data, nuevaVariedad]);

    setProveedor('');
    setVariedad('');
    setCantidad('');
  };


  const deleteVariedad = (sku) => {
    const newdata = data.filter(variedad => variedad.sku !== sku)
    setData(newdata)
  }


  return (
    <main className='flex justify-center items-center  bg-gray-900 h-[100%] pl-5 md:pl-10 pr-5 md:pr-10 pt-3 pb-3'>
      { notificationsSuccess && <Successfully /> }
      { notificationFailure && <Fail /> }

      <div className='flex gap-14 w-full h-full'>
        <form onSubmit={ handleSubmit } className='flex flex-col h-full  w-[90%] gap-6'>
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
                <option>hombres</option>
                <option>mujeres</option>
                <option>articulos</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="sub_categoria" className="block text-sm font-medium leading-6 text-white">
              Subcategoria
            </label>
            <div className="mt-2">
              <select
                value={ sub_categoria }
                onChange={ handleSubCategoriaChange }
                id="sub_categoria"
                name="sub_categoria"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-1 text-white shadow-sm ring-1 ring-inset ring-white/10 cursor-pointer sm:text-sm sm:leading-6 [&_*]:text-black"
              >
                <option>Seleccionar valor</option>
                <option>jeans</option>
                <option>remeras</option>
                <option>zapatos</option>
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
                  onChange={ setDescuento }
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

          <div className='flex gap-4'>
            <button
              type="onClick"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Crear producto
            </button>
          </div>
        </form>


        <div className="w-[80%]">
          <form onSubmit={ handleAddVariedad } className="w-full flex flex-col gap-8 pt-2">
            <h3 className="block text-md font-medium leading-6 text-white pb-5">Variedades del producto</h3>

            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="block text-sm font-medium leading-6 text-white">Nombre del proveedor</label>
                <div className="mt-2">
                  <div className="flex bg-white/5 ring-1 ring-inset ring-white/10">
                    <input
                      type="text"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Proveedor del producto"
                      value={ proveedor }
                      onChange={ (e) => setProveedor(e.target.value) }
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 w-[30%]' >
                <label htmlFor="tipoVariedad" className="block text-sm font-medium leading-6 text-white">
                  Tipo de variedad
                </label>
                <div className="mt-2">
                  <select
                    value={ tipoVariedad }
                    onChange={ handleTypeVariedad }
                    id="tipoVariedad"
                    name="tipoVariedad"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-1 text-white shadow-sm ring-1 ring-inset ring-white/10 cursor-pointer sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option>Seleccionar</option>
                    <option>color</option>
                    <option>talla</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium leading-6 text-white">Variedad</label>
                <div className="mt-2">
                  <div className="flex bg-white/5 ring-1 ring-inset ring-white/10">
                    <input
                      type="text"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Variedad del producto"
                      value={ variedad }
                      onChange={ (e) => setVariedad(e.target.value) }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium leading-6 text-white">Cantidad</label>
                <div className="mt-2">
                  <div className="flex bg-white/5 ring-1 ring-inset ring-white/10">
                    <input
                      type="number"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Cantidad del producto"
                      value={ cantidad }
                      onChange={ (e) => setCantidad(e.target.value) }
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium leading-6 text-white">Agregar </label>
                <div className="mt-2">
                  <div className="flex bg-white/5 ring-1 ring-inset ring-white/10">
                    <button
                      type="onClick"
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {
            data.length > 0 && <>
              <table className="min-w-full divide-y divide-gray-700 mt-14">
                <thead className="">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                      Proveedor
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                      Variedad
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                      Cantidad
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-white">
                      Sku
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 w-full">
                  { data.map(({ variedad, proveedor, cantidad, sku }) => (
                    <tr key={ cantidad } className='h-full ' >
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{ proveedor }</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{ variedad }</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{ cantidad }</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{ sku }</td>
                      <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-300 relative">
                        <div className='flex justify-between w-[40%]'>
                          <button
                            onClick={ () => deleteVariedad(sku) }
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-4 h-4 text-red-400 hover:text-red-900">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) }
                </tbody>
              </table>
            </>
          }
        </div>
      </div>
    </main>
  )
}
