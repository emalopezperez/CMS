import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const Search = () => {
  return (
    <form className="flex flex-1 bg-[#111827]" action="#" method="GET">
    <label htmlFor="search-field" className="sr-only">
      Search
    </label>
    <div className="relative w-full">
      <MagnifyingGlassIcon
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
        placeholder="Search..."
        type="search"
        name="search"
      />
    </div>
  </form>
  )
}

export default Search