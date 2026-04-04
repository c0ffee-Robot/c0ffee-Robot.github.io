'use strict';
{
  document.getElementById('encryptBtn').addEventListener('click', () => {
    const text = document.getElementById('text').value;
    const key = document.getElementById('key').value;
    const iv = document.getElementById('iv').value;
    const algo = document.getElementById('algo').value;

    if (!text || !key) {
      alert('文字列とキーを入力してください');
      return;
    }

    let encrypted;
    try {
      if (algo === 'AES') {
        // AES-CBCでの暗号化
        encrypted = CryptoJS.AES.encrypt(
          CryptoJS.enc.Utf8.parse(text),
          CryptoJS.enc.Hex.parse(key),
          {
            iv: CryptoJS.enc.Hex.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }
        );
      } else if (algo === '3DES') {
        // 3DES-CBCでの暗号化
        encrypted = CryptoJS.TripleDES.encrypt(
          CryptoJS.enc.Utf8.parse(text),
          CryptoJS.enc.Hex.parse(key),
          {
            iv: CryptoJS.enc.Hex.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }
        );
      }
      if (!encrypted) {
        window.alert('暗号化に失敗しました。');
      }
    } catch (e) {
      console.error('エラー：', e);
    }


    document.getElementById('cipher').value = encrypted;
  });


}