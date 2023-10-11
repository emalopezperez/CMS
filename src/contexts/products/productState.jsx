"use client"
import { useContext, useState } from "react";
import productsContext from "./productsContext";


const ProductState = ({ children }) => {
  const [posts, setPosts] = useState(false);

  const notificationPublish = (notifi) => {
    setPosts(notifi)
  }

  return (
    <productsContext.Provider
      value={ {
        posts,
        notificationPublish
      } }>
      { children }
    </productsContext.Provider>
  );
};

export default ProductState;