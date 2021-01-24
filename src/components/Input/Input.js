import { Tabs } from "antd";
const { TabPane } = Tabs;
function Input({ tabPane1, tabPane2, setUploadCSV, setManualCSV, manualCSV }) {
  return (
    <div className="Input">
      <Tabs defaultActiveKey="1" /*onChange={callback}*/>
        <TabPane tab="Drag and Drop" key="1">
          {tabPane1}
        </TabPane>
        <TabPane tab="Direct input" key="2">
          {tabPane2}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Input;
