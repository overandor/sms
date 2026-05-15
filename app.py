import os
import re
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple

import gradio as gr

try:
    from twilio.rest import Client as TwilioClient
except Exception:  # Twilio is optional; the dashboard still runs without it.
    TwilioClient = None


APP_TITLE = "Membra Money SMS Dashboard"
SUPPORTED_ASSETS = ("BTC", "USDC", "SOL")
DENOMINATIONS = (1, 5, 10, 50, 100)


@dataclass
class Note:
    id: str
    asset: str
    denomination: int
    owner: str
    status: str = "minted"
    created_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat(timespec="seconds"))
    claimed_by: Optional[str] = None
    redeemed_at: Optional[str] = None


@dataclass
class Ledger:
    notes: Dict[str, Note] = field(default_factory=dict)
    events: List[str] = field(default_factory=list)

    def add_event(self, message: str) -> None:
        stamp = datetime.now(timezone.utc).strftime("%H:%M:%S UTC")
        self.events.insert(0, f"{stamp} · {message}")
        self.events = self.events[:16]

    def mint(self, owner: str, asset: str, denomination: int, count: int) -> List[Note]:
        minted = []
        for _ in range(max(1, min(count, 25))):
            note = Note(
                id=f"MBR-{uuid.uuid4().hex[:10].upper()}",
                asset=asset,
                denomination=denomination,
                owner=owner.strip() or "Vault",
            )
            self.notes[note.id] = note
            minted.append(note)
        total = sum(n.denomination for n in minted)
        self.add_event(f"Minted {len(minted)} × ${denomination} {asset} notes for {owner or 'Vault'} (${total})")
        return minted

    def claim(self, note_id: str, claimant: str) -> Tuple[bool, str]:
        note = self.notes.get(note_id.strip().upper())
        if not note:
            return False, "Note not found."
        if note.status != "minted":
            return False, f"Note is already {note.status}."
        note.status = "claimed"
        note.claimed_by = claimant.strip() or "Wallet"
        self.add_event(f"{note.claimed_by} claimed {note.id} (${note.denomination} {note.asset})")
        return True, f"Claimed {note.id}."

    def redeem(self, note_id: str) -> Tuple[bool, str]:
        note = self.notes.get(note_id.strip().upper())
        if not note:
            return False, "Note not found."
        if note.status == "redeemed":
            return False, "Note is already redeemed."
        note.status = "redeemed"
        note.redeemed_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
        self.add_event(f"Redeemed and burned {note.id} (${note.denomination} {note.asset})")
        return True, f"Redeemed {note.id}."

    def stats(self) -> Dict[str, int]:
        active = [n for n in self.notes.values() if n.status in {"minted", "claimed"}]
        redeemed = [n for n in self.notes.values() if n.status == "redeemed"]
        return {
            "active_value": sum(n.denomination for n in active),
            "active_notes": len(active),
            "redeemed_value": sum(n.denomination for n in redeemed),
            "redeemed_notes": len(redeemed),
        }


LEDGER = Ledger()
LEDGER.mint("Alice", "BTC", 10, 10)
LEDGER.mint("Treasury", "USDC", 5, 8)
LEDGER.mint("Merchant Float", "SOL", 50, 2)


def is_phone(value: str) -> bool:
    return bool(re.fullmatch(r"\+?[1-9]\d{7,14}", value.strip().replace(" ", "")))


def send_sms(to_number: str, body: str) -> str:
    sid = os.getenv("TWILIO_ACCOUNT_SID")
    token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_FROM_NUMBER")
    if not all([sid, token, from_number, TwilioClient]):
        return "SMS provider not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER to send live messages."
    if not is_phone(to_number):
        return "Invalid recipient phone number. Use E.164 format, for example +15551234567."
    client = TwilioClient(sid, token)
    message = client.messages.create(to=to_number, from_=from_number, body=body[:1400])
    return f"SMS sent: {message.sid}"


def render_note_table() -> str:
    rows = []
    for note in sorted(LEDGER.notes.values(), key=lambda n: n.created_at, reverse=True)[:14]:
        rows.append(
            f"""
            <tr>
              <td>{note.id}</td>
              <td>{note.asset}</td>
              <td>${note.denomination}</td>
              <td><span class='pill {note.status}'>{note.status}</span></td>
              <td>{note.owner}</td>
              <td>{note.claimed_by or '—'}</td>
            </tr>
            """
        )
    return "".join(rows)


