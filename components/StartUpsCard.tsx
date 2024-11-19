import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { Author, Startups } from "@/sanity/types";

export type StartUpsTypeCard = Omit<Startups, "author"> & { author?: Author };
const StartUpsCard = ({ post }: { post: StartUpsTypeCard }) => {
  const {
    _id,
    title,
    category,
    image,
    description,
    views,
    author,
    _createdAt,
  } = post;

  return (
    <li
      className={`ring-2 ring-slate-500 rounded-xl p-4 bg-slate-50 shadow-2xl hover:bg-yellow-100/60 hover:ring-4 hover:transition-shadow `}
    >
      <div className="flex justify-between">
        <p>{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5 items-center">
          <FaRegEye className={`text-slate-500`} />
          <span className={`text-sm font-medium`}>{views}</span>
        </div>
      </div>

      <div className="flex justify-between gap-5 mt-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="line-clamp-1 font-medium text-sm">{author?.name}</p>
          </Link>
          <Link href={`/startups/${_id}`}>
            <h3 className="line-clamp-1 font-bold text-lg">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={`https://placeholder.co/48x48`}
            alt="placeholder"
            width={48}
            height={48}
            className={`rounded-full`}
          />
        </Link>
      </div>

      <Link href={`/startups/${_id}`}>
        <p className="line-clamp-1 text-sm my-2">{description}</p>
        <img src={image} alt="placeholder" className={`rounded-xl`} />
      </Link>

      <div className="flex justify-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className={`text-sm font-medium`}>{category}</p>
        </Link>

        <button
          className={`bg-slate-900 dark:bg-white text-white dark:text-gray-900 px-2  py-1 rounded-3xl text-xs`}
        >
          <Link href={`/startups/${_id}`}>Details</Link>
        </button>
      </div>
    </li>
  );
};

// @ts-ignore
export default StartUpsCard;
