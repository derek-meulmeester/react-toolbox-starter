import React from 'react';
import Button from 'react-toolbox/lib/button';
import ReactTabs from 'react-toolbox/lib/tabs';
const Tabs = ReactTabs.Tabs;
const Tab = ReactTabs.Tab;

var App = React.createClass({
    render: function() {
        return (
            <Tabs>
                <Tab label="Home">
                    <h3>Home</h3>
                    <Button label="Click Here" kind="raised" mini />
                </Tab>
                <Tab label="About">
                    <h3>About</h3>
                </Tab>
                <Tab label="Contact">
                    <h3>Contact Us</h3>
                    <Button label="Send" kind="raised" mini accent />
                </Tab>
            </Tabs>
        )
    }
});

export default App;