def render_events() -> str:
    return "".join(f"<li>{event}</li>" for event in LEDGER.events[:8])


def poster_dashboard() -> str:
    stats = LEDGER.stats()
    reserve_ratio = 100 if stats["active_value"] else 0
    active_by_asset = {asset: sum(n.denomination for n in LEDGER.notes.values() if n.asset == asset and n.status != "redeemed") for asset in SUPPORTED_ASSETS}
    note_rows = render_note_table()
    events = render_events()
    return f"""
    <section class="membra-shell">
      <div class="hero-grid">
        <div class="brand-card deep-card">
          <div class="m-logo"><span>M</span><i></i></div>
          <div>
            <p class="eyebrow">MEMBRA MONEY</p>
            <h1>Send value like a message.</h1>
            <p class="subcopy">A dark-gold SMS payment control room for bearer-style notes, local commerce, merchant settlement, and reserve visibility.</p>
            <div class="hero-actions"><span>FAST</span><span>PRIVATE</span><span>BACKED</span><span>VERIFIABLE</span></div>
          </div>
        </div>
        <div class="cycle-card deep-card">
          <p class="eyebrow centered">THE CYCLE</p>
          <div class="cycle">
            <div><b>▣</b><span>Deposit</span><small>Reserve lock</small></div>
            <em>→</em>
            <div><b>◧</b><span>Mint</span><small>Bearer note</small></div>
            <em>→</em>
            <div><b>✈</b><span>Send</span><small>SMS / QR</small></div>
            <em>→</em>
            <div><b>⌂</b><span>Redeem</span><small>Burn note</small></div>
          </div>
          <div class="settlement-banner">MANY OFF-CHAIN TRANSFERS. ONE FINAL ON-CHAIN SETTLEMENT.</div>
        </div>
      </div>

      <div class="metric-row">
        <div class="metric deep-card"><small>ACTIVE RESERVE VALUE</small><strong>${stats['active_value']:,}</strong><span>{reserve_ratio}% covered</span></div>
        <div class="metric deep-card"><small>ACTIVE NOTES</small><strong>{stats['active_notes']}</strong><span>minted + claimed</span></div>
        <div class="metric deep-card"><small>REDEEMED VALUE</small><strong>${stats['redeemed_value']:,}</strong><span>{stats['redeemed_notes']} notes burned</span></div>
        <div class="metric deep-card"><small>SMS RAIL</small><strong>READY</strong><span>Twilio env gated</span></div>
      </div>

      <div class="notes-strip deep-card">
        <div class="notes-copy"><p class="eyebrow">MEMBRA NOTES</p><p>Fixed-denomination digital bearer instruments. Transferable, verifiable, and reserve-backed.</p></div>
        {''.join([f"<div class='note-card'><strong>${d}</strong><span>{'BTC' if d in (1,10,100) else 'USDC' if d == 5 else 'SOL'} NOTE</span><b>{'₿' if d in (1,10,100) else '$' if d == 5 else '◎'}</b></div>" for d in DENOMINATIONS])}
        <ul class="feature-list"><li>Fixed denominations</li><li>Transferable</li><li>Verifiable</li><li>Backed by reserves</li><li>Bearer-style</li></ul>
      </div>

      <div class="main-grid">
        <div class="deep-card phone-card">
          <div class="phone-top"><span>☰</span><b>MEMBRA WALLET</b><span>⌁</span></div>
          <p class="wallet-label">TOTAL BALANCE</p>
          <h2>${stats['active_value']:,}.00</h2>
          {''.join([f"<div class='asset-row'><span>{asset} NOTES</span><b>${value:,}.00</b></div>" for asset, value in active_by_asset.items()])}
          <div class="wallet-buttons"><span>SEND</span><span>CLAIM</span><span>SCAN</span></div>
        </div>
        <div class="deep-card table-card">
          <p class="eyebrow">LIVE NOTE REGISTER</p>
          <table><thead><tr><th>Note</th><th>Asset</th><th>Value</th><th>Status</th><th>Owner</th><th>Claimed</th></tr></thead><tbody>{note_rows}</tbody></table>
        </div>
        <div class="deep-card feature-card">
          <p class="eyebrow">KEY FEATURES</p>
          <div class="feature-tile"><b>Instant Off-Chain Transfers</b><span>Move value without per-hop chain fees.</span></div>
          <div class="feature-tile"><b>SMS Claim Links</b><span>Send notes over familiar messaging rails.</span></div>
          <div class="feature-tile"><b>Reserve Dashboard</b><span>Track issued, claimed, and redeemed note liability.</span></div>
          <div class="feature-tile"><b>Merchant Ready</b><span>QR, NFC, email, and SMS delivery patterns.</span></div>
        </div>
      </div>

      <div class="bottom-grid">
        <div class="deep-card"><p class="eyebrow">PAYMENT FLOW</p><div class="flow"><span>Alice deposits</span><i>→</i><span>Mint issues</span><i>→</i><span>SMS sends</span><i>→</i><span>Bob claims</span><i>→</i><span>Carol redeems</span></div></div>
        <div class="deep-card"><p class="eyebrow">EVENT STREAM</p><ul class="events">{events}</ul></div>
      </div>
    </section>
    """


