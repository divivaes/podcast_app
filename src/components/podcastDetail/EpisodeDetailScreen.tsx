import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Linking, ScrollView} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {FeedQuery_feed, SearchQuery_search} from '../../types/graphql';
import {theme} from '../../constants/theme';
import {usePlayerContext} from '../../contexts/PlayerContext';
import HtmlReader from '../HtmlReader';

const EpisodeDetailScreen = () => {
  const playerContext = usePlayerContext();
  const routeParam = (useRoute().params ?? {}) as {
    episode: FeedQuery_feed;
    podcast: SearchQuery_search;
  };

  return (
    <Box bg="white" f={1}>
      <ScrollView>
        <Box px="sm" mt="sm">
          <Box dir="row">
            <Box h={60} w={60} radius={10} mr={10} style={{overflow: 'hidden'}}>
              <Image
                source={{
                  uri: routeParam.episode.image ?? routeParam.podcast.thumbnail,
                }}
                style={{flex: 1}}
              />
            </Box>
            <Box f={1}>
              <Text weight="bold" size="sm">
                {routeParam.episode.title}
              </Text>
            </Box>
            <Box w={30} />
          </Box>

          <Box dir="row" mt="sm" mb="sm" align="center">
            <TouchableOpacity
              onPress={() => {
                playerContext.play({
                  title: routeParam.episode.title,
                  artwork:
                    routeParam.episode.image ?? routeParam.podcast.thumbnail,
                  id: routeParam.episode.linkUrl,
                  url: routeParam.episode.linkUrl,
                  artist: routeParam.podcast.artist,
                });
              }}>
              <FeatherIcon name="play" size={30} color={theme.color.black} />
              <Box>
                <Text weight="bold" size="sm">
                  Play
                </Text>
                <Text color="grey" size="xs">
                  {routeParam.episode.duration}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>

          <Box bg="greyLight" h={1} mb="sm" />

          <Box>
            <Text size="xl" weight="bold">
              Episode Notes
            </Text>
            <HtmlReader html={routeParam.episode.description} />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default EpisodeDetailScreen;
