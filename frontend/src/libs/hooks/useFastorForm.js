import { useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const useFastorForm = () => {
  return useForm({
    ...defaultValues,
    resolver: schema ? yupResolver(schema) : undefined,
  });
};

export default useFastorForm;
