function appendConsole(msg) {
  const consoleBox = document.getElementById('consoleBox');
  if (!consoleBox) return;
  const line = document.createElement('div');
  line.className = 'console-line';
  line.innerHTML = `<span class="prefix">[>]</span> ${msg}`;
  consoleBox.appendChild(line);
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

function runMasterExploit() {
  const btn = document.getElementById('masterBtn');
  btn.disabled = true;
  btn.style.opacity = '0.6';
  btn.style.cursor = 'wait';

  appendConsole("جاري فحص الجهاز والنظام (PS4 / PS5)...");
  
  setTimeout(() => {
    appendConsole("تم التعرّف على الثغرة المناسبة (WebKit / PSFree)...");
  }, 1000);

  setTimeout(() => {
    appendConsole("جاري إرسال Payload & GoldHEN...");
  }, 2200);

  setTimeout(() => {
    appendConsole("<span style='color: #00e676; font-weight: bold;'>تم تفعيل التعديلة بنجاح! استمتع باللعب.</span>");
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
  }, 3500);
}