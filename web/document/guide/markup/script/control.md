制御構造としては、一般的なJavaScriptの構文の他に、sugar.jsを活用し、下記のような記述を行う場合があります。

# 配列ループ `Array#each(function(VALUE, INDEX){...})` #

リスト表示などに頻出する構造となります。

例: シンプルなループ

	[% items.each(function(value) { %]
	...
	[= value =]
	...
	[% }); %]

例: インデックス(添え字)を使用#1

	[% items.each(function(value, index) { %]
	...
	No.[= index + 1 =]: [= value =]
	...
	[% }); %]

例: インデックス(添え字)を使用#2

	[% items.each(function(value, index) { %]
	<li class="[= index % 2 ? 'even' : 'odd' =]">
	...
	[= value =]
	...
	</li>
	[% }); %]

例: `this`(配列への参照)を使用

	[% items.each(function(value, index) { %]
	<li class="
			[= index == 0 ? 'first' : '' =]
			[= index == this.length - 1 ? 'last' : '' =]
			[= this.length == 1 ? 'single' : '' =]">
	...
	[= value =]
	...
	</li>
	[% }); %]

# 範囲配列生成 `Number#range(FROM, TO).every()` #

FROMからTOまでの値を持つ配列を生成します。  
条件でフィルタしたり文字列版String#range()などのバリエーションもあります。

詳細は [sugar.js#ranges](http://sugarjs.com/ranges) を参照ください。
