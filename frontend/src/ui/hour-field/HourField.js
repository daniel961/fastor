import TimePicker from 'react-time-picker';
import { Controller, Control } from 'react-hook-form';
import trashIcon from './trash_icon.svg';
import styled from 'styled-components/macro';

export const HourField = ({
  label,
  name,
  control,
  minutePlaceholder = 'דקה',
  hourPlaceholder = 'שעה',
  defaultValue = '',
  className,
  disabled,
}) => {
  return (
    <HourFieldStyle className={className} disabled={disabled}>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TimePicker
            style={{ direction: 'ltr' }}
            minutePlaceholder={minutePlaceholder}
            hourPlaceholder={hourPlaceholder}
            disableClock
            format='HH:mm'
            clearIcon={<img src={trashIcon} alt='ניקוי שדה' />}
            disabled={disabled}
            {...field}
          />
        )}
      />
    </HourFieldStyle>
  );
};

const Label = styled.label`
  font-size: 1.6rem;
  display: block;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const HourFieldStyle = styled.div`
  max-width: 100px;
  .react-time-picker {
    direction: ltr;
    background: #ffffff;

    &__wrapper {
      border-radius: 28px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
      width: 100px;
      height: 30px;
      background: ${props => props.disabled && 'rgb(174 174 174 / 40%)'};
    }

    &__clear-button {
      display: none;

      &:focus-visible {
        outline: none;
      }
    }

    &__inputGroup {
      display: flex;
      justify-content: space-evenly;

      &__input {
        &--hasLeadingZero {
          padding-left: 0;
        }

        &:invalid {
          background: ${props => props.theme.palette.error.main};
        }
      }
      &__leadingZero {
        line-height: 1.8;
      }
    }

    & input:focus-visible {
      outline: none;
    }
  }
`;
