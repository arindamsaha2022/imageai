import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/sidebar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Toaster } from '@/components/ui/toaster'


const Layout = ({children}: {children: React.ReactNode} ) => {
  return (
    <main className='root'>
        <div className='root-container'>
          <div className='wrapper'>
          <Sidebar/>
           <MobileNav/>
           {children}
          </div>
        </div>
        <Toaster/>
    </main>
  )
}

export default Layout