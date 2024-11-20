import React from "react";
import Ping from "./Ping";
import { STARTUPS_VIEW_QUERIES } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { view: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEW_QUERIES, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ view: totalViews + 1 })
        .commit()
  );

  return (
    <div className={`view_container`}>
      <div className={`absolute -top-2 -right-2`}>
        <Ping />
      </div>

      <p className={`view_text`}>
        <span className={`font-bold`}>{totalViews} View(s)</span>
      </p>
    </div>
  );
};

export default View;
