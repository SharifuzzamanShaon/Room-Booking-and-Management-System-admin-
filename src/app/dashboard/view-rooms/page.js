import DisplayRooms from "@/components/DisplayRooms";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto px-4 justify-between items-center min-h-screen py-6">
        <DisplayRooms />
      </div>
    </div>
  );
}
