import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Contacts from './Contacts'
import Contracts from './Contracts'
import { getContacts } from '../../api';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '80%', width: '80%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const tabsProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    key: index
  };
}

const VerticalTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const options = [
    { title: 'Contacts', content: <Contacts/> },
    { title: 'Contracts', content: <Contracts/> }
  ]

  useEffect(() => {
    (async () => {
      const contacts = await getContacts()
      console.log(contacts)
    })()
  }, [])

  return (
    <Box
      sx={{display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {options.map((el, index) => (
          <Tab label={el.title} sx={{height: '20vh'}} {...tabsProps(index)} />
        ))}
      </Tabs>
        {options.map((el, index) => (
          <TabPanel key={index} value={value} index={index} style={{width: '80%'}}>
            {el.content}
          </TabPanel>
        ))}
    </Box>
  );
}

export default VerticalTabs;