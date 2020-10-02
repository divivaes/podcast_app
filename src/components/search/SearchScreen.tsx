import {useLazyQuery} from '@apollo/react-hooks';
import React from 'react';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {theme} from '../../constants/theme';
import {
  SearchQuery,
  SearchQueryVariables,
  SearchQuery_search,
} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';
import SearchEmpty from './SearchEmpty';
import SearchList from './SearchList';
import SearchLoading from './SearchLoading';

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
        <Box
          dir="row"
          align="center"
          h={40}
          bg="greyLightest"
          radius={10}
          px="sm">
          <Box mr={10}>
            <FeatherIcon name="search" size={20} color={theme.color.greyDark} />
          </Box>
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
      </Box>

      {error ? (
        <Box f={1} center>
          <Text color="red">{error.message}</Text>
        </Box>
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          data={data?.search ?? []}
          style={s.listContentContainer}
          ListHeaderComponent={<>{loading && <SearchLoading />}</>}
          ListEmptyComponent={<>{!loading && <SearchEmpty />}</>}
          renderItem={({item}) => <SearchList item={item} />}
          keyExtractor={(item) => String(item.feedUrl)}
        />
      )}
    </Box>
  );
};

const s = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 10,
    fontSize: theme.text.size.md,
  },
  listContentContainer: {
    // minHeight: '100%',
    paddingBottom: 90,
  },
});

export default SearchScreen;
