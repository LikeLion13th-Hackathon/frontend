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

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

  return (
    <div style={{ padding: "2vh" }}>
      <Header>
        <BackIcon size={20} onClick={() => navigate(-1)} />
        <h3>내 소비/미션 통계</h3>
      </Header>

      {/* 평균 소비액 */}
      <section style={{ margin: "3vh 0" }}>
        <h4>미션별 평균 소비 금액</h4>
        {average !== null ? (
          <p style={{ fontSize: "18px", fontWeight: 600 }}>
            {average.toLocaleString()} 원
          </p>
        ) : (
          <p>데이터 없음</p>
        )}
      </section>

      {/* 월별 총 소비량 */}
      <section style={{ margin: "3vh 0" }}>
        <h4>월별 총 소비 금액</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalAmount" fill="#8884d8" name="총 소비 금액" />
            <Bar
              dataKey="missionsCompleted"
              fill="#82ca9d"
              name="완료 미션 수"
            />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 장소별 미션 성공 횟수 */}
      <section style={{ margin: "3vh 0" }}>
        <h4>장소별 미션 성공 횟수</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={monthlyCategory}
              dataKey="missionsCompleted"
              nameKey="placeCategory"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
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
      </section>
    </div>
  );
}

export default StatsPage;
