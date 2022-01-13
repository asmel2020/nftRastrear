//@dev corta la wallet para una mejor visualisacion formato 0x254...56aa
const cutWalletAddress = (wallet)=>"Logout ("+wallet.slice(0,5)+"..."+wallet.slice(38,42)+")";