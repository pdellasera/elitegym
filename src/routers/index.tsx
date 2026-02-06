import { useState } from 'preact/hooks'
import Layout from '../layout'
import Home from '../page/home'
import Payment from '../page/payment'

type Page = 'home' | 'payment'

export default function Router() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  return (
    <Layout>
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'payment' && <Payment onNavigate={setCurrentPage} />}
    </Layout>
  )
}
