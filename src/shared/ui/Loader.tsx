// src/components/Loader.tsx
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const Loader = ({ size = 'small' }: { size?: 'small' | 'large' }) => (
  <Container>
    <ActivityIndicator size={size} color={'#1E88E5'} />
  </Container>
);
