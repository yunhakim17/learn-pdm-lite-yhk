"""예지보전 10분 실습 정답 — 평상 범위(평균 ± 2표준편차)로 이상 후보를 찾고 노이즈/추세를 판정한다.

사용: 데이터 CSV가 있는 폴더에서 python3 -I build_pdm_lite.py
산출: anomalies.csv · index.html · expected.json (현재 폴더)
"""
import csv
import json
import statistics as st
from html import escape
from pathlib import Path

SRC = "Day5_sensor_50_virtual.csv"
VARS = [("진동(mm/s)", "진동"), ("온도(℃)", "온도"), ("압력(bar)", "압력")]
TREND_MIN_RISES = 3  # 끝에서부터 연속 상승이 3번 이상이면 추세로 본다

rows = list(csv.DictReader(open(SRC, encoding="utf-8-sig")))
equipments = list(dict.fromkeys(r["설비"] for r in rows))  # 파일 순서 유지


def label(eq):
    return eq.split("(")[0]  # "설비A(프레스 메인모터)" → "설비A"


# 1) 설비별 평상 범위와 이상 후보
stats, candidates = {}, []
for eq in equipments:
    rs = [r for r in rows if r["설비"] == eq]
    for col, name in VARS:
        v = [float(r[col]) for r in rs]
        m, sd = st.mean(v), st.stdev(v)  # 표본표준편차 (Sheets STDEV와 같음)
        lo, hi = m - 2 * sd, m + 2 * sd
        stats[(eq, name)] = {"mean": m, "sd": sd, "lo": lo, "hi": hi, "values": v,
                             "times": [r["시간"][-5:] for r in rs]}
        for r, x in zip(rs, v):
            if x < lo or x > hi:
                candidates.append({"시간": r["시간"], "설비": eq, "변수": name, "값": x})


# 2) 노이즈 vs 추세 — 끝에서부터 연속 상승 구간의 시작점을 찾는다
def trend_start(values, times):
    i = len(values) - 1
    while i > 0 and values[i] > values[i - 1]:
        i -= 1
    rises = len(values) - 1 - i
    return (times[i + 1], rises) if rises >= TREND_MIN_RISES else (None, rises)


verdict = {}
for eq in equipments:
    s = stats[(eq, "진동")]
    start, _ = trend_start(s["values"], s["times"])
    has_cand = any(c["설비"] == eq and c["변수"] == "진동" for c in candidates)
    verdict[eq] = {"type": "추세" if start else ("노이즈" if has_cand else "정상"), "start": start}

