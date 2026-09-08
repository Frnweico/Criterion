"use client";

import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/site";
import styles from "./WhatsAppWidget.module.css";

const WHATSAPP_NUMBER = CONTACT.phone.replace(/\D/g, "");
const MESSAGE = "Hello Criterion Homes, I would like to make an enquiry.";

/** A direct, site-wide contact route that respects the ad-only Approach page. */
export default function WhatsAppWidget() {
  const pathname = usePathname();

  // The Approach page is a deliberately single-action traffic page, without
  // live contact prompts. Every other site route can offer direct WhatsApp.
  if (pathname === "/approach") return null;

  return (
    <a
      className={styles.widget}
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Criterion Homes on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12.04 2a9.91 9.91 0 0 0-8.4 15.18L2.5 21.5l4.45-1.13A10 10 0 1 0 12.04 2Zm0 18.18a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-2.64.67.7-2.57-.2-.31a8.2 8.2 0 1 1 6.61 3.63Zm4.5-6.14c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.57.12-.17.25-.65.8-.8.97-.14.17-.29.19-.54.07a6.72 6.72 0 0 1-1.97-1.21 7.37 7.37 0 0 1-1.36-1.7c-.14-.25 0-.38.1-.5.1-.1.24-.29.36-.43.12-.15.16-.25.24-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.13 0 1.25.91 2.46 1.04 2.63.13.17 1.79 2.73 4.34 3.83.61.26 1.08.42 1.45.54.61.2 1.17.17 1.61.1.49-.08 1.47-.6 1.68-1.17.21-.58.21-1.07.15-1.17-.06-.1-.23-.16-.48-.28Z" />
      </svg>
      <span className="visually-hidden">Chat with Criterion Homes on WhatsApp</span>
    </a>
  );
}
