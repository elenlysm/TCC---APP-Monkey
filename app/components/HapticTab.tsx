import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import * as Haptics from 'expo-haptics';

export const HapticTab = React.forwardRef<any, PressableProps>((props, ref) => (
    <Pressable
        {...props}
        ref={ref}
        onPress={(e) => {
            Haptics.selectionAsync();
            if (props.onPress) {
                props.onPress(e);
            }
        }}
    />
));