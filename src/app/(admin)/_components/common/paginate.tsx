"use client";

import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { PaginatePrevious } from "./paginate-previous";
import { PaginateNext } from "./paginate-next";
import { generateArray } from "@/lib/utils";
import { ClassValue } from "class-variance-authority/types";

type Props = {
  repeat?: number,
  nextClassName?: ClassValue,
  previousClassName?: ClassValue,
  nextDisabled?: boolean
  previousDisabled?: boolean
}

export const Pagination = ({ repeat = 3, previousClassName, previousDisabled, nextClassName, nextDisabled }: Props) => {
  return ( 
    <TableFooter>
      <TableRow className='flex-row-reverse w-full'>
        <TableCell className=" flex-1"><PaginatePrevious className={previousClassName} disabled={previousDisabled} /></TableCell>
        {generateArray(repeat).map((_, idx) => (
          <TableCell className="flex-1" key={idx}></TableCell>
        ))}
        <TableCell className="flex flex-1 justify-end"><PaginateNext className={nextClassName} disabled={nextDisabled} /></TableCell>
      </TableRow>
    </TableFooter>
  );
}