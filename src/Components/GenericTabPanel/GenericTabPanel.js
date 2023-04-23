import React, { useState } from 'react';
import { TabScrollButton, Box, Typography, Tabs, Tab } from '@mui/material';
import './GenericTabPanel.css'

function GenericTabPanel({ content, ...otherProps }) {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tabbed-window-container" {...otherProps}>
    <div className = "tabs-container" >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleTabChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}
      >
        {content.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>

    </div>
    <div className = "tabpanel-container">
      {content.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
      </div>
    </div>
  );
}

function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default GenericTabPanel;
