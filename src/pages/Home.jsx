export default function Home() {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-800 mb-6">Scripture Finder</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome to Scripture Finder — explore, learn, and reflect on gospel topics.
        </p>

        <div className="mt-6 relative pb-[56.25%] max-w-4xl mx-auto rounded-xl overflow-hidden">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/pj1TNrciyZc"
                title="Video on Revelation"
                allowFullScreen
            ></iframe>
        </div>
    </div>
    );
  }
  