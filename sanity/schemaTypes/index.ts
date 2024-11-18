import { type SchemaTypeDefinition } from "sanity";
import { author } from "@/sanity/schemaTypes/author";
import { startups } from "@/sanity/schemaTypes/startups";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startups],
};
