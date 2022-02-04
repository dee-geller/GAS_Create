function parser() {


  const getUrl = "https://www.livedoor.com/"; //スクレイピングをするURLを指定する。
  let content = UrlFetchApp.fetch(getUrl).getContentText('utf-8');　//URLフェッチのオブジェクトを利用してHTML取得する

  let start = '<div id="blog-ranking">';
  let end = '</div>'

  let newList = Parser.data(content).from(start).to(end).build();

  let sList = newList.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''); //不要タグを削除
  let ssList = sList.replace(/\r?\n/g, ''); //改行を削除

  let dataArray = ssList.split(" ");
  let delArray = dataArray.filter(v => v); //空白の配列を削除

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('抽出データ');
  
  for (let i = 0; i <= delArray.length; i++){
    sheet.getRange(i + 1,1).setValue(delArray[i]);
  }

  console.log(delArray);
}