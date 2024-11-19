import {defineQuery} from "groq";

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

export const STARTUPS_ID_QUERIES = defineQuery(`*[_type ==  'startups' && _id == $id][0]{
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
}
`)
