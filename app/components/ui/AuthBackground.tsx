import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

interface AuthBackgroundProps {
    children: ReactNode;
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
    return (
        <View style={styles.bg}>
            <Svg style={styles.vector} width="152" height="75" viewBox="0 0 152 75" fill="none">
                <Path fillRule="evenodd" clipRule="evenodd" d="M97.0682 -81.4816C113.58 -83.8838 130.102 -96.572 145.463 -90.2557C160.573 -84.042 167.013 -66.106 171.51 -50.8703C175.505 -37.3353 170.311 -23.4655 169.322 -9.42515C168.405 3.58669 169.961 16.4543 165.89 28.8911C161.119 43.4645 157.089 60.2979 143.78 68.5946C130.444 76.9082 112.942 71.3391 97.0682 71.7931C80.6822 72.2618 63.017 79.0631 48.7289 71.3133C34.4337 63.5596 31.4178 45.3883 23.1761 31.7141C14.9082 17.9966 -1.1547 6.39734 0.0657888 -9.42515C1.29426 -25.351 18.9102 -34.7104 29.2614 -47.1764C38.0368 -57.7446 43.9962 -71.013 56.4287 -77.3029C68.7016 -83.5121 83.3639 -79.4879 97.0682 -81.4816Z" fill="#4FBE9F" />
            </Svg>

            <Svg style={styles.Vector} width="200" height="86" viewBox="0 0 200 86" fill="none">
                <Path fillRule="evenodd" clipRule="evenodd" d="M139.958 46.94C126.995 56.0521 122.57 75.0047 107.904 80.9193C92.6004 87.0915 73.8836 87.0951 59.6844 79.315C45.7189 71.6629 43.8786 52.5725 33.7989 40.3148C23.645 27.9667 0.973323 23.2259 0.312245 7.11329C-0.372976 -9.58778 23.3617 -17.3491 30.8102 -32.5294C37.3816 -45.922 32.4436 -62.7002 40.6875 -75.1719C50.078 -89.3781 63.7575 -101.301 79.875 -106.756C97.0008 -112.553 119.287 -117.782 132.814 -106.353C147.525 -93.9241 134.063 -65.9919 145.994 -50.894C157.651 -36.1413 187.048 -42.9494 195.997 -26.3951C204.334 -10.9732 198.028 10.978 187.142 25.2237C176.445 39.2216 154.389 36.7966 139.958 46.94Z" fill="#744F38" />
            </Svg>

            <View style={styles.rectangle3}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 198, 1)',
        position: 'relative',
    },
    vector: {
        position: 'absolute',
        top: -92,
        left: 260,
    },
    Vector: {
        position: 'absolute',
        top: -99,
        left: 90,
    },
    rectangle3: {
        position: 'absolute',
        top: 135,
        right: 43,
        bottom: 134,
        left: 44,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        shadowColor: 'rgba(151, 160, 142, 1)',
        shadowOffset: { width: -5, height: 8 },
        shadowRadius: 0,
        borderWidth: 20,
        borderColor: 'rgba(186, 75, 48, 1)',
        borderRadius: 48,
        padding: 20,
    },
});
