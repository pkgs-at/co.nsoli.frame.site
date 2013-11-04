co.nsoli.frameをフルスタックで利用したり、あるいはフロントエンドMVCフレームワークとして使用する際には、コンテンツが動的にレンダリングされるため、検索エンジンに対する配慮が求められるサイトの場合、問題になる可能性があります。

たとえば、本サイトではJavaScriptを使用して動的にコンテンツをレンダリングしていますので、検索エンジンが適切に内容をインデックスできない可能性があります。

ですが、Googleに限定すれば対応は可能です。

- [Making AJAX Applications Crawlable(英語)](https://developers.google.com/webmasters/ajax-crawling/)
- 概要: [AJAX クロール](https://support.google.com/webmasters/answer/174992)

詳細は上記のリンク先を参照ください。

本サイトの運用環境(Apache httpd + Tomcat)では、下記のような設定で、ウェブサーバにて検索エンジンからのリクエストをヘッドレスブラウザプロクシにリクエストする構成になっています。

	<VirtualHost *:80>
	    ServerName http://frame.nsoli.co
	
	    SetEnv AJP_PROXY_BASE "http://frame.nsoli.co"
	    SetEnv AJP_PROXY_WAIT 5000
	
	    RewriteEngine On
	    RewriteCond %{QUERY_STRING} (^|&)_escaped_fragment_=
	    RewriteRule ^/(.*)$ \
	ajp://localhost:8009/co.nsoli.frame.proxy/$1 [P,QSA,L]
	    RewriteRule ^/(.*)$ \
	ajp://localhost:8009/co.nsoli.frame/$1 [P,QSA,L]
	</VirtualHost>

ここで、`ajp://localhost:8009/co.nsoli.frame`がサイト本体、`ajp://localhost:8009/co.nsoli.frame.proxy`がプロキシとなっています。

たとえば、[こちら](document.html?_escaped_fragment_=path%3d%252Fhint%252Findexee) `document.html?_escaped_fragment_=path%3d%252Fhint%252Findexee`が、このページに対応するプロキシサーバのURLです。

GoogleのドキュメントではServletコンテナ側でFilterとして実装する例が紹介されています。

本サイトでは下記のポイントを考慮してこの実装方法を避けました。

- HtmlUnitの依存関係の多さ
- HtmlUnitの依存ライブラリのライセンス
- バックエンドにJavaを使用しない場合でも構成可能
- 再利用性
- プロキシの場合は、複数サイトのプロキシを集約可能

注意点として、このような構成にした場合、オープンプロキシとして動作しないように、また、オリジンサイトへの問い合わせが再度プロキシサーバに要求されて無限ループを構成しないように留意する必要があります。
