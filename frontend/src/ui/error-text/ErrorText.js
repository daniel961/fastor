import styled from 'styled-components/macro';

export const ErrorText = ({ text, children, className }) => {
  return (
    <div className={className}>
      {children}
      <ErrorTextStyle id='error-span'>{text}</ErrorTextStyle>
    </div>
  );
};

const ErrorTextStyle = styled.span`
  color: ${props => props.theme.palette.error.main};
  display: block;
  font-size: 1.2rem;
`;

export default ErrorText;
