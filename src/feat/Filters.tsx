import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useFiltersStore } from '~/store';

const Filters = () => {
  const activeFilter = useFiltersStore(s => s.activeFilter);
  const toggleFilter = useFiltersStore(s => s.toggleFilter);
  const filterList = useFiltersStore(s => s.filterList);

  const renderItem = useCallback(
    ({ item }: { item: { name: string; title: string } }) => {
      const isActive = item.name === activeFilter;
      return (
        <FilterTouchable
          onPress={() => toggleFilter(item.name)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
        >
          <FilterItem isActive={isActive}>{item.title}</FilterItem>
        </FilterTouchable>
      );
    },
    [activeFilter, toggleFilter],
  );

  const keyExtractor = useCallback((item: { name: string }) => item.name, []);

  return (
    <Container>
      <FlatList
        horizontal
        data={filterList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={filterList.length}
      />
    </Container>
  );
};

export default Filters;

const Container = styled.View`
  padding-vertical: 6px;
`;

const FilterTouchable = styled(TouchableOpacity)`
  margin-horizontal: 4px;
`;

const FilterItem = styled.Text<{ isActive: boolean }>`
  font-size: 14px;
  padding: 7px 12px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #000000;
  background-color: ${({ isActive }) =>
    isActive ? '#000000ff' : 'transparent'};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#111')};
  overflow: hidden;
`;

const Separator = styled.View`
  width: 8px;
`;
