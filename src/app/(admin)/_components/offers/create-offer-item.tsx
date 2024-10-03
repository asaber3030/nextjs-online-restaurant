import { useCategories, useCategoryMenu } from "@/hooks";
import { FullOffer } from "@/types";
import { useContext, useState } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { cairoFont } from "@/lib/fonts";
import { LoadingButton } from "@/components/loading-button";
import { useMutation } from "@tanstack/react-query";
import { createOfferItem } from "@/actions/offers";
import { z } from "zod";
import { OfferItemsSchema } from "@/schema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";

type Props = {
  offer: FullOffer
}

export const CreateOfferItem = ({ offer }: Props) => {

  const language = useContext(LanguageContext)

  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const [qty, setQty] = useState<number>(1)

  const { categories, categoriesLoading } = useCategories()
  const { menu, menuLoading } = useCategoryMenu(selectedCategory)

  const createMutation = useMutation({
    mutationFn: (values: z.infer<typeof OfferItemsSchema.create>) => createOfferItem(offer.id, values),
    onSuccess: (data) => toast.message(data.message)
  })

  const handleCreate = () => {
    if (selectedCategory && selectedItem && qty !== 0) {
      createMutation.mutate({ itemId: selectedItem, quantity: qty })
    }
  }

  return ( 
    <div className="flex gap-2">

      {categoriesLoading ? (
        <Skeleton className="w-[450px] h-10" />
      ): (
        <Select onValueChange={(val: string) => setSelectedCategory(+val)}>
          <SelectTrigger className="w-[450px]">
            <SelectValue placeholder={translate('category', language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories?.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.enName} - {cat._count.items} {translate('items', language)}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {menuLoading ? (
        <Skeleton className="w-[450px] h-10" />
      ): (
        <Select disabled={menuLoading || !menu || menu.length == 0} onValueChange={(val: string) => setSelectedItem(+val)}>
          <SelectTrigger className="w-[450px]">
            <SelectValue placeholder={translate('selectAnItem', language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {menu?.map(item => (
                <SelectItem key={item.id} value={String(item.id)} className="flex justify-between">
                  <span className={cn(cairoFont.className)}>{item.enName} </span>
                  <span className={"text-green-800"}>{item.price} {translate('le', language)}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <Input className="w-10 text-center" placeholder={translate('quantity', language)} value={qty} onChange={(event) => setQty(+event.target.value)} />

      <LoadingButton variant='secondaryMain' onClick={handleCreate} disabled={!selectedCategory || !selectedItem || !qty || qty === 0}>{translate('create', language)}</LoadingButton>
    </div>
  );
}