import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUPS_ID_QUERIES } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUPS_ID_QUERIES, { id });

  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className={`main_container !min-h-[300px]`}>
        <div>
          <p className={`tag`}>{formatDate(post?._createdAt)} </p>
          <h1 className={`heading`}>{post.title} </h1>
          <p className="sub_heading !max-w-5xl">{post.description} </p>
        </div>
      </section>

      <section className={`section_container`}>
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
                <div className="rounded-full border-4 h-12 w-12 drop-shadow-lg overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={"avatar"}
                    width={40}
                    height={80}
                    className={`w-full h-full`}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold ">{post.author.name} </p>
                  <p className="text-sm font-medium text-gray-500">
                    @{post.author.username}
                  </p>
                </div>
              </Link>

              <p
                className={`category_tag `}
              >
                {post.category}
              </p>
            </div>

            <h3 className={`text-2xl font-bold`}>Pitch Details</h3>
            {parsedContent ? (
              <article
                className={`prose max-w-4xl font-sans break-all`}
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className={`search_no_result`}>No details provided</p>
            )}
          </div>

          <hr className={`divide-x-2 h-px bg-gray-800 my-8 rounded-full`} />

          <Suspense fallback={<Skeleton className={`view_skeleton`} />}>
            <View id={id} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Page;
