/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Article } from '~/entities/articles/schemas';
import DetailScreen from '~/screens/DetailScreen';
import FeedScreen from '~/screens/FeedScreen';
import SearchScreen from '~/screens/SearchScreen';
import { Header, Navigation, SearchHeader } from '~/widgets';

export type RootStackParamList = {
  Feed: undefined;
  Search: undefined;
  Detail: { article: Article };
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
            header: ({ route, options }) => (
              <Header title={options.title || route.name} isFiltering />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            header: () => <Header title={''} isGoBack />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <Navigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
