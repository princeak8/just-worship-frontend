import { BellIcon, SearchIcon, User2 } from "lucide-react"

const Header = () => {
  const user = localStorage.getItem('user')

  const date = new Date()

  const greet = () => {
    if(date.getHours() <= 11){
      return "Good Morning"
    }else if(date.getHours() >= 12 && date.getHours() < 16 ){
      return 'Good Afternoon'
    }else{
      return "Good Evening"
    }
  }


  return (
    <div>
      <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl font-bold">{greet()}, {user}</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <SearchIcon />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <BellIcon />
            </button>
            <div className="flex items-center gap-2">
              <User2 size={40} className="border border-[#BA833C] text-[#BA833C] rounded-full "/>
              <p>{user}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header
