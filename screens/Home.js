import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
  const [palettes, setPalettes] = useState([]);
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFetchPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    if (result.ok) {
      const palettes = await result.json();
      setPalettes(palettes);
    }
  }, []);

  useEffect(() => {
    handleFetchPalettes();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setPalettes(palettes => [newColorPalette, ...palettes])
    }
  }, [newColorPalette]);

  return (
    <FlatList
      style={styles.list}
      data={palettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ColorPaletteModal');
          }}
        >
          <Text style={styles.modalButton}>+ Add a New Palette</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'teal',
  },
});

export default Home;
