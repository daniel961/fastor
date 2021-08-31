import { useFormContext } from 'react-hook-form';
import { TextField } from '../../../ui';

export const WorkingHours = () => {
  const { control } = useFormContext();

  return (
    <div>
      <TextField name='test' control={control} />
    </div>
  );
};

export default WorkingHours;
