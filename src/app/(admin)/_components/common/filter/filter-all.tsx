"use client"

import { OrderBy, SearchParams } from "@/types";
import { SearchFilter } from "./search-filter";
import { OrderFilter } from "./order-filter";
import { OrderTypeFilter } from "./order-type-filter";

type Props = { showSearchInput?: boolean, searchParams: SearchParams, orderByArray: OrderBy[] }

export const FilterAll = ({ searchParams, showSearchInput = true, orderByArray }: Props) => {
  return ( 
    <div className="my-4 grid xl:grid-cols-4 gap-2">
      {showSearchInput && (
        <SearchFilter searchParams={searchParams} />
      )}
      <OrderFilter searchParams={searchParams} orderByArray={orderByArray} />
      <OrderTypeFilter searchParams={searchParams} />
    </div>
  );
}