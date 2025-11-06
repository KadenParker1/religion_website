import { useState } from "react";

export default function Cards() {
  const [expanded, setExpanded] = useState(null);
  const cards = [
    { id: 1, title: "What is revelation?", content: "..." },
    { id: 2, title: "Where does revelation come from?", content: "..." },
    { id: 3, title: "What did Joseph Smith do when he had a question?", content: "..." },
    { id: 4, title: "From what mortal has the most pages of scripture come?", content: "..." },
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
