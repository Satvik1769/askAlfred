import { A as AccountController, N as NetworkUtil, a as NetworkController, S as StorageUtil, R as RouterController, C as ConnectionController, b as RouterUtil, p as proxy, s as subscribeKey, c as subscribe, r as ref, O as OptionsController, d as customElement, M as ModalController, E as EventsController, W as W3mFrameRpcConstants, e as SnackController } from "./index-86a5491a.js";
const ConstantsUtil = {
  FIVE_MINUTES_IN_MS: 3e5
};
class Web3ModalSIWEClient {
  constructor(siweConfig) {
    const { enabled = true, nonceRefetchIntervalMs = ConstantsUtil.FIVE_MINUTES_IN_MS, sessionRefetchIntervalMs = ConstantsUtil.FIVE_MINUTES_IN_MS, signOutOnAccountChange = true, signOutOnDisconnect = true, signOutOnNetworkChange = true, ...siweConfigMethods } = siweConfig;
    this.options = {
      enabled,
      nonceRefetchIntervalMs,
      sessionRefetchIntervalMs,
      signOutOnDisconnect,
      signOutOnAccountChange,
      signOutOnNetworkChange
    };
    this.methods = siweConfigMethods;
  }
  async getNonce(address) {
    const nonce = await this.methods.getNonce(address);
    if (!nonce) {
      throw new Error("siweControllerClient:getNonce - nonce is undefined");
    }
    return nonce;
  }
  async getMessageParams() {
    return await this.methods.getMessageParams?.() || {};
  }
  createMessage(args) {
    const message = this.methods.createMessage(args);
    if (!message) {
      throw new Error("siweControllerClient:createMessage - message is undefined");
    }
    return message;
  }
  async verifyMessage(args) {
    const isValid = await this.methods.verifyMessage(args);
    return isValid;
  }
  async getSession() {
    const session = await this.methods.getSession();
    if (!session) {
      throw new Error("siweControllerClient:getSession - session is undefined");
    }
    return session;
  }
  async signIn() {
    const address = AccountController.state.address;
    const nonce = await this.methods.getNonce(address);
    if (!address) {
      throw new Error("An address is required to create a SIWE message.");
    }
    const chainId = NetworkUtil.caipNetworkIdToNumber(NetworkController.state.caipNetwork?.id);
    if (!chainId) {
      throw new Error("A chainId is required to create a SIWE message.");
    }
    const messageParams = await this.getMessageParams?.();
    const message = this.methods.createMessage({
      address: `eip155:${chainId}:${address}`,
      chainId,
      nonce,
      version: "1",
      iat: messageParams?.iat || (/* @__PURE__ */ new Date()).toISOString(),
      ...messageParams
    });
    const type = StorageUtil.getConnectedConnector();
    if (type === "AUTH") {
      RouterController.pushTransactionStack({
        view: null,
        goBack: false,
        replace: true,
        onCancel() {
          RouterController.replace("ConnectingSiwe");
        }
      });
    }
    const signature = await ConnectionController.signMessage(message);
    const isValid = await this.methods.verifyMessage({ message, signature });
    if (!isValid) {
      throw new Error("Error verifying SIWE signature");
    }
    const session = await this.methods.getSession();
    if (!session) {
      throw new Error("Error verifying SIWE signature");
    }
    if (this.methods.onSignIn) {
      this.methods.onSignIn(session);
    }
    RouterUtil.navigateAfterNetworkSwitch();
    return session;
  }
  async signOut() {
    this.methods.onSignOut?.();
    return this.methods.signOut();
  }
}
var On = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function A0(e2) {
  var t2 = e2.default;
  if (typeof t2 == "function") {
    var r2 = function() {
      return t2.apply(this, arguments);
    };
    r2.prototype = t2.prototype;
  } else
    r2 = {};
  return Object.defineProperty(r2, "__esModule", { value: true }), Object.keys(e2).forEach(function(i2) {
    var n3 = Object.getOwnPropertyDescriptor(e2, i2);
    Object.defineProperty(r2, i2, n3.get ? n3 : { enumerable: true, get: function() {
      return e2[i2];
    } });
  }), r2;
}
var Pn = { exports: {} };
/**
* [js-sha3]{@link https://github.com/emn178/js-sha3}
*
* @version 0.8.0
* @author Chen, Yi-Cyuan [emn178@gmail.com]
* @copyright Chen, Yi-Cyuan 2015-2018
* @license MIT
*/
(function(e2) {
  (function() {
    var t2 = "input is invalid type", r2 = "finalize already called", i2 = typeof window == "object", n3 = i2 ? window : {};
    n3.JS_SHA3_NO_WINDOW && (i2 = false);
    var o2 = !i2 && typeof self == "object", h2 = !n3.JS_SHA3_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    h2 ? n3 = On : o2 && (n3 = self);
    var p2 = !n3.JS_SHA3_NO_COMMON_JS && true && e2.exports, b2 = !n3.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", m2 = "0123456789abcdef".split(""), w2 = [31, 7936, 2031616, 520093696], y2 = [4, 1024, 262144, 67108864], S2 = [1, 256, 65536, 16777216], I2 = [6, 1536, 393216, 100663296], N2 = [0, 8, 16, 24], C2 = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], F = [224, 256, 384, 512], U = [128, 256], J = ["hex", "buffer", "arrayBuffer", "array", "digest"], Bt = { 128: 168, 256: 136 };
    (n3.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(u2) {
      return Object.prototype.toString.call(u2) === "[object Array]";
    }), b2 && (n3.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(u2) {
      return typeof u2 == "object" && u2.buffer && u2.buffer.constructor === ArrayBuffer;
    });
    for (var G = function(u2, E2, _2) {
      return function(B) {
        return new s2(u2, E2, u2).update(B)[_2]();
      };
    }, H2 = function(u2, E2, _2) {
      return function(B, R2) {
        return new s2(u2, E2, R2).update(B)[_2]();
      };
    }, z = function(u2, E2, _2) {
      return function(B, R2, T2, P2) {
        return f2["cshake" + u2].update(B, R2, T2, P2)[_2]();
      };
    }, Pt = function(u2, E2, _2) {
      return function(B, R2, T2, P2) {
        return f2["kmac" + u2].update(B, R2, T2, P2)[_2]();
      };
    }, W = function(u2, E2, _2, B) {
      for (var R2 = 0; R2 < J.length; ++R2) {
        var T2 = J[R2];
        u2[T2] = E2(_2, B, T2);
      }
      return u2;
    }, Rt = function(u2, E2) {
      var _2 = G(u2, E2, "hex");
      return _2.create = function() {
        return new s2(u2, E2, u2);
      }, _2.update = function(B) {
        return _2.create().update(B);
      }, W(_2, G, u2, E2);
    }, Yt = function(u2, E2) {
      var _2 = H2(u2, E2, "hex");
      return _2.create = function(B) {
        return new s2(u2, E2, B);
      }, _2.update = function(B, R2) {
        return _2.create(R2).update(B);
      }, W(_2, H2, u2, E2);
    }, Y = function(u2, E2) {
      var _2 = Bt[u2], B = z(u2, E2, "hex");
      return B.create = function(R2, T2, P2) {
        return !T2 && !P2 ? f2["shake" + u2].create(R2) : new s2(u2, E2, R2).bytepad([T2, P2], _2);
      }, B.update = function(R2, T2, P2, O) {
        return B.create(T2, P2, O).update(R2);
      }, W(B, z, u2, E2);
    }, Vt = function(u2, E2) {
      var _2 = Bt[u2], B = Pt(u2, E2, "hex");
      return B.create = function(R2, T2, P2) {
        return new v2(u2, E2, T2).bytepad(["KMAC", P2], _2).bytepad([R2], _2);
      }, B.update = function(R2, T2, P2, O) {
        return B.create(R2, P2, O).update(T2);
      }, W(B, Pt, u2, E2);
    }, A2 = [{ name: "keccak", padding: S2, bits: F, createMethod: Rt }, { name: "sha3", padding: I2, bits: F, createMethod: Rt }, { name: "shake", padding: w2, bits: U, createMethod: Yt }, { name: "cshake", padding: y2, bits: U, createMethod: Y }, { name: "kmac", padding: y2, bits: U, createMethod: Vt }], f2 = {}, a2 = [], c2 = 0; c2 < A2.length; ++c2)
      for (var d2 = A2[c2], g2 = d2.bits, x2 = 0; x2 < g2.length; ++x2) {
        var M2 = d2.name + "_" + g2[x2];
        if (a2.push(M2), f2[M2] = d2.createMethod(g2[x2], d2.padding), d2.name !== "sha3") {
          var l2 = d2.name + g2[x2];
          a2.push(l2), f2[l2] = f2[M2];
        }
      }
    function s2(u2, E2, _2) {
      this.blocks = [], this.s = [], this.padding = E2, this.outputBits = _2, this.reset = true, this.finalized = false, this.block = 0, this.start = 0, this.blockCount = 1600 - (u2 << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = _2 >> 5, this.extraBytes = (_2 & 31) >> 3;
      for (var B = 0; B < 50; ++B)
        this.s[B] = 0;
    }
    s2.prototype.update = function(u2) {
      if (this.finalized)
        throw new Error(r2);
      var E2, _2 = typeof u2;
      if (_2 !== "string") {
        if (_2 === "object") {
          if (u2 === null)
            throw new Error(t2);
          if (b2 && u2.constructor === ArrayBuffer)
            u2 = new Uint8Array(u2);
          else if (!Array.isArray(u2) && (!b2 || !ArrayBuffer.isView(u2)))
            throw new Error(t2);
        } else
          throw new Error(t2);
        E2 = true;
      }
      for (var B = this.blocks, R2 = this.byteCount, T2 = u2.length, P2 = this.blockCount, O = 0, Ct = this.s, D, q; O < T2; ) {
        if (this.reset)
          for (this.reset = false, B[0] = this.block, D = 1; D < P2 + 1; ++D)
            B[D] = 0;
        if (E2)
          for (D = this.start; O < T2 && D < R2; ++O)
            B[D >> 2] |= u2[O] << N2[D++ & 3];
        else
          for (D = this.start; O < T2 && D < R2; ++O)
            q = u2.charCodeAt(O), q < 128 ? B[D >> 2] |= q << N2[D++ & 3] : q < 2048 ? (B[D >> 2] |= (192 | q >> 6) << N2[D++ & 3], B[D >> 2] |= (128 | q & 63) << N2[D++ & 3]) : q < 55296 || q >= 57344 ? (B[D >> 2] |= (224 | q >> 12) << N2[D++ & 3], B[D >> 2] |= (128 | q >> 6 & 63) << N2[D++ & 3], B[D >> 2] |= (128 | q & 63) << N2[D++ & 3]) : (q = 65536 + ((q & 1023) << 10 | u2.charCodeAt(++O) & 1023), B[D >> 2] |= (240 | q >> 18) << N2[D++ & 3], B[D >> 2] |= (128 | q >> 12 & 63) << N2[D++ & 3], B[D >> 2] |= (128 | q >> 6 & 63) << N2[D++ & 3], B[D >> 2] |= (128 | q & 63) << N2[D++ & 3]);
        if (this.lastByteIndex = D, D >= R2) {
          for (this.start = D - R2, this.block = B[P2], D = 0; D < P2; ++D)
            Ct[D] ^= B[D];
          k2(Ct), this.reset = true;
        } else
          this.start = D;
      }
      return this;
    }, s2.prototype.encode = function(u2, E2) {
      var _2 = u2 & 255, B = 1, R2 = [_2];
      for (u2 = u2 >> 8, _2 = u2 & 255; _2 > 0; )
        R2.unshift(_2), u2 = u2 >> 8, _2 = u2 & 255, ++B;
      return E2 ? R2.push(B) : R2.unshift(B), this.update(R2), R2.length;
    }, s2.prototype.encodeString = function(u2) {
      var E2, _2 = typeof u2;
      if (_2 !== "string") {
        if (_2 === "object") {
          if (u2 === null)
            throw new Error(t2);
          if (b2 && u2.constructor === ArrayBuffer)
            u2 = new Uint8Array(u2);
          else if (!Array.isArray(u2) && (!b2 || !ArrayBuffer.isView(u2)))
            throw new Error(t2);
        } else
          throw new Error(t2);
        E2 = true;
      }
      var B = 0, R2 = u2.length;
      if (E2)
        B = R2;
      else
        for (var T2 = 0; T2 < u2.length; ++T2) {
          var P2 = u2.charCodeAt(T2);
          P2 < 128 ? B += 1 : P2 < 2048 ? B += 2 : P2 < 55296 || P2 >= 57344 ? B += 3 : (P2 = 65536 + ((P2 & 1023) << 10 | u2.charCodeAt(++T2) & 1023), B += 4);
        }
      return B += this.encode(B * 8), this.update(u2), B;
    }, s2.prototype.bytepad = function(u2, E2) {
      for (var _2 = this.encode(E2), B = 0; B < u2.length; ++B)
        _2 += this.encodeString(u2[B]);
      var R2 = E2 - _2 % E2, T2 = [];
      return T2.length = R2, this.update(T2), this;
    }, s2.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = true;
        var u2 = this.blocks, E2 = this.lastByteIndex, _2 = this.blockCount, B = this.s;
        if (u2[E2 >> 2] |= this.padding[E2 & 3], this.lastByteIndex === this.byteCount)
          for (u2[0] = u2[_2], E2 = 1; E2 < _2 + 1; ++E2)
            u2[E2] = 0;
        for (u2[_2 - 1] |= 2147483648, E2 = 0; E2 < _2; ++E2)
          B[E2] ^= u2[E2];
        k2(B);
      }
    }, s2.prototype.toString = s2.prototype.hex = function() {
      this.finalize();
      for (var u2 = this.blockCount, E2 = this.s, _2 = this.outputBlocks, B = this.extraBytes, R2 = 0, T2 = 0, P2 = "", O; T2 < _2; ) {
        for (R2 = 0; R2 < u2 && T2 < _2; ++R2, ++T2)
          O = E2[R2], P2 += m2[O >> 4 & 15] + m2[O & 15] + m2[O >> 12 & 15] + m2[O >> 8 & 15] + m2[O >> 20 & 15] + m2[O >> 16 & 15] + m2[O >> 28 & 15] + m2[O >> 24 & 15];
        T2 % u2 === 0 && (k2(E2), R2 = 0);
      }
      return B && (O = E2[R2], P2 += m2[O >> 4 & 15] + m2[O & 15], B > 1 && (P2 += m2[O >> 12 & 15] + m2[O >> 8 & 15]), B > 2 && (P2 += m2[O >> 20 & 15] + m2[O >> 16 & 15])), P2;
    }, s2.prototype.arrayBuffer = function() {
      this.finalize();
      var u2 = this.blockCount, E2 = this.s, _2 = this.outputBlocks, B = this.extraBytes, R2 = 0, T2 = 0, P2 = this.outputBits >> 3, O;
      B ? O = new ArrayBuffer(_2 + 1 << 2) : O = new ArrayBuffer(P2);
      for (var Ct = new Uint32Array(O); T2 < _2; ) {
        for (R2 = 0; R2 < u2 && T2 < _2; ++R2, ++T2)
          Ct[T2] = E2[R2];
        T2 % u2 === 0 && k2(E2);
      }
      return B && (Ct[R2] = E2[R2], O = O.slice(0, P2)), O;
    }, s2.prototype.buffer = s2.prototype.arrayBuffer, s2.prototype.digest = s2.prototype.array = function() {
      this.finalize();
      for (var u2 = this.blockCount, E2 = this.s, _2 = this.outputBlocks, B = this.extraBytes, R2 = 0, T2 = 0, P2 = [], O, Ct; T2 < _2; ) {
        for (R2 = 0; R2 < u2 && T2 < _2; ++R2, ++T2)
          O = T2 << 2, Ct = E2[R2], P2[O] = Ct & 255, P2[O + 1] = Ct >> 8 & 255, P2[O + 2] = Ct >> 16 & 255, P2[O + 3] = Ct >> 24 & 255;
        T2 % u2 === 0 && k2(E2);
      }
      return B && (O = T2 << 2, Ct = E2[R2], P2[O] = Ct & 255, B > 1 && (P2[O + 1] = Ct >> 8 & 255), B > 2 && (P2[O + 2] = Ct >> 16 & 255)), P2;
    };
    function v2(u2, E2, _2) {
      s2.call(this, u2, E2, _2);
    }
    v2.prototype = new s2(), v2.prototype.finalize = function() {
      return this.encode(this.outputBits, true), s2.prototype.finalize.call(this);
    };
    var k2 = function(u2) {
      var E2, _2, B, R2, T2, P2, O, Ct, D, q, De, X, Z2, Fe, $2, tt, Te, et, rt, Ue, it, nt, ke, ft, ot, qe, st, at, Ke, ut, ht, He, ct, lt, ze, dt, pt, Le, vt, mt, je, gt, At, Qe, bt, yt, Je, wt, xt, Ge, Mt, Et, Ye, St, Nt, Ve, It, _t, Me, Ee, Se, Ne, Ie;
      for (B = 0; B < 48; B += 2)
        R2 = u2[0] ^ u2[10] ^ u2[20] ^ u2[30] ^ u2[40], T2 = u2[1] ^ u2[11] ^ u2[21] ^ u2[31] ^ u2[41], P2 = u2[2] ^ u2[12] ^ u2[22] ^ u2[32] ^ u2[42], O = u2[3] ^ u2[13] ^ u2[23] ^ u2[33] ^ u2[43], Ct = u2[4] ^ u2[14] ^ u2[24] ^ u2[34] ^ u2[44], D = u2[5] ^ u2[15] ^ u2[25] ^ u2[35] ^ u2[45], q = u2[6] ^ u2[16] ^ u2[26] ^ u2[36] ^ u2[46], De = u2[7] ^ u2[17] ^ u2[27] ^ u2[37] ^ u2[47], X = u2[8] ^ u2[18] ^ u2[28] ^ u2[38] ^ u2[48], Z2 = u2[9] ^ u2[19] ^ u2[29] ^ u2[39] ^ u2[49], E2 = X ^ (P2 << 1 | O >>> 31), _2 = Z2 ^ (O << 1 | P2 >>> 31), u2[0] ^= E2, u2[1] ^= _2, u2[10] ^= E2, u2[11] ^= _2, u2[20] ^= E2, u2[21] ^= _2, u2[30] ^= E2, u2[31] ^= _2, u2[40] ^= E2, u2[41] ^= _2, E2 = R2 ^ (Ct << 1 | D >>> 31), _2 = T2 ^ (D << 1 | Ct >>> 31), u2[2] ^= E2, u2[3] ^= _2, u2[12] ^= E2, u2[13] ^= _2, u2[22] ^= E2, u2[23] ^= _2, u2[32] ^= E2, u2[33] ^= _2, u2[42] ^= E2, u2[43] ^= _2, E2 = P2 ^ (q << 1 | De >>> 31), _2 = O ^ (De << 1 | q >>> 31), u2[4] ^= E2, u2[5] ^= _2, u2[14] ^= E2, u2[15] ^= _2, u2[24] ^= E2, u2[25] ^= _2, u2[34] ^= E2, u2[35] ^= _2, u2[44] ^= E2, u2[45] ^= _2, E2 = Ct ^ (X << 1 | Z2 >>> 31), _2 = D ^ (Z2 << 1 | X >>> 31), u2[6] ^= E2, u2[7] ^= _2, u2[16] ^= E2, u2[17] ^= _2, u2[26] ^= E2, u2[27] ^= _2, u2[36] ^= E2, u2[37] ^= _2, u2[46] ^= E2, u2[47] ^= _2, E2 = q ^ (R2 << 1 | T2 >>> 31), _2 = De ^ (T2 << 1 | R2 >>> 31), u2[8] ^= E2, u2[9] ^= _2, u2[18] ^= E2, u2[19] ^= _2, u2[28] ^= E2, u2[29] ^= _2, u2[38] ^= E2, u2[39] ^= _2, u2[48] ^= E2, u2[49] ^= _2, Fe = u2[0], $2 = u2[1], yt = u2[11] << 4 | u2[10] >>> 28, Je = u2[10] << 4 | u2[11] >>> 28, at = u2[20] << 3 | u2[21] >>> 29, Ke = u2[21] << 3 | u2[20] >>> 29, Ee = u2[31] << 9 | u2[30] >>> 23, Se = u2[30] << 9 | u2[31] >>> 23, gt = u2[40] << 18 | u2[41] >>> 14, At = u2[41] << 18 | u2[40] >>> 14, lt = u2[2] << 1 | u2[3] >>> 31, ze = u2[3] << 1 | u2[2] >>> 31, tt = u2[13] << 12 | u2[12] >>> 20, Te = u2[12] << 12 | u2[13] >>> 20, wt = u2[22] << 10 | u2[23] >>> 22, xt = u2[23] << 10 | u2[22] >>> 22, ut = u2[33] << 13 | u2[32] >>> 19, ht = u2[32] << 13 | u2[33] >>> 19, Ne = u2[42] << 2 | u2[43] >>> 30, Ie = u2[43] << 2 | u2[42] >>> 30, St = u2[5] << 30 | u2[4] >>> 2, Nt = u2[4] << 30 | u2[5] >>> 2, dt = u2[14] << 6 | u2[15] >>> 26, pt = u2[15] << 6 | u2[14] >>> 26, et = u2[25] << 11 | u2[24] >>> 21, rt = u2[24] << 11 | u2[25] >>> 21, Ge = u2[34] << 15 | u2[35] >>> 17, Mt = u2[35] << 15 | u2[34] >>> 17, He = u2[45] << 29 | u2[44] >>> 3, ct = u2[44] << 29 | u2[45] >>> 3, ft = u2[6] << 28 | u2[7] >>> 4, ot = u2[7] << 28 | u2[6] >>> 4, Ve = u2[17] << 23 | u2[16] >>> 9, It = u2[16] << 23 | u2[17] >>> 9, Le = u2[26] << 25 | u2[27] >>> 7, vt = u2[27] << 25 | u2[26] >>> 7, Ue = u2[36] << 21 | u2[37] >>> 11, it = u2[37] << 21 | u2[36] >>> 11, Et = u2[47] << 24 | u2[46] >>> 8, Ye = u2[46] << 24 | u2[47] >>> 8, Qe = u2[8] << 27 | u2[9] >>> 5, bt = u2[9] << 27 | u2[8] >>> 5, qe = u2[18] << 20 | u2[19] >>> 12, st = u2[19] << 20 | u2[18] >>> 12, _t = u2[29] << 7 | u2[28] >>> 25, Me = u2[28] << 7 | u2[29] >>> 25, mt = u2[38] << 8 | u2[39] >>> 24, je = u2[39] << 8 | u2[38] >>> 24, nt = u2[48] << 14 | u2[49] >>> 18, ke = u2[49] << 14 | u2[48] >>> 18, u2[0] = Fe ^ ~tt & et, u2[1] = $2 ^ ~Te & rt, u2[10] = ft ^ ~qe & at, u2[11] = ot ^ ~st & Ke, u2[20] = lt ^ ~dt & Le, u2[21] = ze ^ ~pt & vt, u2[30] = Qe ^ ~yt & wt, u2[31] = bt ^ ~Je & xt, u2[40] = St ^ ~Ve & _t, u2[41] = Nt ^ ~It & Me, u2[2] = tt ^ ~et & Ue, u2[3] = Te ^ ~rt & it, u2[12] = qe ^ ~at & ut, u2[13] = st ^ ~Ke & ht, u2[22] = dt ^ ~Le & mt, u2[23] = pt ^ ~vt & je, u2[32] = yt ^ ~wt & Ge, u2[33] = Je ^ ~xt & Mt, u2[42] = Ve ^ ~_t & Ee, u2[43] = It ^ ~Me & Se, u2[4] = et ^ ~Ue & nt, u2[5] = rt ^ ~it & ke, u2[14] = at ^ ~ut & He, u2[15] = Ke ^ ~ht & ct, u2[24] = Le ^ ~mt & gt, u2[25] = vt ^ ~je & At, u2[34] = wt ^ ~Ge & Et, u2[35] = xt ^ ~Mt & Ye, u2[44] = _t ^ ~Ee & Ne, u2[45] = Me ^ ~Se & Ie, u2[6] = Ue ^ ~nt & Fe, u2[7] = it ^ ~ke & $2, u2[16] = ut ^ ~He & ft, u2[17] = ht ^ ~ct & ot, u2[26] = mt ^ ~gt & lt, u2[27] = je ^ ~At & ze, u2[36] = Ge ^ ~Et & Qe, u2[37] = Mt ^ ~Ye & bt, u2[46] = Ee ^ ~Ne & St, u2[47] = Se ^ ~Ie & Nt, u2[8] = nt ^ ~Fe & tt, u2[9] = ke ^ ~$2 & Te, u2[18] = He ^ ~ft & qe, u2[19] = ct ^ ~ot & st, u2[28] = gt ^ ~lt & dt, u2[29] = At ^ ~ze & pt, u2[38] = Et ^ ~Qe & yt, u2[39] = Ye ^ ~bt & Je, u2[48] = Ne ^ ~St & Ve, u2[49] = Ie ^ ~Nt & It, u2[0] ^= C2[B], u2[1] ^= C2[B + 1];
    };
    if (p2)
      e2.exports = f2;
    else
      for (c2 = 0; c2 < a2.length; ++c2)
        n3[a2[c2]] = f2[a2[c2]];
  })();
})(Pn);
var b0 = Pn.exports;
const y0 = "logger/5.7.0";
let Dn = false, Fn = false;
const Cr = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let Tn = Cr.default, gi = null;
function w0() {
  try {
    const e2 = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t2) => {
      try {
        if ("test".normalize(t2) !== "test")
          throw new Error("bad normalize");
      } catch {
        e2.push(t2);
      }
    }), e2.length)
      throw new Error("missing " + e2.join(", "));
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
      throw new Error("broken implementation");
  } catch (e2) {
    return e2.message;
  }
  return null;
}
const Un = w0();
var Ai;
(function(e2) {
  e2.DEBUG = "DEBUG", e2.INFO = "INFO", e2.WARNING = "WARNING", e2.ERROR = "ERROR", e2.OFF = "OFF";
})(Ai || (Ai = {}));
var re;
(function(e2) {
  e2.UNKNOWN_ERROR = "UNKNOWN_ERROR", e2.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", e2.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", e2.NETWORK_ERROR = "NETWORK_ERROR", e2.SERVER_ERROR = "SERVER_ERROR", e2.TIMEOUT = "TIMEOUT", e2.BUFFER_OVERRUN = "BUFFER_OVERRUN", e2.NUMERIC_FAULT = "NUMERIC_FAULT", e2.MISSING_NEW = "MISSING_NEW", e2.INVALID_ARGUMENT = "INVALID_ARGUMENT", e2.MISSING_ARGUMENT = "MISSING_ARGUMENT", e2.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", e2.CALL_EXCEPTION = "CALL_EXCEPTION", e2.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", e2.NONCE_EXPIRED = "NONCE_EXPIRED", e2.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", e2.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", e2.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", e2.ACTION_REJECTED = "ACTION_REJECTED";
})(re || (re = {}));
const kn = "0123456789abcdef";
let L$1 = class L {
  constructor(t2) {
    Object.defineProperty(this, "version", { enumerable: true, value: t2, writable: false });
  }
  _log(t2, r2) {
    const i2 = t2.toLowerCase();
    Cr[i2] == null && this.throwArgumentError("invalid log level name", "logLevel", t2), !(Tn > Cr[i2]) && console.log.apply(console, r2);
  }
  debug(...t2) {
    this._log(L.levels.DEBUG, t2);
  }
  info(...t2) {
    this._log(L.levels.INFO, t2);
  }
  warn(...t2) {
    this._log(L.levels.WARNING, t2);
  }
  makeError(t2, r2, i2) {
    if (Fn)
      return this.makeError("censored error", r2, {});
    r2 || (r2 = L.errors.UNKNOWN_ERROR), i2 || (i2 = {});
    const n3 = [];
    Object.keys(i2).forEach((b2) => {
      const m2 = i2[b2];
      try {
        if (m2 instanceof Uint8Array) {
          let w2 = "";
          for (let y2 = 0; y2 < m2.length; y2++)
            w2 += kn[m2[y2] >> 4], w2 += kn[m2[y2] & 15];
          n3.push(b2 + "=Uint8Array(0x" + w2 + ")");
        } else
          n3.push(b2 + "=" + JSON.stringify(m2));
      } catch {
        n3.push(b2 + "=" + JSON.stringify(i2[b2].toString()));
      }
    }), n3.push(`code=${r2}`), n3.push(`version=${this.version}`);
    const o2 = t2;
    let h2 = "";
    switch (r2) {
      case re.NUMERIC_FAULT: {
        h2 = "NUMERIC_FAULT";
        const b2 = t2;
        switch (b2) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            h2 += "-" + b2;
            break;
          case "negative-power":
          case "negative-width":
            h2 += "-unsupported";
            break;
          case "unbound-bitwise-result":
            h2 += "-unbound-result";
            break;
        }
        break;
      }
      case re.CALL_EXCEPTION:
      case re.INSUFFICIENT_FUNDS:
      case re.MISSING_NEW:
      case re.NONCE_EXPIRED:
      case re.REPLACEMENT_UNDERPRICED:
      case re.TRANSACTION_REPLACED:
      case re.UNPREDICTABLE_GAS_LIMIT:
        h2 = r2;
        break;
    }
    h2 && (t2 += " [ See: https://links.ethers.org/v5-errors-" + h2 + " ]"), n3.length && (t2 += " (" + n3.join(", ") + ")");
    const p2 = new Error(t2);
    return p2.reason = o2, p2.code = r2, Object.keys(i2).forEach(function(b2) {
      p2[b2] = i2[b2];
    }), p2;
  }
  throwError(t2, r2, i2) {
    throw this.makeError(t2, r2, i2);
  }
  throwArgumentError(t2, r2, i2) {
    return this.throwError(t2, L.errors.INVALID_ARGUMENT, { argument: r2, value: i2 });
  }
  assert(t2, r2, i2, n3) {
    t2 || this.throwError(r2, i2, n3);
  }
  assertArgument(t2, r2, i2, n3) {
    t2 || this.throwArgumentError(r2, i2, n3);
  }
  checkNormalize(t2) {
    Un && this.throwError("platform missing String.prototype.normalize", L.errors.UNSUPPORTED_OPERATION, { operation: "String.prototype.normalize", form: Un });
  }
  checkSafeUint53(t2, r2) {
    typeof t2 == "number" && (r2 == null && (r2 = "value not safe"), (t2 < 0 || t2 >= 9007199254740991) && this.throwError(r2, L.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "out-of-safe-range", value: t2 }), t2 % 1 && this.throwError(r2, L.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "non-integer", value: t2 }));
  }
  checkArgumentCount(t2, r2, i2) {
    i2 ? i2 = ": " + i2 : i2 = "", t2 < r2 && this.throwError("missing argument" + i2, L.errors.MISSING_ARGUMENT, { count: t2, expectedCount: r2 }), t2 > r2 && this.throwError("too many arguments" + i2, L.errors.UNEXPECTED_ARGUMENT, { count: t2, expectedCount: r2 });
  }
  checkNew(t2, r2) {
    (t2 === Object || t2 == null) && this.throwError("missing new", L.errors.MISSING_NEW, { name: r2.name });
  }
  checkAbstract(t2, r2) {
    t2 === r2 ? this.throwError("cannot instantiate abstract class " + JSON.stringify(r2.name) + " directly; use a sub-class", L.errors.UNSUPPORTED_OPERATION, { name: t2.name, operation: "new" }) : (t2 === Object || t2 == null) && this.throwError("missing new", L.errors.MISSING_NEW, { name: r2.name });
  }
  static globalLogger() {
    return gi || (gi = new L(y0)), gi;
  }
  static setCensorship(t2, r2) {
    if (!t2 && r2 && this.globalLogger().throwError("cannot permanently disable censorship", L.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" }), Dn) {
      if (!t2)
        return;
      this.globalLogger().throwError("error censorship permanent", L.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" });
    }
    Fn = !!t2, Dn = !!r2;
  }
  static setLogLevel(t2) {
    const r2 = Cr[t2.toLowerCase()];
    if (r2 == null) {
      L.globalLogger().warn("invalid log level - " + t2);
      return;
    }
    Tn = r2;
  }
  static from(t2) {
    return new L(t2);
  }
};
L$1.errors = re, L$1.levels = Ai;
const x0 = "bytes/5.7.0", Dt = new L$1(x0);
function qn(e2) {
  return !!e2.toHexString;
}
function rr(e2) {
  return e2.slice || (e2.slice = function() {
    const t2 = Array.prototype.slice.call(arguments);
    return rr(new Uint8Array(Array.prototype.slice.apply(e2, t2)));
  }), e2;
}
function M0(e2) {
  return Qt(e2) && !(e2.length % 2) || ir(e2);
}
function Kn(e2) {
  return typeof e2 == "number" && e2 == e2 && e2 % 1 === 0;
}
function ir(e2) {
  if (e2 == null)
    return false;
  if (e2.constructor === Uint8Array)
    return true;
  if (typeof e2 == "string" || !Kn(e2.length) || e2.length < 0)
    return false;
  for (let t2 = 0; t2 < e2.length; t2++) {
    const r2 = e2[t2];
    if (!Kn(r2) || r2 < 0 || r2 >= 256)
      return false;
  }
  return true;
}
function Ot(e2, t2) {
  if (t2 || (t2 = {}), typeof e2 == "number") {
    Dt.checkSafeUint53(e2, "invalid arrayify value");
    const r2 = [];
    for (; e2; )
      r2.unshift(e2 & 255), e2 = parseInt(String(e2 / 256));
    return r2.length === 0 && r2.push(0), rr(new Uint8Array(r2));
  }
  if (t2.allowMissingPrefix && typeof e2 == "string" && e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), qn(e2) && (e2 = e2.toHexString()), Qt(e2)) {
    let r2 = e2.substring(2);
    r2.length % 2 && (t2.hexPad === "left" ? r2 = "0" + r2 : t2.hexPad === "right" ? r2 += "0" : Dt.throwArgumentError("hex data is odd-length", "value", e2));
    const i2 = [];
    for (let n3 = 0; n3 < r2.length; n3 += 2)
      i2.push(parseInt(r2.substring(n3, n3 + 2), 16));
    return rr(new Uint8Array(i2));
  }
  return ir(e2) ? rr(new Uint8Array(e2)) : Dt.throwArgumentError("invalid arrayify value", "value", e2);
}
function E0(e2) {
  const t2 = e2.map((n3) => Ot(n3)), r2 = t2.reduce((n3, o2) => n3 + o2.length, 0), i2 = new Uint8Array(r2);
  return t2.reduce((n3, o2) => (i2.set(o2, n3), n3 + o2.length), 0), rr(i2);
}
function S0(e2, t2) {
  e2 = Ot(e2), e2.length > t2 && Dt.throwArgumentError("value out of range", "value", arguments[0]);
  const r2 = new Uint8Array(t2);
  return r2.set(e2, t2 - e2.length), rr(r2);
}
function Qt(e2, t2) {
  return !(typeof e2 != "string" || !e2.match(/^0x[0-9A-Fa-f]*$/) || t2 && e2.length !== 2 + 2 * t2);
}
const bi = "0123456789abcdef";
function Kt(e2, t2) {
  if (t2 || (t2 = {}), typeof e2 == "number") {
    Dt.checkSafeUint53(e2, "invalid hexlify value");
    let r2 = "";
    for (; e2; )
      r2 = bi[e2 & 15] + r2, e2 = Math.floor(e2 / 16);
    return r2.length ? (r2.length % 2 && (r2 = "0" + r2), "0x" + r2) : "0x00";
  }
  if (typeof e2 == "bigint")
    return e2 = e2.toString(16), e2.length % 2 ? "0x0" + e2 : "0x" + e2;
  if (t2.allowMissingPrefix && typeof e2 == "string" && e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), qn(e2))
    return e2.toHexString();
  if (Qt(e2))
    return e2.length % 2 && (t2.hexPad === "left" ? e2 = "0x0" + e2.substring(2) : t2.hexPad === "right" ? e2 += "0" : Dt.throwArgumentError("hex data is odd-length", "value", e2)), e2.toLowerCase();
  if (ir(e2)) {
    let r2 = "0x";
    for (let i2 = 0; i2 < e2.length; i2++) {
      let n3 = e2[i2];
      r2 += bi[(n3 & 240) >> 4] + bi[n3 & 15];
    }
    return r2;
  }
  return Dt.throwArgumentError("invalid hexlify value", "value", e2);
}
function N0(e2) {
  if (typeof e2 != "string")
    e2 = Kt(e2);
  else if (!Qt(e2) || e2.length % 2)
    return null;
  return (e2.length - 2) / 2;
}
function Hn(e2, t2, r2) {
  return typeof e2 != "string" ? e2 = Kt(e2) : (!Qt(e2) || e2.length % 2) && Dt.throwArgumentError("invalid hexData", "value", e2), t2 = 2 + 2 * t2, r2 != null ? "0x" + e2.substring(t2, 2 + 2 * r2) : "0x" + e2.substring(t2);
}
function oe(e2, t2) {
  for (typeof e2 != "string" ? e2 = Kt(e2) : Qt(e2) || Dt.throwArgumentError("invalid hex string", "value", e2), e2.length > 2 * t2 + 2 && Dt.throwArgumentError("value out of range", "value", arguments[1]); e2.length < 2 * t2 + 2; )
    e2 = "0x0" + e2.substring(2);
  return e2;
}
function zn(e2) {
  const t2 = { r: "0x", s: "0x", _vs: "0x", recoveryParam: 0, v: 0, yParityAndS: "0x", compact: "0x" };
  if (M0(e2)) {
    let r2 = Ot(e2);
    r2.length === 64 ? (t2.v = 27 + (r2[32] >> 7), r2[32] &= 127, t2.r = Kt(r2.slice(0, 32)), t2.s = Kt(r2.slice(32, 64))) : r2.length === 65 ? (t2.r = Kt(r2.slice(0, 32)), t2.s = Kt(r2.slice(32, 64)), t2.v = r2[64]) : Dt.throwArgumentError("invalid signature string", "signature", e2), t2.v < 27 && (t2.v === 0 || t2.v === 1 ? t2.v += 27 : Dt.throwArgumentError("signature invalid v byte", "signature", e2)), t2.recoveryParam = 1 - t2.v % 2, t2.recoveryParam && (r2[32] |= 128), t2._vs = Kt(r2.slice(32, 64));
  } else {
    if (t2.r = e2.r, t2.s = e2.s, t2.v = e2.v, t2.recoveryParam = e2.recoveryParam, t2._vs = e2._vs, t2._vs != null) {
      const n3 = S0(Ot(t2._vs), 32);
      t2._vs = Kt(n3);
      const o2 = n3[0] >= 128 ? 1 : 0;
      t2.recoveryParam == null ? t2.recoveryParam = o2 : t2.recoveryParam !== o2 && Dt.throwArgumentError("signature recoveryParam mismatch _vs", "signature", e2), n3[0] &= 127;
      const h2 = Kt(n3);
      t2.s == null ? t2.s = h2 : t2.s !== h2 && Dt.throwArgumentError("signature v mismatch _vs", "signature", e2);
    }
    if (t2.recoveryParam == null)
      t2.v == null ? Dt.throwArgumentError("signature missing v and recoveryParam", "signature", e2) : t2.v === 0 || t2.v === 1 ? t2.recoveryParam = t2.v : t2.recoveryParam = 1 - t2.v % 2;
    else if (t2.v == null)
      t2.v = 27 + t2.recoveryParam;
    else {
      const n3 = t2.v === 0 || t2.v === 1 ? t2.v : 1 - t2.v % 2;
      t2.recoveryParam !== n3 && Dt.throwArgumentError("signature recoveryParam mismatch v", "signature", e2);
    }
    t2.r == null || !Qt(t2.r) ? Dt.throwArgumentError("signature missing or invalid r", "signature", e2) : t2.r = oe(t2.r, 32), t2.s == null || !Qt(t2.s) ? Dt.throwArgumentError("signature missing or invalid s", "signature", e2) : t2.s = oe(t2.s, 32);
    const r2 = Ot(t2.s);
    r2[0] >= 128 && Dt.throwArgumentError("signature s out of range", "signature", e2), t2.recoveryParam && (r2[0] |= 128);
    const i2 = Kt(r2);
    t2._vs && (Qt(t2._vs) || Dt.throwArgumentError("signature invalid _vs", "signature", e2), t2._vs = oe(t2._vs, 32)), t2._vs == null ? t2._vs = i2 : t2._vs !== i2 && Dt.throwArgumentError("signature _vs mismatch v and s", "signature", e2);
  }
  return t2.yParityAndS = t2._vs, t2.compact = t2.r + t2.yParityAndS.substring(2), t2;
}
function yi(e2) {
  return "0x" + b0.keccak_256(Ot(e2));
}
var Ln = { exports: {} }, I0 = {}, _0 = Object.freeze({ __proto__: null, default: I0 }), B0 = A0(_0);
(function(e2) {
  (function(t2, r2) {
    function i2(A2, f2) {
      if (!A2)
        throw new Error(f2 || "Assertion failed");
    }
    function n3(A2, f2) {
      A2.super_ = f2;
      var a2 = function() {
      };
      a2.prototype = f2.prototype, A2.prototype = new a2(), A2.prototype.constructor = A2;
    }
    function o2(A2, f2, a2) {
      if (o2.isBN(A2))
        return A2;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, A2 !== null && ((f2 === "le" || f2 === "be") && (a2 = f2, f2 = 10), this._init(A2 || 0, f2 || 10, a2 || "be"));
    }
    typeof t2 == "object" ? t2.exports = o2 : r2.BN = o2, o2.BN = o2, o2.wordSize = 26;
    var h2;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? h2 = window.Buffer : h2 = B0.Buffer;
    } catch {
    }
    o2.isBN = function(f2) {
      return f2 instanceof o2 ? true : f2 !== null && typeof f2 == "object" && f2.constructor.wordSize === o2.wordSize && Array.isArray(f2.words);
    }, o2.max = function(f2, a2) {
      return f2.cmp(a2) > 0 ? f2 : a2;
    }, o2.min = function(f2, a2) {
      return f2.cmp(a2) < 0 ? f2 : a2;
    }, o2.prototype._init = function(f2, a2, c2) {
      if (typeof f2 == "number")
        return this._initNumber(f2, a2, c2);
      if (typeof f2 == "object")
        return this._initArray(f2, a2, c2);
      a2 === "hex" && (a2 = 16), i2(a2 === (a2 | 0) && a2 >= 2 && a2 <= 36), f2 = f2.toString().replace(/\s+/g, "");
      var d2 = 0;
      f2[0] === "-" && (d2++, this.negative = 1), d2 < f2.length && (a2 === 16 ? this._parseHex(f2, d2, c2) : (this._parseBase(f2, a2, d2), c2 === "le" && this._initArray(this.toArray(), a2, c2)));
    }, o2.prototype._initNumber = function(f2, a2, c2) {
      f2 < 0 && (this.negative = 1, f2 = -f2), f2 < 67108864 ? (this.words = [f2 & 67108863], this.length = 1) : f2 < 4503599627370496 ? (this.words = [f2 & 67108863, f2 / 67108864 & 67108863], this.length = 2) : (i2(f2 < 9007199254740992), this.words = [f2 & 67108863, f2 / 67108864 & 67108863, 1], this.length = 3), c2 === "le" && this._initArray(this.toArray(), a2, c2);
    }, o2.prototype._initArray = function(f2, a2, c2) {
      if (i2(typeof f2.length == "number"), f2.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(f2.length / 3), this.words = new Array(this.length);
      for (var d2 = 0; d2 < this.length; d2++)
        this.words[d2] = 0;
      var g2, x2, M2 = 0;
      if (c2 === "be")
        for (d2 = f2.length - 1, g2 = 0; d2 >= 0; d2 -= 3)
          x2 = f2[d2] | f2[d2 - 1] << 8 | f2[d2 - 2] << 16, this.words[g2] |= x2 << M2 & 67108863, this.words[g2 + 1] = x2 >>> 26 - M2 & 67108863, M2 += 24, M2 >= 26 && (M2 -= 26, g2++);
      else if (c2 === "le")
        for (d2 = 0, g2 = 0; d2 < f2.length; d2 += 3)
          x2 = f2[d2] | f2[d2 + 1] << 8 | f2[d2 + 2] << 16, this.words[g2] |= x2 << M2 & 67108863, this.words[g2 + 1] = x2 >>> 26 - M2 & 67108863, M2 += 24, M2 >= 26 && (M2 -= 26, g2++);
      return this._strip();
    };
    function p2(A2, f2) {
      var a2 = A2.charCodeAt(f2);
      if (a2 >= 48 && a2 <= 57)
        return a2 - 48;
      if (a2 >= 65 && a2 <= 70)
        return a2 - 55;
      if (a2 >= 97 && a2 <= 102)
        return a2 - 87;
      i2(false, "Invalid character in " + A2);
    }
    function b2(A2, f2, a2) {
      var c2 = p2(A2, a2);
      return a2 - 1 >= f2 && (c2 |= p2(A2, a2 - 1) << 4), c2;
    }
    o2.prototype._parseHex = function(f2, a2, c2) {
      this.length = Math.ceil((f2.length - a2) / 6), this.words = new Array(this.length);
      for (var d2 = 0; d2 < this.length; d2++)
        this.words[d2] = 0;
      var g2 = 0, x2 = 0, M2;
      if (c2 === "be")
        for (d2 = f2.length - 1; d2 >= a2; d2 -= 2)
          M2 = b2(f2, a2, d2) << g2, this.words[x2] |= M2 & 67108863, g2 >= 18 ? (g2 -= 18, x2 += 1, this.words[x2] |= M2 >>> 26) : g2 += 8;
      else {
        var l2 = f2.length - a2;
        for (d2 = l2 % 2 === 0 ? a2 + 1 : a2; d2 < f2.length; d2 += 2)
          M2 = b2(f2, a2, d2) << g2, this.words[x2] |= M2 & 67108863, g2 >= 18 ? (g2 -= 18, x2 += 1, this.words[x2] |= M2 >>> 26) : g2 += 8;
      }
      this._strip();
    };
    function m2(A2, f2, a2, c2) {
      for (var d2 = 0, g2 = 0, x2 = Math.min(A2.length, a2), M2 = f2; M2 < x2; M2++) {
        var l2 = A2.charCodeAt(M2) - 48;
        d2 *= c2, l2 >= 49 ? g2 = l2 - 49 + 10 : l2 >= 17 ? g2 = l2 - 17 + 10 : g2 = l2, i2(l2 >= 0 && g2 < c2, "Invalid character"), d2 += g2;
      }
      return d2;
    }
    o2.prototype._parseBase = function(f2, a2, c2) {
      this.words = [0], this.length = 1;
      for (var d2 = 0, g2 = 1; g2 <= 67108863; g2 *= a2)
        d2++;
      d2--, g2 = g2 / a2 | 0;
      for (var x2 = f2.length - c2, M2 = x2 % d2, l2 = Math.min(x2, x2 - M2) + c2, s2 = 0, v2 = c2; v2 < l2; v2 += d2)
        s2 = m2(f2, v2, v2 + d2, a2), this.imuln(g2), this.words[0] + s2 < 67108864 ? this.words[0] += s2 : this._iaddn(s2);
      if (M2 !== 0) {
        var k2 = 1;
        for (s2 = m2(f2, v2, f2.length, a2), v2 = 0; v2 < M2; v2++)
          k2 *= a2;
        this.imuln(k2), this.words[0] + s2 < 67108864 ? this.words[0] += s2 : this._iaddn(s2);
      }
      this._strip();
    }, o2.prototype.copy = function(f2) {
      f2.words = new Array(this.length);
      for (var a2 = 0; a2 < this.length; a2++)
        f2.words[a2] = this.words[a2];
      f2.length = this.length, f2.negative = this.negative, f2.red = this.red;
    };
    function w2(A2, f2) {
      A2.words = f2.words, A2.length = f2.length, A2.negative = f2.negative, A2.red = f2.red;
    }
    if (o2.prototype._move = function(f2) {
      w2(f2, this);
    }, o2.prototype.clone = function() {
      var f2 = new o2(null);
      return this.copy(f2), f2;
    }, o2.prototype._expand = function(f2) {
      for (; this.length < f2; )
        this.words[this.length++] = 0;
      return this;
    }, o2.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, o2.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        o2.prototype[Symbol.for("nodejs.util.inspect.custom")] = y2;
      } catch {
        o2.prototype.inspect = y2;
      }
    else
      o2.prototype.inspect = y2;
    function y2() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var S2 = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], I2 = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], N2 = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    o2.prototype.toString = function(f2, a2) {
      f2 = f2 || 10, a2 = a2 | 0 || 1;
      var c2;
      if (f2 === 16 || f2 === "hex") {
        c2 = "";
        for (var d2 = 0, g2 = 0, x2 = 0; x2 < this.length; x2++) {
          var M2 = this.words[x2], l2 = ((M2 << d2 | g2) & 16777215).toString(16);
          g2 = M2 >>> 24 - d2 & 16777215, d2 += 2, d2 >= 26 && (d2 -= 26, x2--), g2 !== 0 || x2 !== this.length - 1 ? c2 = S2[6 - l2.length] + l2 + c2 : c2 = l2 + c2;
        }
        for (g2 !== 0 && (c2 = g2.toString(16) + c2); c2.length % a2 !== 0; )
          c2 = "0" + c2;
        return this.negative !== 0 && (c2 = "-" + c2), c2;
      }
      if (f2 === (f2 | 0) && f2 >= 2 && f2 <= 36) {
        var s2 = I2[f2], v2 = N2[f2];
        c2 = "";
        var k2 = this.clone();
        for (k2.negative = 0; !k2.isZero(); ) {
          var u2 = k2.modrn(v2).toString(f2);
          k2 = k2.idivn(v2), k2.isZero() ? c2 = u2 + c2 : c2 = S2[s2 - u2.length] + u2 + c2;
        }
        for (this.isZero() && (c2 = "0" + c2); c2.length % a2 !== 0; )
          c2 = "0" + c2;
        return this.negative !== 0 && (c2 = "-" + c2), c2;
      }
      i2(false, "Base should be between 2 and 36");
    }, o2.prototype.toNumber = function() {
      var f2 = this.words[0];
      return this.length === 2 ? f2 += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? f2 += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i2(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -f2 : f2;
    }, o2.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, h2 && (o2.prototype.toBuffer = function(f2, a2) {
      return this.toArrayLike(h2, f2, a2);
    }), o2.prototype.toArray = function(f2, a2) {
      return this.toArrayLike(Array, f2, a2);
    };
    var C2 = function(f2, a2) {
      return f2.allocUnsafe ? f2.allocUnsafe(a2) : new f2(a2);
    };
    o2.prototype.toArrayLike = function(f2, a2, c2) {
      this._strip();
      var d2 = this.byteLength(), g2 = c2 || Math.max(1, d2);
      i2(d2 <= g2, "byte array longer than desired length"), i2(g2 > 0, "Requested array length <= 0");
      var x2 = C2(f2, g2), M2 = a2 === "le" ? "LE" : "BE";
      return this["_toArrayLike" + M2](x2, d2), x2;
    }, o2.prototype._toArrayLikeLE = function(f2, a2) {
      for (var c2 = 0, d2 = 0, g2 = 0, x2 = 0; g2 < this.length; g2++) {
        var M2 = this.words[g2] << x2 | d2;
        f2[c2++] = M2 & 255, c2 < f2.length && (f2[c2++] = M2 >> 8 & 255), c2 < f2.length && (f2[c2++] = M2 >> 16 & 255), x2 === 6 ? (c2 < f2.length && (f2[c2++] = M2 >> 24 & 255), d2 = 0, x2 = 0) : (d2 = M2 >>> 24, x2 += 2);
      }
      if (c2 < f2.length)
        for (f2[c2++] = d2; c2 < f2.length; )
          f2[c2++] = 0;
    }, o2.prototype._toArrayLikeBE = function(f2, a2) {
      for (var c2 = f2.length - 1, d2 = 0, g2 = 0, x2 = 0; g2 < this.length; g2++) {
        var M2 = this.words[g2] << x2 | d2;
        f2[c2--] = M2 & 255, c2 >= 0 && (f2[c2--] = M2 >> 8 & 255), c2 >= 0 && (f2[c2--] = M2 >> 16 & 255), x2 === 6 ? (c2 >= 0 && (f2[c2--] = M2 >> 24 & 255), d2 = 0, x2 = 0) : (d2 = M2 >>> 24, x2 += 2);
      }
      if (c2 >= 0)
        for (f2[c2--] = d2; c2 >= 0; )
          f2[c2--] = 0;
    }, Math.clz32 ? o2.prototype._countBits = function(f2) {
      return 32 - Math.clz32(f2);
    } : o2.prototype._countBits = function(f2) {
      var a2 = f2, c2 = 0;
      return a2 >= 4096 && (c2 += 13, a2 >>>= 13), a2 >= 64 && (c2 += 7, a2 >>>= 7), a2 >= 8 && (c2 += 4, a2 >>>= 4), a2 >= 2 && (c2 += 2, a2 >>>= 2), c2 + a2;
    }, o2.prototype._zeroBits = function(f2) {
      if (f2 === 0)
        return 26;
      var a2 = f2, c2 = 0;
      return a2 & 8191 || (c2 += 13, a2 >>>= 13), a2 & 127 || (c2 += 7, a2 >>>= 7), a2 & 15 || (c2 += 4, a2 >>>= 4), a2 & 3 || (c2 += 2, a2 >>>= 2), a2 & 1 || c2++, c2;
    }, o2.prototype.bitLength = function() {
      var f2 = this.words[this.length - 1], a2 = this._countBits(f2);
      return (this.length - 1) * 26 + a2;
    };
    function F(A2) {
      for (var f2 = new Array(A2.bitLength()), a2 = 0; a2 < f2.length; a2++) {
        var c2 = a2 / 26 | 0, d2 = a2 % 26;
        f2[a2] = A2.words[c2] >>> d2 & 1;
      }
      return f2;
    }
    o2.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var f2 = 0, a2 = 0; a2 < this.length; a2++) {
        var c2 = this._zeroBits(this.words[a2]);
        if (f2 += c2, c2 !== 26)
          break;
      }
      return f2;
    }, o2.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, o2.prototype.toTwos = function(f2) {
      return this.negative !== 0 ? this.abs().inotn(f2).iaddn(1) : this.clone();
    }, o2.prototype.fromTwos = function(f2) {
      return this.testn(f2 - 1) ? this.notn(f2).iaddn(1).ineg() : this.clone();
    }, o2.prototype.isNeg = function() {
      return this.negative !== 0;
    }, o2.prototype.neg = function() {
      return this.clone().ineg();
    }, o2.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, o2.prototype.iuor = function(f2) {
      for (; this.length < f2.length; )
        this.words[this.length++] = 0;
      for (var a2 = 0; a2 < f2.length; a2++)
        this.words[a2] = this.words[a2] | f2.words[a2];
      return this._strip();
    }, o2.prototype.ior = function(f2) {
      return i2((this.negative | f2.negative) === 0), this.iuor(f2);
    }, o2.prototype.or = function(f2) {
      return this.length > f2.length ? this.clone().ior(f2) : f2.clone().ior(this);
    }, o2.prototype.uor = function(f2) {
      return this.length > f2.length ? this.clone().iuor(f2) : f2.clone().iuor(this);
    }, o2.prototype.iuand = function(f2) {
      var a2;
      this.length > f2.length ? a2 = f2 : a2 = this;
      for (var c2 = 0; c2 < a2.length; c2++)
        this.words[c2] = this.words[c2] & f2.words[c2];
      return this.length = a2.length, this._strip();
    }, o2.prototype.iand = function(f2) {
      return i2((this.negative | f2.negative) === 0), this.iuand(f2);
    }, o2.prototype.and = function(f2) {
      return this.length > f2.length ? this.clone().iand(f2) : f2.clone().iand(this);
    }, o2.prototype.uand = function(f2) {
      return this.length > f2.length ? this.clone().iuand(f2) : f2.clone().iuand(this);
    }, o2.prototype.iuxor = function(f2) {
      var a2, c2;
      this.length > f2.length ? (a2 = this, c2 = f2) : (a2 = f2, c2 = this);
      for (var d2 = 0; d2 < c2.length; d2++)
        this.words[d2] = a2.words[d2] ^ c2.words[d2];
      if (this !== a2)
        for (; d2 < a2.length; d2++)
          this.words[d2] = a2.words[d2];
      return this.length = a2.length, this._strip();
    }, o2.prototype.ixor = function(f2) {
      return i2((this.negative | f2.negative) === 0), this.iuxor(f2);
    }, o2.prototype.xor = function(f2) {
      return this.length > f2.length ? this.clone().ixor(f2) : f2.clone().ixor(this);
    }, o2.prototype.uxor = function(f2) {
      return this.length > f2.length ? this.clone().iuxor(f2) : f2.clone().iuxor(this);
    }, o2.prototype.inotn = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = Math.ceil(f2 / 26) | 0, c2 = f2 % 26;
      this._expand(a2), c2 > 0 && a2--;
      for (var d2 = 0; d2 < a2; d2++)
        this.words[d2] = ~this.words[d2] & 67108863;
      return c2 > 0 && (this.words[d2] = ~this.words[d2] & 67108863 >> 26 - c2), this._strip();
    }, o2.prototype.notn = function(f2) {
      return this.clone().inotn(f2);
    }, o2.prototype.setn = function(f2, a2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var c2 = f2 / 26 | 0, d2 = f2 % 26;
      return this._expand(c2 + 1), a2 ? this.words[c2] = this.words[c2] | 1 << d2 : this.words[c2] = this.words[c2] & ~(1 << d2), this._strip();
    }, o2.prototype.iadd = function(f2) {
      var a2;
      if (this.negative !== 0 && f2.negative === 0)
        return this.negative = 0, a2 = this.isub(f2), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && f2.negative !== 0)
        return f2.negative = 0, a2 = this.isub(f2), f2.negative = 1, a2._normSign();
      var c2, d2;
      this.length > f2.length ? (c2 = this, d2 = f2) : (c2 = f2, d2 = this);
      for (var g2 = 0, x2 = 0; x2 < d2.length; x2++)
        a2 = (c2.words[x2] | 0) + (d2.words[x2] | 0) + g2, this.words[x2] = a2 & 67108863, g2 = a2 >>> 26;
      for (; g2 !== 0 && x2 < c2.length; x2++)
        a2 = (c2.words[x2] | 0) + g2, this.words[x2] = a2 & 67108863, g2 = a2 >>> 26;
      if (this.length = c2.length, g2 !== 0)
        this.words[this.length] = g2, this.length++;
      else if (c2 !== this)
        for (; x2 < c2.length; x2++)
          this.words[x2] = c2.words[x2];
      return this;
    }, o2.prototype.add = function(f2) {
      var a2;
      return f2.negative !== 0 && this.negative === 0 ? (f2.negative = 0, a2 = this.sub(f2), f2.negative ^= 1, a2) : f2.negative === 0 && this.negative !== 0 ? (this.negative = 0, a2 = f2.sub(this), this.negative = 1, a2) : this.length > f2.length ? this.clone().iadd(f2) : f2.clone().iadd(this);
    }, o2.prototype.isub = function(f2) {
      if (f2.negative !== 0) {
        f2.negative = 0;
        var a2 = this.iadd(f2);
        return f2.negative = 1, a2._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(f2), this.negative = 1, this._normSign();
      var c2 = this.cmp(f2);
      if (c2 === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var d2, g2;
      c2 > 0 ? (d2 = this, g2 = f2) : (d2 = f2, g2 = this);
      for (var x2 = 0, M2 = 0; M2 < g2.length; M2++)
        a2 = (d2.words[M2] | 0) - (g2.words[M2] | 0) + x2, x2 = a2 >> 26, this.words[M2] = a2 & 67108863;
      for (; x2 !== 0 && M2 < d2.length; M2++)
        a2 = (d2.words[M2] | 0) + x2, x2 = a2 >> 26, this.words[M2] = a2 & 67108863;
      if (x2 === 0 && M2 < d2.length && d2 !== this)
        for (; M2 < d2.length; M2++)
          this.words[M2] = d2.words[M2];
      return this.length = Math.max(this.length, M2), d2 !== this && (this.negative = 1), this._strip();
    }, o2.prototype.sub = function(f2) {
      return this.clone().isub(f2);
    };
    function U(A2, f2, a2) {
      a2.negative = f2.negative ^ A2.negative;
      var c2 = A2.length + f2.length | 0;
      a2.length = c2, c2 = c2 - 1 | 0;
      var d2 = A2.words[0] | 0, g2 = f2.words[0] | 0, x2 = d2 * g2, M2 = x2 & 67108863, l2 = x2 / 67108864 | 0;
      a2.words[0] = M2;
      for (var s2 = 1; s2 < c2; s2++) {
        for (var v2 = l2 >>> 26, k2 = l2 & 67108863, u2 = Math.min(s2, f2.length - 1), E2 = Math.max(0, s2 - A2.length + 1); E2 <= u2; E2++) {
          var _2 = s2 - E2 | 0;
          d2 = A2.words[_2] | 0, g2 = f2.words[E2] | 0, x2 = d2 * g2 + k2, v2 += x2 / 67108864 | 0, k2 = x2 & 67108863;
        }
        a2.words[s2] = k2 | 0, l2 = v2 | 0;
      }
      return l2 !== 0 ? a2.words[s2] = l2 | 0 : a2.length--, a2._strip();
    }
    var J = function(f2, a2, c2) {
      var d2 = f2.words, g2 = a2.words, x2 = c2.words, M2 = 0, l2, s2, v2, k2 = d2[0] | 0, u2 = k2 & 8191, E2 = k2 >>> 13, _2 = d2[1] | 0, B = _2 & 8191, R2 = _2 >>> 13, T2 = d2[2] | 0, P2 = T2 & 8191, O = T2 >>> 13, Ct = d2[3] | 0, D = Ct & 8191, q = Ct >>> 13, De = d2[4] | 0, X = De & 8191, Z2 = De >>> 13, Fe = d2[5] | 0, $2 = Fe & 8191, tt = Fe >>> 13, Te = d2[6] | 0, et = Te & 8191, rt = Te >>> 13, Ue = d2[7] | 0, it = Ue & 8191, nt = Ue >>> 13, ke = d2[8] | 0, ft = ke & 8191, ot = ke >>> 13, qe = d2[9] | 0, st = qe & 8191, at = qe >>> 13, Ke = g2[0] | 0, ut = Ke & 8191, ht = Ke >>> 13, He = g2[1] | 0, ct = He & 8191, lt = He >>> 13, ze = g2[2] | 0, dt = ze & 8191, pt = ze >>> 13, Le = g2[3] | 0, vt = Le & 8191, mt = Le >>> 13, je = g2[4] | 0, gt = je & 8191, At = je >>> 13, Qe = g2[5] | 0, bt = Qe & 8191, yt = Qe >>> 13, Je = g2[6] | 0, wt = Je & 8191, xt = Je >>> 13, Ge = g2[7] | 0, Mt = Ge & 8191, Et = Ge >>> 13, Ye = g2[8] | 0, St = Ye & 8191, Nt = Ye >>> 13, Ve = g2[9] | 0, It = Ve & 8191, _t = Ve >>> 13;
      c2.negative = f2.negative ^ a2.negative, c2.length = 19, l2 = Math.imul(u2, ut), s2 = Math.imul(u2, ht), s2 = s2 + Math.imul(E2, ut) | 0, v2 = Math.imul(E2, ht);
      var Me = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, l2 = Math.imul(B, ut), s2 = Math.imul(B, ht), s2 = s2 + Math.imul(R2, ut) | 0, v2 = Math.imul(R2, ht), l2 = l2 + Math.imul(u2, ct) | 0, s2 = s2 + Math.imul(u2, lt) | 0, s2 = s2 + Math.imul(E2, ct) | 0, v2 = v2 + Math.imul(E2, lt) | 0;
      var Ee = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, l2 = Math.imul(P2, ut), s2 = Math.imul(P2, ht), s2 = s2 + Math.imul(O, ut) | 0, v2 = Math.imul(O, ht), l2 = l2 + Math.imul(B, ct) | 0, s2 = s2 + Math.imul(B, lt) | 0, s2 = s2 + Math.imul(R2, ct) | 0, v2 = v2 + Math.imul(R2, lt) | 0, l2 = l2 + Math.imul(u2, dt) | 0, s2 = s2 + Math.imul(u2, pt) | 0, s2 = s2 + Math.imul(E2, dt) | 0, v2 = v2 + Math.imul(E2, pt) | 0;
      var Se = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, l2 = Math.imul(D, ut), s2 = Math.imul(D, ht), s2 = s2 + Math.imul(q, ut) | 0, v2 = Math.imul(q, ht), l2 = l2 + Math.imul(P2, ct) | 0, s2 = s2 + Math.imul(P2, lt) | 0, s2 = s2 + Math.imul(O, ct) | 0, v2 = v2 + Math.imul(O, lt) | 0, l2 = l2 + Math.imul(B, dt) | 0, s2 = s2 + Math.imul(B, pt) | 0, s2 = s2 + Math.imul(R2, dt) | 0, v2 = v2 + Math.imul(R2, pt) | 0, l2 = l2 + Math.imul(u2, vt) | 0, s2 = s2 + Math.imul(u2, mt) | 0, s2 = s2 + Math.imul(E2, vt) | 0, v2 = v2 + Math.imul(E2, mt) | 0;
      var Ne = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, l2 = Math.imul(X, ut), s2 = Math.imul(X, ht), s2 = s2 + Math.imul(Z2, ut) | 0, v2 = Math.imul(Z2, ht), l2 = l2 + Math.imul(D, ct) | 0, s2 = s2 + Math.imul(D, lt) | 0, s2 = s2 + Math.imul(q, ct) | 0, v2 = v2 + Math.imul(q, lt) | 0, l2 = l2 + Math.imul(P2, dt) | 0, s2 = s2 + Math.imul(P2, pt) | 0, s2 = s2 + Math.imul(O, dt) | 0, v2 = v2 + Math.imul(O, pt) | 0, l2 = l2 + Math.imul(B, vt) | 0, s2 = s2 + Math.imul(B, mt) | 0, s2 = s2 + Math.imul(R2, vt) | 0, v2 = v2 + Math.imul(R2, mt) | 0, l2 = l2 + Math.imul(u2, gt) | 0, s2 = s2 + Math.imul(u2, At) | 0, s2 = s2 + Math.imul(E2, gt) | 0, v2 = v2 + Math.imul(E2, At) | 0;
      var Ie = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, l2 = Math.imul($2, ut), s2 = Math.imul($2, ht), s2 = s2 + Math.imul(tt, ut) | 0, v2 = Math.imul(tt, ht), l2 = l2 + Math.imul(X, ct) | 0, s2 = s2 + Math.imul(X, lt) | 0, s2 = s2 + Math.imul(Z2, ct) | 0, v2 = v2 + Math.imul(Z2, lt) | 0, l2 = l2 + Math.imul(D, dt) | 0, s2 = s2 + Math.imul(D, pt) | 0, s2 = s2 + Math.imul(q, dt) | 0, v2 = v2 + Math.imul(q, pt) | 0, l2 = l2 + Math.imul(P2, vt) | 0, s2 = s2 + Math.imul(P2, mt) | 0, s2 = s2 + Math.imul(O, vt) | 0, v2 = v2 + Math.imul(O, mt) | 0, l2 = l2 + Math.imul(B, gt) | 0, s2 = s2 + Math.imul(B, At) | 0, s2 = s2 + Math.imul(R2, gt) | 0, v2 = v2 + Math.imul(R2, At) | 0, l2 = l2 + Math.imul(u2, bt) | 0, s2 = s2 + Math.imul(u2, yt) | 0, s2 = s2 + Math.imul(E2, bt) | 0, v2 = v2 + Math.imul(E2, yt) | 0;
      var Wr = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Wr >>> 26) | 0, Wr &= 67108863, l2 = Math.imul(et, ut), s2 = Math.imul(et, ht), s2 = s2 + Math.imul(rt, ut) | 0, v2 = Math.imul(rt, ht), l2 = l2 + Math.imul($2, ct) | 0, s2 = s2 + Math.imul($2, lt) | 0, s2 = s2 + Math.imul(tt, ct) | 0, v2 = v2 + Math.imul(tt, lt) | 0, l2 = l2 + Math.imul(X, dt) | 0, s2 = s2 + Math.imul(X, pt) | 0, s2 = s2 + Math.imul(Z2, dt) | 0, v2 = v2 + Math.imul(Z2, pt) | 0, l2 = l2 + Math.imul(D, vt) | 0, s2 = s2 + Math.imul(D, mt) | 0, s2 = s2 + Math.imul(q, vt) | 0, v2 = v2 + Math.imul(q, mt) | 0, l2 = l2 + Math.imul(P2, gt) | 0, s2 = s2 + Math.imul(P2, At) | 0, s2 = s2 + Math.imul(O, gt) | 0, v2 = v2 + Math.imul(O, At) | 0, l2 = l2 + Math.imul(B, bt) | 0, s2 = s2 + Math.imul(B, yt) | 0, s2 = s2 + Math.imul(R2, bt) | 0, v2 = v2 + Math.imul(R2, yt) | 0, l2 = l2 + Math.imul(u2, wt) | 0, s2 = s2 + Math.imul(u2, xt) | 0, s2 = s2 + Math.imul(E2, wt) | 0, v2 = v2 + Math.imul(E2, xt) | 0;
      var Xr = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Xr >>> 26) | 0, Xr &= 67108863, l2 = Math.imul(it, ut), s2 = Math.imul(it, ht), s2 = s2 + Math.imul(nt, ut) | 0, v2 = Math.imul(nt, ht), l2 = l2 + Math.imul(et, ct) | 0, s2 = s2 + Math.imul(et, lt) | 0, s2 = s2 + Math.imul(rt, ct) | 0, v2 = v2 + Math.imul(rt, lt) | 0, l2 = l2 + Math.imul($2, dt) | 0, s2 = s2 + Math.imul($2, pt) | 0, s2 = s2 + Math.imul(tt, dt) | 0, v2 = v2 + Math.imul(tt, pt) | 0, l2 = l2 + Math.imul(X, vt) | 0, s2 = s2 + Math.imul(X, mt) | 0, s2 = s2 + Math.imul(Z2, vt) | 0, v2 = v2 + Math.imul(Z2, mt) | 0, l2 = l2 + Math.imul(D, gt) | 0, s2 = s2 + Math.imul(D, At) | 0, s2 = s2 + Math.imul(q, gt) | 0, v2 = v2 + Math.imul(q, At) | 0, l2 = l2 + Math.imul(P2, bt) | 0, s2 = s2 + Math.imul(P2, yt) | 0, s2 = s2 + Math.imul(O, bt) | 0, v2 = v2 + Math.imul(O, yt) | 0, l2 = l2 + Math.imul(B, wt) | 0, s2 = s2 + Math.imul(B, xt) | 0, s2 = s2 + Math.imul(R2, wt) | 0, v2 = v2 + Math.imul(R2, xt) | 0, l2 = l2 + Math.imul(u2, Mt) | 0, s2 = s2 + Math.imul(u2, Et) | 0, s2 = s2 + Math.imul(E2, Mt) | 0, v2 = v2 + Math.imul(E2, Et) | 0;
      var Zr = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (Zr >>> 26) | 0, Zr &= 67108863, l2 = Math.imul(ft, ut), s2 = Math.imul(ft, ht), s2 = s2 + Math.imul(ot, ut) | 0, v2 = Math.imul(ot, ht), l2 = l2 + Math.imul(it, ct) | 0, s2 = s2 + Math.imul(it, lt) | 0, s2 = s2 + Math.imul(nt, ct) | 0, v2 = v2 + Math.imul(nt, lt) | 0, l2 = l2 + Math.imul(et, dt) | 0, s2 = s2 + Math.imul(et, pt) | 0, s2 = s2 + Math.imul(rt, dt) | 0, v2 = v2 + Math.imul(rt, pt) | 0, l2 = l2 + Math.imul($2, vt) | 0, s2 = s2 + Math.imul($2, mt) | 0, s2 = s2 + Math.imul(tt, vt) | 0, v2 = v2 + Math.imul(tt, mt) | 0, l2 = l2 + Math.imul(X, gt) | 0, s2 = s2 + Math.imul(X, At) | 0, s2 = s2 + Math.imul(Z2, gt) | 0, v2 = v2 + Math.imul(Z2, At) | 0, l2 = l2 + Math.imul(D, bt) | 0, s2 = s2 + Math.imul(D, yt) | 0, s2 = s2 + Math.imul(q, bt) | 0, v2 = v2 + Math.imul(q, yt) | 0, l2 = l2 + Math.imul(P2, wt) | 0, s2 = s2 + Math.imul(P2, xt) | 0, s2 = s2 + Math.imul(O, wt) | 0, v2 = v2 + Math.imul(O, xt) | 0, l2 = l2 + Math.imul(B, Mt) | 0, s2 = s2 + Math.imul(B, Et) | 0, s2 = s2 + Math.imul(R2, Mt) | 0, v2 = v2 + Math.imul(R2, Et) | 0, l2 = l2 + Math.imul(u2, St) | 0, s2 = s2 + Math.imul(u2, Nt) | 0, s2 = s2 + Math.imul(E2, St) | 0, v2 = v2 + Math.imul(E2, Nt) | 0;
      var $r = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + ($r >>> 26) | 0, $r &= 67108863, l2 = Math.imul(st, ut), s2 = Math.imul(st, ht), s2 = s2 + Math.imul(at, ut) | 0, v2 = Math.imul(at, ht), l2 = l2 + Math.imul(ft, ct) | 0, s2 = s2 + Math.imul(ft, lt) | 0, s2 = s2 + Math.imul(ot, ct) | 0, v2 = v2 + Math.imul(ot, lt) | 0, l2 = l2 + Math.imul(it, dt) | 0, s2 = s2 + Math.imul(it, pt) | 0, s2 = s2 + Math.imul(nt, dt) | 0, v2 = v2 + Math.imul(nt, pt) | 0, l2 = l2 + Math.imul(et, vt) | 0, s2 = s2 + Math.imul(et, mt) | 0, s2 = s2 + Math.imul(rt, vt) | 0, v2 = v2 + Math.imul(rt, mt) | 0, l2 = l2 + Math.imul($2, gt) | 0, s2 = s2 + Math.imul($2, At) | 0, s2 = s2 + Math.imul(tt, gt) | 0, v2 = v2 + Math.imul(tt, At) | 0, l2 = l2 + Math.imul(X, bt) | 0, s2 = s2 + Math.imul(X, yt) | 0, s2 = s2 + Math.imul(Z2, bt) | 0, v2 = v2 + Math.imul(Z2, yt) | 0, l2 = l2 + Math.imul(D, wt) | 0, s2 = s2 + Math.imul(D, xt) | 0, s2 = s2 + Math.imul(q, wt) | 0, v2 = v2 + Math.imul(q, xt) | 0, l2 = l2 + Math.imul(P2, Mt) | 0, s2 = s2 + Math.imul(P2, Et) | 0, s2 = s2 + Math.imul(O, Mt) | 0, v2 = v2 + Math.imul(O, Et) | 0, l2 = l2 + Math.imul(B, St) | 0, s2 = s2 + Math.imul(B, Nt) | 0, s2 = s2 + Math.imul(R2, St) | 0, v2 = v2 + Math.imul(R2, Nt) | 0, l2 = l2 + Math.imul(u2, It) | 0, s2 = s2 + Math.imul(u2, _t) | 0, s2 = s2 + Math.imul(E2, It) | 0, v2 = v2 + Math.imul(E2, _t) | 0;
      var ti = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (ti >>> 26) | 0, ti &= 67108863, l2 = Math.imul(st, ct), s2 = Math.imul(st, lt), s2 = s2 + Math.imul(at, ct) | 0, v2 = Math.imul(at, lt), l2 = l2 + Math.imul(ft, dt) | 0, s2 = s2 + Math.imul(ft, pt) | 0, s2 = s2 + Math.imul(ot, dt) | 0, v2 = v2 + Math.imul(ot, pt) | 0, l2 = l2 + Math.imul(it, vt) | 0, s2 = s2 + Math.imul(it, mt) | 0, s2 = s2 + Math.imul(nt, vt) | 0, v2 = v2 + Math.imul(nt, mt) | 0, l2 = l2 + Math.imul(et, gt) | 0, s2 = s2 + Math.imul(et, At) | 0, s2 = s2 + Math.imul(rt, gt) | 0, v2 = v2 + Math.imul(rt, At) | 0, l2 = l2 + Math.imul($2, bt) | 0, s2 = s2 + Math.imul($2, yt) | 0, s2 = s2 + Math.imul(tt, bt) | 0, v2 = v2 + Math.imul(tt, yt) | 0, l2 = l2 + Math.imul(X, wt) | 0, s2 = s2 + Math.imul(X, xt) | 0, s2 = s2 + Math.imul(Z2, wt) | 0, v2 = v2 + Math.imul(Z2, xt) | 0, l2 = l2 + Math.imul(D, Mt) | 0, s2 = s2 + Math.imul(D, Et) | 0, s2 = s2 + Math.imul(q, Mt) | 0, v2 = v2 + Math.imul(q, Et) | 0, l2 = l2 + Math.imul(P2, St) | 0, s2 = s2 + Math.imul(P2, Nt) | 0, s2 = s2 + Math.imul(O, St) | 0, v2 = v2 + Math.imul(O, Nt) | 0, l2 = l2 + Math.imul(B, It) | 0, s2 = s2 + Math.imul(B, _t) | 0, s2 = s2 + Math.imul(R2, It) | 0, v2 = v2 + Math.imul(R2, _t) | 0;
      var ei = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (ei >>> 26) | 0, ei &= 67108863, l2 = Math.imul(st, dt), s2 = Math.imul(st, pt), s2 = s2 + Math.imul(at, dt) | 0, v2 = Math.imul(at, pt), l2 = l2 + Math.imul(ft, vt) | 0, s2 = s2 + Math.imul(ft, mt) | 0, s2 = s2 + Math.imul(ot, vt) | 0, v2 = v2 + Math.imul(ot, mt) | 0, l2 = l2 + Math.imul(it, gt) | 0, s2 = s2 + Math.imul(it, At) | 0, s2 = s2 + Math.imul(nt, gt) | 0, v2 = v2 + Math.imul(nt, At) | 0, l2 = l2 + Math.imul(et, bt) | 0, s2 = s2 + Math.imul(et, yt) | 0, s2 = s2 + Math.imul(rt, bt) | 0, v2 = v2 + Math.imul(rt, yt) | 0, l2 = l2 + Math.imul($2, wt) | 0, s2 = s2 + Math.imul($2, xt) | 0, s2 = s2 + Math.imul(tt, wt) | 0, v2 = v2 + Math.imul(tt, xt) | 0, l2 = l2 + Math.imul(X, Mt) | 0, s2 = s2 + Math.imul(X, Et) | 0, s2 = s2 + Math.imul(Z2, Mt) | 0, v2 = v2 + Math.imul(Z2, Et) | 0, l2 = l2 + Math.imul(D, St) | 0, s2 = s2 + Math.imul(D, Nt) | 0, s2 = s2 + Math.imul(q, St) | 0, v2 = v2 + Math.imul(q, Nt) | 0, l2 = l2 + Math.imul(P2, It) | 0, s2 = s2 + Math.imul(P2, _t) | 0, s2 = s2 + Math.imul(O, It) | 0, v2 = v2 + Math.imul(O, _t) | 0;
      var ri = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (ri >>> 26) | 0, ri &= 67108863, l2 = Math.imul(st, vt), s2 = Math.imul(st, mt), s2 = s2 + Math.imul(at, vt) | 0, v2 = Math.imul(at, mt), l2 = l2 + Math.imul(ft, gt) | 0, s2 = s2 + Math.imul(ft, At) | 0, s2 = s2 + Math.imul(ot, gt) | 0, v2 = v2 + Math.imul(ot, At) | 0, l2 = l2 + Math.imul(it, bt) | 0, s2 = s2 + Math.imul(it, yt) | 0, s2 = s2 + Math.imul(nt, bt) | 0, v2 = v2 + Math.imul(nt, yt) | 0, l2 = l2 + Math.imul(et, wt) | 0, s2 = s2 + Math.imul(et, xt) | 0, s2 = s2 + Math.imul(rt, wt) | 0, v2 = v2 + Math.imul(rt, xt) | 0, l2 = l2 + Math.imul($2, Mt) | 0, s2 = s2 + Math.imul($2, Et) | 0, s2 = s2 + Math.imul(tt, Mt) | 0, v2 = v2 + Math.imul(tt, Et) | 0, l2 = l2 + Math.imul(X, St) | 0, s2 = s2 + Math.imul(X, Nt) | 0, s2 = s2 + Math.imul(Z2, St) | 0, v2 = v2 + Math.imul(Z2, Nt) | 0, l2 = l2 + Math.imul(D, It) | 0, s2 = s2 + Math.imul(D, _t) | 0, s2 = s2 + Math.imul(q, It) | 0, v2 = v2 + Math.imul(q, _t) | 0;
      var ii = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (ii >>> 26) | 0, ii &= 67108863, l2 = Math.imul(st, gt), s2 = Math.imul(st, At), s2 = s2 + Math.imul(at, gt) | 0, v2 = Math.imul(at, At), l2 = l2 + Math.imul(ft, bt) | 0, s2 = s2 + Math.imul(ft, yt) | 0, s2 = s2 + Math.imul(ot, bt) | 0, v2 = v2 + Math.imul(ot, yt) | 0, l2 = l2 + Math.imul(it, wt) | 0, s2 = s2 + Math.imul(it, xt) | 0, s2 = s2 + Math.imul(nt, wt) | 0, v2 = v2 + Math.imul(nt, xt) | 0, l2 = l2 + Math.imul(et, Mt) | 0, s2 = s2 + Math.imul(et, Et) | 0, s2 = s2 + Math.imul(rt, Mt) | 0, v2 = v2 + Math.imul(rt, Et) | 0, l2 = l2 + Math.imul($2, St) | 0, s2 = s2 + Math.imul($2, Nt) | 0, s2 = s2 + Math.imul(tt, St) | 0, v2 = v2 + Math.imul(tt, Nt) | 0, l2 = l2 + Math.imul(X, It) | 0, s2 = s2 + Math.imul(X, _t) | 0, s2 = s2 + Math.imul(Z2, It) | 0, v2 = v2 + Math.imul(Z2, _t) | 0;
      var ni = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (ni >>> 26) | 0, ni &= 67108863, l2 = Math.imul(st, bt), s2 = Math.imul(st, yt), s2 = s2 + Math.imul(at, bt) | 0, v2 = Math.imul(at, yt), l2 = l2 + Math.imul(ft, wt) | 0, s2 = s2 + Math.imul(ft, xt) | 0, s2 = s2 + Math.imul(ot, wt) | 0, v2 = v2 + Math.imul(ot, xt) | 0, l2 = l2 + Math.imul(it, Mt) | 0, s2 = s2 + Math.imul(it, Et) | 0, s2 = s2 + Math.imul(nt, Mt) | 0, v2 = v2 + Math.imul(nt, Et) | 0, l2 = l2 + Math.imul(et, St) | 0, s2 = s2 + Math.imul(et, Nt) | 0, s2 = s2 + Math.imul(rt, St) | 0, v2 = v2 + Math.imul(rt, Nt) | 0, l2 = l2 + Math.imul($2, It) | 0, s2 = s2 + Math.imul($2, _t) | 0, s2 = s2 + Math.imul(tt, It) | 0, v2 = v2 + Math.imul(tt, _t) | 0;
      var fi = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (fi >>> 26) | 0, fi &= 67108863, l2 = Math.imul(st, wt), s2 = Math.imul(st, xt), s2 = s2 + Math.imul(at, wt) | 0, v2 = Math.imul(at, xt), l2 = l2 + Math.imul(ft, Mt) | 0, s2 = s2 + Math.imul(ft, Et) | 0, s2 = s2 + Math.imul(ot, Mt) | 0, v2 = v2 + Math.imul(ot, Et) | 0, l2 = l2 + Math.imul(it, St) | 0, s2 = s2 + Math.imul(it, Nt) | 0, s2 = s2 + Math.imul(nt, St) | 0, v2 = v2 + Math.imul(nt, Nt) | 0, l2 = l2 + Math.imul(et, It) | 0, s2 = s2 + Math.imul(et, _t) | 0, s2 = s2 + Math.imul(rt, It) | 0, v2 = v2 + Math.imul(rt, _t) | 0;
      var oi = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (oi >>> 26) | 0, oi &= 67108863, l2 = Math.imul(st, Mt), s2 = Math.imul(st, Et), s2 = s2 + Math.imul(at, Mt) | 0, v2 = Math.imul(at, Et), l2 = l2 + Math.imul(ft, St) | 0, s2 = s2 + Math.imul(ft, Nt) | 0, s2 = s2 + Math.imul(ot, St) | 0, v2 = v2 + Math.imul(ot, Nt) | 0, l2 = l2 + Math.imul(it, It) | 0, s2 = s2 + Math.imul(it, _t) | 0, s2 = s2 + Math.imul(nt, It) | 0, v2 = v2 + Math.imul(nt, _t) | 0;
      var si = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (si >>> 26) | 0, si &= 67108863, l2 = Math.imul(st, St), s2 = Math.imul(st, Nt), s2 = s2 + Math.imul(at, St) | 0, v2 = Math.imul(at, Nt), l2 = l2 + Math.imul(ft, It) | 0, s2 = s2 + Math.imul(ft, _t) | 0, s2 = s2 + Math.imul(ot, It) | 0, v2 = v2 + Math.imul(ot, _t) | 0;
      var ai = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      M2 = (v2 + (s2 >>> 13) | 0) + (ai >>> 26) | 0, ai &= 67108863, l2 = Math.imul(st, It), s2 = Math.imul(st, _t), s2 = s2 + Math.imul(at, It) | 0, v2 = Math.imul(at, _t);
      var ui = (M2 + l2 | 0) + ((s2 & 8191) << 13) | 0;
      return M2 = (v2 + (s2 >>> 13) | 0) + (ui >>> 26) | 0, ui &= 67108863, x2[0] = Me, x2[1] = Ee, x2[2] = Se, x2[3] = Ne, x2[4] = Ie, x2[5] = Wr, x2[6] = Xr, x2[7] = Zr, x2[8] = $r, x2[9] = ti, x2[10] = ei, x2[11] = ri, x2[12] = ii, x2[13] = ni, x2[14] = fi, x2[15] = oi, x2[16] = si, x2[17] = ai, x2[18] = ui, M2 !== 0 && (x2[19] = M2, c2.length++), c2;
    };
    Math.imul || (J = U);
    function Bt(A2, f2, a2) {
      a2.negative = f2.negative ^ A2.negative, a2.length = A2.length + f2.length;
      for (var c2 = 0, d2 = 0, g2 = 0; g2 < a2.length - 1; g2++) {
        var x2 = d2;
        d2 = 0;
        for (var M2 = c2 & 67108863, l2 = Math.min(g2, f2.length - 1), s2 = Math.max(0, g2 - A2.length + 1); s2 <= l2; s2++) {
          var v2 = g2 - s2, k2 = A2.words[v2] | 0, u2 = f2.words[s2] | 0, E2 = k2 * u2, _2 = E2 & 67108863;
          x2 = x2 + (E2 / 67108864 | 0) | 0, _2 = _2 + M2 | 0, M2 = _2 & 67108863, x2 = x2 + (_2 >>> 26) | 0, d2 += x2 >>> 26, x2 &= 67108863;
        }
        a2.words[g2] = M2, c2 = x2, x2 = d2;
      }
      return c2 !== 0 ? a2.words[g2] = c2 : a2.length--, a2._strip();
    }
    function G(A2, f2, a2) {
      return Bt(A2, f2, a2);
    }
    o2.prototype.mulTo = function(f2, a2) {
      var c2, d2 = this.length + f2.length;
      return this.length === 10 && f2.length === 10 ? c2 = J(this, f2, a2) : d2 < 63 ? c2 = U(this, f2, a2) : d2 < 1024 ? c2 = Bt(this, f2, a2) : c2 = G(this, f2, a2), c2;
    }, o2.prototype.mul = function(f2) {
      var a2 = new o2(null);
      return a2.words = new Array(this.length + f2.length), this.mulTo(f2, a2);
    }, o2.prototype.mulf = function(f2) {
      var a2 = new o2(null);
      return a2.words = new Array(this.length + f2.length), G(this, f2, a2);
    }, o2.prototype.imul = function(f2) {
      return this.clone().mulTo(f2, this);
    }, o2.prototype.imuln = function(f2) {
      var a2 = f2 < 0;
      a2 && (f2 = -f2), i2(typeof f2 == "number"), i2(f2 < 67108864);
      for (var c2 = 0, d2 = 0; d2 < this.length; d2++) {
        var g2 = (this.words[d2] | 0) * f2, x2 = (g2 & 67108863) + (c2 & 67108863);
        c2 >>= 26, c2 += g2 / 67108864 | 0, c2 += x2 >>> 26, this.words[d2] = x2 & 67108863;
      }
      return c2 !== 0 && (this.words[d2] = c2, this.length++), a2 ? this.ineg() : this;
    }, o2.prototype.muln = function(f2) {
      return this.clone().imuln(f2);
    }, o2.prototype.sqr = function() {
      return this.mul(this);
    }, o2.prototype.isqr = function() {
      return this.imul(this.clone());
    }, o2.prototype.pow = function(f2) {
      var a2 = F(f2);
      if (a2.length === 0)
        return new o2(1);
      for (var c2 = this, d2 = 0; d2 < a2.length && a2[d2] === 0; d2++, c2 = c2.sqr())
        ;
      if (++d2 < a2.length)
        for (var g2 = c2.sqr(); d2 < a2.length; d2++, g2 = g2.sqr())
          a2[d2] !== 0 && (c2 = c2.mul(g2));
      return c2;
    }, o2.prototype.iushln = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = f2 % 26, c2 = (f2 - a2) / 26, d2 = 67108863 >>> 26 - a2 << 26 - a2, g2;
      if (a2 !== 0) {
        var x2 = 0;
        for (g2 = 0; g2 < this.length; g2++) {
          var M2 = this.words[g2] & d2, l2 = (this.words[g2] | 0) - M2 << a2;
          this.words[g2] = l2 | x2, x2 = M2 >>> 26 - a2;
        }
        x2 && (this.words[g2] = x2, this.length++);
      }
      if (c2 !== 0) {
        for (g2 = this.length - 1; g2 >= 0; g2--)
          this.words[g2 + c2] = this.words[g2];
        for (g2 = 0; g2 < c2; g2++)
          this.words[g2] = 0;
        this.length += c2;
      }
      return this._strip();
    }, o2.prototype.ishln = function(f2) {
      return i2(this.negative === 0), this.iushln(f2);
    }, o2.prototype.iushrn = function(f2, a2, c2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var d2;
      a2 ? d2 = (a2 - a2 % 26) / 26 : d2 = 0;
      var g2 = f2 % 26, x2 = Math.min((f2 - g2) / 26, this.length), M2 = 67108863 ^ 67108863 >>> g2 << g2, l2 = c2;
      if (d2 -= x2, d2 = Math.max(0, d2), l2) {
        for (var s2 = 0; s2 < x2; s2++)
          l2.words[s2] = this.words[s2];
        l2.length = x2;
      }
      if (x2 !== 0)
        if (this.length > x2)
          for (this.length -= x2, s2 = 0; s2 < this.length; s2++)
            this.words[s2] = this.words[s2 + x2];
        else
          this.words[0] = 0, this.length = 1;
      var v2 = 0;
      for (s2 = this.length - 1; s2 >= 0 && (v2 !== 0 || s2 >= d2); s2--) {
        var k2 = this.words[s2] | 0;
        this.words[s2] = v2 << 26 - g2 | k2 >>> g2, v2 = k2 & M2;
      }
      return l2 && v2 !== 0 && (l2.words[l2.length++] = v2), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, o2.prototype.ishrn = function(f2, a2, c2) {
      return i2(this.negative === 0), this.iushrn(f2, a2, c2);
    }, o2.prototype.shln = function(f2) {
      return this.clone().ishln(f2);
    }, o2.prototype.ushln = function(f2) {
      return this.clone().iushln(f2);
    }, o2.prototype.shrn = function(f2) {
      return this.clone().ishrn(f2);
    }, o2.prototype.ushrn = function(f2) {
      return this.clone().iushrn(f2);
    }, o2.prototype.testn = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = f2 % 26, c2 = (f2 - a2) / 26, d2 = 1 << a2;
      if (this.length <= c2)
        return false;
      var g2 = this.words[c2];
      return !!(g2 & d2);
    }, o2.prototype.imaskn = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = f2 % 26, c2 = (f2 - a2) / 26;
      if (i2(this.negative === 0, "imaskn works only with positive numbers"), this.length <= c2)
        return this;
      if (a2 !== 0 && c2++, this.length = Math.min(c2, this.length), a2 !== 0) {
        var d2 = 67108863 ^ 67108863 >>> a2 << a2;
        this.words[this.length - 1] &= d2;
      }
      return this._strip();
    }, o2.prototype.maskn = function(f2) {
      return this.clone().imaskn(f2);
    }, o2.prototype.iaddn = function(f2) {
      return i2(typeof f2 == "number"), i2(f2 < 67108864), f2 < 0 ? this.isubn(-f2) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= f2 ? (this.words[0] = f2 - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(f2), this.negative = 1, this) : this._iaddn(f2);
    }, o2.prototype._iaddn = function(f2) {
      this.words[0] += f2;
      for (var a2 = 0; a2 < this.length && this.words[a2] >= 67108864; a2++)
        this.words[a2] -= 67108864, a2 === this.length - 1 ? this.words[a2 + 1] = 1 : this.words[a2 + 1]++;
      return this.length = Math.max(this.length, a2 + 1), this;
    }, o2.prototype.isubn = function(f2) {
      if (i2(typeof f2 == "number"), i2(f2 < 67108864), f2 < 0)
        return this.iaddn(-f2);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(f2), this.negative = 1, this;
      if (this.words[0] -= f2, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var a2 = 0; a2 < this.length && this.words[a2] < 0; a2++)
          this.words[a2] += 67108864, this.words[a2 + 1] -= 1;
      return this._strip();
    }, o2.prototype.addn = function(f2) {
      return this.clone().iaddn(f2);
    }, o2.prototype.subn = function(f2) {
      return this.clone().isubn(f2);
    }, o2.prototype.iabs = function() {
      return this.negative = 0, this;
    }, o2.prototype.abs = function() {
      return this.clone().iabs();
    }, o2.prototype._ishlnsubmul = function(f2, a2, c2) {
      var d2 = f2.length + c2, g2;
      this._expand(d2);
      var x2, M2 = 0;
      for (g2 = 0; g2 < f2.length; g2++) {
        x2 = (this.words[g2 + c2] | 0) + M2;
        var l2 = (f2.words[g2] | 0) * a2;
        x2 -= l2 & 67108863, M2 = (x2 >> 26) - (l2 / 67108864 | 0), this.words[g2 + c2] = x2 & 67108863;
      }
      for (; g2 < this.length - c2; g2++)
        x2 = (this.words[g2 + c2] | 0) + M2, M2 = x2 >> 26, this.words[g2 + c2] = x2 & 67108863;
      if (M2 === 0)
        return this._strip();
      for (i2(M2 === -1), M2 = 0, g2 = 0; g2 < this.length; g2++)
        x2 = -(this.words[g2] | 0) + M2, M2 = x2 >> 26, this.words[g2] = x2 & 67108863;
      return this.negative = 1, this._strip();
    }, o2.prototype._wordDiv = function(f2, a2) {
      var c2 = this.length - f2.length, d2 = this.clone(), g2 = f2, x2 = g2.words[g2.length - 1] | 0, M2 = this._countBits(x2);
      c2 = 26 - M2, c2 !== 0 && (g2 = g2.ushln(c2), d2.iushln(c2), x2 = g2.words[g2.length - 1] | 0);
      var l2 = d2.length - g2.length, s2;
      if (a2 !== "mod") {
        s2 = new o2(null), s2.length = l2 + 1, s2.words = new Array(s2.length);
        for (var v2 = 0; v2 < s2.length; v2++)
          s2.words[v2] = 0;
      }
      var k2 = d2.clone()._ishlnsubmul(g2, 1, l2);
      k2.negative === 0 && (d2 = k2, s2 && (s2.words[l2] = 1));
      for (var u2 = l2 - 1; u2 >= 0; u2--) {
        var E2 = (d2.words[g2.length + u2] | 0) * 67108864 + (d2.words[g2.length + u2 - 1] | 0);
        for (E2 = Math.min(E2 / x2 | 0, 67108863), d2._ishlnsubmul(g2, E2, u2); d2.negative !== 0; )
          E2--, d2.negative = 0, d2._ishlnsubmul(g2, 1, u2), d2.isZero() || (d2.negative ^= 1);
        s2 && (s2.words[u2] = E2);
      }
      return s2 && s2._strip(), d2._strip(), a2 !== "div" && c2 !== 0 && d2.iushrn(c2), { div: s2 || null, mod: d2 };
    }, o2.prototype.divmod = function(f2, a2, c2) {
      if (i2(!f2.isZero()), this.isZero())
        return { div: new o2(0), mod: new o2(0) };
      var d2, g2, x2;
      return this.negative !== 0 && f2.negative === 0 ? (x2 = this.neg().divmod(f2, a2), a2 !== "mod" && (d2 = x2.div.neg()), a2 !== "div" && (g2 = x2.mod.neg(), c2 && g2.negative !== 0 && g2.iadd(f2)), { div: d2, mod: g2 }) : this.negative === 0 && f2.negative !== 0 ? (x2 = this.divmod(f2.neg(), a2), a2 !== "mod" && (d2 = x2.div.neg()), { div: d2, mod: x2.mod }) : this.negative & f2.negative ? (x2 = this.neg().divmod(f2.neg(), a2), a2 !== "div" && (g2 = x2.mod.neg(), c2 && g2.negative !== 0 && g2.isub(f2)), { div: x2.div, mod: g2 }) : f2.length > this.length || this.cmp(f2) < 0 ? { div: new o2(0), mod: this } : f2.length === 1 ? a2 === "div" ? { div: this.divn(f2.words[0]), mod: null } : a2 === "mod" ? { div: null, mod: new o2(this.modrn(f2.words[0])) } : { div: this.divn(f2.words[0]), mod: new o2(this.modrn(f2.words[0])) } : this._wordDiv(f2, a2);
    }, o2.prototype.div = function(f2) {
      return this.divmod(f2, "div", false).div;
    }, o2.prototype.mod = function(f2) {
      return this.divmod(f2, "mod", false).mod;
    }, o2.prototype.umod = function(f2) {
      return this.divmod(f2, "mod", true).mod;
    }, o2.prototype.divRound = function(f2) {
      var a2 = this.divmod(f2);
      if (a2.mod.isZero())
        return a2.div;
      var c2 = a2.div.negative !== 0 ? a2.mod.isub(f2) : a2.mod, d2 = f2.ushrn(1), g2 = f2.andln(1), x2 = c2.cmp(d2);
      return x2 < 0 || g2 === 1 && x2 === 0 ? a2.div : a2.div.negative !== 0 ? a2.div.isubn(1) : a2.div.iaddn(1);
    }, o2.prototype.modrn = function(f2) {
      var a2 = f2 < 0;
      a2 && (f2 = -f2), i2(f2 <= 67108863);
      for (var c2 = (1 << 26) % f2, d2 = 0, g2 = this.length - 1; g2 >= 0; g2--)
        d2 = (c2 * d2 + (this.words[g2] | 0)) % f2;
      return a2 ? -d2 : d2;
    }, o2.prototype.modn = function(f2) {
      return this.modrn(f2);
    }, o2.prototype.idivn = function(f2) {
      var a2 = f2 < 0;
      a2 && (f2 = -f2), i2(f2 <= 67108863);
      for (var c2 = 0, d2 = this.length - 1; d2 >= 0; d2--) {
        var g2 = (this.words[d2] | 0) + c2 * 67108864;
        this.words[d2] = g2 / f2 | 0, c2 = g2 % f2;
      }
      return this._strip(), a2 ? this.ineg() : this;
    }, o2.prototype.divn = function(f2) {
      return this.clone().idivn(f2);
    }, o2.prototype.egcd = function(f2) {
      i2(f2.negative === 0), i2(!f2.isZero());
      var a2 = this, c2 = f2.clone();
      a2.negative !== 0 ? a2 = a2.umod(f2) : a2 = a2.clone();
      for (var d2 = new o2(1), g2 = new o2(0), x2 = new o2(0), M2 = new o2(1), l2 = 0; a2.isEven() && c2.isEven(); )
        a2.iushrn(1), c2.iushrn(1), ++l2;
      for (var s2 = c2.clone(), v2 = a2.clone(); !a2.isZero(); ) {
        for (var k2 = 0, u2 = 1; !(a2.words[0] & u2) && k2 < 26; ++k2, u2 <<= 1)
          ;
        if (k2 > 0)
          for (a2.iushrn(k2); k2-- > 0; )
            (d2.isOdd() || g2.isOdd()) && (d2.iadd(s2), g2.isub(v2)), d2.iushrn(1), g2.iushrn(1);
        for (var E2 = 0, _2 = 1; !(c2.words[0] & _2) && E2 < 26; ++E2, _2 <<= 1)
          ;
        if (E2 > 0)
          for (c2.iushrn(E2); E2-- > 0; )
            (x2.isOdd() || M2.isOdd()) && (x2.iadd(s2), M2.isub(v2)), x2.iushrn(1), M2.iushrn(1);
        a2.cmp(c2) >= 0 ? (a2.isub(c2), d2.isub(x2), g2.isub(M2)) : (c2.isub(a2), x2.isub(d2), M2.isub(g2));
      }
      return { a: x2, b: M2, gcd: c2.iushln(l2) };
    }, o2.prototype._invmp = function(f2) {
      i2(f2.negative === 0), i2(!f2.isZero());
      var a2 = this, c2 = f2.clone();
      a2.negative !== 0 ? a2 = a2.umod(f2) : a2 = a2.clone();
      for (var d2 = new o2(1), g2 = new o2(0), x2 = c2.clone(); a2.cmpn(1) > 0 && c2.cmpn(1) > 0; ) {
        for (var M2 = 0, l2 = 1; !(a2.words[0] & l2) && M2 < 26; ++M2, l2 <<= 1)
          ;
        if (M2 > 0)
          for (a2.iushrn(M2); M2-- > 0; )
            d2.isOdd() && d2.iadd(x2), d2.iushrn(1);
        for (var s2 = 0, v2 = 1; !(c2.words[0] & v2) && s2 < 26; ++s2, v2 <<= 1)
          ;
        if (s2 > 0)
          for (c2.iushrn(s2); s2-- > 0; )
            g2.isOdd() && g2.iadd(x2), g2.iushrn(1);
        a2.cmp(c2) >= 0 ? (a2.isub(c2), d2.isub(g2)) : (c2.isub(a2), g2.isub(d2));
      }
      var k2;
      return a2.cmpn(1) === 0 ? k2 = d2 : k2 = g2, k2.cmpn(0) < 0 && k2.iadd(f2), k2;
    }, o2.prototype.gcd = function(f2) {
      if (this.isZero())
        return f2.abs();
      if (f2.isZero())
        return this.abs();
      var a2 = this.clone(), c2 = f2.clone();
      a2.negative = 0, c2.negative = 0;
      for (var d2 = 0; a2.isEven() && c2.isEven(); d2++)
        a2.iushrn(1), c2.iushrn(1);
      do {
        for (; a2.isEven(); )
          a2.iushrn(1);
        for (; c2.isEven(); )
          c2.iushrn(1);
        var g2 = a2.cmp(c2);
        if (g2 < 0) {
          var x2 = a2;
          a2 = c2, c2 = x2;
        } else if (g2 === 0 || c2.cmpn(1) === 0)
          break;
        a2.isub(c2);
      } while (true);
      return c2.iushln(d2);
    }, o2.prototype.invm = function(f2) {
      return this.egcd(f2).a.umod(f2);
    }, o2.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, o2.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, o2.prototype.andln = function(f2) {
      return this.words[0] & f2;
    }, o2.prototype.bincn = function(f2) {
      i2(typeof f2 == "number");
      var a2 = f2 % 26, c2 = (f2 - a2) / 26, d2 = 1 << a2;
      if (this.length <= c2)
        return this._expand(c2 + 1), this.words[c2] |= d2, this;
      for (var g2 = d2, x2 = c2; g2 !== 0 && x2 < this.length; x2++) {
        var M2 = this.words[x2] | 0;
        M2 += g2, g2 = M2 >>> 26, M2 &= 67108863, this.words[x2] = M2;
      }
      return g2 !== 0 && (this.words[x2] = g2, this.length++), this;
    }, o2.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, o2.prototype.cmpn = function(f2) {
      var a2 = f2 < 0;
      if (this.negative !== 0 && !a2)
        return -1;
      if (this.negative === 0 && a2)
        return 1;
      this._strip();
      var c2;
      if (this.length > 1)
        c2 = 1;
      else {
        a2 && (f2 = -f2), i2(f2 <= 67108863, "Number is too big");
        var d2 = this.words[0] | 0;
        c2 = d2 === f2 ? 0 : d2 < f2 ? -1 : 1;
      }
      return this.negative !== 0 ? -c2 | 0 : c2;
    }, o2.prototype.cmp = function(f2) {
      if (this.negative !== 0 && f2.negative === 0)
        return -1;
      if (this.negative === 0 && f2.negative !== 0)
        return 1;
      var a2 = this.ucmp(f2);
      return this.negative !== 0 ? -a2 | 0 : a2;
    }, o2.prototype.ucmp = function(f2) {
      if (this.length > f2.length)
        return 1;
      if (this.length < f2.length)
        return -1;
      for (var a2 = 0, c2 = this.length - 1; c2 >= 0; c2--) {
        var d2 = this.words[c2] | 0, g2 = f2.words[c2] | 0;
        if (d2 !== g2) {
          d2 < g2 ? a2 = -1 : d2 > g2 && (a2 = 1);
          break;
        }
      }
      return a2;
    }, o2.prototype.gtn = function(f2) {
      return this.cmpn(f2) === 1;
    }, o2.prototype.gt = function(f2) {
      return this.cmp(f2) === 1;
    }, o2.prototype.gten = function(f2) {
      return this.cmpn(f2) >= 0;
    }, o2.prototype.gte = function(f2) {
      return this.cmp(f2) >= 0;
    }, o2.prototype.ltn = function(f2) {
      return this.cmpn(f2) === -1;
    }, o2.prototype.lt = function(f2) {
      return this.cmp(f2) === -1;
    }, o2.prototype.lten = function(f2) {
      return this.cmpn(f2) <= 0;
    }, o2.prototype.lte = function(f2) {
      return this.cmp(f2) <= 0;
    }, o2.prototype.eqn = function(f2) {
      return this.cmpn(f2) === 0;
    }, o2.prototype.eq = function(f2) {
      return this.cmp(f2) === 0;
    }, o2.red = function(f2) {
      return new Y(f2);
    }, o2.prototype.toRed = function(f2) {
      return i2(!this.red, "Already a number in reduction context"), i2(this.negative === 0, "red works only with positives"), f2.convertTo(this)._forceRed(f2);
    }, o2.prototype.fromRed = function() {
      return i2(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, o2.prototype._forceRed = function(f2) {
      return this.red = f2, this;
    }, o2.prototype.forceRed = function(f2) {
      return i2(!this.red, "Already a number in reduction context"), this._forceRed(f2);
    }, o2.prototype.redAdd = function(f2) {
      return i2(this.red, "redAdd works only with red numbers"), this.red.add(this, f2);
    }, o2.prototype.redIAdd = function(f2) {
      return i2(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, f2);
    }, o2.prototype.redSub = function(f2) {
      return i2(this.red, "redSub works only with red numbers"), this.red.sub(this, f2);
    }, o2.prototype.redISub = function(f2) {
      return i2(this.red, "redISub works only with red numbers"), this.red.isub(this, f2);
    }, o2.prototype.redShl = function(f2) {
      return i2(this.red, "redShl works only with red numbers"), this.red.shl(this, f2);
    }, o2.prototype.redMul = function(f2) {
      return i2(this.red, "redMul works only with red numbers"), this.red._verify2(this, f2), this.red.mul(this, f2);
    }, o2.prototype.redIMul = function(f2) {
      return i2(this.red, "redMul works only with red numbers"), this.red._verify2(this, f2), this.red.imul(this, f2);
    }, o2.prototype.redSqr = function() {
      return i2(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, o2.prototype.redISqr = function() {
      return i2(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, o2.prototype.redSqrt = function() {
      return i2(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, o2.prototype.redInvm = function() {
      return i2(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, o2.prototype.redNeg = function() {
      return i2(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, o2.prototype.redPow = function(f2) {
      return i2(this.red && !f2.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, f2);
    };
    var H2 = { k256: null, p224: null, p192: null, p25519: null };
    function z(A2, f2) {
      this.name = A2, this.p = new o2(f2, 16), this.n = this.p.bitLength(), this.k = new o2(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    z.prototype._tmp = function() {
      var f2 = new o2(null);
      return f2.words = new Array(Math.ceil(this.n / 13)), f2;
    }, z.prototype.ireduce = function(f2) {
      var a2 = f2, c2;
      do
        this.split(a2, this.tmp), a2 = this.imulK(a2), a2 = a2.iadd(this.tmp), c2 = a2.bitLength();
      while (c2 > this.n);
      var d2 = c2 < this.n ? -1 : a2.ucmp(this.p);
      return d2 === 0 ? (a2.words[0] = 0, a2.length = 1) : d2 > 0 ? a2.isub(this.p) : a2.strip !== void 0 ? a2.strip() : a2._strip(), a2;
    }, z.prototype.split = function(f2, a2) {
      f2.iushrn(this.n, 0, a2);
    }, z.prototype.imulK = function(f2) {
      return f2.imul(this.k);
    };
    function Pt() {
      z.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    n3(Pt, z), Pt.prototype.split = function(f2, a2) {
      for (var c2 = 4194303, d2 = Math.min(f2.length, 9), g2 = 0; g2 < d2; g2++)
        a2.words[g2] = f2.words[g2];
      if (a2.length = d2, f2.length <= 9) {
        f2.words[0] = 0, f2.length = 1;
        return;
      }
      var x2 = f2.words[9];
      for (a2.words[a2.length++] = x2 & c2, g2 = 10; g2 < f2.length; g2++) {
        var M2 = f2.words[g2] | 0;
        f2.words[g2 - 10] = (M2 & c2) << 4 | x2 >>> 22, x2 = M2;
      }
      x2 >>>= 22, f2.words[g2 - 10] = x2, x2 === 0 && f2.length > 10 ? f2.length -= 10 : f2.length -= 9;
    }, Pt.prototype.imulK = function(f2) {
      f2.words[f2.length] = 0, f2.words[f2.length + 1] = 0, f2.length += 2;
      for (var a2 = 0, c2 = 0; c2 < f2.length; c2++) {
        var d2 = f2.words[c2] | 0;
        a2 += d2 * 977, f2.words[c2] = a2 & 67108863, a2 = d2 * 64 + (a2 / 67108864 | 0);
      }
      return f2.words[f2.length - 1] === 0 && (f2.length--, f2.words[f2.length - 1] === 0 && f2.length--), f2;
    };
    function W() {
      z.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    n3(W, z);
    function Rt() {
      z.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    n3(Rt, z);
    function Yt() {
      z.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    n3(Yt, z), Yt.prototype.imulK = function(f2) {
      for (var a2 = 0, c2 = 0; c2 < f2.length; c2++) {
        var d2 = (f2.words[c2] | 0) * 19 + a2, g2 = d2 & 67108863;
        d2 >>>= 26, f2.words[c2] = g2, a2 = d2;
      }
      return a2 !== 0 && (f2.words[f2.length++] = a2), f2;
    }, o2._prime = function(f2) {
      if (H2[f2])
        return H2[f2];
      var a2;
      if (f2 === "k256")
        a2 = new Pt();
      else if (f2 === "p224")
        a2 = new W();
      else if (f2 === "p192")
        a2 = new Rt();
      else if (f2 === "p25519")
        a2 = new Yt();
      else
        throw new Error("Unknown prime " + f2);
      return H2[f2] = a2, a2;
    };
    function Y(A2) {
      if (typeof A2 == "string") {
        var f2 = o2._prime(A2);
        this.m = f2.p, this.prime = f2;
      } else
        i2(A2.gtn(1), "modulus must be greater than 1"), this.m = A2, this.prime = null;
    }
    Y.prototype._verify1 = function(f2) {
      i2(f2.negative === 0, "red works only with positives"), i2(f2.red, "red works only with red numbers");
    }, Y.prototype._verify2 = function(f2, a2) {
      i2((f2.negative | a2.negative) === 0, "red works only with positives"), i2(f2.red && f2.red === a2.red, "red works only with red numbers");
    }, Y.prototype.imod = function(f2) {
      return this.prime ? this.prime.ireduce(f2)._forceRed(this) : (w2(f2, f2.umod(this.m)._forceRed(this)), f2);
    }, Y.prototype.neg = function(f2) {
      return f2.isZero() ? f2.clone() : this.m.sub(f2)._forceRed(this);
    }, Y.prototype.add = function(f2, a2) {
      this._verify2(f2, a2);
      var c2 = f2.add(a2);
      return c2.cmp(this.m) >= 0 && c2.isub(this.m), c2._forceRed(this);
    }, Y.prototype.iadd = function(f2, a2) {
      this._verify2(f2, a2);
      var c2 = f2.iadd(a2);
      return c2.cmp(this.m) >= 0 && c2.isub(this.m), c2;
    }, Y.prototype.sub = function(f2, a2) {
      this._verify2(f2, a2);
      var c2 = f2.sub(a2);
      return c2.cmpn(0) < 0 && c2.iadd(this.m), c2._forceRed(this);
    }, Y.prototype.isub = function(f2, a2) {
      this._verify2(f2, a2);
      var c2 = f2.isub(a2);
      return c2.cmpn(0) < 0 && c2.iadd(this.m), c2;
    }, Y.prototype.shl = function(f2, a2) {
      return this._verify1(f2), this.imod(f2.ushln(a2));
    }, Y.prototype.imul = function(f2, a2) {
      return this._verify2(f2, a2), this.imod(f2.imul(a2));
    }, Y.prototype.mul = function(f2, a2) {
      return this._verify2(f2, a2), this.imod(f2.mul(a2));
    }, Y.prototype.isqr = function(f2) {
      return this.imul(f2, f2.clone());
    }, Y.prototype.sqr = function(f2) {
      return this.mul(f2, f2);
    }, Y.prototype.sqrt = function(f2) {
      if (f2.isZero())
        return f2.clone();
      var a2 = this.m.andln(3);
      if (i2(a2 % 2 === 1), a2 === 3) {
        var c2 = this.m.add(new o2(1)).iushrn(2);
        return this.pow(f2, c2);
      }
      for (var d2 = this.m.subn(1), g2 = 0; !d2.isZero() && d2.andln(1) === 0; )
        g2++, d2.iushrn(1);
      i2(!d2.isZero());
      var x2 = new o2(1).toRed(this), M2 = x2.redNeg(), l2 = this.m.subn(1).iushrn(1), s2 = this.m.bitLength();
      for (s2 = new o2(2 * s2 * s2).toRed(this); this.pow(s2, l2).cmp(M2) !== 0; )
        s2.redIAdd(M2);
      for (var v2 = this.pow(s2, d2), k2 = this.pow(f2, d2.addn(1).iushrn(1)), u2 = this.pow(f2, d2), E2 = g2; u2.cmp(x2) !== 0; ) {
        for (var _2 = u2, B = 0; _2.cmp(x2) !== 0; B++)
          _2 = _2.redSqr();
        i2(B < E2);
        var R2 = this.pow(v2, new o2(1).iushln(E2 - B - 1));
        k2 = k2.redMul(R2), v2 = R2.redSqr(), u2 = u2.redMul(v2), E2 = B;
      }
      return k2;
    }, Y.prototype.invm = function(f2) {
      var a2 = f2._invmp(this.m);
      return a2.negative !== 0 ? (a2.negative = 0, this.imod(a2).redNeg()) : this.imod(a2);
    }, Y.prototype.pow = function(f2, a2) {
      if (a2.isZero())
        return new o2(1).toRed(this);
      if (a2.cmpn(1) === 0)
        return f2.clone();
      var c2 = 4, d2 = new Array(1 << c2);
      d2[0] = new o2(1).toRed(this), d2[1] = f2;
      for (var g2 = 2; g2 < d2.length; g2++)
        d2[g2] = this.mul(d2[g2 - 1], f2);
      var x2 = d2[0], M2 = 0, l2 = 0, s2 = a2.bitLength() % 26;
      for (s2 === 0 && (s2 = 26), g2 = a2.length - 1; g2 >= 0; g2--) {
        for (var v2 = a2.words[g2], k2 = s2 - 1; k2 >= 0; k2--) {
          var u2 = v2 >> k2 & 1;
          if (x2 !== d2[0] && (x2 = this.sqr(x2)), u2 === 0 && M2 === 0) {
            l2 = 0;
            continue;
          }
          M2 <<= 1, M2 |= u2, l2++, !(l2 !== c2 && (g2 !== 0 || k2 !== 0)) && (x2 = this.mul(x2, d2[M2]), l2 = 0, M2 = 0);
        }
        s2 = 26;
      }
      return x2;
    }, Y.prototype.convertTo = function(f2) {
      var a2 = f2.umod(this.m);
      return a2 === f2 ? a2.clone() : a2;
    }, Y.prototype.convertFrom = function(f2) {
      var a2 = f2.clone();
      return a2.red = null, a2;
    }, o2.mont = function(f2) {
      return new Vt(f2);
    };
    function Vt(A2) {
      Y.call(this, A2), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new o2(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n3(Vt, Y), Vt.prototype.convertTo = function(f2) {
      return this.imod(f2.ushln(this.shift));
    }, Vt.prototype.convertFrom = function(f2) {
      var a2 = this.imod(f2.mul(this.rinv));
      return a2.red = null, a2;
    }, Vt.prototype.imul = function(f2, a2) {
      if (f2.isZero() || a2.isZero())
        return f2.words[0] = 0, f2.length = 1, f2;
      var c2 = f2.imul(a2), d2 = c2.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), g2 = c2.isub(d2).iushrn(this.shift), x2 = g2;
      return g2.cmp(this.m) >= 0 ? x2 = g2.isub(this.m) : g2.cmpn(0) < 0 && (x2 = g2.iadd(this.m)), x2._forceRed(this);
    }, Vt.prototype.mul = function(f2, a2) {
      if (f2.isZero() || a2.isZero())
        return new o2(0)._forceRed(this);
      var c2 = f2.mul(a2), d2 = c2.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), g2 = c2.isub(d2).iushrn(this.shift), x2 = g2;
      return g2.cmp(this.m) >= 0 ? x2 = g2.isub(this.m) : g2.cmpn(0) < 0 && (x2 = g2.iadd(this.m)), x2._forceRed(this);
    }, Vt.prototype.invm = function(f2) {
      var a2 = this.imod(f2._invmp(this.m).mul(this.r2));
      return a2._forceRed(this);
    };
  })(e2, On);
})(Ln);
var K = Ln.exports;
const jn = "bignumber/5.7.0";
var Rr = K.BN;
const Ae = new L$1(jn), wi = {}, Qn = 9007199254740991;
function C0(e2) {
  return e2 != null && (V$1.isBigNumber(e2) || typeof e2 == "number" && e2 % 1 === 0 || typeof e2 == "string" && !!e2.match(/^-?[0-9]+$/) || Qt(e2) || typeof e2 == "bigint" || ir(e2));
}
let Jn = false;
let V$1 = class V {
  constructor(t2, r2) {
    t2 !== wi && Ae.throwError("cannot call constructor directly; use BigNumber.from", L$1.errors.UNSUPPORTED_OPERATION, { operation: "new (BigNumber)" }), this._hex = r2, this._isBigNumber = true, Object.freeze(this);
  }
  fromTwos(t2) {
    return Lt(j$1(this).fromTwos(t2));
  }
  toTwos(t2) {
    return Lt(j$1(this).toTwos(t2));
  }
  abs() {
    return this._hex[0] === "-" ? V.from(this._hex.substring(1)) : this;
  }
  add(t2) {
    return Lt(j$1(this).add(j$1(t2)));
  }
  sub(t2) {
    return Lt(j$1(this).sub(j$1(t2)));
  }
  div(t2) {
    return V.from(t2).isZero() && Wt("division-by-zero", "div"), Lt(j$1(this).div(j$1(t2)));
  }
  mul(t2) {
    return Lt(j$1(this).mul(j$1(t2)));
  }
  mod(t2) {
    const r2 = j$1(t2);
    return r2.isNeg() && Wt("division-by-zero", "mod"), Lt(j$1(this).umod(r2));
  }
  pow(t2) {
    const r2 = j$1(t2);
    return r2.isNeg() && Wt("negative-power", "pow"), Lt(j$1(this).pow(r2));
  }
  and(t2) {
    const r2 = j$1(t2);
    return (this.isNegative() || r2.isNeg()) && Wt("unbound-bitwise-result", "and"), Lt(j$1(this).and(r2));
  }
  or(t2) {
    const r2 = j$1(t2);
    return (this.isNegative() || r2.isNeg()) && Wt("unbound-bitwise-result", "or"), Lt(j$1(this).or(r2));
  }
  xor(t2) {
    const r2 = j$1(t2);
    return (this.isNegative() || r2.isNeg()) && Wt("unbound-bitwise-result", "xor"), Lt(j$1(this).xor(r2));
  }
  mask(t2) {
    return (this.isNegative() || t2 < 0) && Wt("negative-width", "mask"), Lt(j$1(this).maskn(t2));
  }
  shl(t2) {
    return (this.isNegative() || t2 < 0) && Wt("negative-width", "shl"), Lt(j$1(this).shln(t2));
  }
  shr(t2) {
    return (this.isNegative() || t2 < 0) && Wt("negative-width", "shr"), Lt(j$1(this).shrn(t2));
  }
  eq(t2) {
    return j$1(this).eq(j$1(t2));
  }
  lt(t2) {
    return j$1(this).lt(j$1(t2));
  }
  lte(t2) {
    return j$1(this).lte(j$1(t2));
  }
  gt(t2) {
    return j$1(this).gt(j$1(t2));
  }
  gte(t2) {
    return j$1(this).gte(j$1(t2));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return j$1(this).isZero();
  }
  toNumber() {
    try {
      return j$1(this).toNumber();
    } catch {
      Wt("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch {
    }
    return Ae.throwError("this platform does not support BigInt", L$1.errors.UNSUPPORTED_OPERATION, { value: this.toString() });
  }
  toString() {
    return arguments.length > 0 && (arguments[0] === 10 ? Jn || (Jn = true, Ae.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : arguments[0] === 16 ? Ae.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", L$1.errors.UNEXPECTED_ARGUMENT, {}) : Ae.throwError("BigNumber.toString does not accept parameters", L$1.errors.UNEXPECTED_ARGUMENT, {})), j$1(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(t2) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(t2) {
    if (t2 instanceof V)
      return t2;
    if (typeof t2 == "string")
      return t2.match(/^-?0x[0-9a-f]+$/i) ? new V(wi, vr(t2)) : t2.match(/^-?[0-9]+$/) ? new V(wi, vr(new Rr(t2))) : Ae.throwArgumentError("invalid BigNumber string", "value", t2);
    if (typeof t2 == "number")
      return t2 % 1 && Wt("underflow", "BigNumber.from", t2), (t2 >= Qn || t2 <= -Qn) && Wt("overflow", "BigNumber.from", t2), V.from(String(t2));
    const r2 = t2;
    if (typeof r2 == "bigint")
      return V.from(r2.toString());
    if (ir(r2))
      return V.from(Kt(r2));
    if (r2)
      if (r2.toHexString) {
        const i2 = r2.toHexString();
        if (typeof i2 == "string")
          return V.from(i2);
      } else {
        let i2 = r2._hex;
        if (i2 == null && r2.type === "BigNumber" && (i2 = r2.hex), typeof i2 == "string" && (Qt(i2) || i2[0] === "-" && Qt(i2.substring(1))))
          return V.from(i2);
      }
    return Ae.throwArgumentError("invalid BigNumber value", "value", t2);
  }
  static isBigNumber(t2) {
    return !!(t2 && t2._isBigNumber);
  }
};
function vr(e2) {
  if (typeof e2 != "string")
    return vr(e2.toString(16));
  if (e2[0] === "-")
    return e2 = e2.substring(1), e2[0] === "-" && Ae.throwArgumentError("invalid hex", "value", e2), e2 = vr(e2), e2 === "0x00" ? e2 : "-" + e2;
  if (e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), e2 === "0x")
    return "0x00";
  for (e2.length % 2 && (e2 = "0x0" + e2.substring(2)); e2.length > 4 && e2.substring(0, 4) === "0x00"; )
    e2 = "0x" + e2.substring(4);
  return e2;
}
function Lt(e2) {
  return V$1.from(vr(e2));
}
function j$1(e2) {
  const t2 = V$1.from(e2).toHexString();
  return t2[0] === "-" ? new Rr("-" + t2.substring(3), 16) : new Rr(t2.substring(2), 16);
}
function Wt(e2, t2, r2) {
  const i2 = { fault: e2, operation: t2 };
  return r2 != null && (i2.value = r2), Ae.throwError(e2, L$1.errors.NUMERIC_FAULT, i2);
}
function R0(e2) {
  return new Rr(e2, 36).toString(16);
}
const Ht = new L$1(jn), mr = {}, Gn = V$1.from(0), Yn = V$1.from(-1);
function Vn(e2, t2, r2, i2) {
  const n3 = { fault: t2, operation: r2 };
  return i2 !== void 0 && (n3.value = i2), Ht.throwError(e2, L$1.errors.NUMERIC_FAULT, n3);
}
let gr = "0";
for (; gr.length < 256; )
  gr += gr;
function xi(e2) {
  if (typeof e2 != "number")
    try {
      e2 = V$1.from(e2).toNumber();
    } catch {
    }
  return typeof e2 == "number" && e2 >= 0 && e2 <= 256 && !(e2 % 1) ? "1" + gr.substring(0, e2) : Ht.throwArgumentError("invalid decimal size", "decimals", e2);
}
function Mi(e2, t2) {
  t2 == null && (t2 = 0);
  const r2 = xi(t2);
  e2 = V$1.from(e2);
  const i2 = e2.lt(Gn);
  i2 && (e2 = e2.mul(Yn));
  let n3 = e2.mod(r2).toString();
  for (; n3.length < r2.length - 1; )
    n3 = "0" + n3;
  n3 = n3.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const o2 = e2.div(r2).toString();
  return r2.length === 1 ? e2 = o2 : e2 = o2 + "." + n3, i2 && (e2 = "-" + e2), e2;
}
function be(e2, t2) {
  t2 == null && (t2 = 0);
  const r2 = xi(t2);
  (typeof e2 != "string" || !e2.match(/^-?[0-9.]+$/)) && Ht.throwArgumentError("invalid decimal value", "value", e2);
  const i2 = e2.substring(0, 1) === "-";
  i2 && (e2 = e2.substring(1)), e2 === "." && Ht.throwArgumentError("missing value", "value", e2);
  const n3 = e2.split(".");
  n3.length > 2 && Ht.throwArgumentError("too many decimal points", "value", e2);
  let o2 = n3[0], h2 = n3[1];
  for (o2 || (o2 = "0"), h2 || (h2 = "0"); h2[h2.length - 1] === "0"; )
    h2 = h2.substring(0, h2.length - 1);
  for (h2.length > r2.length - 1 && Vn("fractional component exceeds decimals", "underflow", "parseFixed"), h2 === "" && (h2 = "0"); h2.length < r2.length - 1; )
    h2 += "0";
  const p2 = V$1.from(o2), b2 = V$1.from(h2);
  let m2 = p2.mul(r2).add(b2);
  return i2 && (m2 = m2.mul(Yn)), m2;
}
class dr {
  constructor(t2, r2, i2, n3) {
    t2 !== mr && Ht.throwError("cannot use FixedFormat constructor; use FixedFormat.from", L$1.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.signed = r2, this.width = i2, this.decimals = n3, this.name = (r2 ? "" : "u") + "fixed" + String(i2) + "x" + String(n3), this._multiplier = xi(n3), Object.freeze(this);
  }
  static from(t2) {
    if (t2 instanceof dr)
      return t2;
    typeof t2 == "number" && (t2 = `fixed128x${t2}`);
    let r2 = true, i2 = 128, n3 = 18;
    if (typeof t2 == "string") {
      if (t2 !== "fixed")
        if (t2 === "ufixed")
          r2 = false;
        else {
          const o2 = t2.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
          o2 || Ht.throwArgumentError("invalid fixed format", "format", t2), r2 = o2[1] !== "u", i2 = parseInt(o2[2]), n3 = parseInt(o2[3]);
        }
    } else if (t2) {
      const o2 = (h2, p2, b2) => t2[h2] == null ? b2 : (typeof t2[h2] !== p2 && Ht.throwArgumentError("invalid fixed format (" + h2 + " not " + p2 + ")", "format." + h2, t2[h2]), t2[h2]);
      r2 = o2("signed", "boolean", r2), i2 = o2("width", "number", i2), n3 = o2("decimals", "number", n3);
    }
    return i2 % 8 && Ht.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", i2), n3 > 80 && Ht.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", n3), new dr(mr, r2, i2, n3);
  }
}
class Ut {
  constructor(t2, r2, i2, n3) {
    t2 !== mr && Ht.throwError("cannot use FixedNumber constructor; use FixedNumber.from", L$1.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.format = n3, this._hex = r2, this._value = i2, this._isFixedNumber = true, Object.freeze(this);
  }
  _checkFormat(t2) {
    this.format.name !== t2.format.name && Ht.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", t2);
  }
  addUnsafe(t2) {
    this._checkFormat(t2);
    const r2 = be(this._value, this.format.decimals), i2 = be(t2._value, t2.format.decimals);
    return Ut.fromValue(r2.add(i2), this.format.decimals, this.format);
  }
  subUnsafe(t2) {
    this._checkFormat(t2);
    const r2 = be(this._value, this.format.decimals), i2 = be(t2._value, t2.format.decimals);
    return Ut.fromValue(r2.sub(i2), this.format.decimals, this.format);
  }
  mulUnsafe(t2) {
    this._checkFormat(t2);
    const r2 = be(this._value, this.format.decimals), i2 = be(t2._value, t2.format.decimals);
    return Ut.fromValue(r2.mul(i2).div(this.format._multiplier), this.format.decimals, this.format);
  }
  divUnsafe(t2) {
    this._checkFormat(t2);
    const r2 = be(this._value, this.format.decimals), i2 = be(t2._value, t2.format.decimals);
    return Ut.fromValue(r2.mul(this.format._multiplier).div(i2), this.format.decimals, this.format);
  }
  floor() {
    const t2 = this.toString().split(".");
    t2.length === 1 && t2.push("0");
    let r2 = Ut.from(t2[0], this.format);
    const i2 = !t2[1].match(/^(0*)$/);
    return this.isNegative() && i2 && (r2 = r2.subUnsafe(Wn.toFormat(r2.format))), r2;
  }
  ceiling() {
    const t2 = this.toString().split(".");
    t2.length === 1 && t2.push("0");
    let r2 = Ut.from(t2[0], this.format);
    const i2 = !t2[1].match(/^(0*)$/);
    return !this.isNegative() && i2 && (r2 = r2.addUnsafe(Wn.toFormat(r2.format))), r2;
  }
  round(t2) {
    t2 == null && (t2 = 0);
    const r2 = this.toString().split(".");
    if (r2.length === 1 && r2.push("0"), (t2 < 0 || t2 > 80 || t2 % 1) && Ht.throwArgumentError("invalid decimal count", "decimals", t2), r2[1].length <= t2)
      return this;
    const i2 = Ut.from("1" + gr.substring(0, t2), this.format), n3 = O0.toFormat(this.format);
    return this.mulUnsafe(i2).addUnsafe(n3).floor().divUnsafe(i2);
  }
  isZero() {
    return this._value === "0.0" || this._value === "0";
  }
  isNegative() {
    return this._value[0] === "-";
  }
  toString() {
    return this._value;
  }
  toHexString(t2) {
    if (t2 == null)
      return this._hex;
    t2 % 8 && Ht.throwArgumentError("invalid byte width", "width", t2);
    const r2 = V$1.from(this._hex).fromTwos(this.format.width).toTwos(t2).toHexString();
    return oe(r2, t2 / 8);
  }
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  toFormat(t2) {
    return Ut.fromString(this._value, t2);
  }
  static fromValue(t2, r2, i2) {
    return i2 == null && r2 != null && !C0(r2) && (i2 = r2, r2 = null), r2 == null && (r2 = 0), i2 == null && (i2 = "fixed"), Ut.fromString(Mi(t2, r2), dr.from(i2));
  }
  static fromString(t2, r2) {
    r2 == null && (r2 = "fixed");
    const i2 = dr.from(r2), n3 = be(t2, i2.decimals);
    !i2.signed && n3.lt(Gn) && Vn("unsigned value cannot be negative", "overflow", "value", t2);
    let o2 = null;
    i2.signed ? o2 = n3.toTwos(i2.width).toHexString() : (o2 = n3.toHexString(), o2 = oe(o2, i2.width / 8));
    const h2 = Mi(n3, i2.decimals);
    return new Ut(mr, o2, h2, i2);
  }
  static fromBytes(t2, r2) {
    r2 == null && (r2 = "fixed");
    const i2 = dr.from(r2);
    if (Ot(t2).length > i2.width / 8)
      throw new Error("overflow");
    let n3 = V$1.from(t2);
    i2.signed && (n3 = n3.fromTwos(i2.width));
    const o2 = n3.toTwos((i2.signed ? 0 : 1) + i2.width).toHexString(), h2 = Mi(n3, i2.decimals);
    return new Ut(mr, o2, h2, i2);
  }
  static from(t2, r2) {
    if (typeof t2 == "string")
      return Ut.fromString(t2, r2);
    if (ir(t2))
      return Ut.fromBytes(t2, r2);
    try {
      return Ut.fromValue(t2, 0, r2);
    } catch (i2) {
      if (i2.code !== L$1.errors.INVALID_ARGUMENT)
        throw i2;
    }
    return Ht.throwArgumentError("invalid FixedNumber value", "value", t2);
  }
  static isFixedNumber(t2) {
    return !!(t2 && t2._isFixedNumber);
  }
}
const Wn = Ut.from(1), O0 = Ut.from("0.5"), P0 = "strings/5.7.0", Xn = new L$1(P0);
var Or;
(function(e2) {
  e2.current = "", e2.NFC = "NFC", e2.NFD = "NFD", e2.NFKC = "NFKC", e2.NFKD = "NFKD";
})(Or || (Or = {}));
var nr;
(function(e2) {
  e2.UNEXPECTED_CONTINUE = "unexpected continuation byte", e2.BAD_PREFIX = "bad codepoint prefix", e2.OVERRUN = "string overrun", e2.MISSING_CONTINUE = "missing continuation byte", e2.OUT_OF_RANGE = "out of UTF-8 range", e2.UTF16_SURROGATE = "UTF-16 surrogate", e2.OVERLONG = "overlong representation";
})(nr || (nr = {}));
function Ei(e2, t2 = Or.current) {
  t2 != Or.current && (Xn.checkNormalize(), e2 = e2.normalize(t2));
  let r2 = [];
  for (let i2 = 0; i2 < e2.length; i2++) {
    const n3 = e2.charCodeAt(i2);
    if (n3 < 128)
      r2.push(n3);
    else if (n3 < 2048)
      r2.push(n3 >> 6 | 192), r2.push(n3 & 63 | 128);
    else if ((n3 & 64512) == 55296) {
      i2++;
      const o2 = e2.charCodeAt(i2);
      if (i2 >= e2.length || (o2 & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const h2 = 65536 + ((n3 & 1023) << 10) + (o2 & 1023);
      r2.push(h2 >> 18 | 240), r2.push(h2 >> 12 & 63 | 128), r2.push(h2 >> 6 & 63 | 128), r2.push(h2 & 63 | 128);
    } else
      r2.push(n3 >> 12 | 224), r2.push(n3 >> 6 & 63 | 128), r2.push(n3 & 63 | 128);
  }
  return Ot(r2);
}
function T0(e2) {
  if (e2.length % 4 !== 0)
    throw new Error("bad data");
  let t2 = [];
  for (let r2 = 0; r2 < e2.length; r2 += 4)
    t2.push(parseInt(e2.substring(r2, r2 + 4), 16));
  return t2;
}
function Si(e2, t2) {
  t2 || (t2 = function(n3) {
    return [parseInt(n3, 16)];
  });
  let r2 = 0, i2 = {};
  return e2.split(",").forEach((n3) => {
    let o2 = n3.split(":");
    r2 += parseInt(o2[0], 16), i2[r2] = t2(o2[1]);
  }), i2;
}
function $n(e2) {
  let t2 = 0;
  return e2.split(",").map((r2) => {
    let i2 = r2.split("-");
    i2.length === 1 ? i2[1] = "0" : i2[1] === "" && (i2[1] = "1");
    let n3 = t2 + parseInt(i2[0], 16);
    return t2 = parseInt(i2[1], 16), { l: n3, h: t2 };
  });
}
$n("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"), "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((e2) => parseInt(e2, 16)), Si("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"), Si("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"), Si("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", T0), $n("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
function U0(e2) {
  e2 = atob(e2);
  const t2 = [];
  for (let r2 = 0; r2 < e2.length; r2++)
    t2.push(e2.charCodeAt(r2));
  return Ot(t2);
}
function ef(e2, t2) {
  t2 == null && (t2 = 1);
  const r2 = [], i2 = r2.forEach, n3 = function(o2, h2) {
    i2.call(o2, function(p2) {
      h2 > 0 && Array.isArray(p2) ? n3(p2, h2 - 1) : r2.push(p2);
    });
  };
  return n3(e2, t2), r2;
}
function k0(e2) {
  const t2 = {};
  for (let r2 = 0; r2 < e2.length; r2++) {
    const i2 = e2[r2];
    t2[i2[0]] = i2[1];
  }
  return t2;
}
function q0(e2) {
  let t2 = 0;
  function r2() {
    return e2[t2++] << 8 | e2[t2++];
  }
  let i2 = r2(), n3 = 1, o2 = [0, 1];
  for (let H2 = 1; H2 < i2; H2++)
    o2.push(n3 += r2());
  let h2 = r2(), p2 = t2;
  t2 += h2;
  let b2 = 0, m2 = 0;
  function w2() {
    return b2 == 0 && (m2 = m2 << 8 | e2[t2++], b2 = 8), m2 >> --b2 & 1;
  }
  const y2 = 31, S2 = Math.pow(2, y2), I2 = S2 >>> 1, N2 = I2 >> 1, C2 = S2 - 1;
  let F = 0;
  for (let H2 = 0; H2 < y2; H2++)
    F = F << 1 | w2();
  let U = [], J = 0, Bt = S2;
  for (; ; ) {
    let H2 = Math.floor(((F - J + 1) * n3 - 1) / Bt), z = 0, Pt = i2;
    for (; Pt - z > 1; ) {
      let Yt = z + Pt >>> 1;
      H2 < o2[Yt] ? Pt = Yt : z = Yt;
    }
    if (z == 0)
      break;
    U.push(z);
    let W = J + Math.floor(Bt * o2[z] / n3), Rt = J + Math.floor(Bt * o2[z + 1] / n3) - 1;
    for (; !((W ^ Rt) & I2); )
      F = F << 1 & C2 | w2(), W = W << 1 & C2, Rt = Rt << 1 & C2 | 1;
    for (; W & ~Rt & N2; )
      F = F & I2 | F << 1 & C2 >>> 1 | w2(), W = W << 1 ^ I2, Rt = (Rt ^ I2) << 1 | I2 | 1;
    J = W, Bt = 1 + Rt - W;
  }
  let G = i2 - 4;
  return U.map((H2) => {
    switch (H2 - G) {
      case 3:
        return G + 65792 + (e2[p2++] << 16 | e2[p2++] << 8 | e2[p2++]);
      case 2:
        return G + 256 + (e2[p2++] << 8 | e2[p2++]);
      case 1:
        return G + e2[p2++];
      default:
        return H2 - 1;
    }
  });
}
function K0(e2) {
  let t2 = 0;
  return () => e2[t2++];
}
function H0(e2) {
  return K0(q0(e2));
}
function z0(e2) {
  return e2 & 1 ? ~e2 >> 1 : e2 >> 1;
}
function L0(e2, t2) {
  let r2 = Array(e2);
  for (let i2 = 0; i2 < e2; i2++)
    r2[i2] = 1 + t2();
  return r2;
}
function rf(e2, t2) {
  let r2 = Array(e2);
  for (let i2 = 0, n3 = -1; i2 < e2; i2++)
    r2[i2] = n3 += 1 + t2();
  return r2;
}
function j0(e2, t2) {
  let r2 = Array(e2);
  for (let i2 = 0, n3 = 0; i2 < e2; i2++)
    r2[i2] = n3 += z0(t2());
  return r2;
}
function Pr(e2, t2) {
  let r2 = rf(e2(), e2), i2 = e2(), n3 = rf(i2, e2), o2 = L0(i2, e2);
  for (let h2 = 0; h2 < i2; h2++)
    for (let p2 = 0; p2 < o2[h2]; p2++)
      r2.push(n3[h2] + p2);
  return t2 ? r2.map((h2) => t2[h2]) : r2;
}
function Q0(e2) {
  let t2 = [];
  for (; ; ) {
    let r2 = e2();
    if (r2 == 0)
      break;
    t2.push(G0(r2, e2));
  }
  for (; ; ) {
    let r2 = e2() - 1;
    if (r2 < 0)
      break;
    t2.push(Y0(r2, e2));
  }
  return k0(ef(t2));
}
function J0(e2) {
  let t2 = [];
  for (; ; ) {
    let r2 = e2();
    if (r2 == 0)
      break;
    t2.push(r2);
  }
  return t2;
}
function nf(e2, t2, r2) {
  let i2 = Array(e2).fill(void 0).map(() => []);
  for (let n3 = 0; n3 < t2; n3++)
    j0(e2, r2).forEach((o2, h2) => i2[h2].push(o2));
  return i2;
}
function G0(e2, t2) {
  let r2 = 1 + t2(), i2 = t2(), n3 = J0(t2), o2 = nf(n3.length, 1 + e2, t2);
  return ef(o2.map((h2, p2) => {
    const b2 = h2[0], m2 = h2.slice(1);
    return Array(n3[p2]).fill(void 0).map((w2, y2) => {
      let S2 = y2 * i2;
      return [b2 + y2 * r2, m2.map((I2) => I2 + S2)];
    });
  }));
}
function Y0(e2, t2) {
  let r2 = 1 + t2();
  return nf(r2, 1 + e2, t2).map((n3) => [n3[0], n3.slice(1)]);
}
function V0(e2) {
  let t2 = Pr(e2).sort((i2, n3) => i2 - n3);
  return r2();
  function r2() {
    let i2 = [];
    for (; ; ) {
      let m2 = Pr(e2, t2);
      if (m2.length == 0)
        break;
      i2.push({ set: new Set(m2), node: r2() });
    }
    i2.sort((m2, w2) => w2.set.size - m2.set.size);
    let n3 = e2(), o2 = n3 % 3;
    n3 = n3 / 3 | 0;
    let h2 = !!(n3 & 1);
    n3 >>= 1;
    let p2 = n3 == 1, b2 = n3 == 2;
    return { branches: i2, valid: o2, fe0f: h2, save: p2, check: b2 };
  }
}
function W0() {
  return H0(U0("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"));
}
const Dr = W0();
new Set(Pr(Dr)), new Set(Pr(Dr)), Q0(Dr), V0(Dr);
const X0 = new Uint8Array(32);
X0.fill(0);
const Z0 = `Ethereum Signed Message:
`;
function ff(e2) {
  return typeof e2 == "string" && (e2 = Ei(e2)), yi(E0([Ei(Z0), Ei(String(e2.length)), e2]));
}
const ts = "address/5.7.0", Ar = new L$1(ts);
function of(e2) {
  Qt(e2, 20) || Ar.throwArgumentError("invalid address", "address", e2), e2 = e2.toLowerCase();
  const t2 = e2.substring(2).split(""), r2 = new Uint8Array(40);
  for (let n3 = 0; n3 < 40; n3++)
    r2[n3] = t2[n3].charCodeAt(0);
  const i2 = Ot(yi(r2));
  for (let n3 = 0; n3 < 40; n3 += 2)
    i2[n3 >> 1] >> 4 >= 8 && (t2[n3] = t2[n3].toUpperCase()), (i2[n3 >> 1] & 15) >= 8 && (t2[n3 + 1] = t2[n3 + 1].toUpperCase());
  return "0x" + t2.join("");
}
const es = 9007199254740991;
function rs(e2) {
  return Math.log10 ? Math.log10(e2) : Math.log(e2) / Math.LN10;
}
const Ni = {};
for (let e2 = 0; e2 < 10; e2++)
  Ni[String(e2)] = String(e2);
for (let e2 = 0; e2 < 26; e2++)
  Ni[String.fromCharCode(65 + e2)] = String(10 + e2);
const sf = Math.floor(rs(es));
function is(e2) {
  e2 = e2.toUpperCase(), e2 = e2.substring(4) + e2.substring(0, 2) + "00";
  let t2 = e2.split("").map((i2) => Ni[i2]).join("");
  for (; t2.length >= sf; ) {
    let i2 = t2.substring(0, sf);
    t2 = parseInt(i2, 10) % 97 + t2.substring(i2.length);
  }
  let r2 = String(98 - parseInt(t2, 10) % 97);
  for (; r2.length < 2; )
    r2 = "0" + r2;
  return r2;
}
function ns(e2) {
  let t2 = null;
  if (typeof e2 != "string" && Ar.throwArgumentError("invalid address", "address", e2), e2.match(/^(0x)?[0-9a-fA-F]{40}$/))
    e2.substring(0, 2) !== "0x" && (e2 = "0x" + e2), t2 = of(e2), e2.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t2 !== e2 && Ar.throwArgumentError("bad address checksum", "address", e2);
  else if (e2.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (e2.substring(2, 4) !== is(e2) && Ar.throwArgumentError("bad icap checksum", "address", e2), t2 = R0(e2.substring(4)); t2.length < 40; )
      t2 = "0" + t2;
    t2 = of("0x" + t2);
  } else
    Ar.throwArgumentError("invalid address", "address", e2);
  return t2;
}
function br(e2, t2, r2) {
  Object.defineProperty(e2, t2, { enumerable: true, value: r2, writable: false });
}
const os = new Uint8Array(32);
os.fill(0), V$1.from(-1);
const ss = V$1.from(0), as = V$1.from(1);
V$1.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), oe(as.toHexString(), 32), oe(ss.toHexString(), 32);
var se = {}, Q = {}, yr = af;
function af(e2, t2) {
  if (!e2)
    throw new Error(t2 || "Assertion failed");
}
af.equal = function(t2, r2, i2) {
  if (t2 != r2)
    throw new Error(i2 || "Assertion failed: " + t2 + " != " + r2);
};
var Ii = { exports: {} };
typeof Object.create == "function" ? Ii.exports = function(t2, r2) {
  r2 && (t2.super_ = r2, t2.prototype = Object.create(r2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } }));
} : Ii.exports = function(t2, r2) {
  if (r2) {
    t2.super_ = r2;
    var i2 = function() {
    };
    i2.prototype = r2.prototype, t2.prototype = new i2(), t2.prototype.constructor = t2;
  }
};
var us = yr, hs = Ii.exports;
Q.inherits = hs;
function cs(e2, t2) {
  return (e2.charCodeAt(t2) & 64512) !== 55296 || t2 < 0 || t2 + 1 >= e2.length ? false : (e2.charCodeAt(t2 + 1) & 64512) === 56320;
}
function ls(e2, t2) {
  if (Array.isArray(e2))
    return e2.slice();
  if (!e2)
    return [];
  var r2 = [];
  if (typeof e2 == "string")
    if (t2) {
      if (t2 === "hex")
        for (e2 = e2.replace(/[^a-z0-9]+/ig, ""), e2.length % 2 !== 0 && (e2 = "0" + e2), n3 = 0; n3 < e2.length; n3 += 2)
          r2.push(parseInt(e2[n3] + e2[n3 + 1], 16));
    } else
      for (var i2 = 0, n3 = 0; n3 < e2.length; n3++) {
        var o2 = e2.charCodeAt(n3);
        o2 < 128 ? r2[i2++] = o2 : o2 < 2048 ? (r2[i2++] = o2 >> 6 | 192, r2[i2++] = o2 & 63 | 128) : cs(e2, n3) ? (o2 = 65536 + ((o2 & 1023) << 10) + (e2.charCodeAt(++n3) & 1023), r2[i2++] = o2 >> 18 | 240, r2[i2++] = o2 >> 12 & 63 | 128, r2[i2++] = o2 >> 6 & 63 | 128, r2[i2++] = o2 & 63 | 128) : (r2[i2++] = o2 >> 12 | 224, r2[i2++] = o2 >> 6 & 63 | 128, r2[i2++] = o2 & 63 | 128);
      }
  else
    for (n3 = 0; n3 < e2.length; n3++)
      r2[n3] = e2[n3] | 0;
  return r2;
}
Q.toArray = ls;
function ds(e2) {
  for (var t2 = "", r2 = 0; r2 < e2.length; r2++)
    t2 += hf(e2[r2].toString(16));
  return t2;
}
Q.toHex = ds;
function uf(e2) {
  var t2 = e2 >>> 24 | e2 >>> 8 & 65280 | e2 << 8 & 16711680 | (e2 & 255) << 24;
  return t2 >>> 0;
}
Q.htonl = uf;
function ps(e2, t2) {
  for (var r2 = "", i2 = 0; i2 < e2.length; i2++) {
    var n3 = e2[i2];
    t2 === "little" && (n3 = uf(n3)), r2 += cf(n3.toString(16));
  }
  return r2;
}
Q.toHex32 = ps;
function hf(e2) {
  return e2.length === 1 ? "0" + e2 : e2;
}
Q.zero2 = hf;
function cf(e2) {
  return e2.length === 7 ? "0" + e2 : e2.length === 6 ? "00" + e2 : e2.length === 5 ? "000" + e2 : e2.length === 4 ? "0000" + e2 : e2.length === 3 ? "00000" + e2 : e2.length === 2 ? "000000" + e2 : e2.length === 1 ? "0000000" + e2 : e2;
}
Q.zero8 = cf;
function vs(e2, t2, r2, i2) {
  var n3 = r2 - t2;
  us(n3 % 4 === 0);
  for (var o2 = new Array(n3 / 4), h2 = 0, p2 = t2; h2 < o2.length; h2++, p2 += 4) {
    var b2;
    i2 === "big" ? b2 = e2[p2] << 24 | e2[p2 + 1] << 16 | e2[p2 + 2] << 8 | e2[p2 + 3] : b2 = e2[p2 + 3] << 24 | e2[p2 + 2] << 16 | e2[p2 + 1] << 8 | e2[p2], o2[h2] = b2 >>> 0;
  }
  return o2;
}
Q.join32 = vs;
function ms(e2, t2) {
  for (var r2 = new Array(e2.length * 4), i2 = 0, n3 = 0; i2 < e2.length; i2++, n3 += 4) {
    var o2 = e2[i2];
    t2 === "big" ? (r2[n3] = o2 >>> 24, r2[n3 + 1] = o2 >>> 16 & 255, r2[n3 + 2] = o2 >>> 8 & 255, r2[n3 + 3] = o2 & 255) : (r2[n3 + 3] = o2 >>> 24, r2[n3 + 2] = o2 >>> 16 & 255, r2[n3 + 1] = o2 >>> 8 & 255, r2[n3] = o2 & 255);
  }
  return r2;
}
Q.split32 = ms;
function gs(e2, t2) {
  return e2 >>> t2 | e2 << 32 - t2;
}
Q.rotr32 = gs;
function As(e2, t2) {
  return e2 << t2 | e2 >>> 32 - t2;
}
Q.rotl32 = As;
function bs(e2, t2) {
  return e2 + t2 >>> 0;
}
Q.sum32 = bs;
function ys(e2, t2, r2) {
  return e2 + t2 + r2 >>> 0;
}
Q.sum32_3 = ys;
function ws(e2, t2, r2, i2) {
  return e2 + t2 + r2 + i2 >>> 0;
}
Q.sum32_4 = ws;
function xs(e2, t2, r2, i2, n3) {
  return e2 + t2 + r2 + i2 + n3 >>> 0;
}
Q.sum32_5 = xs;
function Ms(e2, t2, r2, i2) {
  var n3 = e2[t2], o2 = e2[t2 + 1], h2 = i2 + o2 >>> 0, p2 = (h2 < i2 ? 1 : 0) + r2 + n3;
  e2[t2] = p2 >>> 0, e2[t2 + 1] = h2;
}
Q.sum64 = Ms;
function Es(e2, t2, r2, i2) {
  var n3 = t2 + i2 >>> 0, o2 = (n3 < t2 ? 1 : 0) + e2 + r2;
  return o2 >>> 0;
}
Q.sum64_hi = Es;
function Ss(e2, t2, r2, i2) {
  var n3 = t2 + i2;
  return n3 >>> 0;
}
Q.sum64_lo = Ss;
function Ns(e2, t2, r2, i2, n3, o2, h2, p2) {
  var b2 = 0, m2 = t2;
  m2 = m2 + i2 >>> 0, b2 += m2 < t2 ? 1 : 0, m2 = m2 + o2 >>> 0, b2 += m2 < o2 ? 1 : 0, m2 = m2 + p2 >>> 0, b2 += m2 < p2 ? 1 : 0;
  var w2 = e2 + r2 + n3 + h2 + b2;
  return w2 >>> 0;
}
Q.sum64_4_hi = Ns;
function Is(e2, t2, r2, i2, n3, o2, h2, p2) {
  var b2 = t2 + i2 + o2 + p2;
  return b2 >>> 0;
}
Q.sum64_4_lo = Is;
function _s(e2, t2, r2, i2, n3, o2, h2, p2, b2, m2) {
  var w2 = 0, y2 = t2;
  y2 = y2 + i2 >>> 0, w2 += y2 < t2 ? 1 : 0, y2 = y2 + o2 >>> 0, w2 += y2 < o2 ? 1 : 0, y2 = y2 + p2 >>> 0, w2 += y2 < p2 ? 1 : 0, y2 = y2 + m2 >>> 0, w2 += y2 < m2 ? 1 : 0;
  var S2 = e2 + r2 + n3 + h2 + b2 + w2;
  return S2 >>> 0;
}
Q.sum64_5_hi = _s;
function Bs(e2, t2, r2, i2, n3, o2, h2, p2, b2, m2) {
  var w2 = t2 + i2 + o2 + p2 + m2;
  return w2 >>> 0;
}
Q.sum64_5_lo = Bs;
function Cs(e2, t2, r2) {
  var i2 = t2 << 32 - r2 | e2 >>> r2;
  return i2 >>> 0;
}
Q.rotr64_hi = Cs;
function Rs(e2, t2, r2) {
  var i2 = e2 << 32 - r2 | t2 >>> r2;
  return i2 >>> 0;
}
Q.rotr64_lo = Rs;
function Os(e2, t2, r2) {
  return e2 >>> r2;
}
Q.shr64_hi = Os;
function Ps(e2, t2, r2) {
  var i2 = e2 << 32 - r2 | t2 >>> r2;
  return i2 >>> 0;
}
Q.shr64_lo = Ps;
var fr = {}, lf = Q, Ds = yr;
function Fr() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
fr.BlockHash = Fr, Fr.prototype.update = function(t2, r2) {
  if (t2 = lf.toArray(t2, r2), this.pending ? this.pending = this.pending.concat(t2) : this.pending = t2, this.pendingTotal += t2.length, this.pending.length >= this._delta8) {
    t2 = this.pending;
    var i2 = t2.length % this._delta8;
    this.pending = t2.slice(t2.length - i2, t2.length), this.pending.length === 0 && (this.pending = null), t2 = lf.join32(t2, 0, t2.length - i2, this.endian);
    for (var n3 = 0; n3 < t2.length; n3 += this._delta32)
      this._update(t2, n3, n3 + this._delta32);
  }
  return this;
}, Fr.prototype.digest = function(t2) {
  return this.update(this._pad()), Ds(this.pending === null), this._digest(t2);
}, Fr.prototype._pad = function() {
  var t2 = this.pendingTotal, r2 = this._delta8, i2 = r2 - (t2 + this.padLength) % r2, n3 = new Array(i2 + this.padLength);
  n3[0] = 128;
  for (var o2 = 1; o2 < i2; o2++)
    n3[o2] = 0;
  if (t2 <<= 3, this.endian === "big") {
    for (var h2 = 8; h2 < this.padLength; h2++)
      n3[o2++] = 0;
    n3[o2++] = 0, n3[o2++] = 0, n3[o2++] = 0, n3[o2++] = 0, n3[o2++] = t2 >>> 24 & 255, n3[o2++] = t2 >>> 16 & 255, n3[o2++] = t2 >>> 8 & 255, n3[o2++] = t2 & 255;
  } else
    for (n3[o2++] = t2 & 255, n3[o2++] = t2 >>> 8 & 255, n3[o2++] = t2 >>> 16 & 255, n3[o2++] = t2 >>> 24 & 255, n3[o2++] = 0, n3[o2++] = 0, n3[o2++] = 0, n3[o2++] = 0, h2 = 8; h2 < this.padLength; h2++)
      n3[o2++] = 0;
  return n3;
};
var or = {}, ae = {}, Fs = Q, ue = Fs.rotr32;
function Ts(e2, t2, r2, i2) {
  if (e2 === 0)
    return df(t2, r2, i2);
  if (e2 === 1 || e2 === 3)
    return vf(t2, r2, i2);
  if (e2 === 2)
    return pf(t2, r2, i2);
}
ae.ft_1 = Ts;
function df(e2, t2, r2) {
  return e2 & t2 ^ ~e2 & r2;
}
ae.ch32 = df;
function pf(e2, t2, r2) {
  return e2 & t2 ^ e2 & r2 ^ t2 & r2;
}
ae.maj32 = pf;
function vf(e2, t2, r2) {
  return e2 ^ t2 ^ r2;
}
ae.p32 = vf;
function Us(e2) {
  return ue(e2, 2) ^ ue(e2, 13) ^ ue(e2, 22);
}
ae.s0_256 = Us;
function ks(e2) {
  return ue(e2, 6) ^ ue(e2, 11) ^ ue(e2, 25);
}
ae.s1_256 = ks;
function qs(e2) {
  return ue(e2, 7) ^ ue(e2, 18) ^ e2 >>> 3;
}
ae.g0_256 = qs;
function Ks(e2) {
  return ue(e2, 17) ^ ue(e2, 19) ^ e2 >>> 10;
}
ae.g1_256 = Ks;
var sr = Q, Hs = fr, zs = ae, _i = sr.rotl32, wr = sr.sum32, Ls = sr.sum32_5, js = zs.ft_1, mf = Hs.BlockHash, Qs = [1518500249, 1859775393, 2400959708, 3395469782];
function he() {
  if (!(this instanceof he))
    return new he();
  mf.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80);
}
sr.inherits(he, mf);
var Js = he;
he.blockSize = 512, he.outSize = 160, he.hmacStrength = 80, he.padLength = 64, he.prototype._update = function(t2, r2) {
  for (var i2 = this.W, n3 = 0; n3 < 16; n3++)
    i2[n3] = t2[r2 + n3];
  for (; n3 < i2.length; n3++)
    i2[n3] = _i(i2[n3 - 3] ^ i2[n3 - 8] ^ i2[n3 - 14] ^ i2[n3 - 16], 1);
  var o2 = this.h[0], h2 = this.h[1], p2 = this.h[2], b2 = this.h[3], m2 = this.h[4];
  for (n3 = 0; n3 < i2.length; n3++) {
    var w2 = ~~(n3 / 20), y2 = Ls(_i(o2, 5), js(w2, h2, p2, b2), m2, i2[n3], Qs[w2]);
    m2 = b2, b2 = p2, p2 = _i(h2, 30), h2 = o2, o2 = y2;
  }
  this.h[0] = wr(this.h[0], o2), this.h[1] = wr(this.h[1], h2), this.h[2] = wr(this.h[2], p2), this.h[3] = wr(this.h[3], b2), this.h[4] = wr(this.h[4], m2);
}, he.prototype._digest = function(t2) {
  return t2 === "hex" ? sr.toHex32(this.h, "big") : sr.split32(this.h, "big");
};
var ar = Q, Gs = fr, ur = ae, Ys = yr, ie = ar.sum32, Vs = ar.sum32_4, Ws = ar.sum32_5, Xs = ur.ch32, Zs = ur.maj32, $s = ur.s0_256, ta = ur.s1_256, ea = ur.g0_256, ra = ur.g1_256, gf = Gs.BlockHash, ia = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
function ce() {
  if (!(this instanceof ce))
    return new ce();
  gf.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = ia, this.W = new Array(64);
}
ar.inherits(ce, gf);
var Af = ce;
ce.blockSize = 512, ce.outSize = 256, ce.hmacStrength = 192, ce.padLength = 64, ce.prototype._update = function(t2, r2) {
  for (var i2 = this.W, n3 = 0; n3 < 16; n3++)
    i2[n3] = t2[r2 + n3];
  for (; n3 < i2.length; n3++)
    i2[n3] = Vs(ra(i2[n3 - 2]), i2[n3 - 7], ea(i2[n3 - 15]), i2[n3 - 16]);
  var o2 = this.h[0], h2 = this.h[1], p2 = this.h[2], b2 = this.h[3], m2 = this.h[4], w2 = this.h[5], y2 = this.h[6], S2 = this.h[7];
  for (Ys(this.k.length === i2.length), n3 = 0; n3 < i2.length; n3++) {
    var I2 = Ws(S2, ta(m2), Xs(m2, w2, y2), this.k[n3], i2[n3]), N2 = ie($s(o2), Zs(o2, h2, p2));
    S2 = y2, y2 = w2, w2 = m2, m2 = ie(b2, I2), b2 = p2, p2 = h2, h2 = o2, o2 = ie(I2, N2);
  }
  this.h[0] = ie(this.h[0], o2), this.h[1] = ie(this.h[1], h2), this.h[2] = ie(this.h[2], p2), this.h[3] = ie(this.h[3], b2), this.h[4] = ie(this.h[4], m2), this.h[5] = ie(this.h[5], w2), this.h[6] = ie(this.h[6], y2), this.h[7] = ie(this.h[7], S2);
}, ce.prototype._digest = function(t2) {
  return t2 === "hex" ? ar.toHex32(this.h, "big") : ar.split32(this.h, "big");
};
var Bi = Q, bf = Af;
function ye() {
  if (!(this instanceof ye))
    return new ye();
  bf.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
}
Bi.inherits(ye, bf);
var na = ye;
ye.blockSize = 512, ye.outSize = 224, ye.hmacStrength = 192, ye.padLength = 64, ye.prototype._digest = function(t2) {
  return t2 === "hex" ? Bi.toHex32(this.h.slice(0, 7), "big") : Bi.split32(this.h.slice(0, 7), "big");
};
var jt = Q, fa = fr, oa = yr, le = jt.rotr64_hi, de = jt.rotr64_lo, yf = jt.shr64_hi, wf = jt.shr64_lo, Be = jt.sum64, Ci = jt.sum64_hi, Ri = jt.sum64_lo, sa = jt.sum64_4_hi, aa = jt.sum64_4_lo, ua = jt.sum64_5_hi, ha = jt.sum64_5_lo, xf = fa.BlockHash, ca = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
function ne() {
  if (!(this instanceof ne))
    return new ne();
  xf.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = ca, this.W = new Array(160);
}
jt.inherits(ne, xf);
var Mf = ne;
ne.blockSize = 1024, ne.outSize = 512, ne.hmacStrength = 192, ne.padLength = 128, ne.prototype._prepareBlock = function(t2, r2) {
  for (var i2 = this.W, n3 = 0; n3 < 32; n3++)
    i2[n3] = t2[r2 + n3];
  for (; n3 < i2.length; n3 += 2) {
    var o2 = xa(i2[n3 - 4], i2[n3 - 3]), h2 = Ma(i2[n3 - 4], i2[n3 - 3]), p2 = i2[n3 - 14], b2 = i2[n3 - 13], m2 = ya(i2[n3 - 30], i2[n3 - 29]), w2 = wa(i2[n3 - 30], i2[n3 - 29]), y2 = i2[n3 - 32], S2 = i2[n3 - 31];
    i2[n3] = sa(o2, h2, p2, b2, m2, w2, y2, S2), i2[n3 + 1] = aa(o2, h2, p2, b2, m2, w2, y2, S2);
  }
}, ne.prototype._update = function(t2, r2) {
  this._prepareBlock(t2, r2);
  var i2 = this.W, n3 = this.h[0], o2 = this.h[1], h2 = this.h[2], p2 = this.h[3], b2 = this.h[4], m2 = this.h[5], w2 = this.h[6], y2 = this.h[7], S2 = this.h[8], I2 = this.h[9], N2 = this.h[10], C2 = this.h[11], F = this.h[12], U = this.h[13], J = this.h[14], Bt = this.h[15];
  oa(this.k.length === i2.length);
  for (var G = 0; G < i2.length; G += 2) {
    var H2 = J, z = Bt, Pt = Aa(S2, I2), W = ba(S2, I2), Rt = la(S2, I2, N2, C2, F), Yt = da(S2, I2, N2, C2, F, U), Y = this.k[G], Vt = this.k[G + 1], A2 = i2[G], f2 = i2[G + 1], a2 = ua(H2, z, Pt, W, Rt, Yt, Y, Vt, A2, f2), c2 = ha(H2, z, Pt, W, Rt, Yt, Y, Vt, A2, f2);
    H2 = ma(n3, o2), z = ga(n3, o2), Pt = pa(n3, o2, h2, p2, b2), W = va(n3, o2, h2, p2, b2, m2);
    var d2 = Ci(H2, z, Pt, W), g2 = Ri(H2, z, Pt, W);
    J = F, Bt = U, F = N2, U = C2, N2 = S2, C2 = I2, S2 = Ci(w2, y2, a2, c2), I2 = Ri(y2, y2, a2, c2), w2 = b2, y2 = m2, b2 = h2, m2 = p2, h2 = n3, p2 = o2, n3 = Ci(a2, c2, d2, g2), o2 = Ri(a2, c2, d2, g2);
  }
  Be(this.h, 0, n3, o2), Be(this.h, 2, h2, p2), Be(this.h, 4, b2, m2), Be(this.h, 6, w2, y2), Be(this.h, 8, S2, I2), Be(this.h, 10, N2, C2), Be(this.h, 12, F, U), Be(this.h, 14, J, Bt);
}, ne.prototype._digest = function(t2) {
  return t2 === "hex" ? jt.toHex32(this.h, "big") : jt.split32(this.h, "big");
};
function la(e2, t2, r2, i2, n3) {
  var o2 = e2 & r2 ^ ~e2 & n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function da(e2, t2, r2, i2, n3, o2) {
  var h2 = t2 & i2 ^ ~t2 & o2;
  return h2 < 0 && (h2 += 4294967296), h2;
}
function pa(e2, t2, r2, i2, n3) {
  var o2 = e2 & r2 ^ e2 & n3 ^ r2 & n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function va(e2, t2, r2, i2, n3, o2) {
  var h2 = t2 & i2 ^ t2 & o2 ^ i2 & o2;
  return h2 < 0 && (h2 += 4294967296), h2;
}
function ma(e2, t2) {
  var r2 = le(e2, t2, 28), i2 = le(t2, e2, 2), n3 = le(t2, e2, 7), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function ga(e2, t2) {
  var r2 = de(e2, t2, 28), i2 = de(t2, e2, 2), n3 = de(t2, e2, 7), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Aa(e2, t2) {
  var r2 = le(e2, t2, 14), i2 = le(e2, t2, 18), n3 = le(t2, e2, 9), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function ba(e2, t2) {
  var r2 = de(e2, t2, 14), i2 = de(e2, t2, 18), n3 = de(t2, e2, 9), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function ya(e2, t2) {
  var r2 = le(e2, t2, 1), i2 = le(e2, t2, 8), n3 = yf(e2, t2, 7), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function wa(e2, t2) {
  var r2 = de(e2, t2, 1), i2 = de(e2, t2, 8), n3 = wf(e2, t2, 7), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function xa(e2, t2) {
  var r2 = le(e2, t2, 19), i2 = le(t2, e2, 29), n3 = yf(e2, t2, 6), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Ma(e2, t2) {
  var r2 = de(e2, t2, 19), i2 = de(t2, e2, 29), n3 = wf(e2, t2, 6), o2 = r2 ^ i2 ^ n3;
  return o2 < 0 && (o2 += 4294967296), o2;
}
var Oi = Q, Ef = Mf;
function we() {
  if (!(this instanceof we))
    return new we();
  Ef.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
}
Oi.inherits(we, Ef);
var Ea = we;
we.blockSize = 1024, we.outSize = 384, we.hmacStrength = 192, we.padLength = 128, we.prototype._digest = function(t2) {
  return t2 === "hex" ? Oi.toHex32(this.h.slice(0, 12), "big") : Oi.split32(this.h.slice(0, 12), "big");
}, or.sha1 = Js, or.sha224 = na, or.sha256 = Af, or.sha384 = Ea, or.sha512 = Mf;
var Sf = {}, Xe = Q, Sa = fr, Tr = Xe.rotl32, Nf = Xe.sum32, xr = Xe.sum32_3, If = Xe.sum32_4, _f = Sa.BlockHash;
function pe() {
  if (!(this instanceof pe))
    return new pe();
  _f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Xe.inherits(pe, _f), Sf.ripemd160 = pe, pe.blockSize = 512, pe.outSize = 160, pe.hmacStrength = 192, pe.padLength = 64, pe.prototype._update = function(t2, r2) {
  for (var i2 = this.h[0], n3 = this.h[1], o2 = this.h[2], h2 = this.h[3], p2 = this.h[4], b2 = i2, m2 = n3, w2 = o2, y2 = h2, S2 = p2, I2 = 0; I2 < 80; I2++) {
    var N2 = Nf(Tr(If(i2, Bf(I2, n3, o2, h2), t2[_a[I2] + r2], Na(I2)), Ca[I2]), p2);
    i2 = p2, p2 = h2, h2 = Tr(o2, 10), o2 = n3, n3 = N2, N2 = Nf(Tr(If(b2, Bf(79 - I2, m2, w2, y2), t2[Ba[I2] + r2], Ia(I2)), Ra[I2]), S2), b2 = S2, S2 = y2, y2 = Tr(w2, 10), w2 = m2, m2 = N2;
  }
  N2 = xr(this.h[1], o2, y2), this.h[1] = xr(this.h[2], h2, S2), this.h[2] = xr(this.h[3], p2, b2), this.h[3] = xr(this.h[4], i2, m2), this.h[4] = xr(this.h[0], n3, w2), this.h[0] = N2;
}, pe.prototype._digest = function(t2) {
  return t2 === "hex" ? Xe.toHex32(this.h, "little") : Xe.split32(this.h, "little");
};
function Bf(e2, t2, r2, i2) {
  return e2 <= 15 ? t2 ^ r2 ^ i2 : e2 <= 31 ? t2 & r2 | ~t2 & i2 : e2 <= 47 ? (t2 | ~r2) ^ i2 : e2 <= 63 ? t2 & i2 | r2 & ~i2 : t2 ^ (r2 | ~i2);
}
function Na(e2) {
  return e2 <= 15 ? 0 : e2 <= 31 ? 1518500249 : e2 <= 47 ? 1859775393 : e2 <= 63 ? 2400959708 : 2840853838;
}
function Ia(e2) {
  return e2 <= 15 ? 1352829926 : e2 <= 31 ? 1548603684 : e2 <= 47 ? 1836072691 : e2 <= 63 ? 2053994217 : 0;
}
var _a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], Ba = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], Ca = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], Ra = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11], Oa = Q, Pa = yr;
function hr(e2, t2, r2) {
  if (!(this instanceof hr))
    return new hr(e2, t2, r2);
  this.Hash = e2, this.blockSize = e2.blockSize / 8, this.outSize = e2.outSize / 8, this.inner = null, this.outer = null, this._init(Oa.toArray(t2, r2));
}
var Da = hr;
hr.prototype._init = function(t2) {
  t2.length > this.blockSize && (t2 = new this.Hash().update(t2).digest()), Pa(t2.length <= this.blockSize);
  for (var r2 = t2.length; r2 < this.blockSize; r2++)
    t2.push(0);
  for (r2 = 0; r2 < t2.length; r2++)
    t2[r2] ^= 54;
  for (this.inner = new this.Hash().update(t2), r2 = 0; r2 < t2.length; r2++)
    t2[r2] ^= 106;
  this.outer = new this.Hash().update(t2);
}, hr.prototype.update = function(t2, r2) {
  return this.inner.update(t2, r2), this;
}, hr.prototype.digest = function(t2) {
  return this.outer.update(this.inner.digest()), this.outer.digest(t2);
}, function(e2) {
  var t2 = e2;
  t2.utils = Q, t2.common = fr, t2.sha = or, t2.ripemd = Sf, t2.hmac = Da, t2.sha1 = t2.sha.sha1, t2.sha256 = t2.sha.sha256, t2.sha224 = t2.sha.sha224, t2.sha384 = t2.sha.sha384, t2.sha512 = t2.sha.sha512, t2.ripemd160 = t2.ripemd.ripemd160;
}(se);
function cr(e2, t2, r2) {
  return r2 = { path: t2, exports: {}, require: function(i2, n3) {
    return Fa(i2, n3 ?? r2.path);
  } }, e2(r2, r2.exports), r2.exports;
}
function Fa() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var Pi = Cf;
function Cf(e2, t2) {
  if (!e2)
    throw new Error(t2 || "Assertion failed");
}
Cf.equal = function(t2, r2, i2) {
  if (t2 != r2)
    throw new Error(i2 || "Assertion failed: " + t2 + " != " + r2);
};
var fe = cr(function(e2, t2) {
  var r2 = t2;
  function i2(h2, p2) {
    if (Array.isArray(h2))
      return h2.slice();
    if (!h2)
      return [];
    var b2 = [];
    if (typeof h2 != "string") {
      for (var m2 = 0; m2 < h2.length; m2++)
        b2[m2] = h2[m2] | 0;
      return b2;
    }
    if (p2 === "hex") {
      h2 = h2.replace(/[^a-z0-9]+/ig, ""), h2.length % 2 !== 0 && (h2 = "0" + h2);
      for (var m2 = 0; m2 < h2.length; m2 += 2)
        b2.push(parseInt(h2[m2] + h2[m2 + 1], 16));
    } else
      for (var m2 = 0; m2 < h2.length; m2++) {
        var w2 = h2.charCodeAt(m2), y2 = w2 >> 8, S2 = w2 & 255;
        y2 ? b2.push(y2, S2) : b2.push(S2);
      }
    return b2;
  }
  r2.toArray = i2;
  function n3(h2) {
    return h2.length === 1 ? "0" + h2 : h2;
  }
  r2.zero2 = n3;
  function o2(h2) {
    for (var p2 = "", b2 = 0; b2 < h2.length; b2++)
      p2 += n3(h2[b2].toString(16));
    return p2;
  }
  r2.toHex = o2, r2.encode = function(p2, b2) {
    return b2 === "hex" ? o2(p2) : p2;
  };
}), Jt = cr(function(e2, t2) {
  var r2 = t2;
  r2.assert = Pi, r2.toArray = fe.toArray, r2.zero2 = fe.zero2, r2.toHex = fe.toHex, r2.encode = fe.encode;
  function i2(b2, m2, w2) {
    var y2 = new Array(Math.max(b2.bitLength(), w2) + 1);
    y2.fill(0);
    for (var S2 = 1 << m2 + 1, I2 = b2.clone(), N2 = 0; N2 < y2.length; N2++) {
      var C2, F = I2.andln(S2 - 1);
      I2.isOdd() ? (F > (S2 >> 1) - 1 ? C2 = (S2 >> 1) - F : C2 = F, I2.isubn(C2)) : C2 = 0, y2[N2] = C2, I2.iushrn(1);
    }
    return y2;
  }
  r2.getNAF = i2;
  function n3(b2, m2) {
    var w2 = [[], []];
    b2 = b2.clone(), m2 = m2.clone();
    for (var y2 = 0, S2 = 0, I2; b2.cmpn(-y2) > 0 || m2.cmpn(-S2) > 0; ) {
      var N2 = b2.andln(3) + y2 & 3, C2 = m2.andln(3) + S2 & 3;
      N2 === 3 && (N2 = -1), C2 === 3 && (C2 = -1);
      var F;
      N2 & 1 ? (I2 = b2.andln(7) + y2 & 7, (I2 === 3 || I2 === 5) && C2 === 2 ? F = -N2 : F = N2) : F = 0, w2[0].push(F);
      var U;
      C2 & 1 ? (I2 = m2.andln(7) + S2 & 7, (I2 === 3 || I2 === 5) && N2 === 2 ? U = -C2 : U = C2) : U = 0, w2[1].push(U), 2 * y2 === F + 1 && (y2 = 1 - y2), 2 * S2 === U + 1 && (S2 = 1 - S2), b2.iushrn(1), m2.iushrn(1);
    }
    return w2;
  }
  r2.getJSF = n3;
  function o2(b2, m2, w2) {
    var y2 = "_" + m2;
    b2.prototype[m2] = function() {
      return this[y2] !== void 0 ? this[y2] : this[y2] = w2.call(this);
    };
  }
  r2.cachedProperty = o2;
  function h2(b2) {
    return typeof b2 == "string" ? r2.toArray(b2, "hex") : b2;
  }
  r2.parseBytes = h2;
  function p2(b2) {
    return new K(b2, "hex", "le");
  }
  r2.intFromLE = p2;
}), Ur = Jt.getNAF, Ta = Jt.getJSF, kr = Jt.assert;
function Ce(e2, t2) {
  this.type = e2, this.p = new K(t2.p, 16), this.red = t2.prime ? K.red(t2.prime) : K.mont(this.p), this.zero = new K(0).toRed(this.red), this.one = new K(1).toRed(this.red), this.two = new K(2).toRed(this.red), this.n = t2.n && new K(t2.n, 16), this.g = t2.g && this.pointFromJSON(t2.g, t2.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var r2 = this.n && this.p.div(this.n);
  !r2 || r2.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = true, this.redN = this.n.toRed(this.red));
}
var Ze = Ce;
Ce.prototype.point = function() {
  throw new Error("Not implemented");
}, Ce.prototype.validate = function() {
  throw new Error("Not implemented");
}, Ce.prototype._fixedNafMul = function(t2, r2) {
  kr(t2.precomputed);
  var i2 = t2._getDoubles(), n3 = Ur(r2, 1, this._bitLength), o2 = (1 << i2.step + 1) - (i2.step % 2 === 0 ? 2 : 1);
  o2 /= 3;
  var h2 = [], p2, b2;
  for (p2 = 0; p2 < n3.length; p2 += i2.step) {
    b2 = 0;
    for (var m2 = p2 + i2.step - 1; m2 >= p2; m2--)
      b2 = (b2 << 1) + n3[m2];
    h2.push(b2);
  }
  for (var w2 = this.jpoint(null, null, null), y2 = this.jpoint(null, null, null), S2 = o2; S2 > 0; S2--) {
    for (p2 = 0; p2 < h2.length; p2++)
      b2 = h2[p2], b2 === S2 ? y2 = y2.mixedAdd(i2.points[p2]) : b2 === -S2 && (y2 = y2.mixedAdd(i2.points[p2].neg()));
    w2 = w2.add(y2);
  }
  return w2.toP();
}, Ce.prototype._wnafMul = function(t2, r2) {
  var i2 = 4, n3 = t2._getNAFPoints(i2);
  i2 = n3.wnd;
  for (var o2 = n3.points, h2 = Ur(r2, i2, this._bitLength), p2 = this.jpoint(null, null, null), b2 = h2.length - 1; b2 >= 0; b2--) {
    for (var m2 = 0; b2 >= 0 && h2[b2] === 0; b2--)
      m2++;
    if (b2 >= 0 && m2++, p2 = p2.dblp(m2), b2 < 0)
      break;
    var w2 = h2[b2];
    kr(w2 !== 0), t2.type === "affine" ? w2 > 0 ? p2 = p2.mixedAdd(o2[w2 - 1 >> 1]) : p2 = p2.mixedAdd(o2[-w2 - 1 >> 1].neg()) : w2 > 0 ? p2 = p2.add(o2[w2 - 1 >> 1]) : p2 = p2.add(o2[-w2 - 1 >> 1].neg());
  }
  return t2.type === "affine" ? p2.toP() : p2;
}, Ce.prototype._wnafMulAdd = function(t2, r2, i2, n3, o2) {
  var h2 = this._wnafT1, p2 = this._wnafT2, b2 = this._wnafT3, m2 = 0, w2, y2, S2;
  for (w2 = 0; w2 < n3; w2++) {
    S2 = r2[w2];
    var I2 = S2._getNAFPoints(t2);
    h2[w2] = I2.wnd, p2[w2] = I2.points;
  }
  for (w2 = n3 - 1; w2 >= 1; w2 -= 2) {
    var N2 = w2 - 1, C2 = w2;
    if (h2[N2] !== 1 || h2[C2] !== 1) {
      b2[N2] = Ur(i2[N2], h2[N2], this._bitLength), b2[C2] = Ur(i2[C2], h2[C2], this._bitLength), m2 = Math.max(b2[N2].length, m2), m2 = Math.max(b2[C2].length, m2);
      continue;
    }
    var F = [r2[N2], null, null, r2[C2]];
    r2[N2].y.cmp(r2[C2].y) === 0 ? (F[1] = r2[N2].add(r2[C2]), F[2] = r2[N2].toJ().mixedAdd(r2[C2].neg())) : r2[N2].y.cmp(r2[C2].y.redNeg()) === 0 ? (F[1] = r2[N2].toJ().mixedAdd(r2[C2]), F[2] = r2[N2].add(r2[C2].neg())) : (F[1] = r2[N2].toJ().mixedAdd(r2[C2]), F[2] = r2[N2].toJ().mixedAdd(r2[C2].neg()));
    var U = [-3, -1, -5, -7, 0, 7, 5, 1, 3], J = Ta(i2[N2], i2[C2]);
    for (m2 = Math.max(J[0].length, m2), b2[N2] = new Array(m2), b2[C2] = new Array(m2), y2 = 0; y2 < m2; y2++) {
      var Bt = J[0][y2] | 0, G = J[1][y2] | 0;
      b2[N2][y2] = U[(Bt + 1) * 3 + (G + 1)], b2[C2][y2] = 0, p2[N2] = F;
    }
  }
  var H2 = this.jpoint(null, null, null), z = this._wnafT4;
  for (w2 = m2; w2 >= 0; w2--) {
    for (var Pt = 0; w2 >= 0; ) {
      var W = true;
      for (y2 = 0; y2 < n3; y2++)
        z[y2] = b2[y2][w2] | 0, z[y2] !== 0 && (W = false);
      if (!W)
        break;
      Pt++, w2--;
    }
    if (w2 >= 0 && Pt++, H2 = H2.dblp(Pt), w2 < 0)
      break;
    for (y2 = 0; y2 < n3; y2++) {
      var Rt = z[y2];
      Rt !== 0 && (Rt > 0 ? S2 = p2[y2][Rt - 1 >> 1] : Rt < 0 && (S2 = p2[y2][-Rt - 1 >> 1].neg()), S2.type === "affine" ? H2 = H2.mixedAdd(S2) : H2 = H2.add(S2));
    }
  }
  for (w2 = 0; w2 < n3; w2++)
    p2[w2] = null;
  return o2 ? H2 : H2.toP();
};
function Xt(e2, t2) {
  this.curve = e2, this.type = t2, this.precomputed = null;
}
Ce.BasePoint = Xt, Xt.prototype.eq = function() {
  throw new Error("Not implemented");
}, Xt.prototype.validate = function() {
  return this.curve.validate(this);
}, Ce.prototype.decodePoint = function(t2, r2) {
  t2 = Jt.toArray(t2, r2);
  var i2 = this.p.byteLength();
  if ((t2[0] === 4 || t2[0] === 6 || t2[0] === 7) && t2.length - 1 === 2 * i2) {
    t2[0] === 6 ? kr(t2[t2.length - 1] % 2 === 0) : t2[0] === 7 && kr(t2[t2.length - 1] % 2 === 1);
    var n3 = this.point(t2.slice(1, 1 + i2), t2.slice(1 + i2, 1 + 2 * i2));
    return n3;
  } else if ((t2[0] === 2 || t2[0] === 3) && t2.length - 1 === i2)
    return this.pointFromX(t2.slice(1, 1 + i2), t2[0] === 3);
  throw new Error("Unknown point format");
}, Xt.prototype.encodeCompressed = function(t2) {
  return this.encode(t2, true);
}, Xt.prototype._encode = function(t2) {
  var r2 = this.curve.p.byteLength(), i2 = this.getX().toArray("be", r2);
  return t2 ? [this.getY().isEven() ? 2 : 3].concat(i2) : [4].concat(i2, this.getY().toArray("be", r2));
}, Xt.prototype.encode = function(t2, r2) {
  return Jt.encode(this._encode(r2), t2);
}, Xt.prototype.precompute = function(t2) {
  if (this.precomputed)
    return this;
  var r2 = { doubles: null, naf: null, beta: null };
  return r2.naf = this._getNAFPoints(8), r2.doubles = this._getDoubles(4, t2), r2.beta = this._getBeta(), this.precomputed = r2, this;
}, Xt.prototype._hasDoubles = function(t2) {
  if (!this.precomputed)
    return false;
  var r2 = this.precomputed.doubles;
  return r2 ? r2.points.length >= Math.ceil((t2.bitLength() + 1) / r2.step) : false;
}, Xt.prototype._getDoubles = function(t2, r2) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i2 = [this], n3 = this, o2 = 0; o2 < r2; o2 += t2) {
    for (var h2 = 0; h2 < t2; h2++)
      n3 = n3.dbl();
    i2.push(n3);
  }
  return { step: t2, points: i2 };
}, Xt.prototype._getNAFPoints = function(t2) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var r2 = [this], i2 = (1 << t2) - 1, n3 = i2 === 1 ? null : this.dbl(), o2 = 1; o2 < i2; o2++)
    r2[o2] = r2[o2 - 1].add(n3);
  return { wnd: t2, points: r2 };
}, Xt.prototype._getBeta = function() {
  return null;
}, Xt.prototype.dblp = function(t2) {
  for (var r2 = this, i2 = 0; i2 < t2; i2++)
    r2 = r2.dbl();
  return r2;
};
var Di = cr(function(e2) {
  typeof Object.create == "function" ? e2.exports = function(r2, i2) {
    i2 && (r2.super_ = i2, r2.prototype = Object.create(i2.prototype, { constructor: { value: r2, enumerable: false, writable: true, configurable: true } }));
  } : e2.exports = function(r2, i2) {
    if (i2) {
      r2.super_ = i2;
      var n3 = function() {
      };
      n3.prototype = i2.prototype, r2.prototype = new n3(), r2.prototype.constructor = r2;
    }
  };
}), Ua = Jt.assert;
function Zt(e2) {
  Ze.call(this, "short", e2), this.a = new K(e2.a, 16).toRed(this.red), this.b = new K(e2.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(e2), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Di(Zt, Ze);
var ka = Zt;
Zt.prototype._getEndomorphism = function(t2) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var r2, i2;
    if (t2.beta)
      r2 = new K(t2.beta, 16).toRed(this.red);
    else {
      var n3 = this._getEndoRoots(this.p);
      r2 = n3[0].cmp(n3[1]) < 0 ? n3[0] : n3[1], r2 = r2.toRed(this.red);
    }
    if (t2.lambda)
      i2 = new K(t2.lambda, 16);
    else {
      var o2 = this._getEndoRoots(this.n);
      this.g.mul(o2[0]).x.cmp(this.g.x.redMul(r2)) === 0 ? i2 = o2[0] : (i2 = o2[1], Ua(this.g.mul(i2).x.cmp(this.g.x.redMul(r2)) === 0));
    }
    var h2;
    return t2.basis ? h2 = t2.basis.map(function(p2) {
      return { a: new K(p2.a, 16), b: new K(p2.b, 16) };
    }) : h2 = this._getEndoBasis(i2), { beta: r2, lambda: i2, basis: h2 };
  }
}, Zt.prototype._getEndoRoots = function(t2) {
  var r2 = t2 === this.p ? this.red : K.mont(t2), i2 = new K(2).toRed(r2).redInvm(), n3 = i2.redNeg(), o2 = new K(3).toRed(r2).redNeg().redSqrt().redMul(i2), h2 = n3.redAdd(o2).fromRed(), p2 = n3.redSub(o2).fromRed();
  return [h2, p2];
}, Zt.prototype._getEndoBasis = function(t2) {
  for (var r2 = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i2 = t2, n3 = this.n.clone(), o2 = new K(1), h2 = new K(0), p2 = new K(0), b2 = new K(1), m2, w2, y2, S2, I2, N2, C2, F = 0, U, J; i2.cmpn(0) !== 0; ) {
    var Bt = n3.div(i2);
    U = n3.sub(Bt.mul(i2)), J = p2.sub(Bt.mul(o2));
    var G = b2.sub(Bt.mul(h2));
    if (!y2 && U.cmp(r2) < 0)
      m2 = C2.neg(), w2 = o2, y2 = U.neg(), S2 = J;
    else if (y2 && ++F === 2)
      break;
    C2 = U, n3 = i2, i2 = U, p2 = o2, o2 = J, b2 = h2, h2 = G;
  }
  I2 = U.neg(), N2 = J;
  var H2 = y2.sqr().add(S2.sqr()), z = I2.sqr().add(N2.sqr());
  return z.cmp(H2) >= 0 && (I2 = m2, N2 = w2), y2.negative && (y2 = y2.neg(), S2 = S2.neg()), I2.negative && (I2 = I2.neg(), N2 = N2.neg()), [{ a: y2, b: S2 }, { a: I2, b: N2 }];
}, Zt.prototype._endoSplit = function(t2) {
  var r2 = this.endo.basis, i2 = r2[0], n3 = r2[1], o2 = n3.b.mul(t2).divRound(this.n), h2 = i2.b.neg().mul(t2).divRound(this.n), p2 = o2.mul(i2.a), b2 = h2.mul(n3.a), m2 = o2.mul(i2.b), w2 = h2.mul(n3.b), y2 = t2.sub(p2).sub(b2), S2 = m2.add(w2).neg();
  return { k1: y2, k2: S2 };
}, Zt.prototype.pointFromX = function(t2, r2) {
  t2 = new K(t2, 16), t2.red || (t2 = t2.toRed(this.red));
  var i2 = t2.redSqr().redMul(t2).redIAdd(t2.redMul(this.a)).redIAdd(this.b), n3 = i2.redSqrt();
  if (n3.redSqr().redSub(i2).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var o2 = n3.fromRed().isOdd();
  return (r2 && !o2 || !r2 && o2) && (n3 = n3.redNeg()), this.point(t2, n3);
}, Zt.prototype.validate = function(t2) {
  if (t2.inf)
    return true;
  var r2 = t2.x, i2 = t2.y, n3 = this.a.redMul(r2), o2 = r2.redSqr().redMul(r2).redIAdd(n3).redIAdd(this.b);
  return i2.redSqr().redISub(o2).cmpn(0) === 0;
}, Zt.prototype._endoWnafMulAdd = function(t2, r2, i2) {
  for (var n3 = this._endoWnafT1, o2 = this._endoWnafT2, h2 = 0; h2 < t2.length; h2++) {
    var p2 = this._endoSplit(r2[h2]), b2 = t2[h2], m2 = b2._getBeta();
    p2.k1.negative && (p2.k1.ineg(), b2 = b2.neg(true)), p2.k2.negative && (p2.k2.ineg(), m2 = m2.neg(true)), n3[h2 * 2] = b2, n3[h2 * 2 + 1] = m2, o2[h2 * 2] = p2.k1, o2[h2 * 2 + 1] = p2.k2;
  }
  for (var w2 = this._wnafMulAdd(1, n3, o2, h2 * 2, i2), y2 = 0; y2 < h2 * 2; y2++)
    n3[y2] = null, o2[y2] = null;
  return w2;
};
function Ft(e2, t2, r2, i2) {
  Ze.BasePoint.call(this, e2, "affine"), t2 === null && r2 === null ? (this.x = null, this.y = null, this.inf = true) : (this.x = new K(t2, 16), this.y = new K(r2, 16), i2 && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = false);
}
Di(Ft, Ze.BasePoint), Zt.prototype.point = function(t2, r2, i2) {
  return new Ft(this, t2, r2, i2);
}, Zt.prototype.pointFromJSON = function(t2, r2) {
  return Ft.fromJSON(this, t2, r2);
}, Ft.prototype._getBeta = function() {
  if (this.curve.endo) {
    var t2 = this.precomputed;
    if (t2 && t2.beta)
      return t2.beta;
    var r2 = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (t2) {
      var i2 = this.curve, n3 = function(o2) {
        return i2.point(o2.x.redMul(i2.endo.beta), o2.y);
      };
      t2.beta = r2, r2.precomputed = { beta: null, naf: t2.naf && { wnd: t2.naf.wnd, points: t2.naf.points.map(n3) }, doubles: t2.doubles && { step: t2.doubles.step, points: t2.doubles.points.map(n3) } };
    }
    return r2;
  }
}, Ft.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y];
}, Ft.fromJSON = function(t2, r2, i2) {
  typeof r2 == "string" && (r2 = JSON.parse(r2));
  var n3 = t2.point(r2[0], r2[1], i2);
  if (!r2[2])
    return n3;
  function o2(p2) {
    return t2.point(p2[0], p2[1], i2);
  }
  var h2 = r2[2];
  return n3.precomputed = { beta: null, doubles: h2.doubles && { step: h2.doubles.step, points: [n3].concat(h2.doubles.points.map(o2)) }, naf: h2.naf && { wnd: h2.naf.wnd, points: [n3].concat(h2.naf.points.map(o2)) } }, n3;
}, Ft.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
}, Ft.prototype.isInfinity = function() {
  return this.inf;
}, Ft.prototype.add = function(t2) {
  if (this.inf)
    return t2;
  if (t2.inf)
    return this;
  if (this.eq(t2))
    return this.dbl();
  if (this.neg().eq(t2))
    return this.curve.point(null, null);
  if (this.x.cmp(t2.x) === 0)
    return this.curve.point(null, null);
  var r2 = this.y.redSub(t2.y);
  r2.cmpn(0) !== 0 && (r2 = r2.redMul(this.x.redSub(t2.x).redInvm()));
  var i2 = r2.redSqr().redISub(this.x).redISub(t2.x), n3 = r2.redMul(this.x.redSub(i2)).redISub(this.y);
  return this.curve.point(i2, n3);
}, Ft.prototype.dbl = function() {
  if (this.inf)
    return this;
  var t2 = this.y.redAdd(this.y);
  if (t2.cmpn(0) === 0)
    return this.curve.point(null, null);
  var r2 = this.curve.a, i2 = this.x.redSqr(), n3 = t2.redInvm(), o2 = i2.redAdd(i2).redIAdd(i2).redIAdd(r2).redMul(n3), h2 = o2.redSqr().redISub(this.x.redAdd(this.x)), p2 = o2.redMul(this.x.redSub(h2)).redISub(this.y);
  return this.curve.point(h2, p2);
}, Ft.prototype.getX = function() {
  return this.x.fromRed();
}, Ft.prototype.getY = function() {
  return this.y.fromRed();
}, Ft.prototype.mul = function(t2) {
  return t2 = new K(t2, 16), this.isInfinity() ? this : this._hasDoubles(t2) ? this.curve._fixedNafMul(this, t2) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t2]) : this.curve._wnafMul(this, t2);
}, Ft.prototype.mulAdd = function(t2, r2, i2) {
  var n3 = [this, r2], o2 = [t2, i2];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n3, o2) : this.curve._wnafMulAdd(1, n3, o2, 2);
}, Ft.prototype.jmulAdd = function(t2, r2, i2) {
  var n3 = [this, r2], o2 = [t2, i2];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n3, o2, true) : this.curve._wnafMulAdd(1, n3, o2, 2, true);
}, Ft.prototype.eq = function(t2) {
  return this === t2 || this.inf === t2.inf && (this.inf || this.x.cmp(t2.x) === 0 && this.y.cmp(t2.y) === 0);
}, Ft.prototype.neg = function(t2) {
  if (this.inf)
    return this;
  var r2 = this.curve.point(this.x, this.y.redNeg());
  if (t2 && this.precomputed) {
    var i2 = this.precomputed, n3 = function(o2) {
      return o2.neg();
    };
    r2.precomputed = { naf: i2.naf && { wnd: i2.naf.wnd, points: i2.naf.points.map(n3) }, doubles: i2.doubles && { step: i2.doubles.step, points: i2.doubles.points.map(n3) } };
  }
  return r2;
}, Ft.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var t2 = this.curve.jpoint(this.x, this.y, this.curve.one);
  return t2;
};
function Tt(e2, t2, r2, i2) {
  Ze.BasePoint.call(this, e2, "jacobian"), t2 === null && r2 === null && i2 === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new K(0)) : (this.x = new K(t2, 16), this.y = new K(r2, 16), this.z = new K(i2, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Di(Tt, Ze.BasePoint), Zt.prototype.jpoint = function(t2, r2, i2) {
  return new Tt(this, t2, r2, i2);
}, Tt.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var t2 = this.z.redInvm(), r2 = t2.redSqr(), i2 = this.x.redMul(r2), n3 = this.y.redMul(r2).redMul(t2);
  return this.curve.point(i2, n3);
}, Tt.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
}, Tt.prototype.add = function(t2) {
  if (this.isInfinity())
    return t2;
  if (t2.isInfinity())
    return this;
  var r2 = t2.z.redSqr(), i2 = this.z.redSqr(), n3 = this.x.redMul(r2), o2 = t2.x.redMul(i2), h2 = this.y.redMul(r2.redMul(t2.z)), p2 = t2.y.redMul(i2.redMul(this.z)), b2 = n3.redSub(o2), m2 = h2.redSub(p2);
  if (b2.cmpn(0) === 0)
    return m2.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var w2 = b2.redSqr(), y2 = w2.redMul(b2), S2 = n3.redMul(w2), I2 = m2.redSqr().redIAdd(y2).redISub(S2).redISub(S2), N2 = m2.redMul(S2.redISub(I2)).redISub(h2.redMul(y2)), C2 = this.z.redMul(t2.z).redMul(b2);
  return this.curve.jpoint(I2, N2, C2);
}, Tt.prototype.mixedAdd = function(t2) {
  if (this.isInfinity())
    return t2.toJ();
  if (t2.isInfinity())
    return this;
  var r2 = this.z.redSqr(), i2 = this.x, n3 = t2.x.redMul(r2), o2 = this.y, h2 = t2.y.redMul(r2).redMul(this.z), p2 = i2.redSub(n3), b2 = o2.redSub(h2);
  if (p2.cmpn(0) === 0)
    return b2.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var m2 = p2.redSqr(), w2 = m2.redMul(p2), y2 = i2.redMul(m2), S2 = b2.redSqr().redIAdd(w2).redISub(y2).redISub(y2), I2 = b2.redMul(y2.redISub(S2)).redISub(o2.redMul(w2)), N2 = this.z.redMul(p2);
  return this.curve.jpoint(S2, I2, N2);
}, Tt.prototype.dblp = function(t2) {
  if (t2 === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!t2)
    return this.dbl();
  var r2;
  if (this.curve.zeroA || this.curve.threeA) {
    var i2 = this;
    for (r2 = 0; r2 < t2; r2++)
      i2 = i2.dbl();
    return i2;
  }
  var n3 = this.curve.a, o2 = this.curve.tinv, h2 = this.x, p2 = this.y, b2 = this.z, m2 = b2.redSqr().redSqr(), w2 = p2.redAdd(p2);
  for (r2 = 0; r2 < t2; r2++) {
    var y2 = h2.redSqr(), S2 = w2.redSqr(), I2 = S2.redSqr(), N2 = y2.redAdd(y2).redIAdd(y2).redIAdd(n3.redMul(m2)), C2 = h2.redMul(S2), F = N2.redSqr().redISub(C2.redAdd(C2)), U = C2.redISub(F), J = N2.redMul(U);
    J = J.redIAdd(J).redISub(I2);
    var Bt = w2.redMul(b2);
    r2 + 1 < t2 && (m2 = m2.redMul(I2)), h2 = F, b2 = Bt, w2 = J;
  }
  return this.curve.jpoint(h2, w2.redMul(o2), b2);
}, Tt.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
}, Tt.prototype._zeroDbl = function() {
  var t2, r2, i2;
  if (this.zOne) {
    var n3 = this.x.redSqr(), o2 = this.y.redSqr(), h2 = o2.redSqr(), p2 = this.x.redAdd(o2).redSqr().redISub(n3).redISub(h2);
    p2 = p2.redIAdd(p2);
    var b2 = n3.redAdd(n3).redIAdd(n3), m2 = b2.redSqr().redISub(p2).redISub(p2), w2 = h2.redIAdd(h2);
    w2 = w2.redIAdd(w2), w2 = w2.redIAdd(w2), t2 = m2, r2 = b2.redMul(p2.redISub(m2)).redISub(w2), i2 = this.y.redAdd(this.y);
  } else {
    var y2 = this.x.redSqr(), S2 = this.y.redSqr(), I2 = S2.redSqr(), N2 = this.x.redAdd(S2).redSqr().redISub(y2).redISub(I2);
    N2 = N2.redIAdd(N2);
    var C2 = y2.redAdd(y2).redIAdd(y2), F = C2.redSqr(), U = I2.redIAdd(I2);
    U = U.redIAdd(U), U = U.redIAdd(U), t2 = F.redISub(N2).redISub(N2), r2 = C2.redMul(N2.redISub(t2)).redISub(U), i2 = this.y.redMul(this.z), i2 = i2.redIAdd(i2);
  }
  return this.curve.jpoint(t2, r2, i2);
}, Tt.prototype._threeDbl = function() {
  var t2, r2, i2;
  if (this.zOne) {
    var n3 = this.x.redSqr(), o2 = this.y.redSqr(), h2 = o2.redSqr(), p2 = this.x.redAdd(o2).redSqr().redISub(n3).redISub(h2);
    p2 = p2.redIAdd(p2);
    var b2 = n3.redAdd(n3).redIAdd(n3).redIAdd(this.curve.a), m2 = b2.redSqr().redISub(p2).redISub(p2);
    t2 = m2;
    var w2 = h2.redIAdd(h2);
    w2 = w2.redIAdd(w2), w2 = w2.redIAdd(w2), r2 = b2.redMul(p2.redISub(m2)).redISub(w2), i2 = this.y.redAdd(this.y);
  } else {
    var y2 = this.z.redSqr(), S2 = this.y.redSqr(), I2 = this.x.redMul(S2), N2 = this.x.redSub(y2).redMul(this.x.redAdd(y2));
    N2 = N2.redAdd(N2).redIAdd(N2);
    var C2 = I2.redIAdd(I2);
    C2 = C2.redIAdd(C2);
    var F = C2.redAdd(C2);
    t2 = N2.redSqr().redISub(F), i2 = this.y.redAdd(this.z).redSqr().redISub(S2).redISub(y2);
    var U = S2.redSqr();
    U = U.redIAdd(U), U = U.redIAdd(U), U = U.redIAdd(U), r2 = N2.redMul(C2.redISub(t2)).redISub(U);
  }
  return this.curve.jpoint(t2, r2, i2);
}, Tt.prototype._dbl = function() {
  var t2 = this.curve.a, r2 = this.x, i2 = this.y, n3 = this.z, o2 = n3.redSqr().redSqr(), h2 = r2.redSqr(), p2 = i2.redSqr(), b2 = h2.redAdd(h2).redIAdd(h2).redIAdd(t2.redMul(o2)), m2 = r2.redAdd(r2);
  m2 = m2.redIAdd(m2);
  var w2 = m2.redMul(p2), y2 = b2.redSqr().redISub(w2.redAdd(w2)), S2 = w2.redISub(y2), I2 = p2.redSqr();
  I2 = I2.redIAdd(I2), I2 = I2.redIAdd(I2), I2 = I2.redIAdd(I2);
  var N2 = b2.redMul(S2).redISub(I2), C2 = i2.redAdd(i2).redMul(n3);
  return this.curve.jpoint(y2, N2, C2);
}, Tt.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var t2 = this.x.redSqr(), r2 = this.y.redSqr(), i2 = this.z.redSqr(), n3 = r2.redSqr(), o2 = t2.redAdd(t2).redIAdd(t2), h2 = o2.redSqr(), p2 = this.x.redAdd(r2).redSqr().redISub(t2).redISub(n3);
  p2 = p2.redIAdd(p2), p2 = p2.redAdd(p2).redIAdd(p2), p2 = p2.redISub(h2);
  var b2 = p2.redSqr(), m2 = n3.redIAdd(n3);
  m2 = m2.redIAdd(m2), m2 = m2.redIAdd(m2), m2 = m2.redIAdd(m2);
  var w2 = o2.redIAdd(p2).redSqr().redISub(h2).redISub(b2).redISub(m2), y2 = r2.redMul(w2);
  y2 = y2.redIAdd(y2), y2 = y2.redIAdd(y2);
  var S2 = this.x.redMul(b2).redISub(y2);
  S2 = S2.redIAdd(S2), S2 = S2.redIAdd(S2);
  var I2 = this.y.redMul(w2.redMul(m2.redISub(w2)).redISub(p2.redMul(b2)));
  I2 = I2.redIAdd(I2), I2 = I2.redIAdd(I2), I2 = I2.redIAdd(I2);
  var N2 = this.z.redAdd(p2).redSqr().redISub(i2).redISub(b2);
  return this.curve.jpoint(S2, I2, N2);
}, Tt.prototype.mul = function(t2, r2) {
  return t2 = new K(t2, r2), this.curve._wnafMul(this, t2);
}, Tt.prototype.eq = function(t2) {
  if (t2.type === "affine")
    return this.eq(t2.toJ());
  if (this === t2)
    return true;
  var r2 = this.z.redSqr(), i2 = t2.z.redSqr();
  if (this.x.redMul(i2).redISub(t2.x.redMul(r2)).cmpn(0) !== 0)
    return false;
  var n3 = r2.redMul(this.z), o2 = i2.redMul(t2.z);
  return this.y.redMul(o2).redISub(t2.y.redMul(n3)).cmpn(0) === 0;
}, Tt.prototype.eqXToP = function(t2) {
  var r2 = this.z.redSqr(), i2 = t2.toRed(this.curve.red).redMul(r2);
  if (this.x.cmp(i2) === 0)
    return true;
  for (var n3 = t2.clone(), o2 = this.curve.redN.redMul(r2); ; ) {
    if (n3.iadd(this.curve.n), n3.cmp(this.curve.p) >= 0)
      return false;
    if (i2.redIAdd(o2), this.x.cmp(i2) === 0)
      return true;
  }
}, Tt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
}, Tt.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var qr = cr(function(e2, t2) {
  var r2 = t2;
  r2.base = Ze, r2.short = ka, r2.mont = null, r2.edwards = null;
}), Kr = cr(function(e2, t2) {
  var r2 = t2, i2 = Jt.assert;
  function n3(p2) {
    p2.type === "short" ? this.curve = new qr.short(p2) : p2.type === "edwards" ? this.curve = new qr.edwards(p2) : this.curve = new qr.mont(p2), this.g = this.curve.g, this.n = this.curve.n, this.hash = p2.hash, i2(this.g.validate(), "Invalid curve"), i2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  r2.PresetCurve = n3;
  function o2(p2, b2) {
    Object.defineProperty(r2, p2, { configurable: true, enumerable: true, get: function() {
      var m2 = new n3(b2);
      return Object.defineProperty(r2, p2, { configurable: true, enumerable: true, value: m2 }), m2;
    } });
  }
  o2("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: se.sha256, gRed: false, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), o2("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: se.sha256, gRed: false, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), o2("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: se.sha256, gRed: false, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), o2("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: se.sha384, gRed: false, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), o2("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: se.sha512, gRed: false, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), o2("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: se.sha256, gRed: false, g: ["9"] }), o2("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: se.sha256, gRed: false, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] });
  var h2;
  try {
    h2 = null.crash();
  } catch {
    h2 = void 0;
  }
  o2("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: se.sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: false, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", h2] });
});
function Re(e2) {
  if (!(this instanceof Re))
    return new Re(e2);
  this.hash = e2.hash, this.predResist = !!e2.predResist, this.outLen = this.hash.outSize, this.minEntropy = e2.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t2 = fe.toArray(e2.entropy, e2.entropyEnc || "hex"), r2 = fe.toArray(e2.nonce, e2.nonceEnc || "hex"), i2 = fe.toArray(e2.pers, e2.persEnc || "hex");
  Pi(t2.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t2, r2, i2);
}
var Rf = Re;
Re.prototype._init = function(t2, r2, i2) {
  var n3 = t2.concat(r2).concat(i2);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var o2 = 0; o2 < this.V.length; o2++)
    this.K[o2] = 0, this.V[o2] = 1;
  this._update(n3), this._reseed = 1, this.reseedInterval = 281474976710656;
}, Re.prototype._hmac = function() {
  return new se.hmac(this.hash, this.K);
}, Re.prototype._update = function(t2) {
  var r2 = this._hmac().update(this.V).update([0]);
  t2 && (r2 = r2.update(t2)), this.K = r2.digest(), this.V = this._hmac().update(this.V).digest(), t2 && (this.K = this._hmac().update(this.V).update([1]).update(t2).digest(), this.V = this._hmac().update(this.V).digest());
}, Re.prototype.reseed = function(t2, r2, i2, n3) {
  typeof r2 != "string" && (n3 = i2, i2 = r2, r2 = null), t2 = fe.toArray(t2, r2), i2 = fe.toArray(i2, n3), Pi(t2.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t2.concat(i2 || [])), this._reseed = 1;
}, Re.prototype.generate = function(t2, r2, i2, n3) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof r2 != "string" && (n3 = i2, i2 = r2, r2 = null), i2 && (i2 = fe.toArray(i2, n3 || "hex"), this._update(i2));
  for (var o2 = []; o2.length < t2; )
    this.V = this._hmac().update(this.V).digest(), o2 = o2.concat(this.V);
  var h2 = o2.slice(0, t2);
  return this._update(i2), this._reseed++, fe.encode(h2, r2);
};
var Fi = Jt.assert;
function kt(e2, t2) {
  this.ec = e2, this.priv = null, this.pub = null, t2.priv && this._importPrivate(t2.priv, t2.privEnc), t2.pub && this._importPublic(t2.pub, t2.pubEnc);
}
var Ti = kt;
kt.fromPublic = function(t2, r2, i2) {
  return r2 instanceof kt ? r2 : new kt(t2, { pub: r2, pubEnc: i2 });
}, kt.fromPrivate = function(t2, r2, i2) {
  return r2 instanceof kt ? r2 : new kt(t2, { priv: r2, privEnc: i2 });
}, kt.prototype.validate = function() {
  var t2 = this.getPublic();
  return t2.isInfinity() ? { result: false, reason: "Invalid public key" } : t2.validate() ? t2.mul(this.ec.curve.n).isInfinity() ? { result: true, reason: null } : { result: false, reason: "Public key * N != O" } : { result: false, reason: "Public key is not a point" };
}, kt.prototype.getPublic = function(t2, r2) {
  return typeof t2 == "string" && (r2 = t2, t2 = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), r2 ? this.pub.encode(r2, t2) : this.pub;
}, kt.prototype.getPrivate = function(t2) {
  return t2 === "hex" ? this.priv.toString(16, 2) : this.priv;
}, kt.prototype._importPrivate = function(t2, r2) {
  this.priv = new K(t2, r2 || 16), this.priv = this.priv.umod(this.ec.curve.n);
}, kt.prototype._importPublic = function(t2, r2) {
  if (t2.x || t2.y) {
    this.ec.curve.type === "mont" ? Fi(t2.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && Fi(t2.x && t2.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t2.x, t2.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(t2, r2);
}, kt.prototype.derive = function(t2) {
  return t2.validate() || Fi(t2.validate(), "public point not validated"), t2.mul(this.priv).getX();
}, kt.prototype.sign = function(t2, r2, i2) {
  return this.ec.sign(t2, this, r2, i2);
}, kt.prototype.verify = function(t2, r2) {
  return this.ec.verify(t2, r2, this);
}, kt.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var qa = Jt.assert;
function Hr(e2, t2) {
  if (e2 instanceof Hr)
    return e2;
  this._importDER(e2, t2) || (qa(e2.r && e2.s, "Signature without r or s"), this.r = new K(e2.r, 16), this.s = new K(e2.s, 16), e2.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = e2.recoveryParam);
}
var zr = Hr;
function Ka() {
  this.place = 0;
}
function Ui(e2, t2) {
  var r2 = e2[t2.place++];
  if (!(r2 & 128))
    return r2;
  var i2 = r2 & 15;
  if (i2 === 0 || i2 > 4)
    return false;
  for (var n3 = 0, o2 = 0, h2 = t2.place; o2 < i2; o2++, h2++)
    n3 <<= 8, n3 |= e2[h2], n3 >>>= 0;
  return n3 <= 127 ? false : (t2.place = h2, n3);
}
function Of(e2) {
  for (var t2 = 0, r2 = e2.length - 1; !e2[t2] && !(e2[t2 + 1] & 128) && t2 < r2; )
    t2++;
  return t2 === 0 ? e2 : e2.slice(t2);
}
Hr.prototype._importDER = function(t2, r2) {
  t2 = Jt.toArray(t2, r2);
  var i2 = new Ka();
  if (t2[i2.place++] !== 48)
    return false;
  var n3 = Ui(t2, i2);
  if (n3 === false || n3 + i2.place !== t2.length || t2[i2.place++] !== 2)
    return false;
  var o2 = Ui(t2, i2);
  if (o2 === false)
    return false;
  var h2 = t2.slice(i2.place, o2 + i2.place);
  if (i2.place += o2, t2[i2.place++] !== 2)
    return false;
  var p2 = Ui(t2, i2);
  if (p2 === false || t2.length !== p2 + i2.place)
    return false;
  var b2 = t2.slice(i2.place, p2 + i2.place);
  if (h2[0] === 0)
    if (h2[1] & 128)
      h2 = h2.slice(1);
    else
      return false;
  if (b2[0] === 0)
    if (b2[1] & 128)
      b2 = b2.slice(1);
    else
      return false;
  return this.r = new K(h2), this.s = new K(b2), this.recoveryParam = null, true;
};
function ki(e2, t2) {
  if (t2 < 128) {
    e2.push(t2);
    return;
  }
  var r2 = 1 + (Math.log(t2) / Math.LN2 >>> 3);
  for (e2.push(r2 | 128); --r2; )
    e2.push(t2 >>> (r2 << 3) & 255);
  e2.push(t2);
}
Hr.prototype.toDER = function(t2) {
  var r2 = this.r.toArray(), i2 = this.s.toArray();
  for (r2[0] & 128 && (r2 = [0].concat(r2)), i2[0] & 128 && (i2 = [0].concat(i2)), r2 = Of(r2), i2 = Of(i2); !i2[0] && !(i2[1] & 128); )
    i2 = i2.slice(1);
  var n3 = [2];
  ki(n3, r2.length), n3 = n3.concat(r2), n3.push(2), ki(n3, i2.length);
  var o2 = n3.concat(i2), h2 = [48];
  return ki(h2, o2.length), h2 = h2.concat(o2), Jt.encode(h2, t2);
};
var Ha = function() {
  throw new Error("unsupported");
}, Pf = Jt.assert;
function $t(e2) {
  if (!(this instanceof $t))
    return new $t(e2);
  typeof e2 == "string" && (Pf(Object.prototype.hasOwnProperty.call(Kr, e2), "Unknown curve " + e2), e2 = Kr[e2]), e2 instanceof Kr.PresetCurve && (e2 = { curve: e2 }), this.curve = e2.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e2.curve.g, this.g.precompute(e2.curve.n.bitLength() + 1), this.hash = e2.hash || e2.curve.hash;
}
var za = $t;
$t.prototype.keyPair = function(t2) {
  return new Ti(this, t2);
}, $t.prototype.keyFromPrivate = function(t2, r2) {
  return Ti.fromPrivate(this, t2, r2);
}, $t.prototype.keyFromPublic = function(t2, r2) {
  return Ti.fromPublic(this, t2, r2);
}, $t.prototype.genKeyPair = function(t2) {
  t2 || (t2 = {});
  for (var r2 = new Rf({ hash: this.hash, pers: t2.pers, persEnc: t2.persEnc || "utf8", entropy: t2.entropy || Ha(this.hash.hmacStrength), entropyEnc: t2.entropy && t2.entropyEnc || "utf8", nonce: this.n.toArray() }), i2 = this.n.byteLength(), n3 = this.n.sub(new K(2)); ; ) {
    var o2 = new K(r2.generate(i2));
    if (!(o2.cmp(n3) > 0))
      return o2.iaddn(1), this.keyFromPrivate(o2);
  }
}, $t.prototype._truncateToN = function(t2, r2) {
  var i2 = t2.byteLength() * 8 - this.n.bitLength();
  return i2 > 0 && (t2 = t2.ushrn(i2)), !r2 && t2.cmp(this.n) >= 0 ? t2.sub(this.n) : t2;
}, $t.prototype.sign = function(t2, r2, i2, n3) {
  typeof i2 == "object" && (n3 = i2, i2 = null), n3 || (n3 = {}), r2 = this.keyFromPrivate(r2, i2), t2 = this._truncateToN(new K(t2, 16));
  for (var o2 = this.n.byteLength(), h2 = r2.getPrivate().toArray("be", o2), p2 = t2.toArray("be", o2), b2 = new Rf({ hash: this.hash, entropy: h2, nonce: p2, pers: n3.pers, persEnc: n3.persEnc || "utf8" }), m2 = this.n.sub(new K(1)), w2 = 0; ; w2++) {
    var y2 = n3.k ? n3.k(w2) : new K(b2.generate(this.n.byteLength()));
    if (y2 = this._truncateToN(y2, true), !(y2.cmpn(1) <= 0 || y2.cmp(m2) >= 0)) {
      var S2 = this.g.mul(y2);
      if (!S2.isInfinity()) {
        var I2 = S2.getX(), N2 = I2.umod(this.n);
        if (N2.cmpn(0) !== 0) {
          var C2 = y2.invm(this.n).mul(N2.mul(r2.getPrivate()).iadd(t2));
          if (C2 = C2.umod(this.n), C2.cmpn(0) !== 0) {
            var F = (S2.getY().isOdd() ? 1 : 0) | (I2.cmp(N2) !== 0 ? 2 : 0);
            return n3.canonical && C2.cmp(this.nh) > 0 && (C2 = this.n.sub(C2), F ^= 1), new zr({ r: N2, s: C2, recoveryParam: F });
          }
        }
      }
    }
  }
}, $t.prototype.verify = function(t2, r2, i2, n3) {
  t2 = this._truncateToN(new K(t2, 16)), i2 = this.keyFromPublic(i2, n3), r2 = new zr(r2, "hex");
  var o2 = r2.r, h2 = r2.s;
  if (o2.cmpn(1) < 0 || o2.cmp(this.n) >= 0 || h2.cmpn(1) < 0 || h2.cmp(this.n) >= 0)
    return false;
  var p2 = h2.invm(this.n), b2 = p2.mul(t2).umod(this.n), m2 = p2.mul(o2).umod(this.n), w2;
  return this.curve._maxwellTrick ? (w2 = this.g.jmulAdd(b2, i2.getPublic(), m2), w2.isInfinity() ? false : w2.eqXToP(o2)) : (w2 = this.g.mulAdd(b2, i2.getPublic(), m2), w2.isInfinity() ? false : w2.getX().umod(this.n).cmp(o2) === 0);
}, $t.prototype.recoverPubKey = function(e2, t2, r2, i2) {
  Pf((3 & r2) === r2, "The recovery param is more than two bits"), t2 = new zr(t2, i2);
  var n3 = this.n, o2 = new K(e2), h2 = t2.r, p2 = t2.s, b2 = r2 & 1, m2 = r2 >> 1;
  if (h2.cmp(this.curve.p.umod(this.curve.n)) >= 0 && m2)
    throw new Error("Unable to find sencond key candinate");
  m2 ? h2 = this.curve.pointFromX(h2.add(this.curve.n), b2) : h2 = this.curve.pointFromX(h2, b2);
  var w2 = t2.r.invm(n3), y2 = n3.sub(o2).mul(w2).umod(n3), S2 = p2.mul(w2).umod(n3);
  return this.g.mulAdd(y2, h2, S2);
}, $t.prototype.getKeyRecoveryParam = function(e2, t2, r2, i2) {
  if (t2 = new zr(t2, i2), t2.recoveryParam !== null)
    return t2.recoveryParam;
  for (var n3 = 0; n3 < 4; n3++) {
    var o2;
    try {
      o2 = this.recoverPubKey(e2, t2, n3);
    } catch {
      continue;
    }
    if (o2.eq(r2))
      return n3;
  }
  throw new Error("Unable to find valid recovery factor");
};
var La = cr(function(e2, t2) {
  var r2 = t2;
  r2.version = "6.5.4", r2.utils = Jt, r2.rand = function() {
    throw new Error("unsupported");
  }, r2.curve = qr, r2.curves = Kr, r2.ec = za, r2.eddsa = null;
}), ja = La.ec;
const Qa = "signing-key/5.7.0", qi = new L$1(Qa);
let Ki = null;
function ve() {
  return Ki || (Ki = new ja("secp256k1")), Ki;
}
class Ja {
  constructor(t2) {
    br(this, "curve", "secp256k1"), br(this, "privateKey", Kt(t2)), N0(this.privateKey) !== 32 && qi.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const r2 = ve().keyFromPrivate(Ot(this.privateKey));
    br(this, "publicKey", "0x" + r2.getPublic(false, "hex")), br(this, "compressedPublicKey", "0x" + r2.getPublic(true, "hex")), br(this, "_isSigningKey", true);
  }
  _addPoint(t2) {
    const r2 = ve().keyFromPublic(Ot(this.publicKey)), i2 = ve().keyFromPublic(Ot(t2));
    return "0x" + r2.pub.add(i2.pub).encodeCompressed("hex");
  }
  signDigest(t2) {
    const r2 = ve().keyFromPrivate(Ot(this.privateKey)), i2 = Ot(t2);
    i2.length !== 32 && qi.throwArgumentError("bad digest length", "digest", t2);
    const n3 = r2.sign(i2, { canonical: true });
    return zn({ recoveryParam: n3.recoveryParam, r: oe("0x" + n3.r.toString(16), 32), s: oe("0x" + n3.s.toString(16), 32) });
  }
  computeSharedSecret(t2) {
    const r2 = ve().keyFromPrivate(Ot(this.privateKey)), i2 = ve().keyFromPublic(Ot(Df(t2)));
    return oe("0x" + r2.derive(i2.getPublic()).toString(16), 32);
  }
  static isSigningKey(t2) {
    return !!(t2 && t2._isSigningKey);
  }
}
function Ga(e2, t2) {
  const r2 = zn(t2), i2 = { r: Ot(r2.r), s: Ot(r2.s) };
  return "0x" + ve().recoverPubKey(Ot(e2), i2, r2.recoveryParam).encode("hex", false);
}
function Df(e2, t2) {
  const r2 = Ot(e2);
  if (r2.length === 32) {
    const i2 = new Ja(r2);
    return t2 ? "0x" + ve().keyFromPrivate(r2).getPublic(true, "hex") : i2.publicKey;
  } else {
    if (r2.length === 33)
      return t2 ? Kt(r2) : "0x" + ve().keyFromPublic(r2).getPublic(false, "hex");
    if (r2.length === 65)
      return t2 ? "0x" + ve().keyFromPublic(r2).getPublic(true, "hex") : Kt(r2);
  }
  return qi.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
var Ff;
(function(e2) {
  e2[e2.legacy = 0] = "legacy", e2[e2.eip2930 = 1] = "eip2930", e2[e2.eip1559 = 2] = "eip1559";
})(Ff || (Ff = {}));
function Va(e2) {
  const t2 = Df(e2);
  return ns(Hn(yi(Hn(t2, 1)), 12));
}
function Wa(e2, t2) {
  return Va(Ga(Ot(e2), t2));
}
const Xa = "https://rpc.walletconnect.com/v1";
function Uf(e2, t2, r2) {
  return Wa(ff(t2), r2).toLowerCase() === e2.toLowerCase();
}
async function kf(e2, t2, r2, i2, n3, o2) {
  try {
    const h2 = "0x1626ba7e", p2 = "0000000000000000000000000000000000000000000000000000000000000040", b2 = "0000000000000000000000000000000000000000000000000000000000000041", m2 = r2.substring(2), w2 = ff(t2).substring(2), y2 = h2 + w2 + p2 + b2 + m2, S2 = await fetch(`${o2 || Xa}/?chainId=${i2}&projectId=${n3}`, { method: "POST", body: JSON.stringify({ id: Za(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e2, data: y2 }, "latest"] }) }), { result: I2 } = await S2.json();
    return I2 ? I2.slice(0, h2.length).toLowerCase() === h2.toLowerCase() : false;
  } catch (h2) {
    return console.error("isValidEip1271Signature: ", h2), false;
  }
}
function Za() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
const nu = "did:pkh:", Lr = (e2) => e2?.split(":"), zi = (e2) => {
  const t2 = e2 && Lr(e2);
  if (t2)
    return e2.includes(nu) ? t2[3] : t2[1];
}, Li = (e2) => {
  const t2 = e2 && Lr(e2);
  if (t2)
    return t2.pop();
};
const zf = (e2, t2) => {
  const r2 = `${e2.domain} wants you to sign in with your Ethereum account:`, i2 = Li(t2);
  if (!e2.aud && !e2.uri)
    throw new Error("Either `aud` or `uri` is required to construct the message");
  let n3 = e2.statement || void 0;
  const o2 = `URI: ${e2.aud || e2.uri}`, h2 = `Version: ${e2.version}`, p2 = `Chain ID: ${zi(t2)}`, b2 = `Nonce: ${e2.nonce}`, m2 = `Issued At: ${e2.iat}`, w2 = e2.resources ? `Resources:${e2.resources.map((S2) => `
- ${S2}`).join("")}` : void 0, y2 = Qr(e2.resources);
  if (y2) {
    const S2 = Oe(y2);
    n3 = Ji(n3, S2);
  }
  return [r2, i2, "", n3, "", o2, h2, p2, b2, m2, w2].filter((S2) => S2 != null).join(`
`);
};
function Gf(e2) {
  return JSON.parse(Buffer.from(e2, "base64").toString("utf-8"));
}
function me(e2) {
  if (!e2)
    throw new Error("No recap provided, value is undefined");
  if (!e2.att)
    throw new Error("No `att` property found");
  const t2 = Object.keys(e2.att);
  if (!(t2 != null && t2.length))
    throw new Error("No resources found in `att` property");
  t2.forEach((r2) => {
    const i2 = e2.att[r2];
    if (Array.isArray(i2))
      throw new Error(`Resource must be an object: ${r2}`);
    if (typeof i2 != "object")
      throw new Error(`Resource must be an object: ${r2}`);
    if (!Object.keys(i2).length)
      throw new Error(`Resource object is empty: ${r2}`);
    Object.keys(i2).forEach((n3) => {
      const o2 = i2[n3];
      if (!Array.isArray(o2))
        throw new Error(`Ability limits ${n3} must be an array of objects, found: ${o2}`);
      if (!o2.length)
        throw new Error(`Value of ${n3} is empty array, must be an array with objects`);
      o2.forEach((h2) => {
        if (typeof h2 != "object")
          throw new Error(`Ability limits (${n3}) must be an array of objects, found: ${h2}`);
      });
    });
  });
}
function Oe(e2) {
  const t2 = Gf(e2.replace("urn:recap:", ""));
  return me(t2), t2;
}
function Qi(e2) {
  return e2 && e2.includes("urn:recap:");
}
function Ji(e2 = "", t2) {
  me(t2);
  const r2 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e2.includes(r2))
    return e2;
  const i2 = [];
  let n3 = 0;
  Object.keys(t2.att).forEach((p2) => {
    const b2 = Object.keys(t2.att[p2]).map((y2) => ({ ability: y2.split("/")[0], action: y2.split("/")[1] }));
    b2.sort((y2, S2) => y2.action.localeCompare(S2.action));
    const m2 = {};
    b2.forEach((y2) => {
      m2[y2.ability] || (m2[y2.ability] = []), m2[y2.ability].push(y2.action);
    });
    const w2 = Object.keys(m2).map((y2) => (n3++, `(${n3}) '${y2}': '${m2[y2].join("', '")}' for '${p2}'.`));
    i2.push(w2.join(", ").replace(".,", "."));
  });
  const o2 = i2.join(" "), h2 = `${r2}${o2}`;
  return `${e2 ? e2 + " " : ""}${h2}`;
}
function Qr(e2) {
  if (!e2)
    return;
  const t2 = e2?.[e2.length - 1];
  return Qi(t2) ? t2 : void 0;
}
const ETH_ADDRESS_PATTERN = /0x[a-fA-F0-9]{40}/u;
const ETH_CHAIN_ID_IN_SIWE_PATTERN = /Chain ID: (?<temp1>\d+)/u;
function getAddressFromMessage(message) {
  return message.match(ETH_ADDRESS_PATTERN)?.[0] || "";
}
function getChainIdFromMessage(message) {
  return `eip155:${message.match(ETH_CHAIN_ID_IN_SIWE_PATTERN)?.[1] || 1}`;
}
async function verifySignature({ address, message, signature, chainId, projectId }) {
  let isValid = Uf(address, message, signature);
  if (!isValid) {
    isValid = await kf(address, message, signature, chainId, projectId);
  }
  return isValid;
}
const state = proxy({
  status: "uninitialized"
});
const SIWEController = {
  state,
  subscribeKey(key, callback) {
    return subscribeKey(state, key, callback);
  },
  subscribe(callback) {
    return subscribe(state, () => callback(state));
  },
  _getClient() {
    if (!state._client) {
      throw new Error("SIWEController client not set");
    }
    return state._client;
  },
  async getNonce(address) {
    const client = this._getClient();
    const nonce = await client.getNonce(address);
    this.setNonce(nonce);
    return nonce;
  },
  async getSession() {
    try {
      const client = this._getClient();
      const session = await client.getSession();
      if (session) {
        this.setSession(session);
        this.setStatus("success");
      }
      return session;
    } catch {
      return void 0;
    }
  },
  createMessage(args) {
    const client = this._getClient();
    const message = client.createMessage(args);
    this.setMessage(message);
    return message;
  },
  async verifyMessage(args) {
    const client = this._getClient();
    const isValid = await client.verifyMessage(args);
    return isValid;
  },
  async signIn() {
    const client = this._getClient();
    const session = await client.signIn();
    return session;
  },
  async signOut() {
    const client = this._getClient();
    await client.signOut();
    this.setStatus("ready");
    this.setSession(void 0);
    client.onSignOut?.();
  },
  onSignIn(args) {
    const client = this._getClient();
    client.onSignIn?.(args);
  },
  onSignOut() {
    const client = this._getClient();
    client.onSignOut?.();
  },
  setSIWEClient(client) {
    state._client = ref(client);
    state.status = "ready";
    OptionsController.setIsSiweEnabled(client.options.enabled);
  },
  setNonce(nonce) {
    state.nonce = nonce;
  },
  setStatus(status) {
    state.status = status;
  },
  setMessage(message) {
    state.message = message;
  },
  setSession(session) {
    state.session = session;
    state.status = session ? "success" : "ready";
  }
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, e$2 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$3.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$3.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$5 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$2 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2)
    s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else
    for (const e2 of o2) {
      const o3 = document.createElement("style"), n3 = t$1.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
    }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$5(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$1, defineProperty: e$1, getOwnPropertyDescriptor: r$4, getOwnPropertyNames: h$1, getOwnPropertySymbols: o$2, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$1(t2, s2), y$1 = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 };
Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ??= []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== r2 && e$1(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: h2 } = r$4(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2?.call(this);
    }, set(s3) {
      const r2 = e2?.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties")))
      return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...h$1(t3), ...o$2(t3)];
      for (const i2 of s2)
        this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2)
        for (const [t3, i2] of s2)
          this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2)
        i2.unshift(c$2(s3));
    } else
      void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys())
      this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$EC(t2, s2) {
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const r2 = (void 0 !== i2.converter?.toAttribute ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$1;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    if (void 0 !== t2) {
      if (i2 ??= this.constructor.getPropertyOptions(t2), !(i2.hasChanged ?? f$1)(this[t2], s2))
        return;
      this.P(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s2, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i2.reflect && this._$Em !== t2 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t4, s3] of this._$Ep)
          this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [s3, i2] of t3)
          true !== i2.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i2);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EU();
    } catch (s3) {
      throw t2 = false, this._$EU(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej &&= this._$Ej.forEach((t3) => this._$EC(t3, this[t3])), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d$1("elementProperties")] = /* @__PURE__ */ new Map(), b[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({ ReactiveElement: b }), (a$1.reactiveElementVersions ??= []).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, i = t.trustedTypes, s$1 = i ? i.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o$1 = "?" + h, n$1 = `<${o$1}>`, r$3 = document, l = () => r$3.createComment(""), c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator], d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = y(1), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r$3.createTreeWalker(r$3, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s$1 ? s$1.createHTML(i2) : i2;
}
const P = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); )
      y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n$1 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e + s3.slice(d2) + h + x2) : s3 + h + (-2 === d2 ? i3 : x2);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
