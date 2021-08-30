import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useFastorForm = (
  { defaultValues, schema } = { defaultValues: {} },
) => {
  return useForm({
    ...defaultValues,
    resolver: schema ? yupResolver(schema) : undefined,
  });
};

export default useFastorForm;
