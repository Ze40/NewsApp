import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '~/screens/FeedScreen';
import { Header } from '~/widgets';

export type RootStackParamList = {
  Feed: undefined;
  Detail: { article: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={{
          statusBarStyle: 'dark',
          statusBarHidden: false,
        }}
      >
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            title: 'Новости',
            // eslint-disable-next-line react/no-unstable-nested-components
            header: ({ route, options }) => (
              <Header isGoBack title={options.title || route.name} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
