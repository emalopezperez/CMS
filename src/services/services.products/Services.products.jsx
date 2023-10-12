export const createProduct = async (data, file) => {
  const formData = new FormData();
  formData.append("titulo", data.titulo);
  formData.append("contenido", data.contenido);
  formData.append("categoria", data.categoria);
  formData.append("estado", data.estado);
  formData.append("stock", data.stock);
  formData.append("precio", data.precio);
  formData.append("descripcion", data.descripcion);
  formData.append("imagen", file)

  const url_Local = "http://localhost:3000/api/"
  const enpoint = "create_products";

  try {
    const res = await fetch(`${url_Local}${enpoint}`, {
      method: "POST",
      body: formData,
    });

    const response = await res.json();

    return response

  } catch (error) {
    console.log(error);
  }
};


export const deleteProduct = async (id) => {
  const url_Local = "http://localhost:3000/api/"
  const enpoint = "/delete_product/";

  try {
    const res = await fetch(`${url_Local}${enpoint}${id}`, {
      method: "DELETE",
    });

    const response = await res.json();

    console.log(response)
    return response


  } catch (error) {
    console.log(error);
  }
}

