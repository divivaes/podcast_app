import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {FlatList, Image, StyleSheet} from 'react-native';
import {SearchStackRouteParamList} from '../../navigators/types';

type NavigationParam = RouteProp<SearchStackRouteParamList, 'PodcastDetail'>;

const PodcastDetailScreen = () => {
  const {data} = useRoute<NavigationParam>().params ?? {};

  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {data.thumbnail && (
                <Box mr={10}>
                  <Image source={{uri: data.thumbnail}} style={s.thumbnail} />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold>
                  {data.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {data.artist}
                </Text>
                <Text size="xs" color="blueLight">
                  Subscribed
                </Text>
              </Box>
            </Box>
            <Box px="sm" mb="md">
              <Text>Play latest episodes</Text>
            </Box>
            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>
          </>
        }
        data={[{id: '1'}, {id: '2'}]}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="xs">
            <Box
              style={{height: StyleSheet.hairlineWidth}}
              bg="greyLighter"></Box>
          </Box>
        )}
        renderItem={() => (
          <Box px="sm">
            <Text size="xs" color="grey">
              Friday
            </Text>
            <Text bold>#400 - The title of podcast</Text>
            <Text size="sm" color="grey" numberOfLines={2}>
              "The Bouqs Company solved the supply chain problem by cutting out
              the wholesaler, which means larger margins for the farmers and
              fresher flowers for the customer. The company designs the
              arrangements that are then put together by the flower farmers and
              shipped directly to the consumer two to four days after the
              flowers are cut instead of up to two weeks with the traditional
              system. They deliver nationally.
            </Text>
            <Text size="xs" color="grey">
              2hrs 49min
            </Text>
          </Box>
        )}
        keyExtractor={(item) => item.id}></FlatList>
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
