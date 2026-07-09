(function () {
  const data = window.qualityDiagnostic;
  const form = document.getElementById("form");
  const stageList = document.getElementById("stageList");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const answeredText = document.getElementById("answeredText");
  const overallStage = document.getElementById("overallStage");
  const overallSummary = document.getElementById("overallSummary");
  const strongest = document.getElementById("strongest");
  const strongestText = document.getElementById("strongestText");
  const priority = document.getElementById("priority");
  const priorityText = document.getElementById("priorityText");
  const recommendations = document.getElementById("recommendations");
  const chart = document.getElementById("chart");
  const ctx = chart.getContext("2d");
  const storageKey = "qip-quality-diagnostic-v1";

  function node(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "className") el.className = value;
      else if (key === "text") el.textContent = value;
      else el.setAttribute(key, value);
    });
    children.forEach((child) => el.appendChild(typeof child === "string" ? document.createTextNode(child) : child));
    return el;
  }

  function stageFor(value) {
    if (!value) return null;
    return data.stages[Math.max(0, Math.min(data.stages.length - 1, Math.round(value) - 1))];
  }

  function buildStages() {
    data.stages.forEach((stage) => {
      stageList.appendChild(node("li", {}, [
        node("strong", { text: `${stage.value}. ${stage.name}` }),
        node("span", { text: stage.summary })
      ]));
    });
  }

  function buildQuestions() {
    data.categories.forEach((category) => {
      const group = node("fieldset", { className: "category" }, [
        node("legend", {}, [
          node("span", { className: "category-name", text: category.name }),
          node("span", { className: "category-prompt", text: category.prompt })
        ])
      ]);
      const choices = node("div", { className: "choices" });
      category.choices.forEach((choice, index) => {
        const value = index + 1;
        const input = node("input", {
          type: "radio",
          name: category.id,
          value: String(value),
          "aria-label": `${stageFor(value).name}: ${choice}`
        });
        choices.appendChild(node("label", {}, [
          input,
          node("strong", { text: stageFor(value).name }),
          node("span", { text: choice })
        ]));
      });
      group.appendChild(choices);
      form.appendChild(group);
    });
  }

  function answers() {
    const result = {};
    data.categories.forEach((category) => {
      const checked = form.querySelector(`input[name="${category.id}"]:checked`);
      if (checked) result[category.id] = Number(checked.value);
    });
    return result;
  }

  function setAnswers(result) {
    Object.entries(result).forEach(([id, value]) => {
      const input = form.querySelector(`input[name="${id}"][value="${value}"]`);
      if (input) input.checked = true;
    });
    update();
  }

  function scoredCategories(result) {
    return data.categories.map((category) => ({
      ...category,
      score: result[category.id] || 0,
      stage: stageFor(result[category.id])
    }));
  }

  function draw(scores) {
    const width = chart.width;
    const height = chart.height;
    const pad = { top: 28, right: 28, bottom: 86, left: 44 };
    const plotWidth = width - pad.left - pad.right;
    const plotHeight = height - pad.top - pad.bottom;
    const gap = 18;
    const barWidth = (plotWidth - gap * (scores.length - 1)) / scores.length;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#d9e0e6";
    ctx.fillStyle = "#5b6773";
    ctx.font = "14px Segoe UI, sans-serif";
    data.stages.forEach((stage) => {
      const y = pad.top + plotHeight - ((stage.value - 1) / 4) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(width - pad.right, y);
      ctx.stroke();
      ctx.fillText(String(stage.value), 16, y + 4);
    });
    scores.forEach((item, index) => {
      const x = pad.left + index * (barWidth + gap);
      const barHeight = item.score ? ((item.score - 1) / 4) * plotHeight : 0;
      const y = pad.top + plotHeight - barHeight;
      ctx.fillStyle = item.score >= 4 ? "#2f7d62" : item.score >= 3 ? "#1d5f8f" : "#c77b2a";
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = "#123c5b";
      ctx.font = "bold 15px Segoe UI, sans-serif";
      ctx.fillText(item.score ? String(item.score) : "--", x + barWidth / 2 - 8, y - 8);
      ctx.save();
      ctx.translate(x + barWidth / 2, height - 18);
      ctx.rotate(-0.55);
      ctx.fillStyle = "#17212b";
      ctx.font = "13px Segoe UI, sans-serif";
      ctx.fillText(item.name, 0, 0);
      ctx.restore();
    });
  }

  function updateEmail(scores, average, stage) {
    const lines = scores.map((item) => `${item.name}: ${item.stage ? item.stage.name : "Incomplete"}`).join("%0D%0A");
    const body = [
      "I completed the Quality Diagnostic.",
      "",
      `Overall maturity: ${stage ? stage.name : "Incomplete"} (${average ? average.toFixed(1) : "--"})`,
      "",
      "Category results:",
      lines,
      "",
      "I would like to discuss the best next step."
    ].join("%0D%0A");
    document.getElementById("email").href = `mailto:info@qualityinpractice.solutions?subject=Quality%20Diagnostic&body=${body}`;
  }

  function update() {
    const result = answers();
    localStorage.setItem(storageKey, JSON.stringify(result));
    const scores = scoredCategories(result);
    const answered = scores.filter((item) => item.score);
    const percent = Math.round((answered.length / data.categories.length) * 100);
    const average = answered.length ? answered.reduce((sum, item) => sum + item.score, 0) / answered.length : 0;
    const stage = stageFor(average);
    const complete = scores.filter((item) => item.score);
    const rankedHigh = [...complete].sort((a, b) => b.score - a.score);
    const rankedLow = [...complete].sort((a, b) => a.score - b.score);

    progressBar.value = percent;
    progressText.textContent = `${percent}% complete`;
    answeredText.textContent = `${answered.length} of ${data.categories.length} categories answered.`;
    overallStage.textContent = stage ? `${stage.name} (${average.toFixed(1)})` : "Incomplete";
    overallSummary.textContent = stage ? stage.summary : "Answer the diagnostic to see your overall maturity stage.";

    strongest.textContent = rankedHigh[0] ? rankedHigh[0].name : "--";
    strongestText.textContent = rankedHigh[0] ? `${rankedHigh[0].stage.name}: ${rankedHigh[0].prompt}` : "Your strongest quality maturity category will appear here.";
    priority.textContent = rankedLow[0] ? rankedLow[0].name : "--";
    priorityText.textContent = rankedLow[0] ? rankedLow[0].recommendation : "Your priority quality maturity gap will appear here.";

    recommendations.innerHTML = "";
    if (!complete.length) {
      recommendations.appendChild(node("article", { className: "recommendation" }, [
        node("h3", { text: "Recommendations will appear here" }),
        node("p", { text: "Complete at least one category to see a recommended Quality Academy path." })
      ]));
    } else {
      rankedLow.forEach((item, index) => {
        recommendations.appendChild(node("article", { className: index === 0 ? "recommendation priority" : "recommendation" }, [
          node("h3", { text: `${item.name}: ${item.stage.name}` }),
          node("p", { text: item.recommendation }),
          node("p", {}, [node("strong", { text: "Suggested path: " }), document.createTextNode(item.academyPath)])
        ]));
      });
    }
    draw(scores);
    updateEmail(scores, average, stage);
  }

  function loadSaved() {
    try {
      setAnswers(JSON.parse(localStorage.getItem(storageKey) || "{}"));
    } catch {
      update();
    }
  }

  document.getElementById("sample").addEventListener("click", () => {
    setAnswers({
      management: 2,
      organization: 3,
      "problem-handling": 2,
      "cost-of-quality": 2,
      "improvement-actions": 3,
      "company-posture": 2
    });
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("reset").addEventListener("click", () => {
    form.reset();
    localStorage.removeItem(storageKey);
    update();
  });
  document.getElementById("print").addEventListener("click", () => window.print());
  form.addEventListener("change", update);

  buildStages();
  buildQuestions();
  loadSaved();
})();
