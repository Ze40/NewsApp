import { useNavigation } from '@react-navigation/native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/AppNavigator';
import { SvgXml } from 'react-native-svg';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const Navigation = () => {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper insets={insets}>
      <Button onPress={() => navigation.navigate('Feed')}>
        <SvgXml xml={HomeIcon} width={24} height={24} />
        <BtnText>Home</BtnText>
      </Button>

      <Button onPress={() => navigation.navigate('Search')}>
        <SvgXml xml={SearchIcon} width={24} height={24} />
        <BtnText>Search</BtnText>
      </Button>
    </Wrapper>
  );
};

export default Navigation;

const HomeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
`;

const SearchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
`;

const Wrapper = styled.View<{ insets: EdgeInsets }>`
  height: ${({ insets }) => 64 + insets.bottom}px;
  padding-bottom: ${({ insets }) => insets.bottom}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  background-color: #fff;
  padding-horizontal: 12px;
`;

const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 8px;
  border-radius: 8px;
`;

const BtnText = styled.Text`
  font-size: 13px;
  color: #222;
  margin-top: 4px;
  include-font-padding: false;
`;
