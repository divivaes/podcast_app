import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, Text} from 'react-native-design-utility';

import {SearchQuery_search} from '../../types/graphql';

interface Props {
  item: SearchQuery_search;
}

const SearchList: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PodcastDetail', {data: props.item})}>
      <Box h={90} dir="row" align="center" px="sm">
        <Box h={70} w={70} bg="blueLight" radius={10} mr={10}>
          {props.item.thumbnail && (
            <Image style={s.img} source={{uri: props.item.thumbnail}} />
          )}
        </Box>
        <Box f={1}>
          <Text bold numberOfLines={1}>
            {props.item.podcastName}
          </Text>
          <Text size="xs" numberOfLines={1}>
            {props.item.artist}
          </Text>

          <Text size="xs" color="greyLight">
            {props.item.episodesCount} episodes
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 10,
  },
});

export default SearchList;
