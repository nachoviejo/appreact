import usersReducer from './usersSlice';

// As there is only one reducer the rootReducer is the contactsReducer
const rootReducer = usersReducer;

// Root state type
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
