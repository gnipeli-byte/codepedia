const SAMPLE = `もじもじは、打った瞬間に数字がはねる文字カウントです。

絵文字もだいたい1文字。👨‍👩‍👧‍👦
空白をのぞくこともできます。

下書きを貼って、上限を選んで、はみ出しそうになったら色が変わります。`;

const draft = document.getElementById("draft");
const ignoreSpaces = document.getElementById("ignore-spaces");
const limitSelect = document.getElementById("limit");
const charCount = document.getElementById("char-count");
const charNote = document.getElementById("char-note");
const wordCount = document.getElementById("word-count");
const lineCount = document.getElementById("line-count");
const byteCount = document.getElementById("byte-count");
const remainCount = document.getElementById("remain-count");
const remainLabel = document.getElementById("remain-label");
const progressWrap = document.querySelector(".progress-wrap");
const progressFill = document.getElementById("progress-fill");
const progressCaption = document.getElementById("progress-caption");
const buddy = document.getElementById("buddy");
const buddyLine = document.getElementById("buddy-line");
const toast = document.getElementById("toast");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const sampleBtn = document.getElementById("sample-btn");

const graphemeSegmenter = makeSegmenter("grapheme");
const wordSegmenter = makeSegmenter("word");

function makeSegmenter(granularity) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
        return new Intl.Segmenter("ja", { granularity });
    }
    return null;
}

function graphemes(text) {
    if (graphemeSegmenter) {
        return [...graphemeSegmenter.segment(text)].map((part) => part.segment);
    }
    return Array.from(text);
}

function countChars(text, skipSpaces) {
    const units = graphemes(text);
    if (!skipSpaces) return units.length;
    return units.filter((unit) => !/\s/u.test(unit)).length;
}

function countWords(text) {
    if (wordSegmenter) {
        let n = 0;
        for (const part of wordSegmenter.segment(text)) {
            if (part.isWordLike) n += 1;
        }
        return n;
    }
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
}

function countLines(text) {
    if (text === "") return 0;
    return text.split(/\r\n|\n|\r/).length;
}

function countBytes(text) {
    return new TextEncoder().encode(text).length;
}

function formatNumber(n) {
    return n.toLocaleString("ja-JP");
}

function pop(el) {
    el.classList.remove("is-pop");
    void el.offsetWidth;
    el.classList.add("is-pop");
}

function setMood(chars, limit) {
    if (chars === 0) {
        buddy.dataset.mood = "idle";
        buddyLine.textContent = "まだゼロ。書いてみて。";
        return;
    }
    if (limit > 0 && chars > limit) {
        buddy.dataset.mood = "over";
        buddyLine.textContent = "おっと、枠からはみ出した。";
        return;
    }
    if (limit > 0 && chars / limit >= 0.85) {
        buddy.dataset.mood = "warn";
        buddyLine.textContent = "そろそろ枠の手前。";
        return;
    }
    buddy.dataset.mood = "typing";
    if (chars < 20) {
        buddyLine.textContent = "いい感じ。もうちょっと。";
    } else if (chars < 120) {
        buddyLine.textContent = "のってきた。数字がはねてる。";
    } else {
        buddyLine.textContent = "いい分量。コピーして持っていけるよ。";
    }
}

function update() {
    const text = draft.value;
    const skipSpaces = ignoreSpaces.checked;
    const limit = Number(limitSelect.value) || 0;
    const chars = countChars(text, skipSpaces);
    const words = countWords(text);
    const lines = countLines(text);
    const bytes = countBytes(text);

    const prevChars = charCount.dataset.value;
    charCount.textContent = formatNumber(chars);
    if (prevChars !== undefined && prevChars !== String(chars)) pop(charCount);
    charCount.dataset.value = String(chars);

    charNote.textContent = skipSpaces
        ? "空白をのぞいた見た目の文字"
        : "grapheme / 見た目の1文字";

    wordCount.textContent = formatNumber(words);
    lineCount.textContent = formatNumber(lines);
    byteCount.textContent = formatNumber(bytes);

    if (limit > 0) {
        const remain = limit - chars;
        remainLabel.textContent = remain >= 0 ? "あまり" : "オーバー";
        remainCount.textContent = formatNumber(remain);
        progressWrap.hidden = false;
        const ratio = Math.min(chars / limit, 1);
        progressFill.style.width = `${Math.max(ratio * 100, chars === 0 ? 0 : 2)}%`;
        progressFill.classList.toggle("is-warn", chars / limit >= 0.85 && chars <= limit);
        progressFill.classList.toggle("is-over", chars > limit);
        progressCaption.textContent = chars > limit
            ? `${formatNumber(chars - limit)} 文字オーバー`
            : `${formatNumber(chars)} / ${formatNumber(limit)}`;
    } else {
        remainLabel.textContent = "あまり";
        remainCount.textContent = "∞";
        progressWrap.hidden = true;
        progressFill.style.width = "0%";
        progressFill.classList.remove("is-warn", "is-over");
        progressCaption.textContent = "";
    }

    setMood(chars, limit);
}

function showToast(message) {
    toast.textContent = message;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        toast.textContent = "";
    }, 1800);
}

copyBtn.addEventListener("click", async () => {
    const text = draft.value;
    if (!text) {
        showToast("まだコピーするものがないよ。");
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        showToast("コピーした。持っていって。");
    } catch {
        draft.select();
        showToast("コピーできなかったので、選択したよ。");
    }
});

clearBtn.addEventListener("click", () => {
    draft.value = "";
    update();
    draft.focus();
    showToast("まっさらにした。");
});

sampleBtn.addEventListener("click", () => {
    draft.value = SAMPLE;
    update();
    draft.focus();
    showToast("おためし文章を入れた。");
});

draft.addEventListener("input", update);
ignoreSpaces.addEventListener("change", update);
limitSelect.addEventListener("change", update);

update();
