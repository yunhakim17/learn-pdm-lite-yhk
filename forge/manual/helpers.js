// GitHub 대시보드 실습 매뉴얼 — report-navy-deck(field) 기반
// 원리: 모든 단계 슬라이드 = ① 어디 → ② 입력 → ③ 출력 → ④ 피드백
const T = require("./template.js");
const { p, C, P, F, MONO, S, LX, CW, rect, hline, head, cover, divider, msgRows,
        stepCards, banner, caption, panel, wtable, figurePanelSlide, setSubject } = T;

// setSubject()는 build.js에서 강의명으로 호출한다

// ---- 장소(어디) 정의: 색으로 고정 ------------------------------------------------
const PLACE = {
  cc:      { name:"Claude Code 입력칸",   hint:"A 앱: Code 탭 아래 칸  ·  B VS Code: 터미널 > 옆", color:C.blue },
  app:     { name:"Claude 데스크톱 앱",   hint:"Code 탭 — 버튼과 창으로 쓰는 Claude Code",                    color:C.blue },
  vscode:  { name:"VS Code 터미널",       hint:"VS Code 아래쪽 터미널 칸 — 메뉴 터미널 → 새 터미널",           color:"374151" },
  browser: { name:"브라우저",             hint:"크롬·사파리·엣지 — 주소창이 있는 인터넷 창",                  color:C.green },
  phone:   { name:"휴대폰",               hint:"카메라 또는 브라우저 앱",                                      color:C.green },
  pc:      { name:"컴퓨터 화면",           hint:"바탕화면·시작 메뉴·Finder",                                    color:C.muted },
};

let PAGE = 0;
const np = () => p.addSlide();
const pg = () => ++PAGE;

// 작은 창 아이콘 (장소 띠 안)
function miniWin(s, x, y, kind) {
  const w = 0.62, h = 0.42;
  const dark = kind === "vscode";
  rect(s, x, y, w, h, dark ? "1F2430" : C.white, { color: C.hair, width: 0.75 });
  rect(s, x, y, w, 0.10, dark ? "3A4150" : "E5E7EB");
  if (kind === "cc" || kind === "app") { s.addShape(p.ShapeType.rect, { x: x + 0.06, y: y + 0.26, w: w - 0.12, h: 0.11, fill: { type: "none" }, line: { color: C.blue, width: 1 } }); rect(s, x + 0.20, y + 0.14, 0.22, 0.06, C.panelBlue); }
  else if (dark) { rect(s, x + 0.02, y + 0.10, 0.10, h - 0.12, "2B3240"); rect(s, x + 0.16, y + 0.27, 0.36, 0.04, "9CA3AF"); rect(s, x + 0.16, y + 0.33, 0.24, 0.04, "9CA3AF"); }
  else { rect(s, x + 0.06, y + 0.15, w - 0.12, 0.07, "E5E7EB"); rect(s, x + 0.06, y + 0.27, 0.32, 0.08, C.panelGreen); }
}

// ① 어디 띠
function whereBar(s, y, kind, extra) {
  const pl = PLACE[kind];
  rect(s, LX, y, CW, 0.66, C.white, { color: pl.color, width: 1.5 });
  rect(s, LX, y, 1.55, 0.66, pl.color);
  s.addText("① 어디", { x: LX, y, w: 1.55, h: 0.66, align: "center", valign: "middle", fontFace: F, fontSize: 20, bold: true, color: C.white });
  miniWin(s, LX + 1.75, y + 0.12, kind);
  s.addText([
    { text: pl.name, options: { bold: true, color: pl.color } },
    { text: "   " + (extra || pl.hint), options: { color: C.body } },
  ], { x: LX + 2.55, y, w: CW - 2.7, h: 0.66, valign: "middle", fontFace: F, fontSize: 18 });
}

// 번호 헤더 박스 (② 입력 / ③ 출력 / ④ 피드백)
function box(s, x, y, w, h, hdrColor, bodyFill, label) {
  rect(s, x, y, w, h, bodyFill);
  rect(s, x, y, w, 0.50, hdrColor);
  s.addText(label, { x: x + 0.16, y, w: w - 0.3, h: 0.50, valign: "middle", fontFace: F, fontSize: 16, bold: true, color: C.white });
}

