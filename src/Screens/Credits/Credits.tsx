import {useNavigation} from '@react-navigation/native';
import {View} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Credits = () => {
  const navigation = useNavigation();
  const _onBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.background}>
      <Appbar.Header>
        <TouchableOpacity style={styles.goBack} onPress={_onBackHandler}>
          <FontAwesome5Icon
            name="arrow-circle-left"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Appbar.Content style={styles.Header} title="Creditos" />
      </Appbar.Header>
      <Text style={styles.credits1}>Developed by Nacho Viejo</Text>
      <Text style={styles.credits2}>Capacitacion React-Native 2020</Text>
    </View>
  );
};

export default Credits;

const styles = StyleSheet.create({
  credits1: {
    paddingVertical: '75%',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  credits2: {
    paddingVertical: '5%',
    textAlign: 'center',
    fontSize: 15,
  },
  goBack: {
    paddingHorizontal: '5%',
  },
  Header: {
    paddingHorizontal: '23%',
  },
  background: {
    backgroundColor: '#E7D4FF',
  },
});
