import { ModeToggle } from '@/components/global/mode-toggle';
import { UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

type PropsType = {
  user?: null | User;
};

export default function navigation({ user }: PropsType) {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-50">
      <Link href={'/'} className="flex items-center gap-2">
        <Image
          src={'/assets/plura-logo.svg'}
          width={40}
          height={40}
          alt="plura logo"
        />
        <span className="text-xl font-bold"> Plura.</span>
      </Link>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={'#precos'}>Preços</Link>
          <Link href={'#'}>Sobre</Link>
          <Link href={'#'}>Documentação</Link>
          <Link href={'#'}>Recursos</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={'/agency'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
}
