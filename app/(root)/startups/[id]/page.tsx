import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUPS_ID_QUERIES } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUPS_ID_QUERIES, { id });

  if (!post) return notFound();

  return (
    <>
      <section className={`main_container !min-h-[230px]`}>
        <div>
          <p className={`tag`}>{formatDate(post?._createdAt)} </p>
          <h1 className={`heading`}>{post.title} </h1>
          <p className="sub_heading !max-w-5xl">{post.description} </p>
        </div>
      </section>

      <section className={`main_container`}>
        <div>
          <img
            src={post.image}
            alt="thumbnail"
            className={`rounded-xl w-full h-auto`}
          />
          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex justify-between gap-5 items-center">
              <Link
                href={`/user/${post.author?._id}`}
                className={`flex gap-2 items-center mb-3`}
              >
                
                  <img
                    src={post.author.image}
                    alt={"avatar"}
                  width={20}
                  height={60}
                    className={`rounded-full drop-shadow-lg`}
                  />

                
                    <p className="text-sm font-semibold">{post.author.name} </p>
                    <p className="text-sm font-medium text-gray-500">
                      @{post.author.username}
                    </p>
               
                
                
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
