import Link from 'next/link';
import { ReactNode } from 'react';
import { useAuth } from '../lib/firebase';



interface Props {
    children?: ReactNode
    // any props that come into the component
}
// Component's children only shown to logged-in users
const AuthCheck=({children}:Props)=> {
const auth =useAuth();

  return auth?.userId?.uid ? children :  <Link href="/enter">You must be signed in</Link>;
}

export default AuthCheck;
