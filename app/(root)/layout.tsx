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
import { auth } from '@clerk/nextjs'


const Layout = ({children}: {children: React.ReactNode} ) => {
  const { userId } = auth();

  // If not signed in, render children without sidebar/nav/wrapper
  if (!userId) {
    return (
      <>
        {children}
        <Toaster/>
      </>
    )
  }

  // Signed in: render the full dashboard layout
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