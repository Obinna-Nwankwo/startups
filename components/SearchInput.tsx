import React from "react";
import { FaSearchengin } from "react-icons/fa6";
import ResetSearch from "@/components/ResetSearch";

const SearchInput = ({ query }: { query?: string }) => {
  return (
    <form action={`/`} className={`search-form`}>
      <input
        className={`search-input`}
        placeholder={`search for startups and more ......`}
        name={`query`}
        defaultValue={query}
      />
      {query && <ResetSearch />}
      <button
        type={`submit`}
        className={`px-5 max-sm:px-3 py-2.5 text-white bg-slate-900 items-center flex`}
      >
        <FaSearchengin size={28} />
      </button>
    </form>
  );
};

export default SearchInput;
