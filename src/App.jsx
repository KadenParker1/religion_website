import { useState } from "react";
import { supabase } from './supabase'

const tagOptions = [
  "agency","atonement","belief","blessings","charity","christ","cleansing",
  "comfort","compassion","confidence","conversion","courage","covenant","creation",
  "devotion","diligence","discipleship","endurance","example","faith","fasting",
  "fear","focus","forgiveness","foundation","goodness","grace","gratitude","guidance",
  "hope","humility","initiative","jesus","joy","kindness","life","light","love",
  "meekness","mercy","miracles","missionary","obedience","overcoming","patience",
  "peace","perseverance","persistence","plan","power","praise","prayer","priorities",
  "protection","providence","purpose","renewal","repentance","rest","revelation",
  "reverence","righteousness","salvation","scripture","service","stillness","strength",
  "suffering","trials","trust","truth","unity","weakness","wisdom","worship"
];

//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

export default function App() {
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  
    if (value === "") {
      setFilteredTags([]);
    } else {
      const filtered = tagOptions.filter(tag => tag.includes(value));
      setFilteredTags(filtered);
    }
  };
  
  const handleTagClick = (tag) => {
    setQuery(tag);
    setFilteredTags([]); // close dropdown
  };

  const cards = [
    { id: 1, title: "What is revelation?", content: "According to LDS Gospel Topics, 'Revelation is communication from God to his children'." },
    { id: 2, title: "Where does revelation come from?", content: "Revelation comes from the Holy Ghost as seen in DC 8: Yea, behold, I will tell you in your mind and in your heart, by the Holy Ghost, which shall come upon you and which shall dwell in your heart. Now, behold, this is the spirit of revelation; behold, this is the spirit by which Moses brought the children of Israel through the Red Sea on dry ground." },
    { id: 3, title: "What did Joseph Smith do when he had a question?", content: "As the restoration Proclamation states:, Two hundred years ago, on a beautiful spring morning in 1820, young Joseph Smith, seeking to know which church to join, went into the woods to pray near his home in upstate New York, USA. He had questions regarding the salvation of his soul and trusted that God would direct him." },
    { id: 4, title: "From what mortal has the most number of pages of scripture come from?", content: "According to Elder Maxwell in 'Joseph Smith a Choice Seer', he states 'From Joseph, one unlearned and untrained in theology, more printed pages of scripture have come to us than from any other mortal- more than the combined pages of Moses, Paul, Luke, and Mormon'. " },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setResult("Loading...");
    try {
      const {data, error}= await supabase
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
    
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 text-gray-900 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800 drop-shadow-sm">
        Scripture Finder</h1>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="px-3 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 text-sm"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search something..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-80"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* API result */}
      {result && (
        <div className="bg-white shadow p-4 rounded-lg mb-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">API Response:</h2>
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setExpanded(expanded === card.id ? null : card.id)}
            className={`cursor-pointer bg-white shadow-md rounded-2xl p-6 transition-all duration-200 ${
              expanded === card.id ? "ring-2 ring-indigo-400" : "hover:shadow-xl"
            }`}

          >
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            {expanded === card.id && (
              <p className="text-gray-700 mt-2">{card.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
