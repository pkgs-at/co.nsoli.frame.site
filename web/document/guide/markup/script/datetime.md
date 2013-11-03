sugar.jsは豊富な`Date`型操作メソッドを提供しています。

なお、sugar.jsの`Date`型操作メソッドは内部値を直接変更してしまうため、テンプレート内で操作をする場合は明示的に`clone()`メソッドを呼び出し、複製を操作する必要があります。
ループ内のカーソルなど、値自体を変更したい場合はこの限りではありません。

詳細は [sugar.js#dates#manipulating](http://sugarjs.com/dates#manipulating_dates) を参照ください。

例: 変数 `timestamp` の前月末日の0時0分を出力

	[= timestamp.clone().biginningOfMonth().addDays(-1)
			.format('{yyyy}-{MM}-{dd} {HH}:{mm}') =]
