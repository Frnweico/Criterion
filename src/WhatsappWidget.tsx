import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppWidget = ({ 
  phoneNumber, 
  message = "Hello! I'm interested in learning more about your properties." 
}: WhatsAppWidgetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // Show widget after initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Increased to 2s to ensure page is fully loaded

    return () => clearTimeout(timer);
  }, []);

  // Hide widget during route changes, then show after animation
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClick = () => {
    const formattedNumber = phoneNumber.replace(/[^0-9]/g, "");
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        backgroundColor: "#25D366",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isHovered ? 1.1 : 1}) translateY(${isVisible ? 0 : "16px"})`,
        transition: "all 0.3s ease",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
      >
        <path
          fill="white"
          d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.924 0-7.435 6.032-13.467 13.467-13.467s13.467 6.032 13.467 13.467-6.032 13.467-13.467 13.467zM21.92 18.574c-0.328-0.164-1.938-0.957-2.239-1.066s-0.52-0.164-0.738 0.164c-0.219 0.328-0.847 1.066-1.038 1.284s-0.383 0.246-0.711 0.082c-0.328-0.164-1.386-0.511-2.639-1.629-0.975-0.871-1.634-1.946-1.825-2.274s-0.020-0.505 0.144-0.668c0.148-0.148 0.328-0.383 0.492-0.574s0.219-0.328 0.328-0.547c0.109-0.219 0.055-0.41-0.027-0.574s-0.738-1.779-1.011-2.436c-0.267-0.643-0.54-0.554-0.738-0.567-0.191-0.012-0.41-0.015-0.629-0.015s-0.574 0.082-0.875 0.41c-0.301 0.328-1.149 1.121-1.149 2.733s1.175 3.171 1.339 3.389c0.164 0.219 2.313 3.534 5.604 4.957 0.783 0.339 1.394 0.541 1.870 0.692 0.788 0.249 1.504 0.213 2.070 0.129 0.632-0.095 1.938-0.793 2.211-1.557s0.273-1.421 0.191-1.557c-0.082-0.137-0.301-0.219-0.629-0.383z"
        />
      </svg>
    </button>
  );
};

export default WhatsAppWidget;