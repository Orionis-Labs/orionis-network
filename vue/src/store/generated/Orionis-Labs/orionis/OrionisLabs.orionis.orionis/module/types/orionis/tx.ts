/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'OrionisLabs.orionis.orionis'

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgPaymentMade {
  creator: string
  transactionId: number
  amount: number
  result: string
}

export interface MsgPaymentMadeResponse {}

const baseMsgPaymentMade: object = { creator: '', transactionId: 0, amount: 0, result: '' }

export const MsgPaymentMade = {
  encode(message: MsgPaymentMade, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.transactionId !== 0) {
      writer.uint32(16).uint64(message.transactionId)
    }
    if (message.amount !== 0) {
      writer.uint32(24).uint64(message.amount)
    }
    if (message.result !== '') {
      writer.uint32(34).string(message.result)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgPaymentMade {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgPaymentMade } as MsgPaymentMade
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.transactionId = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.amount = longToNumber(reader.uint64() as Long)
          break
        case 4:
          message.result = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgPaymentMade {
    const message = { ...baseMsgPaymentMade } as MsgPaymentMade
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.transactionId !== undefined && object.transactionId !== null) {
      message.transactionId = Number(object.transactionId)
    } else {
      message.transactionId = 0
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Number(object.amount)
    } else {
      message.amount = 0
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = String(object.result)
    } else {
      message.result = ''
    }
    return message
  },

  toJSON(message: MsgPaymentMade): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.transactionId !== undefined && (obj.transactionId = message.transactionId)
    message.amount !== undefined && (obj.amount = message.amount)
    message.result !== undefined && (obj.result = message.result)
    return obj
  },

  fromPartial(object: DeepPartial<MsgPaymentMade>): MsgPaymentMade {
    const message = { ...baseMsgPaymentMade } as MsgPaymentMade
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.transactionId !== undefined && object.transactionId !== null) {
      message.transactionId = object.transactionId
    } else {
      message.transactionId = 0
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount
    } else {
      message.amount = 0
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = object.result
    } else {
      message.result = ''
    }
    return message
  }
}

const baseMsgPaymentMadeResponse: object = {}

export const MsgPaymentMadeResponse = {
  encode(_: MsgPaymentMadeResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgPaymentMadeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgPaymentMadeResponse } as MsgPaymentMadeResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgPaymentMadeResponse {
    const message = { ...baseMsgPaymentMadeResponse } as MsgPaymentMadeResponse
    return message
  },

  toJSON(_: MsgPaymentMadeResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgPaymentMadeResponse>): MsgPaymentMadeResponse {
    const message = { ...baseMsgPaymentMadeResponse } as MsgPaymentMadeResponse
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  PaymentMade(request: MsgPaymentMade): Promise<MsgPaymentMadeResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  PaymentMade(request: MsgPaymentMade): Promise<MsgPaymentMadeResponse> {
    const data = MsgPaymentMade.encode(request).finish()
    const promise = this.rpc.request('OrionisLabs.orionis.orionis.Msg', 'PaymentMade', data)
    return promise.then((data) => MsgPaymentMadeResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
