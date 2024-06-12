import React from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native';

import { FONTS, COLORS } from "../constants";

interface TabIconProps {
    focused: boolean;
    icon: any; // Pode ser ajustado conforme o tipo de imagem/icon que você está usando
    iconsStyle?: ImageStyle;
    label: string;
    isTrade?: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, iconsStyle, label, isTrade }) => {
    if (isTrade) {
        return (
            <View style={styles.trade}>
                <Image 
                    source={icon}
                    resizeMode="contain"
                    style={[styles.icon, iconsStyle, { tintColor: focused ? COLORS.white : COLORS.white }]}
                />
                <Text style={styles.tradeText}>Trade</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Image 
                    source={icon}
                    resizeMode="contain"
                    style={[styles.icon, iconsStyle, { tintColor: focused ? COLORS.white : COLORS.secondary }]}
                />
                <Text style={[styles.label, { color: focused ? COLORS.white : COLORS.secondary }]}>
                    {label}
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    trade: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.black
    }as ViewStyle,
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    icon: {
        width: 25,
        height: 25,
    } as ImageStyle,
    label: {
        ...FONTS.h4,
    } as TextStyle,
    tradeText: {
        color: COLORS.white,
    } as TextStyle
});

export default TabIcon;
