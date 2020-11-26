import {User} from './../utils/interfaces';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import Axios, {AxiosResponse} from 'axios';
import {normalize, schema} from 'normalizr';
import orderBy from 'lodash/orderBy';
import {Alert} from 'react-native';

// Normalizr library result interface
export interface NormalizerResult {
  result: string[];
  entities: {users: {[id: string]: User}};
}

// Normalized generic data storage structure interface
interface NormalizedObjects<T> {
  byId: {[id: string]: T};
  users: string[];
}

// Normalized contacts data storage structure interface
interface userState {
  users: NormalizedObjects<User>;
  loading: boolean;
  error: string | null;
}

// Initial contacts state
const initialState: userState = {
  users: {
    byId: {},
    users: [],
  },
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUserDataRequest(state, action: PayloadAction<boolean>) {
      // Set true the loading flag
      state.loading = action.payload;
      // Delet any previous error
      state.error = null;
    },
    getUsersDataSuccess(state, action: PayloadAction<User[]>) {
      const users = action.payload;

      // Order retrieve users alphabetically by name
      const sortedUsers: User[] =
        users.length > 0 ? orderBy(users, ['name'], ['asc']) : [];

      //Use normalizr library to restructure the requested data as a normalized one
      const userEntity = new schema.Entity('users');
      const normalizedData: NormalizerResult = normalize(sortedUsers, [
        userEntity,
      ]);
      // Fill the users byId state object with the normalized contacts data
      state.users.byId = normalizedData.entities.users;

      // Reset users array as empty arrays to avoid data corruption
      state.users.users = [];
      // Fill the users array
      sortedUsers.map((user) => {
        state.users.users.push(user.id);
      });
      // Set false the loading flag and deletes any previous error
      state.loading = false;
      state.error = null;
    },
    getUserDataFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    cleanError(state) {
      // Deletes any previous error
      state.error = null;
    },
  },
});

// Slice actions to export
export const {
  getUserDataRequest,
  getUsersDataSuccess,
  getUserDataFailure,
  cleanError,
} = usersSlice.actions;

// Slice reducer to export
export default usersSlice.reducer;

// Async action, uses Redux-Thunk to perform the contacts data retrieving
export const fetchUsersData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserDataRequest(true));
    const response: AxiosResponse<User[]> = await Axios.get(
      'https://jsonplaceholder.typicode.com/users',
      {
        timeout: 8000,
      },
    );
    const usersData = response.data;
    dispatch(getUsersDataSuccess(usersData));
  } catch (error) {
    dispatch(getUserDataFailure(error.message));
    Alert.alert(
      'Error',
      'An error has been occur retrieven the user list',
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch(cleanError());
          },
        },
      ],
      {cancelable: false},
    );
  }
};