def refresh_dashboard() -> str:
    return poster_dashboard()


def mint_notes(owner: str, asset: str, denomination: int, count: int) -> Tuple[str, str]:
    if asset not in SUPPORTED_ASSETS:
        return "Unsupported asset.", poster_dashboard()
    if int(denomination) not in DENOMINATIONS:
        return "Unsupported denomination.", poster_dashboard()
    minted = LEDGER.mint(owner or "Vault", asset, int(denomination), int(count or 1))
    ids = ", ".join(n.id for n in minted[:8])
    if len(minted) > 8:
        ids += f", +{len(minted) - 8} more"
    return f"Minted {len(minted)} notes: {ids}", poster_dashboard()


def send_note(note_id: str, recipient: str, channel: str) -> Tuple[str, str]:
    note = LEDGER.notes.get((note_id or "").strip().upper())
    if not note:
        return "Choose a valid note ID from the register.", poster_dashboard()
    if note.status == "redeemed":
        return "Redeemed notes cannot be sent.", poster_dashboard()
    claim_code = f"https://membra.local/claim/{note.id}"
    body = f"Membra Money: claim ${note.denomination} {note.asset} note {note.id}. {claim_code}"
    if channel == "SMS":
        provider_status = send_sms(recipient, body)
        LEDGER.add_event(f"Prepared SMS delivery for {note.id} to {recipient or 'recipient'}")
        return provider_status + f"\n\n{body}", poster_dashboard()
    LEDGER.add_event(f"Prepared {channel} delivery for {note.id}")
    return body, poster_dashboard()


def claim_note(note_id: str, claimant: str) -> Tuple[str, str]:
    ok, message = LEDGER.claim(note_id or "", claimant or "Wallet")
    return message, poster_dashboard()


def redeem_note(note_id: str) -> Tuple[str, str]:
    ok, message = LEDGER.redeem(note_id or "")
    return message, poster_dashboard()


