import React from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";

const sidebarInfo = [
  { icon: ">", text: "Real-time messaging" },
  { icon: ">", text: "Secure & private" },
  { icon: ">", text: "Mobile-friendly" },
  { icon: ">", text: "Customizable themes" },
];

const whatsNew = [
  "Group chat support",
  "File Sharing",
  "Emoji reactions",
];
 

const Landingpage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #87ceeb 0%, #ffffff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "2rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          padding: "2.5rem 2rem 2rem 2rem",
          marginRight: "2.5rem",
          minWidth: "270px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Innovative Chat Icon */}
        <div
          style={{
            background: "linear-gradient(135deg, #0ea5e9 60%, #0369a1 100%)",
            borderRadius: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(14,165,233,0.15)",
            marginBottom: "1.2rem",
            marginTop: "-3.5rem",
            border: "4px solid #fff",
            zIndex: 2,
          }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#fff"/>
            <path d="M7 10.5C7 9.11929 8.11929 8 9.5 8H14.5C15.8807 8 17 9.11929 17 10.5V13.5C17 14.8807 15.8807 16 14.5 16H10.4142C10.149 16 9.89464 16.1054 9.70711 16.2929L8.35355 17.6464C8.15829 17.8417 7.84171 17.8417 7.64645 17.6464C7.45118 17.4512 7.45118 17.1346 7.64645 16.9393L8.29289 16.2929C8.10536 16.1054 8 15.851 8 15.5858V10.5Z" stroke="#0ea5e9" strokeWidth="1.5"/>
          </svg>
        </div>
        {/* Welcome message */}
        <div style={{marginBottom: "1.2rem", textAlign: "center"}}>
          <span style={{fontWeight: "bold", color: "#0369a1", fontSize: "1.1rem"}}>Welcome to V2text!</span>
          <p style={{fontSize: "0.98rem", color: "#0ea5e9", margin: 0}}>Your conversations, reimagined.</p>
        </div>
        {/* What's New section */}
        <div style={{width: "100%", marginBottom: "1.2rem"}}>
          <span style={{fontWeight: "bold", color: "#0369a1", fontSize: "1rem"}}>What's New <span style={{background: "#0ea5e9", color: "#fff", borderRadius: "8px", fontSize: "0.8rem", padding: "2px 8px", marginLeft: "0.5rem"}}>NEW</span></span>
          <ul style={{listStyle: "disc inside", color: "#0369a1", fontSize: "0.98rem", margin: "0.5rem 0 0 0.5rem", padding: 0}}>
            {whatsNew.map((item, idx) => (
              <li key={idx} style={{marginBottom: "0.2rem"}}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Features with hover effect */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
          {sidebarInfo.map((item, idx) => (
            <li key={idx} style={{ fontSize: "1.1rem", marginBottom: "1.2rem", display: "flex", alignItems: "center", cursor: "pointer", borderRadius: "8px", padding: "0.3rem 0.5rem", transition: "background 0.2s" }}
              onMouseOver={e => e.currentTarget.style.background = '#e0f2fe'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: "1.5rem", marginRight: "0.7rem" }}>{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
        {/* Testimonial */}
        <div style={{margin: "1.5rem 0 0.5rem 0", fontStyle: "italic", color: "#0369a1", fontSize: "0.98rem", textAlign: "center"}}>
          "The best chat experience I've ever had!"<br/>
          <span style={{fontWeight: "bold", color: "#0ea5e9"}}>- Alex, Power User</span>
        </div>
        {/* Sidebar CTA */}
        <Link
          to="/signup"
          style={{
            marginTop: "1.2rem",
            background: "linear-gradient(90deg, #0ea5e9 60%, #0369a1 100%)",
            color: "#fff",
            fontWeight: "bold",
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(14,165,233,0.10)",
            fontSize: "1rem",
            letterSpacing: "0.5px",
            transition: "background 0.2s, color 0.2s",
            display: "inline-block"
          }}
        >
          Make Your first Experience
        </Link>
      </aside>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <header>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#0369a1",
              textShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
             V2text
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "500px",
              margin: "0 auto 1.2rem",
              color: "#0ea5e9",
            }}
          >
            Connect, chat, and collaborate in real-time. Experience seamless conversations with friends, family, and colleagues—anytime, anywhere.
          </p>
          <span style={{display: "inline-block", color: "#0369a1", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "1.5rem"}}>
            Fast. Interactive. Fun.
          </span>
        </header>
        <div style={{position: "relative", marginBottom: "3rem"}}>
          <img
            src="public\dpIcon.webp"
            alt="Chat friendly"
            style={{
              width: "35px",
              borderRadius: "1.5rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              animation: "float 3s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-16px); }
              100% { transform: translateY(0px); }
            }
          `}</style>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <Link
            to="/login"
            style={{
              background: "#0369a1",
              color: "#fff",
              fontWeight: "bold",
              padding: "0.75rem 2rem",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{
              background: "#fff",
              color: "#0369a1",
              fontWeight: "bold",
              padding: "0.75rem 2rem",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              border: "2px solid #0369a1",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Sign Up
          </Link>
        </div>
        <footer style={{ fontSize: "0.9rem", color: "#0369a1", marginTop: "auto" }}>
          © {new Date().getFullYear()} V2text. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Landingpage;
