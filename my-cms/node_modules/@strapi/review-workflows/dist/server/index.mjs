import { async, errors, yup, validateYupSchema } from "@strapi/utils";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lodash_min = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
lodash_min.exports;
(function(module, exports) {
  (function() {
    function n(n2, t3, r2) {
      switch (r2.length) {
        case 0:
          return n2.call(t3);
        case 1:
          return n2.call(t3, r2[0]);
        case 2:
          return n2.call(t3, r2[0], r2[1]);
        case 3:
          return n2.call(t3, r2[0], r2[1], r2[2]);
      }
      return n2.apply(t3, r2);
    }
    function t2(n2, t3, r2, e2) {
      for (var u2 = -1, i2 = null == n2 ? 0 : n2.length; ++u2 < i2; ) {
        var o2 = n2[u2];
        t3(e2, o2, r2(o2), n2);
      }
      return e2;
    }
    function r(n2, t3) {
      for (var r2 = -1, e2 = null == n2 ? 0 : n2.length; ++r2 < e2 && t3(n2[r2], r2, n2) !== false; ) ;
      return n2;
    }
    function e(n2, t3) {
      for (var r2 = null == n2 ? 0 : n2.length; r2-- && t3(n2[r2], r2, n2) !== false; ) ;
      return n2;
    }
    function u(n2, t3) {
      for (var r2 = -1, e2 = null == n2 ? 0 : n2.length; ++r2 < e2; ) if (!t3(n2[r2], r2, n2)) return false;
      return true;
    }
    function i(n2, t3) {
      for (var r2 = -1, e2 = null == n2 ? 0 : n2.length, u2 = 0, i2 = []; ++r2 < e2; ) {
        var o2 = n2[r2];
        t3(o2, r2, n2) && (i2[u2++] = o2);
      }
      return i2;
    }
    function o(n2, t3) {
      return !!(null == n2 ? 0 : n2.length) && y(n2, t3, 0) > -1;
    }
    function f(n2, t3, r2) {
      for (var e2 = -1, u2 = null == n2 ? 0 : n2.length; ++e2 < u2; ) if (r2(t3, n2[e2])) return true;
      return false;
    }
    function c(n2, t3) {
      for (var r2 = -1, e2 = null == n2 ? 0 : n2.length, u2 = Array(e2); ++r2 < e2; ) u2[r2] = t3(n2[r2], r2, n2);
      return u2;
    }
    function a(n2, t3) {
      for (var r2 = -1, e2 = t3.length, u2 = n2.length; ++r2 < e2; ) n2[u2 + r2] = t3[r2];
      return n2;
    }
    function l(n2, t3, r2, e2) {
      var u2 = -1, i2 = null == n2 ? 0 : n2.length;
      for (e2 && i2 && (r2 = n2[++u2]); ++u2 < i2; ) r2 = t3(r2, n2[u2], u2, n2);
      return r2;
    }
    function s(n2, t3, r2, e2) {
      var u2 = null == n2 ? 0 : n2.length;
      for (e2 && u2 && (r2 = n2[--u2]); u2--; ) r2 = t3(r2, n2[u2], u2, n2);
      return r2;
    }
    function h(n2, t3) {
      for (var r2 = -1, e2 = null == n2 ? 0 : n2.length; ++r2 < e2; ) if (t3(n2[r2], r2, n2)) return true;
      return false;
    }
    function p(n2) {
      return n2.split("");
    }
    function _2(n2) {
      return n2.match($t) || [];
    }
    function v(n2, t3, r2) {
      var e2;
      return r2(n2, function(n3, r3, u2) {
        if (t3(n3, r3, u2)) return e2 = r3, false;
      }), e2;
    }
    function g(n2, t3, r2, e2) {
      for (var u2 = n2.length, i2 = r2 + (e2 ? 1 : -1); e2 ? i2-- : ++i2 < u2; ) if (t3(n2[i2], i2, n2)) return i2;
      return -1;
    }
    function y(n2, t3, r2) {
      return t3 === t3 ? Z(n2, t3, r2) : g(n2, b, r2);
    }
    function d(n2, t3, r2, e2) {
      for (var u2 = r2 - 1, i2 = n2.length; ++u2 < i2; ) if (e2(n2[u2], t3)) return u2;
      return -1;
    }
    function b(n2) {
      return n2 !== n2;
    }
    function w(n2, t3) {
      var r2 = null == n2 ? 0 : n2.length;
      return r2 ? k(n2, t3) / r2 : Cn;
    }
    function m(n2) {
      return function(t3) {
        return null == t3 ? X : t3[n2];
      };
    }
    function x(n2) {
      return function(t3) {
        return null == n2 ? X : n2[t3];
      };
    }
    function j(n2, t3, r2, e2, u2) {
      return u2(n2, function(n3, u3, i2) {
        r2 = e2 ? (e2 = false, n3) : t3(r2, n3, u3, i2);
      }), r2;
    }
    function A(n2, t3) {
      var r2 = n2.length;
      for (n2.sort(t3); r2--; ) n2[r2] = n2[r2].value;
      return n2;
    }
    function k(n2, t3) {
      for (var r2, e2 = -1, u2 = n2.length; ++e2 < u2; ) {
        var i2 = t3(n2[e2]);
        i2 !== X && (r2 = r2 === X ? i2 : r2 + i2);
      }
      return r2;
    }
    function O(n2, t3) {
      for (var r2 = -1, e2 = Array(n2); ++r2 < n2; ) e2[r2] = t3(r2);
      return e2;
    }
    function I(n2, t3) {
      return c(t3, function(t4) {
        return [t4, n2[t4]];
      });
    }
    function R(n2) {
      return n2 ? n2.slice(0, H(n2) + 1).replace(Lt, "") : n2;
    }
    function z(n2) {
      return function(t3) {
        return n2(t3);
      };
    }
    function E(n2, t3) {
      return c(t3, function(t4) {
        return n2[t4];
      });
    }
    function S(n2, t3) {
      return n2.has(t3);
    }
    function W(n2, t3) {
      for (var r2 = -1, e2 = n2.length; ++r2 < e2 && y(t3, n2[r2], 0) > -1; ) ;
      return r2;
    }
    function L(n2, t3) {
      for (var r2 = n2.length; r2-- && y(t3, n2[r2], 0) > -1; ) ;
      return r2;
    }
    function C(n2, t3) {
      for (var r2 = n2.length, e2 = 0; r2--; ) n2[r2] === t3 && ++e2;
      return e2;
    }
    function U(n2) {
      return "\\" + Yr[n2];
    }
    function B(n2, t3) {
      return null == n2 ? X : n2[t3];
    }
    function T(n2) {
      return Nr.test(n2);
    }
    function $(n2) {
      return Pr.test(n2);
    }
    function D(n2) {
      for (var t3, r2 = []; !(t3 = n2.next()).done; ) r2.push(t3.value);
      return r2;
    }
    function M(n2) {
      var t3 = -1, r2 = Array(n2.size);
      return n2.forEach(function(n3, e2) {
        r2[++t3] = [e2, n3];
      }), r2;
    }
    function F(n2, t3) {
      return function(r2) {
        return n2(t3(r2));
      };
    }
    function N(n2, t3) {
      for (var r2 = -1, e2 = n2.length, u2 = 0, i2 = []; ++r2 < e2; ) {
        var o2 = n2[r2];
        o2 !== t3 && o2 !== cn || (n2[r2] = cn, i2[u2++] = r2);
      }
      return i2;
    }
    function P(n2) {
      var t3 = -1, r2 = Array(n2.size);
      return n2.forEach(function(n3) {
        r2[++t3] = n3;
      }), r2;
    }
    function q(n2) {
      var t3 = -1, r2 = Array(n2.size);
      return n2.forEach(function(n3) {
        r2[++t3] = [n3, n3];
      }), r2;
    }
    function Z(n2, t3, r2) {
      for (var e2 = r2 - 1, u2 = n2.length; ++e2 < u2; ) if (n2[e2] === t3) return e2;
      return -1;
    }
    function K(n2, t3, r2) {
      for (var e2 = r2 + 1; e2--; ) if (n2[e2] === t3) return e2;
      return e2;
    }
    function V(n2) {
      return T(n2) ? J(n2) : _e(n2);
    }
    function G(n2) {
      return T(n2) ? Y(n2) : p(n2);
    }
    function H(n2) {
      for (var t3 = n2.length; t3-- && Ct.test(n2.charAt(t3)); ) ;
      return t3;
    }
    function J(n2) {
      for (var t3 = Mr.lastIndex = 0; Mr.test(n2); ) ++t3;
      return t3;
    }
    function Y(n2) {
      return n2.match(Mr) || [];
    }
    function Q(n2) {
      return n2.match(Fr) || [];
    }
    var X, nn = "4.17.21", tn = 200, rn = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", en = "Expected a function", un = "Invalid `variable` option passed into `_.template`", on = "__lodash_hash_undefined__", fn = 500, cn = "__lodash_placeholder__", an = 1, ln = 2, sn = 4, hn = 1, pn = 2, _n = 1, vn = 2, gn = 4, yn = 8, dn = 16, bn = 32, wn = 64, mn = 128, xn = 256, jn = 512, An = 30, kn = "...", On = 800, In = 16, Rn = 1, zn = 2, En = 3, Sn = 1 / 0, Wn = 9007199254740991, Ln = 17976931348623157e292, Cn = NaN, Un = 4294967295, Bn = Un - 1, Tn = Un >>> 1, $n = [["ary", mn], ["bind", _n], ["bindKey", vn], ["curry", yn], ["curryRight", dn], ["flip", jn], ["partial", bn], ["partialRight", wn], ["rearg", xn]], Dn = "[object Arguments]", Mn = "[object Array]", Fn = "[object AsyncFunction]", Nn = "[object Boolean]", Pn = "[object Date]", qn = "[object DOMException]", Zn = "[object Error]", Kn = "[object Function]", Vn = "[object GeneratorFunction]", Gn = "[object Map]", Hn = "[object Number]", Jn = "[object Null]", Yn = "[object Object]", Qn = "[object Promise]", Xn = "[object Proxy]", nt = "[object RegExp]", tt = "[object Set]", rt = "[object String]", et = "[object Symbol]", ut = "[object Undefined]", it = "[object WeakMap]", ot = "[object WeakSet]", ft = "[object ArrayBuffer]", ct = "[object DataView]", at = "[object Float32Array]", lt2 = "[object Float64Array]", st = "[object Int8Array]", ht = "[object Int16Array]", pt = "[object Int32Array]", _t = "[object Uint8Array]", vt = "[object Uint8ClampedArray]", gt2 = "[object Uint16Array]", yt = "[object Uint32Array]", dt = /\b__p \+= '';/g, bt = /\b(__p \+=) '' \+/g, wt = /(__e\(.*?\)|\b__t\)) \+\n'';/g, mt = /&(?:amp|lt|gt|quot|#39);/g, xt = /[&<>"']/g, jt = RegExp(mt.source), At = RegExp(xt.source), kt = /<%-([\s\S]+?)%>/g, Ot = /<%([\s\S]+?)%>/g, It = /<%=([\s\S]+?)%>/g, Rt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, Et = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, St = /[\\^$.*+?()[\]{}|]/g, Wt = RegExp(St.source), Lt = /^\s+/, Ct = /\s/, Ut = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Bt = /\{\n\/\* \[wrapped with (.+)\] \*/, Tt = /,? & /, $t = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Dt = /[()=,{}\[\]\/\s]/, Mt = /\\(\\)?/g, Ft = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Nt = /\w*$/, Pt = /^[-+]0x[0-9a-f]+$/i, qt = /^0b[01]+$/i, Zt = /^\[object .+?Constructor\]$/, Kt = /^0o[0-7]+$/i, Vt = /^(?:0|[1-9]\d*)$/, Gt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ht = /($^)/, Jt = /['\n\r\u2028\u2029\\]/g, Yt = "\\ud800-\\udfff", Qt = "\\u0300-\\u036f", Xt = "\\ufe20-\\ufe2f", nr = "\\u20d0-\\u20ff", tr = Qt + Xt + nr, rr = "\\u2700-\\u27bf", er = "a-z\\xdf-\\xf6\\xf8-\\xff", ur = "\\xac\\xb1\\xd7\\xf7", ir = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", or = "\\u2000-\\u206f", fr = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", cr = "A-Z\\xc0-\\xd6\\xd8-\\xde", ar = "\\ufe0e\\ufe0f", lr = ur + ir + or + fr, sr = "['’]", hr = "[" + Yt + "]", pr = "[" + lr + "]", _r = "[" + tr + "]", vr = "\\d+", gr = "[" + rr + "]", yr = "[" + er + "]", dr = "[^" + Yt + lr + vr + rr + er + cr + "]", br = "\\ud83c[\\udffb-\\udfff]", wr = "(?:" + _r + "|" + br + ")", mr = "[^" + Yt + "]", xr = "(?:\\ud83c[\\udde6-\\uddff]){2}", jr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ar = "[" + cr + "]", kr = "\\u200d", Or = "(?:" + yr + "|" + dr + ")", Ir = "(?:" + Ar + "|" + dr + ")", Rr = "(?:" + sr + "(?:d|ll|m|re|s|t|ve))?", zr = "(?:" + sr + "(?:D|LL|M|RE|S|T|VE))?", Er = wr + "?", Sr = "[" + ar + "]?", Wr = "(?:" + kr + "(?:" + [mr, xr, jr].join("|") + ")" + Sr + Er + ")*", Lr = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Cr = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Ur = Sr + Er + Wr, Br = "(?:" + [gr, xr, jr].join("|") + ")" + Ur, Tr = "(?:" + [mr + _r + "?", _r, xr, jr, hr].join("|") + ")", $r = RegExp(sr, "g"), Dr = RegExp(_r, "g"), Mr = RegExp(br + "(?=" + br + ")|" + Tr + Ur, "g"), Fr = RegExp([Ar + "?" + yr + "+" + Rr + "(?=" + [pr, Ar, "$"].join("|") + ")", Ir + "+" + zr + "(?=" + [pr, Ar + Or, "$"].join("|") + ")", Ar + "?" + Or + "+" + Rr, Ar + "+" + zr, Cr, Lr, vr, Br].join("|"), "g"), Nr = RegExp("[" + kr + Yt + tr + ar + "]"), Pr = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, qr = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Zr = -1, Kr = {};
    Kr[at] = Kr[lt2] = Kr[st] = Kr[ht] = Kr[pt] = Kr[_t] = Kr[vt] = Kr[gt2] = Kr[yt] = true, Kr[Dn] = Kr[Mn] = Kr[ft] = Kr[Nn] = Kr[ct] = Kr[Pn] = Kr[Zn] = Kr[Kn] = Kr[Gn] = Kr[Hn] = Kr[Yn] = Kr[nt] = Kr[tt] = Kr[rt] = Kr[it] = false;
    var Vr = {};
    Vr[Dn] = Vr[Mn] = Vr[ft] = Vr[ct] = Vr[Nn] = Vr[Pn] = Vr[at] = Vr[lt2] = Vr[st] = Vr[ht] = Vr[pt] = Vr[Gn] = Vr[Hn] = Vr[Yn] = Vr[nt] = Vr[tt] = Vr[rt] = Vr[et] = Vr[_t] = Vr[vt] = Vr[gt2] = Vr[yt] = true, Vr[Zn] = Vr[Kn] = Vr[it] = false;
    var Gr = {
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "A",
      "Å": "A",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "a",
      "å": "a",
      "Ç": "C",
      "ç": "c",
      "Ð": "D",
      "ð": "d",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "Ñ": "N",
      "ñ": "n",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "O",
      "Ø": "O",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "o",
      "ø": "o",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "U",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "u",
      "Ý": "Y",
      "ý": "y",
      "ÿ": "y",
      "Æ": "Ae",
      "æ": "ae",
      "Þ": "Th",
      "þ": "th",
      "ß": "ss",
      "Ā": "A",
      "Ă": "A",
      "Ą": "A",
      "ā": "a",
      "ă": "a",
      "ą": "a",
      "Ć": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Č": "C",
      "ć": "c",
      "ĉ": "c",
      "ċ": "c",
      "č": "c",
      "Ď": "D",
      "Đ": "D",
      "ď": "d",
      "đ": "d",
      "Ē": "E",
      "Ĕ": "E",
      "Ė": "E",
      "Ę": "E",
      "Ě": "E",
      "ē": "e",
      "ĕ": "e",
      "ė": "e",
      "ę": "e",
      "ě": "e",
      "Ĝ": "G",
      "Ğ": "G",
      "Ġ": "G",
      "Ģ": "G",
      "ĝ": "g",
      "ğ": "g",
      "ġ": "g",
      "ģ": "g",
      "Ĥ": "H",
      "Ħ": "H",
      "ĥ": "h",
      "ħ": "h",
      "Ĩ": "I",
      "Ī": "I",
      "Ĭ": "I",
      "Į": "I",
      "İ": "I",
      "ĩ": "i",
      "ī": "i",
      "ĭ": "i",
      "į": "i",
      "ı": "i",
      "Ĵ": "J",
      "ĵ": "j",
      "Ķ": "K",
      "ķ": "k",
      "ĸ": "k",
      "Ĺ": "L",
      "Ļ": "L",
      "Ľ": "L",
      "Ŀ": "L",
      "Ł": "L",
      "ĺ": "l",
      "ļ": "l",
      "ľ": "l",
      "ŀ": "l",
      "ł": "l",
      "Ń": "N",
      "Ņ": "N",
      "Ň": "N",
      "Ŋ": "N",
      "ń": "n",
      "ņ": "n",
      "ň": "n",
      "ŋ": "n",
      "Ō": "O",
      "Ŏ": "O",
      "Ő": "O",
      "ō": "o",
      "ŏ": "o",
      "ő": "o",
      "Ŕ": "R",
      "Ŗ": "R",
      "Ř": "R",
      "ŕ": "r",
      "ŗ": "r",
      "ř": "r",
      "Ś": "S",
      "Ŝ": "S",
      "Ş": "S",
      "Š": "S",
      "ś": "s",
      "ŝ": "s",
      "ş": "s",
      "š": "s",
      "Ţ": "T",
      "Ť": "T",
      "Ŧ": "T",
      "ţ": "t",
      "ť": "t",
      "ŧ": "t",
      "Ũ": "U",
      "Ū": "U",
      "Ŭ": "U",
      "Ů": "U",
      "Ű": "U",
      "Ų": "U",
      "ũ": "u",
      "ū": "u",
      "ŭ": "u",
      "ů": "u",
      "ű": "u",
      "ų": "u",
      "Ŵ": "W",
      "ŵ": "w",
      "Ŷ": "Y",
      "ŷ": "y",
      "Ÿ": "Y",
      "Ź": "Z",
      "Ż": "Z",
      "Ž": "Z",
      "ź": "z",
      "ż": "z",
      "ž": "z",
      "Ĳ": "IJ",
      "ĳ": "ij",
      "Œ": "Oe",
      "œ": "oe",
      "ŉ": "'n",
      "ſ": "s"
    }, Hr = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Jr = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Yr = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, Qr = parseFloat, Xr = parseInt, ne = "object" == typeof commonjsGlobal && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, te = "object" == typeof self && self && self.Object === Object && self, re2 = ne || te || Function("return this")(), ee = exports && !exports.nodeType && exports, ue = ee && true && module && !module.nodeType && module, ie = ue && ue.exports === ee, oe = ie && ne.process, fe = function() {
      try {
        var n2 = ue && ue.require && ue.require("util").types;
        return n2 ? n2 : oe && oe.binding && oe.binding("util");
      } catch (n3) {
      }
    }(), ce = fe && fe.isArrayBuffer, ae = fe && fe.isDate, le = fe && fe.isMap, se = fe && fe.isRegExp, he = fe && fe.isSet, pe = fe && fe.isTypedArray, _e = m("length"), ve = x(Gr), ge = x(Hr), ye = x(Jr), de = function p2(x2) {
      function Z2(n2) {
        if (cc(n2) && !bh(n2) && !(n2 instanceof Ct2)) {
          if (n2 instanceof Y2) return n2;
          if (bl.call(n2, "__wrapped__")) return eo(n2);
        }
        return new Y2(n2);
      }
      function J2() {
      }
      function Y2(n2, t3) {
        this.__wrapped__ = n2, this.__actions__ = [], this.__chain__ = !!t3, this.__index__ = 0, this.__values__ = X;
      }
      function Ct2(n2) {
        this.__wrapped__ = n2, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Un, this.__views__ = [];
      }
      function $t2() {
        var n2 = new Ct2(this.__wrapped__);
        return n2.__actions__ = Tu(this.__actions__), n2.__dir__ = this.__dir__, n2.__filtered__ = this.__filtered__, n2.__iteratees__ = Tu(this.__iteratees__), n2.__takeCount__ = this.__takeCount__, n2.__views__ = Tu(this.__views__), n2;
      }
      function Yt2() {
        if (this.__filtered__) {
          var n2 = new Ct2(this);
          n2.__dir__ = -1, n2.__filtered__ = true;
        } else n2 = this.clone(), n2.__dir__ *= -1;
        return n2;
      }
      function Qt2() {
        var n2 = this.__wrapped__.value(), t3 = this.__dir__, r2 = bh(n2), e2 = t3 < 0, u2 = r2 ? n2.length : 0, i2 = Oi(0, u2, this.__views__), o2 = i2.start, f2 = i2.end, c2 = f2 - o2, a2 = e2 ? f2 : o2 - 1, l2 = this.__iteratees__, s2 = l2.length, h2 = 0, p3 = Hl(c2, this.__takeCount__);
        if (!r2 || !e2 && u2 == c2 && p3 == c2) return wu(n2, this.__actions__);
        var _3 = [];
        n: for (; c2-- && h2 < p3; ) {
          a2 += t3;
          for (var v2 = -1, g2 = n2[a2]; ++v2 < s2; ) {
            var y2 = l2[v2], d2 = y2.iteratee, b2 = y2.type, w2 = d2(g2);
            if (b2 == zn) g2 = w2;
            else if (!w2) {
              if (b2 == Rn) continue n;
              break n;
            }
          }
          _3[h2++] = g2;
        }
        return _3;
      }
      function Xt2(n2) {
        var t3 = -1, r2 = null == n2 ? 0 : n2.length;
        for (this.clear(); ++t3 < r2; ) {
          var e2 = n2[t3];
          this.set(e2[0], e2[1]);
        }
      }
      function nr2() {
        this.__data__ = is ? is(null) : {}, this.size = 0;
      }
      function tr2(n2) {
        var t3 = this.has(n2) && delete this.__data__[n2];
        return this.size -= t3 ? 1 : 0, t3;
      }
      function rr2(n2) {
        var t3 = this.__data__;
        if (is) {
          var r2 = t3[n2];
          return r2 === on ? X : r2;
        }
        return bl.call(t3, n2) ? t3[n2] : X;
      }
      function er2(n2) {
        var t3 = this.__data__;
        return is ? t3[n2] !== X : bl.call(t3, n2);
      }
      function ur2(n2, t3) {
        var r2 = this.__data__;
        return this.size += this.has(n2) ? 0 : 1, r2[n2] = is && t3 === X ? on : t3, this;
      }
      function ir2(n2) {
        var t3 = -1, r2 = null == n2 ? 0 : n2.length;
        for (this.clear(); ++t3 < r2; ) {
          var e2 = n2[t3];
          this.set(e2[0], e2[1]);
        }
      }
      function or2() {
        this.__data__ = [], this.size = 0;
      }
      function fr2(n2) {
        var t3 = this.__data__, r2 = Wr2(t3, n2);
        return !(r2 < 0) && (r2 == t3.length - 1 ? t3.pop() : Ll.call(t3, r2, 1), --this.size, true);
      }
      function cr2(n2) {
        var t3 = this.__data__, r2 = Wr2(t3, n2);
        return r2 < 0 ? X : t3[r2][1];
      }
      function ar2(n2) {
        return Wr2(this.__data__, n2) > -1;
      }
      function lr2(n2, t3) {
        var r2 = this.__data__, e2 = Wr2(r2, n2);
        return e2 < 0 ? (++this.size, r2.push([n2, t3])) : r2[e2][1] = t3, this;
      }
      function sr2(n2) {
        var t3 = -1, r2 = null == n2 ? 0 : n2.length;
        for (this.clear(); ++t3 < r2; ) {
          var e2 = n2[t3];
          this.set(e2[0], e2[1]);
        }
      }
      function hr2() {
        this.size = 0, this.__data__ = { hash: new Xt2(), map: new (ts || ir2)(), string: new Xt2() };
      }
      function pr2(n2) {
        var t3 = xi(this, n2).delete(n2);
        return this.size -= t3 ? 1 : 0, t3;
      }
      function _r2(n2) {
        return xi(this, n2).get(n2);
      }
      function vr2(n2) {
        return xi(this, n2).has(n2);
      }
      function gr2(n2, t3) {
        var r2 = xi(this, n2), e2 = r2.size;
        return r2.set(n2, t3), this.size += r2.size == e2 ? 0 : 1, this;
      }
      function yr2(n2) {
        var t3 = -1, r2 = null == n2 ? 0 : n2.length;
        for (this.__data__ = new sr2(); ++t3 < r2; ) this.add(n2[t3]);
      }
      function dr2(n2) {
        return this.__data__.set(n2, on), this;
      }
      function br2(n2) {
        return this.__data__.has(n2);
      }
      function wr2(n2) {
        this.size = (this.__data__ = new ir2(n2)).size;
      }
      function mr2() {
        this.__data__ = new ir2(), this.size = 0;
      }
      function xr2(n2) {
        var t3 = this.__data__, r2 = t3.delete(n2);
        return this.size = t3.size, r2;
      }
      function jr2(n2) {
        return this.__data__.get(n2);
      }
      function Ar2(n2) {
        return this.__data__.has(n2);
      }
      function kr2(n2, t3) {
        var r2 = this.__data__;
        if (r2 instanceof ir2) {
          var e2 = r2.__data__;
          if (!ts || e2.length < tn - 1) return e2.push([n2, t3]), this.size = ++r2.size, this;
          r2 = this.__data__ = new sr2(e2);
        }
        return r2.set(n2, t3), this.size = r2.size, this;
      }
      function Or2(n2, t3) {
        var r2 = bh(n2), e2 = !r2 && dh(n2), u2 = !r2 && !e2 && mh(n2), i2 = !r2 && !e2 && !u2 && Oh(n2), o2 = r2 || e2 || u2 || i2, f2 = o2 ? O(n2.length, hl) : [], c2 = f2.length;
        for (var a2 in n2) !t3 && !bl.call(n2, a2) || o2 && ("length" == a2 || u2 && ("offset" == a2 || "parent" == a2) || i2 && ("buffer" == a2 || "byteLength" == a2 || "byteOffset" == a2) || Ci(a2, c2)) || f2.push(a2);
        return f2;
      }
      function Ir2(n2) {
        var t3 = n2.length;
        return t3 ? n2[tu(0, t3 - 1)] : X;
      }
      function Rr2(n2, t3) {
        return Xi(Tu(n2), Mr2(t3, 0, n2.length));
      }
      function zr2(n2) {
        return Xi(Tu(n2));
      }
      function Er2(n2, t3, r2) {
        (r2 === X || Gf(n2[t3], r2)) && (r2 !== X || t3 in n2) || Br2(n2, t3, r2);
      }
      function Sr2(n2, t3, r2) {
        var e2 = n2[t3];
        bl.call(n2, t3) && Gf(e2, r2) && (r2 !== X || t3 in n2) || Br2(n2, t3, r2);
      }
      function Wr2(n2, t3) {
        for (var r2 = n2.length; r2--; ) if (Gf(n2[r2][0], t3)) return r2;
        return -1;
      }
      function Lr2(n2, t3, r2, e2) {
        return ys(n2, function(n3, u2, i2) {
          t3(e2, n3, r2(n3), i2);
        }), e2;
      }
      function Cr2(n2, t3) {
        return n2 && $u(t3, Pc(t3), n2);
      }
      function Ur2(n2, t3) {
        return n2 && $u(t3, qc(t3), n2);
      }
      function Br2(n2, t3, r2) {
        "__proto__" == t3 && Tl ? Tl(n2, t3, { configurable: true, enumerable: true, value: r2, writable: true }) : n2[t3] = r2;
      }
      function Tr2(n2, t3) {
        for (var r2 = -1, e2 = t3.length, u2 = il(e2), i2 = null == n2; ++r2 < e2; ) u2[r2] = i2 ? X : Mc(n2, t3[r2]);
        return u2;
      }
      function Mr2(n2, t3, r2) {
        return n2 === n2 && (r2 !== X && (n2 = n2 <= r2 ? n2 : r2), t3 !== X && (n2 = n2 >= t3 ? n2 : t3)), n2;
      }
      function Fr2(n2, t3, e2, u2, i2, o2) {
        var f2, c2 = t3 & an, a2 = t3 & ln, l2 = t3 & sn;
        if (e2 && (f2 = i2 ? e2(n2, u2, i2, o2) : e2(n2)), f2 !== X) return f2;
        if (!fc(n2)) return n2;
        var s2 = bh(n2);
        if (s2) {
          if (f2 = zi(n2), !c2) return Tu(n2, f2);
        } else {
          var h2 = zs(n2), p3 = h2 == Kn || h2 == Vn;
          if (mh(n2)) return Iu(n2, c2);
          if (h2 == Yn || h2 == Dn || p3 && !i2) {
            if (f2 = a2 || p3 ? {} : Ei(n2), !c2) return a2 ? Mu(n2, Ur2(f2, n2)) : Du(n2, Cr2(f2, n2));
          } else {
            if (!Vr[h2]) return i2 ? n2 : {};
            f2 = Si(n2, h2, c2);
          }
        }
        o2 || (o2 = new wr2());
        var _3 = o2.get(n2);
        if (_3) return _3;
        o2.set(n2, f2), kh(n2) ? n2.forEach(function(r2) {
          f2.add(Fr2(r2, t3, e2, r2, n2, o2));
        }) : jh(n2) && n2.forEach(function(r2, u3) {
          f2.set(u3, Fr2(r2, t3, e2, u3, n2, o2));
        });
        var v2 = l2 ? a2 ? di : yi : a2 ? qc : Pc, g2 = s2 ? X : v2(n2);
        return r(g2 || n2, function(r2, u3) {
          g2 && (u3 = r2, r2 = n2[u3]), Sr2(f2, u3, Fr2(r2, t3, e2, u3, n2, o2));
        }), f2;
      }
      function Nr2(n2) {
        var t3 = Pc(n2);
        return function(r2) {
          return Pr2(r2, n2, t3);
        };
      }
      function Pr2(n2, t3, r2) {
        var e2 = r2.length;
        if (null == n2) return !e2;
        for (n2 = ll(n2); e2--; ) {
          var u2 = r2[e2], i2 = t3[u2], o2 = n2[u2];
          if (o2 === X && !(u2 in n2) || !i2(o2)) return false;
        }
        return true;
      }
      function Gr2(n2, t3, r2) {
        if ("function" != typeof n2) throw new pl(en);
        return Ws(function() {
          n2.apply(X, r2);
        }, t3);
      }
      function Hr2(n2, t3, r2, e2) {
        var u2 = -1, i2 = o, a2 = true, l2 = n2.length, s2 = [], h2 = t3.length;
        if (!l2) return s2;
        r2 && (t3 = c(t3, z(r2))), e2 ? (i2 = f, a2 = false) : t3.length >= tn && (i2 = S, a2 = false, t3 = new yr2(t3));
        n: for (; ++u2 < l2; ) {
          var p3 = n2[u2], _3 = null == r2 ? p3 : r2(p3);
          if (p3 = e2 || 0 !== p3 ? p3 : 0, a2 && _3 === _3) {
            for (var v2 = h2; v2--; ) if (t3[v2] === _3) continue n;
            s2.push(p3);
          } else i2(t3, _3, e2) || s2.push(p3);
        }
        return s2;
      }
      function Jr2(n2, t3) {
        var r2 = true;
        return ys(n2, function(n3, e2, u2) {
          return r2 = !!t3(n3, e2, u2);
        }), r2;
      }
      function Yr2(n2, t3, r2) {
        for (var e2 = -1, u2 = n2.length; ++e2 < u2; ) {
          var i2 = n2[e2], o2 = t3(i2);
          if (null != o2 && (f2 === X ? o2 === o2 && !bc(o2) : r2(o2, f2))) var f2 = o2, c2 = i2;
        }
        return c2;
      }
      function ne2(n2, t3, r2, e2) {
        var u2 = n2.length;
        for (r2 = kc(r2), r2 < 0 && (r2 = -r2 > u2 ? 0 : u2 + r2), e2 = e2 === X || e2 > u2 ? u2 : kc(e2), e2 < 0 && (e2 += u2), e2 = r2 > e2 ? 0 : Oc(e2); r2 < e2; ) n2[r2++] = t3;
        return n2;
      }
      function te2(n2, t3) {
        var r2 = [];
        return ys(n2, function(n3, e2, u2) {
          t3(n3, e2, u2) && r2.push(n3);
        }), r2;
      }
      function ee2(n2, t3, r2, e2, u2) {
        var i2 = -1, o2 = n2.length;
        for (r2 || (r2 = Li), u2 || (u2 = []); ++i2 < o2; ) {
          var f2 = n2[i2];
          t3 > 0 && r2(f2) ? t3 > 1 ? ee2(f2, t3 - 1, r2, e2, u2) : a(u2, f2) : e2 || (u2[u2.length] = f2);
        }
        return u2;
      }
      function ue2(n2, t3) {
        return n2 && bs(n2, t3, Pc);
      }
      function oe2(n2, t3) {
        return n2 && ws(n2, t3, Pc);
      }
      function fe2(n2, t3) {
        return i(t3, function(t4) {
          return uc(n2[t4]);
        });
      }
      function _e2(n2, t3) {
        t3 = ku(t3, n2);
        for (var r2 = 0, e2 = t3.length; null != n2 && r2 < e2; ) n2 = n2[no(t3[r2++])];
        return r2 && r2 == e2 ? n2 : X;
      }
      function de2(n2, t3, r2) {
        var e2 = t3(n2);
        return bh(n2) ? e2 : a(e2, r2(n2));
      }
      function we(n2) {
        return null == n2 ? n2 === X ? ut : Jn : Bl && Bl in ll(n2) ? ki(n2) : Ki(n2);
      }
      function me(n2, t3) {
        return n2 > t3;
      }
      function xe(n2, t3) {
        return null != n2 && bl.call(n2, t3);
      }
      function je(n2, t3) {
        return null != n2 && t3 in ll(n2);
      }
      function Ae(n2, t3, r2) {
        return n2 >= Hl(t3, r2) && n2 < Gl(t3, r2);
      }
      function ke(n2, t3, r2) {
        for (var e2 = r2 ? f : o, u2 = n2[0].length, i2 = n2.length, a2 = i2, l2 = il(i2), s2 = 1 / 0, h2 = []; a2--; ) {
          var p3 = n2[a2];
          a2 && t3 && (p3 = c(p3, z(t3))), s2 = Hl(p3.length, s2), l2[a2] = !r2 && (t3 || u2 >= 120 && p3.length >= 120) ? new yr2(a2 && p3) : X;
        }
        p3 = n2[0];
        var _3 = -1, v2 = l2[0];
        n: for (; ++_3 < u2 && h2.length < s2; ) {
          var g2 = p3[_3], y2 = t3 ? t3(g2) : g2;
          if (g2 = r2 || 0 !== g2 ? g2 : 0, !(v2 ? S(v2, y2) : e2(h2, y2, r2))) {
            for (a2 = i2; --a2; ) {
              var d2 = l2[a2];
              if (!(d2 ? S(d2, y2) : e2(n2[a2], y2, r2))) continue n;
            }
            v2 && v2.push(y2), h2.push(g2);
          }
        }
        return h2;
      }
      function Oe(n2, t3, r2, e2) {
        return ue2(n2, function(n3, u2, i2) {
          t3(e2, r2(n3), u2, i2);
        }), e2;
      }
      function Ie(t3, r2, e2) {
        r2 = ku(r2, t3), t3 = Gi(t3, r2);
        var u2 = null == t3 ? t3 : t3[no(jo(r2))];
        return null == u2 ? X : n(u2, t3, e2);
      }
      function Re(n2) {
        return cc(n2) && we(n2) == Dn;
      }
      function ze(n2) {
        return cc(n2) && we(n2) == ft;
      }
      function Ee(n2) {
        return cc(n2) && we(n2) == Pn;
      }
      function Se(n2, t3, r2, e2, u2) {
        return n2 === t3 || (null == n2 || null == t3 || !cc(n2) && !cc(t3) ? n2 !== n2 && t3 !== t3 : We(n2, t3, r2, e2, Se, u2));
      }
      function We(n2, t3, r2, e2, u2, i2) {
        var o2 = bh(n2), f2 = bh(t3), c2 = o2 ? Mn : zs(n2), a2 = f2 ? Mn : zs(t3);
        c2 = c2 == Dn ? Yn : c2, a2 = a2 == Dn ? Yn : a2;
        var l2 = c2 == Yn, s2 = a2 == Yn, h2 = c2 == a2;
        if (h2 && mh(n2)) {
          if (!mh(t3)) return false;
          o2 = true, l2 = false;
        }
        if (h2 && !l2) return i2 || (i2 = new wr2()), o2 || Oh(n2) ? pi(n2, t3, r2, e2, u2, i2) : _i(n2, t3, c2, r2, e2, u2, i2);
        if (!(r2 & hn)) {
          var p3 = l2 && bl.call(n2, "__wrapped__"), _3 = s2 && bl.call(t3, "__wrapped__");
          if (p3 || _3) {
            var v2 = p3 ? n2.value() : n2, g2 = _3 ? t3.value() : t3;
            return i2 || (i2 = new wr2()), u2(v2, g2, r2, e2, i2);
          }
        }
        return !!h2 && (i2 || (i2 = new wr2()), vi(n2, t3, r2, e2, u2, i2));
      }
      function Le(n2) {
        return cc(n2) && zs(n2) == Gn;
      }
      function Ce(n2, t3, r2, e2) {
        var u2 = r2.length, i2 = u2, o2 = !e2;
        if (null == n2) return !i2;
        for (n2 = ll(n2); u2--; ) {
          var f2 = r2[u2];
          if (o2 && f2[2] ? f2[1] !== n2[f2[0]] : !(f2[0] in n2)) return false;
        }
        for (; ++u2 < i2; ) {
          f2 = r2[u2];
          var c2 = f2[0], a2 = n2[c2], l2 = f2[1];
          if (o2 && f2[2]) {
            if (a2 === X && !(c2 in n2)) return false;
          } else {
            var s2 = new wr2();
            if (e2) var h2 = e2(a2, l2, c2, n2, t3, s2);
            if (!(h2 === X ? Se(l2, a2, hn | pn, e2, s2) : h2)) return false;
          }
        }
        return true;
      }
      function Ue(n2) {
        return !(!fc(n2) || Di(n2)) && (uc(n2) ? kl : Zt).test(to(n2));
      }
      function Be(n2) {
        return cc(n2) && we(n2) == nt;
      }
      function Te(n2) {
        return cc(n2) && zs(n2) == tt;
      }
      function $e(n2) {
        return cc(n2) && oc(n2.length) && !!Kr[we(n2)];
      }
      function De(n2) {
        return "function" == typeof n2 ? n2 : null == n2 ? La : "object" == typeof n2 ? bh(n2) ? Ze(n2[0], n2[1]) : qe(n2) : Fa(n2);
      }
      function Me(n2) {
        if (!Mi(n2)) return Vl(n2);
        var t3 = [];
        for (var r2 in ll(n2)) bl.call(n2, r2) && "constructor" != r2 && t3.push(r2);
        return t3;
      }
      function Fe(n2) {
        if (!fc(n2)) return Zi(n2);
        var t3 = Mi(n2), r2 = [];
        for (var e2 in n2) ("constructor" != e2 || !t3 && bl.call(n2, e2)) && r2.push(e2);
        return r2;
      }
      function Ne(n2, t3) {
        return n2 < t3;
      }
      function Pe(n2, t3) {
        var r2 = -1, e2 = Hf(n2) ? il(n2.length) : [];
        return ys(n2, function(n3, u2, i2) {
          e2[++r2] = t3(n3, u2, i2);
        }), e2;
      }
      function qe(n2) {
        var t3 = ji(n2);
        return 1 == t3.length && t3[0][2] ? Ni(t3[0][0], t3[0][1]) : function(r2) {
          return r2 === n2 || Ce(r2, n2, t3);
        };
      }
      function Ze(n2, t3) {
        return Bi(n2) && Fi(t3) ? Ni(no(n2), t3) : function(r2) {
          var e2 = Mc(r2, n2);
          return e2 === X && e2 === t3 ? Nc(r2, n2) : Se(t3, e2, hn | pn);
        };
      }
      function Ke(n2, t3, r2, e2, u2) {
        n2 !== t3 && bs(t3, function(i2, o2) {
          if (u2 || (u2 = new wr2()), fc(i2)) Ve(n2, t3, o2, r2, Ke, e2, u2);
          else {
            var f2 = e2 ? e2(Ji(n2, o2), i2, o2 + "", n2, t3, u2) : X;
            f2 === X && (f2 = i2), Er2(n2, o2, f2);
          }
        }, qc);
      }
      function Ve(n2, t3, r2, e2, u2, i2, o2) {
        var f2 = Ji(n2, r2), c2 = Ji(t3, r2), a2 = o2.get(c2);
        if (a2) return Er2(n2, r2, a2), X;
        var l2 = i2 ? i2(f2, c2, r2 + "", n2, t3, o2) : X, s2 = l2 === X;
        if (s2) {
          var h2 = bh(c2), p3 = !h2 && mh(c2), _3 = !h2 && !p3 && Oh(c2);
          l2 = c2, h2 || p3 || _3 ? bh(f2) ? l2 = f2 : Jf(f2) ? l2 = Tu(f2) : p3 ? (s2 = false, l2 = Iu(c2, true)) : _3 ? (s2 = false, l2 = Wu(c2, true)) : l2 = [] : gc(c2) || dh(c2) ? (l2 = f2, dh(f2) ? l2 = Rc(f2) : fc(f2) && !uc(f2) || (l2 = Ei(c2))) : s2 = false;
        }
        s2 && (o2.set(c2, l2), u2(l2, c2, e2, i2, o2), o2.delete(c2)), Er2(n2, r2, l2);
      }
      function Ge(n2, t3) {
        var r2 = n2.length;
        if (r2) return t3 += t3 < 0 ? r2 : 0, Ci(t3, r2) ? n2[t3] : X;
      }
      function He(n2, t3, r2) {
        t3 = t3.length ? c(t3, function(n3) {
          return bh(n3) ? function(t4) {
            return _e2(t4, 1 === n3.length ? n3[0] : n3);
          } : n3;
        }) : [La];
        var e2 = -1;
        return t3 = c(t3, z(mi())), A(Pe(n2, function(n3, r3, u2) {
          return { criteria: c(t3, function(t4) {
            return t4(n3);
          }), index: ++e2, value: n3 };
        }), function(n3, t4) {
          return Cu(n3, t4, r2);
        });
      }
      function Je(n2, t3) {
        return Ye(n2, t3, function(t4, r2) {
          return Nc(n2, r2);
        });
      }
      function Ye(n2, t3, r2) {
        for (var e2 = -1, u2 = t3.length, i2 = {}; ++e2 < u2; ) {
          var o2 = t3[e2], f2 = _e2(n2, o2);
          r2(f2, o2) && fu(i2, ku(o2, n2), f2);
        }
        return i2;
      }
      function Qe(n2) {
        return function(t3) {
          return _e2(t3, n2);
        };
      }
      function Xe(n2, t3, r2, e2) {
        var u2 = e2 ? d : y, i2 = -1, o2 = t3.length, f2 = n2;
        for (n2 === t3 && (t3 = Tu(t3)), r2 && (f2 = c(n2, z(r2))); ++i2 < o2; ) for (var a2 = 0, l2 = t3[i2], s2 = r2 ? r2(l2) : l2; (a2 = u2(f2, s2, a2, e2)) > -1; ) f2 !== n2 && Ll.call(f2, a2, 1), Ll.call(n2, a2, 1);
        return n2;
      }
      function nu(n2, t3) {
        for (var r2 = n2 ? t3.length : 0, e2 = r2 - 1; r2--; ) {
          var u2 = t3[r2];
          if (r2 == e2 || u2 !== i2) {
            var i2 = u2;
            Ci(u2) ? Ll.call(n2, u2, 1) : yu(n2, u2);
          }
        }
        return n2;
      }
      function tu(n2, t3) {
        return n2 + Nl(Ql() * (t3 - n2 + 1));
      }
      function ru(n2, t3, r2, e2) {
        for (var u2 = -1, i2 = Gl(Fl((t3 - n2) / (r2 || 1)), 0), o2 = il(i2); i2--; ) o2[e2 ? i2 : ++u2] = n2, n2 += r2;
        return o2;
      }
      function eu(n2, t3) {
        var r2 = "";
        if (!n2 || t3 < 1 || t3 > Wn) return r2;
        do
          t3 % 2 && (r2 += n2), t3 = Nl(t3 / 2), t3 && (n2 += n2);
        while (t3);
        return r2;
      }
      function uu(n2, t3) {
        return Ls(Vi(n2, t3, La), n2 + "");
      }
      function iu(n2) {
        return Ir2(ra(n2));
      }
      function ou(n2, t3) {
        var r2 = ra(n2);
        return Xi(r2, Mr2(t3, 0, r2.length));
      }
      function fu(n2, t3, r2, e2) {
        if (!fc(n2)) return n2;
        t3 = ku(t3, n2);
        for (var u2 = -1, i2 = t3.length, o2 = i2 - 1, f2 = n2; null != f2 && ++u2 < i2; ) {
          var c2 = no(t3[u2]), a2 = r2;
          if ("__proto__" === c2 || "constructor" === c2 || "prototype" === c2) return n2;
          if (u2 != o2) {
            var l2 = f2[c2];
            a2 = e2 ? e2(l2, c2, f2) : X, a2 === X && (a2 = fc(l2) ? l2 : Ci(t3[u2 + 1]) ? [] : {});
          }
          Sr2(f2, c2, a2), f2 = f2[c2];
        }
        return n2;
      }
      function cu(n2) {
        return Xi(ra(n2));
      }
      function au(n2, t3, r2) {
        var e2 = -1, u2 = n2.length;
        t3 < 0 && (t3 = -t3 > u2 ? 0 : u2 + t3), r2 = r2 > u2 ? u2 : r2, r2 < 0 && (r2 += u2), u2 = t3 > r2 ? 0 : r2 - t3 >>> 0, t3 >>>= 0;
        for (var i2 = il(u2); ++e2 < u2; ) i2[e2] = n2[e2 + t3];
        return i2;
      }
      function lu(n2, t3) {
        var r2;
        return ys(n2, function(n3, e2, u2) {
          return r2 = t3(n3, e2, u2), !r2;
        }), !!r2;
      }
      function su(n2, t3, r2) {
        var e2 = 0, u2 = null == n2 ? e2 : n2.length;
        if ("number" == typeof t3 && t3 === t3 && u2 <= Tn) {
          for (; e2 < u2; ) {
            var i2 = e2 + u2 >>> 1, o2 = n2[i2];
            null !== o2 && !bc(o2) && (r2 ? o2 <= t3 : o2 < t3) ? e2 = i2 + 1 : u2 = i2;
          }
          return u2;
        }
        return hu(n2, t3, La, r2);
      }
      function hu(n2, t3, r2, e2) {
        var u2 = 0, i2 = null == n2 ? 0 : n2.length;
        if (0 === i2) return 0;
        t3 = r2(t3);
        for (var o2 = t3 !== t3, f2 = null === t3, c2 = bc(t3), a2 = t3 === X; u2 < i2; ) {
          var l2 = Nl((u2 + i2) / 2), s2 = r2(n2[l2]), h2 = s2 !== X, p3 = null === s2, _3 = s2 === s2, v2 = bc(s2);
          if (o2) var g2 = e2 || _3;
          else g2 = a2 ? _3 && (e2 || h2) : f2 ? _3 && h2 && (e2 || !p3) : c2 ? _3 && h2 && !p3 && (e2 || !v2) : !p3 && !v2 && (e2 ? s2 <= t3 : s2 < t3);
          g2 ? u2 = l2 + 1 : i2 = l2;
        }
        return Hl(i2, Bn);
      }
      function pu(n2, t3) {
        for (var r2 = -1, e2 = n2.length, u2 = 0, i2 = []; ++r2 < e2; ) {
          var o2 = n2[r2], f2 = t3 ? t3(o2) : o2;
          if (!r2 || !Gf(f2, c2)) {
            var c2 = f2;
            i2[u2++] = 0 === o2 ? 0 : o2;
          }
        }
        return i2;
      }
      function _u(n2) {
        return "number" == typeof n2 ? n2 : bc(n2) ? Cn : +n2;
      }
      function vu(n2) {
        if ("string" == typeof n2) return n2;
        if (bh(n2)) return c(n2, vu) + "";
        if (bc(n2)) return vs ? vs.call(n2) : "";
        var t3 = n2 + "";
        return "0" == t3 && 1 / n2 == -Sn ? "-0" : t3;
      }
      function gu(n2, t3, r2) {
        var e2 = -1, u2 = o, i2 = n2.length, c2 = true, a2 = [], l2 = a2;
        if (r2) c2 = false, u2 = f;
        else if (i2 >= tn) {
          var s2 = t3 ? null : ks(n2);
          if (s2) return P(s2);
          c2 = false, u2 = S, l2 = new yr2();
        } else l2 = t3 ? [] : a2;
        n: for (; ++e2 < i2; ) {
          var h2 = n2[e2], p3 = t3 ? t3(h2) : h2;
          if (h2 = r2 || 0 !== h2 ? h2 : 0, c2 && p3 === p3) {
            for (var _3 = l2.length; _3--; ) if (l2[_3] === p3) continue n;
            t3 && l2.push(p3), a2.push(h2);
          } else u2(l2, p3, r2) || (l2 !== a2 && l2.push(p3), a2.push(h2));
        }
        return a2;
      }
      function yu(n2, t3) {
        return t3 = ku(t3, n2), n2 = Gi(n2, t3), null == n2 || delete n2[no(jo(t3))];
      }
      function du(n2, t3, r2, e2) {
        return fu(n2, t3, r2(_e2(n2, t3)), e2);
      }
      function bu(n2, t3, r2, e2) {
        for (var u2 = n2.length, i2 = e2 ? u2 : -1; (e2 ? i2-- : ++i2 < u2) && t3(n2[i2], i2, n2); ) ;
        return r2 ? au(n2, e2 ? 0 : i2, e2 ? i2 + 1 : u2) : au(n2, e2 ? i2 + 1 : 0, e2 ? u2 : i2);
      }
      function wu(n2, t3) {
        var r2 = n2;
        return r2 instanceof Ct2 && (r2 = r2.value()), l(t3, function(n3, t4) {
          return t4.func.apply(t4.thisArg, a([n3], t4.args));
        }, r2);
      }
      function mu(n2, t3, r2) {
        var e2 = n2.length;
        if (e2 < 2) return e2 ? gu(n2[0]) : [];
        for (var u2 = -1, i2 = il(e2); ++u2 < e2; ) for (var o2 = n2[u2], f2 = -1; ++f2 < e2; ) f2 != u2 && (i2[u2] = Hr2(i2[u2] || o2, n2[f2], t3, r2));
        return gu(ee2(i2, 1), t3, r2);
      }
      function xu(n2, t3, r2) {
        for (var e2 = -1, u2 = n2.length, i2 = t3.length, o2 = {}; ++e2 < u2; ) {
          r2(o2, n2[e2], e2 < i2 ? t3[e2] : X);
        }
        return o2;
      }
      function ju(n2) {
        return Jf(n2) ? n2 : [];
      }
      function Au(n2) {
        return "function" == typeof n2 ? n2 : La;
      }
      function ku(n2, t3) {
        return bh(n2) ? n2 : Bi(n2, t3) ? [n2] : Cs(Ec(n2));
      }
      function Ou(n2, t3, r2) {
        var e2 = n2.length;
        return r2 = r2 === X ? e2 : r2, !t3 && r2 >= e2 ? n2 : au(n2, t3, r2);
      }
      function Iu(n2, t3) {
        if (t3) return n2.slice();
        var r2 = n2.length, e2 = zl ? zl(r2) : new n2.constructor(r2);
        return n2.copy(e2), e2;
      }
      function Ru(n2) {
        var t3 = new n2.constructor(n2.byteLength);
        return new Rl(t3).set(new Rl(n2)), t3;
      }
      function zu(n2, t3) {
        return new n2.constructor(t3 ? Ru(n2.buffer) : n2.buffer, n2.byteOffset, n2.byteLength);
      }
      function Eu(n2) {
        var t3 = new n2.constructor(n2.source, Nt.exec(n2));
        return t3.lastIndex = n2.lastIndex, t3;
      }
      function Su(n2) {
        return _s ? ll(_s.call(n2)) : {};
      }
      function Wu(n2, t3) {
        return new n2.constructor(t3 ? Ru(n2.buffer) : n2.buffer, n2.byteOffset, n2.length);
      }
      function Lu(n2, t3) {
        if (n2 !== t3) {
          var r2 = n2 !== X, e2 = null === n2, u2 = n2 === n2, i2 = bc(n2), o2 = t3 !== X, f2 = null === t3, c2 = t3 === t3, a2 = bc(t3);
          if (!f2 && !a2 && !i2 && n2 > t3 || i2 && o2 && c2 && !f2 && !a2 || e2 && o2 && c2 || !r2 && c2 || !u2) return 1;
          if (!e2 && !i2 && !a2 && n2 < t3 || a2 && r2 && u2 && !e2 && !i2 || f2 && r2 && u2 || !o2 && u2 || !c2) return -1;
        }
        return 0;
      }
      function Cu(n2, t3, r2) {
        for (var e2 = -1, u2 = n2.criteria, i2 = t3.criteria, o2 = u2.length, f2 = r2.length; ++e2 < o2; ) {
          var c2 = Lu(u2[e2], i2[e2]);
          if (c2) {
            if (e2 >= f2) return c2;
            return c2 * ("desc" == r2[e2] ? -1 : 1);
          }
        }
        return n2.index - t3.index;
      }
      function Uu(n2, t3, r2, e2) {
        for (var u2 = -1, i2 = n2.length, o2 = r2.length, f2 = -1, c2 = t3.length, a2 = Gl(i2 - o2, 0), l2 = il(c2 + a2), s2 = !e2; ++f2 < c2; ) l2[f2] = t3[f2];
        for (; ++u2 < o2; ) (s2 || u2 < i2) && (l2[r2[u2]] = n2[u2]);
        for (; a2--; ) l2[f2++] = n2[u2++];
        return l2;
      }
      function Bu(n2, t3, r2, e2) {
        for (var u2 = -1, i2 = n2.length, o2 = -1, f2 = r2.length, c2 = -1, a2 = t3.length, l2 = Gl(i2 - f2, 0), s2 = il(l2 + a2), h2 = !e2; ++u2 < l2; ) s2[u2] = n2[u2];
        for (var p3 = u2; ++c2 < a2; ) s2[p3 + c2] = t3[c2];
        for (; ++o2 < f2; ) (h2 || u2 < i2) && (s2[p3 + r2[o2]] = n2[u2++]);
        return s2;
      }
      function Tu(n2, t3) {
        var r2 = -1, e2 = n2.length;
        for (t3 || (t3 = il(e2)); ++r2 < e2; ) t3[r2] = n2[r2];
        return t3;
      }
      function $u(n2, t3, r2, e2) {
        var u2 = !r2;
        r2 || (r2 = {});
        for (var i2 = -1, o2 = t3.length; ++i2 < o2; ) {
          var f2 = t3[i2], c2 = e2 ? e2(r2[f2], n2[f2], f2, r2, n2) : X;
          c2 === X && (c2 = n2[f2]), u2 ? Br2(r2, f2, c2) : Sr2(r2, f2, c2);
        }
        return r2;
      }
      function Du(n2, t3) {
        return $u(n2, Is(n2), t3);
      }
      function Mu(n2, t3) {
        return $u(n2, Rs(n2), t3);
      }
      function Fu(n2, r2) {
        return function(e2, u2) {
          var i2 = bh(e2) ? t2 : Lr2, o2 = r2 ? r2() : {};
          return i2(e2, n2, mi(u2, 2), o2);
        };
      }
      function Nu(n2) {
        return uu(function(t3, r2) {
          var e2 = -1, u2 = r2.length, i2 = u2 > 1 ? r2[u2 - 1] : X, o2 = u2 > 2 ? r2[2] : X;
          for (i2 = n2.length > 3 && "function" == typeof i2 ? (u2--, i2) : X, o2 && Ui(r2[0], r2[1], o2) && (i2 = u2 < 3 ? X : i2, u2 = 1), t3 = ll(t3); ++e2 < u2; ) {
            var f2 = r2[e2];
            f2 && n2(t3, f2, e2, i2);
          }
          return t3;
        });
      }
      function Pu(n2, t3) {
        return function(r2, e2) {
          if (null == r2) return r2;
          if (!Hf(r2)) return n2(r2, e2);
          for (var u2 = r2.length, i2 = t3 ? u2 : -1, o2 = ll(r2); (t3 ? i2-- : ++i2 < u2) && e2(o2[i2], i2, o2) !== false; ) ;
          return r2;
        };
      }
      function qu(n2) {
        return function(t3, r2, e2) {
          for (var u2 = -1, i2 = ll(t3), o2 = e2(t3), f2 = o2.length; f2--; ) {
            var c2 = o2[n2 ? f2 : ++u2];
            if (r2(i2[c2], c2, i2) === false) break;
          }
          return t3;
        };
      }
      function Zu(n2, t3, r2) {
        function e2() {
          return (this && this !== re2 && this instanceof e2 ? i2 : n2).apply(u2 ? r2 : this, arguments);
        }
        var u2 = t3 & _n, i2 = Gu(n2);
        return e2;
      }
      function Ku(n2) {
        return function(t3) {
          t3 = Ec(t3);
          var r2 = T(t3) ? G(t3) : X, e2 = r2 ? r2[0] : t3.charAt(0), u2 = r2 ? Ou(r2, 1).join("") : t3.slice(1);
          return e2[n2]() + u2;
        };
      }
      function Vu(n2) {
        return function(t3) {
          return l(Ra(ca(t3).replace($r, "")), n2, "");
        };
      }
      function Gu(n2) {
        return function() {
          var t3 = arguments;
          switch (t3.length) {
            case 0:
              return new n2();
            case 1:
              return new n2(t3[0]);
            case 2:
              return new n2(t3[0], t3[1]);
            case 3:
              return new n2(t3[0], t3[1], t3[2]);
            case 4:
              return new n2(t3[0], t3[1], t3[2], t3[3]);
            case 5:
              return new n2(t3[0], t3[1], t3[2], t3[3], t3[4]);
            case 6:
              return new n2(t3[0], t3[1], t3[2], t3[3], t3[4], t3[5]);
            case 7:
              return new n2(t3[0], t3[1], t3[2], t3[3], t3[4], t3[5], t3[6]);
          }
          var r2 = gs(n2.prototype), e2 = n2.apply(r2, t3);
          return fc(e2) ? e2 : r2;
        };
      }
      function Hu(t3, r2, e2) {
        function u2() {
          for (var o2 = arguments.length, f2 = il(o2), c2 = o2, a2 = wi(u2); c2--; ) f2[c2] = arguments[c2];
          var l2 = o2 < 3 && f2[0] !== a2 && f2[o2 - 1] !== a2 ? [] : N(f2, a2);
          return o2 -= l2.length, o2 < e2 ? oi(t3, r2, Qu, u2.placeholder, X, f2, l2, X, X, e2 - o2) : n(this && this !== re2 && this instanceof u2 ? i2 : t3, this, f2);
        }
        var i2 = Gu(t3);
        return u2;
      }
      function Ju(n2) {
        return function(t3, r2, e2) {
          var u2 = ll(t3);
          if (!Hf(t3)) {
            var i2 = mi(r2, 3);
            t3 = Pc(t3), r2 = function(n3) {
              return i2(u2[n3], n3, u2);
            };
          }
          var o2 = n2(t3, r2, e2);
          return o2 > -1 ? u2[i2 ? t3[o2] : o2] : X;
        };
      }
      function Yu(n2) {
        return gi(function(t3) {
          var r2 = t3.length, e2 = r2, u2 = Y2.prototype.thru;
          for (n2 && t3.reverse(); e2--; ) {
            var i2 = t3[e2];
            if ("function" != typeof i2) throw new pl(en);
            if (u2 && !o2 && "wrapper" == bi(i2)) var o2 = new Y2([], true);
          }
          for (e2 = o2 ? e2 : r2; ++e2 < r2; ) {
            i2 = t3[e2];
            var f2 = bi(i2), c2 = "wrapper" == f2 ? Os(i2) : X;
            o2 = c2 && $i(c2[0]) && c2[1] == (mn | yn | bn | xn) && !c2[4].length && 1 == c2[9] ? o2[bi(c2[0])].apply(o2, c2[3]) : 1 == i2.length && $i(i2) ? o2[f2]() : o2.thru(i2);
          }
          return function() {
            var n3 = arguments, e3 = n3[0];
            if (o2 && 1 == n3.length && bh(e3)) return o2.plant(e3).value();
            for (var u3 = 0, i3 = r2 ? t3[u3].apply(this, n3) : e3; ++u3 < r2; ) i3 = t3[u3].call(this, i3);
            return i3;
          };
        });
      }
      function Qu(n2, t3, r2, e2, u2, i2, o2, f2, c2, a2) {
        function l2() {
          for (var y2 = arguments.length, d2 = il(y2), b2 = y2; b2--; ) d2[b2] = arguments[b2];
          if (_3) var w2 = wi(l2), m2 = C(d2, w2);
          if (e2 && (d2 = Uu(d2, e2, u2, _3)), i2 && (d2 = Bu(d2, i2, o2, _3)), y2 -= m2, _3 && y2 < a2) {
            return oi(n2, t3, Qu, l2.placeholder, r2, d2, N(d2, w2), f2, c2, a2 - y2);
          }
          var x3 = h2 ? r2 : this, j2 = p3 ? x3[n2] : n2;
          return y2 = d2.length, f2 ? d2 = Hi(d2, f2) : v2 && y2 > 1 && d2.reverse(), s2 && c2 < y2 && (d2.length = c2), this && this !== re2 && this instanceof l2 && (j2 = g2 || Gu(j2)), j2.apply(x3, d2);
        }
        var s2 = t3 & mn, h2 = t3 & _n, p3 = t3 & vn, _3 = t3 & (yn | dn), v2 = t3 & jn, g2 = p3 ? X : Gu(n2);
        return l2;
      }
      function Xu(n2, t3) {
        return function(r2, e2) {
          return Oe(r2, n2, t3(e2), {});
        };
      }
      function ni(n2, t3) {
        return function(r2, e2) {
          var u2;
          if (r2 === X && e2 === X) return t3;
          if (r2 !== X && (u2 = r2), e2 !== X) {
            if (u2 === X) return e2;
            "string" == typeof r2 || "string" == typeof e2 ? (r2 = vu(r2), e2 = vu(e2)) : (r2 = _u(r2), e2 = _u(e2)), u2 = n2(r2, e2);
          }
          return u2;
        };
      }
      function ti(t3) {
        return gi(function(r2) {
          return r2 = c(r2, z(mi())), uu(function(e2) {
            var u2 = this;
            return t3(r2, function(t4) {
              return n(t4, u2, e2);
            });
          });
        });
      }
      function ri(n2, t3) {
        t3 = t3 === X ? " " : vu(t3);
        var r2 = t3.length;
        if (r2 < 2) return r2 ? eu(t3, n2) : t3;
        var e2 = eu(t3, Fl(n2 / V(t3)));
        return T(t3) ? Ou(G(e2), 0, n2).join("") : e2.slice(0, n2);
      }
      function ei(t3, r2, e2, u2) {
        function i2() {
          for (var r3 = -1, c2 = arguments.length, a2 = -1, l2 = u2.length, s2 = il(l2 + c2), h2 = this && this !== re2 && this instanceof i2 ? f2 : t3; ++a2 < l2; ) s2[a2] = u2[a2];
          for (; c2--; ) s2[a2++] = arguments[++r3];
          return n(h2, o2 ? e2 : this, s2);
        }
        var o2 = r2 & _n, f2 = Gu(t3);
        return i2;
      }
      function ui(n2) {
        return function(t3, r2, e2) {
          return e2 && "number" != typeof e2 && Ui(t3, r2, e2) && (r2 = e2 = X), t3 = Ac(t3), r2 === X ? (r2 = t3, t3 = 0) : r2 = Ac(r2), e2 = e2 === X ? t3 < r2 ? 1 : -1 : Ac(e2), ru(t3, r2, e2, n2);
        };
      }
      function ii(n2) {
        return function(t3, r2) {
          return "string" == typeof t3 && "string" == typeof r2 || (t3 = Ic(t3), r2 = Ic(r2)), n2(t3, r2);
        };
      }
      function oi(n2, t3, r2, e2, u2, i2, o2, f2, c2, a2) {
        var l2 = t3 & yn, s2 = l2 ? o2 : X, h2 = l2 ? X : o2, p3 = l2 ? i2 : X, _3 = l2 ? X : i2;
        t3 |= l2 ? bn : wn, t3 &= ~(l2 ? wn : bn), t3 & gn || (t3 &= ~(_n | vn));
        var v2 = [n2, t3, u2, p3, s2, _3, h2, f2, c2, a2], g2 = r2.apply(X, v2);
        return $i(n2) && Ss(g2, v2), g2.placeholder = e2, Yi(g2, n2, t3);
      }
      function fi(n2) {
        var t3 = al[n2];
        return function(n3, r2) {
          if (n3 = Ic(n3), r2 = null == r2 ? 0 : Hl(kc(r2), 292), r2 && Zl(n3)) {
            var e2 = (Ec(n3) + "e").split("e");
            return e2 = (Ec(t3(e2[0] + "e" + (+e2[1] + r2))) + "e").split("e"), +(e2[0] + "e" + (+e2[1] - r2));
          }
          return t3(n3);
        };
      }
      function ci(n2) {
        return function(t3) {
          var r2 = zs(t3);
          return r2 == Gn ? M(t3) : r2 == tt ? q(t3) : I(t3, n2(t3));
        };
      }
      function ai(n2, t3, r2, e2, u2, i2, o2, f2) {
        var c2 = t3 & vn;
        if (!c2 && "function" != typeof n2) throw new pl(en);
        var a2 = e2 ? e2.length : 0;
        if (a2 || (t3 &= ~(bn | wn), e2 = u2 = X), o2 = o2 === X ? o2 : Gl(kc(o2), 0), f2 = f2 === X ? f2 : kc(f2), a2 -= u2 ? u2.length : 0, t3 & wn) {
          var l2 = e2, s2 = u2;
          e2 = u2 = X;
        }
        var h2 = c2 ? X : Os(n2), p3 = [n2, t3, r2, e2, u2, l2, s2, i2, o2, f2];
        if (h2 && qi(p3, h2), n2 = p3[0], t3 = p3[1], r2 = p3[2], e2 = p3[3], u2 = p3[4], f2 = p3[9] = p3[9] === X ? c2 ? 0 : n2.length : Gl(p3[9] - a2, 0), !f2 && t3 & (yn | dn) && (t3 &= ~(yn | dn)), t3 && t3 != _n) _3 = t3 == yn || t3 == dn ? Hu(n2, t3, f2) : t3 != bn && t3 != (_n | bn) || u2.length ? Qu.apply(X, p3) : ei(n2, t3, r2, e2);
        else var _3 = Zu(n2, t3, r2);
        return Yi((h2 ? ms : Ss)(_3, p3), n2, t3);
      }
      function li(n2, t3, r2, e2) {
        return n2 === X || Gf(n2, gl[r2]) && !bl.call(e2, r2) ? t3 : n2;
      }
      function si(n2, t3, r2, e2, u2, i2) {
        return fc(n2) && fc(t3) && (i2.set(t3, n2), Ke(n2, t3, X, si, i2), i2.delete(t3)), n2;
      }
      function hi(n2) {
        return gc(n2) ? X : n2;
      }
      function pi(n2, t3, r2, e2, u2, i2) {
        var o2 = r2 & hn, f2 = n2.length, c2 = t3.length;
        if (f2 != c2 && !(o2 && c2 > f2)) return false;
        var a2 = i2.get(n2), l2 = i2.get(t3);
        if (a2 && l2) return a2 == t3 && l2 == n2;
        var s2 = -1, p3 = true, _3 = r2 & pn ? new yr2() : X;
        for (i2.set(n2, t3), i2.set(t3, n2); ++s2 < f2; ) {
          var v2 = n2[s2], g2 = t3[s2];
          if (e2) var y2 = o2 ? e2(g2, v2, s2, t3, n2, i2) : e2(v2, g2, s2, n2, t3, i2);
          if (y2 !== X) {
            if (y2) continue;
            p3 = false;
            break;
          }
          if (_3) {
            if (!h(t3, function(n3, t4) {
              if (!S(_3, t4) && (v2 === n3 || u2(v2, n3, r2, e2, i2))) return _3.push(t4);
            })) {
              p3 = false;
              break;
            }
          } else if (v2 !== g2 && !u2(v2, g2, r2, e2, i2)) {
            p3 = false;
            break;
          }
        }
        return i2.delete(n2), i2.delete(t3), p3;
      }
      function _i(n2, t3, r2, e2, u2, i2, o2) {
        switch (r2) {
          case ct:
            if (n2.byteLength != t3.byteLength || n2.byteOffset != t3.byteOffset) return false;
            n2 = n2.buffer, t3 = t3.buffer;
          case ft:
            return !(n2.byteLength != t3.byteLength || !i2(new Rl(n2), new Rl(t3)));
          case Nn:
          case Pn:
          case Hn:
            return Gf(+n2, +t3);
          case Zn:
            return n2.name == t3.name && n2.message == t3.message;
          case nt:
          case rt:
            return n2 == t3 + "";
          case Gn:
            var f2 = M;
          case tt:
            var c2 = e2 & hn;
            if (f2 || (f2 = P), n2.size != t3.size && !c2) return false;
            var a2 = o2.get(n2);
            if (a2) return a2 == t3;
            e2 |= pn, o2.set(n2, t3);
            var l2 = pi(f2(n2), f2(t3), e2, u2, i2, o2);
            return o2.delete(n2), l2;
          case et:
            if (_s) return _s.call(n2) == _s.call(t3);
        }
        return false;
      }
      function vi(n2, t3, r2, e2, u2, i2) {
        var o2 = r2 & hn, f2 = yi(n2), c2 = f2.length;
        if (c2 != yi(t3).length && !o2) return false;
        for (var a2 = c2; a2--; ) {
          var l2 = f2[a2];
          if (!(o2 ? l2 in t3 : bl.call(t3, l2))) return false;
        }
        var s2 = i2.get(n2), h2 = i2.get(t3);
        if (s2 && h2) return s2 == t3 && h2 == n2;
        var p3 = true;
        i2.set(n2, t3), i2.set(t3, n2);
        for (var _3 = o2; ++a2 < c2; ) {
          l2 = f2[a2];
          var v2 = n2[l2], g2 = t3[l2];
          if (e2) var y2 = o2 ? e2(g2, v2, l2, t3, n2, i2) : e2(v2, g2, l2, n2, t3, i2);
          if (!(y2 === X ? v2 === g2 || u2(v2, g2, r2, e2, i2) : y2)) {
            p3 = false;
            break;
          }
          _3 || (_3 = "constructor" == l2);
        }
        if (p3 && !_3) {
          var d2 = n2.constructor, b2 = t3.constructor;
          d2 != b2 && "constructor" in n2 && "constructor" in t3 && !("function" == typeof d2 && d2 instanceof d2 && "function" == typeof b2 && b2 instanceof b2) && (p3 = false);
        }
        return i2.delete(n2), i2.delete(t3), p3;
      }
      function gi(n2) {
        return Ls(Vi(n2, X, _o), n2 + "");
      }
      function yi(n2) {
        return de2(n2, Pc, Is);
      }
      function di(n2) {
        return de2(n2, qc, Rs);
      }
      function bi(n2) {
        for (var t3 = n2.name + "", r2 = fs[t3], e2 = bl.call(fs, t3) ? r2.length : 0; e2--; ) {
          var u2 = r2[e2], i2 = u2.func;
          if (null == i2 || i2 == n2) return u2.name;
        }
        return t3;
      }
      function wi(n2) {
        return (bl.call(Z2, "placeholder") ? Z2 : n2).placeholder;
      }
      function mi() {
        var n2 = Z2.iteratee || Ca;
        return n2 = n2 === Ca ? De : n2, arguments.length ? n2(arguments[0], arguments[1]) : n2;
      }
      function xi(n2, t3) {
        var r2 = n2.__data__;
        return Ti(t3) ? r2["string" == typeof t3 ? "string" : "hash"] : r2.map;
      }
      function ji(n2) {
        for (var t3 = Pc(n2), r2 = t3.length; r2--; ) {
          var e2 = t3[r2], u2 = n2[e2];
          t3[r2] = [e2, u2, Fi(u2)];
        }
        return t3;
      }
      function Ai(n2, t3) {
        var r2 = B(n2, t3);
        return Ue(r2) ? r2 : X;
      }
      function ki(n2) {
        var t3 = bl.call(n2, Bl), r2 = n2[Bl];
        try {
          n2[Bl] = X;
          var e2 = true;
        } catch (n3) {
        }
        var u2 = xl.call(n2);
        return e2 && (t3 ? n2[Bl] = r2 : delete n2[Bl]), u2;
      }
      function Oi(n2, t3, r2) {
        for (var e2 = -1, u2 = r2.length; ++e2 < u2; ) {
          var i2 = r2[e2], o2 = i2.size;
          switch (i2.type) {
            case "drop":
              n2 += o2;
              break;
            case "dropRight":
              t3 -= o2;
              break;
            case "take":
              t3 = Hl(t3, n2 + o2);
              break;
            case "takeRight":
              n2 = Gl(n2, t3 - o2);
          }
        }
        return { start: n2, end: t3 };
      }
      function Ii(n2) {
        var t3 = n2.match(Bt);
        return t3 ? t3[1].split(Tt) : [];
      }
      function Ri(n2, t3, r2) {
        t3 = ku(t3, n2);
        for (var e2 = -1, u2 = t3.length, i2 = false; ++e2 < u2; ) {
          var o2 = no(t3[e2]);
          if (!(i2 = null != n2 && r2(n2, o2))) break;
          n2 = n2[o2];
        }
        return i2 || ++e2 != u2 ? i2 : (u2 = null == n2 ? 0 : n2.length, !!u2 && oc(u2) && Ci(o2, u2) && (bh(n2) || dh(n2)));
      }
      function zi(n2) {
        var t3 = n2.length, r2 = new n2.constructor(t3);
        return t3 && "string" == typeof n2[0] && bl.call(n2, "index") && (r2.index = n2.index, r2.input = n2.input), r2;
      }
      function Ei(n2) {
        return "function" != typeof n2.constructor || Mi(n2) ? {} : gs(El(n2));
      }
      function Si(n2, t3, r2) {
        var e2 = n2.constructor;
        switch (t3) {
          case ft:
            return Ru(n2);
          case Nn:
          case Pn:
            return new e2(+n2);
          case ct:
            return zu(n2, r2);
          case at:
          case lt2:
          case st:
          case ht:
          case pt:
          case _t:
          case vt:
          case gt2:
          case yt:
            return Wu(n2, r2);
          case Gn:
            return new e2();
          case Hn:
          case rt:
            return new e2(n2);
          case nt:
            return Eu(n2);
          case tt:
            return new e2();
          case et:
            return Su(n2);
        }
      }
      function Wi(n2, t3) {
        var r2 = t3.length;
        if (!r2) return n2;
        var e2 = r2 - 1;
        return t3[e2] = (r2 > 1 ? "& " : "") + t3[e2], t3 = t3.join(r2 > 2 ? ", " : " "), n2.replace(Ut, "{\n/* [wrapped with " + t3 + "] */\n");
      }
      function Li(n2) {
        return bh(n2) || dh(n2) || !!(Cl && n2 && n2[Cl]);
      }
      function Ci(n2, t3) {
        var r2 = typeof n2;
        return t3 = null == t3 ? Wn : t3, !!t3 && ("number" == r2 || "symbol" != r2 && Vt.test(n2)) && n2 > -1 && n2 % 1 == 0 && n2 < t3;
      }
      function Ui(n2, t3, r2) {
        if (!fc(r2)) return false;
        var e2 = typeof t3;
        return !!("number" == e2 ? Hf(r2) && Ci(t3, r2.length) : "string" == e2 && t3 in r2) && Gf(r2[t3], n2);
      }
      function Bi(n2, t3) {
        if (bh(n2)) return false;
        var r2 = typeof n2;
        return !("number" != r2 && "symbol" != r2 && "boolean" != r2 && null != n2 && !bc(n2)) || (zt.test(n2) || !Rt.test(n2) || null != t3 && n2 in ll(t3));
      }
      function Ti(n2) {
        var t3 = typeof n2;
        return "string" == t3 || "number" == t3 || "symbol" == t3 || "boolean" == t3 ? "__proto__" !== n2 : null === n2;
      }
      function $i(n2) {
        var t3 = bi(n2), r2 = Z2[t3];
        if ("function" != typeof r2 || !(t3 in Ct2.prototype)) return false;
        if (n2 === r2) return true;
        var e2 = Os(r2);
        return !!e2 && n2 === e2[0];
      }
      function Di(n2) {
        return !!ml && ml in n2;
      }
      function Mi(n2) {
        var t3 = n2 && n2.constructor;
        return n2 === ("function" == typeof t3 && t3.prototype || gl);
      }
      function Fi(n2) {
        return n2 === n2 && !fc(n2);
      }
      function Ni(n2, t3) {
        return function(r2) {
          return null != r2 && (r2[n2] === t3 && (t3 !== X || n2 in ll(r2)));
        };
      }
      function Pi(n2) {
        var t3 = Cf(n2, function(n3) {
          return r2.size === fn && r2.clear(), n3;
        }), r2 = t3.cache;
        return t3;
      }
      function qi(n2, t3) {
        var r2 = n2[1], e2 = t3[1], u2 = r2 | e2, i2 = u2 < (_n | vn | mn), o2 = e2 == mn && r2 == yn || e2 == mn && r2 == xn && n2[7].length <= t3[8] || e2 == (mn | xn) && t3[7].length <= t3[8] && r2 == yn;
        if (!i2 && !o2) return n2;
        e2 & _n && (n2[2] = t3[2], u2 |= r2 & _n ? 0 : gn);
        var f2 = t3[3];
        if (f2) {
          var c2 = n2[3];
          n2[3] = c2 ? Uu(c2, f2, t3[4]) : f2, n2[4] = c2 ? N(n2[3], cn) : t3[4];
        }
        return f2 = t3[5], f2 && (c2 = n2[5], n2[5] = c2 ? Bu(c2, f2, t3[6]) : f2, n2[6] = c2 ? N(n2[5], cn) : t3[6]), f2 = t3[7], f2 && (n2[7] = f2), e2 & mn && (n2[8] = null == n2[8] ? t3[8] : Hl(n2[8], t3[8])), null == n2[9] && (n2[9] = t3[9]), n2[0] = t3[0], n2[1] = u2, n2;
      }
      function Zi(n2) {
        var t3 = [];
        if (null != n2) for (var r2 in ll(n2)) t3.push(r2);
        return t3;
      }
      function Ki(n2) {
        return xl.call(n2);
      }
      function Vi(t3, r2, e2) {
        return r2 = Gl(r2 === X ? t3.length - 1 : r2, 0), function() {
          for (var u2 = arguments, i2 = -1, o2 = Gl(u2.length - r2, 0), f2 = il(o2); ++i2 < o2; ) f2[i2] = u2[r2 + i2];
          i2 = -1;
          for (var c2 = il(r2 + 1); ++i2 < r2; ) c2[i2] = u2[i2];
          return c2[r2] = e2(f2), n(t3, this, c2);
        };
      }
      function Gi(n2, t3) {
        return t3.length < 2 ? n2 : _e2(n2, au(t3, 0, -1));
      }
      function Hi(n2, t3) {
        for (var r2 = n2.length, e2 = Hl(t3.length, r2), u2 = Tu(n2); e2--; ) {
          var i2 = t3[e2];
          n2[e2] = Ci(i2, r2) ? u2[i2] : X;
        }
        return n2;
      }
      function Ji(n2, t3) {
        if (("constructor" !== t3 || "function" != typeof n2[t3]) && "__proto__" != t3) return n2[t3];
      }
      function Yi(n2, t3, r2) {
        var e2 = t3 + "";
        return Ls(n2, Wi(e2, ro(Ii(e2), r2)));
      }
      function Qi(n2) {
        var t3 = 0, r2 = 0;
        return function() {
          var e2 = Jl(), u2 = In - (e2 - r2);
          if (r2 = e2, u2 > 0) {
            if (++t3 >= On) return arguments[0];
          } else t3 = 0;
          return n2.apply(X, arguments);
        };
      }
      function Xi(n2, t3) {
        var r2 = -1, e2 = n2.length, u2 = e2 - 1;
        for (t3 = t3 === X ? e2 : t3; ++r2 < t3; ) {
          var i2 = tu(r2, u2), o2 = n2[i2];
          n2[i2] = n2[r2], n2[r2] = o2;
        }
        return n2.length = t3, n2;
      }
      function no(n2) {
        if ("string" == typeof n2 || bc(n2)) return n2;
        var t3 = n2 + "";
        return "0" == t3 && 1 / n2 == -Sn ? "-0" : t3;
      }
      function to(n2) {
        if (null != n2) {
          try {
            return dl.call(n2);
          } catch (n3) {
          }
          try {
            return n2 + "";
          } catch (n3) {
          }
        }
        return "";
      }
      function ro(n2, t3) {
        return r($n, function(r2) {
          var e2 = "_." + r2[0];
          t3 & r2[1] && !o(n2, e2) && n2.push(e2);
        }), n2.sort();
      }
      function eo(n2) {
        if (n2 instanceof Ct2) return n2.clone();
        var t3 = new Y2(n2.__wrapped__, n2.__chain__);
        return t3.__actions__ = Tu(n2.__actions__), t3.__index__ = n2.__index__, t3.__values__ = n2.__values__, t3;
      }
      function uo(n2, t3, r2) {
        t3 = (r2 ? Ui(n2, t3, r2) : t3 === X) ? 1 : Gl(kc(t3), 0);
        var e2 = null == n2 ? 0 : n2.length;
        if (!e2 || t3 < 1) return [];
        for (var u2 = 0, i2 = 0, o2 = il(Fl(e2 / t3)); u2 < e2; ) o2[i2++] = au(n2, u2, u2 += t3);
        return o2;
      }
      function io(n2) {
        for (var t3 = -1, r2 = null == n2 ? 0 : n2.length, e2 = 0, u2 = []; ++t3 < r2; ) {
          var i2 = n2[t3];
          i2 && (u2[e2++] = i2);
        }
        return u2;
      }
      function oo() {
        var n2 = arguments.length;
        if (!n2) return [];
        for (var t3 = il(n2 - 1), r2 = arguments[0], e2 = n2; e2--; ) t3[e2 - 1] = arguments[e2];
        return a(bh(r2) ? Tu(r2) : [r2], ee2(t3, 1));
      }
      function fo(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        return e2 ? (t3 = r2 || t3 === X ? 1 : kc(t3), au(n2, t3 < 0 ? 0 : t3, e2)) : [];
      }
      function co(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        return e2 ? (t3 = r2 || t3 === X ? 1 : kc(t3), t3 = e2 - t3, au(n2, 0, t3 < 0 ? 0 : t3)) : [];
      }
      function ao(n2, t3) {
        return n2 && n2.length ? bu(n2, mi(t3, 3), true, true) : [];
      }
      function lo(n2, t3) {
        return n2 && n2.length ? bu(n2, mi(t3, 3), true) : [];
      }
      function so(n2, t3, r2, e2) {
        var u2 = null == n2 ? 0 : n2.length;
        return u2 ? (r2 && "number" != typeof r2 && Ui(n2, t3, r2) && (r2 = 0, e2 = u2), ne2(n2, t3, r2, e2)) : [];
      }
      function ho(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        if (!e2) return -1;
        var u2 = null == r2 ? 0 : kc(r2);
        return u2 < 0 && (u2 = Gl(e2 + u2, 0)), g(n2, mi(t3, 3), u2);
      }
      function po(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        if (!e2) return -1;
        var u2 = e2 - 1;
        return r2 !== X && (u2 = kc(r2), u2 = r2 < 0 ? Gl(e2 + u2, 0) : Hl(u2, e2 - 1)), g(n2, mi(t3, 3), u2, true);
      }
      function _o(n2) {
        return (null == n2 ? 0 : n2.length) ? ee2(n2, 1) : [];
      }
      function vo(n2) {
        return (null == n2 ? 0 : n2.length) ? ee2(n2, Sn) : [];
      }
      function go(n2, t3) {
        return (null == n2 ? 0 : n2.length) ? (t3 = t3 === X ? 1 : kc(t3), ee2(n2, t3)) : [];
      }
      function yo(n2) {
        for (var t3 = -1, r2 = null == n2 ? 0 : n2.length, e2 = {}; ++t3 < r2; ) {
          var u2 = n2[t3];
          e2[u2[0]] = u2[1];
        }
        return e2;
      }
      function bo(n2) {
        return n2 && n2.length ? n2[0] : X;
      }
      function wo(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        if (!e2) return -1;
        var u2 = null == r2 ? 0 : kc(r2);
        return u2 < 0 && (u2 = Gl(e2 + u2, 0)), y(n2, t3, u2);
      }
      function mo(n2) {
        return (null == n2 ? 0 : n2.length) ? au(n2, 0, -1) : [];
      }
      function xo(n2, t3) {
        return null == n2 ? "" : Kl.call(n2, t3);
      }
      function jo(n2) {
        var t3 = null == n2 ? 0 : n2.length;
        return t3 ? n2[t3 - 1] : X;
      }
      function Ao(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        if (!e2) return -1;
        var u2 = e2;
        return r2 !== X && (u2 = kc(r2), u2 = u2 < 0 ? Gl(e2 + u2, 0) : Hl(u2, e2 - 1)), t3 === t3 ? K(n2, t3, u2) : g(n2, b, u2, true);
      }
      function ko(n2, t3) {
        return n2 && n2.length ? Ge(n2, kc(t3)) : X;
      }
      function Oo(n2, t3) {
        return n2 && n2.length && t3 && t3.length ? Xe(n2, t3) : n2;
      }
      function Io(n2, t3, r2) {
        return n2 && n2.length && t3 && t3.length ? Xe(n2, t3, mi(r2, 2)) : n2;
      }
      function Ro(n2, t3, r2) {
        return n2 && n2.length && t3 && t3.length ? Xe(n2, t3, X, r2) : n2;
      }
      function zo(n2, t3) {
        var r2 = [];
        if (!n2 || !n2.length) return r2;
        var e2 = -1, u2 = [], i2 = n2.length;
        for (t3 = mi(t3, 3); ++e2 < i2; ) {
          var o2 = n2[e2];
          t3(o2, e2, n2) && (r2.push(o2), u2.push(e2));
        }
        return nu(n2, u2), r2;
      }
      function Eo(n2) {
        return null == n2 ? n2 : Xl.call(n2);
      }
      function So(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        return e2 ? (r2 && "number" != typeof r2 && Ui(n2, t3, r2) ? (t3 = 0, r2 = e2) : (t3 = null == t3 ? 0 : kc(t3), r2 = r2 === X ? e2 : kc(r2)), au(n2, t3, r2)) : [];
      }
      function Wo(n2, t3) {
        return su(n2, t3);
      }
      function Lo(n2, t3, r2) {
        return hu(n2, t3, mi(r2, 2));
      }
      function Co(n2, t3) {
        var r2 = null == n2 ? 0 : n2.length;
        if (r2) {
          var e2 = su(n2, t3);
          if (e2 < r2 && Gf(n2[e2], t3)) return e2;
        }
        return -1;
      }
      function Uo(n2, t3) {
        return su(n2, t3, true);
      }
      function Bo(n2, t3, r2) {
        return hu(n2, t3, mi(r2, 2), true);
      }
      function To(n2, t3) {
        if (null == n2 ? 0 : n2.length) {
          var r2 = su(n2, t3, true) - 1;
          if (Gf(n2[r2], t3)) return r2;
        }
        return -1;
      }
      function $o(n2) {
        return n2 && n2.length ? pu(n2) : [];
      }
      function Do(n2, t3) {
        return n2 && n2.length ? pu(n2, mi(t3, 2)) : [];
      }
      function Mo(n2) {
        var t3 = null == n2 ? 0 : n2.length;
        return t3 ? au(n2, 1, t3) : [];
      }
      function Fo(n2, t3, r2) {
        return n2 && n2.length ? (t3 = r2 || t3 === X ? 1 : kc(t3), au(n2, 0, t3 < 0 ? 0 : t3)) : [];
      }
      function No(n2, t3, r2) {
        var e2 = null == n2 ? 0 : n2.length;
        return e2 ? (t3 = r2 || t3 === X ? 1 : kc(t3), t3 = e2 - t3, au(n2, t3 < 0 ? 0 : t3, e2)) : [];
      }
      function Po(n2, t3) {
        return n2 && n2.length ? bu(n2, mi(t3, 3), false, true) : [];
      }
      function qo(n2, t3) {
        return n2 && n2.length ? bu(n2, mi(t3, 3)) : [];
      }
      function Zo(n2) {
        return n2 && n2.length ? gu(n2) : [];
      }
      function Ko(n2, t3) {
        return n2 && n2.length ? gu(n2, mi(t3, 2)) : [];
      }
      function Vo(n2, t3) {
        return t3 = "function" == typeof t3 ? t3 : X, n2 && n2.length ? gu(n2, X, t3) : [];
      }
      function Go(n2) {
        if (!n2 || !n2.length) return [];
        var t3 = 0;
        return n2 = i(n2, function(n3) {
          if (Jf(n3)) return t3 = Gl(n3.length, t3), true;
        }), O(t3, function(t4) {
          return c(n2, m(t4));
        });
      }
      function Ho(t3, r2) {
        if (!t3 || !t3.length) return [];
        var e2 = Go(t3);
        return null == r2 ? e2 : c(e2, function(t4) {
          return n(r2, X, t4);
        });
      }
      function Jo(n2, t3) {
        return xu(n2 || [], t3 || [], Sr2);
      }
      function Yo(n2, t3) {
        return xu(n2 || [], t3 || [], fu);
      }
      function Qo(n2) {
        var t3 = Z2(n2);
        return t3.__chain__ = true, t3;
      }
      function Xo(n2, t3) {
        return t3(n2), n2;
      }
      function nf(n2, t3) {
        return t3(n2);
      }
      function tf() {
        return Qo(this);
      }
      function rf() {
        return new Y2(this.value(), this.__chain__);
      }
      function ef() {
        this.__values__ === X && (this.__values__ = jc(this.value()));
        var n2 = this.__index__ >= this.__values__.length;
        return { done: n2, value: n2 ? X : this.__values__[this.__index__++] };
      }
      function uf() {
        return this;
      }
      function of(n2) {
        for (var t3, r2 = this; r2 instanceof J2; ) {
          var e2 = eo(r2);
          e2.__index__ = 0, e2.__values__ = X, t3 ? u2.__wrapped__ = e2 : t3 = e2;
          var u2 = e2;
          r2 = r2.__wrapped__;
        }
        return u2.__wrapped__ = n2, t3;
      }
      function ff() {
        var n2 = this.__wrapped__;
        if (n2 instanceof Ct2) {
          var t3 = n2;
          return this.__actions__.length && (t3 = new Ct2(this)), t3 = t3.reverse(), t3.__actions__.push({ func: nf, args: [Eo], thisArg: X }), new Y2(t3, this.__chain__);
        }
        return this.thru(Eo);
      }
      function cf() {
        return wu(this.__wrapped__, this.__actions__);
      }
      function af(n2, t3, r2) {
        var e2 = bh(n2) ? u : Jr2;
        return r2 && Ui(n2, t3, r2) && (t3 = X), e2(n2, mi(t3, 3));
      }
      function lf(n2, t3) {
        return (bh(n2) ? i : te2)(n2, mi(t3, 3));
      }
      function sf(n2, t3) {
        return ee2(yf(n2, t3), 1);
      }
      function hf(n2, t3) {
        return ee2(yf(n2, t3), Sn);
      }
      function pf(n2, t3, r2) {
        return r2 = r2 === X ? 1 : kc(r2), ee2(yf(n2, t3), r2);
      }
      function _f(n2, t3) {
        return (bh(n2) ? r : ys)(n2, mi(t3, 3));
      }
      function vf(n2, t3) {
        return (bh(n2) ? e : ds)(n2, mi(t3, 3));
      }
      function gf(n2, t3, r2, e2) {
        n2 = Hf(n2) ? n2 : ra(n2), r2 = r2 && !e2 ? kc(r2) : 0;
        var u2 = n2.length;
        return r2 < 0 && (r2 = Gl(u2 + r2, 0)), dc(n2) ? r2 <= u2 && n2.indexOf(t3, r2) > -1 : !!u2 && y(n2, t3, r2) > -1;
      }
      function yf(n2, t3) {
        return (bh(n2) ? c : Pe)(n2, mi(t3, 3));
      }
      function df(n2, t3, r2, e2) {
        return null == n2 ? [] : (bh(t3) || (t3 = null == t3 ? [] : [t3]), r2 = e2 ? X : r2, bh(r2) || (r2 = null == r2 ? [] : [r2]), He(n2, t3, r2));
      }
      function bf(n2, t3, r2) {
        var e2 = bh(n2) ? l : j, u2 = arguments.length < 3;
        return e2(n2, mi(t3, 4), r2, u2, ys);
      }
      function wf(n2, t3, r2) {
        var e2 = bh(n2) ? s : j, u2 = arguments.length < 3;
        return e2(n2, mi(t3, 4), r2, u2, ds);
      }
      function mf(n2, t3) {
        return (bh(n2) ? i : te2)(n2, Uf(mi(t3, 3)));
      }
      function xf(n2) {
        return (bh(n2) ? Ir2 : iu)(n2);
      }
      function jf(n2, t3, r2) {
        return t3 = (r2 ? Ui(n2, t3, r2) : t3 === X) ? 1 : kc(t3), (bh(n2) ? Rr2 : ou)(n2, t3);
      }
      function Af(n2) {
        return (bh(n2) ? zr2 : cu)(n2);
      }
      function kf(n2) {
        if (null == n2) return 0;
        if (Hf(n2)) return dc(n2) ? V(n2) : n2.length;
        var t3 = zs(n2);
        return t3 == Gn || t3 == tt ? n2.size : Me(n2).length;
      }
      function Of(n2, t3, r2) {
        var e2 = bh(n2) ? h : lu;
        return r2 && Ui(n2, t3, r2) && (t3 = X), e2(n2, mi(t3, 3));
      }
      function If(n2, t3) {
        if ("function" != typeof t3) throw new pl(en);
        return n2 = kc(n2), function() {
          if (--n2 < 1) return t3.apply(this, arguments);
        };
      }
      function Rf(n2, t3, r2) {
        return t3 = r2 ? X : t3, t3 = n2 && null == t3 ? n2.length : t3, ai(n2, mn, X, X, X, X, t3);
      }
      function zf(n2, t3) {
        var r2;
        if ("function" != typeof t3) throw new pl(en);
        return n2 = kc(n2), function() {
          return --n2 > 0 && (r2 = t3.apply(this, arguments)), n2 <= 1 && (t3 = X), r2;
        };
      }
      function Ef(n2, t3, r2) {
        t3 = r2 ? X : t3;
        var e2 = ai(n2, yn, X, X, X, X, X, t3);
        return e2.placeholder = Ef.placeholder, e2;
      }
      function Sf(n2, t3, r2) {
        t3 = r2 ? X : t3;
        var e2 = ai(n2, dn, X, X, X, X, X, t3);
        return e2.placeholder = Sf.placeholder, e2;
      }
      function Wf(n2, t3, r2) {
        function e2(t4) {
          var r3 = h2, e3 = p3;
          return h2 = p3 = X, d2 = t4, v2 = n2.apply(e3, r3);
        }
        function u2(n3) {
          return d2 = n3, g2 = Ws(f2, t3), b2 ? e2(n3) : v2;
        }
        function i2(n3) {
          var r3 = n3 - y2, e3 = n3 - d2, u3 = t3 - r3;
          return w2 ? Hl(u3, _3 - e3) : u3;
        }
        function o2(n3) {
          var r3 = n3 - y2, e3 = n3 - d2;
          return y2 === X || r3 >= t3 || r3 < 0 || w2 && e3 >= _3;
        }
        function f2() {
          var n3 = fh();
          return o2(n3) ? c2(n3) : (g2 = Ws(f2, i2(n3)), X);
        }
        function c2(n3) {
          return g2 = X, m2 && h2 ? e2(n3) : (h2 = p3 = X, v2);
        }
        function a2() {
          g2 !== X && As(g2), d2 = 0, h2 = y2 = p3 = g2 = X;
        }
        function l2() {
          return g2 === X ? v2 : c2(fh());
        }
        function s2() {
          var n3 = fh(), r3 = o2(n3);
          if (h2 = arguments, p3 = this, y2 = n3, r3) {
            if (g2 === X) return u2(y2);
            if (w2) return As(g2), g2 = Ws(f2, t3), e2(y2);
          }
          return g2 === X && (g2 = Ws(f2, t3)), v2;
        }
        var h2, p3, _3, v2, g2, y2, d2 = 0, b2 = false, w2 = false, m2 = true;
        if ("function" != typeof n2) throw new pl(en);
        return t3 = Ic(t3) || 0, fc(r2) && (b2 = !!r2.leading, w2 = "maxWait" in r2, _3 = w2 ? Gl(Ic(r2.maxWait) || 0, t3) : _3, m2 = "trailing" in r2 ? !!r2.trailing : m2), s2.cancel = a2, s2.flush = l2, s2;
      }
      function Lf(n2) {
        return ai(n2, jn);
      }
      function Cf(n2, t3) {
        if ("function" != typeof n2 || null != t3 && "function" != typeof t3) throw new pl(en);
        var r2 = function() {
          var e2 = arguments, u2 = t3 ? t3.apply(this, e2) : e2[0], i2 = r2.cache;
          if (i2.has(u2)) return i2.get(u2);
          var o2 = n2.apply(this, e2);
          return r2.cache = i2.set(u2, o2) || i2, o2;
        };
        return r2.cache = new (Cf.Cache || sr2)(), r2;
      }
      function Uf(n2) {
        if ("function" != typeof n2) throw new pl(en);
        return function() {
          var t3 = arguments;
          switch (t3.length) {
            case 0:
              return !n2.call(this);
            case 1:
              return !n2.call(this, t3[0]);
            case 2:
              return !n2.call(this, t3[0], t3[1]);
            case 3:
              return !n2.call(this, t3[0], t3[1], t3[2]);
          }
          return !n2.apply(this, t3);
        };
      }
      function Bf(n2) {
        return zf(2, n2);
      }
      function Tf(n2, t3) {
        if ("function" != typeof n2) throw new pl(en);
        return t3 = t3 === X ? t3 : kc(t3), uu(n2, t3);
      }
      function $f(t3, r2) {
        if ("function" != typeof t3) throw new pl(en);
        return r2 = null == r2 ? 0 : Gl(kc(r2), 0), uu(function(e2) {
          var u2 = e2[r2], i2 = Ou(e2, 0, r2);
          return u2 && a(i2, u2), n(t3, this, i2);
        });
      }
      function Df(n2, t3, r2) {
        var e2 = true, u2 = true;
        if ("function" != typeof n2) throw new pl(en);
        return fc(r2) && (e2 = "leading" in r2 ? !!r2.leading : e2, u2 = "trailing" in r2 ? !!r2.trailing : u2), Wf(n2, t3, { leading: e2, maxWait: t3, trailing: u2 });
      }
      function Mf(n2) {
        return Rf(n2, 1);
      }
      function Ff(n2, t3) {
        return ph(Au(t3), n2);
      }
      function Nf() {
        if (!arguments.length) return [];
        var n2 = arguments[0];
        return bh(n2) ? n2 : [n2];
      }
      function Pf(n2) {
        return Fr2(n2, sn);
      }
      function qf(n2, t3) {
        return t3 = "function" == typeof t3 ? t3 : X, Fr2(n2, sn, t3);
      }
      function Zf(n2) {
        return Fr2(n2, an | sn);
      }
      function Kf(n2, t3) {
        return t3 = "function" == typeof t3 ? t3 : X, Fr2(n2, an | sn, t3);
      }
      function Vf(n2, t3) {
        return null == t3 || Pr2(n2, t3, Pc(t3));
      }
      function Gf(n2, t3) {
        return n2 === t3 || n2 !== n2 && t3 !== t3;
      }
      function Hf(n2) {
        return null != n2 && oc(n2.length) && !uc(n2);
      }
      function Jf(n2) {
        return cc(n2) && Hf(n2);
      }
      function Yf(n2) {
        return n2 === true || n2 === false || cc(n2) && we(n2) == Nn;
      }
      function Qf(n2) {
        return cc(n2) && 1 === n2.nodeType && !gc(n2);
      }
      function Xf(n2) {
        if (null == n2) return true;
        if (Hf(n2) && (bh(n2) || "string" == typeof n2 || "function" == typeof n2.splice || mh(n2) || Oh(n2) || dh(n2))) return !n2.length;
        var t3 = zs(n2);
        if (t3 == Gn || t3 == tt) return !n2.size;
        if (Mi(n2)) return !Me(n2).length;
        for (var r2 in n2) if (bl.call(n2, r2)) return false;
        return true;
      }
      function nc(n2, t3) {
        return Se(n2, t3);
      }
      function tc(n2, t3, r2) {
        r2 = "function" == typeof r2 ? r2 : X;
        var e2 = r2 ? r2(n2, t3) : X;
        return e2 === X ? Se(n2, t3, X, r2) : !!e2;
      }
      function rc(n2) {
        if (!cc(n2)) return false;
        var t3 = we(n2);
        return t3 == Zn || t3 == qn || "string" == typeof n2.message && "string" == typeof n2.name && !gc(n2);
      }
      function ec(n2) {
        return "number" == typeof n2 && Zl(n2);
      }
      function uc(n2) {
        if (!fc(n2)) return false;
        var t3 = we(n2);
        return t3 == Kn || t3 == Vn || t3 == Fn || t3 == Xn;
      }
      function ic(n2) {
        return "number" == typeof n2 && n2 == kc(n2);
      }
      function oc(n2) {
        return "number" == typeof n2 && n2 > -1 && n2 % 1 == 0 && n2 <= Wn;
      }
      function fc(n2) {
        var t3 = typeof n2;
        return null != n2 && ("object" == t3 || "function" == t3);
      }
      function cc(n2) {
        return null != n2 && "object" == typeof n2;
      }
      function ac(n2, t3) {
        return n2 === t3 || Ce(n2, t3, ji(t3));
      }
      function lc(n2, t3, r2) {
        return r2 = "function" == typeof r2 ? r2 : X, Ce(n2, t3, ji(t3), r2);
      }
      function sc(n2) {
        return vc(n2) && n2 != +n2;
      }
      function hc(n2) {
        if (Es(n2)) throw new fl(rn);
        return Ue(n2);
      }
      function pc(n2) {
        return null === n2;
      }
      function _c(n2) {
        return null == n2;
      }
      function vc(n2) {
        return "number" == typeof n2 || cc(n2) && we(n2) == Hn;
      }
      function gc(n2) {
        if (!cc(n2) || we(n2) != Yn) return false;
        var t3 = El(n2);
        if (null === t3) return true;
        var r2 = bl.call(t3, "constructor") && t3.constructor;
        return "function" == typeof r2 && r2 instanceof r2 && dl.call(r2) == jl;
      }
      function yc(n2) {
        return ic(n2) && n2 >= -Wn && n2 <= Wn;
      }
      function dc(n2) {
        return "string" == typeof n2 || !bh(n2) && cc(n2) && we(n2) == rt;
      }
      function bc(n2) {
        return "symbol" == typeof n2 || cc(n2) && we(n2) == et;
      }
      function wc(n2) {
        return n2 === X;
      }
      function mc(n2) {
        return cc(n2) && zs(n2) == it;
      }
      function xc(n2) {
        return cc(n2) && we(n2) == ot;
      }
      function jc(n2) {
        if (!n2) return [];
        if (Hf(n2)) return dc(n2) ? G(n2) : Tu(n2);
        if (Ul && n2[Ul]) return D(n2[Ul]());
        var t3 = zs(n2);
        return (t3 == Gn ? M : t3 == tt ? P : ra)(n2);
      }
      function Ac(n2) {
        if (!n2) return 0 === n2 ? n2 : 0;
        if (n2 = Ic(n2), n2 === Sn || n2 === -Sn) {
          return (n2 < 0 ? -1 : 1) * Ln;
        }
        return n2 === n2 ? n2 : 0;
      }
      function kc(n2) {
        var t3 = Ac(n2), r2 = t3 % 1;
        return t3 === t3 ? r2 ? t3 - r2 : t3 : 0;
      }
      function Oc(n2) {
        return n2 ? Mr2(kc(n2), 0, Un) : 0;
      }
      function Ic(n2) {
        if ("number" == typeof n2) return n2;
        if (bc(n2)) return Cn;
        if (fc(n2)) {
          var t3 = "function" == typeof n2.valueOf ? n2.valueOf() : n2;
          n2 = fc(t3) ? t3 + "" : t3;
        }
        if ("string" != typeof n2) return 0 === n2 ? n2 : +n2;
        n2 = R(n2);
        var r2 = qt.test(n2);
        return r2 || Kt.test(n2) ? Xr(n2.slice(2), r2 ? 2 : 8) : Pt.test(n2) ? Cn : +n2;
      }
      function Rc(n2) {
        return $u(n2, qc(n2));
      }
      function zc(n2) {
        return n2 ? Mr2(kc(n2), -Wn, Wn) : 0 === n2 ? n2 : 0;
      }
      function Ec(n2) {
        return null == n2 ? "" : vu(n2);
      }
      function Sc(n2, t3) {
        var r2 = gs(n2);
        return null == t3 ? r2 : Cr2(r2, t3);
      }
      function Wc(n2, t3) {
        return v(n2, mi(t3, 3), ue2);
      }
      function Lc(n2, t3) {
        return v(n2, mi(t3, 3), oe2);
      }
      function Cc(n2, t3) {
        return null == n2 ? n2 : bs(n2, mi(t3, 3), qc);
      }
      function Uc(n2, t3) {
        return null == n2 ? n2 : ws(n2, mi(t3, 3), qc);
      }
      function Bc(n2, t3) {
        return n2 && ue2(n2, mi(t3, 3));
      }
      function Tc(n2, t3) {
        return n2 && oe2(n2, mi(t3, 3));
      }
      function $c(n2) {
        return null == n2 ? [] : fe2(n2, Pc(n2));
      }
      function Dc(n2) {
        return null == n2 ? [] : fe2(n2, qc(n2));
      }
      function Mc(n2, t3, r2) {
        var e2 = null == n2 ? X : _e2(n2, t3);
        return e2 === X ? r2 : e2;
      }
      function Fc(n2, t3) {
        return null != n2 && Ri(n2, t3, xe);
      }
      function Nc(n2, t3) {
        return null != n2 && Ri(n2, t3, je);
      }
      function Pc(n2) {
        return Hf(n2) ? Or2(n2) : Me(n2);
      }
      function qc(n2) {
        return Hf(n2) ? Or2(n2, true) : Fe(n2);
      }
      function Zc(n2, t3) {
        var r2 = {};
        return t3 = mi(t3, 3), ue2(n2, function(n3, e2, u2) {
          Br2(r2, t3(n3, e2, u2), n3);
        }), r2;
      }
      function Kc(n2, t3) {
        var r2 = {};
        return t3 = mi(t3, 3), ue2(n2, function(n3, e2, u2) {
          Br2(r2, e2, t3(n3, e2, u2));
        }), r2;
      }
      function Vc(n2, t3) {
        return Gc(n2, Uf(mi(t3)));
      }
      function Gc(n2, t3) {
        if (null == n2) return {};
        var r2 = c(di(n2), function(n3) {
          return [n3];
        });
        return t3 = mi(t3), Ye(n2, r2, function(n3, r3) {
          return t3(n3, r3[0]);
        });
      }
      function Hc(n2, t3, r2) {
        t3 = ku(t3, n2);
        var e2 = -1, u2 = t3.length;
        for (u2 || (u2 = 1, n2 = X); ++e2 < u2; ) {
          var i2 = null == n2 ? X : n2[no(t3[e2])];
          i2 === X && (e2 = u2, i2 = r2), n2 = uc(i2) ? i2.call(n2) : i2;
        }
        return n2;
      }
      function Jc(n2, t3, r2) {
        return null == n2 ? n2 : fu(n2, t3, r2);
      }
      function Yc(n2, t3, r2, e2) {
        return e2 = "function" == typeof e2 ? e2 : X, null == n2 ? n2 : fu(n2, t3, r2, e2);
      }
      function Qc(n2, t3, e2) {
        var u2 = bh(n2), i2 = u2 || mh(n2) || Oh(n2);
        if (t3 = mi(t3, 4), null == e2) {
          var o2 = n2 && n2.constructor;
          e2 = i2 ? u2 ? new o2() : [] : fc(n2) && uc(o2) ? gs(El(n2)) : {};
        }
        return (i2 ? r : ue2)(n2, function(n3, r2, u3) {
          return t3(e2, n3, r2, u3);
        }), e2;
      }
      function Xc(n2, t3) {
        return null == n2 || yu(n2, t3);
      }
      function na(n2, t3, r2) {
        return null == n2 ? n2 : du(n2, t3, Au(r2));
      }
      function ta(n2, t3, r2, e2) {
        return e2 = "function" == typeof e2 ? e2 : X, null == n2 ? n2 : du(n2, t3, Au(r2), e2);
      }
      function ra(n2) {
        return null == n2 ? [] : E(n2, Pc(n2));
      }
      function ea(n2) {
        return null == n2 ? [] : E(n2, qc(n2));
      }
      function ua(n2, t3, r2) {
        return r2 === X && (r2 = t3, t3 = X), r2 !== X && (r2 = Ic(r2), r2 = r2 === r2 ? r2 : 0), t3 !== X && (t3 = Ic(t3), t3 = t3 === t3 ? t3 : 0), Mr2(Ic(n2), t3, r2);
      }
      function ia(n2, t3, r2) {
        return t3 = Ac(t3), r2 === X ? (r2 = t3, t3 = 0) : r2 = Ac(r2), n2 = Ic(n2), Ae(n2, t3, r2);
      }
      function oa(n2, t3, r2) {
        if (r2 && "boolean" != typeof r2 && Ui(n2, t3, r2) && (t3 = r2 = X), r2 === X && ("boolean" == typeof t3 ? (r2 = t3, t3 = X) : "boolean" == typeof n2 && (r2 = n2, n2 = X)), n2 === X && t3 === X ? (n2 = 0, t3 = 1) : (n2 = Ac(n2), t3 === X ? (t3 = n2, n2 = 0) : t3 = Ac(t3)), n2 > t3) {
          var e2 = n2;
          n2 = t3, t3 = e2;
        }
        if (r2 || n2 % 1 || t3 % 1) {
          var u2 = Ql();
          return Hl(n2 + u2 * (t3 - n2 + Qr("1e-" + ((u2 + "").length - 1))), t3);
        }
        return tu(n2, t3);
      }
      function fa(n2) {
        return Qh(Ec(n2).toLowerCase());
      }
      function ca(n2) {
        return n2 = Ec(n2), n2 && n2.replace(Gt, ve).replace(Dr, "");
      }
      function aa(n2, t3, r2) {
        n2 = Ec(n2), t3 = vu(t3);
        var e2 = n2.length;
        r2 = r2 === X ? e2 : Mr2(kc(r2), 0, e2);
        var u2 = r2;
        return r2 -= t3.length, r2 >= 0 && n2.slice(r2, u2) == t3;
      }
      function la(n2) {
        return n2 = Ec(n2), n2 && At.test(n2) ? n2.replace(xt, ge) : n2;
      }
      function sa(n2) {
        return n2 = Ec(n2), n2 && Wt.test(n2) ? n2.replace(St, "\\$&") : n2;
      }
      function ha(n2, t3, r2) {
        n2 = Ec(n2), t3 = kc(t3);
        var e2 = t3 ? V(n2) : 0;
        if (!t3 || e2 >= t3) return n2;
        var u2 = (t3 - e2) / 2;
        return ri(Nl(u2), r2) + n2 + ri(Fl(u2), r2);
      }
      function pa(n2, t3, r2) {
        n2 = Ec(n2), t3 = kc(t3);
        var e2 = t3 ? V(n2) : 0;
        return t3 && e2 < t3 ? n2 + ri(t3 - e2, r2) : n2;
      }
      function _a(n2, t3, r2) {
        n2 = Ec(n2), t3 = kc(t3);
        var e2 = t3 ? V(n2) : 0;
        return t3 && e2 < t3 ? ri(t3 - e2, r2) + n2 : n2;
      }
      function va(n2, t3, r2) {
        return r2 || null == t3 ? t3 = 0 : t3 && (t3 = +t3), Yl(Ec(n2).replace(Lt, ""), t3 || 0);
      }
      function ga(n2, t3, r2) {
        return t3 = (r2 ? Ui(n2, t3, r2) : t3 === X) ? 1 : kc(t3), eu(Ec(n2), t3);
      }
      function ya() {
        var n2 = arguments, t3 = Ec(n2[0]);
        return n2.length < 3 ? t3 : t3.replace(n2[1], n2[2]);
      }
      function da(n2, t3, r2) {
        return r2 && "number" != typeof r2 && Ui(n2, t3, r2) && (t3 = r2 = X), (r2 = r2 === X ? Un : r2 >>> 0) ? (n2 = Ec(n2), n2 && ("string" == typeof t3 || null != t3 && !Ah(t3)) && (t3 = vu(t3), !t3 && T(n2)) ? Ou(G(n2), 0, r2) : n2.split(t3, r2)) : [];
      }
      function ba(n2, t3, r2) {
        return n2 = Ec(n2), r2 = null == r2 ? 0 : Mr2(kc(r2), 0, n2.length), t3 = vu(t3), n2.slice(r2, r2 + t3.length) == t3;
      }
      function wa(n2, t3, r2) {
        var e2 = Z2.templateSettings;
        r2 && Ui(n2, t3, r2) && (t3 = X), n2 = Ec(n2), t3 = Sh({}, t3, e2, li);
        var u2, i2, o2 = Sh({}, t3.imports, e2.imports, li), f2 = Pc(o2), c2 = E(o2, f2), a2 = 0, l2 = t3.interpolate || Ht, s2 = "__p += '", h2 = sl((t3.escape || Ht).source + "|" + l2.source + "|" + (l2 === It ? Ft : Ht).source + "|" + (t3.evaluate || Ht).source + "|$", "g"), p3 = "//# sourceURL=" + (bl.call(t3, "sourceURL") ? (t3.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Zr + "]") + "\n";
        n2.replace(h2, function(t4, r3, e3, o3, f3, c3) {
          return e3 || (e3 = o3), s2 += n2.slice(a2, c3).replace(Jt, U), r3 && (u2 = true, s2 += "' +\n__e(" + r3 + ") +\n'"), f3 && (i2 = true, s2 += "';\n" + f3 + ";\n__p += '"), e3 && (s2 += "' +\n((__t = (" + e3 + ")) == null ? '' : __t) +\n'"), a2 = c3 + t4.length, t4;
        }), s2 += "';\n";
        var _3 = bl.call(t3, "variable") && t3.variable;
        if (_3) {
          if (Dt.test(_3)) throw new fl(un);
        } else s2 = "with (obj) {\n" + s2 + "\n}\n";
        s2 = (i2 ? s2.replace(dt, "") : s2).replace(bt, "$1").replace(wt, "$1;"), s2 = "function(" + (_3 || "obj") + ") {\n" + (_3 ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (u2 ? ", __e = _.escape" : "") + (i2 ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + s2 + "return __p\n}";
        var v2 = Xh(function() {
          return cl(f2, p3 + "return " + s2).apply(X, c2);
        });
        if (v2.source = s2, rc(v2)) throw v2;
        return v2;
      }
      function ma(n2) {
        return Ec(n2).toLowerCase();
      }
      function xa(n2) {
        return Ec(n2).toUpperCase();
      }
      function ja(n2, t3, r2) {
        if (n2 = Ec(n2), n2 && (r2 || t3 === X)) return R(n2);
        if (!n2 || !(t3 = vu(t3))) return n2;
        var e2 = G(n2), u2 = G(t3);
        return Ou(e2, W(e2, u2), L(e2, u2) + 1).join("");
      }
      function Aa(n2, t3, r2) {
        if (n2 = Ec(n2), n2 && (r2 || t3 === X)) return n2.slice(0, H(n2) + 1);
        if (!n2 || !(t3 = vu(t3))) return n2;
        var e2 = G(n2);
        return Ou(e2, 0, L(e2, G(t3)) + 1).join("");
      }
      function ka(n2, t3, r2) {
        if (n2 = Ec(n2), n2 && (r2 || t3 === X)) return n2.replace(Lt, "");
        if (!n2 || !(t3 = vu(t3))) return n2;
        var e2 = G(n2);
        return Ou(e2, W(e2, G(t3))).join("");
      }
      function Oa(n2, t3) {
        var r2 = An, e2 = kn;
        if (fc(t3)) {
          var u2 = "separator" in t3 ? t3.separator : u2;
          r2 = "length" in t3 ? kc(t3.length) : r2, e2 = "omission" in t3 ? vu(t3.omission) : e2;
        }
        n2 = Ec(n2);
        var i2 = n2.length;
        if (T(n2)) {
          var o2 = G(n2);
          i2 = o2.length;
        }
        if (r2 >= i2) return n2;
        var f2 = r2 - V(e2);
        if (f2 < 1) return e2;
        var c2 = o2 ? Ou(o2, 0, f2).join("") : n2.slice(0, f2);
        if (u2 === X) return c2 + e2;
        if (o2 && (f2 += c2.length - f2), Ah(u2)) {
          if (n2.slice(f2).search(u2)) {
            var a2, l2 = c2;
            for (u2.global || (u2 = sl(u2.source, Ec(Nt.exec(u2)) + "g")), u2.lastIndex = 0; a2 = u2.exec(l2); ) var s2 = a2.index;
            c2 = c2.slice(0, s2 === X ? f2 : s2);
          }
        } else if (n2.indexOf(vu(u2), f2) != f2) {
          var h2 = c2.lastIndexOf(u2);
          h2 > -1 && (c2 = c2.slice(0, h2));
        }
        return c2 + e2;
      }
      function Ia(n2) {
        return n2 = Ec(n2), n2 && jt.test(n2) ? n2.replace(mt, ye) : n2;
      }
      function Ra(n2, t3, r2) {
        return n2 = Ec(n2), t3 = r2 ? X : t3, t3 === X ? $(n2) ? Q(n2) : _2(n2) : n2.match(t3) || [];
      }
      function za(t3) {
        var r2 = null == t3 ? 0 : t3.length, e2 = mi();
        return t3 = r2 ? c(t3, function(n2) {
          if ("function" != typeof n2[1]) throw new pl(en);
          return [e2(n2[0]), n2[1]];
        }) : [], uu(function(e3) {
          for (var u2 = -1; ++u2 < r2; ) {
            var i2 = t3[u2];
            if (n(i2[0], this, e3)) return n(i2[1], this, e3);
          }
        });
      }
      function Ea(n2) {
        return Nr2(Fr2(n2, an));
      }
      function Sa(n2) {
        return function() {
          return n2;
        };
      }
      function Wa(n2, t3) {
        return null == n2 || n2 !== n2 ? t3 : n2;
      }
      function La(n2) {
        return n2;
      }
      function Ca(n2) {
        return De("function" == typeof n2 ? n2 : Fr2(n2, an));
      }
      function Ua(n2) {
        return qe(Fr2(n2, an));
      }
      function Ba(n2, t3) {
        return Ze(n2, Fr2(t3, an));
      }
      function Ta(n2, t3, e2) {
        var u2 = Pc(t3), i2 = fe2(t3, u2);
        null != e2 || fc(t3) && (i2.length || !u2.length) || (e2 = t3, t3 = n2, n2 = this, i2 = fe2(t3, Pc(t3)));
        var o2 = !(fc(e2) && "chain" in e2 && !e2.chain), f2 = uc(n2);
        return r(i2, function(r2) {
          var e3 = t3[r2];
          n2[r2] = e3, f2 && (n2.prototype[r2] = function() {
            var t4 = this.__chain__;
            if (o2 || t4) {
              var r3 = n2(this.__wrapped__);
              return (r3.__actions__ = Tu(this.__actions__)).push({ func: e3, args: arguments, thisArg: n2 }), r3.__chain__ = t4, r3;
            }
            return e3.apply(n2, a([this.value()], arguments));
          });
        }), n2;
      }
      function $a() {
        return re2._ === this && (re2._ = Al), this;
      }
      function Da() {
      }
      function Ma(n2) {
        return n2 = kc(n2), uu(function(t3) {
          return Ge(t3, n2);
        });
      }
      function Fa(n2) {
        return Bi(n2) ? m(no(n2)) : Qe(n2);
      }
      function Na(n2) {
        return function(t3) {
          return null == n2 ? X : _e2(n2, t3);
        };
      }
      function Pa() {
        return [];
      }
      function qa() {
        return false;
      }
      function Za() {
        return {};
      }
      function Ka() {
        return "";
      }
      function Va() {
        return true;
      }
      function Ga(n2, t3) {
        if (n2 = kc(n2), n2 < 1 || n2 > Wn) return [];
        var r2 = Un, e2 = Hl(n2, Un);
        t3 = mi(t3), n2 -= Un;
        for (var u2 = O(e2, t3); ++r2 < n2; ) t3(r2);
        return u2;
      }
      function Ha(n2) {
        return bh(n2) ? c(n2, no) : bc(n2) ? [n2] : Tu(Cs(Ec(n2)));
      }
      function Ja(n2) {
        var t3 = ++wl;
        return Ec(n2) + t3;
      }
      function Ya(n2) {
        return n2 && n2.length ? Yr2(n2, La, me) : X;
      }
      function Qa(n2, t3) {
        return n2 && n2.length ? Yr2(n2, mi(t3, 2), me) : X;
      }
      function Xa(n2) {
        return w(n2, La);
      }
      function nl(n2, t3) {
        return w(n2, mi(t3, 2));
      }
      function tl(n2) {
        return n2 && n2.length ? Yr2(n2, La, Ne) : X;
      }
      function rl(n2, t3) {
        return n2 && n2.length ? Yr2(n2, mi(t3, 2), Ne) : X;
      }
      function el(n2) {
        return n2 && n2.length ? k(n2, La) : 0;
      }
      function ul(n2, t3) {
        return n2 && n2.length ? k(n2, mi(t3, 2)) : 0;
      }
      x2 = null == x2 ? re2 : be.defaults(re2.Object(), x2, be.pick(re2, qr));
      var il = x2.Array, ol = x2.Date, fl = x2.Error, cl = x2.Function, al = x2.Math, ll = x2.Object, sl = x2.RegExp, hl = x2.String, pl = x2.TypeError, _l = il.prototype, vl = cl.prototype, gl = ll.prototype, yl = x2["__core-js_shared__"], dl = vl.toString, bl = gl.hasOwnProperty, wl = 0, ml = function() {
        var n2 = /[^.]+$/.exec(yl && yl.keys && yl.keys.IE_PROTO || "");
        return n2 ? "Symbol(src)_1." + n2 : "";
      }(), xl = gl.toString, jl = dl.call(ll), Al = re2._, kl = sl("^" + dl.call(bl).replace(St, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Ol = ie ? x2.Buffer : X, Il = x2.Symbol, Rl = x2.Uint8Array, zl = Ol ? Ol.allocUnsafe : X, El = F(ll.getPrototypeOf, ll), Sl = ll.create, Wl = gl.propertyIsEnumerable, Ll = _l.splice, Cl = Il ? Il.isConcatSpreadable : X, Ul = Il ? Il.iterator : X, Bl = Il ? Il.toStringTag : X, Tl = function() {
        try {
          var n2 = Ai(ll, "defineProperty");
          return n2({}, "", {}), n2;
        } catch (n3) {
        }
      }(), $l = x2.clearTimeout !== re2.clearTimeout && x2.clearTimeout, Dl = ol && ol.now !== re2.Date.now && ol.now, Ml = x2.setTimeout !== re2.setTimeout && x2.setTimeout, Fl = al.ceil, Nl = al.floor, Pl = ll.getOwnPropertySymbols, ql = Ol ? Ol.isBuffer : X, Zl = x2.isFinite, Kl = _l.join, Vl = F(ll.keys, ll), Gl = al.max, Hl = al.min, Jl = ol.now, Yl = x2.parseInt, Ql = al.random, Xl = _l.reverse, ns = Ai(x2, "DataView"), ts = Ai(x2, "Map"), rs = Ai(x2, "Promise"), es = Ai(x2, "Set"), us = Ai(x2, "WeakMap"), is = Ai(ll, "create"), os = us && new us(), fs = {}, cs = to(ns), as = to(ts), ls = to(rs), ss = to(es), hs = to(us), ps = Il ? Il.prototype : X, _s = ps ? ps.valueOf : X, vs = ps ? ps.toString : X, gs = /* @__PURE__ */ function() {
        function n2() {
        }
        return function(t3) {
          if (!fc(t3)) return {};
          if (Sl) return Sl(t3);
          n2.prototype = t3;
          var r2 = new n2();
          return n2.prototype = X, r2;
        };
      }();
      Z2.templateSettings = { escape: kt, evaluate: Ot, interpolate: It, variable: "", imports: { _: Z2 } }, Z2.prototype = J2.prototype, Z2.prototype.constructor = Z2, Y2.prototype = gs(J2.prototype), Y2.prototype.constructor = Y2, Ct2.prototype = gs(J2.prototype), Ct2.prototype.constructor = Ct2, Xt2.prototype.clear = nr2, Xt2.prototype.delete = tr2, Xt2.prototype.get = rr2, Xt2.prototype.has = er2, Xt2.prototype.set = ur2, ir2.prototype.clear = or2, ir2.prototype.delete = fr2, ir2.prototype.get = cr2, ir2.prototype.has = ar2, ir2.prototype.set = lr2, sr2.prototype.clear = hr2, sr2.prototype.delete = pr2, sr2.prototype.get = _r2, sr2.prototype.has = vr2, sr2.prototype.set = gr2, yr2.prototype.add = yr2.prototype.push = dr2, yr2.prototype.has = br2, wr2.prototype.clear = mr2, wr2.prototype.delete = xr2, wr2.prototype.get = jr2, wr2.prototype.has = Ar2, wr2.prototype.set = kr2;
      var ys = Pu(ue2), ds = Pu(oe2, true), bs = qu(), ws = qu(true), ms = os ? function(n2, t3) {
        return os.set(n2, t3), n2;
      } : La, xs = Tl ? function(n2, t3) {
        return Tl(n2, "toString", {
          configurable: true,
          enumerable: false,
          value: Sa(t3),
          writable: true
        });
      } : La, js = uu, As = $l || function(n2) {
        return re2.clearTimeout(n2);
      }, ks = es && 1 / P(new es([, -0]))[1] == Sn ? function(n2) {
        return new es(n2);
      } : Da, Os = os ? function(n2) {
        return os.get(n2);
      } : Da, Is = Pl ? function(n2) {
        return null == n2 ? [] : (n2 = ll(n2), i(Pl(n2), function(t3) {
          return Wl.call(n2, t3);
        }));
      } : Pa, Rs = Pl ? function(n2) {
        for (var t3 = []; n2; ) a(t3, Is(n2)), n2 = El(n2);
        return t3;
      } : Pa, zs = we;
      (ns && zs(new ns(new ArrayBuffer(1))) != ct || ts && zs(new ts()) != Gn || rs && zs(rs.resolve()) != Qn || es && zs(new es()) != tt || us && zs(new us()) != it) && (zs = function(n2) {
        var t3 = we(n2), r2 = t3 == Yn ? n2.constructor : X, e2 = r2 ? to(r2) : "";
        if (e2) switch (e2) {
          case cs:
            return ct;
          case as:
            return Gn;
          case ls:
            return Qn;
          case ss:
            return tt;
          case hs:
            return it;
        }
        return t3;
      });
      var Es = yl ? uc : qa, Ss = Qi(ms), Ws = Ml || function(n2, t3) {
        return re2.setTimeout(n2, t3);
      }, Ls = Qi(xs), Cs = Pi(function(n2) {
        var t3 = [];
        return 46 === n2.charCodeAt(0) && t3.push(""), n2.replace(Et, function(n3, r2, e2, u2) {
          t3.push(e2 ? u2.replace(Mt, "$1") : r2 || n3);
        }), t3;
      }), Us = uu(function(n2, t3) {
        return Jf(n2) ? Hr2(n2, ee2(t3, 1, Jf, true)) : [];
      }), Bs = uu(function(n2, t3) {
        var r2 = jo(t3);
        return Jf(r2) && (r2 = X), Jf(n2) ? Hr2(n2, ee2(t3, 1, Jf, true), mi(r2, 2)) : [];
      }), Ts = uu(function(n2, t3) {
        var r2 = jo(t3);
        return Jf(r2) && (r2 = X), Jf(n2) ? Hr2(n2, ee2(t3, 1, Jf, true), X, r2) : [];
      }), $s = uu(function(n2) {
        var t3 = c(n2, ju);
        return t3.length && t3[0] === n2[0] ? ke(t3) : [];
      }), Ds = uu(function(n2) {
        var t3 = jo(n2), r2 = c(n2, ju);
        return t3 === jo(r2) ? t3 = X : r2.pop(), r2.length && r2[0] === n2[0] ? ke(r2, mi(t3, 2)) : [];
      }), Ms = uu(function(n2) {
        var t3 = jo(n2), r2 = c(n2, ju);
        return t3 = "function" == typeof t3 ? t3 : X, t3 && r2.pop(), r2.length && r2[0] === n2[0] ? ke(r2, X, t3) : [];
      }), Fs = uu(Oo), Ns = gi(function(n2, t3) {
        var r2 = null == n2 ? 0 : n2.length, e2 = Tr2(n2, t3);
        return nu(n2, c(t3, function(n3) {
          return Ci(n3, r2) ? +n3 : n3;
        }).sort(Lu)), e2;
      }), Ps = uu(function(n2) {
        return gu(ee2(n2, 1, Jf, true));
      }), qs = uu(function(n2) {
        var t3 = jo(n2);
        return Jf(t3) && (t3 = X), gu(ee2(n2, 1, Jf, true), mi(t3, 2));
      }), Zs = uu(function(n2) {
        var t3 = jo(n2);
        return t3 = "function" == typeof t3 ? t3 : X, gu(ee2(n2, 1, Jf, true), X, t3);
      }), Ks = uu(function(n2, t3) {
        return Jf(n2) ? Hr2(n2, t3) : [];
      }), Vs = uu(function(n2) {
        return mu(i(n2, Jf));
      }), Gs = uu(function(n2) {
        var t3 = jo(n2);
        return Jf(t3) && (t3 = X), mu(i(n2, Jf), mi(t3, 2));
      }), Hs = uu(function(n2) {
        var t3 = jo(n2);
        return t3 = "function" == typeof t3 ? t3 : X, mu(i(n2, Jf), X, t3);
      }), Js = uu(Go), Ys = uu(function(n2) {
        var t3 = n2.length, r2 = t3 > 1 ? n2[t3 - 1] : X;
        return r2 = "function" == typeof r2 ? (n2.pop(), r2) : X, Ho(n2, r2);
      }), Qs = gi(function(n2) {
        var t3 = n2.length, r2 = t3 ? n2[0] : 0, e2 = this.__wrapped__, u2 = function(t4) {
          return Tr2(t4, n2);
        };
        return !(t3 > 1 || this.__actions__.length) && e2 instanceof Ct2 && Ci(r2) ? (e2 = e2.slice(r2, +r2 + (t3 ? 1 : 0)), e2.__actions__.push({ func: nf, args: [u2], thisArg: X }), new Y2(e2, this.__chain__).thru(function(n3) {
          return t3 && !n3.length && n3.push(X), n3;
        })) : this.thru(u2);
      }), Xs = Fu(function(n2, t3, r2) {
        bl.call(n2, r2) ? ++n2[r2] : Br2(n2, r2, 1);
      }), nh = Ju(ho), th = Ju(po), rh = Fu(function(n2, t3, r2) {
        bl.call(n2, r2) ? n2[r2].push(t3) : Br2(n2, r2, [t3]);
      }), eh = uu(function(t3, r2, e2) {
        var u2 = -1, i2 = "function" == typeof r2, o2 = Hf(t3) ? il(t3.length) : [];
        return ys(t3, function(t4) {
          o2[++u2] = i2 ? n(r2, t4, e2) : Ie(t4, r2, e2);
        }), o2;
      }), uh = Fu(function(n2, t3, r2) {
        Br2(n2, r2, t3);
      }), ih = Fu(function(n2, t3, r2) {
        n2[r2 ? 0 : 1].push(t3);
      }, function() {
        return [[], []];
      }), oh = uu(function(n2, t3) {
        if (null == n2) return [];
        var r2 = t3.length;
        return r2 > 1 && Ui(n2, t3[0], t3[1]) ? t3 = [] : r2 > 2 && Ui(t3[0], t3[1], t3[2]) && (t3 = [t3[0]]), He(n2, ee2(t3, 1), []);
      }), fh = Dl || function() {
        return re2.Date.now();
      }, ch = uu(function(n2, t3, r2) {
        var e2 = _n;
        if (r2.length) {
          var u2 = N(r2, wi(ch));
          e2 |= bn;
        }
        return ai(n2, e2, t3, r2, u2);
      }), ah = uu(function(n2, t3, r2) {
        var e2 = _n | vn;
        if (r2.length) {
          var u2 = N(r2, wi(ah));
          e2 |= bn;
        }
        return ai(t3, e2, n2, r2, u2);
      }), lh = uu(function(n2, t3) {
        return Gr2(n2, 1, t3);
      }), sh = uu(function(n2, t3, r2) {
        return Gr2(n2, Ic(t3) || 0, r2);
      });
      Cf.Cache = sr2;
      var hh = js(function(t3, r2) {
        r2 = 1 == r2.length && bh(r2[0]) ? c(r2[0], z(mi())) : c(ee2(r2, 1), z(mi()));
        var e2 = r2.length;
        return uu(function(u2) {
          for (var i2 = -1, o2 = Hl(u2.length, e2); ++i2 < o2; ) u2[i2] = r2[i2].call(this, u2[i2]);
          return n(t3, this, u2);
        });
      }), ph = uu(function(n2, t3) {
        return ai(n2, bn, X, t3, N(t3, wi(ph)));
      }), _h = uu(function(n2, t3) {
        return ai(n2, wn, X, t3, N(t3, wi(_h)));
      }), vh = gi(function(n2, t3) {
        return ai(n2, xn, X, X, X, t3);
      }), gh = ii(me), yh = ii(function(n2, t3) {
        return n2 >= t3;
      }), dh = Re(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Re : function(n2) {
        return cc(n2) && bl.call(n2, "callee") && !Wl.call(n2, "callee");
      }, bh = il.isArray, wh = ce ? z(ce) : ze, mh = ql || qa, xh = ae ? z(ae) : Ee, jh = le ? z(le) : Le, Ah = se ? z(se) : Be, kh = he ? z(he) : Te, Oh = pe ? z(pe) : $e, Ih = ii(Ne), Rh = ii(function(n2, t3) {
        return n2 <= t3;
      }), zh = Nu(function(n2, t3) {
        if (Mi(t3) || Hf(t3)) return $u(t3, Pc(t3), n2), X;
        for (var r2 in t3) bl.call(t3, r2) && Sr2(n2, r2, t3[r2]);
      }), Eh = Nu(function(n2, t3) {
        $u(t3, qc(t3), n2);
      }), Sh = Nu(function(n2, t3, r2, e2) {
        $u(t3, qc(t3), n2, e2);
      }), Wh = Nu(function(n2, t3, r2, e2) {
        $u(t3, Pc(t3), n2, e2);
      }), Lh = gi(Tr2), Ch = uu(function(n2, t3) {
        n2 = ll(n2);
        var r2 = -1, e2 = t3.length, u2 = e2 > 2 ? t3[2] : X;
        for (u2 && Ui(t3[0], t3[1], u2) && (e2 = 1); ++r2 < e2; ) for (var i2 = t3[r2], o2 = qc(i2), f2 = -1, c2 = o2.length; ++f2 < c2; ) {
          var a2 = o2[f2], l2 = n2[a2];
          (l2 === X || Gf(l2, gl[a2]) && !bl.call(n2, a2)) && (n2[a2] = i2[a2]);
        }
        return n2;
      }), Uh = uu(function(t3) {
        return t3.push(X, si), n(Mh, X, t3);
      }), Bh = Xu(function(n2, t3, r2) {
        null != t3 && "function" != typeof t3.toString && (t3 = xl.call(t3)), n2[t3] = r2;
      }, Sa(La)), Th = Xu(function(n2, t3, r2) {
        null != t3 && "function" != typeof t3.toString && (t3 = xl.call(t3)), bl.call(n2, t3) ? n2[t3].push(r2) : n2[t3] = [r2];
      }, mi), $h = uu(Ie), Dh = Nu(function(n2, t3, r2) {
        Ke(n2, t3, r2);
      }), Mh = Nu(function(n2, t3, r2, e2) {
        Ke(n2, t3, r2, e2);
      }), Fh = gi(function(n2, t3) {
        var r2 = {};
        if (null == n2) return r2;
        var e2 = false;
        t3 = c(t3, function(t4) {
          return t4 = ku(t4, n2), e2 || (e2 = t4.length > 1), t4;
        }), $u(n2, di(n2), r2), e2 && (r2 = Fr2(r2, an | ln | sn, hi));
        for (var u2 = t3.length; u2--; ) yu(r2, t3[u2]);
        return r2;
      }), Nh = gi(function(n2, t3) {
        return null == n2 ? {} : Je(n2, t3);
      }), Ph = ci(Pc), qh = ci(qc), Zh = Vu(function(n2, t3, r2) {
        return t3 = t3.toLowerCase(), n2 + (r2 ? fa(t3) : t3);
      }), Kh = Vu(function(n2, t3, r2) {
        return n2 + (r2 ? "-" : "") + t3.toLowerCase();
      }), Vh = Vu(function(n2, t3, r2) {
        return n2 + (r2 ? " " : "") + t3.toLowerCase();
      }), Gh = Ku("toLowerCase"), Hh = Vu(function(n2, t3, r2) {
        return n2 + (r2 ? "_" : "") + t3.toLowerCase();
      }), Jh = Vu(function(n2, t3, r2) {
        return n2 + (r2 ? " " : "") + Qh(t3);
      }), Yh = Vu(function(n2, t3, r2) {
        return n2 + (r2 ? " " : "") + t3.toUpperCase();
      }), Qh = Ku("toUpperCase"), Xh = uu(function(t3, r2) {
        try {
          return n(t3, X, r2);
        } catch (n2) {
          return rc(n2) ? n2 : new fl(n2);
        }
      }), np = gi(function(n2, t3) {
        return r(t3, function(t4) {
          t4 = no(t4), Br2(n2, t4, ch(n2[t4], n2));
        }), n2;
      }), tp = Yu(), rp = Yu(true), ep = uu(function(n2, t3) {
        return function(r2) {
          return Ie(r2, n2, t3);
        };
      }), up = uu(function(n2, t3) {
        return function(r2) {
          return Ie(n2, r2, t3);
        };
      }), ip = ti(c), op = ti(u), fp2 = ti(h), cp = ui(), ap = ui(true), lp = ni(function(n2, t3) {
        return n2 + t3;
      }, 0), sp = fi("ceil"), hp = ni(function(n2, t3) {
        return n2 / t3;
      }, 1), pp = fi("floor"), _p = ni(function(n2, t3) {
        return n2 * t3;
      }, 1), vp = fi("round"), gp = ni(function(n2, t3) {
        return n2 - t3;
      }, 0);
      return Z2.after = If, Z2.ary = Rf, Z2.assign = zh, Z2.assignIn = Eh, Z2.assignInWith = Sh, Z2.assignWith = Wh, Z2.at = Lh, Z2.before = zf, Z2.bind = ch, Z2.bindAll = np, Z2.bindKey = ah, Z2.castArray = Nf, Z2.chain = Qo, Z2.chunk = uo, Z2.compact = io, Z2.concat = oo, Z2.cond = za, Z2.conforms = Ea, Z2.constant = Sa, Z2.countBy = Xs, Z2.create = Sc, Z2.curry = Ef, Z2.curryRight = Sf, Z2.debounce = Wf, Z2.defaults = Ch, Z2.defaultsDeep = Uh, Z2.defer = lh, Z2.delay = sh, Z2.difference = Us, Z2.differenceBy = Bs, Z2.differenceWith = Ts, Z2.drop = fo, Z2.dropRight = co, Z2.dropRightWhile = ao, Z2.dropWhile = lo, Z2.fill = so, Z2.filter = lf, Z2.flatMap = sf, Z2.flatMapDeep = hf, Z2.flatMapDepth = pf, Z2.flatten = _o, Z2.flattenDeep = vo, Z2.flattenDepth = go, Z2.flip = Lf, Z2.flow = tp, Z2.flowRight = rp, Z2.fromPairs = yo, Z2.functions = $c, Z2.functionsIn = Dc, Z2.groupBy = rh, Z2.initial = mo, Z2.intersection = $s, Z2.intersectionBy = Ds, Z2.intersectionWith = Ms, Z2.invert = Bh, Z2.invertBy = Th, Z2.invokeMap = eh, Z2.iteratee = Ca, Z2.keyBy = uh, Z2.keys = Pc, Z2.keysIn = qc, Z2.map = yf, Z2.mapKeys = Zc, Z2.mapValues = Kc, Z2.matches = Ua, Z2.matchesProperty = Ba, Z2.memoize = Cf, Z2.merge = Dh, Z2.mergeWith = Mh, Z2.method = ep, Z2.methodOf = up, Z2.mixin = Ta, Z2.negate = Uf, Z2.nthArg = Ma, Z2.omit = Fh, Z2.omitBy = Vc, Z2.once = Bf, Z2.orderBy = df, Z2.over = ip, Z2.overArgs = hh, Z2.overEvery = op, Z2.overSome = fp2, Z2.partial = ph, Z2.partialRight = _h, Z2.partition = ih, Z2.pick = Nh, Z2.pickBy = Gc, Z2.property = Fa, Z2.propertyOf = Na, Z2.pull = Fs, Z2.pullAll = Oo, Z2.pullAllBy = Io, Z2.pullAllWith = Ro, Z2.pullAt = Ns, Z2.range = cp, Z2.rangeRight = ap, Z2.rearg = vh, Z2.reject = mf, Z2.remove = zo, Z2.rest = Tf, Z2.reverse = Eo, Z2.sampleSize = jf, Z2.set = Jc, Z2.setWith = Yc, Z2.shuffle = Af, Z2.slice = So, Z2.sortBy = oh, Z2.sortedUniq = $o, Z2.sortedUniqBy = Do, Z2.split = da, Z2.spread = $f, Z2.tail = Mo, Z2.take = Fo, Z2.takeRight = No, Z2.takeRightWhile = Po, Z2.takeWhile = qo, Z2.tap = Xo, Z2.throttle = Df, Z2.thru = nf, Z2.toArray = jc, Z2.toPairs = Ph, Z2.toPairsIn = qh, Z2.toPath = Ha, Z2.toPlainObject = Rc, Z2.transform = Qc, Z2.unary = Mf, Z2.union = Ps, Z2.unionBy = qs, Z2.unionWith = Zs, Z2.uniq = Zo, Z2.uniqBy = Ko, Z2.uniqWith = Vo, Z2.unset = Xc, Z2.unzip = Go, Z2.unzipWith = Ho, Z2.update = na, Z2.updateWith = ta, Z2.values = ra, Z2.valuesIn = ea, Z2.without = Ks, Z2.words = Ra, Z2.wrap = Ff, Z2.xor = Vs, Z2.xorBy = Gs, Z2.xorWith = Hs, Z2.zip = Js, Z2.zipObject = Jo, Z2.zipObjectDeep = Yo, Z2.zipWith = Ys, Z2.entries = Ph, Z2.entriesIn = qh, Z2.extend = Eh, Z2.extendWith = Sh, Ta(Z2, Z2), Z2.add = lp, Z2.attempt = Xh, Z2.camelCase = Zh, Z2.capitalize = fa, Z2.ceil = sp, Z2.clamp = ua, Z2.clone = Pf, Z2.cloneDeep = Zf, Z2.cloneDeepWith = Kf, Z2.cloneWith = qf, Z2.conformsTo = Vf, Z2.deburr = ca, Z2.defaultTo = Wa, Z2.divide = hp, Z2.endsWith = aa, Z2.eq = Gf, Z2.escape = la, Z2.escapeRegExp = sa, Z2.every = af, Z2.find = nh, Z2.findIndex = ho, Z2.findKey = Wc, Z2.findLast = th, Z2.findLastIndex = po, Z2.findLastKey = Lc, Z2.floor = pp, Z2.forEach = _f, Z2.forEachRight = vf, Z2.forIn = Cc, Z2.forInRight = Uc, Z2.forOwn = Bc, Z2.forOwnRight = Tc, Z2.get = Mc, Z2.gt = gh, Z2.gte = yh, Z2.has = Fc, Z2.hasIn = Nc, Z2.head = bo, Z2.identity = La, Z2.includes = gf, Z2.indexOf = wo, Z2.inRange = ia, Z2.invoke = $h, Z2.isArguments = dh, Z2.isArray = bh, Z2.isArrayBuffer = wh, Z2.isArrayLike = Hf, Z2.isArrayLikeObject = Jf, Z2.isBoolean = Yf, Z2.isBuffer = mh, Z2.isDate = xh, Z2.isElement = Qf, Z2.isEmpty = Xf, Z2.isEqual = nc, Z2.isEqualWith = tc, Z2.isError = rc, Z2.isFinite = ec, Z2.isFunction = uc, Z2.isInteger = ic, Z2.isLength = oc, Z2.isMap = jh, Z2.isMatch = ac, Z2.isMatchWith = lc, Z2.isNaN = sc, Z2.isNative = hc, Z2.isNil = _c, Z2.isNull = pc, Z2.isNumber = vc, Z2.isObject = fc, Z2.isObjectLike = cc, Z2.isPlainObject = gc, Z2.isRegExp = Ah, Z2.isSafeInteger = yc, Z2.isSet = kh, Z2.isString = dc, Z2.isSymbol = bc, Z2.isTypedArray = Oh, Z2.isUndefined = wc, Z2.isWeakMap = mc, Z2.isWeakSet = xc, Z2.join = xo, Z2.kebabCase = Kh, Z2.last = jo, Z2.lastIndexOf = Ao, Z2.lowerCase = Vh, Z2.lowerFirst = Gh, Z2.lt = Ih, Z2.lte = Rh, Z2.max = Ya, Z2.maxBy = Qa, Z2.mean = Xa, Z2.meanBy = nl, Z2.min = tl, Z2.minBy = rl, Z2.stubArray = Pa, Z2.stubFalse = qa, Z2.stubObject = Za, Z2.stubString = Ka, Z2.stubTrue = Va, Z2.multiply = _p, Z2.nth = ko, Z2.noConflict = $a, Z2.noop = Da, Z2.now = fh, Z2.pad = ha, Z2.padEnd = pa, Z2.padStart = _a, Z2.parseInt = va, Z2.random = oa, Z2.reduce = bf, Z2.reduceRight = wf, Z2.repeat = ga, Z2.replace = ya, Z2.result = Hc, Z2.round = vp, Z2.runInContext = p2, Z2.sample = xf, Z2.size = kf, Z2.snakeCase = Hh, Z2.some = Of, Z2.sortedIndex = Wo, Z2.sortedIndexBy = Lo, Z2.sortedIndexOf = Co, Z2.sortedLastIndex = Uo, Z2.sortedLastIndexBy = Bo, Z2.sortedLastIndexOf = To, Z2.startCase = Jh, Z2.startsWith = ba, Z2.subtract = gp, Z2.sum = el, Z2.sumBy = ul, Z2.template = wa, Z2.times = Ga, Z2.toFinite = Ac, Z2.toInteger = kc, Z2.toLength = Oc, Z2.toLower = ma, Z2.toNumber = Ic, Z2.toSafeInteger = zc, Z2.toString = Ec, Z2.toUpper = xa, Z2.trim = ja, Z2.trimEnd = Aa, Z2.trimStart = ka, Z2.truncate = Oa, Z2.unescape = Ia, Z2.uniqueId = Ja, Z2.upperCase = Yh, Z2.upperFirst = Qh, Z2.each = _f, Z2.eachRight = vf, Z2.first = bo, Ta(Z2, function() {
        var n2 = {};
        return ue2(Z2, function(t3, r2) {
          bl.call(Z2.prototype, r2) || (n2[r2] = t3);
        }), n2;
      }(), { chain: false }), Z2.VERSION = nn, r(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n2) {
        Z2[n2].placeholder = Z2;
      }), r(["drop", "take"], function(n2, t3) {
        Ct2.prototype[n2] = function(r2) {
          r2 = r2 === X ? 1 : Gl(kc(r2), 0);
          var e2 = this.__filtered__ && !t3 ? new Ct2(this) : this.clone();
          return e2.__filtered__ ? e2.__takeCount__ = Hl(r2, e2.__takeCount__) : e2.__views__.push({ size: Hl(r2, Un), type: n2 + (e2.__dir__ < 0 ? "Right" : "") }), e2;
        }, Ct2.prototype[n2 + "Right"] = function(t4) {
          return this.reverse()[n2](t4).reverse();
        };
      }), r(["filter", "map", "takeWhile"], function(n2, t3) {
        var r2 = t3 + 1, e2 = r2 == Rn || r2 == En;
        Ct2.prototype[n2] = function(n3) {
          var t4 = this.clone();
          return t4.__iteratees__.push({ iteratee: mi(n3, 3), type: r2 }), t4.__filtered__ = t4.__filtered__ || e2, t4;
        };
      }), r(["head", "last"], function(n2, t3) {
        var r2 = "take" + (t3 ? "Right" : "");
        Ct2.prototype[n2] = function() {
          return this[r2](1).value()[0];
        };
      }), r(["initial", "tail"], function(n2, t3) {
        var r2 = "drop" + (t3 ? "" : "Right");
        Ct2.prototype[n2] = function() {
          return this.__filtered__ ? new Ct2(this) : this[r2](1);
        };
      }), Ct2.prototype.compact = function() {
        return this.filter(La);
      }, Ct2.prototype.find = function(n2) {
        return this.filter(n2).head();
      }, Ct2.prototype.findLast = function(n2) {
        return this.reverse().find(n2);
      }, Ct2.prototype.invokeMap = uu(function(n2, t3) {
        return "function" == typeof n2 ? new Ct2(this) : this.map(function(r2) {
          return Ie(r2, n2, t3);
        });
      }), Ct2.prototype.reject = function(n2) {
        return this.filter(Uf(mi(n2)));
      }, Ct2.prototype.slice = function(n2, t3) {
        n2 = kc(n2);
        var r2 = this;
        return r2.__filtered__ && (n2 > 0 || t3 < 0) ? new Ct2(r2) : (n2 < 0 ? r2 = r2.takeRight(-n2) : n2 && (r2 = r2.drop(n2)), t3 !== X && (t3 = kc(t3), r2 = t3 < 0 ? r2.dropRight(-t3) : r2.take(t3 - n2)), r2);
      }, Ct2.prototype.takeRightWhile = function(n2) {
        return this.reverse().takeWhile(n2).reverse();
      }, Ct2.prototype.toArray = function() {
        return this.take(Un);
      }, ue2(Ct2.prototype, function(n2, t3) {
        var r2 = /^(?:filter|find|map|reject)|While$/.test(t3), e2 = /^(?:head|last)$/.test(t3), u2 = Z2[e2 ? "take" + ("last" == t3 ? "Right" : "") : t3], i2 = e2 || /^find/.test(t3);
        u2 && (Z2.prototype[t3] = function() {
          var t4 = this.__wrapped__, o2 = e2 ? [1] : arguments, f2 = t4 instanceof Ct2, c2 = o2[0], l2 = f2 || bh(t4), s2 = function(n3) {
            var t5 = u2.apply(Z2, a([n3], o2));
            return e2 && h2 ? t5[0] : t5;
          };
          l2 && r2 && "function" == typeof c2 && 1 != c2.length && (f2 = l2 = false);
          var h2 = this.__chain__, p3 = !!this.__actions__.length, _3 = i2 && !h2, v2 = f2 && !p3;
          if (!i2 && l2) {
            t4 = v2 ? t4 : new Ct2(this);
            var g2 = n2.apply(t4, o2);
            return g2.__actions__.push({ func: nf, args: [s2], thisArg: X }), new Y2(g2, h2);
          }
          return _3 && v2 ? n2.apply(this, o2) : (g2 = this.thru(s2), _3 ? e2 ? g2.value()[0] : g2.value() : g2);
        });
      }), r(["pop", "push", "shift", "sort", "splice", "unshift"], function(n2) {
        var t3 = _l[n2], r2 = /^(?:push|sort|unshift)$/.test(n2) ? "tap" : "thru", e2 = /^(?:pop|shift)$/.test(n2);
        Z2.prototype[n2] = function() {
          var n3 = arguments;
          if (e2 && !this.__chain__) {
            var u2 = this.value();
            return t3.apply(bh(u2) ? u2 : [], n3);
          }
          return this[r2](function(r3) {
            return t3.apply(bh(r3) ? r3 : [], n3);
          });
        };
      }), ue2(Ct2.prototype, function(n2, t3) {
        var r2 = Z2[t3];
        if (r2) {
          var e2 = r2.name + "";
          bl.call(fs, e2) || (fs[e2] = []), fs[e2].push({ name: t3, func: r2 });
        }
      }), fs[Qu(X, vn).name] = [{ name: "wrapper", func: X }], Ct2.prototype.clone = $t2, Ct2.prototype.reverse = Yt2, Ct2.prototype.value = Qt2, Z2.prototype.at = Qs, Z2.prototype.chain = tf, Z2.prototype.commit = rf, Z2.prototype.next = ef, Z2.prototype.plant = of, Z2.prototype.reverse = ff, Z2.prototype.toJSON = Z2.prototype.valueOf = Z2.prototype.value = cf, Z2.prototype.first = Z2.prototype.head, Ul && (Z2.prototype[Ul] = uf), Z2;
    }, be = de();
    ue ? ((ue.exports = be)._ = be, ee._ = be) : re2._ = be;
  }).call(commonjsGlobal);
})(lodash_min, lodash_min.exports);
var lodash_minExports = lodash_min.exports;
var _mapping = {};
(function(exports) {
  exports.aliasToReal = {
    // Lodash aliases.
    "each": "forEach",
    "eachRight": "forEachRight",
    "entries": "toPairs",
    "entriesIn": "toPairsIn",
    "extend": "assignIn",
    "extendAll": "assignInAll",
    "extendAllWith": "assignInAllWith",
    "extendWith": "assignInWith",
    "first": "head",
    // Methods that are curried variants of others.
    "conforms": "conformsTo",
    "matches": "isMatch",
    "property": "get",
    // Ramda aliases.
    "__": "placeholder",
    "F": "stubFalse",
    "T": "stubTrue",
    "all": "every",
    "allPass": "overEvery",
    "always": "constant",
    "any": "some",
    "anyPass": "overSome",
    "apply": "spread",
    "assoc": "set",
    "assocPath": "set",
    "complement": "negate",
    "compose": "flowRight",
    "contains": "includes",
    "dissoc": "unset",
    "dissocPath": "unset",
    "dropLast": "dropRight",
    "dropLastWhile": "dropRightWhile",
    "equals": "isEqual",
    "identical": "eq",
    "indexBy": "keyBy",
    "init": "initial",
    "invertObj": "invert",
    "juxt": "over",
    "omitAll": "omit",
    "nAry": "ary",
    "path": "get",
    "pathEq": "matchesProperty",
    "pathOr": "getOr",
    "paths": "at",
    "pickAll": "pick",
    "pipe": "flow",
    "pluck": "map",
    "prop": "get",
    "propEq": "matchesProperty",
    "propOr": "getOr",
    "props": "at",
    "symmetricDifference": "xor",
    "symmetricDifferenceBy": "xorBy",
    "symmetricDifferenceWith": "xorWith",
    "takeLast": "takeRight",
    "takeLastWhile": "takeRightWhile",
    "unapply": "rest",
    "unnest": "flatten",
    "useWith": "overArgs",
    "where": "conformsTo",
    "whereEq": "isMatch",
    "zipObj": "zipObject"
  };
  exports.aryMethod = {
    "1": [
      "assignAll",
      "assignInAll",
      "attempt",
      "castArray",
      "ceil",
      "create",
      "curry",
      "curryRight",
      "defaultsAll",
      "defaultsDeepAll",
      "floor",
      "flow",
      "flowRight",
      "fromPairs",
      "invert",
      "iteratee",
      "memoize",
      "method",
      "mergeAll",
      "methodOf",
      "mixin",
      "nthArg",
      "over",
      "overEvery",
      "overSome",
      "rest",
      "reverse",
      "round",
      "runInContext",
      "spread",
      "template",
      "trim",
      "trimEnd",
      "trimStart",
      "uniqueId",
      "words",
      "zipAll"
    ],
    "2": [
      "add",
      "after",
      "ary",
      "assign",
      "assignAllWith",
      "assignIn",
      "assignInAllWith",
      "at",
      "before",
      "bind",
      "bindAll",
      "bindKey",
      "chunk",
      "cloneDeepWith",
      "cloneWith",
      "concat",
      "conformsTo",
      "countBy",
      "curryN",
      "curryRightN",
      "debounce",
      "defaults",
      "defaultsDeep",
      "defaultTo",
      "delay",
      "difference",
      "divide",
      "drop",
      "dropRight",
      "dropRightWhile",
      "dropWhile",
      "endsWith",
      "eq",
      "every",
      "filter",
      "find",
      "findIndex",
      "findKey",
      "findLast",
      "findLastIndex",
      "findLastKey",
      "flatMap",
      "flatMapDeep",
      "flattenDepth",
      "forEach",
      "forEachRight",
      "forIn",
      "forInRight",
      "forOwn",
      "forOwnRight",
      "get",
      "groupBy",
      "gt",
      "gte",
      "has",
      "hasIn",
      "includes",
      "indexOf",
      "intersection",
      "invertBy",
      "invoke",
      "invokeMap",
      "isEqual",
      "isMatch",
      "join",
      "keyBy",
      "lastIndexOf",
      "lt",
      "lte",
      "map",
      "mapKeys",
      "mapValues",
      "matchesProperty",
      "maxBy",
      "meanBy",
      "merge",
      "mergeAllWith",
      "minBy",
      "multiply",
      "nth",
      "omit",
      "omitBy",
      "overArgs",
      "pad",
      "padEnd",
      "padStart",
      "parseInt",
      "partial",
      "partialRight",
      "partition",
      "pick",
      "pickBy",
      "propertyOf",
      "pull",
      "pullAll",
      "pullAt",
      "random",
      "range",
      "rangeRight",
      "rearg",
      "reject",
      "remove",
      "repeat",
      "restFrom",
      "result",
      "sampleSize",
      "some",
      "sortBy",
      "sortedIndex",
      "sortedIndexOf",
      "sortedLastIndex",
      "sortedLastIndexOf",
      "sortedUniqBy",
      "split",
      "spreadFrom",
      "startsWith",
      "subtract",
      "sumBy",
      "take",
      "takeRight",
      "takeRightWhile",
      "takeWhile",
      "tap",
      "throttle",
      "thru",
      "times",
      "trimChars",
      "trimCharsEnd",
      "trimCharsStart",
      "truncate",
      "union",
      "uniqBy",
      "uniqWith",
      "unset",
      "unzipWith",
      "without",
      "wrap",
      "xor",
      "zip",
      "zipObject",
      "zipObjectDeep"
    ],
    "3": [
      "assignInWith",
      "assignWith",
      "clamp",
      "differenceBy",
      "differenceWith",
      "findFrom",
      "findIndexFrom",
      "findLastFrom",
      "findLastIndexFrom",
      "getOr",
      "includesFrom",
      "indexOfFrom",
      "inRange",
      "intersectionBy",
      "intersectionWith",
      "invokeArgs",
      "invokeArgsMap",
      "isEqualWith",
      "isMatchWith",
      "flatMapDepth",
      "lastIndexOfFrom",
      "mergeWith",
      "orderBy",
      "padChars",
      "padCharsEnd",
      "padCharsStart",
      "pullAllBy",
      "pullAllWith",
      "rangeStep",
      "rangeStepRight",
      "reduce",
      "reduceRight",
      "replace",
      "set",
      "slice",
      "sortedIndexBy",
      "sortedLastIndexBy",
      "transform",
      "unionBy",
      "unionWith",
      "update",
      "xorBy",
      "xorWith",
      "zipWith"
    ],
    "4": [
      "fill",
      "setWith",
      "updateWith"
    ]
  };
  exports.aryRearg = {
    "2": [1, 0],
    "3": [2, 0, 1],
    "4": [3, 2, 0, 1]
  };
  exports.iterateeAry = {
    "dropRightWhile": 1,
    "dropWhile": 1,
    "every": 1,
    "filter": 1,
    "find": 1,
    "findFrom": 1,
    "findIndex": 1,
    "findIndexFrom": 1,
    "findKey": 1,
    "findLast": 1,
    "findLastFrom": 1,
    "findLastIndex": 1,
    "findLastIndexFrom": 1,
    "findLastKey": 1,
    "flatMap": 1,
    "flatMapDeep": 1,
    "flatMapDepth": 1,
    "forEach": 1,
    "forEachRight": 1,
    "forIn": 1,
    "forInRight": 1,
    "forOwn": 1,
    "forOwnRight": 1,
    "map": 1,
    "mapKeys": 1,
    "mapValues": 1,
    "partition": 1,
    "reduce": 2,
    "reduceRight": 2,
    "reject": 1,
    "remove": 1,
    "some": 1,
    "takeRightWhile": 1,
    "takeWhile": 1,
    "times": 1,
    "transform": 2
  };
  exports.iterateeRearg = {
    "mapKeys": [1],
    "reduceRight": [1, 0]
  };
  exports.methodRearg = {
    "assignInAllWith": [1, 0],
    "assignInWith": [1, 2, 0],
    "assignAllWith": [1, 0],
    "assignWith": [1, 2, 0],
    "differenceBy": [1, 2, 0],
    "differenceWith": [1, 2, 0],
    "getOr": [2, 1, 0],
    "intersectionBy": [1, 2, 0],
    "intersectionWith": [1, 2, 0],
    "isEqualWith": [1, 2, 0],
    "isMatchWith": [2, 1, 0],
    "mergeAllWith": [1, 0],
    "mergeWith": [1, 2, 0],
    "padChars": [2, 1, 0],
    "padCharsEnd": [2, 1, 0],
    "padCharsStart": [2, 1, 0],
    "pullAllBy": [2, 1, 0],
    "pullAllWith": [2, 1, 0],
    "rangeStep": [1, 2, 0],
    "rangeStepRight": [1, 2, 0],
    "setWith": [3, 1, 2, 0],
    "sortedIndexBy": [2, 1, 0],
    "sortedLastIndexBy": [2, 1, 0],
    "unionBy": [1, 2, 0],
    "unionWith": [1, 2, 0],
    "updateWith": [3, 1, 2, 0],
    "xorBy": [1, 2, 0],
    "xorWith": [1, 2, 0],
    "zipWith": [1, 2, 0]
  };
  exports.methodSpread = {
    "assignAll": { "start": 0 },
    "assignAllWith": { "start": 0 },
    "assignInAll": { "start": 0 },
    "assignInAllWith": { "start": 0 },
    "defaultsAll": { "start": 0 },
    "defaultsDeepAll": { "start": 0 },
    "invokeArgs": { "start": 2 },
    "invokeArgsMap": { "start": 2 },
    "mergeAll": { "start": 0 },
    "mergeAllWith": { "start": 0 },
    "partial": { "start": 1 },
    "partialRight": { "start": 1 },
    "without": { "start": 1 },
    "zipAll": { "start": 0 }
  };
  exports.mutate = {
    "array": {
      "fill": true,
      "pull": true,
      "pullAll": true,
      "pullAllBy": true,
      "pullAllWith": true,
      "pullAt": true,
      "remove": true,
      "reverse": true
    },
    "object": {
      "assign": true,
      "assignAll": true,
      "assignAllWith": true,
      "assignIn": true,
      "assignInAll": true,
      "assignInAllWith": true,
      "assignInWith": true,
      "assignWith": true,
      "defaults": true,
      "defaultsAll": true,
      "defaultsDeep": true,
      "defaultsDeepAll": true,
      "merge": true,
      "mergeAll": true,
      "mergeAllWith": true,
      "mergeWith": true
    },
    "set": {
      "set": true,
      "setWith": true,
      "unset": true,
      "update": true,
      "updateWith": true
    }
  };
  exports.realToAlias = function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty, object = exports.aliasToReal, result = {};
    for (var key in object) {
      var value = object[key];
      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }
    return result;
  }();
  exports.remap = {
    "assignAll": "assign",
    "assignAllWith": "assignWith",
    "assignInAll": "assignIn",
    "assignInAllWith": "assignInWith",
    "curryN": "curry",
    "curryRightN": "curryRight",
    "defaultsAll": "defaults",
    "defaultsDeepAll": "defaultsDeep",
    "findFrom": "find",
    "findIndexFrom": "findIndex",
    "findLastFrom": "findLast",
    "findLastIndexFrom": "findLastIndex",
    "getOr": "get",
    "includesFrom": "includes",
    "indexOfFrom": "indexOf",
    "invokeArgs": "invoke",
    "invokeArgsMap": "invokeMap",
    "lastIndexOfFrom": "lastIndexOf",
    "mergeAll": "merge",
    "mergeAllWith": "mergeWith",
    "padChars": "pad",
    "padCharsEnd": "padEnd",
    "padCharsStart": "padStart",
    "propertyOf": "get",
    "rangeStep": "range",
    "rangeStepRight": "rangeRight",
    "restFrom": "rest",
    "spreadFrom": "spread",
    "trimChars": "trim",
    "trimCharsEnd": "trimEnd",
    "trimCharsStart": "trimStart",
    "zipAll": "zip"
  };
  exports.skipFixed = {
    "castArray": true,
    "flow": true,
    "flowRight": true,
    "iteratee": true,
    "mixin": true,
    "rearg": true,
    "runInContext": true
  };
  exports.skipRearg = {
    "add": true,
    "assign": true,
    "assignIn": true,
    "bind": true,
    "bindKey": true,
    "concat": true,
    "difference": true,
    "divide": true,
    "eq": true,
    "gt": true,
    "gte": true,
    "isEqual": true,
    "lt": true,
    "lte": true,
    "matchesProperty": true,
    "merge": true,
    "multiply": true,
    "overArgs": true,
    "partial": true,
    "partialRight": true,
    "propertyOf": true,
    "random": true,
    "range": true,
    "rangeRight": true,
    "subtract": true,
    "zip": true,
    "zipObject": true,
    "zipObjectDeep": true
  };
})(_mapping);
var placeholder = {};
var mapping = _mapping, fallbackHolder = placeholder;
var push$1 = Array.prototype.push;
function baseArity(func, n) {
  return n == 2 ? function(a, b) {
    return func.apply(void 0, arguments);
  } : function(a) {
    return func.apply(void 0, arguments);
  };
}
function baseAry(func, n) {
  return n == 2 ? function(a, b) {
    return func(a, b);
  } : function(a) {
    return func(a);
  };
}
function cloneArray(array) {
  var length = array ? array.length : 0, result = Array(length);
  while (length--) {
    result[length] = array[length];
  }
  return result;
}
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}
function flatSpread(func, start) {
  return function() {
    var length = arguments.length, lastIndex = length - 1, args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start], otherArgs = args.slice(0, start);
    if (array) {
      push$1.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push$1.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(void 0, args);
    func.apply(void 0, args);
    return result;
  };
}
function baseConvert(util, name2, func, options) {
  var isLib = typeof name2 == "function", isObj = name2 === Object(name2);
  if (isObj) {
    options = func;
    func = name2;
    name2 = void 0;
  }
  if (func == null) {
    throw new TypeError();
  }
  options || (options = {});
  var config = {
    "cap": "cap" in options ? options.cap : true,
    "curry": "curry" in options ? options.curry : true,
    "fixed": "fixed" in options ? options.fixed : true,
    "immutable": "immutable" in options ? options.immutable : true,
    "rearg": "rearg" in options ? options.rearg : true
  };
  var defaultHolder = isLib ? func : fallbackHolder, forceCurry = "curry" in options && options.curry, forceFixed = "fixed" in options && options.fixed, forceRearg = "rearg" in options && options.rearg, pristine = isLib ? func.runInContext() : void 0;
  var helpers = isLib ? func : {
    "ary": util.ary,
    "assign": util.assign,
    "clone": util.clone,
    "curry": util.curry,
    "forEach": util.forEach,
    "isArray": util.isArray,
    "isError": util.isError,
    "isFunction": util.isFunction,
    "isWeakMap": util.isWeakMap,
    "iteratee": util.iteratee,
    "keys": util.keys,
    "rearg": util.rearg,
    "toInteger": util.toInteger,
    "toPath": util.toPath
  };
  var ary = helpers.ary, assign = helpers.assign, clone = helpers.clone, curry = helpers.curry, each = helpers.forEach, isArray = helpers.isArray, isError = helpers.isError, isFunction = helpers.isFunction, isWeakMap = helpers.isWeakMap, keys = helpers.keys, rearg = helpers.rearg, toInteger2 = helpers.toInteger, toPath = helpers.toPath;
  var aryMethodKeys = keys(mapping.aryMethod);
  var wrappers = {
    "castArray": function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value) ? castArray(cloneArray(value)) : castArray.apply(void 0, arguments);
      };
    },
    "iteratee": function(iteratee) {
      return function() {
        var func2 = arguments[0], arity = arguments[1], result = iteratee(func2, arity), length = result.length;
        if (config.cap && typeof arity == "number") {
          arity = arity > 2 ? arity - 2 : 1;
          return length && length <= arity ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    "mixin": function(mixin) {
      return function(source) {
        var func2 = this;
        if (!isFunction(func2)) {
          return mixin(func2, Object(source));
        }
        var pairs2 = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs2.push([key, func2.prototype[key]]);
          }
        });
        mixin(func2, Object(source));
        each(pairs2, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func2.prototype[pair[0]] = value;
          } else {
            delete func2.prototype[pair[0]];
          }
        });
        return func2;
      };
    },
    "nthArg": function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : toInteger2(n) + 1;
        return curry(nthArg(n), arity);
      };
    },
    "rearg": function(rearg2) {
      return function(func2, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg2(func2, indexes), arity);
      };
    },
    "runInContext": function(runInContext) {
      return function(context) {
        return baseConvert(util, runInContext(context), options);
      };
    }
  };
  function castCap(name3, func2) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name3];
      if (indexes) {
        return iterateeRearg(func2, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name3];
      if (n) {
        return iterateeAry(func2, n);
      }
    }
    return func2;
  }
  function castCurry(name3, func2, n) {
    return forceCurry || config.curry && n > 1 ? curry(func2, n) : func2;
  }
  function castFixed(name3, func2, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name3])) {
      var data = mapping.methodSpread[name3], start = data && data.start;
      return start === void 0 ? ary(func2, n) : flatSpread(func2, start);
    }
    return func2;
  }
  function castRearg(name3, func2, n) {
    return config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name3]) ? rearg(func2, mapping.methodRearg[name3] || mapping.aryRearg[n]) : func2;
  }
  function cloneByPath(object, path) {
    path = toPath(path);
    var index2 = -1, length = path.length, lastIndex = length - 1, result = clone(Object(object)), nested = result;
    while (nested != null && ++index2 < length) {
      var key = path[index2], value = nested[key];
      if (value != null && !(isFunction(value) || isError(value) || isWeakMap(value))) {
        nested[key] = clone(index2 == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }
  function convertLib(options2) {
    return _2.runInContext.convert(options2)(void 0);
  }
  function createConverter(name3, func2) {
    var realName = mapping.aliasToReal[name3] || name3, methodName = mapping.remap[realName] || realName, oldOptions = options;
    return function(options2) {
      var newUtil = isLib ? pristine : helpers, newFunc = isLib ? pristine[methodName] : func2, newOptions = assign(assign({}, oldOptions), options2);
      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }
  function iterateeAry(func2, n) {
    return overArg(func2, function(func3) {
      return typeof func3 == "function" ? baseAry(func3, n) : func3;
    });
  }
  function iterateeRearg(func2, indexes) {
    return overArg(func2, function(func3) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func3, n), indexes), n);
    });
  }
  function overArg(func2, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func2();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index2 = config.rearg ? 0 : length - 1;
      args[index2] = transform(args[index2]);
      return func2.apply(void 0, args);
    };
  }
  function wrap(name3, func2, placeholder2) {
    var result, realName = mapping.aliasToReal[name3] || name3, wrapped = func2, wrapper = wrappers[realName];
    if (wrapper) {
      wrapped = wrapper(func2);
    } else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func2, cloneArray);
      } else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func2, createCloner(func2));
      } else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func2, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName], afterRearg = data && data.afterRearg;
          result = afterRearg ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey) : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);
          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });
    result || (result = wrapped);
    if (result == func2) {
      result = forceCurry ? curry(result, 1) : function() {
        return func2.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func2);
    result.placeholder = func2.placeholder = placeholder2;
    return result;
  }
  if (!isObj) {
    return wrap(name2, func, defaultHolder);
  }
  var _2 = func;
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func2 = _2[mapping.remap[key] || key];
      if (func2) {
        pairs.push([key, wrap(key, func2, _2)]);
      }
    });
  });
  each(keys(_2), function(key) {
    var func2 = _2[key];
    if (typeof func2 == "function") {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func2.convert = createConverter(key, func2);
      pairs.push([key, func2]);
    }
  });
  each(pairs, function(pair) {
    _2[pair[0]] = pair[1];
  });
  _2.convert = convertLib;
  _2.placeholder = _2;
  each(keys(_2), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _2[alias] = _2[key];
    });
  });
  return _2;
}
var _baseConvert = baseConvert;
var _ = lodash_minExports.runInContext();
var fp = _baseConvert(_, _);
const getAdminService = (name2, { strapi: strapi2 } = { strapi: global.strapi }) => {
  return strapi2.service(`admin::${name2}`);
};
const getService = (name2, { strapi: strapi2 } = { strapi: global.strapi }) => {
  return strapi2.plugin("review-workflows").service(name2);
};
var re$2 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
const RELEASE_TYPES = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var constants$1 = {
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const debug$1 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
(function(module, exports) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
    MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
    MAX_LENGTH: MAX_LENGTH2
  } = constants$1;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const safeRe = exports.safeRe = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
  const safeRegexReplacements = [
    ["\\s", 1],
    ["\\d", MAX_LENGTH2],
    [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]
  ];
  const makeSafeRegex = (value) => {
    for (const [token, max] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
  };
  const createToken = (name2, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index2 = R++;
    debug2(name2, index2, value);
    t2[name2] = index2;
    src[index2] = value;
    re2[index2] = new RegExp(value, isGlobal ? "g" : void 0);
    safeRe[index2] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$2, re$2.exports);
var reExports = re$2.exports;
const looseOption = Object.freeze({ loose: true });
const emptyOpts = Object.freeze({});
const parseOptions$1 = (options) => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== "object") {
    return looseOption;
  }
  return options;
};
var parseOptions_1 = parseOptions$1;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers$1 = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1;
const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants$1;
const { safeRe: re$1, t: t$1 } = reExports;
const parseOptions = parseOptions_1;
const { compareIdentifiers } = identifiers$1;
let SemVer$d = class SemVer {
  constructor(version, options) {
    options = parseOptions(options);
    if (version instanceof SemVer) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      );
    }
    debug("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier, identifierBase);
        this.inc("pre", identifier, identifierBase);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier, identifierBase);
        }
        this.inc("pre", identifier, identifierBase);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre": {
        const base = Number(identifierBase) ? 1 : 0;
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (this.prerelease.length === 0) {
          this.prerelease = [base];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            if (identifier === this.prerelease.join(".") && identifierBase === false) {
              throw new Error("invalid increment argument: identifier already exists");
            }
            this.prerelease.push(base);
          }
        }
        if (identifier) {
          let prerelease2 = [identifier, base];
          if (identifierBase === false) {
            prerelease2 = [identifier];
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease2;
            }
          } else {
            this.prerelease = prerelease2;
          }
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join(".")}`;
    }
    return this;
  }
};
var semver$2 = SemVer$d;
const SemVer$c = semver$2;
const parse$6 = (version, options, throwErrors = false) => {
  if (version instanceof SemVer$c) {
    return version;
  }
  try {
    return new SemVer$c(version, options);
  } catch (er) {
    if (!throwErrors) {
      return null;
    }
    throw er;
  }
};
var parse_1 = parse$6;
const parse$5 = parse_1;
const valid$2 = (version, options) => {
  const v = parse$5(version, options);
  return v ? v.version : null;
};
var valid_1 = valid$2;
const parse$4 = parse_1;
const clean$1 = (version, options) => {
  const s = parse$4(version.trim().replace(/^[=v]+/, ""), options);
  return s ? s.version : null;
};
var clean_1 = clean$1;
const SemVer$b = semver$2;
const inc$1 = (version, release, options, identifier, identifierBase) => {
  if (typeof options === "string") {
    identifierBase = identifier;
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer$b(
      version instanceof SemVer$b ? version.version : version,
      options
    ).inc(release, identifier, identifierBase).version;
  } catch (er) {
    return null;
  }
};
var inc_1 = inc$1;
const parse$3 = parse_1;
const diff$1 = (version1, version2) => {
  const v1 = parse$3(version1, null, true);
  const v2 = parse$3(version2, null, true);
  const comparison = v1.compare(v2);
  if (comparison === 0) {
    return null;
  }
  const v1Higher = comparison > 0;
  const highVersion = v1Higher ? v1 : v2;
  const lowVersion = v1Higher ? v2 : v1;
  const highHasPre = !!highVersion.prerelease.length;
  const lowHasPre = !!lowVersion.prerelease.length;
  if (lowHasPre && !highHasPre) {
    if (!lowVersion.patch && !lowVersion.minor) {
      return "major";
    }
    if (highVersion.patch) {
      return "patch";
    }
    if (highVersion.minor) {
      return "minor";
    }
    return "major";
  }
  const prefix = highHasPre ? "pre" : "";
  if (v1.major !== v2.major) {
    return prefix + "major";
  }
  if (v1.minor !== v2.minor) {
    return prefix + "minor";
  }
  if (v1.patch !== v2.patch) {
    return prefix + "patch";
  }
  return "prerelease";
};
var diff_1 = diff$1;
const SemVer$a = semver$2;
const major$1 = (a, loose) => new SemVer$a(a, loose).major;
var major_1 = major$1;
const SemVer$9 = semver$2;
const minor$1 = (a, loose) => new SemVer$9(a, loose).minor;
var minor_1 = minor$1;
const SemVer$8 = semver$2;
const patch$1 = (a, loose) => new SemVer$8(a, loose).patch;
var patch_1 = patch$1;
const parse$2 = parse_1;
const prerelease$1 = (version, options) => {
  const parsed = parse$2(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
var prerelease_1 = prerelease$1;
const SemVer$7 = semver$2;
const compare$b = (a, b, loose) => new SemVer$7(a, loose).compare(new SemVer$7(b, loose));
var compare_1 = compare$b;
const compare$a = compare_1;
const rcompare$1 = (a, b, loose) => compare$a(b, a, loose);
var rcompare_1 = rcompare$1;
const compare$9 = compare_1;
const compareLoose$1 = (a, b) => compare$9(a, b, true);
var compareLoose_1 = compareLoose$1;
const SemVer$6 = semver$2;
const compareBuild$3 = (a, b, loose) => {
  const versionA = new SemVer$6(a, loose);
  const versionB = new SemVer$6(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
var compareBuild_1 = compareBuild$3;
const compareBuild$2 = compareBuild_1;
const sort$1 = (list, loose) => list.sort((a, b) => compareBuild$2(a, b, loose));
var sort_1 = sort$1;
const compareBuild$1 = compareBuild_1;
const rsort$1 = (list, loose) => list.sort((a, b) => compareBuild$1(b, a, loose));
var rsort_1 = rsort$1;
const compare$8 = compare_1;
const gt$4 = (a, b, loose) => compare$8(a, b, loose) > 0;
var gt_1 = gt$4;
const compare$7 = compare_1;
const lt$3 = (a, b, loose) => compare$7(a, b, loose) < 0;
var lt_1 = lt$3;
const compare$6 = compare_1;
const eq$2 = (a, b, loose) => compare$6(a, b, loose) === 0;
var eq_1 = eq$2;
const compare$5 = compare_1;
const neq$2 = (a, b, loose) => compare$5(a, b, loose) !== 0;
var neq_1 = neq$2;
const compare$4 = compare_1;
const gte$3 = (a, b, loose) => compare$4(a, b, loose) >= 0;
var gte_1 = gte$3;
const compare$3 = compare_1;
const lte$3 = (a, b, loose) => compare$3(a, b, loose) <= 0;
var lte_1 = lte$3;
const eq$1 = eq_1;
const neq$1 = neq_1;
const gt$3 = gt_1;
const gte$2 = gte_1;
const lt$2 = lt_1;
const lte$2 = lte_1;
const cmp$1 = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a === b;
    case "!==":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq$1(a, b, loose);
    case "!=":
      return neq$1(a, b, loose);
    case ">":
      return gt$3(a, b, loose);
    case ">=":
      return gte$2(a, b, loose);
    case "<":
      return lt$2(a, b, loose);
    case "<=":
      return lte$2(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp$1;
const SemVer$5 = semver$2;
const parse$1 = parse_1;
const { safeRe: re, t } = reExports;
const coerce$1 = (version, options) => {
  if (version instanceof SemVer$5) {
    return version;
  }
  if (typeof version === "number") {
    version = String(version);
  }
  if (typeof version !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version.match(re[t.COERCE]);
  } else {
    let next;
    while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    }
    re[t.COERCERTL].lastIndex = -1;
  }
  if (match === null) {
    return null;
  }
  return parse$1(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
var coerce_1 = coerce$1;
var iterator;
var hasRequiredIterator;
function requireIterator() {
  if (hasRequiredIterator) return iterator;
  hasRequiredIterator = 1;
  iterator = function(Yallist2) {
    Yallist2.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value;
      }
    };
  };
  return iterator;
}
var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;
function Yallist$1(list) {
  var self2 = this;
  if (!(self2 instanceof Yallist$1)) {
    self2 = new Yallist$1();
  }
  self2.tail = null;
  self2.head = null;
  self2.length = 0;
  if (list && typeof list.forEach === "function") {
    list.forEach(function(item) {
      self2.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self2.push(arguments[i]);
    }
  }
  return self2;
}
Yallist$1.prototype.removeNode = function(node) {
  if (node.list !== this) {
    throw new Error("removing node which does not belong to this list");
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist$1.prototype.unshiftNode = function(node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist$1.prototype.pushNode = function(node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist$1.prototype.push = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.unshift = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.pop = function() {
  if (!this.tail) {
    return void 0;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.shift = function() {
  if (!this.head) {
    return void 0;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.forEach = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};
Yallist$1.prototype.forEachReverse = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};
Yallist$1.prototype.get = function(n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.getReverse = function(n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.map = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist$1.prototype.mapReverse = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist$1.prototype.reduce = function(fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }
  return acc;
};
Yallist$1.prototype.reduceReverse = function(fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }
  return acc;
};
Yallist$1.prototype.toArray = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist$1.prototype.toArrayReverse = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist$1.prototype.slice = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.sliceReverse = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.splice = function(start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};
Yallist$1.prototype.reverse = function() {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self2, node, value) {
  var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
  if (inserted.next === null) {
    self2.tail = inserted;
  }
  if (inserted.prev === null) {
    self2.head = inserted;
  }
  self2.length++;
  return inserted;
}
function push(self2, item) {
  self2.tail = new Node(item, self2.tail, null, self2);
  if (!self2.head) {
    self2.head = self2.tail;
  }
  self2.length++;
}
function unshift(self2, item) {
  self2.head = new Node(item, null, self2.head, self2);
  if (!self2.tail) {
    self2.tail = self2.head;
  }
  self2.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  requireIterator()(Yallist$1);
} catch (er) {
}
const Yallist = yallist;
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = () => 1;
class LRUCache {
  constructor(options) {
    if (typeof options === "number")
      options = { max: options };
    if (!options)
      options = {};
    if (options.max && (typeof options.max !== "number" || options.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }
  // resize the cache when the max changes.
  set max(mL) {
    if (typeof mL !== "number" || mL < 0)
      throw new TypeError("max must be a non-negative number");
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }
  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(lC) {
    if (typeof lC !== "function")
      lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = /* @__PURE__ */ new Map();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  }
  dump() {
    return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter((h) => h);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key)) return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    this.reset();
    const now = Date.now();
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self2, key, doUse) => {
  const node = self2[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self2, hit)) {
      del(self2, node);
      if (!self2[ALLOW_STALE])
        return void 0;
    } else {
      if (doUse) {
        if (self2[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self2[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self2, hit) => {
  if (!hit || !hit.maxAge && !self2[MAX_AGE])
    return false;
  const diff2 = Date.now() - hit.now;
  return hit.maxAge ? diff2 > hit.maxAge : self2[MAX_AGE] && diff2 > self2[MAX_AGE];
};
const trim = (self2) => {
  if (self2[LENGTH] > self2[MAX]) {
    for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
      const prev = walker.prev;
      del(self2, walker);
      walker = prev;
    }
  }
};
const del = (self2, node) => {
  if (node) {
    const hit = node.value;
    if (self2[DISPOSE])
      self2[DISPOSE](hit.key, hit.value);
    self2[LENGTH] -= hit.length;
    self2[CACHE].delete(hit.key);
    self2[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self2, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self2, hit)) {
    del(self2, node);
    if (!self2[ALLOW_STALE])
      hit = void 0;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self2);
};
var lruCache = LRUCache;
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  class Range2 {
    constructor(range2, options) {
      options = parseOptions2(options);
      if (range2 instanceof Range2) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range2(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator2) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.format();
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2.trim().split(/\s+/).join(" ");
      this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }
      if (this.set.length > 1) {
        const first = this.set[0];
        this.set = this.set.filter((c) => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.format();
    }
    format() {
      this.range = this.set.map((comps) => comps.join(" ").trim()).join("||").trim();
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ":" + range2;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t2.HYPHENRANGELOOSE] : re2[t2.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug2("hyphen replace", range2);
      range2 = range2.replace(re2[t2.COMPARATORTRIM], comparatorTrimReplace);
      debug2("comparator trim", range2);
      range2 = range2.replace(re2[t2.TILDETRIM], tildeTrimReplace);
      debug2("tilde trim", range2);
      range2 = range2.replace(re2[t2.CARETTRIM], caretTrimReplace);
      debug2("caret trim", range2);
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug2("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t2.COMPARATORLOOSE]);
        });
      }
      debug2("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator2(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range2)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer3(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range2;
  const LRU = lruCache;
  const cache = new LRU({ max: 1e3 });
  const parseOptions2 = parseOptions_1;
  const Comparator2 = requireComparator();
  const debug2 = debug_1;
  const SemVer3 = semver$2;
  const {
    safeRe: re2,
    t: t2,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = reExports;
  const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = constants$1;
  const isNullSet = (c) => c.value === "<0.0.0-0";
  const isAny = (c) => c.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    debug2("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug2("caret", comp);
    comp = replaceTildes(comp, options);
    debug2("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug2("xrange", comp);
    comp = replaceStars(comp, options);
    debug2("stars", comp);
    return comp;
  };
  const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t2.TILDELOOSE] : re2[t2.TILDE];
    return comp.replace(r, (_2, M, m, p, pr) => {
      debug2("tilde", comp, _2, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug2("replaceTilde pr", pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug2("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
  };
  const replaceCaret = (comp, options) => {
    debug2("caret", comp, options);
    const r = options.loose ? re2[t2.CARETLOOSE] : re2[t2.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_2, M, m, p, pr) => {
      debug2("caret", comp, _2, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === "0") {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug2("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug2("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug2("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re2[t2.XRANGELOOSE] : re2[t2.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug2("xRange", comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug2("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug2("replaceStars", comp, options);
    return comp.trim().replace(re2[t2.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug2("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp2, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp2)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug2(set[i].semver);
        if (set[i].semver === Comparator2.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const ANY2 = Symbol("SemVer ANY");
  class Comparator2 {
    static get ANY() {
      return ANY2;
    }
    constructor(comp, options) {
      options = parseOptions2(options);
      if (comp instanceof Comparator2) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug2("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY2) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug2("comp", this);
    }
    parse(comp) {
      const r = this.options.loose ? re2[t2.COMPARATORLOOSE] : re2[t2.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY2;
      } else {
        this.semver = new SemVer3(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version) {
      debug2("Comparator.test", version, this.options.loose);
      if (this.semver === ANY2 || version === ANY2) {
        return true;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer3(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp2(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator2)) {
        throw new TypeError("a Comparator is required");
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range2(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range2(this.value, options).test(comp.semver);
      }
      options = parseOptions2(options);
      if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
        return false;
      }
      if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
        return true;
      }
      if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
        return true;
      }
      if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
        return true;
      }
      if (cmp2(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
        return true;
      }
      if (cmp2(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator2;
  const parseOptions2 = parseOptions_1;
  const { safeRe: re2, t: t2 } = reExports;
  const cmp2 = cmp_1;
  const debug2 = debug_1;
  const SemVer3 = semver$2;
  const Range2 = requireRange();
  return comparator;
}
const Range$9 = requireRange();
const satisfies$4 = (version, range2, options) => {
  try {
    range2 = new Range$9(range2, options);
  } catch (er) {
    return false;
  }
  return range2.test(version);
};
var satisfies_1 = satisfies$4;
const Range$8 = requireRange();
const toComparators$1 = (range2, options) => new Range$8(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
var toComparators_1 = toComparators$1;
const SemVer$4 = semver$2;
const Range$7 = requireRange();
const maxSatisfying$1 = (versions, range2, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$7(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v;
        maxSV = new SemVer$4(max, options);
      }
    }
  });
  return max;
};
var maxSatisfying_1 = maxSatisfying$1;
const SemVer$3 = semver$2;
const Range$6 = requireRange();
const minSatisfying$1 = (versions, range2, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$6(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer$3(min, options);
      }
    }
  });
  return min;
};
var minSatisfying_1 = minSatisfying$1;
const SemVer$2 = semver$2;
const Range$5 = requireRange();
const gt$2 = gt_1;
const minVersion$1 = (range2, loose) => {
  range2 = new Range$5(range2, loose);
  let minver = new SemVer$2("0.0.0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = new SemVer$2("0.0.0-0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let setMin = null;
    comparators.forEach((comparator2) => {
      const compver = new SemVer$2(comparator2.semver.version);
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt$2(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`);
      }
    });
    if (setMin && (!minver || gt$2(minver, setMin))) {
      minver = setMin;
    }
  }
  if (minver && range2.test(minver)) {
    return minver;
  }
  return null;
};
var minVersion_1 = minVersion$1;
const Range$4 = requireRange();
const validRange$1 = (range2, options) => {
  try {
    return new Range$4(range2, options).range || "*";
  } catch (er) {
    return null;
  }
};
var valid$1 = validRange$1;
const SemVer$1 = semver$2;
const Comparator$2 = requireComparator();
const { ANY: ANY$1 } = Comparator$2;
const Range$3 = requireRange();
const satisfies$3 = satisfies_1;
const gt$1 = gt_1;
const lt$1 = lt_1;
const lte$1 = lte_1;
const gte$1 = gte_1;
const outside$3 = (version, range2, hilo, options) => {
  version = new SemVer$1(version, options);
  range2 = new Range$3(range2, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt$1;
      ltefn = lte$1;
      ltfn = lt$1;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt$1;
      ltefn = gte$1;
      ltfn = gt$1;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies$3(version, range2, options)) {
    return false;
  }
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let high = null;
    let low = null;
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$2(">=0.0.0");
      }
      high = high || comparator2;
      low = low || comparator2;
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2;
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
};
var outside_1 = outside$3;
const outside$2 = outside_1;
const gtr$1 = (version, range2, options) => outside$2(version, range2, ">", options);
var gtr_1 = gtr$1;
const outside$1 = outside_1;
const ltr$1 = (version, range2, options) => outside$1(version, range2, "<", options);
var ltr_1 = ltr$1;
const Range$2 = requireRange();
const intersects$1 = (r1, r2, options) => {
  r1 = new Range$2(r1, options);
  r2 = new Range$2(r2, options);
  return r1.intersects(r2, options);
};
var intersects_1 = intersects$1;
const satisfies$2 = satisfies_1;
const compare$2 = compare_1;
var simplify = (versions, range2, options) => {
  const set = [];
  let first = null;
  let prev = null;
  const v = versions.sort((a, b) => compare$2(a, b, options));
  for (const version of v) {
    const included = satisfies$2(version, range2, options);
    if (included) {
      prev = version;
      if (!first) {
        first = version;
      }
    } else {
      if (prev) {
        set.push([first, prev]);
      }
      prev = null;
      first = null;
    }
  }
  if (first) {
    set.push([first, null]);
  }
  const ranges = [];
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min);
    } else if (!max && min === v[0]) {
      ranges.push("*");
    } else if (!max) {
      ranges.push(`>=${min}`);
    } else if (min === v[0]) {
      ranges.push(`<=${max}`);
    } else {
      ranges.push(`${min} - ${max}`);
    }
  }
  const simplified = ranges.join(" || ");
  const original = typeof range2.raw === "string" ? range2.raw : String(range2);
  return simplified.length < original.length ? simplified : range2;
};
const Range$1 = requireRange();
const Comparator$1 = requireComparator();
const { ANY } = Comparator$1;
const satisfies$1 = satisfies_1;
const compare$1 = compare_1;
const subset$1 = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true;
  }
  sub = new Range$1(sub, options);
  dom = new Range$1(dom, options);
  let sawNonNull = false;
  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options);
      sawNonNull = sawNonNull || isSub !== null;
      if (isSub) {
        continue OUTER;
      }
    }
    if (sawNonNull) {
      return false;
    }
  }
  return true;
};
const minimumVersionWithPreRelease = [new Comparator$1(">=0.0.0-0")];
const minimumVersion = [new Comparator$1(">=0.0.0")];
const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true;
  }
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true;
    } else if (options.includePrerelease) {
      sub = minimumVersionWithPreRelease;
    } else {
      sub = minimumVersion;
    }
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true;
    } else {
      dom = minimumVersion;
    }
  }
  const eqSet = /* @__PURE__ */ new Set();
  let gt2, lt2;
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=") {
      gt2 = higherGT(gt2, c, options);
    } else if (c.operator === "<" || c.operator === "<=") {
      lt2 = lowerLT(lt2, c, options);
    } else {
      eqSet.add(c.semver);
    }
  }
  if (eqSet.size > 1) {
    return null;
  }
  let gtltComp;
  if (gt2 && lt2) {
    gtltComp = compare$1(gt2.semver, lt2.semver, options);
    if (gtltComp > 0) {
      return null;
    } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<=")) {
      return null;
    }
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies$1(eq2, String(gt2), options)) {
      return null;
    }
    if (lt2 && !satisfies$1(eq2, String(lt2), options)) {
      return null;
    }
    for (const c of dom) {
      if (!satisfies$1(eq2, String(c), options)) {
        return false;
      }
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
    if (gt2) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt2, c, options);
        if (higher === c && higher !== gt2) {
          return false;
        }
      } else if (gt2.operator === ">=" && !satisfies$1(gt2.semver, String(c), options)) {
        return false;
      }
    }
    if (lt2) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt2, c, options);
        if (lower === c && lower !== lt2) {
          return false;
        }
      } else if (lt2.operator === "<=" && !satisfies$1(lt2.semver, String(c), options)) {
        return false;
      }
    }
    if (!c.operator && (lt2 || gt2) && gtltComp !== 0) {
      return false;
    }
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0) {
    return false;
  }
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0) {
    return false;
  }
  if (needDomGTPre || needDomLTPre) {
    return false;
  }
  return true;
};
const higherGT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare$1(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
const lowerLT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare$1(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
var subset_1 = subset$1;
const internalRe = reExports;
const constants = constants$1;
const SemVer2 = semver$2;
const identifiers = identifiers$1;
const parse = parse_1;
const valid = valid_1;
const clean = clean_1;
const inc = inc_1;
const diff = diff_1;
const major = major_1;
const minor = minor_1;
const patch = patch_1;
const prerelease = prerelease_1;
const compare = compare_1;
const rcompare = rcompare_1;
const compareLoose = compareLoose_1;
const compareBuild = compareBuild_1;
const sort = sort_1;
const rsort = rsort_1;
const gt = gt_1;
const lt = lt_1;
const eq = eq_1;
const neq = neq_1;
const gte = gte_1;
const lte = lte_1;
const cmp = cmp_1;
const coerce = coerce_1;
const Comparator = requireComparator();
const Range = requireRange();
const satisfies = satisfies_1;
const toComparators = toComparators_1;
const maxSatisfying = maxSatisfying_1;
const minSatisfying = minSatisfying_1;
const minVersion = minVersion_1;
const validRange = valid$1;
const outside = outside_1;
const gtr = gtr_1;
const ltr = ltr_1;
const intersects = intersects_1;
const simplifyRange = simplify;
const subset = subset_1;
var semver = {
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer: SemVer2,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: constants.RELEASE_TYPES,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers
};
const semver$1 = /* @__PURE__ */ getDefaultExportFromCjs(semver);
const WORKFLOW_MODEL_UID = "plugin::review-workflows.workflow";
const STAGE_MODEL_UID = "plugin::review-workflows.workflow-stage";
const STAGE_TRANSITION_UID = "admin::review-workflows.stage.transition";
const STAGE_DEFAULT_COLOR = "#4945FF";
const ENTITY_STAGE_ATTRIBUTE = "strapi_stage";
const ENTITY_ASSIGNEE_ATTRIBUTE = "strapi_assignee";
const MAX_WORKFLOWS = 200;
const MAX_STAGES_PER_WORKFLOW = 200;
const ERRORS = {
  WORKFLOW_WITHOUT_STAGES: "A workflow must have at least one stage.",
  WORKFLOWS_LIMIT: "You’ve reached the limit of workflows in your plan. Delete a workflow or contact Sales to enable more workflows.",
  STAGES_LIMIT: "You’ve reached the limit of stages for this workflow in your plan. Try deleting some stages or contact Sales to enable more stages.",
  DUPLICATED_STAGE_NAME: "Stage names must be unique."
};
const WORKFLOW_POPULATE = {
  stages: {
    populate: {
      permissions: {
        fields: ["action", "actionParameters"],
        populate: {
          role: { fields: ["id", "name"] }
        }
      }
    }
  },
  stageRequiredToPublish: true
};
function checkVersionThreshold(startVersion, currentVersion, thresholdVersion) {
  return semver$1.gte(currentVersion, thresholdVersion) && semver$1.lt(startVersion, thresholdVersion);
}
async function migrateStageAttribute({ oldContentTypes, contentTypes: contentTypes2 }) {
  const getRWVersion = fp.getOr("0.0.0", `${STAGE_MODEL_UID}.options.version`);
  const oldRWVersion = getRWVersion(oldContentTypes);
  const currentRWVersion = getRWVersion(contentTypes2);
  checkVersionThreshold(oldRWVersion, currentRWVersion, "1.1.0");
}
async function migrateReviewWorkflowStagesColor({ oldContentTypes, contentTypes: contentTypes2 }) {
  const hadColor = !!oldContentTypes?.[STAGE_MODEL_UID]?.attributes?.color;
  const hasColor = !!contentTypes2?.[STAGE_MODEL_UID]?.attributes?.color;
  if (!hadColor && hasColor) {
    await strapi.db.query(STAGE_MODEL_UID).updateMany({
      data: {
        color: STAGE_DEFAULT_COLOR
      }
    });
  }
}
async function migrateReviewWorkflowStagesRoles({ oldContentTypes, contentTypes: contentTypes2 }) {
  const hadRolePermissions = !!oldContentTypes?.[STAGE_MODEL_UID]?.attributes?.permissions;
  const hasRolePermissions = !!contentTypes2?.[STAGE_MODEL_UID]?.attributes?.permissions;
  if (!hadRolePermissions && hasRolePermissions) {
    const roleUID = "admin::role";
    strapi.log.info(
      `Migrating all existing review workflow stages to have RBAC permissions for all ${roleUID}.`
    );
    const stagePermissionsService = getService("stage-permissions");
    const stages2 = await strapi.db.query(STAGE_MODEL_UID).findMany();
    const roles = await strapi.db.query(roleUID).findMany();
    const groupedPermissions = {};
    roles.map((role) => role.id).forEach((roleId) => {
      stages2.map((stage) => stage.id).forEach((stageId) => {
        if (!groupedPermissions[stageId]) {
          groupedPermissions[stageId] = [];
        }
        groupedPermissions[stageId].push({
          roleId,
          fromStage: stageId,
          action: STAGE_TRANSITION_UID
        });
      });
    });
    for (const [stageId, permissions] of Object.entries(groupedPermissions)) {
      const numericalStageId = Number(stageId);
      if (Number.isNaN(numericalStageId)) {
        strapi.log.warn(
          `Unable to apply ${roleUID} migration for ${STAGE_MODEL_UID} with id ${stageId}. The stage does not have a numerical id.`
        );
        continue;
      }
      const stagePermissions2 = await stagePermissionsService.registerMany(permissions);
      await strapi.db.query(STAGE_MODEL_UID).update({
        where: { id: numericalStageId },
        data: {
          permissions: stagePermissions2.flat().map((permission) => permission.id)
        }
      });
    }
  }
}
const name = "Default";
const defaultWorkflow = {
  name
};
async function migrateReviewWorkflowName({ oldContentTypes, contentTypes: contentTypes2 }) {
  const hadName = !!oldContentTypes?.[WORKFLOW_MODEL_UID]?.attributes?.name;
  const hasName = !!contentTypes2?.[WORKFLOW_MODEL_UID]?.attributes?.name;
  if (!hadName && hasName) {
    await strapi.db.query(WORKFLOW_MODEL_UID).updateMany({
      where: {
        name: { $null: true }
      },
      data: {
        name: defaultWorkflow.name
      }
    });
  }
}
async function migrateWorkflowsContentTypes({ oldContentTypes, contentTypes: contentTypes2 }) {
  const hadContentTypes = !!oldContentTypes?.[WORKFLOW_MODEL_UID]?.attributes?.contentTypes;
  const hasContentTypes = !!contentTypes2?.[WORKFLOW_MODEL_UID]?.attributes?.contentTypes;
  if (!hadContentTypes && hasContentTypes) {
    await strapi.db.query(WORKFLOW_MODEL_UID).updateMany({ data: { contentTypes: [] } });
    const contentTypes22 = fp.pipe([fp.pickBy(fp.get("options.reviewWorkflows")), fp.keys])(oldContentTypes);
    if (contentTypes22.length) {
      await strapi.db.query(WORKFLOW_MODEL_UID).update({ where: { id: { $notNull: true } }, data: { contentTypes: contentTypes22 } });
    }
  }
}
const getVisibleContentTypesUID = fp.pipe([
  // Pick only content-types visible in the content-manager and option is not false
  fp.pickBy(
    (value) => fp.getOr(true, "pluginOptions.content-manager.visible", value) && !fp.getOr(false, "options.noStageAttribute", value)
  ),
  // Get UIDs
  fp.keys
]);
const hasStageAttribute = fp.has(["attributes", ENTITY_STAGE_ATTRIBUTE]);
const getWorkflowContentTypeFilter = ({ strapi: strapi2 }, contentType) => {
  if (strapi2.db.dialect.supportsOperator("$jsonSupersetOf")) {
    return { $jsonSupersetOf: JSON.stringify([contentType]) };
  }
  return { $contains: `"${contentType}"` };
};
const clampMaxWorkflows = fp.clamp(1, MAX_WORKFLOWS);
const clampMaxStagesPerWorkflow = fp.clamp(1, MAX_STAGES_PER_WORKFLOW);
async function migrateDeletedCTInWorkflows({ oldContentTypes, contentTypes: contentTypes2 }) {
  const deletedContentTypes = fp.difference(fp.keys(oldContentTypes), fp.keys(contentTypes2)) ?? [];
  if (deletedContentTypes.length) {
    await async.map(deletedContentTypes, async (deletedContentTypeUID) => {
      const workflow2 = await strapi.db.query(WORKFLOW_MODEL_UID).findOne({
        select: ["id", "contentTypes"],
        where: {
          contentTypes: getWorkflowContentTypeFilter({ strapi }, deletedContentTypeUID)
        }
      });
      if (workflow2) {
        await strapi.db.query(WORKFLOW_MODEL_UID).update({
          where: { id: workflow2.id },
          data: {
            contentTypes: workflow2.contentTypes.filter(
              (contentTypeUID) => contentTypeUID !== deletedContentTypeUID
            )
          }
        });
      }
    });
  }
}
function contentTypeMiddleware(strapi2) {
  const moveReviewWorkflowOption = (ctx) => {
    const { reviewWorkflows: reviewWorkflows2, ...contentType } = ctx.request.body.contentType;
    if (typeof reviewWorkflows2 === "boolean") {
      ctx.request.body.contentType = fp.set("options.reviewWorkflows", reviewWorkflows2, contentType);
    }
  };
  strapi2.server.router.use("/content-type-builder/content-types/:uid?", (ctx, next) => {
    if (ctx.method === "PUT" || ctx.method === "POST") {
      moveReviewWorkflowOption(ctx);
    }
    return next();
  });
}
const reviewWorkflowsMiddlewares = {
  contentTypeMiddleware
};
const setRelation = (attributeName, target, contentType) => {
  Object.assign(contentType.attributes, {
    [attributeName]: {
      writable: true,
      private: false,
      configurable: false,
      visible: false,
      useJoinTable: true,
      // We want a join table to persist data when downgrading to CE
      type: "relation",
      relation: "oneToOne",
      target
    }
  });
  return contentType;
};
function extendReviewWorkflowContentTypes({ strapi: strapi2 }) {
  const contentTypeToExtend = getVisibleContentTypesUID(strapi2.contentTypes);
  for (const contentTypeUID of contentTypeToExtend) {
    strapi2.get("content-types").extend(contentTypeUID, (contentType) => {
      setRelation(ENTITY_STAGE_ATTRIBUTE, STAGE_MODEL_UID, contentType);
      setRelation(ENTITY_ASSIGNEE_ATTRIBUTE, "admin::user", contentType);
    });
  }
}
function persistRWOnDowngrade({ strapi: strapi2 }) {
  const { removePersistedTablesWithSuffix, persistTables } = getAdminService("persist-tables");
  return async ({ contentTypes: contentTypes2 }) => {
    const getStageTableToPersist = (contentTypeUID) => {
      const { attributes, tableName } = strapi2.db.metadata.get(contentTypeUID);
      const joinTableName = attributes[ENTITY_STAGE_ATTRIBUTE].joinTable.name;
      return {
        name: joinTableName,
        dependsOn: [{ name: tableName }]
      };
    };
    const getAssigneeTableToPersist = (contentTypeUID) => {
      const { attributes, tableName } = strapi2.db.metadata.get(contentTypeUID);
      const joinTableName = attributes[ENTITY_ASSIGNEE_ATTRIBUTE].joinTable.name;
      return {
        name: joinTableName,
        dependsOn: [{ name: tableName }]
      };
    };
    const enabledRWContentTypes = fp.pipe([
      getVisibleContentTypesUID,
      fp.filter((uid) => hasStageAttribute(contentTypes2[uid]))
    ])(contentTypes2);
    const stageJoinTablesToPersist = enabledRWContentTypes.map(getStageTableToPersist);
    await removePersistedTablesWithSuffix("_strapi_stage_lnk");
    await persistTables(stageJoinTablesToPersist);
    const assigneeJoinTablesToPersist = enabledRWContentTypes.map(getAssigneeTableToPersist);
    await removePersistedTablesWithSuffix("_strapi_assignee_lnk");
    await persistTables(assigneeJoinTablesToPersist);
  };
}
const register = async ({ strapi: strapi2 }) => {
  strapi2.hook("strapi::content-types.beforeSync").register(migrateStageAttribute);
  strapi2.hook("strapi::content-types.afterSync").register(persistRWOnDowngrade({ strapi: strapi2 }));
  strapi2.hook("strapi::content-types.afterSync").register(migrateReviewWorkflowStagesColor).register(migrateReviewWorkflowStagesRoles).register(migrateReviewWorkflowName).register(migrateWorkflowsContentTypes).register(migrateDeletedCTInWorkflows);
  reviewWorkflowsMiddlewares.contentTypeMiddleware(strapi2);
  extendReviewWorkflowContentTypes({ strapi: strapi2 });
  const reviewWorkflowsOptions = fp.defaultsDeep(
    {
      numberOfWorkflows: MAX_WORKFLOWS,
      stagesPerWorkflow: MAX_STAGES_PER_WORKFLOW
    },
    strapi2.ee.features.get("review-workflows")
  );
  const workflowsValidationService = getService("validation", { strapi: strapi2 });
  workflowsValidationService.register(reviewWorkflowsOptions);
};
const workflow = {
  schema: {
    collectionName: "strapi_workflows",
    info: {
      name: "Workflow",
      description: "",
      singularName: "workflow",
      pluralName: "workflows",
      displayName: "Workflow"
    },
    options: {},
    pluginOptions: {
      "content-manager": {
        visible: false
      },
      "content-type-builder": {
        visible: false
      }
    },
    attributes: {
      name: {
        type: "string",
        required: true,
        unique: true
      },
      stages: {
        type: "relation",
        target: "plugin::review-workflows.workflow-stage",
        relation: "oneToMany",
        mappedBy: "workflow"
      },
      stageRequiredToPublish: {
        type: "relation",
        target: "plugin::review-workflows.workflow-stage",
        relation: "oneToOne",
        required: false
      },
      contentTypes: {
        type: "json",
        required: true,
        default: "[]"
      }
    }
  }
};
const workflowStage = {
  schema: {
    collectionName: "strapi_workflows_stages",
    info: {
      name: "Workflow Stage",
      description: "",
      singularName: "workflow-stage",
      pluralName: "workflow-stages",
      displayName: "Stages"
    },
    options: {
      version: "1.1.0"
    },
    pluginOptions: {
      "content-manager": {
        visible: false
      },
      "content-type-builder": {
        visible: false
      }
    },
    attributes: {
      name: {
        type: "string",
        configurable: false
      },
      color: {
        type: "string",
        configurable: false,
        default: STAGE_DEFAULT_COLOR
      },
      workflow: {
        type: "relation",
        target: "plugin::review-workflows.workflow",
        relation: "manyToOne",
        inversedBy: "stages",
        configurable: false
      },
      permissions: {
        type: "relation",
        target: "admin::permission",
        relation: "manyToMany",
        configurable: false
      }
    }
  }
};
const contentTypes = {
  workflow,
  "workflow-stage": workflowStage
};
const actions = {
  reviewWorkflows: [
    {
      uid: "review-workflows.create",
      displayName: "Create",
      pluginName: "admin",
      section: "settings",
      category: "review workflows",
      subCategory: "options"
    },
    {
      uid: "review-workflows.read",
      displayName: "Read",
      pluginName: "admin",
      section: "settings",
      category: "review workflows",
      subCategory: "options"
    },
    {
      uid: "review-workflows.update",
      displayName: "Update",
      pluginName: "admin",
      section: "settings",
      category: "review workflows",
      subCategory: "options"
    },
    {
      uid: "review-workflows.delete",
      displayName: "Delete",
      pluginName: "admin",
      section: "settings",
      category: "review workflows",
      subCategory: "options"
    },
    {
      uid: "review-workflows.stage.transition",
      displayName: "Change stage",
      pluginName: "admin",
      section: "internal"
    }
  ]
};
const defaultStages = [
  {
    name: "To do",
    color: "#4945FF"
  },
  {
    name: "Ready to review",
    color: "#9736E8"
  },
  {
    name: "In progress",
    color: "#EE5E52"
  },
  {
    name: "Reviewed",
    color: "#328048"
  }
];
const WORKFLOW_UPDATE_STAGE = "review-workflows.updateEntryStage";
const webhookEvents = {
  WORKFLOW_UPDATE_STAGE
};
async function initDefaultWorkflow() {
  const workflowsService = getService("workflows", { strapi });
  const stagesService = getService("stages", { strapi });
  const wfCount = await workflowsService.count();
  const stagesCount = await stagesService.count();
  if (wfCount === 0 && stagesCount === 0) {
    const workflow2 = {
      ...defaultWorkflow,
      contentTypes: [],
      stages: defaultStages
    };
    await workflowsService.create({ data: workflow2 });
  }
}
const registerWebhookEvents = async () => Object.entries(webhookEvents).forEach(
  ([eventKey, event]) => strapi.get("webhookStore").addAllowedEvent(eventKey, event)
);
const bootstrap = async (args) => {
  const { actionProvider } = getAdminService("permission");
  await actionProvider.registerMany(actions.reviewWorkflows);
  await registerWebhookEvents();
  await getService("workflow-weekly-metrics").registerCron();
  await initDefaultWorkflow();
  const docsMiddlewares = getService("document-service-middlewares");
  strapi.documents.use(docsMiddlewares.assignStageOnCreate);
  strapi.documents.use(docsMiddlewares.handleStageOnUpdate);
  strapi.documents.use(docsMiddlewares.checkStageBeforePublish);
};
const destroy = async ({ strapi: strapi2 }) => {
};
const enableFeatureMiddleware = (featureName) => (ctx, next) => {
  if (strapi.ee.features.isEnabled(featureName)) {
    return next();
  }
  ctx.status = 404;
};
const reviewWorkflows = {
  type: "admin",
  routes: [
    // Review workflow
    {
      method: "POST",
      path: "/workflows",
      handler: "workflows.create",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["admin::review-workflows.create"]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/workflows/:id",
      handler: "workflows.update",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["admin::review-workflows.update"]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/workflows/:id",
      handler: "workflows.delete",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["admin::review-workflows.delete"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/workflows",
      handler: "workflows.find",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["admin::review-workflows.read"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/workflows/:workflow_id/stages",
      handler: "stages.find",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["admin::review-workflows.read"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/workflows/:workflow_id/stages/:id",
      handler: "stages.findById",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["admin::review-workflows.read"]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/content-manager/(collection|single)-types/:model_uid/:id/stage",
      handler: "stages.updateEntity",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/content-manager/(collection|single)-types/:model_uid/:id/stages",
      handler: "stages.listAvailableStages",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "PUT",
      path: "/content-manager/(collection|single)-types/:model_uid/:id/assignee",
      handler: "assignees.updateEntity",
      config: {
        middlewares: [enableFeatureMiddleware("review-workflows")],
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["admin::users.read"]
            }
          }
        ]
      }
    }
  ]
};
const routes = {
  "review-workflows": reviewWorkflows
};
const workflowsContentTypesFactory = ({ strapi: strapi2 }) => {
  const contentManagerContentTypeService = strapi2.plugin("content-manager").service("content-types");
  const stagesService = getService("stages", { strapi: strapi2 });
  const updateContentTypeConfig = async (uid, reviewWorkflowOption) => {
    const modelConfig = await contentManagerContentTypeService.findConfiguration(uid);
    await contentManagerContentTypeService.updateConfiguration(
      { uid },
      { options: fp.merge(modelConfig.options, { reviewWorkflows: reviewWorkflowOption }) }
    );
  };
  return {
    /**
     * Migrates entities stages. Used when a content type is assigned to a workflow.
     * @param {*} options
     * @param {Array<string>} options.srcContentTypes - The content types assigned to the previous workflow
     * @param {Array<string>} options.destContentTypes - The content types assigned to the new workflow
     * @param {Workflow.Stage} options.stageId - The new stage to assign the entities to
     */
    async migrate({ srcContentTypes = [], destContentTypes, stageId }) {
      const workflowsService = getService("workflows", { strapi: strapi2 });
      const { created, deleted } = diffContentTypes(srcContentTypes, destContentTypes);
      await async.map(
        created,
        async (uid) => {
          const srcWorkflows = await workflowsService._getAssignedWorkflows(uid, {});
          if (srcWorkflows.length) {
            await stagesService.updateEntitiesStage(uid, { toStageId: stageId });
            await async.map(
              srcWorkflows,
              (srcWorkflow) => this.transferContentTypes(srcWorkflow, uid)
            );
          }
          await updateContentTypeConfig(uid, true);
          return stagesService.updateEntitiesStage(uid, {
            fromStageId: null,
            toStageId: stageId
          });
        },
        // transferContentTypes can cause race conditions if called in parallel when updating the same workflow
        { concurrency: 1 }
      );
      await async.map(deleted, async (uid) => {
        await updateContentTypeConfig(uid, false);
        await stagesService.deleteAllEntitiesStage(uid, {});
      });
    },
    /**
     * Filters the content types assigned to a workflow
     * @param {Workflow} srcWorkflow - The workflow to transfer from
     * @param {string} uid - The content type uid
     */
    async transferContentTypes(srcWorkflow, uid) {
      await strapi2.db.query(WORKFLOW_MODEL_UID).update({
        where: {
          id: srcWorkflow.id
        },
        data: {
          contentTypes: srcWorkflow.contentTypes.filter((contentType) => contentType !== uid)
        }
      });
    }
  };
};
const diffContentTypes = (srcContentTypes, destContentTypes) => {
  const created = fp.difference(destContentTypes, srcContentTypes);
  const deleted = fp.difference(srcContentTypes, destContentTypes);
  return { created, deleted };
};
const processFilters = ({ strapi: strapi2 }, filters = {}) => {
  const processedFilters = { ...filters };
  if (fp.isString(filters.contentTypes)) {
    processedFilters.contentTypes = getWorkflowContentTypeFilter({ strapi: strapi2 }, filters.contentTypes);
  }
  return processedFilters;
};
const processPopulate = (populate) => {
  if (!populate) {
    return WORKFLOW_POPULATE;
  }
  return populate;
};
const workflows$1 = ({ strapi: strapi2 }) => {
  const workflowsContentTypes = workflowsContentTypesFactory({ strapi: strapi2 });
  const workflowValidator = getService("validation", { strapi: strapi2 });
  const metrics = getService("workflow-metrics", { strapi: strapi2 });
  return {
    /**
     * Returns all the workflows matching the user-defined filters.
     * @param {object} opts - Options for the query.
     * @param {object} opts.filters - Filters object.
     * @returns {Promise<object[]>} - List of workflows that match the user's filters.
     */
    async find(opts = {}) {
      const filters = processFilters({ strapi: strapi2 }, opts.filters);
      const populate = processPopulate(opts.populate);
      const query = strapi2.get("query-params").transform(WORKFLOW_MODEL_UID, {
        ...opts,
        filters,
        populate
      });
      return strapi2.db.query(WORKFLOW_MODEL_UID).findMany(query);
    },
    /**
     * Returns the workflow with the specified ID.
     * @param {string} id - ID of the requested workflow.
     * @param {object} opts - Options for the query.
     * @returns {Promise<object>} - Workflow object matching the requested ID.
     */
    findById(id, opts = {}) {
      const populate = processPopulate(opts.populate);
      const query = strapi2.get("query-params").transform(WORKFLOW_MODEL_UID, { populate });
      return strapi2.db.query(WORKFLOW_MODEL_UID).findOne({
        ...query,
        where: { id }
      });
    },
    /**
     * Creates a new workflow.
     * @param {object} opts - Options for creating the new workflow.
     * @returns {Promise<object>} - Workflow object that was just created.
     * @throws {ValidationError} - If the workflow has no stages.
     */
    async create(opts) {
      let createOpts = { ...opts, populate: WORKFLOW_POPULATE };
      workflowValidator.validateWorkflowStages(opts.data.stages);
      await workflowValidator.validateWorkflowCount(1);
      return strapi2.db.transaction(async () => {
        const stages2 = await getService("stages", { strapi: strapi2 }).createMany(opts.data.stages);
        const mapIds = fp.map(fp.get("id"));
        createOpts = fp.set("data.stages", mapIds(stages2), createOpts);
        if (opts.data.stageRequiredToPublishName) {
          const stageRequiredToPublish = stages2.find(
            (stage) => stage.name === opts.data.stageRequiredToPublishName
          );
          if (!stageRequiredToPublish) {
            throw new errors.ApplicationError("Stage required to publish does not exist");
          }
          createOpts = fp.set("data.stageRequiredToPublish", stageRequiredToPublish.id, createOpts);
        }
        if (opts.data.contentTypes) {
          await workflowsContentTypes.migrate({
            destContentTypes: opts.data.contentTypes,
            stageId: stages2[0].id
          });
        }
        const createdWorkflow = await strapi2.db.query(WORKFLOW_MODEL_UID).create(strapi2.get("query-params").transform(WORKFLOW_MODEL_UID, createOpts));
        metrics.sendDidCreateWorkflow(createdWorkflow.id, !!opts.data.stageRequiredToPublishName);
        if (opts.data.stageRequiredToPublishName) {
          await strapi2.plugin("content-releases").service("release-action").validateActionsByContentTypes(opts.data.contentTypes);
        }
        return createdWorkflow;
      });
    },
    /**
     * Updates an existing workflow.
     * @param {object} workflow - The existing workflow to update.
     * @param {object} opts - Options for updating the workflow.
     * @returns {Promise<object>} - Workflow object that was just updated.
     * @throws {ApplicationError} - If the supplied stage ID does not belong to the workflow.
     */
    async update(workflow2, opts) {
      const stageService = getService("stages", { strapi: strapi2 });
      let updateOpts = { ...opts, populate: { ...WORKFLOW_POPULATE } };
      let updatedStages = [];
      let updatedStageIds;
      await workflowValidator.validateWorkflowCount();
      return strapi2.db.transaction(async () => {
        if (opts.data.stages) {
          workflowValidator.validateWorkflowStages(opts.data.stages);
          opts.data.stages.forEach(
            (stage) => this.assertStageBelongsToWorkflow(stage.id, workflow2)
          );
          updatedStages = await stageService.replaceStages(
            workflow2.stages,
            opts.data.stages,
            workflow2.contentTypes
          );
          updatedStageIds = updatedStages.map((stage) => stage.id);
          updateOpts = fp.set("data.stages", updatedStageIds, updateOpts);
        }
        if (opts.data.stageRequiredToPublishName !== void 0) {
          const stages2 = updatedStages ?? workflow2.stages;
          if (opts.data.stageRequiredToPublishName === null) {
            updateOpts = fp.set("data.stageRequiredToPublish", null, updateOpts);
          } else {
            const stageRequiredToPublish = stages2.find(
              (stage) => stage.name === opts.data.stageRequiredToPublishName
            );
            if (!stageRequiredToPublish) {
              throw new errors.ApplicationError("Stage required to publish does not exist");
            }
            updateOpts = fp.set("data.stageRequiredToPublish", stageRequiredToPublish.id, updateOpts);
          }
        }
        if (opts.data.contentTypes) {
          await workflowsContentTypes.migrate({
            srcContentTypes: workflow2.contentTypes,
            destContentTypes: opts.data.contentTypes,
            stageId: updatedStageIds ? updatedStageIds[0] : workflow2.stages[0].id
          });
        }
        metrics.sendDidEditWorkflow(workflow2.id, !!opts.data.stageRequiredToPublishName);
        const query = strapi2.get("query-params").transform(WORKFLOW_MODEL_UID, updateOpts);
        const updatedWorkflow = await strapi2.db.query(WORKFLOW_MODEL_UID).update({
          ...query,
          where: { id: workflow2.id }
        });
        await strapi2.plugin("content-releases").service("release-action").validateActionsByContentTypes([
          ...workflow2.contentTypes,
          ...opts.data.contentTypes || []
        ]);
        return updatedWorkflow;
      });
    },
    /**
     * Deletes an existing workflow.
     * Also deletes all the workflow stages and migrate all assigned the content types.
     * @param {*} workflow
     * @param {*} opts
     * @returns
     */
    async delete(workflow2, opts) {
      const stageService = getService("stages", { strapi: strapi2 });
      const workflowCount = await this.count();
      if (workflowCount <= 1) {
        throw new errors.ApplicationError("Can not delete the last workflow");
      }
      return strapi2.db.transaction(async () => {
        await stageService.deleteMany(workflow2.stages);
        await workflowsContentTypes.migrate({
          srcContentTypes: workflow2.contentTypes,
          destContentTypes: []
        });
        const query = strapi2.get("query-params").transform(WORKFLOW_MODEL_UID, opts);
        const deletedWorkflow = await strapi2.db.query(WORKFLOW_MODEL_UID).delete({
          ...query,
          where: { id: workflow2.id }
        });
        await strapi2.plugin("content-releases").service("release-action").validateActionsByContentTypes(workflow2.contentTypes);
        return deletedWorkflow;
      });
    },
    /**
     * Returns the total count of workflows.
     * @returns {Promise<number>} - Total count of workflows.
     */
    count() {
      return strapi2.db.query(WORKFLOW_MODEL_UID).count();
    },
    /**
     * Finds the assigned workflow for a given content type ID.
     * @param {string} uid - Content type ID to find the assigned workflow for.
     * @param {object} opts - Options for the query.
     * @returns {Promise<object|null>} - Assigned workflow object if found, or null.
     */
    async getAssignedWorkflow(uid, opts = {}) {
      const workflows2 = await this._getAssignedWorkflows(uid, opts);
      return workflows2.length > 0 ? workflows2[0] : null;
    },
    /**
     * Finds all the assigned workflows for a given content type ID.
     * Normally, there should only be one workflow assigned to a content type.
     * However, edge cases can occur where a content type is assigned to multiple workflows.
     * @param {string} uid - Content type ID to find the assigned workflows for.
     * @param {object} opts - Options for the query.
     * @returns {Promise<object[]>} - List of assigned workflow objects.
     */
    async _getAssignedWorkflows(uid, opts = {}) {
      return this.find({
        ...opts,
        filters: { contentTypes: getWorkflowContentTypeFilter({ strapi: strapi2 }, uid) }
      });
    },
    /**
     * Asserts that a content type has an assigned workflow.
     * @param {string} uid - Content type ID to verify the assignment of.
     * @returns {Promise<object>} - Workflow object associated with the content type ID.
     * @throws {ApplicationError} - If no assigned workflow is found for the content type ID.
     */
    async assertContentTypeBelongsToWorkflow(uid) {
      const workflow2 = await this.getAssignedWorkflow(uid, {
        populate: "stages"
      });
      if (!workflow2) {
        throw new errors.ApplicationError(
          `Review workflows is not activated on Content Type ${uid}.`
        );
      }
      return workflow2;
    },
    /**
     * Asserts that a stage belongs to a given workflow.
     * @param {string} stageId - ID of stage to check.
     * @param {object} workflow - Workflow object to check against.
     * @returns
     * @throws {ApplicationError} - If the stage does not belong to the specified workflow.
     */
    assertStageBelongsToWorkflow(stageId, workflow2) {
      if (!stageId) {
        return;
      }
      const belongs = workflow2.stages.some((stage) => stage.id === stageId);
      if (!belongs) {
        throw new errors.ApplicationError(`Stage does not belong to workflow "${workflow2.name}"`);
      }
    }
  };
};
const { ApplicationError: ApplicationError$2, ValidationError: ValidationError$1 } = errors;
const sanitizedStageFields = ["id", "name", "workflow", "color"];
const sanitizeStageFields = fp.pick(sanitizedStageFields);
const stages$1 = ({ strapi: strapi2 }) => {
  const metrics = getService("workflow-metrics", { strapi: strapi2 });
  const stagePermissionsService = getService("stage-permissions", { strapi: strapi2 });
  const workflowValidator = getService("validation", { strapi: strapi2 });
  return {
    find({ workflowId, populate }) {
      return strapi2.db.query(STAGE_MODEL_UID).findMany({
        where: { workflow: workflowId },
        populate
      });
    },
    findById(id, { populate } = {}) {
      return strapi2.db.query(STAGE_MODEL_UID).findOne({
        where: { id },
        populate
      });
    },
    async createMany(stagesList, { fields } = {}) {
      const params = { select: fields ?? "*" };
      const stages2 = await Promise.all(
        stagesList.map(
          (stage) => strapi2.db.query(STAGE_MODEL_UID).create({
            data: sanitizeStageFields(stage),
            ...params
          })
        )
      );
      await async.reduce(stagesList)(async (_2, stage, idx) => {
        if (!stage.permissions || stage.permissions.length === 0) {
          return;
        }
        const stagePermissions2 = stage.permissions;
        const stageId = stages2[idx].id;
        const permissions = await async.map(
          stagePermissions2,
          // Register each stage permission
          (permission) => stagePermissionsService.register({
            roleId: permission.role,
            action: permission.action,
            fromStage: stageId
          })
        );
        await strapi2.db.query(STAGE_MODEL_UID).update({
          where: { id: stageId },
          data: {
            permissions: permissions.flat().map((p) => p.id)
          }
        });
      }, []);
      metrics.sendDidCreateStage();
      return stages2;
    },
    async update(srcStage, destStage) {
      let stagePermissions2 = srcStage?.permissions ?? [];
      const stageId = destStage.id;
      if (destStage.permissions) {
        await this.deleteStagePermissions([srcStage]);
        const permissions = await async.map(
          destStage.permissions,
          (permission) => stagePermissionsService.register({
            roleId: permission.role,
            action: permission.action,
            fromStage: stageId
          })
        );
        stagePermissions2 = permissions.flat().map((p) => p.id);
      }
      const stage = await strapi2.db.query(STAGE_MODEL_UID).update({
        where: { id: stageId },
        data: {
          ...destStage,
          permissions: stagePermissions2
        }
      });
      metrics.sendDidEditStage();
      return stage;
    },
    async delete(stage) {
      await this.deleteStagePermissions([stage]);
      const deletedStage = await strapi2.db.query(STAGE_MODEL_UID).delete({
        where: { id: stage.id }
      });
      metrics.sendDidDeleteStage();
      return deletedStage;
    },
    async deleteMany(stages2) {
      await this.deleteStagePermissions(stages2);
      return strapi2.db.query(STAGE_MODEL_UID).deleteMany({
        where: { id: { $in: stages2.map((s) => s.id) } }
      });
    },
    async deleteStagePermissions(stages2) {
      const permissions = stages2.map((s) => s.permissions || []).flat();
      await stagePermissionsService.unregister(permissions || []);
    },
    count({ workflowId } = {}) {
      const opts = {};
      if (workflowId) {
        opts.where = {
          workflow: workflowId
        };
      }
      return strapi2.db.query(STAGE_MODEL_UID).count(opts);
    },
    async replaceStages(srcStages, destStages, contentTypesToMigrate = []) {
      const { created, updated, deleted } = getDiffBetweenStages(srcStages, destStages);
      assertAtLeastOneStageRemain(srcStages || [], { created, deleted });
      return strapi2.db.transaction(async ({ trx }) => {
        const createdStages = await this.createMany(created, { fields: ["id"] });
        const createdStagesIds = fp.map("id", createdStages);
        await async.map(updated, (destStage) => {
          const srcStage = srcStages.find((s) => s.id === destStage.id);
          return this.update(srcStage, destStage);
        });
        await async.map(deleted, async (stage) => {
          const nearestStage = findNearestMatchingStage(
            [...srcStages, ...createdStages],
            srcStages.findIndex((s) => s.id === stage.id),
            (targetStage) => {
              return !deleted.find((s) => s.id === targetStage.id);
            }
          );
          await async.map(contentTypesToMigrate, (contentTypeUID) => {
            this.updateEntitiesStage(contentTypeUID, {
              fromStageId: stage.id,
              toStageId: nearestStage.id,
              trx
            });
          });
          return this.delete(stage);
        });
        return destStages.map((stage) => ({
          ...stage,
          id: stage.id ?? createdStagesIds.shift()
        }));
      });
    },
    /**
     * Update the stage of an entity
     */
    async updateEntity(entityToUpdate, model, stageId) {
      const stage = await this.findById(stageId);
      const { documentId, locale } = entityToUpdate;
      await workflowValidator.validateWorkflowCount();
      if (!stage) {
        throw new ApplicationError$2(`Selected stage does not exist`);
      }
      const entity = await strapi2.documents(model).update({
        documentId,
        locale,
        // Stage doesn't have DP or i18n enabled, connecting it through the `id`
        // will be safer than relying on the `documentId` + `locale` + `status` transformation
        data: { [ENTITY_STAGE_ATTRIBUTE]: fp.pick(["id"], stage) },
        populate: [ENTITY_STAGE_ATTRIBUTE]
      });
      const { tableName } = strapi2.db.metadata.get(model);
      await strapi2.db.connection(tableName).where({ id: entityToUpdate.id }).update({
        updated_at: new Date(entityToUpdate.updatedAt)
      });
      metrics.sendDidChangeEntryStage();
      return entity;
    },
    /**
     * Updates entity stages of a content type:
     *  - If fromStageId is undefined, all entities with an existing stage will be assigned the new stage
     *  - If fromStageId is null, all entities without a stage will be assigned the new stage
     *  - If fromStageId is a number, all entities with that stage will be assigned the new stage
     *
     * For performance reasons we use knex queries directly.
     *
     * @param {string} contentTypeUID
     * @param {number | undefined | null} fromStageId
     * @param {number} toStageId
     * @param {import('knex').Knex.Transaction} trx
     * @returns
     */
    async updateEntitiesStage(contentTypeUID, { fromStageId, toStageId }) {
      const { attributes, tableName } = strapi2.db.metadata.get(contentTypeUID);
      const joinTable = attributes[ENTITY_STAGE_ATTRIBUTE].joinTable;
      const joinColumn = joinTable.joinColumn.name;
      const invJoinColumn = joinTable.inverseJoinColumn.name;
      await workflowValidator.validateWorkflowCount();
      return strapi2.db.transaction(async ({ trx }) => {
        if (fromStageId === void 0) {
          return strapi2.db.getConnection().from(joinTable.name).update({ [invJoinColumn]: toStageId }).transacting(trx);
        }
        const selectStatement = strapi2.db.getConnection().select({ [joinColumn]: "t1.id", [invJoinColumn]: toStageId }).from(`${tableName} as t1`).leftJoin(`${joinTable.name} as t2`, `t1.id`, `t2.${joinColumn}`).where(`t2.${invJoinColumn}`, fromStageId).toSQL();
        return strapi2.db.getConnection(joinTable.name).insert(
          strapi2.db.connection.raw(
            `(${joinColumn}, ${invJoinColumn})  ${selectStatement.sql}`,
            selectStatement.bindings
          )
        ).transacting(trx);
      });
    },
    /**
     * Deletes all entity stages of a content type
     * @param {string} contentTypeUID
     * @returns
     */
    async deleteAllEntitiesStage(contentTypeUID) {
      const { attributes } = strapi2.db.metadata.get(contentTypeUID);
      const joinTable = attributes[ENTITY_STAGE_ATTRIBUTE].joinTable;
      return strapi2.db.transaction(
        async ({ trx }) => strapi2.db.getConnection().from(joinTable.name).delete().transacting(trx)
      );
    }
  };
};
function getDiffBetweenStages(sourceStages, comparisonStages) {
  const result = comparisonStages.reduce(
    // ...
    (acc, stageToCompare) => {
      const srcStage = sourceStages.find((stage) => stage.id === stageToCompare.id);
      if (!srcStage) {
        acc.created.push(stageToCompare);
      } else if (!fp.isEqual(
        fp.pick(["name", "color", "permissions"], srcStage),
        fp.pick(["name", "color", "permissions"], stageToCompare)
      )) {
        acc.updated.push(stageToCompare);
      }
      return acc;
    },
    { created: [], updated: [] }
  );
  result.deleted = sourceStages.filter(
    (srcStage) => !comparisonStages.some((cmpStage) => cmpStage.id === srcStage.id)
  );
  return result;
}
function assertAtLeastOneStageRemain(workflowStages, diffStages) {
  const remainingStagesCount = workflowStages.length - diffStages.deleted.length + diffStages.created.length;
  if (remainingStagesCount < 1) {
    throw new ValidationError$1(ERRORS.WORKFLOW_WITHOUT_STAGES);
  }
}
function findNearestMatchingStage(stages2, startIndex, condition) {
  for (let i = startIndex; i >= 0; i -= 1) {
    if (condition(stages2[i])) {
      return stages2[i];
    }
  }
  const remainingArray = stages2.slice(startIndex + 1);
  const nearestObject = remainingArray.filter(condition)[0];
  return nearestObject;
}
const { ApplicationError: ApplicationError$1 } = errors;
const validActions = [STAGE_TRANSITION_UID];
const stagePermissions = ({ strapi: strapi2 }) => {
  const roleService = getAdminService("role");
  const permissionService = getAdminService("permission");
  return {
    async register({ roleId, action, fromStage }) {
      if (!validActions.includes(action)) {
        throw new ApplicationError$1(`Invalid action ${action}`);
      }
      const permissions = await roleService.addPermissions(roleId, [
        {
          action,
          actionParameters: {
            from: fromStage
          }
        }
      ]);
      return permissions;
    },
    async registerMany(permissions) {
      return async.map(permissions, this.register);
    },
    async unregister(permissions) {
      const permissionIds = permissions.map(fp.prop("id"));
      await permissionService.deleteByIds(permissionIds);
    },
    can(action, fromStage) {
      const requestState = strapi2.requestContext.get()?.state;
      if (!requestState) {
        return false;
      }
      const userRoles = requestState.user?.roles;
      if (userRoles?.some((role) => role.code === "strapi-super-admin")) {
        return true;
      }
      return requestState.userAbility.can({
        name: action,
        params: { from: fromStage }
      });
    }
  };
};
const { ApplicationError } = errors;
const assignees$1 = ({ strapi: strapi2 }) => {
  const metrics = getService("workflow-metrics", { strapi: strapi2 });
  return {
    async findEntityAssigneeId(id, model) {
      const entity = await strapi2.db.query(model).findOne({
        where: { id },
        populate: [ENTITY_ASSIGNEE_ATTRIBUTE],
        select: []
      });
      return entity?.[ENTITY_ASSIGNEE_ATTRIBUTE]?.id ?? null;
    },
    /**
     * Update the assignee of an entity
     */
    async updateEntityAssignee(entityToUpdate, model, assigneeId) {
      const { documentId, locale } = entityToUpdate;
      if (!fp.isNil(assigneeId)) {
        const userExists = await getAdminService("user", { strapi: strapi2 }).exists({ id: assigneeId });
        if (!userExists) {
          throw new ApplicationError(`Selected user does not exist`);
        }
      }
      const oldAssigneeId = await this.findEntityAssigneeId(entityToUpdate.id, model);
      metrics.sendDidEditAssignee(oldAssigneeId, assigneeId || null);
      const entity = await strapi2.documents(model).update({
        documentId,
        locale,
        data: { [ENTITY_ASSIGNEE_ATTRIBUTE]: assigneeId || null },
        populate: [ENTITY_ASSIGNEE_ATTRIBUTE],
        fields: []
      });
      const { tableName } = strapi2.db.metadata.get(model);
      await strapi2.db.connection(tableName).where({ id: entityToUpdate.id }).update({
        updated_at: new Date(entityToUpdate.updatedAt)
      });
      return entity;
    }
  };
};
const { ValidationError } = errors;
const reviewWorkflowsValidation = ({ strapi: strapi2 }) => {
  return {
    limits: {
      numberOfWorkflows: MAX_WORKFLOWS,
      stagesPerWorkflow: MAX_STAGES_PER_WORKFLOW
    },
    register({ numberOfWorkflows, stagesPerWorkflow }) {
      if (!Object.isFrozen(this.limits)) {
        this.limits.numberOfWorkflows = clampMaxWorkflows(
          numberOfWorkflows || this.limits.numberOfWorkflows
        );
        this.limits.stagesPerWorkflow = clampMaxStagesPerWorkflow(
          stagesPerWorkflow || this.limits.stagesPerWorkflow
        );
        Object.freeze(this.limits);
      }
    },
    /**
     * Validates the stages of a workflow.
     * @param {Array} stages - Array of stages to be validated.
     * @throws {ValidationError} - If the workflow has no stages or exceeds the limit.
     */
    validateWorkflowStages(stages2) {
      if (!stages2 || stages2.length === 0) {
        throw new ValidationError(ERRORS.WORKFLOW_WITHOUT_STAGES);
      }
      if (stages2.length > this.limits.stagesPerWorkflow) {
        throw new ValidationError(ERRORS.STAGES_LIMIT);
      }
      const stageNames = stages2.map((stage) => stage.name);
      if (fp.uniq(stageNames).length !== stageNames.length) {
        throw new ValidationError(ERRORS.DUPLICATED_STAGE_NAME);
      }
    },
    async validateWorkflowCountStages(workflowId, countAddedStages = 0) {
      const stagesService = getService("stages", { strapi: strapi2 });
      const countWorkflowStages = await stagesService.count({ workflowId });
      if (countWorkflowStages + countAddedStages > this.limits.stagesPerWorkflow) {
        throw new ValidationError(ERRORS.STAGES_LIMIT);
      }
    },
    /**
     * Validates the count of existing and added workflows.
     * @param {number} [countAddedWorkflows=0] - The count of workflows to be added.
     * @throws {ValidationError} - If the total count of workflows exceeds the limit.
     * @returns {Promise<void>} - A Promise that resolves when the validation is completed.
     */
    async validateWorkflowCount(countAddedWorkflows = 0) {
      const workflowsService = getService("workflows", { strapi: strapi2 });
      const countWorkflows = await workflowsService.count();
      if (countWorkflows + countAddedWorkflows > this.limits.numberOfWorkflows) {
        throw new ValidationError(ERRORS.WORKFLOWS_LIMIT);
      }
    }
  };
};
const sendDidCreateStage = async () => {
  strapi.telemetry.send("didCreateStage", {});
};
const sendDidEditStage = async () => {
  strapi.telemetry.send("didEditStage", {});
};
const sendDidDeleteStage = async () => {
  strapi.telemetry.send("didDeleteStage", {});
};
const sendDidChangeEntryStage = async () => {
  strapi.telemetry.send("didChangeEntryStage", {});
};
const sendDidCreateWorkflow = async (workflowId, hasRequiredStageToPublish) => {
  strapi.telemetry.send("didCreateWorkflow", { workflowId, hasRequiredStageToPublish });
};
const sendDidEditWorkflow = async (workflowId, hasRequiredStageToPublish) => {
  strapi.telemetry.send("didEditWorkflow", { workflowId, hasRequiredStageToPublish });
};
const sendDidEditAssignee = async (fromId, toId) => {
  strapi.telemetry.send("didEditAssignee", { from: fromId, to: toId });
};
const sendDidSendReviewWorkflowPropertiesOnceAWeek = async (numberOfActiveWorkflows, avgStagesCount, maxStagesCount, activatedContentTypes) => {
  strapi.telemetry.send("didSendReviewWorkflowPropertiesOnceAWeek", {
    groupProperties: {
      numberOfActiveWorkflows,
      avgStagesCount,
      maxStagesCount,
      activatedContentTypes
    }
  });
};
const reviewWorkflowsMetrics = {
  sendDidCreateStage,
  sendDidEditStage,
  sendDidDeleteStage,
  sendDidChangeEntryStage,
  sendDidCreateWorkflow,
  sendDidEditWorkflow,
  sendDidSendReviewWorkflowPropertiesOnceAWeek,
  sendDidEditAssignee
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}
function add(dirtyDate, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object") return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var date = toDate(dirtyDate);
  var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date;
  var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1e3;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}
const ONE_WEEK = 7 * 24 * 60 * 60 * 1e3;
const getWeeklyCronScheduleAt = (date) => `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} * * ${date.getDay()}`;
const reviewWorkflowsWeeklyMetrics = ({ strapi: strapi2 }) => {
  const metrics = getService("workflow-metrics", { strapi: strapi2 });
  const workflowsService = getService("workflows", { strapi: strapi2 });
  const getMetricsStoreValue = async () => {
    const value = await strapi2.store.get({ type: "plugin", name: "ee", key: "metrics" });
    return fp.defaultTo({}, value);
  };
  const setMetricsStoreValue = (value) => strapi2.store.set({ type: "plugin", name: "ee", key: "metrics", value });
  return {
    async computeMetrics() {
      const workflows2 = await workflowsService.find({ populate: "stages" });
      const stagesCount = fp.flow(
        fp.map("stages"),
        // Number of stages per workflow
        fp.map(fp.size)
      )(workflows2);
      const contentTypesCount = fp.flow(
        fp.map("contentTypes"),
        // Number of content types per workflow
        fp.map(fp.size)
      )(workflows2);
      return {
        numberOfActiveWorkflows: fp.size(workflows2),
        avgStagesCount: fp.mean(stagesCount),
        maxStagesCount: fp.max(stagesCount),
        activatedContentTypes: fp.sum(contentTypesCount)
      };
    },
    async sendMetrics() {
      const computedMetrics = await this.computeMetrics();
      metrics.sendDidSendReviewWorkflowPropertiesOnceAWeek(computedMetrics);
      const metricsInfoStored = await getMetricsStoreValue();
      await setMetricsStoreValue({ ...metricsInfoStored, lastWeeklyUpdate: (/* @__PURE__ */ new Date()).getTime() });
    },
    async ensureWeeklyStoredCronSchedule() {
      const metricsInfoStored = await getMetricsStoreValue();
      const { weeklySchedule: currentSchedule, lastWeeklyUpdate } = metricsInfoStored;
      const now = /* @__PURE__ */ new Date();
      let weeklySchedule = currentSchedule;
      if (!currentSchedule || !lastWeeklyUpdate || lastWeeklyUpdate + ONE_WEEK < now.getTime()) {
        weeklySchedule = getWeeklyCronScheduleAt(add(now, { seconds: 10 }));
        await setMetricsStoreValue({ ...metricsInfoStored, weeklySchedule });
      }
      return weeklySchedule;
    },
    async registerCron() {
      const weeklySchedule = await this.ensureWeeklyStoredCronSchedule();
      strapi2.cron.add({
        reviewWorkflowsWeekly: {
          task: this.sendMetrics.bind(this),
          options: weeklySchedule
        }
      });
    }
  };
};
const getEntityStage = async (uid, id, params) => {
  const entity = await strapi.documents(uid).findOne({
    ...params,
    documentId: id,
    status: "draft",
    populate: {
      [ENTITY_STAGE_ATTRIBUTE]: {
        populate: {
          workflow: true
        }
      }
    }
  });
  return entity?.[ENTITY_STAGE_ATTRIBUTE] ?? {};
};
const assignStageOnCreate = async (ctx, next) => {
  if (ctx.action !== "create" && ctx.action !== "clone") {
    return next();
  }
  const workflow2 = await getService("workflows").getAssignedWorkflow(ctx.contentType.uid, {
    populate: "stages"
  });
  if (!workflow2) {
    return next();
  }
  const data = ctx.params.data;
  if (ctx.params?.data && fp.isNil(data[ENTITY_STAGE_ATTRIBUTE])) {
    data[ENTITY_STAGE_ATTRIBUTE] = { id: workflow2.stages[0].id };
  }
  return next();
};
const handleStageOnUpdate = async (ctx, next) => {
  if (ctx.action !== "update") {
    return next();
  }
  const { documentId } = ctx.params;
  const data = ctx.params.data;
  if (fp.isNil(data?.[ENTITY_STAGE_ATTRIBUTE])) {
    delete data?.[ENTITY_STAGE_ATTRIBUTE];
    return next();
  }
  const previousStage = await getEntityStage(ctx.contentType.uid, documentId, ctx.params);
  const result = await next();
  if (!result) {
    return result;
  }
  const updatedStage = result?.[ENTITY_STAGE_ATTRIBUTE];
  if (updatedStage && previousStage?.id && previousStage.id !== updatedStage.id) {
    const model = strapi.getModel(ctx.contentType.uid);
    strapi.eventHub.emit(WORKFLOW_UPDATE_STAGE, {
      model: model.modelName,
      uid: model.uid,
      // TODO v6: Rename to "entry", which is what is used for regular CRUD updates
      entity: {
        // @ts-expect-error
        id: result?.id,
        documentId,
        // @ts-expect-error
        locale: result?.locale,
        status: "draft"
      },
      workflow: {
        id: previousStage.workflow.id,
        stages: {
          from: {
            id: previousStage.id,
            name: previousStage.name
          },
          to: {
            id: updatedStage.id,
            name: updatedStage.name
          }
        }
      }
    });
  }
  return next();
};
const checkStageBeforePublish = async (ctx, next) => {
  if (ctx.action !== "publish") {
    return next();
  }
  const workflow2 = await getService("workflows").getAssignedWorkflow(ctx.contentType.uid, {
    populate: "stageRequiredToPublish"
  });
  if (!workflow2 || !workflow2.stageRequiredToPublish) {
    return next();
  }
  const { documentId } = ctx.params;
  const entryStage = await getEntityStage(ctx.contentType.uid, documentId, ctx.params);
  if (entryStage.id !== workflow2.stageRequiredToPublish.id) {
    throw new errors.ValidationError("Entry is not at the required stage to publish");
  }
  return next();
};
const documentServiceMiddleware = () => ({
  assignStageOnCreate,
  handleStageOnUpdate,
  checkStageBeforePublish
});
const services = {
  workflows: workflows$1,
  stages: stages$1,
  "stage-permissions": stagePermissions,
  assignees: assignees$1,
  validation: reviewWorkflowsValidation,
  "document-service-middlewares": documentServiceMiddleware,
  "workflow-metrics": reviewWorkflowsMetrics,
  "workflow-weekly-metrics": reviewWorkflowsWeeklyMetrics
};
const stageObject = yup.object().shape({
  id: yup.number().integer().min(1),
  name: yup.string().max(255).required(),
  color: yup.string().matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/i),
  // hex color
  permissions: yup.array().of(
    yup.object().shape({
      role: yup.number().integer().min(1).required(),
      action: yup.string().oneOf([STAGE_TRANSITION_UID]).required(),
      actionParameters: yup.object().shape({
        from: yup.number().integer().min(1).required(),
        to: yup.number().integer().min(1)
      })
    })
  )
});
const validateUpdateStageOnEntitySchema = yup.object().shape({
  id: yup.number().integer().min(1).required()
}).required();
const validateContentTypes = yup.array().of(
  yup.string().test({
    name: "content-type-exists",
    message: (value) => `Content type ${value.originalValue} does not exist`,
    test(uid) {
      return !!strapi.getModel(uid);
    }
  }).test({
    name: "content-type-review-workflow-enabled",
    message: (value) => `Content type ${value.originalValue} does not have review workflow enabled`,
    test(uid) {
      const model = strapi.getModel(uid);
      return hasStageAttribute(model);
    }
  })
);
const validateWorkflowCreateSchema = yup.object().shape({
  name: yup.string().max(255).min(1, "Workflow name can not be empty").required(),
  stages: yup.array().of(stageObject).uniqueProperty("name", "Stage name must be unique").min(1, "Can not create a workflow without stages").max(200, "Can not have more than 200 stages").required("Can not create a workflow without stages"),
  contentTypes: validateContentTypes,
  stageRequiredToPublishName: yup.string().min(1).nullable()
});
const validateWorkflowUpdateSchema = yup.object().shape({
  name: yup.string().max(255).min(1, "Workflow name can not be empty"),
  stages: yup.array().of(stageObject).uniqueProperty("name", "Stage name must be unique").min(1, "Can not update a workflow without stages").max(200, "Can not have more than 200 stages"),
  contentTypes: validateContentTypes,
  stageRequiredToPublishName: yup.string().min(1).nullable()
});
const validateUpdateAssigneeOnEntitySchema = yup.object().shape({
  id: yup.number().integer().min(1).nullable()
}).required();
const validateLocaleSchema = yup.string().nullable();
const validateWorkflowCreate = validateYupSchema(validateWorkflowCreateSchema);
const validateUpdateStageOnEntity = validateYupSchema(validateUpdateStageOnEntitySchema);
const validateUpdateAssigneeOnEntity = validateYupSchema(
  validateUpdateAssigneeOnEntitySchema
);
const validateWorkflowUpdate = validateYupSchema(validateWorkflowUpdateSchema);
const validateLocale = validateYupSchema(validateLocaleSchema);
function getWorkflowsPermissionChecker({ strapi: strapi2 }, userAbility) {
  return strapi2.plugin("content-manager").service("permission-checker").create({ userAbility, model: WORKFLOW_MODEL_UID });
}
function formatWorkflowToAdmin(workflow2) {
  if (!workflow2) return;
  if (!workflow2.stages) return workflow2;
  const transformPermissions = fp.map(fp.update("role", fp.property("id")));
  const transformStages = fp.map(fp.update("permissions", transformPermissions));
  return fp.update("stages", transformStages, workflow2);
}
const workflows = {
  /**
   * Create a new workflow
   * @param {import('koa').BaseContext} ctx - koa context
   */
  async create(ctx) {
    const { body, query } = ctx.request;
    const { sanitizeCreateInput, sanitizeOutput, sanitizedQuery } = getWorkflowsPermissionChecker(
      { strapi },
      ctx.state.userAbility
    );
    const { populate } = await sanitizedQuery.create(query);
    const workflowBody = await validateWorkflowCreate(body.data);
    const workflowService = getService("workflows");
    const createdWorkflow = await workflowService.create({
      data: await sanitizeCreateInput(workflowBody),
      populate
    }).then(formatWorkflowToAdmin);
    ctx.created({
      data: await sanitizeOutput(createdWorkflow)
    });
  },
  /**
   * Update a workflow
   * @param {import('koa').BaseContext} ctx - koa context
   */
  async update(ctx) {
    const { id } = ctx.params;
    const { body, query } = ctx.request;
    const workflowService = getService("workflows");
    const { sanitizeUpdateInput, sanitizeOutput, sanitizedQuery } = getWorkflowsPermissionChecker(
      { strapi },
      ctx.state.userAbility
    );
    const { populate } = await sanitizedQuery.update(query);
    const workflowBody = await validateWorkflowUpdate(body.data);
    const workflow2 = await workflowService.findById(id, { populate: WORKFLOW_POPULATE });
    if (!workflow2) {
      return ctx.notFound();
    }
    const getPermittedFieldToUpdate = sanitizeUpdateInput(workflow2);
    const dataToUpdate = await getPermittedFieldToUpdate(workflowBody);
    const updatedWorkflow = await workflowService.update(workflow2, {
      data: dataToUpdate,
      populate
    }).then(formatWorkflowToAdmin);
    ctx.body = {
      data: await sanitizeOutput(updatedWorkflow)
    };
  },
  /**
   * Delete a workflow
   * @param {import('koa').BaseContext} ctx - koa context
   */
  async delete(ctx) {
    const { id } = ctx.params;
    const { query } = ctx.request;
    const workflowService = getService("workflows");
    const { sanitizeOutput, sanitizedQuery } = getWorkflowsPermissionChecker(
      { strapi },
      ctx.state.userAbility
    );
    const { populate } = await sanitizedQuery.delete(query);
    const workflow2 = await workflowService.findById(id, { populate: WORKFLOW_POPULATE });
    if (!workflow2) {
      return ctx.notFound("Workflow doesn't exist");
    }
    const deletedWorkflow = await workflowService.delete(workflow2, { populate }).then(formatWorkflowToAdmin);
    ctx.body = {
      data: await sanitizeOutput(deletedWorkflow)
    };
  },
  /**
   * List all workflows
   * @param {import('koa').BaseContext} ctx - koa context
   */
  async find(ctx) {
    const { query } = ctx.request;
    const workflowService = getService("workflows");
    const { sanitizeOutput, sanitizedQuery } = getWorkflowsPermissionChecker(
      { strapi },
      ctx.state.userAbility
    );
    const { populate, filters, sort: sort2 } = await sanitizedQuery.read(query);
    const [workflows2, workflowCount] = await Promise.all([
      workflowService.find({ populate, filters, sort: sort2 }).then(fp.map(formatWorkflowToAdmin)),
      workflowService.count()
    ]);
    ctx.body = {
      data: await async.map(workflows2, sanitizeOutput),
      meta: {
        workflowCount
      }
    };
  }
};
function sanitizeStage({ strapi: strapi2 }, userAbility) {
  const permissionChecker = strapi2.plugin("content-manager").service("permission-checker").create({ userAbility, model: STAGE_MODEL_UID });
  return (entity) => permissionChecker.sanitizeOutput(entity);
}
const stages = {
  /**
   * List all stages
   * @param {import('koa').BaseContext} ctx - koa context
   */
  async find(ctx) {
    const { workflow_id: workflowId } = ctx.params;
    const { populate } = ctx.query;
    const stagesService = getService("stages");
    const sanitizer = sanitizeStage({ strapi }, ctx.state.userAbility);
    const stages2 = await stagesService.find({
      workflowId,
      populate
    });
    ctx.body = {
      data: await async.map(stages2, sanitizer)
    };
  },
  /**
   * Get one stage
   * @param {import('koa').BaseContext} ctx - koa context
   */
  async findById(ctx) {
    const { id, workflow_id: workflowId } = ctx.params;
    const { populate } = ctx.query;
    const stagesService = getService("stages");
    const sanitizer = sanitizeStage({ strapi }, ctx.state.userAbility);
    const stage = await stagesService.findById(id, {
      workflowId,
      populate
    });
    ctx.body = {
      data: await sanitizer(stage)
    };
  },
  /**
   * Updates an entity's stage.
   * @async
   * @param {Object} ctx - The Koa context object.
   * @param {Object} ctx.params - An object containing the parameters from the request URL.
   * @param {string} ctx.params.model_uid - The model UID of the entity.
   * @param {string} ctx.params.id - The ID of the entity to update.
   * @param {Object} ctx.request.body.data - Optional data object containing the new stage ID for the entity.
   * @param {string} ctx.request.body.data.id - The ID of the new stage for the entity.
   * @throws {ApplicationError} If review workflows is not activated on the specified model UID.
   * @throws {ValidationError} If the `data` object in the request body fails to pass validation.
   * @returns {Promise<void>} A promise that resolves when the entity's stage has been updated.
   */
  async updateEntity(ctx) {
    const stagesService = getService("stages");
    const stagePermissions2 = getService("stage-permissions");
    const workflowService = getService("workflows");
    const { model_uid: modelUID, id: documentId } = ctx.params;
    const { body, query = {} } = ctx.request;
    const { sanitizeOutput } = strapi.plugin("content-manager").service("permission-checker").create({ userAbility: ctx.state.userAbility, model: modelUID });
    const locale = await validateLocale(query?.locale);
    const entity = await strapi.documents(modelUID).findOne({
      documentId,
      // @ts-expect-error - locale should be also null in the doc service types
      locale,
      populate: [ENTITY_STAGE_ATTRIBUTE]
    });
    if (!entity) {
      ctx.throw(404, "Entity not found");
    }
    const canTransition = stagePermissions2.can(
      STAGE_TRANSITION_UID,
      entity[ENTITY_STAGE_ATTRIBUTE]?.id
    );
    if (!canTransition) {
      ctx.throw(403, "Forbidden stage transition");
    }
    const { id: stageId } = await validateUpdateStageOnEntity(
      { id: Number(body?.data?.id) },
      "You should pass an id to the body of the put request."
    );
    const workflow2 = await workflowService.assertContentTypeBelongsToWorkflow(modelUID);
    workflowService.assertStageBelongsToWorkflow(stageId, workflow2);
    const updatedEntity = await stagesService.updateEntity(entity, modelUID, stageId);
    ctx.body = { data: await sanitizeOutput(updatedEntity) };
  },
  /**
   * List all the stages that are available for a user to transition an entity to.
   * If the user has permission to change the current stage of the entity every other stage in the workflow is returned
   * @async
   * @param {*} ctx
   * @param {string} ctx.params.model_uid - The model UID of the entity.
   * @param {string} ctx.params.id - The ID of the entity.
   * @throws {ApplicationError} If review workflows is not activated on the specified model UID.
   */
  async listAvailableStages(ctx) {
    const stagePermissions2 = getService("stage-permissions");
    const workflowService = getService("workflows");
    const { model_uid: modelUID, id: documentId } = ctx.params;
    const { query = {} } = ctx.request;
    if (strapi.plugin("content-manager").service("permission-checker").create({ userAbility: ctx.state.userAbility, model: modelUID }).cannot.read()) {
      return ctx.forbidden();
    }
    const locale = await validateLocale(query?.locale) ?? void 0;
    const entity = await strapi.documents(modelUID).findOne({
      documentId,
      locale,
      populate: [ENTITY_STAGE_ATTRIBUTE]
    });
    if (!entity) {
      ctx.throw(404, "Entity not found");
    }
    const entityStageId = entity[ENTITY_STAGE_ATTRIBUTE]?.id;
    const canTransition = stagePermissions2.can(STAGE_TRANSITION_UID, entityStageId);
    const [workflowCount, workflowResult] = await Promise.all([
      workflowService.count(),
      workflowService.getAssignedWorkflow(modelUID, {
        populate: "stages"
      })
    ]);
    const workflowStages = workflowResult ? workflowResult.stages : [];
    const meta = {
      stageCount: workflowStages.length,
      workflowCount
    };
    if (!canTransition) {
      ctx.body = {
        data: [],
        meta
      };
      return;
    }
    const data = workflowStages.filter((stage) => stage.id !== entityStageId);
    ctx.body = {
      data,
      meta
    };
  }
};
const assignees = {
  /**
   * Updates an entity's assignee.
   * @async
   * @param {Object} ctx - The Koa context object.
   * @param {Object} ctx.params - An object containing the parameters from the request URL.
   * @param {string} ctx.params.model_uid - The model UID of the entity.
   * @param {string} ctx.params.id - The ID of the entity to update.
   * @param {Object} ctx.request.body.data - Optional data object containing the new assignee ID for the entity.
   * @param {string} ctx.request.body.data.id - The ID of the new assignee for the entity.
   * @throws {ApplicationError} If review workflows is not activated on the specified model UID.
   * @throws {ValidationError} If the `data` object in the request body fails to pass validation.
   * @returns {Promise<void>} A promise that resolves when the entity's assignee has been updated.
   */
  async updateEntity(ctx) {
    const assigneeService = getService("assignees");
    const workflowService = getService("workflows");
    const stagePermissions2 = getService("stage-permissions");
    const { model_uid: model, id: documentId } = ctx.params;
    const locale = await validateLocale(ctx.request.query?.locale) ?? void 0;
    const { sanitizeOutput } = strapi.plugin("content-manager").service("permission-checker").create({ userAbility: ctx.state.userAbility, model });
    const entity = await strapi.documents(model).findOne({
      documentId,
      locale,
      populate: [ENTITY_STAGE_ATTRIBUTE]
    });
    if (!entity) {
      ctx.throw(404, "Entity not found");
    }
    const canTransitionStage = stagePermissions2.can(
      STAGE_TRANSITION_UID,
      entity[ENTITY_STAGE_ATTRIBUTE]?.id
    );
    if (!canTransitionStage) {
      ctx.throw(403, "Stage transition permission is required");
    }
    const { id: assigneeId } = await validateUpdateAssigneeOnEntity(
      ctx.request?.body?.data,
      "You should pass a valid id to the body of the put request."
    );
    await workflowService.assertContentTypeBelongsToWorkflow(model);
    const updatedEntity = await assigneeService.updateEntityAssignee(entity, model, assigneeId);
    ctx.body = { data: await sanitizeOutput(updatedEntity) };
  }
};
const controllers = {
  workflows,
  stages,
  assignees
};
const getPlugin = () => {
  if (strapi.ee.features.isEnabled("review-workflows")) {
    return {
      register,
      bootstrap,
      destroy,
      contentTypes,
      services,
      controllers,
      routes
    };
  }
  return {
    // Always return contentTypes to avoid losing data when the feature is disabled
    // or downgrading the license
    contentTypes
  };
};
const index = getPlugin();
export {
  index as default
};
//# sourceMappingURL=index.mjs.map
