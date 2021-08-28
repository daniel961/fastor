import styled from 'styled-components/macro';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { IconButton, Paper } from '@material-ui/core';

export const InfoBubble = ({
  showBubble,
  closeIcon = true,
  children,
  className,
  onClick,
  onClose,
}) => {
  return (
    <InfoBubbleWrapper className={className}>
      <IconButton onClick={onClick}>
        <InfoOutlinedIcon />
      </IconButton>

      {showBubble && (
        <InfoBubbleStyle>
          {closeIcon && (
            <CloseButtonIcon onClick={onClose}>
              <CloseOutlinedIcon />
            </CloseButtonIcon>
          )}

          {children}
        </InfoBubbleStyle>
      )}
    </InfoBubbleWrapper>
  );
};

const InfoBubbleWrapper = styled.div`
  position: relative;
`;

const InfoBubbleStyle = styled(Paper)`
  position: absolute;
  z-index: 1;
  top: 55px;
  padding: 2rem;
  min-width: 30rem;
  z-index: 3;
`;

const CloseButtonIcon = styled(IconButton)`
  position: absolute;
  top: 0;
  left: 0;
`;

export default InfoBubble;
