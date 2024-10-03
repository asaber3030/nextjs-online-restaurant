import Image from "next/image";

type Props = {
  label?: string
}
export const Error404 = ({ label = 'Error 404 - Not Found' }: Props) => {
  return ( 
    <div className="flex flex-col items-center justify-center gap-4">
      <Image src='/defaults/error404.svg' alt='Not Found' width={300} height={300} />
      <h1 className='text-2xl font-medium'>{label}</h1>
    </div>
  );
}