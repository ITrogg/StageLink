import PropTypes from "prop-types";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EventTab from "./EventTab";

function TabComponent({ infos, pastEvents, futureEvents }) {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Information</Tab>
        <Tab>Concerts</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{infos}</TabPanel>
        <TabPanel>
          <EventTab pastEvents={pastEvents} futureEvents={futureEvents} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

TabComponent.propTypes = {
  infos: PropTypes.node.isRequired,
  pastEvents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  futureEvents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default TabComponent;
