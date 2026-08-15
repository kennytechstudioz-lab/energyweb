"use client";

import { useEffect } from "react";

export default function SmartsuppWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set Smartsupp Key
    (window as any)._smartsupp = (window as any)._smartsupp || {};
    (window as any)._smartsupp.key = "3f90232aaaddae0be4c1fd99d846fb2138c7d616";

    // Prevent duplicate script injection
    if (document.getElementById("smartsupp-script")) return;

    // Inject Smartsupp loader script
    const s = document.createElement("script");
    s.id = "smartsupp-script";
    s.type = "text/javascript";
    s.charset = "utf-8";
    s.async = true;
    s.src = "https://www.smartsuppchat.com/loader.js?";

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(s, firstScript);
    } else {
      document.head.appendChild(s);
    }
  }, []);

  return null;
}
