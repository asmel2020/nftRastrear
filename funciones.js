/* Moralis init code */
const serverUrl = SERVER_URL;
const appId = APP_ID;
const addressNft =ADDRESS_NFT;
Moralis.start({ serverUrl, appId });

const login = async () => {
  const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();
  if (!isMetaMaskInstalled) {
    alert("install metamask");
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      "_blank"
    );
    return false;
  }

  await Moralis.enableWeb3();

  let user = Moralis.User.current();
  const chainIds = await Moralis.getChainId();
  console.log(chainIds);
  //@dev verify that the user is on the correct network
  if (!(chainIds === 4)) {
    
    /*/@dev register the network if it does not exist
    const chainId = 4;
    const chainName = "Rede de testes Rinkeby";
    const currencyName = "ETH";
    const currencySymbol = "ETH";
    const rpcUrl ="https://speedy-nodes-nyc.moralis.io/256a0fcaf30c6c2c2c8e1932/eth/rinkeby";
    const blockExplorerUrl = "https://rinkeby.etherscan.io";

    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    );*/

    //@dev switch user to correct network
    const ChangeChainId = '0x4';
    const chainIdHex = await Moralis.switchNetwork(ChangeChainId);
  }

  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "hola mundo",
    })
      .then(function (user) {
        loginBtn.innerHTML = cutWalletAddress(user.get("ethAddress"));
        
      })
      .catch(function (error) {
        console.log(error);
      });

    return true;
  } else {
    await Moralis.User.logOut();
    loginBtn.innerHTML = "Login";
  }
};

const balanceTokens = async () => {

  await Moralis.Web3API.account.getNativeBalance({ chain: "rinkeby" });
  //0x12b14d63956ed4a3653da0a893adb950fcbf369c
  const options1 = { chain: 'rinkeby',token_address: addressNft };

 
};

const balanceNft = async()=>{
  const options1 = { chain: 'rinkeby',token_address:addressNft };
  const {result}= await Moralis.Web3API.account.getNFTsForContract(options1);
  console.log(result);
  return result;
}
