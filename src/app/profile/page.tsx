// 'use client'

// import { authClient } from "@/lib/auth-client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// const ProfilePage = () => {
//     const { data: sesson } = authClient.useSession();
//     const user = sesson?.user
//     console.log(user);

//     const [show, setShow] = useState(false)

//     const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
//         e.preventDefault()
//         const formData = new FormData(e.target);
//         const userData = Object.fromEntries(formData.entries()) as { name: string, image: string }
//         await authClient.updateUser({
//             ...userData,

//         })



//     }
//     const handleShowForm = () => {
//         setShow(!show)
//     }
//     return (
//         <div className="card mt-5 flex items-center">
//             <Link href={'/profile'}> <div className="avatar">
//                 <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
//                     <Image alt="Tailwind-CSS-Avatar-component"
//                         width={20} height={20}
//                         src={user?.image as string || "https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg"} />
//                 </div>
//             </div>
//             </Link>
//             <h2>{user?.name}</h2>
//             <p>{user?.email}</p>
//             <button onClick={handleShowForm} className="btn">EDit Profile</button>

//             {show && <form onSubmit={handleUpdateProfile} className="w-full max-w-md">
//                 <fieldset className="fieldset bg-white border border-gray-200 rounded-xl shadow-md p-6">

//                     <label className="label text-sm font-medium text-gray-700">নাম</label>
//                     <input type="text" name="name" className="input input-bordered w-full mb-3" placeholder=" নাম " />



//                     <label className="label text-sm font-medium text-gray-700">Image</label>
//                     <input type="text" name="image" className="input input-bordered w-full mb-3" placeholder=" image" />



//                     <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full">আপডেট </button>
//                 </fieldset>
//             </form>}

//         </div>
//     );
// };

// export default ProfilePage;












'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [show, setShow] = useState(false);

    const handleUpdateProfile = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(
            formData.entries()
        ) as { name: string; image: string };

        await authClient.updateUser({
            name: userData.name,
            image: userData.image,
        });
    };

    return (
        <div className="min-h-[70vh] bg-white px-4 py-10">
            <div className="mx-auto w-full max-w-3xl">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        আমার প্রোফাইল
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        আপনার ব্যক্তিগত তথ্য দেখুন এবং পরিবর্তন করুন।
                    </p>
                </div>

                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/profile">
                            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-emerald-600 p-1">
                                <Image
                                    src={
                                        user?.image ||
                                        "https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg"
                                    }
                                    alt="User Profile"
                                    width={20} height={20}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                        </Link>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {user?.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="rounded-lg border border-emerald-600 px-5 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                    >
                        {show ? "বন্ধ করুন" : "Edit Profile"}
                    </button>
                </div>

                {show && (
                    <form onSubmit={handleUpdateProfile} className="w-full">
                        <fieldset className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                নাম
                            </label>

                            <input
                                type="text"
                                name="name"
                                defaultValue={user?.name || ""}
                                required
                                className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600"
                                placeholder="আপনার নাম লিখুন"
                            />

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Image URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                defaultValue={user?.image || ""}
                                className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600"
                                placeholder="Image URL দিন"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-[#168f89] py-3 font-medium text-white transition hover:bg-[#117a75]"
                            >
                                আপডেট
                            </button>
                        </fieldset>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
