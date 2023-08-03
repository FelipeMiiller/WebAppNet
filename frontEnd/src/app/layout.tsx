import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SideBar } from './components/sidebar'
import { Header } from './components/header'


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
    <html lang="pt-br">
      <body className={ "w-screen h-screen "}>
       
        <div className={"w-screen  mx-auto" + " flex flex-row bg-[#e2e8f0] "}>
          <SideBar />
          {children}
        </div >

      </body>
    </html>
  )
}



