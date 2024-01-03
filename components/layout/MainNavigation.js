import styles from './MainNavigation.module.css'
import Link from 'next/link';

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <Link href='/'><div className={styles.logo}>Feeds</div></Link>
      <nav>
        <ul>
            <li>
                <Link href='/'>All Feeds</Link>
            </li>
            <li>
                <Link href='/new-feeds'>Add New Feed</Link>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
