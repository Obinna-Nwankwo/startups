import { defineQuery } from "groq";

export const STARTUPS_QUERIES =
  defineQuery(`*[_type ==  'startups' && defined(slug.current) && !defined($search) || title match $search || category match search || author-> match $search ] | order(_createdAt desc ){
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

export const STARTUPS_ID_QUERIES =
  defineQuery(`*[_type ==  'startups' && _id == $id][0]{
    _id, 
    title, 
    category, 
    views, 
    description, 
    _createdAt, 
    slug, 
    image, 
    pitch,
    author -> {
      _id, 
      name, 
      username,
      image, 
      bio
    }
}
`);

export const STARTUPS_VIEW_QUERIES = defineQuery(`
    *[_type == 'startups' && _id == $id][0] {
     _id: views,
    }`);

export const AUTHOR_ID_QUERY = defineQuery(`
      *[_type == 'author' && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
        }
`);
