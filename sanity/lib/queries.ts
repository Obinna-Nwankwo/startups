import { defineQuery } from "groq";

export const STARTUPS_QUERIES =
  defineQuery(`*[_type ==  'startups' && defined(slug.current)] | order(_createdAt desc ){
        _id,
            title,
            category,
            views,
            description,
            _createdAt,
            slug,
            image,
            author -> {
                _id,
                    name,
                    image,
                    bio
            }
    }`);
