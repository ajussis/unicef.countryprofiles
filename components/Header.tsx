import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img 
            src="https://www.learningcabinet.org/images/learning-cabinet-logo.svg" 
            alt="Learning Cabinet" 
            className={styles.logoImage}
          />
        </Link>
      </div>
    </header>
  )
}
