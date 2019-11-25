//materialize

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('content_home').hidden = false;
});

var menuvalues = document.getElementsByClassName('menuitem');

for (var loop = 0; loop < menuvalues.length; loop++) {
    menuvalues[loop].addEventListener('click', function (evt) { doMenu(evt) });
}

function doMenu(firedEvent) {
    // var allChildren = firedEvent.target.parentNode.children;
    // for (loop = 0; loop < allChildren.length; loop++) {
    //     allChildren[loop].style.borderBottom = '0';
    // }
    // firedEvent.target.style.borderBottom = '4px solid rgb(255, 93, 93)';
    var eventID = firedEvent.target.id;
    var eventIDArray = eventID.split('_');
    var newID = 'content_' + eventIDArray[1];
    var otherContentChildren = document.getElementById(newID).parentNode.children;

    for (loop = 0; loop < otherContentChildren.length; loop++) {
        otherContentChildren[loop].hidden = true;
    }
    if (newID == "content_home") {
        check_login()
        document.getElementById(newID).hidden = false;
    } else {
        document.getElementById(newID).hidden = false;
    }
}

function toasthide() {
    var toastElement = document.querySelector('.toast');
    var toastInstance = M.Toast.getInstance(toastElement);
    toastInstance.dismiss();
}

// var instance = M.Tabs.init(el);

// M.AutoInit();
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, { coverTrigger: false });
    
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, { format: 'yyyy-mm-dd', minDate: new Date() });

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    var slider = document.getElementById('test-slider');
    var array_of_dom_elements = document.querySelectorAll("input[type=range]");
    M.Range.init(array_of_dom_elements);

});

function dark_mode() {
    if (localStorage.getItem("dark_mode") == "dark") {
        localStorage.setItem("dark_mode", "light");
        document.documentElement.removeAttribute('data-theme', 'dark');
        // document.body.style.backgroundColor = localStorage.getItem("dark_mode");
    } else {
        localStorage.setItem("dark_mode", "dark");
        document.documentElement.setAttribute('data-theme', 'dark');
        // document.body.style.backgroundColor = localStorage.getItem("dark_mode");
    }
}
function check_dark_mode() {
    if (localStorage.getItem("dark_mode") != null) {
        // document.body.style.backgroundColor = localStorage.getItem("bodycolour");
        if (localStorage.getItem('dark_mode') == "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById("emp_dark").checked = true;
            document.getElementById("manager_dark").checked = true;
        }
    }
}

function status_validation(e) {

}

