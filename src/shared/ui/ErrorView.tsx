import styled from 'styled-components/native';

export const ErrorView = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <Container>
    <Message>{message}</Message>
    {onRetry && (
      <Button onPress={onRetry}>
        <Reset>Повторить</Reset>
      </Button>
    )}
  </Container>
);

const Container = styled.View`
  padding: 16px;
  align-items: center;
`;

const Message = styled.Text`
  color: #ef4444;
  margin-bottom: 8px;
`;

const Button = styled.TouchableOpacity`
  background: #1e88e5;
  padding: 8px;
  border-radius: 6px;
`;

const Reset = styled.Text`
  color: #fff;
`;
