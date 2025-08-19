import { TabsBar, Track, Tab, Underline, Title } from "../../styles/Shop.styles";

export default function ShopTabs({ active = "grow", onChange }) {
  const tabs = [
    { key: "grow", label: "캐릭터 키우기" },
    { key: "decorate", label: "꾸미기 상점" },
  ];
  const activeIndex = tabs.findIndex((tab) => tab.key === active);
  return (
    <TabsBar>
      <Title style={{ textAlign: "center", background: "#FFFFFF", zIndex: "1000" }}>상점</Title>
      <Track>
      
        {tabs.map(tab => (
          <Tab
            key={tab.key}
            role="tab"
            id={`tab-${tab.key}`}
            $active={tab.key === active}
            onClick={() => onChange?.(tab.key)}
          >
            {tab.label}
          </Tab>
        ))}
        <Underline $index={activeIndex} />
      </Track>
    </TabsBar>
  );
}