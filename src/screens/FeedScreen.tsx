import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { Article } from '~/entities/articles/schemas';
import { useNews } from '~/hooks';
import { RootStackParamList } from '~/navigation/AppNavigator';
import { ArticleCard, ErrorView, Loader } from '~/shared/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFiltersStore } from '~/store';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Feed'>;

const FeedScreen = () => {
  const navigation = useNavigation<NavProp>();

  const category = useFiltersStore(s => s.activeFilter);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useNews(category);

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

  if (isLoading) {
    return (
      <Container>
        <Loader size="large" />
      </Container>
    );
  }

  if (flatData.length === 0) {
    return (
      <EmptyWrapper>
        <Empty>Новостей еще нет ;(</Empty>
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
    <Container>
      <FlatList
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ padding: 32 }}
        data={flatData}
        keyExtractor={item => item.title + item.url}
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
    </Container>
  );
};

export default FeedScreen;

const Container = styled(SafeAreaView)`
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
