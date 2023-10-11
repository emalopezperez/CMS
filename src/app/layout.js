import AuthContextProvider from '@/contexts/authContext'
import ProductState from '@/contexts/products/productState'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CMS',
  description: 'Cms app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <AuthContextProvider>
          <ProductState>
          { children }
          </ProductState>
        </AuthContextProvider>
      </body>
    </html>
  )
}
