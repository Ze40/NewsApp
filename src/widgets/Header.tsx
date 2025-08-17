import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Filters } from '~/feat';

interface HeaderProps {
  title: string;
  isGoBack?: boolean;
  isFiltering?: boolean;
}

const Header = ({
  title,
  isGoBack = false,
  isFiltering = false,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <SafeContainer edges={['top']}>
      <Container>
        <Top>
          {isGoBack && (
            <BackButton onPress={() => navigation.goBack()}>
              <SvgXml xml={BackSvg} width={24} height={24} />
            </BackButton>
          )}
          <Title>{title}</Title>
        </Top>
        {isFiltering && <Filters />}
      </Container>
    </SafeContainer>
  );
};

export default Header;

const BackSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
`;

const SafeContainer = styled(SafeAreaView)`
  background: #fafafa;
  elevation: 5;
`;

const Container = styled.View`
  padding: 16px 30px;
`;

const Top = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 30px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  flex: 1;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
