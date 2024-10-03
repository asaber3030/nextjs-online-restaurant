import { Navbar } from "../_components/app/navbar/navbar";
import { MobileNavbarContainer } from "../_components/app/navbar/mobile.navbar";
import { ShoppingCartTrigger } from "../_components/app/open-shopping-cart";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MobileNavbarContainer />
      <ShoppingCartTrigger />
      <div className="mt-[100px]">{children}</div>
    </>
  );
};

export default DefaultLayout;
