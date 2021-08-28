import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { CardStyle, useAccordionStyle } from './CardStyle';
// import arrowDown from './arrow_down.svg';

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
            expandIcon={<img src={''} alt='אייקון חץ פתיחת כרטיסיה' />}
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
