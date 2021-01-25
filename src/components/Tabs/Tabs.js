import PropTypes from "prop-types";
import { Tabs as AntTabs } from "antd";
const { TabPane } = AntTabs;
function Tabs({ tabs }) {
  if (tabs.length === 0) {
    return null;
  }
  return (
    <AntTabs>
      {tabs.map(({ pane, title }, index) => {
        return (
          <TabPane tab={title} key={index}>
            {pane}
          </TabPane>
        );
      })}
    </AntTabs>
  );
}
const { array } = PropTypes;
Tabs.propTypes = {
  tabs: array,
};
export default Tabs;
