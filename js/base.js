'use strict';
{
  const items = document.querySelectorAll('.menu .item');
  // スマホ判定（hover が存在しない環境）
  const isTouchDevice = window.matchMedia('(hover: none)').matches;


  items.forEach(item => {
    // PC用（マウスホバーで）コンテンツ表示
    if (!isTouchDevice) {
      item.addEventListener('mouseenter', () => {
        item.classList.add('appear');
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('appear');
      });
    }

    // スマホ用（クリックで）コンテンツ表示
    item.addEventListener('click', (e) => {
      item.classList.toggle('appear');
      e.stopPropagation(); // 外側クリックの伝播を防ぐ
      // 他のitemを閉じる
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('appear');
        }
      });
    });
  });
  // 外側をタップしたら全部閉じる
  document.addEventListener('click', () => {
    items.forEach(item => item.classList.remove('appear'));
  });
}