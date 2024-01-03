import styles from "./Footer.module.css";


const Footer = (props) => {
  
  const date = new Date();

  return (
    <>
      <div className={styles.footer}>
        <span>@{date.getFullYear()},  All rights reserved.</span>
      </div>
    </>
  );
}

export default Footer;