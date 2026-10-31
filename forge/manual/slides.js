// learn-pdm-lite-yhk 따라 하기 매뉴얼 — 슬라이드 데이터
// 빌드: helpers.js + _head.js(example_build의 화면 모형·scene 정의) + slides.js 를 이어 붙여 node로 실행
setSubject("예지보전 10분 실습 · learn-pdm-lite-yhk");
SB = "pdm-lite-lab";

// 1. 표지
{ const s = np(); pg();
  cover(s, { chip: "DAY 5 예지보전 · 따라 하기 매뉴얼", chipW: 4.4,
    title: "노이즈인가, 추세인가",
    sub1: "Claude 데스크톱 앱으로 따라 하는 10분 Skills as Curriculum 실습",
    sub2: "설비 센서 50건 → 이상 후보 → 진동 그래프 한 장 → 내 주소 https://아이디.github.io/pdm-lite-lab/",
    desc: "명령어를 외울 필요는 없다. 우리가 하는 일은 두 가지 —\n① 노란 상자의 글을 복사해 붙여 넣기  ② 화면이 맞게 나왔는지 확인하기." }); }

// 2. 오늘 만들 것
{ const s = np();
  figurePanelSlide(s, { chip: "오늘의 목표", chipW: 1.8, pageNo: pg(),
    title: "수업이 끝나면 진동 그래프 한 장이 인터넷 주소로 열린다",
    sub: "설비A의 3.5는 노이즈, 설비B는 15:00부터 추세 — 설비B를 먼저 계획 정비한다",
    panelTitle: "완성하면", tint: "green",
    lines: ["이상 후보 표", "진동 그래프 한 장", "설비별 상한선", "내 Pages 주소", "공유 메시지"],
    path: "preview_crop.png", ratio: 820 / 760 }); }

// 3. 수업 방식
{ const s = np();
  const cy = head(s, "수업 방식", 1.6, "스킬이 강사가 되어 설명 → 실습 → 퀴즈를 진행한다", "교재 대신 /learn-pdm-lite-yhk 스킬이 수업을 이끈다. 형식은 자율학습이다", pg());
  const cards = [
    { k: "목표", t: "AI Native", d: "계산과 그래프는\nClaude에게 맡긴다", eg: "나는 '어느 설비가\n진짜 정비 신호인가'를 판단", col: C.navy, fill: C.panelBlue },
    { k: "방법", t: "Skills as Curriculum", d: "스킬이 블록마다\n수업을 진행한다", eg: "설명 → 붙여 넣기 → 완료\n→ 확인·퀴즈", col: C.blue, fill: C.panelBlue },
    { k: "결과", t: "내 결과물", d: "10분 뒤 남는 것", eg: "이상 후보 표 · 진동 그래프\n내 Pages 주소", col: C.green, fill: C.panelGreen },
  ];
  const gap = 0.3, w = (CW - gap * 2) / 3, y = cy + 0.1, h = 3.45;
  cards.forEach((c, i) => {
    const x = LX + i * (w + gap);
    rect(s, x, y, w, h, c.fill); rect(s, x, y, w, 0.95, c.col);
    s.addText(c.k, { x, y: y + 0.06, w, h: 0.36, align: "center", fontFace: F, fontSize: 16, color: C.coverSub });
    s.addText(c.t, { x, y: y + 0.40, w, h: 0.50, align: "center", valign: "middle", fontFace: F, fontSize: 22, bold: true, color: C.white });
    s.addText(c.d, { x: x + 0.2, y: y + 1.12, w: w - 0.4, h: 0.95, align: "center", valign: "top", fontFace: F, fontSize: 20, bold: true, color: C.navy });
    s.addText(c.eg, { x: x + 0.2, y: y + 2.2, w: w - 0.4, h: 1.1, align: "center", valign: "top", fontFace: F, fontSize: 17, color: C.body });
    if (i < 2) s.addText("▶", { x: x + w + 0.02, y: y + 1.45, w: 0.26, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 18, color: C.muted });
  });
  banner(s, "블록 3개 · 10분 — B0 준비 2분 → B1 노이즈 vs 추세 6분(퀴즈 1) → B2 공개 2분", y + h + 0.3); }

