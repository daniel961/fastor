import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CardStyle, useAccordionStyle } from './CardStyle';
import arrowDown from './arrow_down.svg';

export const Card = ({
  children,
  id,
  expandable,
  cardTitle,
  disabled,
  className,
}) => {
  const classes = useAccordionStyle();

  return (
    <>
      {expandable ? (
        <Accordion
          className={className}
          classes={{ root: classes.root, expanded: classes.expanded }}
          disabled={disabled}
        >
          <AccordionSummary
            aria-controls='panel1a-content'
            id='panel1a-header'
            expandIcon={<img src={arrowDown} alt='אייקון חץ פתיחת כרטיסיה' />}
          >
            {cardTitle}
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      ) : (
        <CardStyle className={className} id={id}>
          {children}
        </CardStyle>
      )}
    </>
  );
};

export default Card;
