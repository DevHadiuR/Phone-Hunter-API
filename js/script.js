const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  //    1. where to append the div ;
  const phones = data.data;
  displayPhone(phones);
};

function displayPhone(phones) {
  const phoneContainer = document.getElementById("phone-container");
  //   console.log(phones);
  phones.forEach((phone) => {
    console.log(phone);
    //2. create a div
    const phoneCard = document.createElement("div");
    //3.create a class list for the div(can copy from daisy ui)
    phoneCard.classList =
      "card bg-base-100 shadow-xl p-6 border border-gray-300";
    //    4.create a inner html for the cards
    phoneCard.innerHTML = `

           <figure
           class="border-2 rounded-xl p-7 bg-[#0D6EFD0D]">
           
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>

            <div class="flex flex-col items-center text-center space-y-4 mt-4">

              <h2 class="card-title">${phone.phone_name}</h2>

              <p>There are many variations of passages of available, but the majority have suffered</p>

              <h3 class="text-2xl font-semibold">$999</h3>

              
                <button class="btn btn-primary bg-[#0D6EFD] border-none w-[60%]">Show Details</button>
              

            </div>
            
`;

    phoneContainer.appendChild(phoneCard);
  });
}

loadPhone();
