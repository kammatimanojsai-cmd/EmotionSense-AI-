import WebcamFeed from "./components/WebcamFeed";

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center py-12">

      <h1 className="text-6xl font-extrabold text-[#D4AF37] select-none tracking-wide">
        EmotionSense AI
      </h1>

      <p className="mt-4 text-lg text-gray-300 select-none">
        Real-Time Facial Emotion Recognition
      </p>

      <div className="mt-10">
        <WebcamFeed />
      </div>

    </div>
  );
}

export default App;