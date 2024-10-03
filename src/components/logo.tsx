import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

import Link from "next/link";
import Image from "next/image"
import { cairoFont } from "@/lib/fonts";
import { appNames, logosLocation } from "@/lib/constants";

type Props = {
  iconClassName?: ClassValue
  parentClassName?: ClassValue
  labelClassName?: ClassValue
  href?: string
  showAppName?: boolean,
  width?: number,
  height?: number,
  logo?: string,
  appName?: string
}

export const Logo = ({ width = 60, height = 60, href = '/', logo = logosLocation.first, showAppName = true, appName = appNames.first, parentClassName, labelClassName }: Props) => {
  return ( 
    <Link href={href} className={cn('flex gap-2 items-center', parentClassName)}>
      <Image width={width} height={height} alt="App Logo" src={logo} />
      {showAppName && <span className={cn('font-bold text-lg text-black', labelClassName, cairoFont.className)}>{appName}</span>}
    </Link>
  );
}