// 4. 읽는 법
{ const s = np();
  const cy = head(s, "읽는 법", 1.5, "모든 단계는 어디·입력·출력·피드백 네 칸으로 읽는다", "이 매뉴얼의 단계 슬라이드는 모두 같은 모양이다. 번호 순서대로 보면 된다", pg());
  const cards = [
    { n: "①", t: "어디", d: "어느 창에 입력하나", eg: "Code 탭 입력칸 · 브라우저", col: "374151", fill: "EEF0F3" },
    { n: "②", t: "입력", d: "무엇을 넣나\n(복사 → 붙여 넣기 → Enter)", eg: "노란 상자 = 프롬프트\n파란 머리 상자 = 누를 것", col: P.acc, fill: P.fill },
    { n: "③", t: "출력", d: "무엇이 나오나\n(화면에 보이는 모습)", eg: "칸 안의 모습 =\n내 화면에 나올 모습", col: C.navy, fill: C.panelGray },
    { n: "④", t: "피드백", d: "맞게 됐나 확인\n아니면 무엇을 하나", eg: "성공 ▸ 이렇게 보이면 OK\n막히면 ▸ 이렇게 한다", col: C.green, fill: C.panelGreen },
  ];
  const gap = 0.22, w = (CW - gap * 3) / 4, y = cy + 0.1, h = 3.55;
  cards.forEach((c, i) => {
    const x = LX + i * (w + gap);
    rect(s, x, y, w, h, c.fill); rect(s, x, y, w, 0.72, c.col);
    s.addText(c.n + " " + c.t, { x, y, w, h: 0.72, align: "center", valign: "middle", fontFace: F, fontSize: 24, bold: true, color: C.white });
    s.addText(c.d, { x: x + 0.15, y: y + 0.88, w: w - 0.3, h: 1.05, align: "center", valign: "top", fontFace: F, fontSize: 18, bold: true, color: C.navy });
    s.addText(c.eg, { x: x + 0.15, y: y + 2.05, w: w - 0.3, h: 1.35, align: "center", valign: "top", fontFace: F, fontSize: 16, color: C.body });
    if (i < 3) s.addText("▶", { x: x + w - 0.02, y: y + 1.5, w: 0.26, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 18, color: C.muted });
  });
  banner(s, "④ 피드백이 '성공'이 아니면 다음 단계로 넘어가지 않는다 — 막히면 칸의 지시대로 한다", y + h + 0.3); }

// 5. 용어
{ const s = np();
  const cy = head(s, "용어", 1.2, "꼭 알아야 할 용어는 여섯 개다", "정의는 원본 Day5 강의 덱의 문장을 그대로 썼다", pg());
  wtable(s, [
    ["용어", "쉽게 말하면"],
    ["예지보전 (예측 정비)", "센서가 감지한 징후로 '필요할 때만' 정비한다"],
    ["평상 범위", "평균 ± 2표준편차. 벗어나면 '이상 후보' — 설비별로 따로 계산"],
    ["노이즈", "한 번 튀고 곧 정상으로 돌아오는 값. 정비 신호가 아니다"],
    ["추세", "임계선을 향해 꾸준히 오르는 흐름. 그 시작점이 진짜 정비 신호"],
    ["스킬", "Claude Code에 설치하는 '수업 진행 매뉴얼'"],
    ["GitHub Pages", "저장소의 index.html을 웹 주소로 공개해 주는 무료 기능"],
  ], LX, cy + 0.05, CW, [3.4, CW - 3.4], 0.66); }

// 6. 준비
{ const s = np();
  const cy = head(s, "준비", 1.2, "시작 전에 준비물 세 가지와 약속 세 가지를 확인한다", "약속은 내 계정과 회사 자료를 지키기 위한 것이다", pg());
  panel(s, LX, cy + 0.05, 5.6, 4.75, C.panelBlue, C.blue, "준비물", [
    "내 컴퓨터 (윈도우 10/11 또는 macOS 13+)", "Claude 유료 계정 (Code 탭)", "GitHub 계정"]);
  panel(s, LX + 5.84, cy + 0.05, CW - 5.84, 4.75, C.panelGreen, C.green, "약속 세 가지", [
    "비밀번호·일회용 코드는 브라우저의 github.com에만 입력한다",
    "공개 저장소에 회사 실제 센서 데이터를 넣지 않는다 — 오늘 데이터는 실습용 가상 데이터다",
    "모르면 멈추고 묻는다 — 그냥 '허용'을 누르지 않는다"]); }

