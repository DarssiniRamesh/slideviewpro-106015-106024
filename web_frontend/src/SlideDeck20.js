import React from "react";
import VlinderLogo from "./VlinderLogo";
import "./slideDeckTheme.css";

// Modular component-based slide data model
// Each slide is an object with: { id, title, components }.
// Each component describes kind (e.g., text, image, diagram, footer, logo, list, badges, layout), and props.

export const SLIDE_DECK_20 = [
  {
    id: "slide-1",
    title: "Title Slide",
    components: [
      {
        type: "layout-row",
        key: "header-row",
        children: [
          { type: "logo", key: "logo-main", style: { height: 32, marginTop: 8, marginLeft: 6 } },
          { type: "text", key: "web-url", text: "www.vlinder.io", style: { fontSize: 16, color: "#02acd9", marginTop: 6, fontWeight: 500 }, align: "right" }
        ]
      },
      { type: "spacer", key: "spacer-1", flex: 1 },
      {
        type: "text",
        key: "main-title",
        text: <>Verifiable Credentials and <br /> Privacy Preserving Digital Wallet</>,
        style: { fontSize: "2.55rem", margin: "38px 0 32px 0", fontWeight: 700, textAlign: "center" }
      },
      {
        type: "layout-row",
        key: "date-row",
        style: { justifyContent: "flex-end", marginTop: 8 },
        children: [
          { type: "text", key: "date-label", text: "Date : Jul 2025", style: { color: "#878787", fontWeight: 500, fontSize: 15, marginRight: 14 } }
        ]
      },
      { type: "spacer", key: "spacer-2", flex: 1 },
      {
        type: "footer",
        key: "copyright",
        text: "Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io",
        style: { position: "absolute", left: 20, bottom: 24 }
      }
    ]
  },

  {
    id: "slide-2",
    title: "Platforms Overview",
    components: [
      { type: "logo", key: "logo-top", style: { height: 32 } },
      {
        type: "layout-grid",
        key: "platform-grid",
        columns: 3,
        style: { margin: "34px 0 18px 0" },
        children: [
          {
            type: "platform-card", key: "klefki",
            platform: "Klefki",
            description: "Secure, Frictionless ID & Credentials platform",
            color: "#1865b0"
          },
          {
            type: "platform-card", key: "trag",
            platform: "Trag",
            description: "Authenticity, Provenance & Supply Chain Traceability, Customer Engagement",
            color: "#f17a63"
          },
          {
            type: "platform-card", key: "vantr",
            platform: "Vantr",
            description: "Tokenization & Web3 Engagement",
            color: "#2fce98"
          }
        ]
      },
      {
        type: "list",
        key: "platform-bullets",
        items: [
          "3 Platforms on Blockchain Technology",
          "5 Patents Applied in Blockchain Space"
        ],
        style: { fontSize: 18, margin: "18px 0 16px 0", lineHeight: "1.7" }
      },
      {
        type: "footer",
        key: "copyright",
        text: "Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io",
        style: { marginTop: 40 }
      }
    ]
  },

  {
    id: "slide-3",
    title: "Company Profile",
    components: [
      { type: "logo", key: "logo-top", style: { height: 32 } },
      {
        type: "block",
        key: "company-summary",
        style: { marginTop: 20 },
        children: [
          {
            type: "text",
            key: "women-founded",
            text: <>Women Founded <span style={{ color: "#02acd9" }}>(MWBE Certified in US)</span></>,
            style: { fontWeight: 500, marginBottom: 10 }
          },
          { type: "text", key: "clients", text: "20+ Clients Onboarded" },
          { type: "text", key: "marketplaces", text: "Listed in Marketplaces (Including)", style: { marginTop: 7, color: "#a86a1e" } },
          { type: "text", key: "tagline", text: "vlinder Platforms – Enabling Trust and Transparency", style: { margin: "13px 0 8px 0", fontWeight: "bold", letterSpacing: "1px" } }
        ]
      }
    ]
  },

  {
    id: "slide-4",
    title: "Klefki Purpose",
    components: [
      {
        type: "block",
        key: "klefki-purpose",
        style: { paddingTop: 18 },
        children: [
          { type: "text", key: "klefki-title", text: "Klefki", style: { fontSize: "2rem", fontWeight: 700 } },
          {
            type: "text",
            key: "blkchain-desc",
            text: <>Blockchain-based Simple, Secure ID, Credentials &amp; Smart Contract platform.</>
          },
          {
            type: "list",
            key: "gdp-list",
            items: [
              <>Unlocks <b>3-13%</b> of Global GDP by:</>,
              [
                "Increasing Efficiency",
                "Enabling Inclusion",
                "Protecting Privacy"
              ]
            ],
            isNested: true,
            style: { margin: "16px 0 0 0", paddingLeft: "20px" }
          }
        ]
      },
      {
        type: "badges-row",
        key: "values",
        badges: [
          { text: "Trust" },
          { text: "Sustainability", style: "badge2" },
          { text: "Inclusion", style: "badge3" },
          { text: "Transparency", style: "badge4" }
        ],
        style: { marginTop: 24 }
      },
      { type: "text", key: "purpose", text: "Purpose: Enable inclusive and sustainable ecosystem with trust as underpinning foundation", style: { fontWeight: 500, margin: "23px 0 0", fontSize: "1.13rem", color: "#1565c0" } }
    ]
  },

  {
    id: "slide-5",
    title: "Digital ID Ecosystem Market Size",
    components: [
      {
        type: "block",
        key: "market-stat-block",
        style: { textAlign: "center", background: "#f8ffe5" },
        children: [
          { type: "text", key: "stat-title", text: "Digital ID Ecosystem: Market Size 3-13% of Global GDP", style: { fontSize: 24, fontWeight: 700, color: "#1565c0" } }
        ]
      },
      { type: "text", key: "stat-desc", text: "Smartphone/internet penetration: Sub-Saharan Africa, 2021/2025 (statistic from PDF)", style: { margin: "38px 0 0 0", textAlign: "left", color: "#2E4625", fontSize: 18, fontWeight: 500 } },
      {
        type: "footer",
        key: "copyright",
        text: "Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io",
        style: { marginTop: 60 }
      }
    ]
  },

  // ...slides 6-20 follow the same modular/structure pattern...
];
