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
                                src={user?.image as string || "https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg"} />
                        </div>
                    </div>
                    </Link>
                    <h2>{user?.name}</h2>
                    <button onClick={handleSignOut} className='btn btn-accent btn-xs'>SignOut</button>
                </div> :
                    <div className="hidden items-center gap-2 lg:flex">
                        <Link
                            href="/sign-in"
                            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="rounded-full bg-green-400 px-5 py-2 text-sm font-semibold text-gray-900 transition "
                        >
                            সাইন আপ
                        </Link>
                    </div>
            }

        </div>
    );
};

export default UserInfo;