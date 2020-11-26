import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const UserHeader = () => {
  const navigation = useNavigation();
  const _homeHandler = () => {
    navigation.navigate('Users');
  };
  return (
    <>
      <Appbar.Header statusBarHeight={10}>
        <TouchableOpacity style={styles.home} onPress={_homeHandler}>
          <FontAwesome5Icon name="home" size={20} color="#FFFFFF" />
          <Appbar.Content title="Inicio" style={styles.headerText} />
        </TouchableOpacity>
      </Appbar.Header>
    </>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  headerText: {alignItems: 'center'},
  home: {
    paddingHorizontal: '40%',
    alignItems: 'center',
  },
});
