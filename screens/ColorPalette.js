import React from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ColorBox from '../components/ColorBox';


const ColorPalette = ({route}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList 
              style={styles.container}
              data={route.params.colors}
              keyExtractor={(item) => item.colorName}
              renderItem={({ item }) => (
                <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
              )}
              ListHeaderComponent={<Text style={styles.heading}>{route.params.paletteName}</Text>}
            />
          </SafeAreaView>
      )
    }
    
    const styles = StyleSheet.create({
        container: {
          paddingHorizontal: 20,
        },
        safeArea: {
          flex: 1,
          backgroundColor: '#ffffff',
        },
        heading: {
          fontSize: 16,
          fontWeight: 'bold',
          alignItems: 'center',
        },
      });

export default ColorPalette;