/* eslint-disable react-native/no-inline-styles */
import { Text, Linking } from 'react-native';
import styled from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '~/navigation/AppNavigator';
import { formatDate } from '~/utils/formatDate';

import { SvgXml } from 'react-native-svg';

type RouteProps = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const route = useRoute<RouteProps>();
  const article = route.params?.article;
  const date = formatDate(article.publishedAt);

  if (!article) {
    return (
      <NotFound>
        <Text>Статья не найдена</Text>
      </NotFound>
    );
  }

  const openInBrowser = async () => {
    if (article.url) {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
      }
    }
  };

  return (
    <Container>
      {article.urlToImage ? (
        <Img source={{ uri: article.urlToImage }} resizeMode="cover" />
      ) : null}
      <Title>{article.title}</Title>
      <Row>
        {article.author && (
          <Author numberOfLines={1} ellipsizeMode="tail">
            {article.author}
          </Author>
        )}
        <Time>
          <SvgXml xml={clockIcon} width="14" height="14" />
          <Text>{date}</Text>
        </Time>
      </Row>
      <Text style={{ lineHeight: 20 }}>
        {article.content || article.description || 'Нет текста для отображения'}
      </Text>

      {article.url ? (
        <Button onPress={openInBrowser} style={{ marginTop: 8 }}>
          <Text style={{ color: '#fff' }}>Открыть в браузере</Text>
        </Button>
      ) : null}
    </Container>
  );
}

const clockIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
`;

const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 12px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  margin-bottom: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const Author = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #4e4b66;
  max-width: 30%;
`;

const Time = styled.View`
  font-size: 14px;
  color: #4e4b66;
  font-weight: 400;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Img = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background: #f3f4f6;
  margin-bottom: 12px;
`;

const Button = styled.TouchableOpacity`
  background: #1e88e5;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  margin-top: 12px;
`;

const NotFound = styled.View`
  flex: 1;
  justifycontent: center;
  alignitems: center;
`;