// ===== PART 1 설치 =====
{ const s = np(); divider(s, { num: "01", sec: "STEP 1–2 · 설치", secW: 3.4, title: "데스크톱 앱과 수업 스킬 설치", desc: "Claude 데스크톱 앱 → 스킬 설치 한 줄 (처음 한 번)", pageNo: pg() }); }

iof({ chip: "STEP 1", title: "Code 탭에서 내 홈 폴더를 고른다", sub: "Claude 데스크톱 앱 안에 Claude Code가 들어 있다. Local은 내 컴퓨터의 파일로 일한다는 뜻이다",
  where: "app", inKind: "key", inLabel: "앱에서 순서대로 누른다",
  input: ["1. claude.com/download 에서 앱 설치 · 로그인", "2. 위쪽 가운데 Code 탭", "3. Local 선택", "4. 폴더 선택 → 내 홈 폴더", "   윈도우: C:\\Users\\내이름", "5. 아래 입력칸이 보이면 준비 끝"],
  output: ["Local · 내이름", "", "  > 무엇을 할까요?", "                     [Manual ▾] [↑]"], dark: false,
  ok: ["아래에 입력칸 · 오른쪽에 모드 선택기"], ng: ["'업그레이드' 안내 → 유료 계정이 필요하다"] });

iof({ chip: "STEP 2-1", title: "스킬 설치는 한 줄을 붙여 넣어 Claude에게 시킨다", sub: "GitHub에 공개된 강의 저장소에서 바로 설치한다",
  where: "cc", inKind: "prompt", inLabel: "프롬프트 · Code 탭 입력칸",
  input: ["npx skills add yunhakim17/learn-pdm-lite-yhk", "--agent claude-code --global --yes", "를 실행해 줘"],
  output: ["명령을 실행할까요?  [허용] [거부]", "...", "✓ learn-pdm-lite-yhk (copied)", "  → ~/.claude/skills/learn-pdm-lite-yhk"], dark: false,
  ok: ["'Installed 1 skill' · 허용 질문엔 허용"], ng: ["npx가 없다고 하면 'Node.js 설치해 줘'"] });

iof({ chip: "STEP 2-2", title: "새 세션에서 /learn 목록이 보이면 설치가 끝난 것이다", sub: "Claude Code는 세션을 시작할 때 스킬을 읽는다. 그래서 새 세션을 연다",
  where: "app", whereText: "왼쪽 사이드바의 새 세션(+)",
  inKind: "key", inLabel: "새 세션 → /learn 입력",
  input: ["1. 왼쪽 사이드바 새 세션(+)", "2. Local → 홈 폴더", "3. 입력칸에 /learn 까지만 친다", "4. 목록이 뜰 때까지 기다린다"],
  output: ["> /learn", "  /learn-pdm-lite-yhk", "    자동차 예지보전 10분 실습 — …"], dark: false,
  ok: ["목록에 /learn-pdm-lite-yhk"], ng: ["안 보이면 STEP 2-1을 다시 붙여 넣는다"] });

// ===== PART 2 수업 체험 =====
{ const s = np(); divider(s, { num: "02", sec: "수업 체험", secW: 3.0, title: "Skills as Curriculum 맛보기", desc: "Block 1(노이즈 vs 추세)이 실제로 진행되는 모습을 여섯 장면으로 따라간다", pageNo: pg() }); }

