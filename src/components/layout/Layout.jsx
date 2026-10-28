import { Outlet } from 'react-router'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export function Layout() {
  return (
    <>
      <Navigation />
      <main className="w-full min-w-0"><Outlet /></main>
      <Footer />
    </>
  )
}
