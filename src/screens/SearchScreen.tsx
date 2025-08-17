import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Article } from '~/entities/articles/schemas';
import { Search } from '~/feat';
import { useNews } from '~/hooks';
import { RootStackParamList } from '~/navigation/AppNavigator';
import { ArticleCard, ErrorView, Loader } from '~/shared/ui';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

const SearchScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [q, setQ] = useState<string>();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useNews(q);

  const flatData = data ? data.pages.flatMap(p => p.articles) : [];

  const renderItem = ({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      onPress={() => navigation.navigate('Detail', { article: item })}
    />
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = () => {
    refetch();
  };

  if (flatData.length === 0) {
    return (
      <EmptyWrapper>
        <Empty>Таких новостей нет ;(</Empty>
      </EmptyWrapper>
    );
  }

  if (error && !flatData.length) {
    return (
      <Container>
        <ErrorView message={error.message} onRetry={() => refetch()} />
      </Container>
    );
  }
  return (
    <>
      <SafeContainer edges={['top']}>
        <Container>
          <Search onSearch={setQ} />
        </Container>
      </SafeContainer>
      <ScrollContainer>
        {isLoading ? (
          <Container>
            <Loader size="large" />
          </Container>
        ) : (
          <FlatList
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{ padding: 32 }}
            data={flatData}
            keyExtractor={item => item.url}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            ItemSeparatorComponent={Separator}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? <Loader size="small" /> : null
            }
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
            }
          />
        )}
      </ScrollContainer>
    </>
  );
};

export default SearchScreen;

const SafeContainer = styled(SafeAreaView)`
  background: #fafafa;
  elevation: 5;
`;

const Container = styled.View`
  padding: 16px 30px;
`;

const ScrollContainer = styled.SafeAreaView`
  flex: 1;
  background: #fafafa;
`;

const Separator = styled.View`
  height: 32px;
`;

const EmptyWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Empty = styled.Text`
  font-size: 24px;
`;