{ const s = np();
  const cy = head(s, "수업 사이클", 1.9, "블록 하나는 여섯 장면으로 진행되고 블록마다 반복된다", "다음 여섯 장은 Block 1 '노이즈 vs 추세'가 실제 앱 화면에서 진행되는 모습이다", pg());
  stepCards(s, [
    { title: "1 시작", sub: "내가 한다", body: "스킬 이름 입력\n블록 고르기", tint: "green" },
    { title: "2 설명", sub: "Claude", body: "개념 설명\n노란 상자 제시\n그리고 멈춤" },
    { title: "3 실행", sub: "내가 → Claude", body: "붙여 넣기\nClaude 실행\n허용 누르기", tint: "green" },
    { title: "4 완료", sub: "내가 한다", body: "결과를 보고\n'완료' 입력", tint: "green" },
    { title: "5 확인·퀴즈", sub: "Claude", body: "내 파일 점검\n판단형 퀴즈" },
    { title: "6 다음", sub: "둘이 함께", body: "해설 듣기\n다음 블록 →\n다시 2부터" },
  ], cy + 0.1, 3.55);
  banner(s, "핵심 — Claude는 2 설명 뒤에 멈춘다. 내가 붙여 넣고 '완료'를 쳐야 수업이 진행된다", cy + 3.95); }

scene({ n: 0, title: "스킬을 부르면 Claude가 시작 블록을 묻는다",
  sub: "Block 0에서 만든 작업 폴더(pdm-lite-lab)를 연 세션에서 시작한다",
  msgs: [
    { who: "me", lines: ["/learn-pdm-lite-yhk"] },
    { who: "claude", lines: ["이 수업은 Skills as Curriculum 방식입니다.", "스킬이 강사가 되어 설명 → 실습 → 퀴즈를 진행합니다."] },
    { who: "quiz", q: "어디서부터 시작할까요?", opts: ["Block 0: 준비", "Block 1: 노이즈 vs 추세", "Block 2: 공개"], sel: 1 },
  ],
  what: ["스킬 이름을 넣으면 수업이 열린다", "Claude가 수업 방식을 소개한다", "블록 카드 중 하나를 고른다 (처음이면 Block 0)"],
  todo: "/learn-pdm-lite-yhk 입력 → 블록을 눌러 고른다" });

scene({ n: 1, title: "Claude가 설명하고 붙여 넣을 글을 준 뒤 멈춘다",
  sub: "이 상태에서 기다리면 아무 일도 일어나지 않는다. 내 차례다",
  msgs: [
    { who: "claude", lines: ["평상 범위 = 평균 ± 2표준편차 (설비별로 따로).", "한 번 튀면 노이즈, 꾸준히 오르면 추세입니다."] },
    { who: "box", lines: ["pdm-lite-lab 폴더의 Day5_sensor_50_virtual.csv", "로 이상 분석을 해 줘.", "1. 설비별로 평균·표준편차·평상 범위 …", "4. 진동 선 차트 한 장을 index.html 로 …"] },
    { who: "claude", lines: ["👆 위 프롬프트를 붙여 넣어 실행해 보세요.", "결과를 확인했으면 '완료'라고 입력해 주세요."] },
  ],
  what: ["개념을 짧게 설명한다", "노란 상자 = 내가 복사할 글", "'완료라고 입력' = 멈춤 신호"],
  todo: "노란 상자 글을 드래그해서 복사한다" });

scene({ n: 2, title: "글을 붙여 넣으면 Claude가 실행하고 허용을 묻는다",
  sub: "허용 카드에는 Claude가 하려는 일이 한 줄로 적혀 있다. 읽고 누른다",
  msgs: [
    { who: "me", lines: ["CSV로 이상 분석을 해 줘.", "… (붙여 넣은 글)"] },
    { who: "claude", lines: ["설비별 평균 ± 2표준편차를 계산하겠습니다."] },
    { who: "perm", q: "명령을 실행할까요?", cmd: "python analyze.py", hl: true },
  ],
  what: ["붙여 넣은 글이 오른쪽 말풍선", "Claude가 계산 코드를 만든다", "실행 전에 허용 카드 (여러 번 나올 수 있다)"],
  todo: "입력칸에 Ctrl+V(맥 ⌘+V) → Enter → [허용]" });