class V2 {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
    if (this.el = V2.createElement(f2, n3), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e)) {
              const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
              d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o$1)
          d2.push({ type: 2, index: c2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); )
            d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r$3.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function N(t2, i2, s2 = t2, e2) {
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class S {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? r$3).importNode(i2, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L2(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n3];
      }
      o2 !== l2?.index && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r$3, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$3.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V2.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2)
      this._$AH.p(i2);
    else {
      const t3 = new S(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V2(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2)
      e2 === i2.length ? i2.push(s2 = new M(this.S(l()), this.S(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    for (this._$AP?.(false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++)
        r2 = N(this, e3[s2 + n3], i2, n3), r2 === w && (r2 = this._$AH[n3]), o2 ||= !c(r2) || r2 !== this._$AH[n3], r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class H extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
}
class I extends R {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L2 {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const Z = t.litHtmlPolyfillSupport;
Z?.(V2, M), (t.litHtmlVersions ??= []).push("3.1.4");
const j = (t2, i2, s2) => {
  const e2 = s2?.renderBefore ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new M(i2.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t2 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t2.firstChild, t2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = j(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return w;
  }
}
s._$litElement$ = true, s["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s });
const r$2 = globalThis.litElementPolyfillSupport;
r$2?.({ LitElement: s });
(globalThis.litElementVersions ??= []).push("4.0.6");
const styles = i$2`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;
var __decorate$1 = globalThis && globalThis.__decorate || function(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d2 = decorators[i2])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingSiwe = class W3mConnectingSiwe2 extends s {
  constructor() {
    super(...arguments);
    this.dappImageUrl = OptionsController.state.metadata?.icons;
    this.walletImageUrl = StorageUtil.getConnectedWalletImageUrl();
  }
  firstUpdated() {
    const visuals = this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");
    if (visuals?.[0]) {
      this.createAnimation(visuals[0], "translate(18px)");
    }
    if (visuals?.[1]) {
      this.createAnimation(visuals[1], "translate(-18px)");
    }
  }
  render() {
    return x`
      <wui-visual-thumbnail
        ?borderRadiusFull=${true}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `;
  }
  createAnimation(element, translation) {
    element.animate([{ transform: "translateX(0px)" }, { transform: translation }], {
      duration: 1600,
      easing: "cubic-bezier(0.56, 0, 0.48, 1)",
      direction: "alternate",
      iterations: Infinity
    });
  }
};
W3mConnectingSiwe.styles = styles;
W3mConnectingSiwe = __decorate$1([
  customElement("w3m-connecting-siwe")
], W3mConnectingSiwe);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.P(o2, void 0, t2), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
var __decorate = globalThis && globalThis.__decorate || function(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d2 = decorators[i2])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingSiweView = class W3mConnectingSiweView2 extends s {
  constructor() {
    super(...arguments);
    this.dappName = OptionsController.state.metadata?.name;
    this.isSigning = false;
  }
  render() {
    this.onRender();
    return x`
      <wui-flex justifyContent="center" .padding=${["2xl", "0", "xxl", "0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0", "4xl", "l", "4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName ?? "Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0", "3xl", "l", "3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l", "xl", "xl", "xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning ? "Signing..." : "Sign"}
        </wui-button>
      </wui-flex>
    `;
  }
  onRender() {
    if (SIWEController.state.session) {
      ModalController.close();
    }
  }
  async onSign() {
    this.isSigning = true;
    EventsController.sendEvent({
      event: "CLICK_SIGN_SIWE_MESSAGE",
      type: "track",
      properties: {
        network: NetworkController.state.caipNetwork?.id || "",
        isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    try {
      SIWEController.setStatus("loading");
      const session = await SIWEController.signIn();
      SIWEController.setStatus("success");
      EventsController.sendEvent({
        event: "SIWE_AUTH_SUCCESS",
        type: "track",
        properties: {
          network: NetworkController.state.caipNetwork?.id || "",
          isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      return session;
    } catch (error) {
      const preferredAccountType = AccountController.state.preferredAccountType;
      const isSmartAccount = preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT;
      if (isSmartAccount) {
        SnackController.showError("This application might not support Smart Accounts");
      } else {
        SnackController.showError("Signature declined");
      }
      SIWEController.setStatus("error");
      return EventsController.sendEvent({
        event: "SIWE_AUTH_ERROR",
        type: "track",
        properties: {
          network: NetworkController.state.caipNetwork?.id || "",
          isSmartAccount
        }
      });
    } finally {
      this.isSigning = false;
    }
  }
  async onCancel() {
    const isConnected = AccountController.state.isConnected;
    if (isConnected) {
      await ConnectionController.disconnect();
      ModalController.close();
    } else {
      RouterController.push("Connect");
    }
    EventsController.sendEvent({
      event: "CLICK_CANCEL_SIWE",
      type: "track",
      properties: {
        network: NetworkController.state.caipNetwork?.id || "",
        isSmartAccount: AccountController.state.preferredAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
  }
};
__decorate([
  r()
], W3mConnectingSiweView.prototype, "isSigning", void 0);
W3mConnectingSiweView = __decorate([
  customElement("w3m-connecting-siwe-view")
], W3mConnectingSiweView);
function createSIWEConfig(siweConfig) {
  return new Web3ModalSIWEClient(siweConfig);
}
export {
  SIWEController,
  W3mConnectingSiwe,
  W3mConnectingSiweView,
  createSIWEConfig,
  zf as formatMessage,
  getAddressFromMessage,
  getChainIdFromMessage,
  Li as getDidAddress,
  zi as getDidChainId,
  verifySignature
};
