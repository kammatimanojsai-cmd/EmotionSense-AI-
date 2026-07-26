import StatsCard from "./StatsCard";
import { useRef, useState } from "react";
import axios from "axios";

import EmotionCard from "./EmotionCard";
import EmotionHistory from "./EmotionHistory";
import EmotionPieChart from "./EmotionPieChart";
import ConfidenceChart from "./ConfidenceChart";
import EmotionBarChart from "./EmotionBarChart";
import ExportCSV from "./ExportCSV";
import AISummary from "./AISummary";
import EmotionTimeline from "./EmotionTimeline";

type HistoryItem = {
  emotion: string;
  confidence: number;
  time: string;
};

function WebcamFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const intervalRef = useRef<number | null>(null);
  const isProcessing = useRef(false);

  const [emotion, setEmotion] = useState("Waiting");
  const [confidence, setConfidence] = useState(0);
  const [status, setStatus] = useState("🟢 Ready");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("--:--:--");
  const [detectionCount, setDetectionCount] = useState(0);
const [averageConfidence, setAverageConfidence] = useState(0);
const [dominantEmotion, setDominantEmotion] = useState("Waiting");

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const captureFrame = async () => {
    if (isProcessing.current) return;

    isProcessing.current = true;

    try {
      if (!videoRef.current) return;

      if (
        videoRef.current.videoWidth === 0 ||
        videoRef.current.videoHeight === 0
      ) {
        return;
      }

      const canvas = document.createElement("canvas");

canvas.width = videoRef.current.videoWidth;
canvas.height = videoRef.current.videoHeight;

const ctx = canvas.getContext("2d");

if (!ctx) return;

ctx.drawImage(
  videoRef.current,
  0,
  0,
  canvas.width,
  canvas.height
);

      const image = canvas.toDataURL("image/jpeg", 0.7);

      setLoading(true);
      setStatus("🟡 Analysing next frame...");

      const response = await axios.post(
        "http://127.0.0.1:8000/detect",
        {
          image,
        }
      );

      console.log(response.data);

     const detectedEmotion = response.data.emotion;
const detectedConfidence = Number(response.data.confidence);

const currentTime = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

      setEmotion(detectedEmotion);
      setConfidence(detectedConfidence);
      setLastUpdated(currentTime);
      setDetectionCount((prev) => prev + 1);

setHistory((prev) => {
  const updated = [
    {
      emotion: detectedEmotion,
      confidence: detectedConfidence,
      time: currentTime,
    },
    ...prev,
  ].slice(0, 10);

  // Average confidence
  const avg =
    updated.reduce((sum, item) => sum + item.confidence, 0) /
    updated.length;

  setAverageConfidence(avg);

  // Dominant emotion
  const counts: Record<string, number> = {};

  updated.forEach((item) => {
    counts[item.emotion] = (counts[item.emotion] || 0) + 1;
  });

  const dominant = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  setDominantEmotion(dominant);

  return updated;
});

      setLoading(false);
      setStatus("🟢 Updated");
    } catch (error) {
      console.error(error);

      setLoading(false);
      setStatus("🔴 Detection Failed");
    } finally {
      isProcessing.current = false;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

     intervalRef.current = window.setInterval(() => {
  captureFrame();
}, 100);
    } catch (error) {
      console.error(error);
      alert("Unable to access webcam.");
    }
  };

  const stopCamera = () => {
    if (!videoRef.current?.srcObject) return;

    const stream = videoRef.current.srcObject as MediaStream;

    stream.getTracks().forEach((track) => track.stop());

    videoRef.current.srcObject = null;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setEmotion("Waiting");
    setConfidence(0);
    setStatus("🟢 Ready");
    setLoading(false);
    setLastUpdated("--:--:--");
    setHistory([]);
    setDetectionCount(0);
setAverageConfidence(0);
setDominantEmotion("Waiting");
  };

return (
  <div className="flex flex-col items-center gap-8">

    {/* Stats */}
    <div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
     <StatsCard
  title="Dominant Emotion"
  value={dominantEmotion}
/>

<StatsCard
  title="Detections"
  value={detectionCount}
/>

<StatsCard
  title="Average Confidence"
  value={`${averageConfidence.toFixed(1)}%`}
/>
      <StatsCard
  title="Last Scan"
  value={lastUpdated}
/>
    </div>

    {/* Camera + Emotion Card */}
    <div className="flex gap-8 items-start flex-wrap justify-center">

      {/* Camera */}
      {/* Premium AI Camera */}
<div className="flex flex-col items-center">

  <div
    className="
      relative
      w-[520px]
      h-[380px]
      rounded-3xl
      overflow-hidden
      border
      border-[#D4AF37]
      bg-[#111111]
      shadow-[0_0_40px_rgba(212,175,55,0.25)]
    "
  >
    {/* Camera */}
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full h-full object-cover"
    />

    {/* Top Label */}
    <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40">
      <span className="text-[#D4AF37] font-semibold tracking-widest text-xs">
        AI VISION
      </span>
    </div>

    {/* Live Badge */}
    <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-red-500">
      <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
      <span className="text-red-400 text-xs font-semibold tracking-wider">
        LIVE
      </span>
    </div>

    {/* Scanning Line */}
    <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-pulse"></div>

    {/* Bottom Gradient */}
    <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/80 to-transparent"></div>

    {/* Footer */}
    <div className="absolute bottom-5 left-5">
      <p className="text-white text-sm font-semibold">
        EmotionSense AI
      </p>
      <p className="text-gray-400 text-xs">
        Real-Time Facial Emotion Recognition
      </p>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex gap-5 mt-8">

    <button
      onClick={startCamera}
      className="
        px-8
        py-3
        rounded-xl
        font-bold
        text-black
        bg-[#D4AF37]
        hover:bg-[#F4C430]
        transition-all
        duration-300
        hover:scale-105
        shadow-lg
      "
    >
      ▶ Start Camera
    </button>

    <button
      onClick={stopCamera}
      className="
        px-8
        py-3
        rounded-xl
        font-bold
        text-white
        bg-[#2A2A2A]
        border
        border-red-500
        hover:bg-red-600
        transition-all
        duration-300
        hover:scale-105
      "
    >
      ⏹ Stop Camera
    </button>

  </div>

</div>

      {/* Emotion Card */}
      <EmotionCard
        emotion={emotion}
        confidence={confidence}
        status={status}
        loading={loading}
        lastUpdated={lastUpdated}
      />

    </div>

    {/* Analytics */}
    <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">

      <EmotionHistory history={history} />

      <EmotionPieChart history={history} />

      <div className="w-full flex justify-center mt-8">
        <ConfidenceChart history={history} />
      </div>

      <div className="w-full flex justify-center mt-8">
        <EmotionBarChart history={history} />
      </div>

      <div className="w-full flex justify-center mt-8">
        <AISummary history={history} />
      </div>

      <div className="w-full flex justify-center mt-8">
        <ExportCSV history={history} />
      </div>

      <div className="w-full flex justify-center mt-8">
        <EmotionTimeline history={history} />
      </div>

    </div>

  </div>
);

}

export default WebcamFeed;