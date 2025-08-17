import { useState } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';

export const Search = ({ onSearch }: { onSearch: (q: string) => void }) => {
  const [value, setValue] = useState('');
  return (
    <Container>
      <Input
        placeholder="Поиск..."
        value={value}
        onChangeText={setValue}
        returnKeyType="search"
      />
      <Button onPress={() => onSearch(value)}>
        <View>
          <SvgXml xml={SearchIcon} width={22} height={22} color={'#fff'} />
        </View>
      </Button>
    </Container>
  );
};

export default Search;

const SearchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>`;

const Container = styled.View`
  flex-direction: row;
  padding: 8px;
  align-items: center;
`;

const Input = styled.TextInput`
  flex: 1;
  background: #fff;
  padding: 10px 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #e5e7eb;
  margin-right: 8px;
`;

const Button = styled.TouchableOpacity`
  background: #000;
  padding: 10px 12px;
  border-radius: 8px;
`;
