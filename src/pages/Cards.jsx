import { useState } from "react";

export default function Cards() {
  const [expanded, setExpanded] = useState(null);
  const cards = [
    { id: 1, title: "What is revelation?", content: "According to LDS Gospel Topics, 'Revelation is communication from God to his children'." },
    { id: 2, title: "Where does revelation come from?", content: "Revelation comes from the Holy Ghost as seen in DC 8: Yea, behold, I will tell you in your mind and in your heart, by the Holy Ghost, which shall come upon you and which shall dwell in your heart. Now, behold, this is the spirit of revelation; behold, this is the spirit by which Moses brought the children of Israel through the Red Sea on dry ground."},
    { id: 3, title: "What did Joseph Smith do when he had a question?", content: "As the restoration Proclamation states:, Two hundred years ago, on a beautiful spring morning in 1820, young Joseph Smith, seeking to know which church to join, went into the woods to pray near his home in upstate New York, USA. He had questions regarding the salvation of his soul and trusted that God would direct him." },
    { id: 4, title: "From what mortal has the most pages of scripture come?", content: "According to Elder Maxwell in 'Joseph Smith a Choice Seer', he states 'From Joseph, one unlearned and untrained in theology, more printed pages of scripture have come to us than from any other mortal- more than the combined pages of Moses, Paul, Luke, and Mormon'. " },
  ];

  return (
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
  );
}