// ② 입력: kind = "prompt"(앰버) | "cmd"(블루 헤더) | "key"(블루 헤더, 일반 글씨) | "act"(브라우저 행동)
function inputBox(s, x, y, w, h, kind, label, lines, fs, place) {
  const isPrompt = kind === "prompt";
  box(s, x, y, w, h, isPrompt ? P.acc : C.blue, isPrompt ? P.fill : C.panelGray, "② 입력 · " + label);
  const mono = kind === "prompt" || kind === "cmd";
  const size = fs || (mono ? (lines.length > 12 ? 14 : lines.length > 8 ? 15 : 16) : 18);
  const textH = lines.length * size * (mono ? 1.06 : 1.12) * 1.2 / 72 + 0.15;
  const free = h - 0.74 - textH;
  const withNote = mono && free > 1.15;
  s.addText(lines.map(l => ({ text: l, options: { breakLine: true } })), {
    x: x + 0.22, y: y + 0.62, w: w - 0.44, h: withNote ? h - 0.74 - 1.05 : h - 0.74, valign: "top",
    fontFace: mono ? MONO : F, fontSize: size, bold: kind === "cmd",
    color: isPrompt ? P.ink : C.navy, lineSpacingMultiple: mono ? 1.06 : 1.12,
  });
  if (withNote) {
    const ny = y + h - 1.02;
    rect(s, x + 0.18, ny, w - 0.36, 0.86, C.white, { color: isPrompt ? "E8C98F" : C.hair, width: 0.75 });
    const paste = "붙여 넣기: 맥 ⌘+V · 윈도우 Ctrl+V";
    s.addText([
      { text: "복사: 상자 글을 마우스로 드래그 → 복사", options: { breakLine: true } },
      { text: paste + " → Enter", options: {} },
    ], { x: x + 0.32, y: ny, w: w - 0.6, h: 0.86, valign: "middle", fontFace: F, fontSize: 16, color: C.body, lineSpacingMultiple: 1.05 });
  }
}

// ③ 출력: 화면에 보이는 모습(어두운 화면 = 터미널/Claude Code, 밝은 화면 = 브라우저)
function outputBox(s, x, y, w, h, lines, dark) {
  box(s, x, y, w, h, C.navy, C.panelGray, "③ 출력 · 화면에 이렇게 나온다");
  const sx = x + 0.16, sy = y + 0.62, sw = w - 0.32, sh = h - 0.76;
  rect(s, sx, sy, sw, sh, dark ? "1F2430" : C.white, { color: C.hair, width: 0.75 });
  s.addText(lines.map(l => ({ text: l, options: { breakLine: true } })), {
    x: sx + 0.14, y: sy + 0.08, w: sw - 0.28, h: sh - 0.16, valign: "top",
    fontFace: MONO, fontSize: 14, color: dark ? "E5E7EB" : C.body, lineSpacingMultiple: 1.08,
  });
}

// ④ 피드백: ok = 성공 신호, ng = 막히면 할 일
function feedbackBox(s, x, y, w, h, ok, ng, fs) {
  box(s, x, y, w, h, C.green, C.panelGreen, "④ 피드백 · 확인하고 다음으로");
  const size = fs || 17;
  const runs = [];
  ok.forEach(t => runs.push({ text: "성공 ▸ " + t, options: { breakLine: true, color: C.navy, bold: true, paraSpaceAfter: 4 } }));
  ng.forEach(t => runs.push({ text: "막히면 ▸ " + t, options: { breakLine: true, color: C.body, paraSpaceAfter: 4 } }));
  s.addText(runs, { x: x + 0.22, y: y + 0.62, w: w - 0.44, h: h - 0.72, valign: "top", fontFace: F, fontSize: size, lineSpacingMultiple: 1.05 });
}

