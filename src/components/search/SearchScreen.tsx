import {useLazyQuery} from '@apollo/react-hooks';
import React from 'react';
import {FlatList, Image, StyleSheet, TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';

import {theme} from '../../constants/theme';
import {
  SearchQuery,
  SearchQueryVariables,
  SearchQuery_search,
} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';

const SearchScreen = () => {
  const [term, setTerm] = React.useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({variables: {term}});
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" my="sm">
        <TextInput
          style={s.input}
          placeholder="Search podcast"
          selectionColor={theme.color.blueLight}
          onChangeText={setTerm}
          autoCorrect={false}
          onSubmitEditing={onSearch}
          value={term}
        />
      </Box>

      <FlatList<SearchQuery_search>
        keyboardShouldPersistTaps="never"
        data={data?.search ?? []}
        style={s.listContentContainer}
        renderItem={({item}) => (
          <Box h={90} dir="row" align="center" px="sm">
            <Box h={70} w={70} bg="blueLight" radius={10} mr={10}>
              {item.thumbnail && (
                <Image style={s.img} source={{uri: item.thumbnail}} />
              )}
            </Box>
            <Box f={1}>
              <Text bold numberOfLines={1}>
                {item.podcastName}
              </Text>
              <Text size="xs">{item.artist}</Text>
              <Text size="xs" color="greyLight">
                {item.episodesCount} episodes
              </Text>
            </Box>
          </Box>
        )}
        keyExtractor={(item) => String(item.podcastName)}
      />
    </Box>
  );
};

const s = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    backgroundColor: theme.color.greyLightest,
    borderRadius: 10,
    paddingHorizontal: theme.space.sm,
    fontSize: theme.text.size.md,
  },
  listContentContainer: {
    minHeight: '100%',
    paddingBottom: 90,
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
});

export default SearchScreen;
