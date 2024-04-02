import {
  PoolCreated as PoolCreatedEvent
} from "../generated/UniswapV3Factory/UniswapV3Factory"
import { Pool, Token } from "../generated/schema"
import { getTokenName, getTokenSymbol } from "./tokenUtils"
import { BigInt } from "@graphprotocol/graph-ts"

export function handlePoolCreated(event: PoolCreatedEvent): void {
  let token0 = Token.load(event.params.token0.toHexString())
  let token1 = Token.load(event.params.token1.toHexString())

  if (token0 === null) {
    token0 = new Token(event.params.token0.toHexString())
    token0.name = getTokenName(event.params.token0)
    token0.symbol = getTokenSymbol(event.params.token0)
  }

  if (token1 === null) {
    token1 = new Token(event.params.token1.toHexString())
    token1.name = getTokenName(event.params.token1)
    token1.symbol = getTokenSymbol(event.params.token1)
  }

  let pool = new Pool(event.params.pool.toHexString()) as Pool
  pool.token0 = token0.id
  pool.token1 = token1.id
  pool.timestamp = event.block.timestamp
  pool.blockNumber = event.block.number
  pool.feeAmount = BigInt.fromI32(event.params.fee)

  token0.save()
  token1.save()
  pool.save()
}
