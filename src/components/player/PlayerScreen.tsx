import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import {usePlayerContext} from '../../contexts/PlayerContext';
import {theme} from '../../constants/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ProgressSlider from './ProgressSlider';

const {width} = Dimensions.get('window');

const PlayerScreen = () => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation();

  const track = playerContext.currentTrack;

  if (!track) {
    return null;
  }

  return (
    <SafeAreaView style={s.safeArea}>
      <Box f={1} bg="white" pt="md">
        <Box px="md" mb="md" dir="row" align="center" justify="between">
          <TouchableOpacity
            onPress={() => navigation.goBack}
            hitSlop={{
              bottom: 20,
              top: 20,
              left: 20,
              right: 20,
            }}>
            <Icon name="chevron-down" size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Queue')}
            hitSlop={{
              bottom: 20,
              top: 20,
              left: 20,
              right: 20,
            }}>
            <Icon name="list" size={30} />
          </TouchableOpacity>
        </Box>
        <Box center mb="md">
          <Image source={{uri: track.artwork}} style={s.img} />
        </Box>
        <Box center mb="md" px="md">
          <Text center bold>
            {track.title}
          </Text>
          <Text color="grey" size="sm">
            {track.artist}
          </Text>
        </Box>

        <Box px="md" mb="sm">
          <ProgressSlider />
        </Box>

        <Box dir="row" align="center" justify="center">
          <Box>
            <TouchableOpacity onPress={() => playerContext.seekTo(-10)}>
              <Icon size={35} name="rotate-ccw" />
            </TouchableOpacity>
          </Box>
          <Box mx={20}>
            {playerContext.isPaused ? (
              <TouchableOpacity onPress={() => playerContext.play()}>
                <Icon name="play" size={45} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={playerContext.pause}>
                <Icon name="pause" size={45} />
              </TouchableOpacity>
            )}
          </Box>
          <Box>
            <TouchableOpacity onPress={() => playerContext.seekTo()}>
              <Icon size={35} name="rotate-cw" />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    width: width - theme.space.md * 2,
    height: width - theme.space.md * 2,
    borderRadius: 10,
  },
});

export default PlayerScreen;
