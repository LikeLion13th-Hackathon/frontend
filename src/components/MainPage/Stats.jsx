import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../../styles/MyPage.styles";
import {
  fetchMonthlySummary,
  fetchMonthlyCategorySummary,
  fetchAverageSpending,
} from "../../api/stats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function StatsPage() {
  const navigate = useNavigate();
  const [monthly, setMonthly] = useState([]);
  const [monthlyCategory, setMonthlyCategory] = useState([]);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [m, c, a] = await Promise.all([
          fetchMonthlySummary(),
          fetchMonthlyCategorySummary(),
          fetchAverageSpending(),
        ]);
        setMonthly(m);
        setMonthlyCategory(c);
        setAverage(a.averageSpending);
      } catch (err) {
        console.error("통계 데이터 불러오기 실패:", err);
      }
    };
    load();
  }, []);

  const COLORS = ["#6C63FF", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

  return (
    <div style={{ padding: "2vh" }}>
      <Header>
        <BackIcon size={20} onClick={() => navigate(-1)} />
        <h3 style={{ marginLeft: "8px" }}>내 소비/미션 통계</h3>
      </Header>

      {/* 평균 소비액 */}
      <section
        style={{
          margin: "3vh 0",
          background: "#fff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h4 style={{ marginBottom: "8px", color: "#6C63FF" }}>
          나의 미션별 평균 소비 금액은
        </h4>
        {average !== null ? (
          <p style={{ fontSize: "22px", fontWeight: 700, color: "#333" }}>
            {Math.round(average).toLocaleString()}원
          </p>
        ) : (
          <p style={{ color: "#aaa" }}>데이터 없음</p>
        )}
        <h5 style={{ color: "grey" }}>우리 동네에 이만큼 기여했어요!</h5>
      </section>

      {/* 장소별 미션 성공 횟수 */}
      <section
        style={{
          margin: "3vh 0",
          background: "#fff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h4 style={{ marginBottom: "12px", color: "#6C63FF" }}>
          나는 어디에 많이 소비했을까?
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={monthlyCategory}
              dataKey="missionsCompleted"
              nameKey="placeCategory"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#6C63FF"
              label
            >
              {monthlyCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* 커스텀 범례 (정수 퍼센트) */}
        <div style={{ marginTop: "10px" }}>
          {(() => {
            const total = monthlyCategory.reduce(
              (sum, e) => sum + e.missionsCompleted,
              0
            );
            return monthlyCategory.map((entry, index) => {
              const percent = total
                ? Math.round((entry.missionsCompleted / total) * 100)
                : 0;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "4px",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: COLORS[index % COLORS.length],
                      marginRight: "8px",
                      borderRadius: "2px",
                    }}
                  />
                  <span style={{ marginRight: "6px", fontWeight: 500 }}>
                    {entry.placeCategory}
                  </span>
                  <span style={{ color: "#666" }}>
                    {entry.missionsCompleted}회 ({percent}%)
                  </span>
                </div>
              );
            });
          })()}
        </div>
      </section>

      {/* 월별 총 소비량 */}
      <section
        style={{
          margin: "3vh 0",
          background: "#fff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h4 style={{ marginBottom: "20px", color: "#6C63FF" }}>
          나의 월별 소비액은
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="right"
              dataKey="missionsCompleted"
              fill="#82ca9d"
              name="완료 미션 수"
            />
            <Bar
              yAxisId="left"
              dataKey="totalAmount"
              fill="#6C63FF"
              name="총 소비액"
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default StatsPage;
