フォーマットについては数値(Number)及び日時(Date)について強化されています。

# 数値フォーマット `Number#pad(NUM)` #

`Number`型変数の`pad()`メソッドを使用して数値の桁埋めが可能です。  
符号の有無や埋め草の指定なども可能です。

詳細は [sugar.js#Number#pad()](http://sugarjs.com/api/Number/pad) を参照ください。

例: class名に変数`type`から頭`0`埋め2桁で`type_XX`を指定

	<li class="type_[= type.pad(2) =]"></li>

# 数値フォーマット `Number#format(NUM)` #

`Number`型変数の`format()`メソッドを使用して数値のフォーマットが可能です。

詳細は [sugar.js#Number#format()](http://sugarjs.com/api/Number/format) を参照ください。

例: `1,234.00`を出力

	[= new Number(1234.00).format(2) =]

例: `1'234,00`を出力

	[= new Number(1234.00).format(2, "'", ',') =]

# 日付・日時・時刻フォーマット `Date#format(FORMAT)` #

`Date`型変数の`format()`メソッドを使用して日時のフォーマットが可能です。

詳細は [sugar.js#dates#formatting](http://sugarjs.com/dates#formatting_dates) を参照ください。

例: 変数 `timestamp` 出力

	[= timestamp.format('{yyyy}年{MM}月{dd}日 {HH}:{mm}') =]
