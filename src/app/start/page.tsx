import { permanentRedirect } from "next/navigation";

export default function StartRedirect() {
  permanentRedirect("/contact");
}
