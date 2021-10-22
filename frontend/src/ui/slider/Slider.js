import { Slider as MuiSlider } from '@mui/material';
import { Controller } from 'react-hook-form';

export const Slider = ({
  name,
  control,
  disabled = false,
  valueLabelFormat,
  valueLabelDisplay,
  step,
  min,
  max,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={0}
      render={({ field }) => (
        <MuiSlider
          {...field}
          disabled={disabled}
          step={step}
          valueLabelDisplay={valueLabelDisplay}
          valueLabelFormat={valueLabelFormat}
          min={min}
          max={max}
          marks
        />
      )}
    />
  );
};

export default Slider;
