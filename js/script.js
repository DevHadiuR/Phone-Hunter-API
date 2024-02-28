const loadPhone = async (name) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${name}`
  );
  const data = await res.json();
  //    1. where to append the div ;
  const phones = data.data;
  displayPhone(phones);
};

function displayPhone(phones) {
  const phoneContainer = document.getElementById("phone-container");
  // #  clear phone container cards before adding new cards;
  //   phoneContainer.innerHTML = "";
  phoneContainer.textContent = "";
  //   show all btn
  console.log(phones.length);
  const showAll = document.getElementById("show-all");
  if (phones.length > 12) {
    showAll.classList.remove("hidden");
  } else showAll.classList.add("hidden");
  //  display only first 12 phone;
  let phonesSlice = phones.slice(0, 12);
  console.log(phonesSlice.length);
  //   for loop section
  phonesSlice.forEach((phone) => {
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
    // 5.append the child
    phoneContainer.appendChild(phoneCard);
  });
  //   hide the spinner
  toggleLoadingSpinner(false);
}

const handleSearch = () => {
  // show the spinner
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
