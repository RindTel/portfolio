import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Rindrit Telaku — Data Engineer";

// Social preview card. Colours are lifted straight from globals.css so the card
// reads as the same surface as the site: --bg, --text-primary, --text-secondary,
// --text-muted, --border, --green.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d1017",
          borderTop: "8px solid #4ade80",
          padding: "72px 80px",
        }}
      >
        {/* availability / role tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: "#4ade80",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6d7284",
            }}
          >
            Data Engineer
          </div>
        </div>

        {/* name + line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#e8eaf1",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Rindrit Telaku
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 32,
              color: "#aeb2bf",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Pipelines, intelligent retrieval systems, and backend infrastructure.
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #242a36",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#6d7284" }}>
            rindrittelaku.vercel.app
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6d7284" }}>
            Pristina, Kosovo
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
