import Image from 'next/image'
import styles from './page.module.css'
import { Noto_Serif_Display } from 'next/font/google'

const notoSerifDisplay = Noto_Serif_Display({ subsets: ['latin'] })

export default function Products() {
  return (
    <>
      <section>
        Products Page
      </section>
    </>
  )
}
