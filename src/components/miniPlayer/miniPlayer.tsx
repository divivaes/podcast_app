import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';

import {usePlayerContext} from '../../contexts/PlayerContext';
import {theme} from '../../constants/theme';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Player')}>
      <Box
        h={70}
        bg="white"
        px="sm"
        style={{borderTopWidth: 1, borderTopColor: theme.color.greyLightest}}>
        <Box f={1} dir="row" align="center" justify="between">
          <Box
            h={50}
            w={50}
            bg="black"
            radius={10}
            mr={10}
            style={{overflow: 'hidden'}}>
            <Image
              source={{uri: playerContext.currentTrack.thumbnail}}
              style={{flex: 1}}
            />
          </Box>
          <Box f={1} mr={20}>
            <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
          </Box>
          <Box mr={10}>
            {playerContext.isPaused && (
              <TouchableOpacity onPress={() => playerContext.play()}>
                <Icon name="play" size={30} />
              </TouchableOpacity>
            )}
            {playerContext.isPlaying && (
              <TouchableOpacity onPress={playerContext.pause}>
                <Icon name="pause" size={30} />
              </TouchableOpacity>
            )}
            {playerContext.isStopped && (
              <TouchableOpacity onPress={() => null}>
                <Icon name="square" size={30} />
              </TouchableOpacity>
            )}
          </Box>
          <Box>
            <TouchableOpacity onPress={() => playerContext.seekTo()}>
              <Icon size={30} name="rotate-cw" />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default MiniPlayer;
