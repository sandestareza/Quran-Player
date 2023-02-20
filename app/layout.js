import './globals.css'
import { Raleway } from '@next/font/google';
const raleway = Raleway({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='dark'>
        <main className={`${raleway.className} relative`}>
          {children}
        </main>
      </body>
    </html>
  )
}