scene({ n: 3, title: "Claude가 결과를 보고하면 확인하고 '완료'를 입력한다",
  sub: "Claude는 내가 '완료'를 칠 때까지 다음으로 넘어가지 않는다",
  msgs: [
    { who: "done", lines: ["✓ anomalies.csv — 이상 후보 4건", "✓ 설비A 12:40 3.5 → 노이즈", "✓ 설비B 15:40 2.2 · 16:00 2.9 → 추세 (15:00 시작)"] },
    { who: "claude", lines: ["index.html 을 브라우저로 열었습니다.", "완료라고 입력하면 퀴즈로 넘어갑니다."] },
    { who: "me", lines: ["완료"] },
  ],
  what: ["한 일을 체크 목록으로 보고", "브라우저에 진동 그래프가 열린다", "선 두 개와 상한선이 보이면 '완료'"],
  todo: "브라우저에서 그래프 확인 → '완료' 입력" });

scene({ n: 4, title: "Claude가 내 결과를 점검한 뒤 판단형 퀴즈를 낸다",
  sub: "퀴즈는 외우기 문제가 아니다. 방금 한 일의 원리를 묻는다",
  msgs: [
    { who: "claude", lines: ["결과를 확인했습니다.", "✓ 이상 후보 4건  ✓ 상한 2.10 · 2.08"] },
    { who: "quiz", q: "설비A 1.0→1.1→0.9→3.5→1.0, 설비B 1.0→1.3→1.7→2.2→2.9. 먼저 정비할 설비는?", opts: ["설비A — 3.5가 가장 높다", "설비B — 꾸준히 오르는 추세", "둘 다 바로 교체", "고장 알람까지 대기"], sel: -1 },
  ],
  what: ["Claude가 내 파일을 직접 점검", "숫자가 다르면 원인을 찾을 글을 준다", "퀴즈 카드 — 점수는 없다"],
  todo: "보기 하나를 눌러 고른다" });

scene({ n: 5, title: "해설을 듣고 다음 블록으로 넘어간다",
  sub: "다음 블록을 고르면 장면 2(설명)부터 다시 시작한다",
  msgs: [
    { who: "me", lines: ["설비B"] },
    { who: "claude", lines: ["정답입니다. 설비A의 3.5는 한 번 튀고 돌아온 노이즈,", "설비B는 임계선을 향해 꾸준히 오르는 추세입니다.", "그 시작점(15:00)이 계획 정비의 기준점입니다."] },
    { who: "quiz", q: "다음 블록으로 갈까요?", opts: ["Block 2: 공개", "잠깐 쉬기"], sel: -1 },
  ],
  what: ["오답이어도 해설로 배운다", "쉬었다 와도 세션이 남아 있다", "다음 블록 → 다시 장면 2부터"],
  todo: "다음 블록을 눌러 고른다 → 장면 2부터 반복" });

// ===== PART 3 블록 =====
{ const s = np(); divider(s, { num: "03", sec: "BLOCK 0–2 · 본 수업", secW: 4.0, title: "준비 → 노이즈 vs 추세 → 공개", desc: "블록마다 붙여 넣을 글과 확인할 숫자", pageNo: pg() }); }

iof({ chip: "BLOCK 0 · ①", chipW: 2.3, title: "작업 폴더와 데이터 준비는 프롬프트 하나로 끝난다", sub: "Claude가 실제 경로를 채운 상자를 보여 준다. 그 상자를 복사한다",
  where: "cc", inKind: "prompt", inLabel: "프롬프트 · Code 탭 입력칸",
  input: ["예지보전 실습 준비를 해 줘.", "1. 내 홈 폴더에 pdm-lite-lab 폴더를 만든다.", "2. (스킬 폴더)/assets/lab/Day5_sensor_50_virtual.csv", "   를 pdm-lite-lab 안에 복사한다. 원본은 고치지 않는다.", "3. 행 수, 설비 이름, 열 이름과 단위, 측정 간격 확인", "4. git과 python이 있는지 확인, 없으면 설치", "5. 결과를 env_check.txt 에 짧게 적는다.", "6. 비밀번호나 토큰을 나에게 묻지 않는다."],
  output: ["행     50", "설비   A 프레스 메인모터", "       B 차체 용접로봇 감속기", "단위   mm/s · ℃ · bar", "git OK · python OK"],
  ok: ["데이터 행 50개 · 설비 2대"], ng: ["권한 창이 뜨면 [예]"] });

