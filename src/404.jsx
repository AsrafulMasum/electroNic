import { Button, ConfigProvider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import NotFoundImg from "./assets/not-found.png";

function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#333333",
            fontSize: "96px",
            fontWeight: 600,
            lineHeight: "115px",
            letterSpacing: "2.88px",
          }}
        >
          404 Not Found
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 400,
            textAlign: "center",
            color: "#636363",
            lineHeight: "24px",
            marginTop: "24px",
          }}
        >
          Visited page not found, please go to homepage.
        </p>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#09B782",
            },
          }}
        >
          <Button
            style={{
              color: "#ffffff",
              height: "44px",
              width: "147px",
              fontWeight: "500",
              fontSize: "14px",
              background: "#09B782",
              borderRadius: "8px",
              marginTop: "60px",
            }}
          >
            <Link to="/">Go home page</Link>
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default NotFound;
