import { BellIcon, SearchIcon, User2 } from "lucide-react"

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl font-bold">Good Afternoon, User</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <SearchIcon />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <BellIcon />
            </button>
            <User2 size={40} className="border border-purple-500 text-purple-500 rounded-full "/>
          </div>
        </div>
    </div>
  )
}

export default Header
