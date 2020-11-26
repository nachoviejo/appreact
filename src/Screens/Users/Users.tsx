import React, {useEffect} from 'react';
import {SectionList, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUsersData} from '../../redux/usersSlice';
import {createSelector} from '@reduxjs/toolkit';
import UserHeader from './components/UserHeader';
import {UserSnippet} from './components/UserSnippet';
import {SectionListData} from '../../utils/interfaces';
import {RootState} from '../../redux/rootReducer';
import colors from '../../styles/colors';

const Users = () => {
  const dispatch = useDispatch();
  // Fetch all the contacts data at once when the component is mounted
  useEffect(() => {
    dispatch(fetchUsersData());
  }, []);

  // Retrieve the favorite contacts list
  const selectUsers = createSelector(
    (state: RootState) => state.users,
    (usuarios) => usuarios.users,
  );
  const users = useSelector(selectUsers);

  // Specify the contact id as a unique key for each item of the list
  const _keyExtrator = (id: string) => id;
  // Specify how each list item is gonna be rendered
  const _renderItem = ({item}: {item: string}) => <UserSnippet userId={item} />;
  //Specify how each list section is gonna be rendered
  const _renderSectionHeader = ({section: {title}}: SectionListData) => (
    <Text style={styles.section}>{title}</Text>
  );

  return (
    <>
      <UserHeader />
      <SectionList
        style={styles.background}
        sections={[{title: 'Usuarios', data: users}]}
        keyExtractor={_keyExtrator}
        renderItem={_renderItem}
        renderSectionHeader={_renderSectionHeader}
        stickySectionHeadersEnabled={true}
      />
    </>
  );
};

export default Users;

const styles = StyleSheet.create({
  section: {
    fontSize: 20,
    backgroundColor: colors.list,
    paddingVertical: '2%',
    paddingLeft: '2.5%',
    color: 'FFFFFF',
    fontWeight: 'bold',
  },
  headerText: {fontSize: 18, fontWeight: 'bold', color: colors.text},
  background: {
    backgroundColor: colors.background,
  },
});
