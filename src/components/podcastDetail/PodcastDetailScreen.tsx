import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import feedQuery from '../../graphql/query/feedQuery';
import {FeedQuery, FeedQueryVariables} from '../../types/graphql';
import {SearchStackRouteParamList} from '../../navigators/types';
import {theme} from '../../constants/theme';
import {useQuery} from '@apollo/react-hooks';
import {getWeekDay, humanDuration} from '../../lib/dateTimeHelper';
import {usePlayerContext} from '../../contexts/PlayerContext';

type NavigationParam = RouteProp<SearchStackRouteParamList, 'PodcastDetail'>;

const PodcastDetailScreen = () => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation();
  const {data: podcastData} = useRoute<NavigationParam>().params ?? {};

  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  });

  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {podcastData.thumbnail && (
                <Box mr={10}>
                  <Image
                    source={{uri: podcastData.thumbnail}}
                    style={s.thumbnail}
                  />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold>
                  {podcastData.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {podcastData.artist}
                </Text>
                <Text size="xs" color="blueLight">
                  Subscribed
                </Text>
              </Box>
            </Box>
            <Box px="sm" mb="md" dir="row" align="center">
              <Box mr="xs">
                <TouchableOpacity
                  onPress={() => {
                    const el = data?.feed[0];

                    if (!el) {
                      return;
                    }

                    playerContext.play({
                      title: el.title,
                      thumbnail: el.image ?? podcastData.thumbnail,
                      id: el.linkUrl,
                      url: el.linkUrl,
                      artist: podcastData.artist,
                    });
                  }}>
                  <FeatherIcon
                    name="play"
                    size={30}
                    color={theme.color.black}
                  />
                </TouchableOpacity>
              </Box>
              <Box f={1}>
                <Text bold>Play</Text>
                <Text size="sm">{data?.feed[0].title}</Text>
              </Box>
            </Box>
            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>

            {loading && (
              <Box h={200} center>
                <ActivityIndicator size="large" color={theme.color.black} />
              </Box>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="xs">
            <Box
              style={{height: StyleSheet.hairlineWidth}}
              bg="greyLighter"></Box>
          </Box>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EpisodeDetail', {
                episode: item,
                podcast: podcastData,
              })
            }>
            <Box px="sm">
              <Text size="xs" color="grey">
                {getWeekDay(new Date(item.pubDate)).toUpperCase()}
              </Text>
              <Text bold>{item.title}</Text>
              <Text size="sm" color="grey" numberOfLines={2}>
                {item.summary}
              </Text>
              <Text size="xs" color="grey">
                {humanDuration(item.duration)}
              </Text>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.linkUrl}></FlatList>
    </Box>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default PodcastDetailScreen;
