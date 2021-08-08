import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "OrionisLabs.orionis.orionis";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgPaymentMade {
    creator: string;
    transactionId: number;
    amount: number;
    result: string;
}
export interface MsgPaymentMadeResponse {
}
export declare const MsgPaymentMade: {
    encode(message: MsgPaymentMade, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgPaymentMade;
    fromJSON(object: any): MsgPaymentMade;
    toJSON(message: MsgPaymentMade): unknown;
    fromPartial(object: DeepPartial<MsgPaymentMade>): MsgPaymentMade;
};
export declare const MsgPaymentMadeResponse: {
    encode(_: MsgPaymentMadeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgPaymentMadeResponse;
    fromJSON(_: any): MsgPaymentMadeResponse;
    toJSON(_: MsgPaymentMadeResponse): unknown;
    fromPartial(_: DeepPartial<MsgPaymentMadeResponse>): MsgPaymentMadeResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    PaymentMade(request: MsgPaymentMade): Promise<MsgPaymentMadeResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    PaymentMade(request: MsgPaymentMade): Promise<MsgPaymentMadeResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
