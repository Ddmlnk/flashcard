import { useContext } from "react";
import { CardsContext } from "../context/CardsContext";

export function useCards() {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used inside <CardsProvider>");
  }
  return context;
}