// 단계 슬라이드 = head + ①②③④
function iof(o) {
  const s = np();
  const cy = head(s, o.chip, o.chipW || 2.2, o.title, o.sub, pg());
  whereBar(s, cy, o.where, o.whereText);
  const top = cy + 0.82, bot = 6.94;
  const lw = o.lw || 6.55, gap = 0.22, rx = LX + lw + gap, rw = CW - lw - gap;
  inputBox(s, LX, top, lw, bot - top, o.inKind, o.inLabel, o.input, o.inFs, o.where);
  const oh = o.outH || Math.max(1.60, 0.92 + o.output.length * 0.255);
  outputBox(s, rx, top, rw, oh, o.output, o.dark !== false);
  feedbackBox(s, rx, top + oh + 0.16, rw, bot - top - oh - 0.16, o.ok, o.ng, o.fbFs);
  return s;
}

// 화면 모형(장소 소개 슬라이드용)
function screenMock(s, x, y, w, h, kind, title, lines) {
  const pl = PLACE[kind];
  const dark = kind === "vscode";
  rect(s, x, y, w, h, dark ? "1F2430" : C.white, { color: pl.color, width: 2 });
  rect(s, x, y, w, 0.36, dark ? "3A4150" : "E5E7EB");
  ["FF5F57", "FEBC2E", "28C840"].forEach((c, i) => s.addShape(p.ShapeType.ellipse, { x: x + 0.14 + i * 0.22, y: y + 0.11, w: 0.14, h: 0.14, fill: { color: c }, line: { type: "none" } }));
  s.addText(title, { x: x + 0.85, y, w: w - 1.0, h: 0.36, valign: "middle", fontFace: F, fontSize: 13, color: dark ? "D1D5DB" : C.muted });
  let ty = y + 0.50;
  if (kind === "browser") {
    rect(s, x + 0.2, y + 0.50, w - 0.4, 0.40, "F3F4F6", { color: C.hair, width: 0.75 });
    s.addText("🔒 github.com/login/device", { x: x + 0.3, y: y + 0.50, w: w - 0.6, h: 0.40, valign: "middle", fontFace: MONO, fontSize: 13, color: C.body });
    ty = y + 1.02;
  }
  if (kind === "app") {
    ["Chat", "Cowork", "Code"].forEach((t, i) => {
      const on = t === "Code";
      rect(s, x + w / 2 - 1.45 + i * 0.98, y + 0.46, 0.92, 0.34, on ? C.navy : "F3F4F6");
      s.addText(t, { x: x + w / 2 - 1.45 + i * 0.98, y: y + 0.46, w: 0.92, h: 0.34, align: "center", valign: "middle", fontFace: F, fontSize: 13, bold: on, color: on ? C.white : C.muted });
    });
    ty = y + 0.95;
  }
  if (kind === "vscode") {
    rect(s, x + 0.02, y + 0.38, 0.55, h - 0.40, "2B3240");
    s.addText("파일\n목록", { x: x + 0.02, y: y + 0.45, w: 0.55, h: 0.7, align: "center", fontFace: F, fontSize: 13, color: "9CA3AF" });
    hline(s, x + 0.6, y + h - 2.15, w - 0.62, "4B5563", 1);
    s.addText("터미널", { x: x + 0.7, y: y + h - 2.12, w: 1.2, h: 0.3, fontFace: F, fontSize: 13, color: "9CA3AF" });
  }
  const lx = kind === "vscode" ? x + 0.7 : x + 0.22;
  const lyy = kind === "vscode" ? y + h - 1.78 : ty;
  s.addText(lines.map(l => ({ text: l, options: { breakLine: true } })), {
    x: lx, y: lyy, w: w - (lx - x) - 0.2, h: (kind === "vscode" ? 1.15 : h - (ty - y) - 0.75), valign: "top",
    fontFace: MONO, fontSize: 13, color: dark ? "E5E7EB" : C.body, lineSpacingMultiple: 1.1,
  });
  if (kind === "app" || kind === "vscode") {
    s.addShape(p.ShapeType.rect, { x: lx - 0.06, y: y + h - 0.62, w: w - (lx - x) - 0.12, h: 0.44, fill: { type: "none" }, line: { color: dark ? "7FA6E8" : C.blue, width: 1.25 } });
    s.addText(">  여기에 붙여 넣는다", { x: lx + 0.04, y: y + h - 0.62, w: w - (lx - x) - 0.3, h: 0.44, valign: "middle", fontFace: MONO, fontSize: 14, bold: true, color: dark ? "BFD3F5" : C.blue });
  }
}

