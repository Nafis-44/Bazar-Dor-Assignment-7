'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserInfo = () => {
    const { data: sesson } = authClient.useSession();
    const user = sesson?.user
    console.log(user);

    const handleSignOut = async () => {
        await authClient.signOut();
    }
    return (
        <div>
            {
                user ? <div className='flex items-center flex-col gap-2 mt-3'>
                    <Link href={'/profile'}> <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                            <Image alt="Tailwind-CSS-Avatar-component"
                                width={20} height={20}
                                src={user?.image as string || "/nafis.avif"} />
                        </div>
                    </div>
                    </Link>
                    <h2>{user?.name}</h2>
                    <button onClick={handleSignOut} className='btn btn-accent btn-xs'>SignOut</button>
                </div> :
                    <div className="justify-between  items-center gap-2 flex">
                        <Link
                            href="/sign-in"
                            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="rounded-full bg-[#05893E] px-5 py-2 text-sm font-semibold text-white transition "
                        >
                            সাইন আপ
                        </Link>
                    </div>
            }

        </div>
    );
};

export default UserInfo;