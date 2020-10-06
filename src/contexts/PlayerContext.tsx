import React from 'react';
import TrackPlayer, {
  State as TrackPlayerState,
  STATE_PAUSED,
  STATE_PLAYING,
  STATE_STOPPED,
  Track,
} from 'react-native-track-player';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (track?: Track) => void;
  pause: () => void;
  seekTo: (amount?: number | undefined) => void;
}

export const PlayerContext = React.createContext<PlayerContextType>({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  seekTo: () => null,
});

export const PlayerContextProvider: React.FC = (props) => {
  const [playerState, setPlayerState] = React.useState<null | TrackPlayerState>(
    null,
  );

  const [currentTrack, setCurrentTrack] = React.useState<null | Track>(null);

  React.useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-state',
      ({state}: {state: TrackPlayerState}) => {
        setPlayerState(state);
      },
    );

    return () => {
      listener.remove();
    };
  }, []);

  const play = async (track?: Track) => {
    if (!track) {
      if (currentTrack) {
        await TrackPlayer.play();
      }

      return;
    }

    if (currentTrack && track.id !== currentTrack.id) {
      await TrackPlayer.reset();
    }

    await TrackPlayer.add([track]);
    setCurrentTrack(track);
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const seekTo = async (amount = 30) => {
    const position = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(position + amount);
  };

  const value: PlayerContextType = {
    isPlaying: playerState === STATE_PLAYING,
    isPaused: playerState === STATE_PAUSED,
    isStopped: playerState === STATE_STOPPED,
    isEmpty: playerState === null,
    currentTrack,
    pause,
    play,
    seekTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => React.useContext(PlayerContext);
