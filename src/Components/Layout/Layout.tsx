import Footer from "../../Containers/Footer/Footer";
import Header from "../../Containers/Header/Header";
import classes from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
  isDark?: boolean;
};

const Layout = ({ children, isDark }: LayoutProps) => {
  return (
    <section className={classes.container}>
      <section
        className={classes.header}
      >
        <Header isDark={isDark} />
      </section>
      <section className={classes.body}>{children}</section>
      <section className={classes.footer}>
        <Footer />
      </section>
    </section>
  );
};

export default Layout;
