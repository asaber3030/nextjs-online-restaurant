import { Button } from "@/components/ui/button";
import { Facebook, Instagram, LocateFixed, MessageCircle, Phone, Send } from "lucide-react";
import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AvailableLanguages } from "@/types";

import { getCurrentResturant } from "@/actions/app";
import { cookies } from "next/headers";
import { cookieLangName } from "@/lib/constants";

import translate from "@/services/translate";

export const ContactDropdown = async () => {

  const res = await getCurrentResturant()

  const cookieStore = cookies()
  const language = cookieStore.get(cookieLangName)?.value as AvailableLanguages ?? 'ar'
  
  return ( 
    <Dialog>

      <DialogTrigger asChild>
        <Button variant='outline'><Phone className="size-4 text-green-700 animate-bounce" /></Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle className="text-center">{res?.name}</DialogTitle>
        </DialogHeader>

        <div>

          <ul className="divide-y">

            <li className="flex justify-between items-center py-3">
              <span className="flex items-center gap-2"><LocateFixed className="size-4" /> {translate('location', language)}</span>
              <span>{res?.location}</span>
            </li>

            <li className="flex justify-between items-center py-3">
              <span className="flex items-center gap-2"><MessageCircle className="size-4" /> {translate('whatsapp', language)}</span>
              <a href={`https://wa.me/${res?.mainPhone}`} className="text-green-700 hover:underline" target="_blank">{res?.mainPhone}</a>
            </li>

            <li className="flex justify-between items-center py-3">
              <span className="flex items-center gap-2"><Phone className="size-4" /> {translate('phoneNumbers', language)}</span>
              <p className="flex gap-2 divide-x">{res?.phoneNumbers.split(',').map(item => <a href={`tel:+20${item}`} className='text-blue-600 hover:underline hover:text-blue-800' key={item}>{item}</a>)}</p>
            </li>

            {res?.facebookUrl && (
              <li className="flex justify-between items-center py-3">
                <span className="flex items-center gap-2"><Facebook className="size-4" /> {translate('facebookUrl', language)}</span>
                <a href={res?.facebookUrl} className="text-blue-600 hover:underline hover:text-blue-800">{translate('facebookUrl', language)}</a>
              </li>
            )}

            {res?.instagramUrl && (
              <li className="flex justify-between items-center py-3">
                <span className="flex items-center gap-2"><Instagram className="size-4" /> {translate('instagramUrl', language)}</span>
                <a href={res?.instagramUrl} className="text-blue-600 hover:underline hover:text-blue-800">{translate('instagramUrl', language)}</a>
              </li>
            )}

          </ul>

        </div>

      </DialogContent>

    </Dialog>
  );
}