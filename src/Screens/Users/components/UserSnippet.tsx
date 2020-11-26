import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../../redux/rootReducer';
import {shallowEqual, useSelector} from 'react-redux';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Container} from 'native-base';

interface Props {
  userId: string;
}

export const UserSnippet = ({userId}: Props) => {
  const navigation = useNavigation();

  // Retrieve only the necessary user data from the store
  const selectUserData = createSelector(
    (state: RootState) => state.users.byId,
    (User) => {
      const fullUser = User[userId];

      return {
        name: fullUser?.name,
        city: fullUser?.address.city,
      };
    },
  );
  const {name, city} = useSelector(selectUserData, shallowEqual);

  // User snippet on press function handlers. On press it redirects you to the details screen of this specific contact
  const _onPressHandler = () => {
    navigation.navigate('UserDetails', {userId});
  };

  return (
    <TouchableOpacity style={styles.row} onPress={_onPressHandler}>
      <FontAwesome5Icon
        style={styles.user}
        name="user"
        size={40}
        color="#000000"
      />
      <Container style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        {city !== '' ? <Text style={styles.city}>{city}</Text> : null}
      </Container>
    </TouchableOpacity>
  );
};

const memoizedContactSnippet = React.memo(UserSnippet);

export default memoizedContactSnippet;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#FFFFFF',
  },
  container: {
    flex: 2,
    paddingVertical: '1%',
    backgroundColor: '#E7D4FF',
    justifyContent: 'center',
    height: responsiveHeight(10),
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 22,
    color: '#000000',
  },
  city: {
    fontSize: 22,
    color: '#717171',
  },
  user: {
    paddingVertical: '4%',
    paddingHorizontal: '5%',
    flex: 0,
  },
});
