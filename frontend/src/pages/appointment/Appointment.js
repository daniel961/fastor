import { useState, useEffect } from 'react';
import { GradientButton } from '../../components/styled';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '../../ui';
import http from '../../axios';

export const Appointment = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [businessInformation, setBusinessInformation] = useState({});

  useEffect(() => {
    const fetchedBusinessInformation = async () => {
      try {
        const res = await http.post('/business/external-business-information', {
          userId,
        });
        setBusinessInformation(res.data.businessInformation);
      } catch (err) {
        console.log(err);
      }
    };

    fetchedBusinessInformation();
  }, [userId]);

  return (
    <>
      {businessInformation.name}
      <GradientButton
        onClick={() => history.push(`/appointment/authenticate/${userId}`)}
      >
        זימון תור חדש
      </GradientButton>

      <Button
        onClick={() => history.push(`/appointment/edit/authenticate/${userId}`)}
      >
        לצפייה / ביטול תור קיים
      </Button>
    </>
  );
};

export default Appointment;
