import MainNavigation from './MainNavigation'
import Footer from "@/components/footer/Footer";
import styles from './Layout.module.css'

const Layout = (props) => {
  return (
    <>
    <div>
      <MainNavigation />
      <main className={ styles.main }>{ props.children }</main>
      <Footer />
    </div>
    </>
  )
}

export default Layout
