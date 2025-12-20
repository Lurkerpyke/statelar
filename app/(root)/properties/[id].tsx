import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router/build/hooks';

const Properties = () => {

    const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Properties {id}</Text>
    </View>
  )
};

export default Properties;