import React, { useState, useEffect } from "react";
import { db } from "./firebase";

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

import "./App.css";
import Post from "./components/Post/Post";
import InstagramEmbed from "react-instagram-embed";

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
      {value === index && <Box p={3}>{children}</Box>}
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

export default function TabsModal({ user }) {
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
          <Tab label="VideoCards" {...a11yProps(0)} />
          <Tab label="InstaCards" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div className="tabs__container">
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="tabs__posts_container">
              <div className="tabs__posts">
                {cards.map(({ id, card }) => (
                  <Post
                    key={id}
                    postId={id}
                    user={user}
                    username={card.username}
                    caption={card.caption}
                    videoUrl={card.videoUrl}
                    className="tabs__post"
                  />
                ))}
              </div>

              {/* <div className="tabs__post__instagram_embded">
                <InstagramEmbed
                  url="https://www.instagram.com/p/BzNTYj4o8dp/"
                  maxWidth={320}
                  hideCaption={true}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div> */}
            </div>
          </TabPanel>
          <TabPanel
            className="tabpanel__tab__text"
            value={value}
            index={1}
            dir={theme.direction}
          >
            <div className="tabs__posts_container">
              <div className="tabs__post__instagram_embded">
                <InstagramEmbed
                  url="https://www.instagram.com/p/CClQQy2lj23/"
                  maxWidth={320}
                  hideCaption={true}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div>
              <div className="tabs__post__instagram_embded">
                <InstagramEmbed
                  url="https://www.instagram.com/p/CCaoZ1EDHil/"
                  maxWidth={320}
                  hideCaption={true}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div>
              <div className="tabs__post__instagram_embded">
                <InstagramEmbed
                  url="https://www.instagram.com/p/CC6nDTTBvPW/"
                  maxWidth={320}
                  hideCaption={true}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div>
              <div className="tabs__post__instagram_embded">
                <InstagramEmbed
                  url="https://www.instagram.com/p/CCRFTPapJrH/"
                  maxWidth={320}
                  hideCaption={true}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div>
            </div>
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
    </div>
  );
}
