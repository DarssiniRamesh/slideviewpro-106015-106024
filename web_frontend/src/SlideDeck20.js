import React from "react";
import VlinderLogo from "./VlinderLogo";
import "./slideDeckTheme.css";

// Inline utility icon for URLs in bullet lists
const WebIcon = () => (
  <svg width="17" height="17" style={{ marginRight: 6, color: "#02acd9" }} viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#02acd9" strokeWidth="1" fill="none"/><path d="M5 10h10M10 5a13 13 0 0 1 0 10M10 5a13 13 0 0 0 0 10" stroke="#02acd9" strokeWidth="1"/></svg>
);

export const SLIDE_DECK_20 = [
  // Slide 1: Title 
  {
    render: () => (
      <div className="slide-body" style={{ minHeight: 480, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <VlinderLogo style={{ height: 32, marginTop: 8, marginLeft: 6 }} />
          <div style={{ fontSize: 16, color: "#02acd9", marginTop: 6, fontWeight: 500 }}>www.vlinder.io</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ textAlign: "center", marginTop: -36 }}>
          <div className="slide-title" style={{ fontSize: "2.55rem", margin: "38px 0 32px 0", fontWeight: 700 }}>
            Verifiable Credentials and <br /> Privacy Preserving Digital Wallet
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <div style={{ color: "#878787", fontWeight: 500, fontSize: 15, marginRight: 14 }}>Date : Jul 2025</div>
        </div>
        <div style={{ flex: 1 }} />
        <footer className="slide-footer" style={{ position: "absolute", left: 20, bottom: 24 }}>
          Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io
        </footer>
      </div>
    )
  },

  // Slide 2: Platforms Overview
  {
    render: () => (
      <div className="slide-body">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <VlinderLogo style={{ height: 32 }} />
        </div>
        <div className="grid-3col" style={{ margin: "34px 0 18px 0" }}>
          <div className="platform-card">
            <div style={{ fontWeight: 600, fontSize: 20, color: "#1865b0" }}>Klefki</div>
            <div style={{ marginTop: 4 }}>
              Secure, Frictionless ID &amp; Credentials platform
            </div>
          </div>
          <div className="platform-card">
            <div style={{ fontWeight: 600, fontSize: 20, color: "#f17a63" }}>Trag</div>
            <div style={{ marginTop: 4 }}>
              Authenticity, Provenance & Supply Chain Traceability, Customer Engagement
            </div>
          </div>
          <div className="platform-card">
            <div style={{ fontWeight: 600, fontSize: 20, color: "#2fce98" }}>Vantr</div>
            <div style={{ marginTop: 4 }}>
              Tokenization & Web3 Engagement
            </div>
          </div>
        </div>
        <ul style={{ fontSize: 18, margin: "18px 0 16px 0", lineHeight: "1.7" }}>
          <li>3 Platforms on Blockchain Technology</li>
          <li>5 Patents Applied in Blockchain Space</li>
        </ul>
        <footer className="slide-footer" style={{ marginTop: 40 }}>
          Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io
        </footer>
      </div>
    ),
  },

  // Slide 3: Company Profile
  {
    render: () => (
      <div className="slide-body">
        <VlinderLogo style={{ height: 32 }} />
        <div className="slide-block" style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 500, marginBottom: 10 }}>
            Women Founded <span style={{ color: "#02acd9" }}>(MWBE Certified in US)</span>
          </div>
          <div>20+ Clients Onboarded</div>
          <div style={{ marginTop: 7, color: "#a86a1e" }}>
            Listed in Marketplaces (Including)
          </div>
          <div style={{ margin: "13px 0 8px 0", fontWeight: "bold", letterSpacing: "1px" }}>
            vlinder Platforms – Enabling Trust and Transparency
          </div>
        </div>
      </div>
    )
  },

  // Slide 4: Klefki Purpose
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-block" style={{ paddingTop: 18 }}>
          <span className="slide-title" style={{ fontSize: "2rem" }}>Klefki</span>
          <div style={{ margin: "10px 0 0 0" }}>
            Blockchain-based Simple, Secure ID, Credentials &amp; Smart Contract platform.<br />
            <ul style={{ margin: "16px 0 0 0", paddingLeft: "20px" }}>
              <li>Unlocks <b>3-13%</b> of Global GDP by:</li>
              <ul style={{ marginTop: 4 }}>
                <li>Increasing Efficiency</li>
                <li>Enabling Inclusion</li>
                <li>Protecting Privacy</li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="slide-badge-row" style={{ marginTop: 24 }}>
          <span className="slide-badge">Trust</span>
          <span className="slide-badge badge2">Sustainability</span>
          <span className="slide-badge badge3">Inclusion</span>
          <span className="slide-badge badge4">Transparency</span>
        </div>
        <div style={{ fontWeight: 500, margin: "23px 0 0", fontSize: "1.13rem", color: "#1565c0" }}>
          Purpose: Enable inclusive and sustainable ecosystem with trust as underpinning foundation
        </div>
      </div>
    ),
  },

  // Slide 5: Digital ID Ecosystem Market Size
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-block" style={{ textAlign: "center", background: "#f8ffe5" }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#1565c0" }}>
            Digital ID Ecosystem: Market Size 3-13% of Global GDP
          </span>
        </div>
        <div style={{ margin: "38px 0 0 0", textAlign: "left", color: "#2E4625", fontSize: 18, fontWeight: 500 }}>
          <span>Smartphone/internet penetration: Sub-Saharan Africa, 2021/2025 (statistic from PDF)</span>
        </div>
        <footer className="slide-footer" style={{ marginTop: 60 }}>
          Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io
        </footer>
      </div>
    )
  },

  // Slide 6: Klefki Solution
  {
    render: () => (
      <div className="slide-body">
        <div style={{ display: "flex", gap: 17, marginBottom: 12 }}>
          <span className="slide-badge">Transparency</span>
          <span className="slide-badge badge3">Inclusion</span>
          <span className="slide-badge badge2">Efficiency</span>
          <span className="slide-badge badge4">Security</span>
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            <div className="slide-subtitle" style={{ marginBottom: 7 }}>For Institutions &amp; Governments</div>
            <ul>
              <li>Mobile Wallet (Blockchain enabled Decentralized ID &amp; Credentials)</li>
              <li>API/Dashboard</li>
              <li>w3c compliant</li>
              <li>Privacy by Design</li>
              <li>Triple Blind (Digital Signature)</li>
              <li>Blockchain Agnostic</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <div className="slide-subtitle" style={{ marginBottom: 7 }}>Value Creation Per Region</div>
            <ul>
              <li>Canada/Caribbean</li>
              <li>India</li>
              <li>Other</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 7: Klefki Parametric Insurance Platform
  {
    render: () => (
      <div className="slide-body">
        <div style={{ display: "flex", gap: 17, marginBottom: 12 }}>
          <span className="slide-badge">Transparency</span>
          <span className="slide-badge badge3">Inclusion</span>
          <span className="slide-badge badge2">Efficiency</span>
          <span className="slide-badge badge4">Security</span>
        </div>
        <div style={{ display: "flex", gap: 36, marginTop: 18 }}>
          <div style={{ flex: 1 }}>
            <div className="slide-subtitle" style={{ marginBottom: 7 }}>Institutions / Government Features</div>
            <ul>
              <li>Rapid onboarding & claims processing</li>
              <li>Parametric insurance event triggers</li>
              <li>Automation via Smart Contracts</li>
              <li>Customizable privacy settings</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <div className="slide-block" style={{ textAlign: "center", background: "#eaf8f2" }}>
              <span style={{ color: "#2fce98", fontWeight: 700 }}>
                Value Created: Faster, fairer insurance outcomes for all stakeholders
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // Slide 8: Data Protection and Privacy Laws
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title" style={{ fontSize: "2.1rem" }}>Data Protection &amp; Privacy Laws</div>
        <ul style={{ fontSize: 18, margin: "14px 0" }}>
          <li><WebIcon />LACChain <a className="slide-link" href="https://www.lacchain.net/">https://www.lacchain.net/</a></li>
          <li>Pan-Canadian Trust Framework</li>
          <li>European Union Consortium</li>
          <li><WebIcon />GDPR</li>
          <li><WebIcon />Microsoft Marketplace <a className="slide-link" href="https://appsource.microsoft.com/">Microsoft AppSource</a></li>
        </ul>
        <div style={{ marginTop: 18, color: "#1865b0", fontWeight: 500, fontSize: "1.05rem" }}>
          Privacy settings can be defined and controlled at each verifiable credential level.
        </div>
      </div>
    ),
  },

  // Slide 9: Demo and DiD Screen Prints
  {
    render: () => (
      <div className="slide-body">
        <div style={{ marginBottom: 15 }}>
          <ul style={{ fontSize: 18 }}>
            <li>Face Recognition (Verified with ID on file)</li>
            <li>Digital Signature Capture</li>
            <li>DiD – Obtaining, Sharing Verified Credentials <span style={{ color: "#888" }}>(Enabled in Caribbean, Implementing for FinTech in India)</span></li>
          </ul>
        </div>
        <div className="diagram-placeholder">
          [Demo screenshots or screen prints placeholder]
        </div>
      </div>
    ),
  },

  // Slide 10: Digital Privacy Preserving Wallet
  {
    render: () => (
      <div className="slide-body" style={{ alignItems: "center" }}>
        <div className="slide-title" style={{ textAlign: "center" }}>
          Klefki: Digital Privacy Preserving Wallet
        </div>
        <div className="diagram-placeholder" style={{ marginTop: 28, marginBottom: 36 }}>
          [Wallet illustration or symbol placeholder]
        </div>
        <footer className="slide-footer" style={{ marginTop: 30, textAlign: "center" }}>
          Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io
        </footer>
      </div>
    ),
  },

  // Slide 11: Digital ID / Credentials Platform
  {
    render: () => (
      <div className="slide-body" style={{ alignItems: "center" }}>
        <div className="slide-title" style={{ marginBottom: 32 }}>Klefki: Digital ID / Credentials Platform</div>
        <div className="slide-badge-row" style={{ justifyContent: "center" }}>
          <span className="slide-badge">Trust</span>
          <span className="slide-badge badge3">Inclusion</span>
          <span className="slide-badge badge2">Efficiency</span>
          <span className="slide-badge badge4">Security &amp; Privacy</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 19, textAlign: "center", color: "#02acd9" }}>
          Citizen Lifecycle – Cradle to Grave
        </div>
      </div>
    ),
  },

  // Slide 12: Financial Services Platform Use Cases
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title" style={{ fontSize: "2.02rem", marginBottom: 22 }}>
          Financial Services – Our Platform Use Cases
        </div>
        <ul style={{ fontSize: 18 }}>
          <li className="icon-bullet"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#02acd9" /></svg>Digital Mortgage Processing (including eKYC)</li>
          <li className="icon-bullet"><svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" fill="#f17a63" /></svg>Algorithmic Smart Contracts</li>
          <li className="icon-bullet"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="8" height="8" fill="#f8e248" /></svg>Real Estate, Stock, Commodity</li>
          <li className="icon-bullet"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="#2fce98" /></svg>ESG Traceability + Carbon Credits</li>
          <li className="icon-bullet"><svg viewBox="0 0 24 24"><polygon points="12,4 20,20 4,20" fill="#1565c0" /></svg>Parametric Insurance against Natural Disasters</li>
        </ul>
      </div>
    ),
  },

  // Slide 13: Financial Services Verification
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title" style={{ fontSize: "2.02rem", marginBottom: 28 }}>
          Financial Services Verification (including remote KYC)
        </div>
        <div className="diagram-placeholder">
          [Use case diagram/illustration placeholder]
        </div>
      </div>
    ),
  },

  // Slide 14-16: Indicative Transactions (14)
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title" style={{ fontSize: "2.02rem", marginBottom: 28 }}>
          Indicative Transaction (with Privacy maintained)
        </div>
        <div className="diagram-placeholder">
          [Indicative Transaction Diagram 1 placeholder]
        </div>
      </div>
    ),
  },
  // Slide 15
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title" style={{ fontSize: "2.02rem", marginBottom: 28 }}>
          Indicative Transaction (with Privacy maintained)
        </div>
        <div className="diagram-placeholder">
          [Indicative Transaction Diagram 2 placeholder]
        </div>
      </div>
    ),
  },
  // Slide 16
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title" style={{ fontSize: "2.02rem", marginBottom: 28 }}>
          Indicative Transaction (with Privacy maintained)
        </div>
        <div className="diagram-placeholder">
          [Indicative Transaction Diagram 3 placeholder]
        </div>
      </div>
    ),
  },

  // Slide 17: Case Study – Digilocker Integration
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title">Case Study: Digilocker (Government of India) Integration for eKYC</div>
        <ul style={{ fontSize: 18, margin: "24px 0 0" }}>
          <li>
            Government Issued + Private Issued Documents from Digilocker as W3C Verifiable Credentials
          </li>
          <li>Use cases: eKYC, Proof of Life</li>
        </ul>
        <div className="slide-block" style={{ background: "#eaf8f2", marginTop: 32 }}>
          <span style={{ color: "#02acd9", fontWeight: 700 }}>Trusted integration with government digital services.</span>
        </div>
      </div>
    ),
  },

  // Slide 18: Success Story 01 – Loan Processing
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title">Success Story 01: Loan processing in India &amp; N. America</div>
        <ul style={{ fontSize: 18, margin: "22px 0 0 0" }}>
          <li>Loan Processing Time reduced from 4 Months to &lt;2 Weeks (could be minutes)</li>
          <li>Integration with ecosystem players (Lender, Land Registry, Attorney, Title Insurance Provider, ID Verifier)</li>
          <li>Klefki: Digital ID + Biometrics/Liveness check, instant eKYC + Remote signing</li>
          <li>Deployed since June 2020</li>
          <li>Clients: Mortgage Processing Firm in Canada</li>
        </ul>
        <div className="slide-block" style={{ background: "#f8e248", marginTop: 30, fontWeight: 600, color: "#1565c0" }}>
          Remarkable reduction in loan processing time and enhanced compliance.
        </div>
      </div>
    ),
  },

  // Slide 19: Success Story 02 – Parametric Insurance
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title">Success Story 02: Parametric Insurance Product in the Caribbean</div>
        <ol style={{ fontSize: 18, marginTop: 25 }}>
          <li>
            Instant purchase via Klefki app; insurance deed issued on Blockchain; smart contract created.
          </li>
          <li>
            Registers with weather oracle; triggers smart contract on event; instant payouts to citizens.
          </li>
        </ol>
        <footer className="slide-footer">
          Deployed since Feb 2021 in Caribbean
        </footer>
        <div className="diagram-placeholder" style={{ marginTop: 18 }}>
          [Sequential steps / flow diagram placeholder]
        </div>
      </div>
    ),
  },

  // Slide 20: Success Story 03 – Data Security Council of India
  {
    render: () => (
      <div className="slide-body">
        <div className="slide-title">Success Story 03: Data Security Council of India</div>
        <div style={{ fontSize: "1.08rem", marginTop: 8, color: "#212529" }}>
          Data Security Council Of India – Promoted By Ministry Of Electronics And Information Technology, Government of India.
          <br />
          <span style={{ color: "#02acd9", textDecoration: "underline dotted", cursor: "pointer" }}>Click to view certificate validity</span>
        </div>
        <ul style={{ fontSize: 17, margin: "17px 0" }}>
          <li>Digital platform for Verifying, issuing, and sharing DSCI certificates</li>
          <li>Dashboard with digital signature, public key fusion</li>
          <li>Features:
            <ul>
              <li>Certificate templates</li>
              <li>Participant data, course info</li>
              <li>Valid from/till</li>
            </ul>
          </li>
        </ul>
        <footer className="slide-footer" style={{ marginTop: 14 }}>
          Confidential and Proprietary. All rights reserved (c) 2022 vlinder.io
        </footer>
        <div className="diagram-placeholder" style={{ marginTop: 18 }}>
          [Timeline/process diagram, digital signature/dashboard features placeholder]
        </div>
      </div>
    ),
  },
];
