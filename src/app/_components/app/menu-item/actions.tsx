import { MenuItem } from "@prisma/client";
import { AddToCart } from "./add-to-cart";

type Props = {
  item: MenuItem
}
export const MenuItemActions = ({ item }: Props) => {
  return ( 
    <div className='flex justify-end'>
      <AddToCart item={item} />
    </div>
  );
}