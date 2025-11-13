import { useState } from "react";
import { supabase } from "../supabase";

const tagOptions = [/* your tag list here */];

export default function Ai_search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFilteredTags(
      value ? tagOptions.filter((tag) => tag.includes(value)) : []
    );
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
    setFilteredTags([]);
  };

  const handleAi_Search = async (e) => {
    e.preventDefault();
    setResult("Loading...");
    try {
      const { data, error } = await supabase
        .from("scriptures")
        .select("*")
        .contains("tags", [query.toLowerCase()]);
      if (error) throw error;
      if (!data.length) {
        setResult("No verses found for that topic.");
        return;
      }
      const randomVerse = data[Math.floor(Math.random() * data.length)];
      setResult(`${randomVerse.reference}: ${randomVerse.verse}`);
    } catch (err) {
      setResult("Error fetching API: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Enter a Topic You Want Scriptures On</h2>
      <form onSubmit={handleAi_Search} className="flex justify-center gap-2 mb-4">
        <input
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-80"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Ai_search
        </button>
      </form>

      {/* Tag Suggestions */}
      {filteredTags.length > 0 && (
        <div className="bg-white shadow rounded-lg p-2">
          {filteredTags.map((tag) => (
            <div
              key={tag}
              className="cursor-pointer hover:bg-indigo-100 p-1 rounded"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      {/* API Result */}
      {result && (
        <div className="bg-white shadow p-25 rounded-lg mt-4 text-left w-full">
          <h3 className="font-semibold mb-2 text-2xl">Result:</h3>
          <p className="text-lg">{result} </p>
        </div>
      )}
    </div>
  );
}
