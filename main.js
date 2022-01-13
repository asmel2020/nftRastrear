// manipular los dom
const loginBtn = document.querySelector("#login");
const imagen = document.querySelector("#lista");
const nftBalance = document.querySelector("#balance");
const Idnft = document.querySelector("#Idnft");
const send =document.querySelector("#send");
const wallet=document.querySelector("#wallet");
console.log(wallet.value);
let user = Moralis.User.current();

var d='';
var senNft='';

const imas = async () => {
  let nft = await balanceNft();
  const ad = nft.map((img) => {
    return {
      id: img.token_id,
      url: img.token_uri,
    };
  });
  nftBalance.innerHTML=`Balance Nft : ${ad.length}`

  
  for (let index = 0; index < ad.length; index++) {

    const imag = await fetch(ad[index].url);
    const {image} = await imag.json();

    console.log(image);
    senNft=`${senNft}<option value=" ${ad[index].id}"> ${ad[index].id}</option>`;

   
    d=`${d}<section  class="col-3">
    <div class="card" style="width: 18rem">
    <img
    src='${image}'
      class="card-img-top"
      alt="Imagem de capa do card"
    />
    <div class="card-body dd">
      <p class="card-text">
       id : ${ad[index].id}
      </p>
    </div>
  </div>
  </section>`;

  }
  imagen.innerHTML=d;
  Idnft.innerHTML=senNft;
};



if (user) {
  loginBtn.innerHTML = cutWalletAddress(user.get("ethAddress"));
  imas();
} else {
  nftBalance.innerHTML=`Balance Nft : 0`;
  imagen.innerHTML="";
  loginBtn.innerHTML = "Login";
}

//eventos
loginBtn.addEventListener("click", async () => {
  let loginApp = await login();

  if (loginApp) {
    imas();
  }else{
    nftBalance.innerHTML=`Balance Nft : 0`;
    imagen.innerHTML="";
  }
});

send.addEventListener('click', async()=>{

  const user = Moralis.User.current();
  if(user){
    await Moralis.enableWeb3();
    const options = {type: "erc721",  
    receiver: wallet.value,
    contractAddress: addressNft,
    tokenId: 1}
  Moralis.transfer(options).on("transactionHash", (hash) => {

    })
    .on("receipt", (receipt) => { 
      alert('completado');
     })
    .on("confirmation", (confirmationNumber, receipt) => { 
  
    })
    .on("error", (error) => { 
  
     });
  }else{
    alert("logue");
  }
})