with open("anomalies.csv", "w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["시간", "설비", "변수", "값", "판정"])
    w.writeheader()
    for c in candidates:
        w.writerow({**c, "판정": verdict[c["설비"]]["type"]})


def cand_text(eq, name):
    xs = [c for c in candidates if c["설비"] == eq and c["변수"] == name]
    return " · ".join(f"{c['시간'][-5:]} {c['값']:g}" for c in xs) or "없음"


eqA, eqB = equipments
values = {
    "rows": {"value": len(rows), "decimals": 0, "block": 0},
    "a_vib_candidates": {"value": cand_text(eqA, "진동"), "block": 1},
    "b_vib_candidates": {"value": cand_text(eqB, "진동"), "block": 1},
    "b_temp_candidates": {"value": cand_text(eqB, "온도"), "block": 1},
    "a_vib_upper": {"value": round(stats[(eqA, "진동")]["hi"], 2), "decimals": 2, "block": 1},
    "b_vib_upper": {"value": round(stats[(eqB, "진동")]["hi"], 2), "decimals": 2, "block": 1},
    "b_trend_start": {"value": verdict[eqB]["start"], "block": 1},
}
Path("expected.json").write_text(json.dumps({"values": values}, ensure_ascii=False, indent=2), encoding="utf-8")

# 3) 대시보드 — 진동 선 차트 한 장 (인라인 SVG, 외부 라이브러리 없음)
W, H, PL, PR, PT, PB = 760, 380, 48, 16, 16, 40
times = stats[(eqA, "진동")]["times"]
ymax = 4.0
x = lambda i: PL + i * (W - PL - PR) / (len(times) - 1)
y = lambda v: PT + (1 - v / ymax) * (H - PT - PB)
COLORS = {eqA: "var(--a)", eqB: "var(--b)"}

svg = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="설비A·B 진동 추이와 상한선">']
for t in (0, 1, 2, 3, 4):
    svg.append(f'<line x1="{PL}" x2="{W-PR}" y1="{y(t):.1f}" y2="{y(t):.1f}" class="grid"/>'
               f'<text x="{PL-8}" y="{y(t)+4:.1f}" class="tick" text-anchor="end">{t}</text>')
for i, t in enumerate(times):
    if i % 3 == 0:
        svg.append(f'<text x="{x(i):.1f}" y="{H-PB+20}" class="tick" text-anchor="middle">{t}</text>')
for eq in equipments:
    s = stats[(eq, "진동")]
    svg.append(f'<line x1="{PL}" x2="{W-PR}" y1="{y(s["hi"]):.1f}" y2="{y(s["hi"]):.1f}" '
               f'stroke="{COLORS[eq]}" class="limit"/>')
    pts = " ".join(f"{x(i):.1f},{y(v):.1f}" for i, v in enumerate(s["values"]))
    svg.append(f'<polyline points="{pts}" fill="none" stroke="{COLORS[eq]}" stroke-width="2.5"/>')
    for i, v in enumerate(s["values"]):
        if v > s["hi"]:
            svg.append(f'<circle cx="{x(i):.1f}" cy="{y(v):.1f}" r="5" fill="{COLORS[eq]}"><title>{label(eq)} {times[i]} {v:g} mm/s</title></circle>')
start = verdict[eqB]["start"]
if start:
    sx = x(times.index(start))
    svg.append(f'<line x1="{sx:.1f}" x2="{sx:.1f}" y1="{PT}" y2="{H-PB}" class="start"/>'
               f'<text x="{sx-6:.1f}" y="{PT+14}" class="tick" text-anchor="end">설비B 추세 시작 {start}</text>')
# 마우스를 올리면 그 시각의 값을 보여 줄 안내선·점 (평소에는 숨김)
svg.append(f'<g id="hover" visibility="hidden"><line id="hv-line" y1="{PT}" y2="{H-PB}" class="hv"/>'
           f'<circle id="hv-a" r="5" fill="var(--a)" class="hv-dot"/><circle id="hv-b" r="5" fill="var(--b)" class="hv-dot"/></g>')
svg.append(f'<rect id="hit" x="{PL}" y="{PT}" width="{W-PL-PR}" height="{H-PT-PB}" fill="transparent"/>')
svg.append("</svg>")

# 호버에 쓸 데이터 — 시각별 진동 값, 상한, 이상 후보 여부
sA, sB = stats[(eqA, "진동")], stats[(eqB, "진동")]
hover_data = {
    "x": [round(x(i), 1) for i in range(len(times))],
    "t": times,
    "a": sA["values"], "b": sB["values"],
    "ya": [round(y(v), 1) for v in sA["values"]], "yb": [round(y(v), 1) for v in sB["values"]],
    "hiA": round(sA["hi"], 2), "hiB": round(sB["hi"], 2),
    "W": W, "start": start,
}
hover_js = """
<script>
(function () {
  var D = __DATA__;
  var svg = document.querySelector('.chart svg'), g = document.getElementById('hover'),
      tip = document.getElementById('tip'), box = document.querySelector('.chart');
  function show(evt) {
    var r = svg.getBoundingClientRect(), sx = (evt.clientX - r.left) * D.W / r.width, i = 0;
    for (var k = 1; k < D.x.length; k++) if (Math.abs(D.x[k] - sx) < Math.abs(D.x[i] - sx)) i = k;
    document.getElementById('hv-line').setAttribute('x1', D.x[i]);
    document.getElementById('hv-line').setAttribute('x2', D.x[i]);
    document.getElementById('hv-a').setAttribute('cx', D.x[i]); document.getElementById('hv-a').setAttribute('cy', D.ya[i]);
    document.getElementById('hv-b').setAttribute('cx', D.x[i]); document.getElementById('hv-b').setAttribute('cy', D.yb[i]);
    g.setAttribute('visibility', 'visible');
    var flag = function (v, hi) { return v > hi ? ' <em>이상 후보</em>' : ''; };
    tip.innerHTML = '<b>' + D.t[i] + '</b>' + (D.t[i] === D.start ? ' · 설비B 추세 시작' : '') +
      '<br><i class="ka"></i>설비A ' + D.a[i] + ' mm/s' + flag(D.a[i], D.hiA) +
      '<br><i class="kb"></i>설비B ' + D.b[i] + ' mm/s' + flag(D.b[i], D.hiB);
    tip.hidden = false;
    var px = D.x[i] * r.width / D.W, bw = box.clientWidth, tw = tip.offsetWidth;
    tip.style.left = Math.max(0, Math.min(bw - tw, px + 12 > bw - tw ? px - tw - 12 : px + 12)) + 'px';
  }
  function hide() { g.setAttribute('visibility', 'hidden'); tip.hidden = true; }
  var hit = document.getElementById('hit');
  hit.addEventListener('pointermove', show);
  hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', hide);
})();
</script>""".replace("__DATA__", json.dumps(hover_data, ensure_ascii=False))

rows_html = "".join(
    f"<tr><td>{escape(eq)}</td><td>{cand_text(eq, '진동')}</td><td>{stats[(eq, '진동')]['hi']:.2f}</td>"
    f"<td><b>{verdict[eq]['type']}</b></td></tr>" for eq in equipments)

html = f"""<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>노이즈 vs 추세</title>
<style>
:root{{--bg:#fff;--fg:#1b2333;--mut:#5b6476;--line:#e3e6ec;--a:#7a8699;--b:#d1495b}}
@media (prefers-color-scheme:dark){{:root{{--bg:#12161f;--fg:#e8ebf1;--mut:#9aa3b5;--line:#2a3140;--a:#8e9ab0;--b:#ff6b7d}}}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--fg);font-family:system-ui,"Malgun Gothic",sans-serif;line-height:1.5}}
main{{max-width:820px;margin:0 auto;padding:24px 16px}}h1{{font-size:1.4rem;margin:0 0 4px}}
.sum{{margin:8px 0 16px;font-size:1.05rem}}.mut{{color:var(--mut);font-size:.85rem}}
svg{{width:100%;height:auto;display:block}}.grid{{stroke:var(--line)}}.tick{{fill:var(--mut);font-size:12px}}
.limit{{stroke-dasharray:6 4;stroke-width:1.5}}.start{{stroke:var(--b);stroke-dasharray:2 3}}
.lg span{{display:inline-block;margin-right:14px;font-size:.9rem}}.lg i{{display:inline-block;width:14px;height:3px;vertical-align:middle;margin-right:6px}}
table{{width:100%;border-collapse:collapse;margin-top:16px;font-size:.9rem}}td,th{{border-bottom:1px solid var(--line);padding:6px 4px;text-align:left}}
.chart{{position:relative}}#hit{{cursor:crosshair;touch-action:pan-y}}.hv{{stroke:var(--mut);stroke-width:1}}.hv-dot{{stroke:var(--bg);stroke-width:2}}
.tip{{position:absolute;top:8px;background:var(--bg);border:1px solid var(--line);box-shadow:0 2px 8px rgba(0,0,0,.12);padding:6px 10px;font-size:.85rem;line-height:1.5;pointer-events:none;white-space:nowrap;font-variant-numeric:tabular-nums}}
.tip em{{color:var(--b);font-style:normal;font-weight:600}}.tip i{{display:inline-block;width:10px;height:3px;vertical-align:middle;margin-right:6px}}.tip .ka{{background:var(--a)}}.tip .kb{{background:var(--b)}}
</style></head><body><main>
<h1>노이즈인가, 추세인가 — 설비 진동</h1>
<p class="mut">실습용 가상 데이터 · 2026-09-15 08:00~16:00 · 20분 간격</p>
<p class="sum">설비A의 3.5는 한 번 튀고 돌아온 <b>노이즈</b>, 설비B는 {start}부터 꾸준히 오르는 <b>추세</b> — 설비B를 먼저 계획 정비한다.</p>
<div class="lg"><span><i style="background:var(--a)"></i>설비A 프레스 메인모터</span><span><i style="background:var(--b)"></i>설비B 차체 용접로봇 감속기</span><span class="mut">점선 = 설비별 상한(평균 + 2표준편차) · 점 = 이상 후보 · 그래프에 마우스를 올리면 시각별 값이 보인다</span></div>
<div class="chart">{''.join(svg)}<div class="tip" id="tip" hidden></div></div>
<table><tr><th>설비</th><th>진동 이상 후보</th><th>상한(mm/s)</th><th>판정</th></tr>{rows_html}</table>
<p class="mut">출처: keerhee/kma-auto-genai-3-1 · data/Day5/Day5_설비센서_50건_가상.csv · 판정 기준: 원본 Day5 강의(평균 ± 2표준편차, 노이즈 vs 추세)</p>
</main>{hover_js}</body></html>"""
Path("index.html").write_text(html, encoding="utf-8")
print(json.dumps(values, ensure_ascii=False, indent=2))
