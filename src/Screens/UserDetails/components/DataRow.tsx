import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  field: string;
  data: string;
  icon: string;
  extraData?: string;
}

export const DataRow = ({field, data, icon}: Props) => {
  return (
    <View style={styles.dataRow}>
      <FontAwesome5Icon
        style={styles.icon}
        name={icon}
        size={30}
        color="#000000"
      />
      <Text style={styles.field}>{`${field}:`}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

const memoizedDataRow = React.memo(DataRow);

export default memoizedDataRow;

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    marginTop: '2%',
    color: '#000000',
    paddingVertical: '2%',
  },
  field: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
    paddingHorizontal: '2%',
  },
  data: {
    flex: 0,
    fontSize: 22,
    color: '#000000',
  },
  icon: {
    paddingHorizontal: '2%',
    alignItems: 'center',
  },
});
