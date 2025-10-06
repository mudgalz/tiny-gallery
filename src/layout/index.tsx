import Header from "@/components/header";

export default function ({ children }: any) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow max-w-[1400px] mx-auto w-full">{children}</div>
      </div>
    </>
  );
}
