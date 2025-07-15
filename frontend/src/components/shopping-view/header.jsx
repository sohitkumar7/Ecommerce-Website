import { Link } from 'react-router-dom'
import {HousePlug, Menu} from "lucide-react"
import {Sheet, SheetContent, SheetTrigger} from "../ui/sheet"
import {useSelector} from "react-redux"

function Shoppingheader() {
  
  const {} = useSelector(state=>state.auth)

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'> 
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2'  >
          <HousePlug className='h-6 w-6'/>
          <span className='font-bold'>
            Ecommerce
          </span>
        </Link>

        <Sheet>
          <SheetTrigger aschild>
            <button varient= "outline" size="icon" className='lg-hidden'>
               <Menu className='h-6 w-6'/>
              <span className='sr-only'>
                Toggle header menu
              </span>
            </button>
          </SheetTrigger>
          <SheetContent side = "left" className="w-full max-w-xs">

          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>

        </div>

      </div>
    </header>
  )
}

export default Shoppingheader