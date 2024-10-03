import { getCategory, getCategoryItems } from "@/actions/categories";
import { ViewCategoryItems } from "@/app/(admin)/_components/categories/view-items";
import { AdminTitle } from "@/app/(admin)/_components/common/title";
import { notFound } from "next/navigation";

const CategoryItemsPage = async ({ params }: { params: { id: string } }) => {

  const categoryId = +params.id
  const category = await getCategory(categoryId)
  const items = await getCategoryItems(categoryId)

  if (!category) return notFound()

  return (
    <ViewCategoryItems category={category} items={items} />
  );
}
 
export default CategoryItemsPage;