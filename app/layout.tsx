export const metadata = {
  title: "敲木鱼 - 后端服务",
  description: "敲木鱼微信小程序后端API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