CSS = """
:root { --gold:#f8c56a; --gold2:#9f6d2e; --ink:#050707; --panel:#0b0f0f; --line:rgba(248,197,106,.28); --text:#f8ead4; --muted:#a99982; }
body, .gradio-container { background: radial-gradient(circle at 20% 0%, #20201a 0, #080a0a 36%, #030404 100%) !important; color: var(--text) !important; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; }
.gradio-container { max-width: 1440px !important; }
footer { display:none !important; }
.membra-shell { padding: 18px; border: 1px solid var(--line); border-radius: 28px; background: linear-gradient(145deg, rgba(255,255,255,.035), rgba(0,0,0,.45)); box-shadow: 0 28px 80px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.05); }
.deep-card { background: linear-gradient(145deg, rgba(19,24,24,.95), rgba(4,7,7,.98)); border: 1px solid var(--line); border-radius: 22px; box-shadow: 12px 12px 32px rgba(0,0,0,.75), -10px -10px 26px rgba(255,255,255,.035), inset 0 0 28px rgba(248,197,106,.025); }
.hero-grid { display:grid; grid-template-columns: 1.1fr .9fr; gap:20px; }
.brand-card { display:grid; grid-template-columns: 190px 1fr; gap:28px; padding:32px; align-items:center; }
.m-logo { width:170px; height:210px; border:2px solid var(--gold); border-radius:28px 28px 8px 8px; position:relative; display:grid; place-items:center; color:var(--gold); font-size:118px; font-weight:900; text-shadow:0 0 28px rgba(248,197,106,.75); box-shadow: inset 0 -24px 54px rgba(248,197,106,.14), 0 0 44px rgba(248,197,106,.08); }
.m-logo i { position:absolute; width:16px; height:16px; background:#fff5d2; border-radius:50%; box-shadow:0 0 24px 12px rgba(248,197,106,.9); bottom:54px; }
.eyebrow { color:var(--gold); letter-spacing:.22em; font-size:13px; font-weight:800; margin:0 0 12px; }
h1 { font-size:46px; line-height:1.02; margin:0 0 18px; color:#fff4df; letter-spacing:-.04em; }
.subcopy { color:#d8c7a8; max-width:560px; font-size:16px; line-height:1.6; }
.hero-actions, .wallet-buttons { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
.hero-actions span, .wallet-buttons span { color:#15100a; background:linear-gradient(135deg,#f9d98c,#ab762f); padding:10px 14px; border-radius:12px; font-weight:900; font-size:12px; letter-spacing:.12em; box-shadow:0 8px 28px rgba(248,197,106,.18); }
.cycle-card { padding:28px; }
.centered { text-align:center; }
.cycle { display:grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; align-items:center; gap:12px; text-align:center; }
.cycle b { display:grid; place-items:center; height:76px; width:76px; margin:0 auto 10px; border:1px solid var(--line); border-radius:16px; color:var(--gold); font-size:34px; box-shadow: inset 0 0 20px rgba(248,197,106,.1); }
.cycle span { display:block; color:#fff1d7; text-transform:uppercase; font-weight:900; }
.cycle small { color:var(--muted); }
.cycle em { color:var(--gold); font-style:normal; font-size:24px; }
.settlement-banner { margin-top:24px; padding:16px; text-align:center; color:var(--gold); border:1px solid var(--line); border-radius:12px; font-weight:900; letter-spacing:.08em; }
.metric-row { display:grid; grid-template-columns: repeat(4, 1fr); gap:18px; margin:20px 0; }
.metric { padding:22px; }
.metric small { color:var(--muted); font-weight:900; letter-spacing:.14em; }
.metric strong { display:block; font-size:34px; margin:8px 0; color:#fff3dc; }
.metric span { color:var(--gold); }
.notes-strip { display:grid; grid-template-columns: 1.25fr repeat(5, 1fr) 1fr; gap:16px; padding:22px; align-items:center; }
.notes-copy p:last-child { color:#d8c7a8; line-height:1.5; }
.note-card { min-height:132px; border:1px solid var(--line); border-radius:16px; display:grid; place-items:center; text-align:center; background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(0,0,0,.48)); box-shadow: inset 0 0 20px rgba(248,197,106,.035); }
.note-card strong { font-size:31px; color:#fff2db; }
.note-card span { color:#d1bf9a; font-size:12px; font-weight:900; }
.note-card b { color:var(--gold); font-size:38px; text-shadow:0 0 18px rgba(248,197,106,.45); }
.feature-list { color:#d8c7a8; line-height:2; list-style:none; padding:0; margin:0; font-size:13px; }
.feature-list li:before { content:'✦'; color:var(--gold); margin-right:8px; }
.main-grid { display:grid; grid-template-columns: .8fr 1.4fr .8fr; gap:18px; margin-top:18px; align-items:stretch; }
.phone-card { padding:24px; border-radius:34px; box-shadow: 0 0 0 8px rgba(0,0,0,.35), 0 28px 70px rgba(0,0,0,.8), inset 0 0 30px rgba(248,197,106,.04); }
.phone-top { display:flex; justify-content:space-between; color:var(--gold); letter-spacing:.12em; }
.wallet-label { color:var(--muted); margin:30px 0 0; }
h2 { font-size:40px; margin:4px 0 24px; }
.asset-row { display:flex; justify-content:space-between; border:1px solid rgba(248,197,106,.14); border-radius:14px; padding:16px; margin:12px 0; color:#e8d8bd; }
.table-card { padding:22px; overflow:auto; }
table { width:100%; border-collapse:collapse; color:#eadcc4; font-size:13px; }
th { color:var(--gold); text-align:left; letter-spacing:.08em; font-size:11px; }
td, th { padding:12px 10px; border-bottom:1px solid rgba(248,197,106,.12); }
.pill { border:1px solid var(--line); border-radius:999px; padding:5px 9px; color:#fff0d2; text-transform:uppercase; font-size:10px; font-weight:900; }
.pill.minted { background:rgba(248,197,106,.08); } .pill.claimed { background:rgba(79,141,255,.14); } .pill.redeemed { background:rgba(255,88,88,.16); }
.feature-card { padding:22px; }
.feature-tile { border:1px solid rgba(248,197,106,.15); border-radius:14px; padding:14px; margin:12px 0; }
.feature-tile b { color:#ffe7b6; display:block; } .feature-tile span { color:#bcae97; font-size:13px; }
.bottom-grid { display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-top:18px; }
.bottom-grid > div { padding:20px; }
.flow { display:flex; align-items:center; justify-content:space-between; gap:8px; color:#eadcc4; flex-wrap:wrap; }
.flow span { border:1px solid rgba(248,197,106,.16); padding:12px; border-radius:14px; } .flow i { color:var(--gold); font-style:normal; }
.events { color:#d8c7a8; line-height:1.8; margin:0; padding-left:18px; }
#control-panel { border:1px solid var(--line) !important; border-radius:22px !important; background:linear-gradient(145deg,rgba(18,24,24,.9),rgba(4,7,7,.95)) !important; box-shadow: 12px 12px 32px rgba(0,0,0,.55), -10px -10px 26px rgba(255,255,255,.025) !important; }
button.primary { background: linear-gradient(135deg,#f9d98c,#a36d2c) !important; color:#140f08 !important; border:0 !important; font-weight:900 !important; }
input, textarea, select { background:#080b0b !important; color:#f8ead4 !important; border-color:rgba(248,197,106,.25) !important; }
@media (max-width: 1100px) { .hero-grid,.main-grid,.bottom-grid { grid-template-columns:1fr; } .metric-row { grid-template-columns: repeat(2, 1fr); } .notes-strip { grid-template-columns: repeat(2, 1fr); } .brand-card { grid-template-columns:1fr; } }
@media (max-width: 640px) { .metric-row,.notes-strip { grid-template-columns:1fr; } h1 { font-size:34px; } .cycle { grid-template-columns:1fr; } .cycle em { transform:rotate(90deg); } }
"""