function validation(passed_value, passed_case) {
    var error_message_input = passed_value.parentNode.lastChild.previousSibling;
    var string = passed_value.value;
    var error_message = "";
    if (passed_case == 'ctype_alpha') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^[a-zA-Z]+$/.test(string) == false) {
            error_message = "Must contain only letters";
        }
    }

    if (passed_case == 'description') {
        if (string == "") {
            error_message = "Fill out field";
        }
    }
    if (passed_case == 'username') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^[a-zA-Z0-9]{5,}$/.test(string) == false) {
            error_message = "Must be 5 characters long and can contain both letters and numbers";
        }
    }
    if (passed_case == 'name') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^([a-zA-Z' ]+)$/.test(string) == false) {
            error_message = "Must contain only letters";
        }
    }
    if (passed_case == 'email') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string) == false) {
            error_message = "Must be a valid email address";
        }
    }
    if (passed_case == 'phone') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^[\+ ]?[( ]?[0-9 ]{3}[) ]?[-\s\. ]?[0-9 ]{3}[-\s\. ]?[0-9 ]{4,6}$/.test(string) == false) {
            error_message = "Must be a valid phone number";
        }
        string = string.replace("/", "");
        string = string.replace("+", "");
        string = string.replace("_", "");
        string = string.replace("-", "");
        string = string.replace("(", "");
        string = string.replace(")", "");
        string = string.replace(".", "");
        passed_value.value = string;
    }
    if (passed_case == 'select') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (string <= 0 | string == null) {
            error_message = "Must select a valid option";
        }
    }
    if (passed_case == 'ctype_alnum') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^[a-z0-9 ]+$/i.test(string) == false) {
            error_message = "Must contain letters and numbers only";
        }
    }
    if (passed_case == 'date') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^(20[1-4][0-9])[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/.test(string) == false) {
            error_message = "Must be valid date and before 2050";
        }
    }
    if (passed_case == 'date_again') {
        var first_date = document.getElementById("date_start").value;
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^(20[1-4][0-9])[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/.test(string) == false) {
            error_message = "Must be valid date and before 2050";
        } else if (string < first_date) {
            error_message = "Must be later then start date";
        }
    }
    if (passed_case == 'number') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (string <= 0 | string == null) {
            error_message = "Must be valid number";

        }
    }
    if (passed_case == 'password') {
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(string) == false) {
            error_message = "Must contain at least 1 number, 1 letter and be 5 characters long";
        }
    }
    if (passed_case == 'password_again') {
        var first_password = document.getElementById("create_password").value;
        if (string == "") {
            error_message = "Fill out field";
        } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(string) == false) {
            error_message = "Must contain at least 1 number, 1 letter and be 5 characters long";
        } else if (string != first_password) {
            error_message = "Passwords much match";
        }
    }
    //all the checks for correct fields
    if (error_message_input.classList.contains("error_message")) {
    } else {
        error_message_input = passed_value.parentNode.parentNode.lastChild.previousSibling;
    }
    error_message_input.innerHTML = error_message;
    var form_loop_id = passed_value.parentNode.parentNode.parentNode.id;
    var form_submit_button = passed_value.parentNode.parentNode.parentNode.lastChild.previousSibling;
    
    if (form_loop_id != "create_project_form") {
        form_loop_id = passed_value.parentNode.parentNode.parentNode.parentNode.id;
        if (form_loop_id != "create_project_form") {
            form_loop_id = passed_value.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        }
    }
    if (form_submit_button.type != "submit") {
        form_submit_button = passed_value.parentNode.parentNode.parentNode.parentNode.lastChild.previousSibling;
        if (form_submit_button.type != "submit") {
            form_submit_button = passed_value.parentNode.parentNode.parentNode.parentNode.parentNode.lastChild.previousSibling
        }
    }
    var error_messages = eval(form_loop_id).querySelectorAll('.error_message');
    var status_of_form = true;
    for (i = 0; i < error_messages.length; ++i) {
        if (error_messages[i].textContent.length > 0) {
            status_of_form = false;
        }
    }
    if (status_of_form == true) {
        form_submit_button.disabled = false;
    } else if (status_of_form == false) {
        form_submit_button.disabled = true;
    }
}

function populate_job_type_field() {
    var arrayFromStorage = JSON.parse(localStorage.getItem("job_types"));
    var arrayLength = arrayFromStorage.length;
    if (job_type_user.children.length != arrayLength) {
        var outHTML = '';
        if (arrayLength == 0) {
            outHTML = "<option  disabled selected>No Job Types</option>"
        } else {
            for (loop = 0; loop < arrayLength; loop++) {
                outHTML += "<option value='" + arrayFromStorage[loop].job_type_id + "'>" + arrayFromStorage[loop].job_name + "</option>"
            }
            job_type_user.innerHTML = outHTML;
        }
    }
}
function populate_employee_field() {

    var arrayFromStorage = JSON.parse(localStorage.getItem("Employees"));
    var arrayLength = arrayFromStorage.length;
    var list_of = document.getElementsByClassName("list_of");
    var loop_check = false;
    for (var i = 0; i < list_of.length; i++) {
        if (list_of[i].children.length != arrayLength) {
            loop_check = true;
        } else {
            loop_check = false
        }
    }
    if (loop_check == true) {
        var outHTML = ' ';
        if (arrayLength == 0) {
            outHTML = "<option  disabled selected>No Employees</option>"
        } else {
            for (loop = 0; loop < arrayLength; loop++) {
                outHTML += "<option value='" + arrayFromStorage[loop].users_id + "'>" + arrayFromStorage[loop].Fullname + "</option>"
            }

        }
        for (var i = 0; i < list_of.length; i++) {
            list_of[i].innerHTML = outHTML;
        }
    }

}
function pop_delete_project() {
    var arrayFromStorage = JSON.parse(localStorage.getItem("delete_projects"));
    var arrayLength = arrayFromStorage.length;
    if (project_delete.children.length != arrayLength) {
        var outHTML = '';
        if (arrayLength == 0) {
            outHTML = "<option  disabled selected>No Projects</option>"
        } else {
            for (loop = 0; loop < arrayLength; loop++) {
                outHTML += "<option value='" + arrayFromStorage[loop].project_id + "'>" + arrayFromStorage[loop].project_name + "</option>"
            }
            project_delete.innerHTML = outHTML;
        }
    }
}


