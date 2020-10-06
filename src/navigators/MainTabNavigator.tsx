import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';

import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import PodcastDetailScreen from '../components/podcastDetail/PodcastDetailScreen';
import {theme} from '../constants/theme';
import MiniPlayer from '../components/miniPlayer/miniPlayer';
import EpisodeDetailScreen from '../components/podcastDetail/EpisodeDetailScreen';

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

const PodcastStack = createStackNavigator();

const PodcastStackNavigator = () => {
  return (
    <PodcastStack.Navigator>
      <PodcastStack.Screen
        options={{headerTitle: ''}}
        name="PodcastDetail"
        component={PodcastDetailScreen}
      />
      <PodcastStack.Screen
        options={{headerTitle: ''}}
        name="EpisodeDetail"
        component={EpisodeDetailScreen}
      />
    </PodcastStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: theme.color.blueLight,
        headerTitleStyle: {color: theme.color.black},
      }}>
      <SearchStack.Screen
        options={{title: 'Search'}}
        name="Search"
        component={SearchScreen}
      />
      <SearchStack.Screen
        options={{headerTitle: '', headerBackTitle: 'Back'}}
        name="PodcastDetail"
        component={PodcastStackNavigator}
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
const ICON_SIZE = 24;

const MainTabNavigator = () => {
  return (
    <Maintab.Navigator
      tabBar={(tabProps) => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabProps} />
        </>
      )}
      tabBarOptions={{
        activeTintColor: theme.color.blueLight,
      }}>
      <Maintab.Screen
        name="ListenNow"
        component={ListenNowStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon
              color={props.color}
              size={ICON_SIZE}
              name="headphones"
            />
          ),
        }}
      />
      <Maintab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="search" />
          ),
        }}
      />
      <Maintab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="inbox" />
          ),
        }}
      />
    </Maintab.Navigator>
  );
};

export default MainTabNavigator;
