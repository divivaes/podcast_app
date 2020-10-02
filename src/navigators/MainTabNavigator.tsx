import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import PodcastDetailScreen from '../components/podcastDetail/PodcastDetailScreen';
import {theme} from '../constants/theme';

const ListenNowStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{title: 'Listen Now'}}
        name="ListenNow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{headerTintColor: theme.color.blueLight}}>
      <SearchStack.Screen
        options={{title: 'Search'}}
        name="Search"
        component={SearchScreen}
      />
      <SearchStack.Screen
        options={{headerTitle: ''}}
        name="PodcastDetail"
        component={PodcastDetailScreen}
      />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        options={{title: 'Library'}}
        name="Library"
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  );
};

const Maintab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Maintab.Navigator>
      <Maintab.Screen name="ListenNow" component={ListenNowStackNavigator} />
      <Maintab.Screen name="Search" component={SearchStackNavigator} />
      <Maintab.Screen name="Library" component={LibraryStackNavigator} />
    </Maintab.Navigator>
  );
};

export default MainTabNavigator;
