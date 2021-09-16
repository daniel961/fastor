import { useEffect, useState } from 'react';
import { Menu, Tooltip } from '@material-ui/core';
import { TextField, Button } from '../../../../ui';
import { useForm } from 'react-hook-form';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import http from '../../../../axios';

const Share = props => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const { control, reset } = useForm();
  const [businessInformation, setBusinessInformation] = useState({});

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  useEffect(() => {
    const fetchBusinessInformation = async () => {
      try {
        const response = await http.post('/business/information');
        if (response.status === 200) {
          setBusinessInformation(response.data.businessInformation);
        }
      } catch (e) {}
    };

    fetchBusinessInformation();
  }, []);

  useEffect(() => {
    if (props.open && businessInformation.landingPageUrl) {
      reset({
        link: businessInformation.landingPageUrl,
      });
    }
  }, [props.open, reset, businessInformation.landingPageUrl]);

  return (
    <Menu
      id='basic-menu'
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={() => {
        setOpenTooltip(false);
        props.handleClose();
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <p
        onClick={() => {
          setOpenTooltip(false);
          props.handleClose();
        }}
      >
        סגירה
      </p>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={openTooltip}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title='הועתק'
      >
        <CopyToClipboard text={businessInformation?.landingPageUrl}>
          <Button onClick={handleTooltipOpen}>העתקת כתובת</Button>
        </CopyToClipboard>
      </Tooltip>

      <TextField name='link' control={control} disabled />
    </Menu>
  );
};

export default Share;