iof({ chip: "BLOCK 0 · ②", chipW: 2.3, title: "작업 폴더로 새 세션을 열어 수업을 이어 간다", sub: "세션마다 폴더가 정해진다. 이후 블록은 pdm-lite-lab에서 진행한다",
  where: "app", whereText: "왼쪽 사이드바의 새 세션(+)",
  inKind: "key", inLabel: "새 세션 → 폴더 → 스킬",
  input: ["1. 왼쪽 사이드바 새 세션(+)", "2. Local → 폴더 선택", "3. pdm-lite-lab 폴더를 고른다", "4. 입력칸에 /learn-pdm-lite-yhk", "5. 질문 카드에서 Block 1"],
  output: ["사이드바: pdm-lite-lab", "", "> /learn-pdm-lite-yhk", "  어디서부터 시작할까요?", "  ● Block 1: 노이즈 vs 추세"], dark: false,
  ok: ["사이드바 세션 이름이 pdm-lite-lab"], ng: ["폴더가 안 보이면 홈 폴더 안을 찾는다"] });

iof({ chip: "BLOCK 1 · ①", chipW: 2.3, title: "이상 후보 계산과 그래프는 프롬프트 하나로 맡긴다", sub: "평상 범위 = 평균 ± 2표준편차. 설비마다 정상 수준이 달라 설비별로 따로 계산한다",
  where: "cc", inKind: "prompt", inLabel: "프롬프트 · Code 탭 입력칸",
  input: ["pdm-lite-lab 폴더의 Day5_sensor_50_virtual.csv 로", "이상 분석을 해 줘.", "1. 설비별로 진동·온도·압력의 평균, 표준편차,", "   평상 범위(평균 ± 2표준편차)를 계산한다.", "2. 범위를 벗어난 값을 '이상 후보'로 anomalies.csv 저장", "3. 노이즈인지 추세인지 구분하고 추세 시작 시점을", "   '정비 필요 시점'으로 표시한다.", "4. 진동 선 차트 한 장을 index.html 로 만든다", "   (설비A·B 진동 + 상한선, '실습용 가상 데이터' 표기)", "5. index.html 을 브라우저로 열어 보여 준다.", "6. 원본 CSV는 고치지 않는다."],
  output: ["anomalies.csv  이상 후보 4건", "index.html     진동 그래프", "브라우저에서 열었습니다."],
  ok: ["브라우저에 선 두 개 + 점선 상한"], ng: ["숫자가 다르면 다음 장의 표와 대조"] });

{ const s = np();
  const cy = head(s, "BLOCK 1 · ②", 2.3, "이 숫자가 나오면 맞게 한 것이다", "정답 스크립트를 실제로 실행한 값이다. 원본 강사용 정답 메모와 같다", pg());
  wtable(s, [
    ["설비", "진동 이상 후보", "상한 mm/s", "판정"],
    ["설비A 프레스", "12:40  3.5", "2.10", "노이즈 (한 번 튐)"],
    ["설비B 용접로봇", "15:40 2.2 · 16:00 2.9", "2.08", "추세 (15:00부터)"],
  ], LX, cy + 0.05, CW, [3.0, 3.9, 2.0, CW - 8.9], 0.62);
  panel(s, LX, cy + 2.05, CW, 2.0, C.panelBlue, C.blue, "함께 확인할 것", [
    "설비B 온도 16:00 65.1도 이상 후보 · 나머지 변수는 이상 후보 없음",
    "이상 후보가 기대와 다르면 → '평균 ± 2표준편차를 설비별로 따로 계산했는지 확인해 줘'"], { fs: 18 });
  banner(s, "평상 범위는 후보를 고르는 도구다 — 노이즈인지 추세인지는 그래프의 흐름으로 판단한다", cy + 4.2); }

