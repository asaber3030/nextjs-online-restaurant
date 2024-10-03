import { Navbar } from "../_components/app/navbar/navbar";
import { MobileNavbarContainer } from "../_components/app/navbar/mobile.navbar";
import { ShoppingCartTrigger } from "../_components/app/open-shopping-cart";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MobileNavbarContainer />
      <ShoppingCartTrigger />
      <div className="py-4 xl:px-20 px-4 mt-[85px]">{children}</div>
    </>
  );
};

export default Layout;