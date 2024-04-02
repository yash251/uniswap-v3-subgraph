import { ERCToken } from "../generated/UniswapV3Factory/ERCToken"
import { Address } from '@graphprotocol/graph-ts'

export function getTokenName(tokenAddress: Address): string {
  //binding the address
  let contract = ERCToken.bind(tokenAddress)
  let tokenName = 'unknown'
	
  // calling the try_name() function to retrieve the name
  let name = contract.try_name()
  if (!name.reverted) {
    tokenName = name.value
  }
  return tokenName
}

export function getTokenSymbol(tokenAddress: Address): string {
  //binding the address
  let contract = ERCToken.bind(tokenAddress)
  let tokenSymbol = 'unknown'
	
  // calling the try_symbol() function to retrieve the name
  let symbol = contract.try_symbol()
  if (!symbol.reverted) {
    tokenSymbol = symbol.value
  }
  return tokenSymbol
}