// =================================================================================
// ---- 데스크톱 앱 화면 모형 (수업 체험용) --------------------------------------------
// msgs: {who:"me"|"claude"|"box"|"perm"|"quiz"|"done", lines:[], q, opts, sel, cmd}
function appScreen(s, x, y, w, h, msgs) {
  rect(s, x, y, w, h, C.white, { color: C.blue, width: 2 });
  rect(s, x, y, w, 0.34, "E5E7EB");
  ["FF5F57", "FEBC2E", "28C840"].forEach((c, i) => s.addShape(p.ShapeType.ellipse, { x: x + 0.12 + i * 0.2, y: y + 0.11, w: 0.13, h: 0.13, fill: { color: c }, line: { type: "none" } }));
  ["Chat", "Cowork", "Code"].forEach((t, i) => {
    const on = t === "Code", tx = x + w / 2 - 1.35 + i * 0.92;
    rect(s, tx, y + 0.04, 0.86, 0.26, on ? C.navy : "F3F4F6");
    s.addText(t, { x: tx, y: y + 0.04, w: 0.86, h: 0.26, align: "center", valign: "middle", fontFace: F, fontSize: 12, bold: on, color: on ? C.white : C.muted });
  });
  // 사이드바
  const sbw = 1.25;
  rect(s, x + 0.02, y + 0.34, sbw, h - 0.36, "F4F5F9");
  s.addText("+ 새 세션", { x: x + 0.1, y: y + 0.42, w: sbw - 0.16, h: 0.28, fontFace: F, fontSize: 12, bold: true, color: C.blue });
  rect(s, x + 0.08, y + 0.76, sbw - 0.12, 0.30, C.panelBlue);
  s.addText(SB, { x: x + 0.12, y: y + 0.76, w: sbw - 0.2, h: 0.30, valign: "middle", fontFace: F, fontSize: 12, color: C.navy });
  // 채팅 영역
  const cx = x + sbw + 0.18, cw = w - sbw - 0.32;
  let cy = y + 0.48;
  const LH = 0.25; // 14pt 한 줄 높이
  msgs.forEach(m => {
    if (m.who === "me") {
      const n = m.lines.length, bw = Math.min(cw * 0.78, Math.max(1.6, Math.max(...m.lines.map(l => l.length)) * 0.13 + 0.4)), bh = n * LH + 0.16;
      rect(s, cx + cw - bw, cy, bw, bh, P.fill, { color: "E8C98F", width: 0.75 });
      s.addText(m.lines.map(l => ({ text: l, options: { breakLine: true } })), { x: cx + cw - bw + 0.1, y: cy + 0.04, w: bw - 0.2, h: bh - 0.08, valign: "middle", fontFace: F, fontSize: 14, color: P.ink });
      cy += bh + 0.12;
    } else if (m.who === "claude" || m.who === "done") {
      const n = m.lines.length, bh = n * LH + 0.06;
      s.addText("✻", { x: cx, y: cy, w: 0.22, h: 0.26, fontFace: F, fontSize: 13, color: "D97757" });
      s.addText(m.lines.map(l => ({ text: l, options: { breakLine: true } })), { x: cx + 0.24, y: cy, w: cw - 0.24, h: bh, valign: "top", fontFace: F, fontSize: 14, color: m.who === "done" ? C.green : C.body, bold: m.who === "done" });
      cy += bh + 0.10;
    } else if (m.who === "box") {
      const n = m.lines.length, bh = n * 0.23 + 0.44;
      rect(s, cx + 0.24, cy, cw - 0.24, bh, P.fill, { color: P.acc, width: 1 });
      rect(s, cx + 0.24, cy, cw - 0.24, 0.26, P.acc);
      s.addText("복사해서 붙여 넣을 글", { x: cx + 0.32, y: cy, w: cw - 0.4, h: 0.26, valign: "middle", fontFace: F, fontSize: 11.5, bold: true, color: C.white });
      s.addText(m.lines.map(l => ({ text: l, options: { breakLine: true } })), { x: cx + 0.34, y: cy + 0.30, w: cw - 0.44, h: bh - 0.34, valign: "top", fontFace: MONO, fontSize: 13, color: P.ink });
      cy += bh + 0.12;
    } else if (m.who === "perm") {
      const bh = 1.02;
      rect(s, cx + 0.24, cy, cw - 0.24, bh, C.white, { color: C.navy, width: 1.25 });
      s.addText(m.q, { x: cx + 0.36, y: cy + 0.06, w: cw - 0.5, h: 0.26, fontFace: F, fontSize: 14, bold: true, color: C.navy });
      rect(s, cx + 0.36, cy + 0.34, cw - 0.48, 0.28, "F3F4F6");
      s.addText(m.cmd, { x: cx + 0.42, y: cy + 0.34, w: cw - 0.6, h: 0.28, valign: "middle", fontFace: MONO, fontSize: 11, color: C.body });
      rect(s, cx + 0.36, cy + 0.68, 0.9, 0.26, C.navy);
      s.addText("허용", { x: cx + 0.36, y: cy + 0.68, w: 0.9, h: 0.26, align: "center", valign: "middle", fontFace: F, fontSize: 12, bold: true, color: C.white });
      rect(s, cx + 1.34, cy + 0.68, 0.9, 0.26, C.white, { color: C.hair, width: 1 });
      s.addText("거부", { x: cx + 1.34, y: cy + 0.68, w: 0.9, h: 0.26, align: "center", valign: "middle", fontFace: F, fontSize: 12, color: C.muted });
      if (m.hl) s.addShape(p.ShapeType.ellipse, { x: cx + 0.26, y: cy + 0.60, w: 1.1, h: 0.42, fill: { type: "none" }, line: { color: "D9534F", width: 2 } });
      cy += bh + 0.12;
    } else if (m.who === "quiz") {
      const qn = Math.ceil(m.q.length / 30), bh = qn * LH + 0.22 + m.opts.length * 0.34;
      rect(s, cx + 0.24, cy, cw - 0.24, bh, C.white, { color: C.blue, width: 1.25 });
      s.addText(m.q, { x: cx + 0.36, y: cy + 0.06, w: cw - 0.5, h: qn * LH + 0.06, valign: "top", fontFace: F, fontSize: 14, bold: true, color: C.navy });
      m.opts.forEach((o, i) => {
        const oy = cy + qn * LH + 0.16 + i * 0.34, on = i === m.sel;
        rect(s, cx + 0.36, oy, cw - 0.48, 0.30, on ? C.panelBlue : "F9FAFB", { color: on ? C.blue : C.hair, width: on ? 1.25 : 0.5 });
        s.addText((on ? "● " : "○ ") + o, { x: cx + 0.44, y: oy, w: cw - 0.6, h: 0.30, valign: "middle", fontFace: F, fontSize: 13.5, color: on ? C.navy : C.body, bold: on });
      });
      cy += bh + 0.12;
    }
  });
  // 입력 바
  const iy = y + h - 0.56;
  rect(s, cx, iy, cw, 0.44, C.white, { color: C.blue, width: 1.25 });
  s.addText("여기에 붙여 넣고 Enter", { x: cx + 0.12, y: iy, w: cw - 2.0, h: 0.44, valign: "middle", fontFace: F, fontSize: 12, color: C.muted });
  rect(s, cx + cw - 1.62, iy + 0.08, 1.02, 0.28, "F3F4F6");
  s.addText("Manual ▾", { x: cx + cw - 1.62, y: iy + 0.08, w: 1.02, h: 0.28, align: "center", valign: "middle", fontFace: F, fontSize: 11, color: C.body });
  s.addShape(p.ShapeType.ellipse, { x: cx + cw - 0.48, y: iy + 0.06, w: 0.32, h: 0.32, fill: { color: C.navy }, line: { type: "none" } });
  s.addText("↑", { x: cx + cw - 0.48, y: iy + 0.06, w: 0.32, h: 0.32, align: "center", valign: "middle", fontFace: F, fontSize: 12, bold: true, color: C.white });
}

