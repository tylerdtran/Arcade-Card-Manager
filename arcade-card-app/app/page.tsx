'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import CardList from "./components/CardList";

export default function Home() {
  const router = useRouter();

  const handleAddCard = () => {
    router.push('/cards/new');
  }

  return (
    <div className="">
      <CardList onAddCard={handleAddCard} />
    </div>
  );
}
