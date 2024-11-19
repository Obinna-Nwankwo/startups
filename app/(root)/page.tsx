import SearchInput from "@/components/SearchInput";
import StartUpsCard, { StartUpsTypeCard } from "@/components/StartUpsCard";
import { STARTUPS_QUERIES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERIES,
    params,
  });

  return (
    <>
      <section className={`main_container`}>
        <div>
          <h1 className={`heading `}>
            Find a Start-Ups, <br /> and Connect with Entrepreneurs
          </h1>
          <p className={`sub_heading `}>
            Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
            Competition
          </p>
          <SearchInput query={query} />
        </div>
      </section>
      <section className={`section_container font-sans `}>
        <div>
          <p className={`text-2xl font-bold py-6`}>
            {query ? `Search result for "${query}"` : "All Startups"}
          </p>

          <ul className={`card_container mt-7`}>
            {posts?.length > 0 ? (
              posts.map((post: StartUpsTypeCard) => (
                <StartUpsCard key={post?._id} post={post} />
              ))
            ) : (
              <p className={`search_no_results`}>No StartUp found</p>
            )}
          </ul>
        </div>
      </section>

      <SanityLive />
    </>
  );
}
