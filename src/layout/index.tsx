import Footer from "@/components/footer";
import Header from "@/components/header";

export default function ({ children }: any) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow max-w-7xl mx-auto w-full">{children}</div>
        <Footer />
      </div>
    </>
  );
}
