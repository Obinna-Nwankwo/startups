import {FaGithub} from "react-icons/fa";
import  { FcGoogle } from  "react-icons/fc"
import {signIn} from "@/auth";



export default function SignIn() {
    return (
        <div style={{height: 'calc(100vh - 150px)'}} className={`justify-center flex items-center`}>
            <div className="block justify-center items-center space-y-6">

                <form action={async () => {
                    'use server'
                    await signIn('google'  ,{redirectTo: '/'})
                }}>
                    <button type="submit" className={`flex items-center border border-blue-500 rounded`}>
                        <span className={`px-4 `}> <FcGoogle size={28}/></span>
                        <span className="py-2 px-8 bg-blue-500 text-white ">
                            Sign In with Google
                        </span>
                    </button>
                </form>

                <form action={async () => {
                    'use server'
                    await signIn('github', {redirectTo: '/'})
                }}>
                    <button className={`flex items-center border border-gray-800 rounded`} type="submit">
                        <span className={`px-4`}> <FaGithub size={28}/></span>
                        <span className=" py-2  px-8 bg-gray-800 text-white ">Sign In with GitHub</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

