const generateRandomId = () => {
  const min = 10;
  const max = 99;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const cleanAndValidate = (str) => {
  return str.replace(/[^\w]/g, '').toUpperCase();
};


export const createSku = (name, variedad, proveedor) => {

  name = cleanAndValidate(name);
  variedad = cleanAndValidate(variedad);
  proveedor = cleanAndValidate(proveedor);

  const productId = generateRandomId().toString();
  const sku = name.slice(0, 2) + variedad.slice(0, 3) + proveedor.slice(0, 3) + productId;

  return sku;
};