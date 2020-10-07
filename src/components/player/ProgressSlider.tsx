import React from 'react';
import {ProgressComponent} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {Box, Text} from 'react-native-design-utility';

import {theme} from '../../constants/theme';
import {PlayerContext} from '../../contexts/PlayerContext';

function buildTime(totalTime: number): string {
  const hours = Math.floor(totalTime / 3600);
  totalTime %= 3600;
  const minutes = Math.floor(totalTime / 60);
  const seconds = Math.floor(totalTime % 60);

  const minuteStr = String(minutes).padStart(2, '0');
  const secondStr = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minuteStr}:${secondStr}`;
  }

  return `${minuteStr}:${secondStr}`;
}

class ProgressSlider extends ProgressComponent {
  static contextType = PlayerContext;

  get totalTime(): string {
    return buildTime(this.state.duration - this.state.position);
  }

  get currentTime(): string {
    return buildTime(this.state.position);
  }

  render() {
    return (
      <>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={0}
          maximumValue={this.state.duration}
          value={this.state.position}
          minimumTrackTintColor={theme.color.greyDarker}
          maximumTrackTintColor={`${theme.color.greyDarker}30`}
          onSlidingComplete={(value) => {
            this.context.goTo(value);
          }}
        />
        <Box dir="row" align="center" justify="between">
          <Text>{this.currentTime}</Text>
          <Text>-{this.totalTime}</Text>
        </Box>
      </>
    );
  }
}

export default ProgressSlider;
