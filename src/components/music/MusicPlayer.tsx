"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./music.module.css";

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/**
 * Reusable audio preview player: play/pause, seekable progress, current time,
 * duration and volume. With no `src` it renders a "Coming Soon" state instead
 * of a broken player. Audio loads only when the listener presses play.
 */
export function MusicPlayer({
  src,
  type,
  title,
  compact = false,
}: {
  src: string | null | undefined;
  type?: string;
  title: string;
  compact?: boolean;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audio.current) audio.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  if (!src) {
    return (
      <div className={`${styles.playerEmpty} ${compact ? styles.playerCompact : ""}`} role="note">
        <Icon name="headphones" size={20} />
        <span>
          <strong>Preview coming soon</strong>
          <span className={styles.playerEmptySub}>Audio will be available here once it&apos;s ready.</span>
        </span>
      </div>
    );
  }

  const toggle = async () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
      } catch {
        setError(true);
      }
    } else el.pause();
  };

  return (
    <div className={`${styles.player} ${compact ? styles.playerCompact : ""}`} aria-label={`Audio preview: ${title}`} role="group">
      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setError(true)}
      >
        <source src={src} type={type} />
      </audio>

      <button type="button" className={styles.playBtn} onClick={toggle} aria-label={playing ? `Pause ${title}` : `Play ${title}`} disabled={error}>
        <Icon name={playing ? "pause" : "play"} size={20} strokeWidth={2.2} />
      </button>

      <div className={styles.track}>
        <input
          type="range"
          className={styles.progress}
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          onChange={(e) => {
            const t = Number(e.target.value);
            if (audio.current) audio.current.currentTime = t;
            setTime(t);
          }}
          aria-label="Seek"
          aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
          style={{ ["--pct" as string]: duration ? `${(time / duration) * 100}%` : "0%" }}
          disabled={error || !duration}
        />
        <div className={styles.times}>
          <span>{fmt(time)}</span>
          <span>{error ? "Preview unavailable" : fmt(duration)}</span>
        </div>
      </div>

      {!compact && (
        <div className={styles.volume}>
          <button type="button" className={styles.muteBtn} onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute" : "Mute"}>
            <Icon name={muted || volume === 0 ? "volume-off" : "volume"} size={18} />
          </button>
          <input
            type="range"
            className={styles.volumeRange}
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setMuted(false);
            }}
            aria-label="Volume"
            style={{ ["--pct" as string]: `${(muted ? 0 : volume) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
