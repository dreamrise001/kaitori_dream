// ====== Dynamic Year ======
document.getElementById('year').textContent = new Date().getFullYear();

// ====== Rates (editable) ======
// レートは自由に書き換えて使えます。%で指定。
const RATES = {
  amazon:  { first: 96, repeat: 90,  bulk: 98 },
  apple:   { first: 95, repeat: 90,  bulk: 97 },
  google:  { first: 83, repeat: 81,  bulk: 85 },
  nintendo:{ first: 82, repeat: 80,  bulk: 84 }
};

const brandEl = document.getElementById('brand');
const tierEl   = document.getElementById('tier');
const amtEl    = document.getElementById('amount');
const payoutEl = document.getElementById('payout');
const rateEl   = document.getElementById('rate');

function formatJPY(n){
  if (!isFinite(n)) return '—';
  return n.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 });
}

function calc(){
  const brand = brandEl.value;
  const tier  = tierEl.value;
  const rate  = RATES[brand][tier];
  const amt   = parseFloat(amtEl.value || '0');
  const payout = Math.floor(amt * (rate/100));
  payoutEl.textContent = amt ? formatJPY(payout) : '—';
  rateEl.textContent = `${rate}%`;
}
['change','keyup','input'].forEach(ev => {
  brandEl.addEventListener(ev, calc);
  tierEl.addEventListener(ev, calc);
  amtEl.addEventListener(ev, calc);
});
calc();

// ====== Apply from Calculator ======
function openApply(){
  const brandText = brandEl.options[brandEl.selectedIndex].text;
  const tierText  = tierEl.options[tierEl.selectedIndex].text;
  const amt       = amtEl.value || '';
  const rate      = RATES[brandEl.value][tierEl.value];
  const payout    = amt ? Math.floor(parseFloat(amt) * (rate/100)) : 0;
  const subject = `[申込み] ${brandText} / ${tierText} / 額面${amt}円`;
  const body = `以下の内容で申込み希望です。%0D%0A%0D%0A` +
               `ブランド: ${brandText}%0D%0A` +
               `区分: ${tierText}%0D%0A` +
               `額面: ${amt}円%0D%0A` +
               `概算入金額: ${formatJPY(payout)}（${rate}%）%0D%0A` +
               `---%0D%0A` +
               `お名前: %0D%0A` +
               `メール: %0D%0A` +
               `電話: %0D%0A` +
               `振込先: 銀行名/支店/口座種別/番号/名義%0D%0A` +
               `備考: %0D%0A`;
  window.location.href = `mailto:info@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}

// ====== Contact "メール作成" ======
function sendMail(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email= document.getElementById('email').value.trim();
  const tel  = document.getElementById('tel').value.trim();
  const bank = document.getElementById('bank').value.trim();
  const msg  = document.getElementById('msg').value.trim();

  const subject = `[申込み] ${name} 様`;
  const body = `お名前: ${name}%0D%0A` +
               `メール: ${email}%0D%0A` +
               `電話: ${tel}%0D%0A` +
               `振込先: ${bank}%0D%0A` +
               `---%0D%0Aメッセージ:%0D%0A${encodeURIComponent(msg)}`;

  window.location.href = `mailto:info@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}
