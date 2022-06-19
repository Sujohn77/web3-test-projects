## Metamask extension with account required

## [1 - Interact with Smart Contracts in React]

```
    npm i
    cd truffle
    npm i
    npx ganache-cli
    npx truffle migrate
```

## [2 - Build an NFT Marketplace in Solidity]

```
    npm i
    npx ganache-cli
    npx truffle migrate

```

## Testing contracts

```
    npx truffle console

    let t = await NFT.deployed()
    t.mint()
    let m = await Market.deployed()
    t.approve(m.address, <id>)
    m.listToken(t.address, <id>, <price>)
    m.getListing(<id>)
```
