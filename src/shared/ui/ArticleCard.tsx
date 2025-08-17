import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Article } from '~/entities/articles/schemas';
import { SvgXml } from 'react-native-svg';
import { formatDate } from '~/utils';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
}

export const ArticleCard = ({ article, onPress }: ArticleCardProps) => {
  const date = formatDate(article.publishedAt);

  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <ThumbWrapper>
          {article.urlToImage ? (
            <Thumb source={{ uri: article.urlToImage }} resizeMode="cover" />
          ) : (
            <Thumb
              source={require('~/assets/placeholder.jpg')}
              resizeMode="cover"
            />
          )}
        </ThumbWrapper>
        <Content>
          <Title numberOfLines={2} ellipsizeMode="tail">
            {article.title}
          </Title>
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
        </Content>
      </Card>
    </TouchableOpacity>
  );
};

const Card = styled.View`
  overflow: hidden;
  elevation: 2;
  flex: 0;
`;

const Thumb = styled.Image`
  width: 100%;
  height: 100%;
`;

const ThumbWrapper = styled.View`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

const Content = styled.View`
  margin-top: 8px;
  gap: 4px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #000;
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

const clockIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
`;
