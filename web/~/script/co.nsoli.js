/*
 * Copyright (c) 2009-2013, Architector Inc., Japan
 * All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file CoNsoliFrame client library.
 * 
 * 下記のライブラリに依存。
 * - at.pkgs.js
 * - sugar-1.4.1.js
 * - jquery-1.10.2.js
 * - jquery.migrate-1.2.1.js
 * - jquery.ba-hashchange-1.3.0.js
 * 
 * @version 0.1.3
 * @author 鈴木 聰太郎 <sotaro.suzuki@architector.jp>
 * @copyright 2009-2013, Architector Inc., Japan
 * @namespace co.nsoli
 */

(co = this.co || {}).nsoli = new (function(_root_) {
	this.Component = (function(_namespace_) {
		var _class_;

		_class_ = at.pkgs.Object.extend((
			/**
			 * @since 0.1.1
			 * @class co.nsoli.Component
			 * @classdesc UIコンポーネントの基底クラス.
			 * @extends {at.pkgs.Object}
			 * @param {jQuery} $element DOM要素のjQueryラッパ.
			 * @param {co.nsoli.Component=} instance インスタンス.
			 */
			function($element, instance) {
				instance = instance || this;
				this.parent.self(instance);
				instance.$ = $element;
				instance.initialized = false;
				instance.components = new Array();
			}
		), { /* prototype */
			/**
			 * DOM要素のjQueryラッパ.
			 * 
			 * @since 0.1.1
			 * @memberof co.nsoli.Component#
			 * @type {jQuery}
			 */
			$: null,
			/**
			 * 初期化フラグ.
			 * 
			 * @since 0.1.1
			 * @memberof co.nsoli.Component#
			 * @type {Boolean}
			 */
			initialized: null,
			/**
			 * ページ.
			 * 
			 * @since 0.1.1
			 * @memberof co.nsoli.Component#
			 * @type {co.nsoli.Page}
			 */
			page: null,
			/**
			 * 親コンポーネント.
			 * 
			 * @since 0.1.1
			 * @memberof co.nsoli.Component#
			 * @type {co.nsoli.Component}
			 */
			container: null,
			/**
			 * 子コンポーネントの配列.
			 * 
			 * @since 0.1.1
			 * @memberof co.nsoli.Component#
			 * @type {co.nsoli.Component[]}
			 */
			components: null,
			/**
			 * 子コンポーネントを追加する.
			 * 
			 * @since 0.1.1
			 * @memberof co.nsoli.Component#
			 * @param {co.nsoli.Component} component 子コンポーネント.
			 * @param {co.nsoli.Component=} instance インスタンス.
			 */
			add: function(component, instance) {
				instance = instance || this;
				instance.components.push(component);
				if (instance.initialized && !component.initialized)
					component.initialize(instance.page, this);
			},
			/**
			 * コンポーネントを初期化する.
			 * 
			 * @since 0.1.1
			 * @abstract
			 * @memberof co.nsoli.Component#
			 * @param {co.nsoli.Page} page ページ.
			 * @param {co.nsoli.Component} container 親コンポーネント.
			 * @param {co.nsoli.Component=} instance インスタンス.
			 */
			initialize: function(page, container, instance) {
				instance = instance || this;
				if (instance.initialized) throw new Error('already initialized');
				instance.page = page;
				instance.container = container;
				instance.components.each(function(component) {
					if (!component.initialized)
						component.initialize(instance.page, this);
				});
				instance.initialized = true;
			}
		});
		return _class_;
	})(this);
	this.Partial = (function(_namespace_) {
		var _class_;

		_class_ = _namespace_.Component.extend((
			/**
			 * @since 0.1.1
			 * @class co.nsoli.Partial
			 * @classdesc パーシャルの基底クラス.
			 * @extends {co.nsoli.Component}
			 * @param {jQuery} $element DOM要素のjQueryラッパ.
			 * @param {co.nsoli.Partial=} instance インスタンス.
			 */
			function($element, instance) {
				instance = instance || this;
				this.parent.self($element, instance);
			}
		), { /* prototype */
			// nothing at current version
		});
		return _class_;
	})(this);
	this.PageContext = (function(_namespace_) {
		var _class_;

		_class_ = at.pkgs.Object.extend((
			/**
			 * @since 0.1.0
			 * @class co.nsoli.PageContext
			 * @classdesc ページコンテキストの基底クラス.
			 * @extends {at.pkgs.Object}
			 * @param {co.nsoli.PageContext=} instance インスタンス.
			 */
			function(instance) {
				instance = instance || this;
				this.parent.self(instance);
				instance.keys = new Array();
				instance.changes = new Array();
			}
		), { /* prototype */
			/**
			 * コンテキストキーの配列.
			 * 
			 * @since 0.1.2
			 * @memberof co.nsoli.PageContextt#
			 * @type {String[]}
			 */
			keys: null,
			/**
			 * 変更されたコンテキストキーの配列.
			 * 
			 * @since 0.1.3
			 * @memberof co.nsoli.PageContextt#
			 * @type {String[]}
			 */
			changes: null,
			/**
			 * コンテキストキーを指定して変更されたものが含まれるか判定する.
			 * 
			 * @since 0.1.3
			 * @memberof co.nsoli.PageContext#
			 * @param {String[]|String} keys コンテキストキーの配列.
			 * @returns {Boolean} 一項目でも変更されていればtrue.
			 */
			changed: function(keys) {
				keys = Array.isArray(keys) ? keys : new Array(keys);
				return this.changes.any(function(key) {
					return keys.any(function(value) {
						return key == value;
					});
				});
			},
			/**
			 * 文字列表現をデコードする.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.PageContext#
			 * @param {String} hash コンテキストの文字列表現.
			 * @param {co.nsoli.PageContext=} instance インスタンス.
			 */
			decode: function(hash, instance) {
				var values;

				instance = instance || this;
				instance.changes.length = 0;
				values = new Object();
				instance.keys.each(function(key) {
					values.key = null;
				});
				hash.split('&').each(function(pair) {
					pair = pair.split('=');
					values[decodeURIComponent(pair[0])] =
						pair.length < 2 ? null : decodeURIComponent(pair[1]);
				});
				instance.keys.each(function(key) {
					var value;
					var changed;

					value = values[key];
					if (instance['same_' + key]) {
						changed = !instance['same_' + key](value);
					}
					else if (instance['get_' + key]) {
						changed = !(value === instance['get_' + key]());
					}
					else {
						changed = true;
					}
					if (!changed) return;
					instance.changes.add(key);
					if (!instance['set_' + key]) return;
					instance['set_' + key](value);
				});
			},
			/**
			 * 文字列表現にエンコードする.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.PageContext#
			 * @param {Object} parameters 上書きされるコンテキストパラメタ.
			 * @param {co.nsoli.PageContext=} instance インスタンス.
			 * @returns {String} コンテキストの文字列表現.
			 */
			encode: function(parameters, instance) {
				var pairs;

				instance = instance || this;
				pairs = new Array();
				instance.keys.each(function(key) {
					var value;

					if (!instance['get_' + key]) return;
					value = instance['get_' + key](parameters[key]);
					if (value === null) return;
					key = encodeURIComponent(key);
					value = encodeURIComponent(value);
					pairs.push(key + '=' + value);
				});
				return pairs.join('&');
			}
		});
		return _class_;
	})(this);
	this.Page = (function(_namespace_) {
		var _class_;

		_class_ = _namespace_.Component.extend((
			/**
			 * @since 0.1.0
			 * @class co.nsoli.Page
			 * @classdesc ページの基底クラス.
			 * @extends {co.nsoli.Component}
			 * @param {co.nsoli.PageContext} context コンテキスト.
			 * @param {co.nsoli.Page=} instance インスタンス.
			 */
			function(context, instance) {
				instance = instance || this;
				this.parent.self($(window), instance);
				instance.layout = new at.pkgs.EventBinder();
				instance.refresh = new at.pkgs.EventBinder();
				instance.context = context;
			}
		), { /* prototype */
			/**
			 * レイアウトイベントバインダ.
			 * 
			 * スクロール・画面サイズ変更時に発火する.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.Page#
			 * @type {at.pkgs.EventBinder}
			 */
			layout: null,
			/**
			 * リフレッシュイベントバインダ.
			 * 
			 * コンテキスト変更時に発火する.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.Page#
			 * @type {at.pkgs.EventBinder}
			 */
			refresh: null,
			/**
			 * ページコンテキスト.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.Page#
			 * @type {co.nsoli.PageContext}
			 */
			context: null,
			/**
			 * リンクURLを生成する.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.Page#
			 * @param {Object} parameters 上書きされるコンテキストパラメタ.
			 * @param {String=} base ベースURL.
			 * @returns {String} URL.
			 */
			link: function(parameters, base) {
				var hash;

				if (!base) base = window.location.pathname + window.location.search;
				hash = this.context.encode(parameters);
				return hash ? (base + '#!' + hash) : base;
			},
			/**
			 * ページを初期化する.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.Page#
			 * @param {co.nsoli.Page=} instance インスタンス.
			 */
			initialize: function(instance) {
				var scrolling;
				var resizing;

				instance = instance || this;
				this.parent.initialize(instance, null, instance);
				if (!this.immediate('initialize')) return;
				scrolling = false;
				resizing = false;
				instance.$.scroll(function() {
					if (scrolling) {
						clearTimeout(scrolling);
					}
					else {
						instance.layout.fire(true);
					}
					scrolling = setTimeout(function() {
						scrolling = false;
						instance.layout.fire(resizing ? true : false);
					}, 200);
				});
				instance.$.resize(function() {
					if (resizing) {
						clearTimeout(resizing);
					}
					else {
						instance.layout.fire(true);
					}
					resizing = setTimeout(function() {
						resizing = false;
						instance.layout.fire(scrolling ? true : false);
					}, 200);
				});
				instance.$.hashchange(function() {
					var hash;

					hash = window.location.href.split('#!')[1] || '';
					instance.context.decode(hash);
					instance.refresh.fire();
				});
				instance.layout.fire(false);
				instance.$.hashchange();
			},
			/**
			 * 画面先頭にスクロールする.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.Page#
			 */
			scrollToTop: function() {
				$('html, body').scrollTop(0);
			},
			/**
			 * 画面末尾にスクロールする.
			 * 
			 * @since 0.1.0
			 * @memberof co.nsoli.Page#
			 */
			scrollToBottom: function() {
				$('html, body').scrollTop($('html').height());
			}
		});
		return _class_;
	})(this);
})(this);
