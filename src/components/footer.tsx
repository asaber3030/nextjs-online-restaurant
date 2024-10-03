import Link from "next/link";
import { Logo } from "./logo";
import { ComponentProps, PropsWithChildren } from "react";

export const Footer = () => {
  return ( 
    <footer className="bg-muted py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-muted-foreground">
            HealthCare is a leading provider of innovative software solutions that empower businesses to thrive in the
            digital age.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Quick Links</h4>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Resources</h4>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Blog
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Documentation
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Support
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Community
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Legal</h4>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Cookie Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Security
          </Link>
        </div>
      </div>
      <div className="container max-w-7xl mt-12 flex items-center justify-between text-sm text-muted-foreground">
        <p>&copy; 2024 HealthCare. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

function MountainIcon(props: PropsWithChildren) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function XIcon(props: PropsWithChildren) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}