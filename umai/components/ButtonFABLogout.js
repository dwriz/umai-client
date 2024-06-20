import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const FABLogout = ({handleLogout}) => (
  
  <FAB
    icon="logout-variant"
    style={styles.fab}
    size='small'
    color= "#C07F24"
    onPress={handleLogout}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 90,
    borderRadius: 30,
    backgroundColor: "#B0C654"
  },
})

export default FABLogout;