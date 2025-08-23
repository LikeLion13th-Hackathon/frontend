import { TabsBar, Track, Tab, Underline, Title } from "../../styles/Shop/Shop.styles";

export default function TabBar({ active = "GROW", onChange }) {
  const tabs = [
    { key: "GROW", label: "캐릭터 키우기" },
    { key: "DECO", label: "꾸미기 상점" },
  ];

  const activeIndex = tabs.findIndex((tab) => tab.key === active);
  return (
    <TabsBar>
      <Title>상점</Title>
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