const loadPhone = async (name, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${name}`
  );
  const data = await res.json();
  //    1. where to append the div ;
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

function displayPhone(phones, isShowAll) {
  const phoneContainer = document.getElementById("phone-container");
  // #  clear phone container cards before adding new cards;
  //   phoneContainer.innerHTML = "";
  phoneContainer.textContent = "";
  //   show all btn
  console.log(phones.length);
  const showAll = document.getElementById("show-all");

  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else showAll.classList.add("hidden");

  console.log("is show all :", isShowAll);

  //  display only first 12 phone if not show all;
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // console.log(phonesSlice.length);
  //   for loop section
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

              
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary bg-[#0D6EFD] border-none w-[60%]">Show Details</button>
              

            </div>
            
`;
    // 5.append the child
    phoneContainer.appendChild(phoneCard);
  });
  //   hide the spinner
  toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {
  // show the spinner
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  let searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all btn function
const handleShowAll = () => {
  handleSearch(true);
};

// Show details with Modal
// 1. where am i clicking & define which one is clicked
const handleShowDetails = async (id) => {
  // load single phone data ;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const modalDetails = data.data;
  showModalDetails(modalDetails);
};
// show phone details in this modal;
const showModalDetails = (modalDetails) => {
  // modify the modal
  console.log(modalDetails);

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <!-- img section -->
  <div class="flex justify-center bg-[#0D6EFD0D] p-5 rounded-md">
    <span>
      <img
        src="${modalDetails.image}"
        alt="Images"
      />
    </span>
  </div>
  <!-- ------------------ -->
  <div class="space-y-4 mt-3">
    <h3 class="font-bold text-3xl">${modalDetails.name}</h3>
    <p class="opacity-70">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p>
      <span class="font-semibold text-xl">Storage : </span>${modalDetails.mainFeatures.storage}</p>
    <p>
      <span class="font-semibold text-xl">Display Size : </span>${modalDetails.mainFeatures.displaySize}
    </p>
    <p>
      <span class="font-semibold text-xl">Memory : </span>${modalDetails.mainFeatures.memory}
    </p>
    <p>
      <span class="font-semibold text-xl">Slug :</span>
      ${modalDetails.slug}
    </p>
    <p>
      <span class="font-semibold text-xl">Release data :</span> ${modalDetails.releaseDate}
    </p>
    <p><span class="font-semibold text-xl">Brand :</span> ${modalDetails.brand}</p>
    <p>
      <span class="font-semibold text-xl">GPS : </span>${modalDetails?.others?.GPS || "No GPS"}
    </p>
  </div>

  <div class="modal-action">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn bg-[#DC3545] text-white">Close</button>
    </form>
  </div>
  
  `;
  // -----------------------
  show_modal_details.showModal();
};
