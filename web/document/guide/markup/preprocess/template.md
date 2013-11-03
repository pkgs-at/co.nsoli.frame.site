テンプレートタグはJavaScriptを実行します。種類は下記の通りです。

# `[= EXP =]` #

`EXP`を評価し、値をHTMLエスケープし、出力します。  

例: JavaScriptの三項演算子を使用

	[= items.length <= 0 ? 'empty' : 'list' =]

# `[@ EXP @]` #

`EXP`を評価し、値をそのまま出力します(エスケープ処理を行いません)。

# `[% SCRIPT; %]` #

`SCRIPT`をJavaScriptとして実行します。

下記のように、一連のJavaScriptコードを分割出来ます。

例: JavaScriptのif文を使用

	[% if (condition) { %]
	[= value =]
	[% } else { %]
	error
	[% } %]

例: sugar.jsのArray#each()を使用

	[% items.each(function(item, index) { %]
	[= item.name =]
	[% }); %]

# `[? extends PATH/TO.FILE ?]` #

指定されたファイルを`inc`ディレクトリから読込み、現在のテンプレートの親として展開します。

内部の動作は後述の`include`とかわりませんが、将来的に挙動が変更(区別)される可能性があります。

# `[? include PATH/TO.FILE ?]` #

指定されたファイルを`inc`ディレクトリから読込み、展開します。

現在はextendsの別名です。
継承の対象としない純粋なインクルードを行う場合に使用してください。

# `[? NAME { ?]...[? } NAME ?]` #

テンプレートセクションを定義し、また拡張します。  
テンプレートセクション内に`[? base ?]`を記述すると拡張元のテンプレートで出力される内容が展開されます。

セクションの終了タグの`NAME`は省略可能ですが、可読性の点から記述を推奨します。

# テンプレート変数 `tmpl.timestamp` #

テンプレート処理を行った日時のUNIXタイムスタンプが設定されます。

例: 外部スクリプトファイルの読込み

	<script src="~/script/at.pkgs.js?[= tmpl.timestamp =]"></script>

# テンプレート変数 `tmpl.path` #

テンプレートファイルの仮想パス(プリプロセス後のリクエストパス)になります。

例: クライアントが`/default.html`をリクエストし、`web/default.htpl`がレンダリングされる場合

	/default.html
