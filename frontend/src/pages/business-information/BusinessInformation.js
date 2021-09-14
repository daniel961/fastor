import { MobileStepper } from '@material-ui/core/';
import { Button } from '../../ui';
import { useState, Fragment } from 'react';
import {
  BusinessInformationContainer,
  InformationHeading,
  useStyles,
} from './BusinessInformationStyles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useForm, FormProvider } from 'react-hook-form';
import GeneralInformation from './general-information/GeneralInformation';
import WorkingHours from './working-hours/WorkingHours';
import Services from './services/Services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import {
  businessInformationFormSchema,
  servicesSchema,
  workingHoursFormSchema,
} from './businessInformationSchemas';
import { englishWorkingDays } from '../../libs/utils/globals';
import http from '../../axios';

const resolver = activeStep => {
  switch (activeStep) {
    case 0:
      return yupResolver(businessInformationFormSchema);
    case 1:
      return yupResolver(servicesSchema);
    case 2:
      return yupResolver(workingHoursFormSchema);
    default:
      break;
  }
};

export const BusinessInformation = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [services, setServices] = useState([]);
  const history = useHistory();
  const methods = useForm({
    resolver: resolver(activeStep),
  });

  const onSubmit = async ({ name, address, phone, ...rest }) => {
    switch (activeStep) {
      case 0:
        try {
          const response = await http.post('/business/add-business', {
            name,
            address,
            phone,
          });

          // TODO: Add loader & display nice error
          if (response.status === 200) {
            handleNext();
          }
        } catch (err) {
          console.log(err);
        }

        break;
      case 2:
        handleWorkingHoursSubmit(rest);
        break;
      default:
    }
  };

  const stepsMapping = [
    { stepNumber: 0, component: <GeneralInformation /> },
    {
      stepNumber: 1,
      component: <Services services={services} setServices={setServices} />,
    },
    { stepNumber: 2, component: <WorkingHours /> },
  ];

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleServicesNext = async () => {
    if (activeStep === 1 && services.length > 0) {
      try {
        const response = await http.post('/service/insert', {
          services,
        });

        if (response.status === 200) {
          handleNext();
        }
      } catch (err) {}
    }
  };

  const handleWorkingHoursSubmit = async formValues => {
    const selectedWorkDays = [];

    Object.entries(formValues).forEach(([key, value]) => {
      const hoursStart = formValues[`${key}StartHour`];
      const minutesStart = formValues[`${key}StartMinute`];
      const hoursEnd = formValues[`${key}EndHour`];
      const minutesEnd = formValues[`${key}EndMinute`];
      const from = `${hoursStart}:${minutesStart}`;
      const to = `${hoursEnd}:${minutesEnd}`;

      if (value && englishWorkingDays.includes(key)) {
        selectedWorkDays.push({
          days: [key],
          workingHours: {
            from,
            to,
          },
        });
      }
    });

    const data = {
      activityTimes: selectedWorkDays,
    };

    try {
      const res = await http.post('/business/insert-work-times', data);

      // TODO: Add loader & display nice error
      if (res.status === 200) {
        history.push('/calendar');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BusinessInformationContainer>
      <InformationHeading variant='h1' component='h1'>
        הגדרת העסק
      </InformationHeading>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            {stepsMapping.map(({ stepNumber, component }) => {
              if (stepNumber === activeStep) {
                return <Fragment key={stepNumber}>{component}</Fragment>;
              }

              return null;
            })}
          </div>

          <MobileStepper
            variant='dots'
            steps={3}
            position='static'
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <Button
                type={
                  activeStep === 1 && services.length > 0 ? 'button' : 'submit'
                }
                variant='text'
                disabled={services.length === 0 && activeStep === 1}
                onClick={handleServicesNext}
              >
                {activeStep === 2 ? 'סיום' : 'הבא'}
                <KeyboardArrowLeft />
              </Button>
            }
            backButton={
              activeStep === 0 ? (
                <ButtonPlaceholder />
              ) : (
                <Button
                  variant='text'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  <KeyboardArrowRight />
                  חזרה
                </Button>
              )
            }
          />
        </form>
      </FormProvider>
    </BusinessInformationContainer>
  );
};

const ButtonPlaceholder = () => <div style={{ width: '10rem' }}></div>;

export default BusinessInformation;
