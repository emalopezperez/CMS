

const CardArticle = ({ article }) => {
  const { titulo, _id, autor } = article
  return (
    <tr key={ _id }>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
        { titulo }
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{ titulo }</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{autor}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">role</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <a href="#" className="text-indigo-400 hover:text-indigo-300">
          Edit<span className="sr-only">, { titulo }</span>
        </a>
      </td>
    </tr>
  )
}

export default CardArticle