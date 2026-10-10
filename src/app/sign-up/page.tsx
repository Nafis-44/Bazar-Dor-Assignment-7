'use client'

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";



const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string, image: string }
    console.log(user);
    const { data, error } = await authClient.signUp.email({
      ...user,
      // image:
      // callbackURL:"/"
    });
    if (data) {

      console.log(data)
      redirect("/")
    }
    if (error) {
      console.log(error);
      console.log(data)
    }

  }

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
    });

  }
  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });

  }



  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-base-100 px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-1">অ্যাকাউন্ট তৈরি করুন</h2>
      <p className="text-sm text-gray-500 text-center mb-6">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

      <form onSubmit={onSubmit} className="w-full max-w-md">
        <fieldset className="fieldset bg-white border border-gray-200 rounded-xl shadow-md p-6">

          <label className="label text-sm font-medium text-gray-700">নাম</label>
          <input type="text" name="name" className="input input-bordered w-full mb-3" placeholder=" নাম " />

          <label className="label text-sm font-medium text-gray-700">ইমেল</label>
          <input type="email" name="email" className="input input-bordered w-full mb-3" placeholder="ইমেল" />

          <label className="label text-sm font-medium text-gray-700">Image</label>
          <input type="text" name="image" className="input input-bordered w-full mb-3" placeholder=" image" />

          <label className="label text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
          <input type="password" name="password" className="input input-bordered w-full mb-4" placeholder="পাসওয়ার্ড" />

          <label className="label text-sm font-medium text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input type="password" className="input input-bordered w-full mb-4" placeholder="আবার লিখুন" />

          <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full">অ্যাকাউন্ট তৈরি করুন</button>
        </fieldset>
      </form>
      <button onClick={handleGoogleSignUp} className="btn">Sign In With Google</button>
      <button onClick={handleGitHubSignIn} className="btn">Sign In With GitHub</button>
    </div>
  );
};

export default SignUpPage;




