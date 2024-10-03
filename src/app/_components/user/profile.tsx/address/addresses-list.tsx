"use client";

import { useContext } from "react";

import { EmptyState } from "@/components/empty-state";
import { LanguageContext } from "@/providers/language";
import { Address } from "@prisma/client";

import { UpdateAddressModal } from "./update-address";
import { DeleteAddressModal } from "./delete-address";

import translate from "@/services/translate";

type Props = {
  addresses: Address[]
}

export const AddressesList = ({ addresses }: Props) => {

  const language = useContext(LanguageContext)

  return ( 
    <div>
      {addresses.length === 0 && (
        <EmptyState title={translate("youDontHaveAddresses", language)} />
      )}
      {addresses.map((address) => (
        <div key={address.id} className='xl:flex mb-2 border p-2 px-4 rounded-md justify-between items-center'>
          <h3>{address.streetName} - {address.homeNumber} - {address.phoneNumber}</h3>
          <div className="flex gap-2">
            <UpdateAddressModal address={address} />
            <DeleteAddressModal address={address} />
          </div>
        </div>
      ))}
    </div>
  );
}