import React from 'react'

const DeleteProduct = ({ params }) => {
  const { slug } = params;
  return (
    <div>DeleteProduct { slug }</div>
  )
}

export default DeleteProduct