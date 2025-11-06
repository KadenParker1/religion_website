export default function Home() {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-800 mb-6">Scripture Finder</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome to Scripture Finder — explore, learn, and reflect on gospel topics.
        </p>
        <iframe
          className="mt-6 rounded-xl mx-auto"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="Intro video"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  