テンプレートタグはJavaScriptを実行します。種類は下記の通りです。

# `{= EXP =}` #

`EXP`を評価し、値をHTMLエスケープし、出力します。  

例: JavaScriptの三項演算子を使用

	<table class="{= items.length <= 0 ? 'empty' : 'list' =}">
	...
	</table>

# `{@ EXP @}` #

`EXP`を評価し、値をそのまま出力します(エスケープ処理を行いません)。

# `{% SCRIPT; %}` #

`SCRIPT`をJavaScriptとして実行します。

下記のように、一連のJavaScriptコードを分割出来ます。

例: JavaScriptのif文を使用

	{% if (condition) { %}
	<p>{= value =}</p>
	{% } else { %}
	<p class="error">error!</p>
	{% } %}

例: sugar.jsのArray#each()を使用

	{% items.each(function(item, index) { %}
	<li>{= item.name =}</li>
	{% }); %}
