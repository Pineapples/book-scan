import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from './views/Scanner';
import Favourites from './views/Favourites';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
          tabBarIcon: () => route.name === 'Favourites'? (<Text>⭐</Text>) : (<Text>🔎</Text>)
      })}>
        <Tab.Screen name="Favourites" component={Favourites}  />
        <Tab.Screen name="Scanner" component={Scanner} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}