/*
 * at.pkgs.js candidate functions
 */

(function(_root_) {
	this.OnceUpon = (function(_namespace_) {
		var _class_;

		_class_ = _namespace_.Object.extend((
			/**
			 * @since 0.1.6
			 * @class at.pkgs.OnceUpon
			 * @classdesc
			 *     非同期処理結果キャッシュクラス.
			 *     
			 *     非同期処理を1回だけ実行し、複数回の呼出で初回実行時の結果を返す.
			 *     
			 *     チュートリアル: {@tutorial at.pkgs.OnceUpon}
			 * @extends {at.pkgs.Object}
			 * @param {at.pkgs.OnceUpon~Operation} operation 実行する処理.
			 * @param {at.pkgs.OnceUpon=} instance インスタンス.
			 */
			function(operation, instance) {
				instance = instance || this;
				this.parent.self(instance);
				instance.operation = operation;
				instance.binder = new _namespace_.EventBinder();
			}
		), { /* prototype */
			/**
			 * 非同期処理結果キャッシュクラスで実行する処理.
			 * 
			 * 処理の実行コンテキスト(this)にはキャッシュクラスが設定される.
			 * 実行結果はthis.set(value)を使用して設定する.
			 * 実行結果を設定しない場合は2度と呼び出されず、また結果取得コールバックも呼び出されない.
			 * 
			 * @since 0.1.6
			 * @callback at.pkgs.OnceUpon~Operation
			 * @returns {Object=} キャンセルなどを行う場合に使用するオブジェクト.
			 */
			/**
			 * 非同期実行結果取得コールバック.
			 * 
			 * 結果取得時の実行コンテキスト(this)にはコールバック自身が設定される.
			 * 
			 * @since 0.1.6
			 * @callback at.pkgs.OnceUpon~Callback
			 * @param {*} value 実行結果.
			 */
			/**
			 * 実行する処理.
			 * 
			 * 実行済みの場合はnull.
			 * 
			 * @since 0.1.6
			 * @memberof at.pkgs.OnceUpon#
			 * @type {Function}
			 */
			operation: null,
			/**
			 * 結果取得イベントバインダ.
			 * 
			 * 結果取得済みの場合はnull.
			 * 
			 * @since 0.1.6
			 * @memberof at.pkgs.OnceUpon#
			 * @type {at.pkgs.EventBinder}
			 */
			binder: null,
			/**
			 * 処理中の処理オブジェクト(処理開始時の返値).
			 * 
			 * 結果取得後のコールバック呼出し後はnull.
			 * 
			 * @since 0.1.6
			 * @memberof at.pkgs.OnceUpon#
			 * @type {*}
			 */
			process: null,
			/**
			 * 処理結果.
			 * 
			 * @since 0.1.6
			 * @memberof at.pkgs.OnceUpon#
			 * @type {*}
			 */
			value: null,
			/**
			 * 処理結果を設定する.
			 * 
			 * @since 0.1.6
			 * @memberof at.pkgs.OnceUpon#
			 * @param {*} value 処理結果.
			 */
			set: function(value) {
				var binder;

				if (!this.binder) return;
				this.value = value;
				binder = this.binder;
				this.binder = null;
				binder.fire(this.value);
				this.process = null;
			},
			/**
			 * 処理結果を取得する.
			 * 
			 * @since 0.1.6
			 * @memberof at.pkgs.OnceUpon#
			 * @param {at.pkgs.OnceUpon~Callback=} callback コールバック.
			 * @returns {*} nullまたは実行結果.
			 */
			get: function(callback) {
				var operation;

				if (this.binder) {
					if (callback) this.binder.bind(callback);
					if (this.operation) {
						operation = this.operation;
						this.operation = null;
						this.process = operation.apply(this);
					}
				}
				else {
					if (callback) callback.call(callback, this.value);
				}
				return this.value;
			}
		});
		return _class_;
	})(this);
}).call(at.pkgs, this);
