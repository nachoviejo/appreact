import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../utils/interfaces';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../redux/rootReducer';
import {shallowEqual, useSelector} from 'react-redux';
import colors from '../../styles/colors';
import {Appbar} from 'react-native-paper';
import {DataRow} from './components/DataRow';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const UserDetails = () => {
  const navigation = useNavigation();

  // Retrieve the contact id sent from the 'Contacts' screen
  const route = useRoute<RouteProp<RootStackParamList, 'UserDetails'>>();
  const userId = route.params?.userId;

  const selectUserData = createSelector(
    (state: RootState) => state.users.byId,
    (User) => {
      const fullUser = User[userId];

      return {
        name: fullUser?.name,
        username: fullUser?.username,
        email: fullUser?.email,
        address: fullUser?.address,
        phone: fullUser?.phone,
        website: fullUser?.website,
        company: fullUser?.company,
      };
    },
  );

  const userData = useSelector(selectUserData, shallowEqual);

  userData?.address &&
  userData?.address?.street &&
  userData?.address?.suite &&
  userData?.address?.city &&
  userData?.address?.zipcode &&
  userData?.address?.geo &&
  userData?.address?.geo.lat &&
  userData?.address?.geo.lng
    ? `${userData.address.street}, ${userData.address.suite}
${userData.address.city}, ${userData.address.zipcode}, ${userData.address.geo}`
    : null;

  const _onBackHandler = () => {
    navigation.goBack();
  };

  const _onHelpHandler = () => {
    navigation.navigate('Credits');
  };

  return (
    <>
      <ScrollView style={styles.background}>
        <Appbar.Header statusBarHeight={10}>
          <TouchableOpacity style={styles.goBack} onPress={_onBackHandler}>
            <FontAwesome5Icon
              name="arrow-circle-left"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <Appbar.Content
            style={styles.Header}
            title="Usuario"
            subtitle={'Detalle'}
          />
          <TouchableOpacity style={styles.help} onPress={_onHelpHandler}>
            <FontAwesome5Icon
              name="question-circle"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </Appbar.Header>
        <Text style={styles.name}>{userData.name}</Text>
        <DataRow
          field="Nombre de usuario"
          data={userData.username}
          icon="user"
        />
        <DataRow field="Email" data={userData.email} icon="envelope" />
        <DataRow field="Tel." data={userData.phone} icon="phone" />
        <DataRow field="Sitio web" data={userData.website} icon="globe" />
        <DataRow field="Empresa" data={userData.company.name} icon="building" />
        <View style={styles.container}>
          <FontAwesome5Icon
            style={styles.icon}
            name="map-marker-alt"
            size={30}
            color="#000000"
          />
          <Text style={styles.field}>Dirección:</Text>
        </View>
        <Text style={styles.data}>{userData.address.street}</Text>
        <Text style={styles.data}>{userData.address.suite}</Text>
        <Text style={styles.data}>{userData.address.city}</Text>
        <Text style={styles.data}>
          {'GCS: '}
          {userData.address.geo.lat}
          {', '}
          {userData.address.geo.lng}
        </Text>
        <Text style={styles.data}>
          {'CP:'} {userData.address.zipcode}
        </Text>
      </ScrollView>
    </>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: '3%',
    paddingHorizontal: '1%',
  },
  field: {
    fontSize: 22,
    color: colors.text,
    fontWeight: 'bold',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
  },
  name: {
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: '5%',
    marginHorizontal: '2.5%',
    color: colors.text,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 22,
    paddingVertical: '1%',
    paddingHorizontal: '25%',
    color: colors.text,
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    paddingHorizontal: '4%',
  },
  help: {
    paddingHorizontal: '6%',
  },
  background: {
    backgroundColor: colors.background,
  },
  icon: {
    paddingHorizontal: '2%',
    alignItems: 'center',
  },
});
