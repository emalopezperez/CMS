"use client"
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react'
import { PhotoIcon, PlusIcon } from '@heroicons/react/24/solid'

export default function FormCreateProducts() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [categoria, setCategoria] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [autor, setAutor] = useState("Emanuel");

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

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
      markdown,
      previewImage
      , autor
    }
    createPost(data);
  };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2RlYzUyZjg4ZDEyNDNmZTRhMDIwMSIsImlhdCI6MTY5NTgzODgwNiwiZXhwIjoxNjk1OTI1MjA2fQ.wJqDMYSO7gf-AUZDpYS3GMk71Rw7ByzleSyDYHQVxLU"


  const createPost = async (data) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("contenido", data.contenido);
    formData.append("markdown", data.markdown);
    formData.append("autor", data.autor);
    formData.append("categoria", data.categoria);
    formData.append("imagen", data.previewImage);
    try {
      let response = await fetch(
        "https://backend-blog-tau.vercel.app/api/create",
        {
          method: "POST",
          headers: {
            
            "x-access-token": token,
          },
          body: formData,
        }
      );

      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={ handleSubmit } className='p-5 md:p-10 bg-gray-900 h-full'>
      <div className="space-y-12 ">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-3xl font-semibold leading-7 text-white">Crear articulo</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full mt-4">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                Portada
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-5  flex-col gap-4 items-center">

                {
                  previewImage && <div className='w-full flex flex-rigth'>
                    <button
                      onClick={ () => setPreviewImage("") }
                      type="button"
                      className="rounded-full  bg-black p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-10"
                    >
                      x
                    </button>
                  </div>
                }
                {
                  previewImage ? <div className='w-full relative '>
                    <img src={ previewImage } className='w-full h-[400px] object-fill' />
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
                            id="fileInput"
                            onChange={ handleFileChange }
                          />
                        </label>
                      </div>
                    </div>
                }
              </div>
            </div>
            <div className=" sm:col-span-6 ">
              <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-white">
                Titulo
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Titulo del articulo"
                    onChange={ (e) => setTitulo(e.target.value) }
                  />
                </div>
              </div>

              <div className="sm:col-span-2 pt-4">
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
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  >
                    <option>Javascript</option>
                    <option>react</option>
                    <option>node</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-span-full">
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
              <p className="mt-3 text-sm leading-6 text-gray-400">Breve descripcion del articulo.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="markdown" className="block text-sm font-medium leading-6 text-white">
                Markdown
              </label>
              <div className="mt-2">
                <textarea
                  onChange={ (e) => setMarkdown(e.target.value) }
                  id="markdown"
                  name="markdown"
                  rows={ 4 }
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={ '' }
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">Contenido articulo markdown.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Crear articulo
        </button>
      </div>
    </form>
  )
}
