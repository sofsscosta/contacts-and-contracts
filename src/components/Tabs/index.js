import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { tabsTitles } from '../constants';

const TabPanel = (props) => {
  const { children, value, index, tabsOptions, ...other } = props;

  return (
    <>
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ m: 3, height: '80%', width: '100%' }}>
          {children}
        </Box>
      )}
    </div>
    </>
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

const VerticalTabs = (props) => {

  const { children } = props;

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {tabsTitles.map((el, index) => (
          <Tab label={el} sx={{height: '20vh'}} {...tabsProps(index)} />
        ))}
      </Tabs>
        {children.map((child, index) => (
          <TabPanel key={index} value={value} index={index} style={{width: '80%'}}>
            {child}
          </TabPanel>
        ))}
    </Box>
  );
}

export default VerticalTabs;