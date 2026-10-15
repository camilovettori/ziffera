import { permanentRedirect } from "next/navigation";

// Prices are quoted per project after a call; the old price list now
// lives in git history.
export default function PricingRedirect() {
  permanentRedirect("/#engagement");
}