// var arrayFromStorage = JSON.parse(localStorage.getItem("Employees"));
// var arrayLength = arrayFromStorage.length;
// var outHTML1 = '';
// for (loop = 0; loop < arrayLength; loop++) {
//     outHTML1 += "<option value='" + arrayFromStorage[loop].users_id + "'>" + arrayFromStorage[loop].Fullname + "</option>"
// }


//json

//action json
function check_password(i) {
    i.preventDefault();
    var user_name = i.srcElement.username.value;
    var HTMLTemplate = create_password_form.innerHTML;
    var url = "model/ws.php?";
    var formData = new FormData();
    formData.append('main', 'check_if_pass');
    formData.append('username', user_name);
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    var outHTML = '';

                    if (data.password == 'not exists') {
                        outHTML += HTMLTemplate.replace(/{{user_name}}/g, user_name);
                        form_create_password.innerHTML = outHTML;
                        var model_pass = document.getElementById("modal_create_password");
                        var instance = M.Modal.init(model_pass);
                        instance.open();
                        form_login.reset();
                    } else if (data.password == 'exists') {
                        submit_login(user_name);
                        form_login.reset();
                    } else {
                        M.toast({ html: "Login Failed", displayLength: 10000 });
                        document.getElementById("toast-container").addEventListener("click", toasthide);
                        form_login.reset();
                    }
                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function check_login() {
    if (localStorage.getItem("user_details") != null) {
        logged_in_false.hidden = true;
        logged_in_true.hidden = false;
        spinner_loader.hidden = false;
        project_container.hidden = true;
        load_session();
        var user = JSON.parse(localStorage.getItem("user_details"));
        if (user.access == 1) {
            employee_access.hidden = true;
            manager_access.hidden = false;
        } else {
            employee_access.hidden = false;
            manager_access.hidden = true;
        }
    } else if (localStorage.getItem("user_details") === null) {
        console.log("error");
        logged_in_false.hidden = false;
        logged_in_true.hidden = true;
    }
}

function submit_login(user_name) {
    var pass = document.getElementById("password").value;
    var url = "model/ws.php?";
    var formData = new FormData();
    formData.append('main', 'login');
    formData.append('login_name', user_name);
    formData.append('pass', pass);
    fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include"
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }
            response.json().then(function (data) {
                if (data.login == true) {
                    localStorage.setItem("user_details", JSON.stringify(data))
                    check_login();
                    form_login.reset();
                    if (data.access == 1) {
                        load_job_type();
                        all_employees();
                        load_projects();
                    }
                } else {
                    form_login.reset();
                    M.toast({ html: "Login Failed", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                }
                // localStorage.setItem("user_details", JSON.stringify(data))
            });
        })


        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function logout(i) {
    i.preventDefault();
    var url = "model/ws.php?main=logout";
    fetch(url, {
        method: "GET",
        credentials: "include"
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }
            response.json().then(function (data) {
                if (data.Logout == "Complete") {
                    localStorage.removeItem('user_details');
                    localStorage.removeItem('users_projects');
                    localStorage.removeItem('job_types');
                    localStorage.removeItem('delete_projects');
                    localStorage.removeItem('Employees');
                    check_login();
                } else {
                    M.toast({ html: "Logout Error", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                }
            });
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function create_password(i) {
    i.preventDefault();
    var password_one = i.srcElement.create_password.value;
    var password_again = i.srcElement.create_password_again.value;
    var user_id_create = i.srcElement.user_id_create.value;
    if (password_one == password_again) {
        var url = "model/ws.php?";
        var formData = new FormData();
        formData.append('main', 'create_password');
        formData.append('user_id_create', user_id_create);
        formData.append('password_one', password_again);
        formData.append('password_again', password_again);
        fetch(url, {
            method: "POST",
            body: formData,
            credentials: "include"
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }
                response.json().then(function (data) {
                    if (data.Password == "Complete") {
                        var model_pass = document.getElementById("modal_create_password");
                        var instance = M.Modal.init(model_pass);
                        instance.close();
                        M.toast({ html: "Password Create Success", displayLength: 10000 });
                        document.getElementById("toast-container").addEventListener("click", toasthide)
                    } else {
                        M.toast({ html: "Password Create Failed", displayLength: 10000 });
                        document.getElementById("toast-container").addEventListener("click", toasthide)
                    }
                });
            })


            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    } else {
        M.toast({ html: "Passwords didnt match", displayLength: 10000 });
        document.getElementById("toast-container").addEventListener("click", toasthide);
    }

}
function confirm_delete_project(i) {
    i.preventDefault();
    var selected_project_name = project_delete.options[project_delete.selectedIndex].text;
    HTMLTemplate = confirmation.innerHTML;
    var outHTML = '';
    outHTML += HTMLTemplate.replace(/{{project_name_confirm}}/g, selected_project_name);
    model_confirmation.innerHTML = outHTML;
    var model_pass = document.getElementById("model_confirmationer");
    var instance = M.Modal.init(model_pass);
    instance.open();
}

function delete_project() {
    var project_delete_id = project_delete.value;
    var url = "model/ws.php?main=delete_project&project_delete=" + project_delete_id + "";
    fetch(url, {
        method: "GET",
        credentials: "include"
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }
            response.json().then(function (data) {
                if (!data.error) {
                    var project_delete_id = project_delete.value;
                    var arrayFromStorage = [];
                    var arraytostorage = [];
                    arrayFromStorage = JSON.parse(localStorage.getItem("delete_projects"));
                    arrayLength = arrayFromStorage.length
                    for (var loop = 0; loop < arrayLength; loop++) {
                        var temp = new Object();
                        if (arrayFromStorage[loop].project_id != project_delete_id) {
                            temp["project_id"] = arrayFromStorage[loop].project_id;
                            temp["project_name"] = arrayFromStorage[loop].project_name;
                            arraytostorage.push(temp);
                        }
                    }
                    localStorage.setItem("delete_projects", JSON.stringify(arraytostorage));
                    pop_delete_project();


                    M.toast({ html: "Project Deleted", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                } else {
                    M.toast({ html: "Delete Project Failed", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                }
            });
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function create_employee(i) {
    i.preventDefault();
    var create_username = i.srcElement.create_username.value;
    var create_first = i.srcElement.create_first.value;
    var create_last = i.srcElement.create_last.value;
    var create_email = i.srcElement.create_email.value;
    var create_phone = i.srcElement.create_phone.value;
    var job_type_user = i.srcElement.job_type_user.value;

    var url = "model/ws.php?";
    var formData = new FormData();
    formData.append('main', 'create_employee');
    formData.append('create_username', create_username);
    formData.append('first', create_first);
    formData.append('last', create_last);
    formData.append('email', create_email);
    formData.append('phone', create_phone);
    formData.append('job_type_user', job_type_user);

    fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include"
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }
            response.json().then(function (data) {
                if (!data.error) {
                    var arrayFromStorage = []
                    var json_insert = data;
                    arrayFromStorage = JSON.parse(localStorage.getItem("Employees"));
                    arrayFromStorage.push(json_insert);
                    localStorage.setItem("Employees", JSON.stringify(arrayFromStorage));
                    form_create_employee.reset();
                    M.toast({ html: "Employee Created", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                } else {
                    M.toast({ html: "Employee Create Failed", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                }
            });
        })


        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}
function create_project(i) {
    i.preventDefault();

    // var num_task = i.srcElement.num_task.value;
    // console.log(i.srcElement.task_name1.value);
    // for (var q = 1; q <= num_task; q++){
    //     var test = "i.srcElement.task_name"+[q]+".value";
    //     console.log(eval(test));
    // }

    var url = "model/ws.php?";
    var formData = new FormData();
    formData.append('main', 'create_project');
    formData.append('project_name', i.srcElement.project_name.value);
    formData.append('project_description', i.srcElement.project_description.value);
    formData.append('project_start_date', i.srcElement.date_start.value);
    formData.append('project_end_date', i.srcElement.date_end.value);
    formData.append('num_task', i.srcElement.num_task.value);
    var num_task = i.srcElement.num_task.value;
    for (var q = 1; q <= num_task; q++) {
        var task_name_eval = "i.srcElement.task_name" + [q] + ".value";
        var task_description_eval = "i.srcElement.task_description" + [q] + ".value";
        var task_order_eval = "i.srcElement.task_order" + [q] + ".value";
        var duration_eval = "i.srcElement.duration" + [q] + ".value";
        var num_assign_emp_eval = "i.srcElement.num_assign_emp" + [q] + ".value";
        formData.append('task_name' + (q), eval(task_name_eval));
        formData.append('task_description' + (q), eval(task_description_eval));
        formData.append('task_order' + (q), eval(task_order_eval));
        formData.append('duration' + (q), eval(duration_eval));
        formData.append('num_assign_emp' + (q), eval(num_assign_emp_eval));
        var num_assigned_emp = eval(num_assign_emp_eval);
        var num_assigned_emp_name = "num_assign_emp" + (q);
        for (var o = 1; o <= num_assigned_emp; o++) {
            var num_assigned_emp_name_assign_emp_eval = "i.srcElement." + num_assigned_emp_name + "assign_emp" + [o] + ".value"
            formData.append(num_assigned_emp_name + "assign_emp" + (o), eval(num_assigned_emp_name_assign_emp_eval));
        }
    }
    fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include"
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }
            response.json().then(function (data) {
                if (!data.error) {
                    var arrayFromStorage = []
                    var json_insert = data;
                    arrayFromStorage = JSON.parse(localStorage.getItem("delete_projects"));
                    arrayFromStorage.push(json_insert);
                    localStorage.setItem("delete_projects", JSON.stringify(arrayFromStorage));
                    M.toast({ html: "Project Created", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                    create_project_form.reset();
                    document.getElementById("task_displayer").innerHTML = " ";
                } else {
                    M.toast({ html: "Create Project Failed", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                }
            });
        })


        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function create_new_job_type(i) {
    i.preventDefault();

    var url = "model/ws.php?";
    var formData = new FormData();
    formData.append('main', 'create_job_type');
    formData.append('job_type_name', i.srcElement.job_type_name.value);
    formData.append('job_type_description', i.srcElement.job_type_description.value);
    fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include"
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }
            response.json().then(function (data) {
                if (!data.error) {
                    var arrayFromStorage = []
                    var json_insert = data;
                    arrayFromStorage = JSON.parse(localStorage.getItem("job_types"));
                    arrayFromStorage.push(json_insert);
                    localStorage.setItem("job_types", JSON.stringify(arrayFromStorage));
                    form_create_new_job_type.reset()
                    M.toast({ html: "Job Type Created", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                } else {
                    M.toast({ html: "Create Job Type Failed", displayLength: 10000 });
                    document.getElementById("toast-container").addEventListener("click", toasthide)
                }
            });
        })


        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

//background json
function load_projects() {
    var url = "model/ws.php?json=pop_delete_project_id";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    localStorage.setItem("delete_projects", JSON.stringify(data));
                    // console.log(data);
                    // var outHTML = '';
                    // for (loop = 0; loop < data.length; loop++) {
                    //     outHTML += '<option value="' + data[loop].project_id + '">' + data[loop].project_id + " " + data[loop].project_name + '</option>';
                    // }
                    // project_delete.innerHTML = outHTML;
                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function load_job_type() {
    var url = "model/ws.php?json=load_job_type";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    var outHTML = '';
                    // if (data == data.Logout) {
                    //     localStorage.removeItem('user_details');
                    //     localStorage.removeItem('users_projects');
                    //     check_login();
                    // } else {
                    localStorage.setItem("job_types", JSON.stringify(data));
                    // }

                    // for (loop = 0; loop < data.length; loop++) {
                    //     outHTML += '<option value="' + data[loop].job_type_id + '">' + data[loop].job_name + '</option>';
                    // }
                    // job_type_user.innerHTML = outHTML;
                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function load_session() {
    var url = "model/ws.php?json=load_session";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    load_user_projects(data.user);
                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function load_user_projects(user) {
    var HTMLTemplate = project_display.innerHTML;
    var url = "model/ws.php?json=load_user_projects&user=" + user + "";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(data);
                    localStorage.setItem("users_projects", JSON.stringify(data));
                    var arrayFromStorage = JSON.parse(localStorage.getItem("users_projects"));
                    var arrayLength = arrayFromStorage.length;
                    var outHTML = '';
                    if (arrayLength == 0) {
                        outHTML = "<h4>No Projects</h4>"
                    } else {
                        for (var loop = 0; loop < arrayLength; loop++) {
                            var project_id = arrayFromStorage[loop].project_id;
                            outHTML += HTMLTemplate.replace(/{{project_name}}/g, (loop + 1) + " - " + data[loop].project_name).replace(/{{project_task_target}}/g, 'project' + data[loop].project_id).replace(/{{project_discription}}/g, data[loop].description);

                            load_project_tasks(project_id, user);
                        }
                    }
                    project_container.innerHTML = outHTML;
                    project_container.hidden = false;
                    spinner_loader.hidden = true;
                    var spinners = document.getElementsByClassName("spinner_task");
                    for (var i = 0; i < spinners.length; i++) {
                        spinners[i].hidden = false;
                    }
                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function load_project_tasks(project_id, user) {
    var HTMLTemplate = task_displayer_target.innerHTML;
    var url = "model/ws.php?json=load_project_tasks&project_id=" + project_id + "";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(data);
                    var outHTML = "";
                    for (loop = 0; loop < data.length; loop++) {
                        var task_id = data[loop].task_id;
                        outHTML += HTMLTemplate.replace(/{{task_name}}/g, "Task " + (loop + 1) + " - " + data[loop].task_name).replace(/{{task_description}}/g, data[loop].description).replace(/{{task_status_other}}/g, "task_id" + data[loop].task_id).replace(/{{task_status_update}}/g, "user_update" + data[loop].task_id);
                        load_tasks_task_status(user, task_id);
                    }
                    document.getElementById("project" + project_id).innerHTML = outHTML;

                    var spinners = document.getElementsByClassName("spinner_task");
                    for (var i = 0; i < spinners.length; i++) {
                        spinners[i].hidden = true;
                    }
                    collapsible_insert();

                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
function collapsible_insert() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
}

function load_tasks_task_status(user, task_id) {
    var url = "model/ws.php?json=load_tasks_task_status&task_id=" + task_id + "";
    var HTMLTemplate1 = update_status_script.innerHTML;
    var HTMLTemplate2 = other_status.innerHTML;
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(data);
                    var outHTML1 = '';
                    var outHTML2 = '';
                    for (loop = 0; loop < data.length; loop++) {
                        if (data[loop].user_id == user) {
                            outHTML1 += HTMLTemplate1.replace(/{{employee_name}}/g, data[loop].Fullname).replace(/{{employee_status}}/g, data[loop].task_status).replace(/{{not_started_task_id}}/g, "not_started_task_id-" + data[loop].task_status_id).replace(/{{in_progess_task_id}}/g, "in_progess_task_id-" + data[loop].task_status_id).replace(/{{completed_task_id}}/g, "completed_task_id-" + data[loop].task_status_id);

                        } else {
                            outHTML2 += HTMLTemplate2.replace(/{{employee_name}}/g, data[loop].Fullname).replace(/{{employee_status}}/g, data[loop].task_status);
                        }
                    }
                    document.getElementById("task_id" + task_id).innerHTML = outHTML2;
                    document.getElementById("user_update" + task_id).innerHTML = outHTML1;
                    float_insert()
                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
function update_status(o) {
    if (o.name == "Completed" || o.name == "In-progess" || o.name == "Not Started") {
        var task_status_id = o.id
        var eventIDArray = task_status_id.split('-');
        var newID = eventIDArray[1];
        var url = "model/ws.php?";
        var formData = new FormData();
        formData.append('main', 'edit_status');
        formData.append('task_status_id', newID);
        formData.append('status', o.name);
        fetch(url, {
            method: "POST",
            body: formData,
            credentials: "include"
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }
                response.json().then(function (data) {
                    if (data.Task_Status_Update == "Complete") {
                        M.toast({ html: "Status Updated", displayLength: 10000 });
                        document.getElementById("toast-container").addEventListener("click", toasthide);
                        var changer = o.parentNode.parentNode.parentNode.parentNode.parentNode.children[0];
                        var test = changer.textContent.split(':');
                        var name_changer = test[0];
                        var status_changer = o.name
                        changer.innerHTML = name_changer + ": " + status_changer;

                    } else {
                        console.log("error");
                    }
                });
            })


            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    } else {
        M.toast({ html: "Update Status Failure", displayLength: 10000 });
        document.getElementById("toast-container").addEventListener("click", toasthide)
    }
}

function float_insert() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
}

function all_employees() {
    var url = "model/ws.php?json=all_employees";
    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    localStorage.setItem("Employees", JSON.stringify(data))
                });
            }
        )

        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

//javascript
function num_task_displayer(num) {
    if (task_changer_id.value != "") {

        var i = num.value;
        var HTMLTemplate = create_task_num.innerHTML;
        var outHTML = '';
        for (loop = 0; loop < i; loop++) {
            outHTML += HTMLTemplate.replace(/{{task_name}}/g, "task_name" + (loop + 1))
                .replace(/{{task_description}}/g, "task_description" + (loop + 1))
                .replace(/{{task_order}}/g, "task_order" + (loop + 1))
                .replace(/{{duration}}/g, "duration" + (loop + 1))
                .replace(/{{num_assign_emp}}/g, "num_assign_emp" + (loop + 1))
                .replace(/{{emp_displayer}}/g, "emp_displayer" + (loop + 1));
        }
        document.getElementById("task_displayer").innerHTML = outHTML;
        range_starter();
        select_starter();

    }
}
function select_starter() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}

function range_starter() {
    var slider = document.getElementById('test-slider');
    var array_of_dom_elements = document.querySelectorAll("input[type=range]");
    M.Range.init(array_of_dom_elements);
}

function num_emp_displayer(emp_num) {
    if (emp_num.value != "") {
        var eventIDArray = emp_num.name.split('emp');
        var i = emp_num.value;

        var arrayFromStroage = JSON.parse(localStorage.getItem("Employees"));
        var arrayLength = arrayFromStroage.length;
        var outHTML1 = '';
        for (loop = 0; loop < arrayLength; loop++) {
            outHTML1 += "<option value='" + arrayFromStroage[loop].users_id + "'>" + arrayFromStroage[loop].Fullname + "</option>"
        }

        var HTMLTemplate = create_emp_num.innerHTML;
        var outHTML2 = '';
        for (loop = 0; loop < i; loop++) {
            outHTML2 += HTMLTemplate.replace(/{{employee_options}}/g, outHTML1).replace(/{{assign_emp}}/g, emp_num.name + "assign_emp" + (loop + 1));
        }
        document.getElementById("emp_displayer" + eventIDArray[1]).innerHTML = outHTML2;
        select_starter();
    }

}

//Events

//onload
window.addEventListener("load", check_login());
window.addEventListener("load", check_dark_mode());
// window.addEventListener("load", load_projects());
// window.addEventListener("load", load_job_type());
// window.addEventListener("load", all_employees());

//load on click
document.getElementById('menu_deleteproject').addEventListener('click', function () { pop_delete_project() });
document.getElementById('menu_addemployee').addEventListener('click', function () { populate_job_type_field() });

//onsubmit

document.getElementById('form_login').addEventListener('submit', function (i) { check_password(i) });
document.getElementById('form_create_password').addEventListener('submit', function (i) { create_password(i) });
document.getElementById('form_logout').addEventListener('click', function (i) { logout(i) });
document.getElementById('admin_logout').addEventListener('click', function (i) { logout(i) });

document.getElementById('form_delete_project').addEventListener('submit', function (i) { confirm_delete_project(i) });
document.getElementById('form_create_employee').addEventListener('submit', function (i) { create_employee(i) });
document.getElementById('create_project_form').addEventListener('submit', function (i) { create_project(i) });
document.getElementById('form_create_new_job_type').addEventListener('submit', function (i) { create_new_job_type(i) });