import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music2 } from 'lucide-react';

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.35;
    if (enabled && !muted) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [enabled, muted]);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="rounded-full border border-white/10 bg-white/10 p-2 backdrop-blur">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEnabled((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/60 ${enabled ? 'bg-blue-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
            aria-pressed={enabled}
            aria-label={enabled ? 'Disable background music' : 'Enable background music'}
          >
            <Music2 className="h-4 w-4" />
            {enabled ? 'On' : 'Off'}
          </button>
          <button
            onClick={() => setMuted((m) => !m)}
            disabled={!enabled}
            className="rounded-full p-2 text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/60 disabled:opacity-40"
            aria-label={muted ? 'Unmute music' : 'Mute music'}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_2f3125a0f3.mp3?filename=neon-gaming-128925.mp3" preload="none" />
    </div>
  );
}
