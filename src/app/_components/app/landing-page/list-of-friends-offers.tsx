import { getFriendsItemsOnly, getItemsOnly } from "@/actions/app";
import { MenuItemCard } from "../menu-item/menu-item-card";

export const SmallListOfFriendsItems = async () => {
  const items = await getFriendsItemsOnly(8);

  return (
    <div className="grid xl:grid-cols-4 gap-2">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
