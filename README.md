# 中島工業株式会社　出退勤の休日の一括入力
こちらは中島工業株式会社専用のkintoneの出退勤入力の補助アプリです。

## インストール
`npm i kac-nakajima`

## ログイン設定
プロジェクトルートに`.env`を作成し、kintoneのログインに必要なユーザーIDとパスワードを設定してください。各自のkintoneのパスワードは定期的に更新されると思いますので、ご注意ください。

```.env
KINTONE_USERNAME=y-nakajima
KINTONE_PASSWORD=lon9dY5kg6?aR$Us
```

## 例
例を`sample.js`に示します。

```sample.js
const KACNakajima = require("kac-nakajima");

kacNakajima = new KACNakajima();

//出席
kacNakajima.attend("2022-05-25","○○産業大阪工場");

//休日を入力。２０２２年６月１日、２日、８日、15日に休日を入力します。
kacNakajima.multipleHoliday(["01","02","08","15"],"06","2022")
```

## 関数
以下の2つの関数が用意されています
- attend(date,place)
- multipleHoliday(dates,month,year)

### attend(date,place="本社)
日付と場所を指定して出席を記入します。
dateには必ず"yyyy-mm-dd"の形式で入力してください。
placeはデフォルトで本社に設定されています。他の場所を選択したい場合は引数placeに文字列を与えてください。
時間は8:30出勤の17:30退勤で設定されておりこの時間以外の場合は使用することができません。

### multipleHoliday(dates,month,year)
datesには配列を記入してください。`["01","02","08","15"]`これで１日２日８日15日を設定できます。
monthに月を指定してください。"01"や"12"など必ず二桁で入力してください。
yearにはデフォルトで"2022"が設定されています。変更する場合は"2023"などと指定してください。