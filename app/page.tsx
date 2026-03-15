export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>🪵 敲木鱼 - 后端服务</h1>
      <p>API 服务运行中</p>
      <ul>
        <li><code>GET /api/health</code> - 健康检查</li>
        <li><code>POST /api/migrate</code> - 执行数据库迁移</li>
        <li><code>GET /api/skins</code> - 获取皮肤列表</li>
      </ul>
    </div>
  );
}
