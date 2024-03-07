$(document).ready(function () {
    const search_params = new URLSearchParams(window.location.search);
    let search = search_params.get('search');
    console.log(search);
    const pagination = document.getElementById("pagination");

    let thisPage = 1;
    const rowsonPage = 4;

    let allUsersNavButton = document.getElementById("all-users-nav-button");
    allUsersNavButton/addEventListener("click", ()=>{
        window.location.href = "./users.html"
    })

    $.ajax({
        url: '../backend/search.php',
        method: 'GET',
        data : {
            search_param : search
        },
        dataType: 'json',
        success: function (tableData) {
            displayer(tableData)
            const totalPages = Math.ceil(tableData.length / rowsonPage);
            displayPagination(totalPages)
        },
        error: function (error) {
            console.error('Error fetching users:', error);
        }
    });


    function displayer(data) {
        const tableBody = document.querySelector("tbody");
        const startIndex = (thisPage - 1) * rowsonPage;
        const endIndex = startIndex + rowsonPage;
        const paginatedData = data.slice(startIndex, endIndex);

        tableBody.innerHTML = "";


        paginatedData.forEach((item) => {
            const row = document.createElement("tr");
            let rowDataId = document.createElement("td")
            rowDataId.innerHTML = item.user_id;
            let rowDataNames = document.createElement("td")
            rowDataNames.innerHTML = item.names;
            let rowDataEmail = document.createElement("td")
            rowDataEmail.innerHTML = item.email;
            let rowDataPassword = document.createElement("td")
            rowDataPassword.innerHTML = item.password;
            let rowDataCheck = document.createElement("td")
            let rowDataCheckInput = document.createElement("input")
            rowDataCheckInput.type = "checkbox";
            rowDataCheckInput.id = "tableCheckBoxes";
            rowDataCheckInput.dataset.id = item.user_id
            rowDataCheck.appendChild(rowDataCheckInput);
            let rowDataButton = document.createElement("td")
            let rowDataButtonInput = document.createElement("input")
            rowDataButtonInput.type = "button"
            rowDataButtonInput.setAttribute("value", "Edit")
            rowDataButtonInput.setAttribute("id", "edit")
            rowDataButtonInput.setAttribute("data-id", item.user_id)
            rowDataButtonInput.setAttribute("data-names", item.names)
            rowDataButtonInput.setAttribute("data-email", item.email)
            rowDataButtonInput.setAttribute("data-password", item.password)
            rowDataButtonInput.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("tcgfgvjh");
                const userId = rowDataButtonInput.getAttribute("data-id");
                const userNames = rowDataButtonInput.getAttribute("data-names");
                const email = rowDataButtonInput.getAttribute("data-email");
                const userPassword = rowDataButtonInput.getAttribute("data-password");
                const editForm = document.getElementById("edit-form");
                editForm.setAttribute("data-user-id", userId);
                editForm.style.display = "block"


                const idInput = document.getElementById("edit-id");
                idInput.setAttribute("value", userId);
                const nameInput = document.getElementById("edit-name");
                nameInput.setAttribute("value", userNames);
                const emailInput = document.getElementById("edit-email");
                emailInput.setAttribute("value", email);
                const passwordInput = document.getElementById("edit-password");
                passwordInput.setAttribute("value", userPassword);

                $("#Save").click(function (e) {
                    e.preventDefault();
                    let dataUpdated = {
                        id: idInput.value,
                        name: nameInput.value,
                        email: emailInput.value,
                        password: passwordInput.value
                    }
                    console.log("form submitted", dataUpdated);
                    $.ajax({
                        url: "../backend/update.php",
                        method: "POST",
                        data: dataUpdated,
                        success: function (response) {
                            console.log("successful", response);
                        },
                        error: function (error) {
                            console.log("failed", error);
                        }
                    })
                })
            })
            rowDataButton.appendChild(rowDataButtonInput)
            row.appendChild(rowDataId)
            row.appendChild(rowDataNames)
            row.appendChild(rowDataEmail)
            row.appendChild(rowDataPassword)
            row.appendChild(rowDataCheck)
            row.appendChild(rowDataButton)
            // row.innerHTML = `
            //       <td>${item.user_id}</td>
            //       <td>${item.names}</td>
            //       <td>${item.email}</td>
            //       <td>${item.password}</td>
            //       <td> 
            //       <input type="checkbox" id="tableCheckBoxes" data-id="${item.user_id}">
            //       </td>
            //       <td> <input type="button" value="Edit" id="edit" data-id=${item.user_id} data-names=${item.names} data-email=${item.email}
            //         data-password=${item.password}
            //       ></td>
            //       </tr>
            //   `;
            tableBody.appendChild(row);
        });

        // const editBtn = document.getElementById("edit");
        // editBtn.addEventListener("click", (e) => {
        //     e.preventDefault();
        //     console.log("tcgfgvjh");
        //     const userId = editBtn.getAttribute("data-id");
        //     const userNames = editBtn.getAttribute("data-names");
        //     const email = editBtn.getAttribute("data-email");
        //     const userPassword = editBtn.getAttribute("data-password");
        //     const editForm = document.getElementById("edit-form");
        //     editForm.setAttribute("data-user-id", userId);
        //     editForm.style.display = "block"

        //     const nameInput = document.getElementById("edit-name");
        //     nameInput.setAttribute("value", userNames);
        //     const emailInput = document.getElementById("edit-email");
        //     emailInput.setAttribute("value", email);
        //     const passwordInput = document.getElementById("edit-password");
        //     passwordInput.setAttribute("value", userPassword);

        //     $("#Save").click(function (e) {
        //         e.preventDefault();

        //         console.log("form submitted")
        //         $.ajax({
        //             url: "../backend/update.php",
        //             method: "POST",
        //             data: {
        //                 name: nameInput.value,
        //                 email: emailInput.value,
        //                 password: passwordInput.value
        //             },
        //             success: function (response) {
        //                 console.log("successful", response);
        //             },
        //             error: function (error) {
        //                 console.log("failed", error);
        //             }
        //         })
        //     })

        // });


    }

    // function filterUsers(searchTerm, data) {
    //     const tableBody = document.querySelector("tbody");
    //     const startIndex = (thisPage - 1) * rowsonPage;
    //     const endIndex = startIndex + rowsonPage;
    //     const paginatedData = data.slice(startIndex, endIndex);

    //     tableBody.innerHTML = "";


    //     paginatedData.filter(data => data.names == searchTerm.toLowerCase()).forEach((item) => {
    //         const row = document.createElement("tr");
    //         row.innerHTML = `
    //               <td>${item.user_id}</td>
    //               <td>${item.names}</td>
    //               <td>${item.email}</td>
    //               <td>${item.password}</td>
    //               <td> 
    //               <input type="checkbox" id="tableCheckBoxes" data-id="${item.user_id}">
    //               </td>
    //               <td> <input type="button" value="Edit" id="edit" data-id=${item.user_id} data-names=${item.names} data-email=${item.email}
    //                 data-password=${item.password}
    //               ></td>
    //               </tr>
    //           `;
    //         tableBody.appendChild(row);
    //     });
    // }

    function displayPagination(totalPages) {
        $.ajax({
            url: '../backend/users.php',
            type: "GET",
            success: (tableData) => {
                pagination.innerHTML = "";

                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement("button");
                    btn.innerText = "T" + i;

                    btn.classList.add("pagination-btn");
                    if (i === thisPage) {
                        btn.classList.add("active");
                    }
                    btn.addEventListener("click", function () {
                        thisPage = i;
                        displayer(tableData);
                        displayPagination(totalPages);
                    });
                    pagination.appendChild(btn);
                }
            }
        })
    }

    $("#delete").on("click", function () {
        deleteItem()
    })


    function deleteRow(id) {
        console.log(id)
        $.ajax({
            url: "../backend/delete.php",
            type: "DELETE",
            data: { id }
        })
    }

    function deleteItem() {
        $.ajax({
            url: "../backend/users.php",
            type: "GET",
            success: (tableData) => {
                const checkboxes = document.querySelectorAll("#tableCheckBoxes:checked");
                console.log(checkboxes)
                checkboxes.forEach((checkbox) => {
                    console.log(checkbox)
                    const id = parseInt(checkbox.getAttribute("data-id"));
                    tableData.splice(tableData.findIndex((item) => item.id == id), 1)
                    deleteRow(id);
                })

                displayer(tableData);
                const totalPages = Math.ceil(tableData.length / rowsonPage);
                displayPagination(totalPages);
            },
            error: function (error) {
                console.log("error  occured in your codes", error);
            }
        })
    }



})
