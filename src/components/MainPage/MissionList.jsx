import MissionCard from "./MissionCard";

export default function MissionList({ items = [], onClick }) {
  return (
    <section>
      {items.map((m) => (
        <MissionCard
          key={m.id || m.missionId}
          id={m.id || m.missionId}
          category={m.category}
          image={m.image}
          title={m.title}
          points={m.points}
          status={m.status}
          badgeTextColor={m.badgeTextColor}
          onClick={() => onClick && onClick(m.id)}
        />
      ))}
    </section>
  );
}
