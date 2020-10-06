import React from 'react';
import {IDatabaseContract} from '../contracts/DatabaseContract';
import {PodcastModel} from '../models/PodcastModel';
import {SQliteService} from '../services/sqliteService';

interface DatabaseContextProps {
  podcasts: PodcastModel[];
  subscribeToPodcast: (podcast: PodcastModel) => Promise<void>;
}

export const DatabaseContext = React.createContext<DatabaseContextProps>({
  podcasts: [],
  subscribeToPodcast: () => Promise.resolve(),
});

export const DatabaseProvider: React.FC = (props) => {
  const [podcasts, setPodcasts] = React.useState<PodcastModel[]>([]);

  const db = React.useRef<IDatabaseContract | null>(null);

  React.useEffect(() => {
    db.current = new SQliteService();
  }, []);

  React.useEffect(() => {
    if (db.current?.isReady) {
      (async () => {
        if (db.current) {
          const _podcasts = await db.current.getAllPodcast();
          setPodcasts(_podcasts);
        }
      })();
    }
  }, [db.current?.isReady]);

  const subscribeToPodcast = async (podcast: PodcastModel) => {
    if (db.current) {
      await db.current.subscribeToPodcast(podcast);

      const _podcasts = await db.current.getAllPodcast();

      setPodcasts(_podcasts);
    }
  };

  const value: DatabaseContextProps = {
    podcasts,
    subscribeToPodcast,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {props.children}
    </DatabaseContext.Provider>
  );
};
