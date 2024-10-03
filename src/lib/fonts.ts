import { Cairo, Inter } from "next/font/google";

import localFont from 'next/font/local'
 
export const paybackFont = localFont({ src: '../fonts/payback.ttf' })
export const blueOceanFont = localFont({ src: '../fonts/blueOcean.ttf' })
export const cairoFont = Cairo({ subsets: ['arabic'] })
export const interFont = Inter({ subsets: ['latin'] })