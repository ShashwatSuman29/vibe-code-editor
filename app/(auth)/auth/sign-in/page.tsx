import React from 'react'
import Image from 'next/image'
import SignInFormClient from '@/modules/auth/components/sign-in-form-client';

function page() {
  return (
    <>
    <Image src={"/login.svg"} alt='Login-Image' height={200} width={200} />
    <SignInFormClient />
    </>
  )
}

export default page;