import './globals.css'
import type { Metadata } from 'next'
import { SideBar } from './components/sidebar'
import { ReactQueryProvider } from './ReactQueryProvider'



export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for Clients',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    < ReactQueryProvider>
      <html lang="pt-br">
      <body className={"w-screen h-screen "}>

        <div className={"w-screen  mx-auto" + " flex flex-row bg-[#e2e8f0] "}>
          <SideBar />
          {children}
        </div >

      </body>
    </html>
    </ReactQueryProvider>
  )
}



