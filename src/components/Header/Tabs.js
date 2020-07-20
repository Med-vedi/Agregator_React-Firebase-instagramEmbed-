import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {
  Tab,
  Tabs,
  AppBar,
  Box,
  makeStyles,
  useTheme,
} from "@material-ui/core";

import "./Header.css";
import Post from "../Post/Post";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

export default function TabsModal() {
  const [cards, setCards] = useState([]);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    //controll and sort
    db.collection("cards")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setCards(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            card: doc.data(),
          }))
        );
      });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          //   indicatorColor="secondary"

          textColor="secondary"
          variant="fullWidth"
          //   aria-label="full width tabs example"
        >
          <Tab label="Video" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          className="tabpanel__tab__text"
          value={value}
          index={0}
          dir={theme.direction}
        >
          {cards.map(({ id, card }) => (
            <Post
              key={id}
              username={card.username}
              caption={card.caption}
              videoUrl={card.videoUrl}
            />
          ))}
          Coming soon (swipe panel)
        </TabPanel>
        <TabPanel
          className="tabpanel__tab__text"
          value={value}
          index={1}
          dir={theme.direction}
        >
          {/* <Plug /> */}
          Coming soon
        </TabPanel>
        <TabPanel
          className="tabpanel__tab__text"
          value={value}
          index={2}
          dir={theme.direction}
        >
          {/* <Plug /> */}
          Coming soon
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
