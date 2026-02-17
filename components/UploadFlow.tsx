
import React, { useState, useRef, useEffect } from 'react';
import { ICONS, COLORS } from '../constants';
import { generateAICaption } from '../services/geminiService';

interface UploadFlowProps {
  onCancel: () => void;
  onComplete: (data: any) => void;
}

type Step = 'source' | 'record' | 'trim' | 'music' | 'details' | 'uploading';

const UploadFlow: React.FC<UploadFlowProps> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState<Step>('source');
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (step === 'record') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 15) {
            setIsRecording(false);
            setStep('trim');
            return 15;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Please allow camera access to record.");
      setStep('source');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleGenerateCaption = async () => {
    setIsGenerating(true);
    const result = await generateAICaption("urban aesthetics cyberpunk neon future");
    setCaption(result);
    setIsGenerating(false);
  };

  const handleStartUpload = () => {
    setStep('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => onComplete({ caption, music: selectedMusic }), 800);
      }
      setProgress(p);
    }, 400);
  };

  const musicTracks = [
    { name: 'Neon Nights', artist: 'CyberCore', id: 'm1' },
    { name: 'Sleek Soul', artist: 'VibeStation', id: 'm2' },
    { name: 'Digital Rain', artist: 'LofiBones', id: 'm3' },
    { name: 'Fast Lane', artist: 'HyperPop', id: 'm4' }
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      {/* Dynamic Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black z-20">
        <button 
          onClick={() => {
            if (step === 'source') onCancel();
            else if (step === 'record') setStep('source');
            else if (step === 'trim') setStep('record');
            else if (step === 'music') setStep('trim');
            else if (step === 'details') setStep('music');
          }} 
          className="p-2 text-white/60 text-sm font-medium"
        >
          {step === 'source' ? 'Cancel' : 'Back'}
        </button>
        <span className="font-bold tracking-tight uppercase text-xs">
          {step === 'record' ? 'Recording' : step === 'trim' ? 'Edit Clip' : step === 'music' ? 'Add Sounds' : 'Post Video'}
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center overflow-y-auto no-scrollbar">
        {step === 'source' && (
          <div className="w-full max-w-sm flex flex-col gap-6 mt-12 px-6">
            <button 
              onClick={() => setStep('record')}
              className="aspect-video w-full glass rounded-2xl flex flex-col items-center justify-center gap-4 group hover:border-[#F033FF] transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-[#F033FF]/10 flex items-center justify-center text-[#F033FF]">
                <ICONS.Plus className="w-8 h-8" />
              </div>
              <span className="font-bold text-lg">Record on Sleek</span>
            </button>

            <button 
              onClick={() => setStep('details')}
              className="aspect-video w-full glass rounded-2xl flex flex-col items-center justify-center gap-4 group hover:border-[#2E5BFF] transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-[#2E5BFF]/10 flex items-center justify-center text-[#2E5BFF]">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10l5 5-5 5M4 4v7a4 4 0 004 4h12" /></svg>
              </div>
              <span className="font-bold text-lg">Upload from Device</span>
            </button>
          </div>
        )}

        {step === 'record' && (
          <div className="relative w-full h-full flex flex-col">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="flex-1 object-cover bg-gray-950" 
            />
            
            {/* Recording Progress Bar */}
            <div className="absolute top-4 left-4 right-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F033FF] transition-all duration-100" 
                style={{ width: `${(recordingTime / 15) * 100}%` }}
              />
            </div>

            <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-8">
              <div className="flex gap-12 items-center">
                <button className="text-white/60"><ICONS.Music className="w-6 h-6" /></button>
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-20 h-20 rounded-full border-4 ${isRecording ? 'border-white/50' : 'border-white'} flex items-center justify-center p-1.5 transition-all`}
                >
                  <div className={`w-full h-full rounded-full transition-all ${isRecording ? 'bg-[#F033FF] scale-75 rounded-lg' : 'bg-white'}`} />
                </button>
                <button className="text-white/60"><svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg></button>
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50">15s Limit</span>
            </div>
          </div>
        )}

        {step === 'trim' && (
          <div className="w-full max-w-sm flex flex-col gap-8 p-6">
            <div className="aspect-[9/16] w-full bg-gray-900 rounded-3xl overflow-hidden border border-white/10 relative">
               <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/20 tracking-tighter">Preview Clip</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm flex items-center gap-2"><ICONS.Scissors className="w-4 h-4 text-[#F033FF]" /> Trim Video</h4>
                <span className="text-[10px] text-white/40">0:00 / 0:15</span>
              </div>
              <div className="h-16 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden flex items-center px-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex-1 h-12 bg-gray-800 mx-0.5 rounded-sm opacity-50" />
                ))}
                <div className="absolute left-4 right-12 top-1 bottom-1 border-y-2 border-x-8 border-[#F033FF] rounded-md pointer-events-none" />
              </div>
            </div>

            <button 
              onClick={() => setStep('music')}
              className="w-full py-4 bg-[#F033FF] rounded-2xl font-bold text-white shadow-[0_0_20px_rgba(240,51,255,0.3)]"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'music' && (
          <div className="w-full max-w-sm flex flex-col gap-6 p-6">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <ICONS.Search className="w-5 h-5 text-white/30" />
              <input type="text" placeholder="Search sounds..." className="bg-transparent outline-none flex-1 text-sm" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Popular on Sleek</h4>
              {musicTracks.map(track => (
                <button 
                  key={track.id}
                  onClick={() => setSelectedMusic(track.name)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedMusic === track.name ? 'bg-[#2E5BFF]/10 border-[#2E5BFF]' : 'bg-white/5 border-transparent hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <ICONS.Music className="w-5 h-5 text-[#2E5BFF]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{track.name}</div>
                      <div className="text-[10px] text-white/40">{track.artist}</div>
                    </div>
                  </div>
                  {selectedMusic === track.name && <div className="w-2 h-2 rounded-full bg-[#2E5BFF]" />}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep('details')}
              disabled={!selectedMusic}
              className="w-full py-4 bg-[#2E5BFF] rounded-2xl font-bold text-white disabled:opacity-50 mt-4"
            >
              Select & Continue
            </button>
          </div>
        )}

        {step === 'details' && (
          <div className="w-full max-w-sm flex flex-col gap-6 p-6">
            <div className="flex gap-4">
               <div className="aspect-[3/4] w-28 bg-gray-900 rounded-xl overflow-hidden border border-white/10 relative flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white/20 font-bold uppercase">Thumbnail</div>
               </div>
               <div className="flex-1 flex flex-col justify-center gap-2">
                  <div className="text-xs font-bold text-[#F033FF]">Selected Music</div>
                  <div className="text-sm font-medium">{selectedMusic || 'Original Audio'}</div>
                  <button onClick={() => setStep('music')} className="text-[10px] text-white/40 underline text-left">Change sound</button>
               </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Caption</label>
              <div className="relative">
                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tell your story..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#2E5BFF] outline-none resize-none"
                />
                <button 
                  onClick={handleGenerateCaption}
                  disabled={isGenerating}
                  className="absolute bottom-3 right-3 px-3 py-1.5 glass rounded-lg text-[10px] font-bold text-[#2E5BFF] flex items-center gap-1.5 hover:bg-white/10"
                >
                  {isGenerating ? (
                    <div className="w-2 h-2 border-2 border-[#2E5BFF] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="text-lg leading-none">✨</span>
                  )}
                  AI Hint
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white/60">Drafts</button>
              <button 
                onClick={handleStartUpload}
                className="flex-1 py-4 bg-[#2E5BFF] rounded-xl font-bold text-white shadow-[0_0_20px_rgba(46,91,255,0.3)] transition-transform active:scale-95"
              >
                Post Video
              </button>
            </div>
          </div>
        )}

        {step === 'uploading' && (
          <div className="w-full max-w-sm flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-48 h-48 relative mb-12">
               <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
                 <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#2E5BFF" strokeWidth="2" 
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    className="transition-all duration-300"
                    strokeLinecap="round"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black italic tracking-tighter">{Math.round(progress)}%</span>
               </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Publishing to Sleek</h3>
            <p className="text-white/40 text-sm">Uploading and transcoding...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFlow;
