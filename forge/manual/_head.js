// 사용법: helpers.js 뒤에 이어 붙여 실행한다 → cat helpers.js build.js > _run.js && node _run.js
// 이 파일은 learn-github-dashboard 매뉴얼(IV판) 실례다. 슬라이드 데이터만 바꿔 쓴다.
setSubject("{{강의명}}"); let SB = "{{workdir}}";
// =================================================================================
// IV판: 데스크톱 앱 기준 본문 + 수업 체험(Skills as Curriculum) + 부록 B(VS Code)
PLACE.cc = { name: "Code 탭 입력칸", hint: "Claude 데스크톱 앱 Code 탭 아래쪽 칸 — 붙여 넣고 Enter", color: C.blue };

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

// 진도 표시 (6장면 중 현재 위치)
const SCENES = ["시작", "설명", "실행", "완료", "확인·퀴즈", "다음"];
function progress(s, x, y, w, cur) {
  const n = SCENES.length, gw = w / n;
  SCENES.forEach((t, i) => {
    const on = i === cur, past = i < cur;
    rect(s, x + i * gw + 0.02, y, gw - 0.04, 0.50, on ? C.navy : past ? C.panelBlue : "F3F4F6");
    s.addText((i + 1) + " " + t, { x: x + i * gw, y, w: gw, h: 0.50, align: "center", valign: "middle", fontFace: F, fontSize: 13, bold: on, color: on ? C.white : past ? C.navy : C.muted });
  });
}

// 수업 체험 장면 슬라이드: 좌 앱 화면 / 우 설명 패널
function scene(o) {
  const s = np();
  const cy = head(s, "수업 체험 " + (o.n + 1) + "/6", 2.1, o.title, o.sub, pg());
  progress(s, LX, cy, CW, o.n);
  const top = cy + 0.64, bot = 6.94, aw = 7.15;
  appScreen(s, LX, top, aw, bot - top, o.msgs);
  const rx = LX + aw + 0.24, rw = CW - aw - 0.24;
  const th = bot - top - 1.30;
  panel(s, rx, top, rw, th, C.panelBlue, C.blue, "지금 일어나는 일", o.what, { fs: 16, valign: "top" });
  rect(s, rx, top + th + 0.14, rw, 1.16, P.fill, { color: P.acc, width: 1.25 });
  rect(s, rx, top + th + 0.14, rw, 0.40, P.acc);
  s.addText("내가 할 일", { x: rx + 0.16, y: top + th + 0.14, w: rw - 0.3, h: 0.40, valign: "middle", fontFace: F, fontSize: 16, bold: true, color: C.white });
  s.addText(o.todo, { x: rx + 0.18, y: top + th + 0.58, w: rw - 0.36, h: 0.68, valign: "top", fontFace: F, fontSize: 17, bold: true, color: P.ink });
}

// 화면 신호 카드(작은 모형 + 뜻 + 할 일)
function signalCell(s, x, y, w, h, title, drawMock, mean, todo) {
  rect(s, x, y, w, h, C.white, { color: C.hair, width: 1 });
  rect(s, x, y, w, 0.46, C.navy);
  s.addText(title, { x: x + 0.16, y, w: w - 0.3, h: 0.46, valign: "middle", fontFace: F, fontSize: 17, bold: true, color: C.white });
  const mw = 2.95;
  drawMock(x + 0.16, y + 0.62, mw, h - 0.78);
  s.addText([
    { text: "뜻", options: { bold: true, color: C.blue, breakLine: true } },
    { text: mean, options: { color: C.body, breakLine: true, paraSpaceAfter: 6 } },
    { text: "내가 할 일", options: { bold: true, color: P.acc, breakLine: true } },
    { text: todo, options: { color: C.navy, bold: true } },
  ], { x: x + mw + 0.32, y: y + 0.58, w: w - mw - 0.44, h: h - 0.70, valign: "top", fontFace: F, fontSize: 16, lineSpacingMultiple: 1.05 });
}

