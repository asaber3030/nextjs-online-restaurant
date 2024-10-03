import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { deleteOfferItem, updateOfferItem } from "@/actions/offers";
import { toast } from "sonner";
import { z } from "zod";

import { SingleOfferItem } from "@/app/_components/app/offers/single-offer-item";
import { OfferItemsSchema } from "@/schema";
import { LoadingButton } from "@/components/loading-button";
import { FullOfferItem } from "@/types";
import { Input } from "@/components/ui/input";
import { LanguageContext } from "@/providers/language";
import translate from "@/services/translate";

type Props = { item: FullOfferItem }

export const UpdateOfferItem = ({ item }: Props) => {

  const language = useContext(LanguageContext)

  const [qty, setQty] = useState(item.quantity ?? 1)

  const updateMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof OfferItemsSchema.update> }) => updateOfferItem(item.id, values),
    onSuccess: (data) => toast.message(data.message)
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteOfferItem(item.id),
    onSuccess: (data) => toast.message(data.message)
  })

  const handleUpdateOfferItem = () => {
    updateMutation.mutate({
      values: { quantity: qty }
    })
  }

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  return ( 
    <div className="flex gap-10 items-center justify-between p-4 bg-white rounded-md shadow-sm">
      <SingleOfferItem menuItem={item} />
      <div className="flex gap-2">
        <Input className="w-10 text-center" placeholder={translate('quantity', language)} value={qty} onChange={(event) => setQty(+event.target.value)} />
        <LoadingButton loading={updateMutation.isPending} disabled={qty === 0 || !qty} variant='secondaryMain' onClick={() => handleUpdateOfferItem()}>{translate('save', language)}</LoadingButton>
        <LoadingButton loading={deleteMutation.isPending} onClick={handleDelete}>{translate('delete', language)}</LoadingButton>
      </div>
    </div>
  );
}