'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';

const SinInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as { email: string, password: string }
    console.log(user);

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/"
    })
    if (data) {
      toast.success("Sign In Succenfully")
      console.log(data);
    }
    if (error) {
      toast.error("Something went Error")
      console.log(error);
    }

  }

  const handleGoogleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  }
  const handleGitHubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-base-100 px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-1">সাইন ইন</h2>
      <p className="text-sm text-gray-500 text-center mb-6">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

      <form className="w-full max-w-md " onSubmit={onSubmit}>
        <fieldset className="fieldset bg-white border border-gray-200 rounded-xl shadow-md p-6">



          <label className="label text-sm font-medium text-gray-700">ইমেল</label>
          <input type="email" name="email" className="input input-bordered w-full mb-3" placeholder="ইমেল" />

          <label className="label text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
          <input type="password" name="password" className="input input-bordered w-full mb-4" placeholder="পাসওয়ার্ড" />



          <button type='submit' className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full">অ্যাকাউন্ট তৈরি করুন</button>
        </fieldset>
      </form>
      <p>অথবা</p>
      <div className='flex items-center flex-cols gap-5'>
        <button onClick={handleGoogleSignUp} className="btn">Sign In With Google</button>
        <button onClick={handleGitHubSignIn} className="btn">Sign In With GitHub</button>
      </div>
    </div>
  );
};

export default SinInPage;