iof({ chip: "BLOCK 2 · ①", chipW: 2.3, title: "공개는 올라갈 파일 목록을 보고 나서 한다", sub: "공개는 되돌리기 어렵다. Claude가 목록을 먼저 보여 주고 내 확인을 받는다",
  where: "cc", inKind: "prompt", inLabel: "프롬프트 · Code 탭 입력칸",
  input: ["pdm-lite-lab 의 진동 그래프를 GitHub Pages로 공개해 줘.", "1. GitHub 로그인 상태를 확인한다. 안 되어 있으면", "   브라우저 로그인용 일회용 코드만 알려 준다.", "   비밀번호나 토큰을 나에게 묻지 않는다.", "2. 올릴 파일 목록을 먼저 보여 주고 내 확인을 받는다.", "3. 확인하면 public 저장소 pdm-lite-lab 을 만들어", "   올리고 GitHub Pages를 켠다.", "4. Pages 주소가 열리는지 확인해 알려 준다.", "5. 동료에게 보낼 공유 메시지를 세 줄로 써 준다."],
  output: ["올릴 파일: index.html · anomalies.csv", "          Day5_sensor_50_virtual.csv", "확인해 주세요 → '확인'", "", "https://내아이디.github.io/pdm-lite-lab/"],
  ok: ["Pages 주소가 휴대폰에서도 열린다"], ng: ["404면 1~3분 기다린다", "3분 넘으면 'Pages 404 원인 찾아 줘'"] });

iof({ chip: "BLOCK 2 · ②", chipW: 2.3, title: "일회용 코드는 브라우저에만 넣고 승인한 뒤 돌아온다", sub: "GitHub에 로그인되어 있지 않을 때만 나온다. 장소가 브라우저 → Code 탭으로 바뀐다",
  where: "browser", whereText: "주소창에 github.com/login/device",
  inKind: "act", inLabel: "브라우저에서 순서대로",
  input: ["1. github.com/login/device 를 연다", "   (주소가 정확히 github.com 인지 본다)", "2. Claude가 보여 준 코드(예: ABCD-1234)를 넣는다", "3. 다음 화면 맨 아래 Authorize 를 누른다", "4. Code 탭으로 돌아와 '승인했어'라고 쓴다"],
  output: ["Congratulations,", "you're all set!", "", "Your device is now connected."], dark: false,
  ok: ["'Congratulations' 화면"], ng: ["코드 만료(15분) → 'GitHub 로그인 다시 시작해 줘'"] });

// 막혔을 때
{ const s = np();
  const cy = head(s, "막혔을 때", 1.6, "막히면 상황에 맞는 문장을 입력칸에 쓴다", "정답은 '정답 보기'라고 했을 때만 Claude가 연다", pg());
  wtable(s, [
    ["이런 상황", "Code 탭 입력칸에 이렇게 쓴다"],
    ["뭘 해야 할지 모르겠다", "지금 뭘 하면 돼?"],
    ["빨간 오류 글자가 나왔다", "방금 오류 고쳐 줘"],
    ["이상 후보가 매뉴얼과 다르다", "평균 ± 2표준편차를 설비별로 따로 계산했는지 확인해 줘"],
    ["GitHub 일회용 코드가 만료됐다", "GitHub 로그인을 처음부터 다시 시작해 줘"],
    ["사이트 주소가 404 (3분 이상)", "Pages가 404인데 원인을 찾아 줘"],
    ["도저히 안 된다", "정답 보기"],
  ], LX, cy + 0.05, CW, [4.4, CW - 4.4], 0.64); }

// 제출
{ const s = np();
  const cy = head(s, "마무리", 1.4, "끝나면 그래프 주소 한 줄과 과제를 제출한다", "강의 저장소: github.com/yunhakim17/learn-pdm-lite-yhk", pg());
  panel(s, LX, cy + 0.05, 5.9, 3.95, C.panelGreen, C.green, "제출할 것", [
    "내 그래프 주소 — https://내아이디.github.io/pdm-lite-lab/",
    "동료 한 명에게 공유하고 '어느 설비를 먼저 정비하겠다'는 답 받아 오기"]);
  panel(s, LX + 6.14, cy + 0.05, CW - 6.14, 3.95, C.panelBlue, C.blue, "다음 강의", [
    "다른 Day나 내 업무 주제로 /course-forge 를 다시 돌린다",
    "새 learn- 스킬 이름과 커리큘럼 블록 표를 제출한다"]);
  banner(s, "한 줄 정리 — 한 번의 튐이 아니라 추세적 상승의 시작점이 진짜 정비 신호다", cy + 4.25); }

p.writeFile({ fileName: "Learn_Pdm_Lite_Yhk_Lab_Manual.pptx" }).then(f => console.log("saved", f, "slides", PAGE));
