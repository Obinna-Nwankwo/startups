import Image from "next/image";
import Link from "next/link";
import {auth, signOut} from "@/auth";
import { LuSun } from  "react-icons/lu"

const Navbar = async () => {

    const session = await auth();
    return (
        <>

            <header className={`bg-white px-24 py-6 shadow-2xl font-work-sans`}>
                <nav className={`flex justify-between items-center`}>
                    <Link href={`/public`}>
                        <Image src={`/logo.png`} alt='logo' width={50} height={30}/>
                    </Link>


                    <div className={`flex items-center gap-6`}>
                        <div>
                            <LuSun />
                        </div>

                        {session && session?.user ? (
                            <>
                                <Link href={`/startups/create`}>
                                    <span>Create</span>
                                </Link>

                                <Link href={`/user/${session?.id}`}>
                                <span>
                                    {session?.user?.name}
                                </span>
                                </Link>

                                <form action={async () => {
                                    'use server'
                                    await signOut({redirectTo: '/'})
                                }}>
                                    <button type={'submit'} className={`bg-slate-900 text-white`}>
                                        Sign Out
                                    </button>
                                </form>
                            </>
                        ) : <Link href={`/sign-in`} className={`bg-slate-900 text-white`}>
                            <span>Sign In</span>
                        </Link>}

                    </div>

                </nav>
            </header>
        </>
    )
}

export default Navbar;