import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const ButtonDonate = () => (
  <Button 
  icon="cash-multiple" 
  mode="contained" 
  buttonColor="#759a3f"
  style={styles.button}
  onPress={() => console.log('Pressed')}>
    Support me
  </Button>
);

const styles = StyleSheet.create({
    button: {
        marginTop: 9,
        marginLeft: 25,
    },
})
export default ButtonDonate;