import { getCategoriesOnly } from "@/actions/app";
import { cookieLangName } from "@/lib/constants";
import { cairoFont } from "@/lib/fonts";
import { cookies } from "next/headers";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

import Link from "next/link";

export const SmallListCategories = async () => {
  const categories = await getCategoriesOnly(6);
  const cookiesStore = cookies();
  const language = (cookiesStore.get(cookieLangName)?.value as string) ?? "ar";

  return (
    <div className="grid xl:grid-cols-6 grid-cols-3 gap-2">
      {categories.map((cat) => (
        <Link
          style={{ backgroundColor: cat.color }}
          href={routes.menu() + `#category-${cat.id}`}
          className={cn(
            "p-2 px-3 rounded-md shadow-sm block text-center cursor-pointer transition-all text-white font-semibold text-sm text-wrap line-clamp-1 overflow-hidden",
            cairoFont.className
          )}
          key={cat.id}
        >
          {language == "en" ? cat.enName : cat.arName}
        </Link>
      ))}
    </div>
  );
};
