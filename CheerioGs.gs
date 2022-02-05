function cheeriogs() {
  const getUrl = "https://www.livedoor.com/"; //スクレイピングをするURLを指定する。
  const content = UrlFetchApp.fetch(getUrl).getContentText('utf-8');　//URLフェッチのオブジェクトを利用してHTML取得する

  const $ = Cheerio.load(content);

  let getDataText = $('.blog-ranking').text();
  let delData = getDataText.replace(/\r?\n/g, '');
  let dataArray2 = delData.split(" ");
  let delArray = dataArray2.filter(v => v);
  //console.log(delArray);

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('抽出データ2');
  
  for (let i = 1; i <= delArray.length; i++) {
    sheet.getRange(i,1).setValue(delArray[i]);
  }


  /*let getData = [];

  $('.blog-ranking').each((i,element) => {
    getData.push($(element).text())
  });

  console.log(getData);

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('抽出データ2');

  for (let i = 0; i <= getData.length; i++){
    sheet.getRange(i + 1,1).setValue(getData[i]);
  }*/
}
