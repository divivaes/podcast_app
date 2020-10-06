import SQLite from 'react-native-sqlite-storage';

import {IDatabaseContract} from '../contracts/DatabaseContract';
import {PodcastModel} from '../models/PodcastModel';

export class SQliteService implements IDatabaseContract {
  private _db: SQLite.SQLiteDatabase;
  public isReady = false;

  constructor() {
    this._db = SQLite.openDatabase(
      {
        name: 'db.sqlite',
        location: 'Documents',
      },
      () => {
        console.log('DB successfully connected!');
        this.init();
      },
      (error) => {
        console.log('DB error on connecting - ', error);
      },
    );
  }

  private async init() {
    await this._db.executeSql(`
      CREATE TABLE IF NOT EXISTS podcasts (
        name VARCHAR(255),
        episodes_count INT DEFAULT 0,
        feed_url TEXT DEFAULT NULL,
        artist TEXT DEFAULT NULL,
        thumbnail TEXT DEFAULT NULL
      )
    `);

    this.isReady = true;
  }

  public getAllPodcast(): Promise<PodcastModel[]> {
    const podcasts: PodcastModel[] = [];

    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM podcasts ORDER BY name;',
          [],
          (tx, result) => {
            for (let i = 0; i < result.rows.length; i++) {
              const row = result.rows.item(i);

              podcasts.push(
                new PodcastModel({
                  name: row.name,
                  thumbnail: row.thumbnail,
                  artist: row.artist,
                  feedUrl: row.feed_url,
                  episodesCount: row.episodes_count,
                }),
              );
            }

            resolve(podcasts);
          },
          (error) => {
            reject(error);
          },
        );
      });
    });
  }

  public subscribeToPodcast(podcast: PodcastModel): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO podcasts (artist, episodes_count, feed_url, name, thumbnail) VALUES ($1, $2, $3, $4, $5)',
          [
            podcast.artist,
            podcast.episodesCount,
            podcast.feedUrl,
            podcast.name,
            podcast.thumbnail,
          ],
          () => {
            console.log('New podcast added');
            resolve();
          },
          (_, error) => {
            console.log('Error when inserting a new podcast - ', error);
            reject(error);
          },
        );
      });
    });
  }
}
