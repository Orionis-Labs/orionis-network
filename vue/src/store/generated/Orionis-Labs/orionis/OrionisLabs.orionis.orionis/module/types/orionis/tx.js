/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
export const protobufPackage = 'OrionisLabs.orionis.orionis';
const baseMsgPaymentMade = { creator: '', transactionId: 0, amount: 0, result: '' };
export const MsgPaymentMade = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.transactionId !== 0) {
            writer.uint32(16).uint64(message.transactionId);
        }
        if (message.amount !== 0) {
            writer.uint32(24).uint64(message.amount);
        }
        if (message.result !== '') {
            writer.uint32(34).string(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgPaymentMade };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.transactionId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.amount = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.result = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgPaymentMade };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.transactionId !== undefined && object.transactionId !== null) {
            message.transactionId = Number(object.transactionId);
        }
        else {
            message.transactionId = 0;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Number(object.amount);
        }
        else {
            message.amount = 0;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = String(object.result);
        }
        else {
            message.result = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.transactionId !== undefined && (obj.transactionId = message.transactionId);
        message.amount !== undefined && (obj.amount = message.amount);
        message.result !== undefined && (obj.result = message.result);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgPaymentMade };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.transactionId !== undefined && object.transactionId !== null) {
            message.transactionId = object.transactionId;
        }
        else {
            message.transactionId = 0;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount;
        }
        else {
            message.amount = 0;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = '';
        }
        return message;
    }
};
const baseMsgPaymentMadeResponse = {};
export const MsgPaymentMadeResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgPaymentMadeResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgPaymentMadeResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgPaymentMadeResponse };
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    PaymentMade(request) {
        const data = MsgPaymentMade.encode(request).finish();
        const promise = this.rpc.request('OrionisLabs.orionis.orionis.Msg', 'PaymentMade', data);
        return promise.then((data) => MsgPaymentMadeResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
