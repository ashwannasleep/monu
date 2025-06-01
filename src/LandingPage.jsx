import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, confirmSignUp, signIn, fetchAuthSession } from "aws-amplify/auth";

import { safeSetItem, safeGetItem } from "./safeStorage";
import "./LandingPage.css";
import AuthModal from "./AuthModal";

export default function LandingPage() {
  const navigate = useNavigate();

  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signIn");
  const [signupUser, setSignupUser] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const session = await fetchAuthSession();
        if (session?.tokens) {
          let displayName = safeGetItem("monu_name");
          if (!displayName) {
            try {
              const { getCurrentUser, fetchUserAttributes } = await import("aws-amplify/auth");
              const currentUser = await getCurrentUser();
              if (currentUser) {
                const attributes = await fetchUserAttributes();
                if (attributes.name) {
                  displayName = attributes.name;
                  safeSetItem("monu_name", displayName);
                } else if (attributes.email) {
                  displayName = attributes.email;
                }
              }
            } catch (attrError) {
              console.error("Error fetching user attributes:", attrError);
              displayName = "there";
            }
          }
          showQuoteAndPrepare(displayName || "there");
        }
      } catch (error) {
        // no active session
      }
    };
    checkExistingSession();
  }, []);

  const quotes = [
    "Take your time, {name}.",
    "Everything starts here, {name}.",
    "Let today be gentle, {name}.",
    "{name}, the moment is yours.",
    "It's okay to go slow, {name}.",
    "This space belongs to you.",
    "Little steps, {name}, lasting change.",
    "This is where it begins, {name}.",
    "{name}, you've arrived.",
  ];

  const showQuoteAndPrepare = (name) => {
    setShowAuthModal(false);
    setShowVerification(false);
    safeSetItem("monu_name", name);
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    const personalized = picked.includes("{name}")
      ? picked.replace("{name}", name)
      : `${picked} — ${name}`;
    setQuote(personalized);
    setShowQuote(true);
  };

  const handleSignUp = async ({ username, password, name }) => {
    try {
      await signUp({
        username,
        password,
        options: { userAttributes: { email: username, name } },
      });
      setSignupUser(username);
      setSignupPassword(password);
      safeSetItem("monu_name", name);
      setShowAuthModal(false);
      setShowVerification(true);
    } catch (error) {
      console.error("Sign-up error:", error);
      alert(error.message || "Error during sign-up.");
    }
  };

  const handleSignIn = async ({ username, password }) => {
    try {
      const signInResult = await signIn({ username, password });
      if (signInResult.isSignedIn) {
        try {
          const { tokens } = await fetchAuthSession();
          if (tokens) {
            let displayName = safeGetItem("monu_name");
            if (!displayName || displayName === username) {
              const { getCurrentUser, fetchUserAttributes } = await import("aws-amplify/auth");
              const currentUser = await getCurrentUser();
              if (currentUser) {
                const attributes = await fetchUserAttributes();
                if (attributes.name) {
                  displayName = attributes.name;
                  safeSetItem("monu_name", displayName);
                }
              }
            }
            displayName = displayName || username;
            showQuoteAndPrepare(displayName);
          }
        } catch (attrError) {
          console.error("Error fetching user attributes:", attrError);
          showQuoteAndPrepare(username);
        }
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert(error.message || "Error during sign-in.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      await confirmSignUp({
        username: signupUser,
        confirmationCode: verificationCode.trim(),
      });
    } catch (error) {
      if (
        error.message?.includes("Current status is CONFIRMED") ||
        error.code === "NotAuthorizedException"
      ) {
        // already confirmed
      } else {
        console.error("Verification error:", error);
        alert(`${error.code || ""}: ${error.message || "Invalid code."}`);
        return;
      }
    }
    const displayName = safeGetItem("monu_name") || signupUser;
    showQuoteAndPrepare(displayName);
    try {
      await signIn({ username: signupUser, password: signupPassword });
    } catch {
      // ignore
    }
  };

  // 💥 Force modal scaling on small screens globally
  useEffect(() => {
    const applyForcedModalResize = () => {
      const modals = document.querySelectorAll(".modal-content");
      modals.forEach((modal) => {
        if (window.innerWidth <= 480) {
          modal.style.width = "90%";
          modal.style.maxWidth = "300px";
          modal.style.padding = "10px";
          modal.style.transform = "scale(0.85)";
        } else {
          modal.style.width = "";
          modal.style.maxWidth = "";
          modal.style.padding = "";
          modal.style.transform = "";
        }
      });
    };

    applyForcedModalResize();
    window.addEventListener("resize", applyForcedModalResize);
    return () => window.removeEventListener("resize", applyForcedModalResize);
  }, [showAuthModal, showVerification]);

  return (
    <div className="landing-container">
      <div className="transform scale-170 origin-center">
        <h1 className="text-5xl md:text-6xl font-serif font-semibold tracking-wide mb-4">
          MONU
        </h1>
        <p className="italic text-xl md:text-xl text-[#5A5A5A] mb-10">
          moment & you
        </p>

        {showAuthModal && (
          <AuthModal
            initialMode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSignUp={handleSignUp}
            onSignIn={handleSignIn}
          />
        )}

        {showVerification && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="text-lg text-[#5A5A5A] mb-5">
                We've sent a verification code to <strong>{signupUser}</strong>.
                Please enter it:
              </h3>
              <input
                type="text"
                placeholder="Verification code"
                className="px-4 py-2 border border-gray-400 rounded-xl bg-white text-center w-64 shadow-sm focus:outline-none"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                className="mt-4 bg-[#C7BFB2] hover:bg-[#b3aa9d] px-6 py-2 rounded-full"
              >
                Verify
              </button>
            </div>
          </div>
        )}

        {!showQuote && !showVerification && !showAuthModal && (
          <div className="flex flex-col items-center space-y-5 animate-fade-in">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signIn");
                setShowAuthModal(true);
              }}
              className="monu-button"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("signUp");
                setShowAuthModal(true);
              }}
              className="monu-button"
            >
              Sign Up
            </button>
          </div>
        )}

        {showQuote && !showVerification && (
          <div className="mt-16 flex flex-col items-center space-y-6 animate-slidefade">
            <p className="quote-text">{quote}</p>
            <button
              onClick={() => navigate("/choose")}
              className="monu-button px-8 py-5 w-auto max-w-[240px] mx-auto"
            >
              Start Planning
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