with gr.Blocks(title=APP_TITLE, css=CSS, theme=gr.themes.Base()) as demo:
    dashboard = gr.HTML(poster_dashboard())

    with gr.Accordion("Command Console", open=True, elem_id="control-panel"):
        with gr.Tabs():
            with gr.Tab("Mint"):
                owner = gr.Textbox(label="Owner / Vault Label", value="Alice")
                asset = gr.Dropdown(label="Asset", choices=list(SUPPORTED_ASSETS), value="BTC")
                denomination = gr.Dropdown(label="Denomination", choices=list(DENOMINATIONS), value=10)
                count = gr.Slider(label="Count", minimum=1, maximum=25, value=2, step=1)
                mint_status = gr.Textbox(label="Mint Status", lines=2)
                gr.Button("Mint Notes", variant="primary").click(mint_notes, [owner, asset, denomination, count], [mint_status, dashboard])

            with gr.Tab("Send"):
                send_id = gr.Textbox(label="Note ID", placeholder="MBR-...")
                recipient = gr.Textbox(label="Recipient", placeholder="+15551234567 or wallet label")
                channel = gr.Dropdown(label="Channel", choices=["SMS", "QR", "Email", "NFC", "Link"], value="SMS")
                send_status = gr.Textbox(label="Delivery Payload", lines=4)
                gr.Button("Prepare / Send", variant="primary").click(send_note, [send_id, recipient, channel], [send_status, dashboard])

            with gr.Tab("Claim"):
                claim_id = gr.Textbox(label="Note ID", placeholder="MBR-...")
                claimant = gr.Textbox(label="Claimant Wallet", value="Bob")
                claim_status = gr.Textbox(label="Claim Status")
                gr.Button("Claim Note", variant="primary").click(claim_note, [claim_id, claimant], [claim_status, dashboard])

            with gr.Tab("Redeem"):
                redeem_id = gr.Textbox(label="Note ID", placeholder="MBR-...")
                redeem_status = gr.Textbox(label="Redeem Status")
                gr.Button("Redeem + Burn", variant="primary").click(redeem_note, [redeem_id], [redeem_status, dashboard])

        gr.Button("Refresh Dashboard").click(refresh_dashboard, None, dashboard)


if __name__ == "__main__":
    demo.launch()
