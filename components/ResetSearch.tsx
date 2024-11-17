"use client"
import {MdClear} from "react-icons/md"
import Link from 'next/link'


const ResetSearch = () => {

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if (form) {
            form.reset();
        }
    }

    return (
        <Link href={`/`}>
            <button type={`reset`} onClick={reset}
                    className={`px-5 max-sm:px-3 py-3.5  text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-900 items-center flex  z-50`}>
                <MdClear size={20}/>
            </button>
        </Link>
    )
}

export default ResetSearch;